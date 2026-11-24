const WORDS_PER_MINUTE = 250

const stripHtml = (value = '') => value.replace(/<[^>]*>?/gm, ' ')

export function parseBlogBlocks(content) {
    if (!content) return null

    try {
        const parsed = JSON.parse(content)
        return Array.isArray(parsed) ? parsed : null
    } catch {
        return null
    }
}

export function estimateReadTimeMinutes(content) {
    if (!content) return 1

    const blocks = parseBlogBlocks(content)
    let plainText = ''

    if (blocks) {
        plainText = blocks
            .map((block) => {
                if (block?.type === 'text') return stripHtml(block?.data?.html || '')
                if (block?.type === 'header') return block?.data?.text || ''
                if (block?.type === 'quote') return block?.data?.text || ''
                if (block?.type === 'callout') return block?.data?.text || ''
                if (block?.type === 'faq') {
                    return (block?.data?.items || [])
                        .map((item) => `${item?.q || ''} ${item?.a || ''}`)
                        .join(' ')
                }
                return ''
            })
            .join(' ')
    } else {
        plainText = stripHtml(content)
    }

    const wordCount = plainText
        .split(/\s+/)
        .map((word) => word.trim())
        .filter(Boolean).length

    return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

export function resolveReadTimeMinutes(post) {
    if (post?.readTimeMinutes && Number.isFinite(post.readTimeMinutes) && post.readTimeMinutes > 0) {
        return post.readTimeMinutes
    }

    return estimateReadTimeMinutes(post?.content || '')
}

export function resolvePublishedAt(post) {
    return new Date(post?.publishedAt || post?.createdAt || Date.now())
}

export function resolveImageAlt(altText, fallback = 'Blog image') {
    return altText?.trim() || fallback
}

export function toDatetimeLocalValue(value) {
    if (!value) return ''

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''

    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    return localDate.toISOString().slice(0, 16)
}

export function normalizePositiveInteger(value) {
    if (value === undefined || value === null || value === '') return null

    const parsed = parseInt(String(value), 10)
    if (!Number.isFinite(parsed) || parsed <= 0) return null

    return parsed
}

const decodeEntities = (value = '') =>
    value
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")

/** Converts simple HTML into readable Markdown-ish plain text (for llms-full.txt / RSS). */
export function htmlToText(html = '') {
    return decodeEntities(
        html
            .replace(/<\s*br\s*\/?>/gi, '\n')
            .replace(/<\s*li[^>]*>/gi, '\n- ')
            .replace(/<\s*\/(p|div|ul|ol|h[1-6]|blockquote|tr)\s*>/gi, '\n\n')
            .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
            .replace(/<\s*(strong|b)\s*>(.*?)<\s*\/(strong|b)\s*>/gi, '**$2**')
            .replace(/<[^>]*>?/gm, '')
    )
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
}

/** Renders a post's block content as Markdown so AI systems can read it cleanly. */
export function postToMarkdown(content = '') {
    const blocks = parseBlogBlocks(content)
    if (!blocks) return htmlToText(content)

    return blocks
        .map((block) => {
            const d = block?.data || {}
            switch (block?.type) {
                case 'header':
                    return `${'#'.repeat(Math.min(Math.max(d.level || 2, 2), 6))} ${d.text || ''}`
                case 'text':
                    return htmlToText(d.html || '')
                case 'quote':
                    return `> ${d.text || ''}${d.author ? `\n> — ${d.author}` : ''}`
                case 'callout':
                    return `> **Note:** ${htmlToText(d.text || '')}`
                case 'faq':
                    return (d.items || [])
                        .map((item) => `**Q: ${item?.q || ''}**\n\nA: ${htmlToText(item?.a || '')}`)
                        .join('\n\n')
                default:
                    return ''
            }
        })
        .filter(Boolean)
        .join('\n\n')
}

/** Plain-text body of a post (no Markdown), used for descriptions and word counts. */
export function postPlainText(content = '') {
    return postToMarkdown(content)
        .replace(/^#+\s*/gm, '')
        .replace(/\*\*|>\s?|\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\s+/g, ' ')
        .trim()
}

function snippet(text = '', max = 155) {
    const clean = text.replace(/\s+/g, ' ').trim()
    if (clean.length <= max) return clean
    const cut = clean.slice(0, max - 1)
    const lastSpace = cut.lastIndexOf(' ')
    return `${cut.slice(0, lastSpace > 60 ? lastSpace : cut.length).replace(/[,;:.\-–—\s]+$/, '')}…`
}

/**
 * Auto-SEO: fills any empty SEO fields from the post itself so nothing is ever
 * published without a meta title, description, excerpt, alt text or read time.
 * Values the editor typed are always kept.
 */
export function applyAutoSeo(fields) {
    const title = fields.title?.trim() || ''
    // Describe from body paragraphs only (headings make poor snippets).
    const blocks = parseBlogBlocks(fields.content || '')
    const plain = blocks
        ? blocks.filter((b) => b?.type === 'text').map((b) => htmlToText(b?.data?.html || '')).join(' ').replace(/\s+/g, ' ').trim()
        : postPlainText(fields.content || '')
    const excerpt = fields.excerpt?.trim() || snippet(plain, 220)
    const metaDesc = fields.metaDesc?.trim() || snippet(fields.excerpt?.trim() || plain, 155)
    const metaTitle = fields.metaTitle?.trim() || title

    return {
        ...fields,
        excerpt: excerpt || null,
        metaDesc: metaDesc || null,
        metaTitle: metaTitle || null,
        featuredImgAlt: fields.featuredImgAlt?.trim() || (fields.featuredImg ? title : null),
    }
}

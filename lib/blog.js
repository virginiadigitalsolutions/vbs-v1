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

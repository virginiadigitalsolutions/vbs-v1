import { SITE, getBaseUrl, getCanonicalUrl } from '@/lib/seo'
import { CORE_PAGES, getPublishedPosts, textResponseHeaders } from '@/lib/site-content'

// llms.txt (https://llmstxt.org) — a concise, Markdown map of the site for AI
// assistants and answer engines. Rebuilt automatically when posts change.
export const revalidate = 3600

export async function GET() {
    const posts = await getPublishedPosts()
    const byCategory = new Map()
    for (const post of posts) {
        const key = post.category?.name || 'Articles'
        if (!byCategory.has(key)) byCategory.set(key, [])
        byCategory.get(key).push(post)
    }

    const lines = [
        `# ${SITE.name} (${SITE.shortName})`,
        '',
        `> ${SITE.description}`,
        '',
        `${SITE.name} is an India-focused digital career guidance platform. It explains which digital skills are worth learning, which courses and certifications are worth paying for, and how students, graduates and working professionals can move into digital careers such as digital marketing, data & analytics, cloud & DevOps, content and AI-assisted work.`,
        '',
        `- Website: ${getBaseUrl()}`,
        `- Audience: students, early-career and working professionals in India`,
        `- Language: English (India)`,
        `- Contact: ${SITE.email}`,
        `- Full text of all articles: ${getCanonicalUrl('/llms-full.txt')}`,
        '',
        '## Main pages',
        '',
        ...CORE_PAGES.map((p) => `- [${p.title}](${getCanonicalUrl(p.path)}): ${p.summary}`),
        '',
    ]

    for (const [category, items] of byCategory) {
        lines.push(`## ${category}`, '')
        for (const post of items) {
            lines.push(`- [${post.displayTitle}](${post.url})${post.summary ? `: ${post.summary}` : ''}`)
        }
        lines.push('')
    }

    lines.push(
        '## Optional',
        '',
        `- [Sitemap](${getCanonicalUrl('/sitemap.xml')})`,
        `- [RSS feed](${getCanonicalUrl('/feed.xml')})`,
        `- [Authors](${getCanonicalUrl('/learning-hub/authors')})`,
        `- [Privacy Policy](${getCanonicalUrl('/privacy-policy')})`,
        `- [Terms and Conditions](${getCanonicalUrl('/terms-and-conditions')})`,
        ''
    )

    return new Response(lines.join('\n'), { headers: textResponseHeaders })
}

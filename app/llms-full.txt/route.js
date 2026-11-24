import { SITE, getBaseUrl } from '@/lib/seo'
import { postToMarkdown } from '@/lib/blog'
import { getPublishedPosts, textResponseHeaders } from '@/lib/site-content'

// Full Markdown text of every published article, so AI assistants can read and
// cite the content accurately without parsing HTML.
export const revalidate = 3600

export async function GET() {
    const posts = await getPublishedPosts({ withContent: true })

    const parts = [
        `# ${SITE.name} — Full article library`,
        '',
        `> ${SITE.description}`,
        '',
        `Source: ${getBaseUrl()} · ${posts.length} articles · Generated ${new Date().toISOString().split('T')[0]}`,
        '',
    ]

    for (const post of posts) {
        parts.push(
            '---',
            '',
            `## ${post.displayTitle}`,
            '',
            `- URL: ${post.url}`,
            `- Published: ${post.date.toISOString().split('T')[0]}`,
            `- Updated: ${new Date(post.updatedAt).toISOString().split('T')[0]}`,
            post.author?.name ? `- Author: ${post.author.name}` : null,
            post.category?.name ? `- Category: ${post.category.name}` : null,
            post.tags?.length ? `- Tags: ${post.tags.map((t) => t.name).join(', ')}` : null,
            '',
            post.summary ? `${post.summary}\n` : null,
            postToMarkdown(post.content).replace(/^# /gm, '### ').replace(/^## /gm, '### '),
            ''
        )
    }

    return new Response(parts.filter((line) => line !== null).join('\n'), { headers: textResponseHeaders })
}

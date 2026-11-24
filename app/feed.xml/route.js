import { SITE, absoluteUrl, getBaseUrl, getCanonicalUrl } from '@/lib/seo'
import { getPublishedPosts } from '@/lib/site-content'

// RSS 2.0 feed — helps discovery by feed readers, aggregators and AI crawlers.
export const revalidate = 3600

const escapeXml = (value = '') =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')

export async function GET() {
    const posts = await getPublishedPosts({ limit: 50 })
    const baseUrl = getBaseUrl()

    const items = posts
        .map(
            (post) => `    <item>
      <title>${escapeXml(post.displayTitle)}</title>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      ${post.category?.name ? `<category>${escapeXml(post.category.name)}</category>` : ''}
      ${post.author?.name ? `<dc:creator>${escapeXml(post.author.name)}</dc:creator>` : ''}
      <description>${escapeXml(post.summary)}</description>
      ${post.featuredImg ? `<enclosure url="${escapeXml(absoluteUrl(post.featuredImg))}" type="image/jpeg" length="0" />` : ''}
    </item>`
        )
        .join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${SITE.name} — Learning Hub`)}</title>
    <link>${getCanonicalUrl('/learning-hub')}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en-in</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts[0] ? `<lastBuildDate>${new Date(posts[0].updatedAt).toUTCString()}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    })
}

/**
 * Reusable JSON-LD structured data component.
 * Usage: <JsonLd type="Organization" /> or <JsonLd type="Article" data={{...}} />
 */

const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return 'http://localhost:3000'
}

export default function JsonLd({ type = 'Organization', data = {} }) {
    const baseUrl = getBaseUrl()
    let schema = {}

    switch (type) {
        case 'Organization':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Virginia Business Solutions',
                url: baseUrl,
                description: 'Clear digital career guidance in India for students and working professionals.',
                sameAs: data.socialLinks || [],
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    email: data.email || 'info@virginiabusinesssolutions.com',
                },
            }
            break

        case 'WebSite':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Virginia Business Solutions',
                url: baseUrl,
                potentialAction: {
                    '@type': 'SearchAction',
                    target: `${baseUrl}/search?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            }
            break

        case 'Article':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: data.title || '',
                description: data.description || '',
                image: data.image || '',
                datePublished: data.publishedAt || '',
                dateModified: data.updatedAt || '',
                author: {
                    '@type': 'Person',
                    name: data.authorName || 'VBS Team',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Virginia Business Solutions',
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': data.url || baseUrl,
                },
            }
            break

        case 'BreadcrumbList':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: (data.items || []).map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: item.name,
                    item: item.url ? `${baseUrl}${item.url}` : undefined,
                })),
            }
            break

        default:
            return null
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

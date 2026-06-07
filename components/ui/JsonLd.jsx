/**
 * Reusable JSON-LD structured data component.
 * Usage: <JsonLd type="Organization" /> or <JsonLd type="Article" data={{...}} />
 */

import { getBaseUrl } from '@/lib/seo'

const DEFAULT_SOCIAL_LINKS = [
    'https://www.linkedin.com/company/virginia-business-solutions',
    'https://www.instagram.com/yourvbshandle',
    'https://www.youtube.com/@yourvbschannel',
]

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
                logo: `${baseUrl}/logo.png`,
                description:
                    'Digital career guidance platform helping students, English graduates, and aspiring creators discover practical digital career paths in content writing, video creation, and the creator economy.',
                foundingDate: '2025',
                areaServed: 'IN',
                knowsAbout: [
                    'Digital Career Guidance',
                    'Content Writing Careers',
                    'Video Creator Careers',
                    'Creator Economy',
                    'AI Tools for Beginners',
                    'Freelance Career Development',
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    email: 'info@virginiabusinesssolutions.in',
                },
                sameAs: DEFAULT_SOCIAL_LINKS,
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
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${baseUrl}/?s={search_term_string}`,
                    },
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

        case 'FAQPage':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: (data.items || []).map((item) => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer,
                    },
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

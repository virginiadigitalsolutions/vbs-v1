/**
 * Reusable JSON-LD structured data component.
 * Usage: <JsonLd type="Organization" /> or <JsonLd type="Article" data={{...}} />
 */

import { getBaseUrl, getLogoUrl, SITE } from '@/lib/seo'

export default function JsonLd({ type = 'Organization', data = {}, schema: customSchema }) {
    if (customSchema) {
        return (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
            />
        )
    }

    const baseUrl = getBaseUrl()
    let schema = {}

    switch (type) {
        case 'Graph':
        case 'Raw':
        case 'Custom':
            schema = data
            break

        case 'Organization': {
            const socialLinks = (Array.isArray(data.socialLinks) ? data.socialLinks : [])
                .map((link) => (typeof link === 'string' ? link : link?.url))
                .filter((link) => typeof link === 'string' && /^https?:\/\//.test(link) && !/yourvbs/i.test(link))
            schema = {
                '@context': 'https://schema.org',
                '@type': 'EducationalOrganization',
                '@id': `${baseUrl}/#organization`,
                name: SITE.name,
                alternateName: SITE.shortName,
                url: baseUrl,
                logo: {
                    '@type': 'ImageObject',
                    url: getLogoUrl(data.logoUrl),
                },
                image: `${baseUrl}/opengraph-image`,
                description: SITE.description,
                foundingDate: '2025',
                areaServed: { '@type': 'Country', name: 'India' },
                knowsAbout: [
                    'Digital Skills',
                    'Digital Career Guidance',
                    'Online Courses and Certifications',
                    'Career Roadmaps',
                    'Digital Marketing',
                    'Data Analytics',
                    'Cloud and DevOps',
                    'AI Tools for Beginners',
                    'Content Writing Careers',
                    'Freelance Career Development',
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    email: data.email || SITE.email,
                    areaServed: 'IN',
                    availableLanguage: ['English'],
                },
                ...(socialLinks.length ? { sameAs: socialLinks } : {}),
            }
            break
        }

        case 'WebSite':
            // SearchAction removed: Google retired the sitelinks search box (Nov 2024)
            // and the old /?s= target did not exist on this site.
            schema = {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${baseUrl}/#website`,
                name: SITE.name,
                alternateName: SITE.shortName,
                url: baseUrl,
                inLanguage: SITE.language,
                publisher: { '@id': `${baseUrl}/#organization` },
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

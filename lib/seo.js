// Keep every generated SEO signal on the same host as the production primary
// domain. This controls canonical URLs, sitemap entries, robots.txt and JSON-LD.
const DEFAULT_SITE_URL = 'https://virginiabusinesssolutions.in'

export const SITE = {
    name: 'Virginia Business Solutions',
    shortName: 'VBS',
    locale: 'en_IN',
    language: 'en-IN',
    description:
        'Clear, practical digital career guidance in India — job-ready digital skills, courses, certifications and career roadmaps for students and working professionals.',
    email: 'info@virginiabusinesssolutions.in',
}

export function getBaseUrl() {
    // Deployment/preview URLs must never leak into public canonical metadata.
    // NEXT_PUBLIC_SITE_URL remains available for an intentional override.
    const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL

    if (!configuredUrl) return DEFAULT_SITE_URL

    const withProtocol = configuredUrl.startsWith('http://') || configuredUrl.startsWith('https://')
        ? configuredUrl
        : `https://${configuredUrl}`

    return withProtocol.replace(/\/+$/, '')
}

export function getCanonicalUrl(path = '/') {
    const baseUrl = getBaseUrl()

    if (!path || path === '/') return baseUrl

    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${normalizedPath}`
}

/** Turns a relative or absolute asset path into an absolute URL. */
export function absoluteUrl(value) {
    if (!value) return undefined
    if (/^https?:\/\//i.test(value)) return value
    return getCanonicalUrl(value)
}

export function getLogoUrl(logoUrl) {
    return absoluteUrl(logoUrl) || getCanonicalUrl('/logo.png')
}

/** Trims text to a search-snippet friendly length without cutting words. */
export function truncate(text = '', max = 160) {
    const clean = String(text).replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim()
    if (clean.length <= max) return clean
    const cut = clean.slice(0, max - 1)
    return `${cut.slice(0, cut.lastIndexOf(' ') > 60 ? cut.lastIndexOf(' ') : cut.length).replace(/[,;:.\-–—\s]+$/, '')}…`
}

/**
 * Builds a complete metadata object (title, description, canonical, Open Graph,
 * Twitter) so every page ships identical, correct social + search signals.
 *
 * Next.js replaces (rather than merges) nested openGraph objects, so each page
 * must emit its own — this helper keeps that consistent.
 */
export function buildMetadata({
    title,
    description = SITE.description,
    path = '/',
    image,
    imageAlt,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
    absoluteTitle = false,
    noindex = false,
} = {}) {
    const url = getCanonicalUrl(path)
    const desc = truncate(description, 160)
    // Every page gets a large preview image; falls back to the generated
    // site-wide card (app/opengraph-image.jsx) when none is given.
    const images = image
        ? [{ url: absoluteUrl(image), alt: imageAlt || title || SITE.name }]
        : [{ url: getCanonicalUrl('/opengraph-image'), width: 1200, height: 630, alt: SITE.name }]

    return {
        // Titles that already carry the brand skip the layout's "| VBS" suffix
        // (avoids "… | Virginia Business Solutions | VBS" duplicates).
        title: absoluteTitle || /\bVBS\b|Virginia Business Solutions/i.test(title || '') ? { absolute: title } : title,
        description: desc,
        alternates: {
            canonical: path,
            types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${SITE.shortName} Learning Hub` }] },
        },
        openGraph: {
            type,
            url,
            title: title || SITE.name,
            description: desc,
            siteName: SITE.name,
            locale: SITE.locale,
            images,
            ...(type === 'article'
                ? {
                      publishedTime,
                      modifiedTime,
                      authors,
                      section,
                      tags,
                  }
                : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title: title || SITE.name,
            description: desc,
            images: images.map((i) => i.url),
        },
        ...(noindex ? { robots: { index: false, follow: true } } : {}),
    }
}

// Keep every generated SEO signal on the same host as the production primary
// domain. This controls canonical URLs, sitemap entries, robots.txt and JSON-LD.
const DEFAULT_SITE_URL = 'https://www.virginiabusinesssolutions.in'

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

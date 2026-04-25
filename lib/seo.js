const DEFAULT_SITE_URL = 'https://virginiabusinesssolutions.in'

export function getBaseUrl() {
    const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL

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

import { getBaseUrl } from '@/lib/seo'

export default function robots() {
    const baseUrl = getBaseUrl()
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        host: baseUrl,
        sitemap: [`${baseUrl}/sitemap.xml`],
    }
}

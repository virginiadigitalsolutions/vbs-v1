import { prisma, queryWithRetry } from '@/lib/db'

const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return 'http://localhost:3000'
}

export default async function sitemap() {
    const baseUrl = getBaseUrl()

    // Static pages
    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/digital-skills`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/courses-certifications`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/career-guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/career-roadmap`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/skill-quiz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/learning-hub`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ]

    // Dynamic blog posts
    let blogPosts = []
    try {
        const posts = await queryWithRetry(() =>
            prisma.post.findMany({
                where: { isPublished: true },
                select: { slug: true, updatedAt: true, category: { select: { slug: true } } },
            })
        )
        blogPosts = posts.map((post) => ({
            url: `${baseUrl}/learning-hub/${post.category?.slug || 'posts'}/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'weekly',
            priority: 0.7,
        }))
    } catch (err) {
        console.error('[Sitemap] Failed to fetch blog posts:', err.message)
    }

    // Dynamic CMS pages
    let cmsPages = []
    try {
        const pages = await queryWithRetry(() =>
            prisma.page.findMany({
                where: { isPublished: true },
                select: { slug: true },
            })
        )
        cmsPages = pages
            .filter((p) => !['home', 'about-us', 'digital-skills', 'courses-certifications', 'career-guides', 'career-roadmap', 'skill-quiz', 'learning-hub', 'contact', 'resources', 'terms-and-conditions', 'privacy-policy'].includes(p.slug))
            .map((page) => ({
                url: `${baseUrl}/${page.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            }))
    } catch (err) {
        console.error('[Sitemap] Failed to fetch CMS pages:', err.message)
    }

    return [...staticPages, ...blogPosts, ...cmsPages]
}

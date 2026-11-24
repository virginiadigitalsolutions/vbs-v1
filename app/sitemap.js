import { prisma, queryWithRetry } from '@/lib/db'
import { absoluteUrl, getBaseUrl } from '@/lib/seo'

// Regenerated at most every hour, and instantly whenever a post is published,
// edited or deleted (the admin API calls revalidatePath('/sitemap.xml')).
export const revalidate = 3600

export default async function sitemap() {
    const baseUrl = getBaseUrl()

    // Static pages
    const staticPages = [
        { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/about-us`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/digital-skills`, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/courses-certifications`, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/career-guides`, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/career-roadmap`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/skill-quiz`, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/learning-hub`, changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/resources`, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/terms-and-conditions`, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    ]

    // Dynamic blog posts
    let blogPosts = []
    let latestPostUpdate = null
    try {
        const posts = await queryWithRetry(() =>
            prisma.post.findMany({
                where: { isPublished: true },
                select: { slug: true, updatedAt: true, featuredImg: true, category: { select: { slug: true } } },
            })
        )
        latestPostUpdate = posts.reduce((latest, post) => (post.updatedAt > latest ? post.updatedAt : latest), latestPostUpdate)
        blogPosts = posts.map((post) => ({
            url: `${baseUrl}/learning-hub/${post.category?.slug || 'posts'}/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'weekly',
            priority: 0.7,
            ...(post.featuredImg ? { images: [absoluteUrl(post.featuredImg)] } : {}),
        }))
    } catch (err) {
        console.error('[Sitemap] Failed to fetch blog posts:', err.message)
    }

    // Only expose taxonomy pages that contain indexable published content.
    let taxonomyPages = []
    try {
        const [categories, authors] = await Promise.all([
            queryWithRetry(() =>
                prisma.category.findMany({
                    where: { posts: { some: { isPublished: true } } },
                    select: { slug: true },
                })
            ),
            queryWithRetry(() =>
                prisma.adminUser.findMany({
                    where: { posts: { some: { isPublished: true } } },
                    select: { id: true },
                })
            ),
        ])

        taxonomyPages = [
            ...categories.map((category) => ({
                url: `${baseUrl}/learning-hub/${category.slug}`,
                ...(latestPostUpdate ? { lastModified: latestPostUpdate } : {}),
                changeFrequency: 'weekly',
                priority: 0.6,
            })),
            {
                url: `${baseUrl}/learning-hub/authors`,
                ...(latestPostUpdate ? { lastModified: latestPostUpdate } : {}),
                changeFrequency: 'weekly',
                priority: 0.5,
            },
            ...authors.map((author) => ({
                url: `${baseUrl}/learning-hub/authors/${author.id}`,
                ...(latestPostUpdate ? { lastModified: latestPostUpdate } : {}),
                changeFrequency: 'monthly',
                priority: 0.5,
            })),
        ]
    } catch (err) {
        console.error('[Sitemap] Failed to fetch taxonomy pages:', err.message)
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
            .filter((p) => !['home', 'about-us', 'digital-skills', 'courses-certifications', 'career-guides', 'career-roadmap', 'skill-quiz', 'learning-hub', 'contact', 'resources', 'terms-and-conditions', 'privacy-policy', 'ruban', 'blog', 'blogs', 'about'].includes(p.slug))
            .map((page) => ({
                url: `${baseUrl}/${page.slug}`,
                changeFrequency: 'weekly',
                priority: 0.7,
            }))
    } catch (err) {
        console.error('[Sitemap] Failed to fetch CMS pages:', err.message)
    }

    if (latestPostUpdate) {
        for (const page of staticPages) {
            if (page.url === baseUrl || page.url === `${baseUrl}/learning-hub`) page.lastModified = latestPostUpdate
        }
    }

    return [...staticPages, ...blogPosts, ...taxonomyPages, ...cmsPages]
}

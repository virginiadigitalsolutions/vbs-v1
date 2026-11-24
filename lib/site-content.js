import { prisma, queryWithRetry } from '@/lib/db'
import { getCanonicalUrl } from '@/lib/seo'
import { resolvePublishedAt } from '@/lib/blog'

// Shared source for machine-readable feeds (llms.txt, llms-full.txt, RSS).

export const CORE_PAGES = [
    { path: '/', title: 'Home', summary: 'Overview of digital career guidance for students and working professionals in India.' },
    { path: '/digital-skills', title: 'Digital Skills', summary: 'The job-ready digital skills worth learning, and how to start.' },
    { path: '/courses-certifications', title: 'Courses & Certifications', summary: 'Structured courses and certifications, and how to pick the right one.' },
    { path: '/career-guides', title: 'Career Guides', summary: 'Digital career paths in India explained: roles, skills and growth.' },
    { path: '/career-roadmap', title: 'Career Roadmap', summary: 'Interactive roadmaps for Digital Marketing, Data & Analytics and Cloud & DevOps.' },
    { path: '/skill-quiz', title: 'Skill Quiz', summary: 'Free 10-question quiz that suggests a digital career path matching your strengths.' },
    { path: '/resources', title: 'Recommended Resources', summary: 'Handpicked courses, tools and certifications.' },
    { path: '/learning-hub', title: 'Learning Hub', summary: 'All articles and guides.' },
    { path: '/about-us', title: 'About Us', summary: 'Who we are and why this platform exists.' },
    { path: '/contact', title: 'Contact', summary: 'How to reach the team.' },
]

export async function getPublishedPosts({ withContent = false, limit } = {}) {
    try {
        const posts = await queryWithRetry(() =>
            prisma.post.findMany({
                where: { isPublished: true },
                orderBy: [{ publishedAt: 'desc' }],
                take: limit,
                select: {
                    slug: true,
                    title: true,
                    h1: true,
                    excerpt: true,
                    metaDesc: true,
                    featuredImg: true,
                    publishedAt: true,
                    createdAt: true,
                    updatedAt: true,
                    content: withContent,
                    author: { select: { name: true } },
                    category: { select: { slug: true, name: true } },
                    tags: { select: { name: true } },
                },
            })
        )
        return posts.map((post) => ({
            ...post,
            url: getCanonicalUrl(`/learning-hub/${post.category?.slug || 'posts'}/${post.slug}`),
            displayTitle: post.h1 || post.title,
            summary: post.metaDesc || post.excerpt || '',
            date: resolvePublishedAt(post),
        }))
    } catch (err) {
        console.error('[site-content] Failed to load posts:', err.message)
        return []
    }
}

export const textResponseHeaders = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    'X-Robots-Tag': 'noindex',
}

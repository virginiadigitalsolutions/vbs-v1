import { NextResponse } from 'next/server'
import { prisma, queryWithRetry } from '@/lib/db'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.trim()

    if (!q || q.length < 2) {
        return NextResponse.json({ results: [] })
    }

    try {
        const [posts, pages, affiliates] = await Promise.all([
            queryWithRetry(() =>
                prisma.post.findMany({
                    where: {
                        isPublished: true,
                        OR: [
                            { title: { contains: q } },
                            { excerpt: { contains: q } },
                        ],
                    },
                    select: { slug: true, title: true, excerpt: true, category: { select: { slug: true } } },
                    take: 5,
                })
            ),
            queryWithRetry(() =>
                prisma.page.findMany({
                    where: {
                        isPublished: true,
                        OR: [
                            { title: { contains: q } },
                            { slug: { contains: q } },
                        ],
                    },
                    select: { slug: true, title: true, metaDesc: true },
                    take: 5,
                })
            ),
            queryWithRetry(() =>
                prisma.affiliateLink.findMany({
                    where: {
                        isActive: true,
                        OR: [
                            { title: { contains: q } },
                            { description: { contains: q } },
                            { platform: { contains: q } },
                        ],
                    },
                    select: { id: true, title: true, url: true, platform: true, description: true },
                    take: 5,
                })
            ),
        ])

        const results = [
            ...posts.map((p) => ({
                type: 'blog',
                title: p.title,
                description: p.excerpt || '',
                url: `/learning-hub/${p.category?.slug || 'posts'}/${p.slug}`,
            })),
            ...pages.map((p) => ({
                type: 'page',
                title: p.title,
                description: p.metaDesc || '',
                url: p.slug === 'home' ? '/' : `/${p.slug}`,
            })),
            ...affiliates.map((a) => ({
                type: 'resource',
                title: a.title,
                description: `${a.platform} — ${a.description || ''}`,
                url: a.url,
                external: true,
            })),
        ]

        return NextResponse.json({ results })
    } catch (err) {
        console.error('[Search API] Error:', err.message)
        return NextResponse.json({ results: [], error: 'Search failed' }, { status: 500 })
    }
}

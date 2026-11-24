import { NextResponse, after } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { applyAutoSeo, normalizePositiveInteger } from '@/lib/blog'
import { postRelatedPaths, submitToIndexNow } from '@/lib/indexnow'

// Refreshes cached pages immediately and pings IndexNow (Bing, Yandex, …) so new
// or edited posts are picked up within minutes instead of days.
function refreshAndIndex(posts) {
    const paths = posts.filter(Boolean).flatMap(postRelatedPaths)
    for (const path of new Set(paths)) {
        try { revalidatePath(path) } catch {}
    }
    const shouldPing = posts.some((p) => p?.isPublished || p?.wasPublished)
    if (shouldPing) after(() => submitToIndexNow(paths.filter((p) => !p.endsWith('.xml') && !p.endsWith('.txt'))))
}

export async function GET() {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const posts = await prisma.post.findMany({
            orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
            include: { author: true, category: true, tags: true }
        })
        return NextResponse.json(posts)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { title, slug, content, excerpt, featuredImg, featuredImgAlt, publishedAt, readTimeMinutes, isPublished, categoryId, authorId, h1, metaTitle, metaDesc, showToc } = applyAutoSeo(body)

        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const resolvedPublishedAt = publishedAt ? new Date(publishedAt) : new Date()
        if (Number.isNaN(resolvedPublishedAt.getTime())) {
            return NextResponse.json({ error: 'Invalid publish date' }, { status: 400 })
        }

        const post = await prisma.post.create({
            include: { category: { select: { slug: true } } },
            data: {
                title,
                slug,
                h1,
                metaTitle,
                metaDesc,
                showToc: showToc === undefined ? true : !!showToc,
                content,
                excerpt,
                featuredImg,
                featuredImgAlt: featuredImgAlt?.trim() || null,
                publishedAt: resolvedPublishedAt,
                readTimeMinutes: normalizePositiveInteger(readTimeMinutes),
                isPublished: !!isPublished,
                authorId: parseInt(authorId) || parseInt(session.user.id),
                categoryId: categoryId ? parseInt(categoryId) : null
            }
        })

        refreshAndIndex([post])

        return NextResponse.json(post, { status: 201 })
    } catch (err) {
        console.error(err)
        if (err.code === 'P2002') {
            return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 })
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

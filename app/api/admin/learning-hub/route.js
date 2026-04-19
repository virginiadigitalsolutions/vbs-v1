import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { normalizePositiveInteger } from '@/lib/blog'

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
        const { title, slug, content, excerpt, featuredImg, featuredImgAlt, publishedAt, readTimeMinutes, isPublished, categoryId, authorId, h1, metaTitle, metaDesc, showToc } = body

        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const resolvedPublishedAt = publishedAt ? new Date(publishedAt) : new Date()
        if (Number.isNaN(resolvedPublishedAt.getTime())) {
            return NextResponse.json({ error: 'Invalid publish date' }, { status: 400 })
        }

        const post = await prisma.post.create({
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

        return NextResponse.json(post, { status: 201 })
    } catch (err) {
        console.error(err)
        if (err.code === 'P2002') {
            return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 })
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

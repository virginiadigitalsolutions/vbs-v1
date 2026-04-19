import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'

const slugify = (value = '') =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

export async function GET() {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { posts: true }
                }
            }
        })
        return NextResponse.json(categories)
    } catch (err) {
        console.error('[categories GET]', err)
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { name, slug: rawSlug } = body

        if (!name?.trim()) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
        }

        const slug = slugify(rawSlug || name)
        if (!slug) {
            return NextResponse.json({ error: 'Valid category slug is required' }, { status: 400 })
        }

        const existing = await prisma.category.findUnique({ where: { slug } })
        if (existing) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
        }

        const category = await prisma.category.create({
            data: { name: name.trim(), slug }
        })

        return NextResponse.json(category, { status: 201 })
    } catch (err) {
        console.error('[categories POST]', err)
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }
}

export async function PATCH(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { id, name, slug: rawSlug } = body

        if (!id) {
            return NextResponse.json({ error: 'Category id is required' }, { status: 400 })
        }

        if (!name?.trim()) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
        }

        const slug = slugify(rawSlug || name)
        if (!slug) {
            return NextResponse.json({ error: 'Valid category slug is required' }, { status: 400 })
        }

        const existing = await prisma.category.findFirst({
            where: {
                slug,
                id: { not: parseInt(id) }
            }
        })

        if (existing) {
            return NextResponse.json({ error: 'Category slug already exists' }, { status: 400 })
        }

        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                name: name.trim(),
                slug
            }
        })

        return NextResponse.json(category)
    } catch (err) {
        console.error('[categories PATCH]', err)
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const id = parseInt(body?.id, 10)

        if (!Number.isFinite(id)) {
            return NextResponse.json({ error: 'Category id is required' }, { status: 400 })
        }

        await prisma.post.updateMany({
            where: { categoryId: id },
            data: { categoryId: null }
        })

        await prisma.category.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('[categories DELETE]', err)
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
    }
}

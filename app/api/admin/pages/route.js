import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const pages = await prisma.page.findMany({
            orderBy: { slug: 'asc' },
            include: { _count: { select: { sections: true } } }
        })
        return NextResponse.json(pages)
    } catch (err) {
        console.error('[pages GET]', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { title, slug, metaDesc, isPublished } = body

        if (!title || !slug) {
            return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 })
        }

        const newPage = await prisma.page.create({
            data: {
                title,
                slug,
                metaDesc,
                isPublished: !!isPublished
            }
        })

        if (newPage.slug !== 'home') {
             revalidatePath(`/${newPage.slug}`)
        }

        return NextResponse.json(newPage, { status: 201 })
    } catch (err) {
        console.error(err)
        if (err.code === 'P2002') {
            return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 })
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

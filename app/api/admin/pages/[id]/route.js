import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET(request, { params }) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { id: paramId } = await params
        const page = await prisma.page.findUnique({
            where: { id: parseInt(paramId) }
        })

        if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 })

        return NextResponse.json(page)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function PATCH(request, { params }) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { title, slug, metaDesc, isPublished } = body

        if (!title || !slug) {
            return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 })
        }
        
        const { id: paramId } = await params

        // Prevent modifying the hardcoded home slug if it exists to avoid breaking the core entry point
        const targetPage = await prisma.page.findUnique({ where: { id: parseInt(paramId) } })
        if (!targetPage) return NextResponse.json({ error: 'Page not found' }, { status: 404 })
        if (targetPage.slug === 'home' && slug !== 'home') {
             return NextResponse.json({ error: 'Cannot change the slug of the home page' }, { status: 400 })
        }

        const page = await prisma.page.update({
            where: { id: parseInt(paramId) },
            data: {
                title,
                slug,
                metaDesc,
                isPublished: !!isPublished
            }
        })

        // Revalidate cache instantly
        if (page.slug === 'home') {
            revalidatePath('/')
        } else {
            revalidatePath(`/${page.slug}`)
            // Revalidate old slug cache if they changed the URL
            if (targetPage.slug !== slug) {
                 revalidatePath(`/${targetPage.slug}`)
            }
        }

        return NextResponse.json(page)
    } catch (err) {
        console.error(err)
        if (err.code === 'P2002') {
             return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 })
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { id: paramId } = await params
        const page = await prisma.page.findUnique({ where: { id: parseInt(paramId) } })
        if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 })
        if (page.slug === 'home') {
            return NextResponse.json({ error: 'Cannot delete the core home page' }, { status: 400 })
        }

        await prisma.page.delete({
            where: { id: parseInt(paramId) }
        })

        if (page.slug !== 'home') {
             revalidatePath(`/${page.slug}`)
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

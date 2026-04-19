import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')

    let page
    if (pageId) {
      page = await prisma.page.findUnique({ where: { id: parseInt(pageId, 10) } })
    } else {
      page = await prisma.page.findUnique({ where: { slug: 'home' } })
    }
    
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 })

    const sections = await prisma.section.findMany({
      where: { pageId: page.id },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(sections)
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
    const { pageId, type, data } = body

    if (!pageId || !type || !data) {
      return NextResponse.json({ error: 'Missing required configuration fields' }, { status: 400 })
    }

    // Determine the next order index by finding the max order.
    const lastSection = await prisma.section.findFirst({
      where: { pageId: parseInt(pageId, 10) },
      orderBy: { order: 'desc' },
    })
    const nextOrder = lastSection ? lastSection.order + 1 : 0

    const newSection = await prisma.section.create({
      data: {
        pageId: parseInt(pageId, 10),
        type,
        order: nextOrder,
        isActive: true, // Default to true so they immediately show up
        data,
      },
      include: { page: true }
    })

    // Revalidate the page so changes show up live instantly
    if (newSection.page?.slug === 'home') {
      revalidatePath('/')
    } else if (newSection.page?.slug) {
      revalidatePath(`/${newSection.page.slug}`)
    }

    return NextResponse.json(newSection, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function PATCH(request, { params }) {
  try {
    const session = await getAuthSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id: paramId } = await params
    const id = parseInt(paramId)
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const body = await request.json()
    const { isActive, order, data } = body

    const updated = await prisma.section.update({
      where: { id },
      data: {
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
        ...(data !== undefined && { data }),
      },
      include: { page: true }
    })

    // Revalidate the page so changes show up live instantly
    if (updated.page?.slug === 'home') {
      revalidatePath('/')
    } else if (updated.page?.slug) {
      revalidatePath(`/${updated.page.slug}`)
    }

    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

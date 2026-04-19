import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma, queryWithRetry } from '@/lib/db'

// GET — list all enquiries (with optional status filter)
export async function GET(request) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where = {}
    if (status && status !== 'ALL') where.status = status
    if (search) {
        where.OR = [
            { name: { contains: search } },
            { email: { contains: search } },
            { subject: { contains: search } },
            { message: { contains: search } },
        ]
    }

    try {
        const enquiries = await queryWithRetry(() =>
            prisma.contact.findMany({
                where,
                orderBy: { createdAt: 'desc' },
            })
        )
        return NextResponse.json({ enquiries })
    } catch (err) {
        console.error('[Enquiries API] GET error:', err.message)
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
    }
}

// PATCH — update status or notes for an enquiry
export async function PATCH(request) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const body = await request.json()
        const { id, status, notes } = body

        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

        const data = {}
        if (status) data.status = status
        if (notes !== undefined) data.notes = notes

        const updated = await queryWithRetry(() =>
            prisma.contact.update({ where: { id: Number(id) }, data })
        )
        return NextResponse.json({ success: true, enquiry: updated })
    } catch (err) {
        console.error('[Enquiries API] PATCH error:', err.message)
        return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }
}

// DELETE — remove an enquiry
export async function DELETE(request) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

        await queryWithRetry(() =>
            prisma.contact.delete({ where: { id: Number(id) } })
        )
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('[Enquiries API] DELETE error:', err.message)
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    }
}

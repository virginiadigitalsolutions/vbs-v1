import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function PATCH(req, { params }) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { id } = await params
        const body = await req.json()

        const link = await prisma.affiliateLink.update({
            where: { id: parseInt(id) },
            data: body
        })

        return NextResponse.json(link)
    } catch (err) {
        console.error('[affiliates PATCH]', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { id } = await params

        await prisma.affiliateLink.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('[affiliates DELETE]', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

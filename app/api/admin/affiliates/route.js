import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const links = await prisma.affiliateLink.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(links)
    } catch (err) {
        console.error('[affiliates GET]', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await req.json()
        const { title, url, platform, category, description, commission, isActive, isFeatured } = body

        if (!title || !url) {
            return NextResponse.json({ error: 'Title and URL are required.' }, { status: 400 })
        }

        const link = await prisma.affiliateLink.create({
            data: { title, url, platform, category, description, commission, isActive, isFeatured }
        })

        return NextResponse.json(link, { status: 201 })
    } catch (err) {
        console.error('[affiliates POST]', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

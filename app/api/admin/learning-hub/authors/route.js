import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
    try {
        const authors = await prisma.adminUser.findMany({
            orderBy: { name: 'asc' },
            select: {
                id: true, name: true, role: true, email: true,
                avatar: true, bio: true, designation: true, socialLinks: true,
                _count: { select: { posts: true } }
            }
        })
        return NextResponse.json(authors)
    } catch (err) {
        console.error('[authors GET]', err)
        return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { name, email, role, password, avatar, bio, designation, socialLinks } = body

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
        }

        const existing = await prisma.adminUser.findUnique({ where: { email } })
        if (existing) {
            return NextResponse.json({ error: 'Author with that email already exists' }, { status: 400 })
        }

        const author = await prisma.adminUser.create({
            data: {
                name: name.trim(),
                email: email.trim(),
                passwordHash: password,
                role: role || 'EDITOR',
                avatar: avatar || null,
                bio: bio || null,
                designation: designation || null,
                socialLinks: socialLinks || null
            },
            select: {
                id: true, name: true, role: true, email: true,
                avatar: true, bio: true, designation: true, socialLinks: true
            }
        })

        return NextResponse.json(author, { status: 201 })
    } catch (err) {
        console.error('[authors POST]', err)
        return NextResponse.json({ error: 'Failed to create author' }, { status: 500 })
    }
}

export async function PATCH(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { id, name, avatar, bio, designation, socialLinks } = body

        if (!id) return NextResponse.json({ error: 'Author ID is required' }, { status: 400 })

        const author = await prisma.adminUser.update({
            where: { id: parseInt(id) },
            data: {
                ...(name !== undefined && { name: name.trim() }),
                ...(avatar !== undefined && { avatar }),
                ...(bio !== undefined && { bio }),
                ...(designation !== undefined && { designation }),
                ...(socialLinks !== undefined && { socialLinks }),
            },
            select: {
                id: true, name: true, role: true, email: true,
                avatar: true, bio: true, designation: true, socialLinks: true
            }
        })

        return NextResponse.json(author)
    } catch (err) {
        console.error('[authors PATCH]', err)
        return NextResponse.json({ error: 'Failed to update author' }, { status: 500 })
    }
}

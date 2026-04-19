import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
    try {
        const session = await getAuthSession()
        if (!session || session.user.role !== 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const users = await prisma.adminUser.findMany({
            orderBy: { createdAt: 'desc' },
            select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true }
        })
        return NextResponse.json(users)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getAuthSession()
        if (!session || session.user.role !== 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { name, email, password, role } = body

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const existing = await prisma.adminUser.findUnique({ where: { email } })
        if (existing) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const user = await prisma.adminUser.create({
            data: {
                name,
                email,
                passwordHash: password, // For Phase 2 we are just storing it flat
                role: role || 'EDITOR',
                isActive: body.isActive !== undefined ? body.isActive : true
            },
            select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true }
        })

        return NextResponse.json(user, { status: 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

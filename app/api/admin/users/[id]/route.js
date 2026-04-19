import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function DELETE(request, { params }) {
    try {
        const session = await getAuthSession()
        if (!session || session.user.role !== 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id: paramId } = await params
        const userId = parseInt(paramId)

        if (userId === parseInt(session.user.id)) {
            return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
        }

        await prisma.adminUser.delete({
            where: { id: userId }
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function PATCH(request, { params }) {
    try {
        const session = await getAuthSession()
        if (!session || session.user.role !== 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id: paramId } = await params
        const userId = parseInt(paramId)
        const body = await request.json()

        const updateData = {}
        if (body.name) updateData.name = body.name
        if (body.email) updateData.email = body.email
        if (body.role) updateData.role = body.role
        if (body.isActive !== undefined) updateData.isActive = body.isActive
        if (body.password) updateData.passwordHash = body.password

        const updated = await prisma.adminUser.update({
            where: { id: userId },
            data: updateData
        })

        return NextResponse.json(updated)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

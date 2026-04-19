import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function DELETE(request, { params }) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { id: paramId } = await params
        const id = parseInt(paramId)

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid media ID' }, { status: 400 })
        }

        const media = await prisma.media.findUnique({
            where: { id }
        })

        if (!media) {
            return NextResponse.json({ error: 'Media not found' }, { status: 404 })
        }

        await prisma.media.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Media deleted successfully' })
    } catch (error) {
        console.error('Error deleting media:', error)
        return NextResponse.json({ error: 'Server error during delete' }, { status: 500 })
    }
}

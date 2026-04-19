import { NextResponse } from 'next/server'
import { prisma, queryWithRetry } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function GET() {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const media = await prisma.media.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(media)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const formData = await request.formData()
        const file = formData.get('file')

        if (!file) {
            return NextResponse.json({ error: 'No file received.' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Upload to Cloudinary
        const result = await uploadToCloudinary(buffer, file.name)
        
        const mediaRecord = await queryWithRetry(() => prisma.media.create({
            data: {
                filename: file.name,
                url: result.secure_url,
                mimeType: file.type,
                sizeBytes: file.size,
                base64Data: null // No longer storing base64 in DB
            }
        }))

        return NextResponse.json(mediaRecord, { status: 201 })
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error.message);
        return NextResponse.json({ error: error.message || 'Server error during upload' }, { status: 500 })
    }
}

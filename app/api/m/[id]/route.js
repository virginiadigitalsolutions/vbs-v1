import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request, { params }) {
    try {
        // Must use await for dynamic parameters in Next.js 15+
        const resolvedParams = await params
        const id = resolvedParams.id
        const mediaUrl = `/api/m/${id}`
        
        const media = await prisma.media.findUnique({
            where: { url: mediaUrl }
        })

        if (!media || !media.base64Data) {
            return new NextResponse('Not Found', { status: 404 })
        }

        const buffer = Buffer.from(media.base64Data, 'base64')

        // Include caching headers so Vercel can CDN map the images
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': media.mimeType,
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        })
    } catch (error) {
        console.error('Error fetching media via base64 API:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

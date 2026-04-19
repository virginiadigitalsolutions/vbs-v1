import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'

export async function GET() {
    try {
        const settings = await prisma.siteSettings.findFirst()
        return NextResponse.json(settings || {})
    } catch (error) {
        console.error('Settings GET Error:', error)
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await req.json()
        
        let settings = await prisma.siteSettings.findFirst()
        
        if (settings) {
            settings = await prisma.siteSettings.update({
                where: { id: settings.id },
                data: {
                    siteName: data.siteName,
                    logoUrl: data.logoUrl,
                    contactEmail: data.contactEmail,
                    contactPhone: data.contactPhone,
                    footerText: data.footerText,
                    seoDefaultTitle: data.seoDefaultTitle,
                    seoDefaultDesc: data.seoDefaultDesc,
                    socialLinks: data.socialLinks,
                    navLinks: data.navLinks,
                    blogBannerTitle: data.blogBannerTitle,
                    blogBannerSubtitle: data.blogBannerSubtitle,
                    blogMetaTitle: data.blogMetaTitle,
                    blogMetaDesc: data.blogMetaDesc
                }
            })
        } else {
            settings = await prisma.siteSettings.create({
                data: {
                    siteName: data.siteName,
                    logoUrl: data.logoUrl,
                    contactEmail: data.contactEmail,
                    contactPhone: data.contactPhone,
                    footerText: data.footerText,
                    seoDefaultTitle: data.seoDefaultTitle,
                    seoDefaultDesc: data.seoDefaultDesc,
                    socialLinks: data.socialLinks,
                    navLinks: data.navLinks,
                    blogBannerTitle: data.blogBannerTitle,
                    blogBannerSubtitle: data.blogBannerSubtitle,
                    blogMetaTitle: data.blogMetaTitle,
                    blogMetaDesc: data.blogMetaDesc
                }
            })
        }

        // Bust the public layout cache so Navbar/Footer update immediately
        revalidatePath('/', 'layout')

        return NextResponse.json({ success: true, settings })
    } catch (error) {
        console.error('Settings PUT Error:', error)
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
    }
}

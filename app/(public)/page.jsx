import SectionRenderer from '@/components/SectionRenderer'
import AffiliateLinksSection from '@/components/AffiliateLinksSection'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
    try {
        const page = await queryWithRetry(() =>
            prisma.page.findUnique({ where: { slug: 'home' } })
        )
        return {
            title: page?.title || 'Virginia Business Solutions',
            description: page?.metaDesc || 'Clear digital career guidance in India for students and working professionals.',
            alternates: { canonical: '/' },
        }
    } catch {
        return {
            title: 'Virginia Business Solutions',
            description: 'Clear digital career guidance in India for students and working professionals.',
        }
    }
}

export default async function HomePage() {
    let page = null
    try {
        page = await queryWithRetry(() =>
            prisma.page.findUnique({
                where: { slug: 'home' },
                include: {
                    sections: {
                        where: { isActive: true },
                        orderBy: { order: 'asc' },
                    },
                },
            })
        )
    } catch (err) {
        console.error('[HomePage] DB error:', err.message)
    }

    if (!page) notFound()

    return (
        <main className="min-h-screen selection:bg-primary-500/30">
            <SectionRenderer sections={page.sections} />
            <AffiliateLinksSection title="Recommended Resources" />
        </main>
    )
}



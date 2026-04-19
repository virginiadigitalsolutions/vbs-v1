import SectionRenderer from '@/components/SectionRenderer'
import AffiliateLinksSection from '@/components/AffiliateLinksSection'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
    const page = await queryWithRetry(() => prisma.page.findUnique({ where: { slug: 'career-guides' } }))
    return {
        title: page?.title || 'Career Guides',
        description: page?.metaDesc || 'Explore digital career paths in India.',
        alternates: { canonical: '/career-guides' },
    }
}

export default async function CareerGuidesPage() {
    const page = await queryWithRetry(() =>
        prisma.page.findUnique({
            where: { slug: 'career-guides' },
            include: {
                sections: {
                    where: { isActive: true },
                    orderBy: { order: 'asc' },
                },
            },
        })
    )

    if (!page) notFound()

    return (
        <main className="min-h-screen bg-white">
            <SectionRenderer sections={page.sections} />
            <AffiliateLinksSection title="Recommended Career Platforms" />
        </main>
    )
}

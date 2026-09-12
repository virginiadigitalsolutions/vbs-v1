import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'
import SectionRenderer from '@/components/SectionRenderer'
import AffiliateLinksSection from '@/components/AffiliateLinksSection'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

const getPage = unstable_cache(
    async (slug) => queryWithRetry(() =>
        prisma.page.findUnique({
            where: { slug },
            include: { sections: { where: { isActive: true }, orderBy: { order: 'asc' } } },
        })
    ),
    ['page-career-guides'],
    { revalidate: 3600, tags: ['page-career-guides'] }
)

export async function generateMetadata() {
    const page = await getPage('career-guides')
    return {
        title: page?.title || 'Career Guides',
        description: page?.metaDesc || 'Explore digital career paths in India.',
        alternates: { canonical: '/career-guides' },
    }
}

export default async function CareerGuidesPage() {
    const page = await getPage('career-guides')
    if (!page) notFound()

    return (
        <main className="min-h-screen bg-white">
            <SectionRenderer sections={page.sections} />
            <Suspense fallback={null}>
                <AffiliateLinksSection title="Recommended Career Platforms" />
            </Suspense>
        </main>
    )
}

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
    ['page-digital-skills'],
    { revalidate: 3600, tags: ['page-digital-skills'] }
)

export async function generateMetadata() {
    const page = await getPage('digital-skills')
    return {
        title: page?.title || 'Digital Skills Guide',
        description: page?.metaDesc || 'Digital skills guide for students and professionals in India.',
        alternates: { canonical: '/digital-skills' },
    }
}

export default async function DigitalSkillsPage() {
    const page = await getPage('digital-skills')
    if (!page) notFound()

    return (
        <main className="min-h-screen selection:bg-primary-500/30">
            <SectionRenderer sections={page.sections} />
            <Suspense fallback={null}>
                <AffiliateLinksSection title="Recommended Courses & Tools" />
            </Suspense>
        </main>
    )
}

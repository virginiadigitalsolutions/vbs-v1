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
    ['page-courses-certifications'],
    { revalidate: 3600, tags: ['page-courses-certifications'] }
)

export async function generateMetadata() {
    const page = await getPage('courses-certifications')
    return {
        title: page?.title || 'Courses & Certifications',
        description: page?.metaDesc || 'Explore structured digital courses and certifications in India.',
        alternates: { canonical: '/courses-certifications' },
    }
}

export default async function CoursesCertificationsPage() {
    const page = await getPage('courses-certifications')
    if (!page) notFound()

    return (
        <main className="min-h-screen bg-white">
            <SectionRenderer sections={page.sections} />
            <Suspense fallback={null}>
                <AffiliateLinksSection title="Top Rated Platforms" />
            </Suspense>
        </main>
    )
}

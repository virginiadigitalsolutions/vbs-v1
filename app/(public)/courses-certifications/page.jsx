import SectionRenderer from '@/components/SectionRenderer'
import AffiliateLinksSection from '@/components/AffiliateLinksSection'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
    const page = await queryWithRetry(() => prisma.page.findUnique({ where: { slug: 'courses-certifications' } }))
    return {
        title: page?.title || 'Courses & Certifications',
        description: page?.metaDesc || 'Explore structured digital courses and certifications in India.',
        alternates: { canonical: '/courses-certifications' },
    }
}

export default async function CoursesCertificationsPage() {
    const page = await queryWithRetry(() =>
        prisma.page.findUnique({
            where: { slug: 'courses-certifications' },
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
            <AffiliateLinksSection title="Top Rated Platforms" />
        </main>
    )
}

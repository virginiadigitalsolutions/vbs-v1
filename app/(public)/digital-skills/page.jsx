import SectionRenderer from '@/components/SectionRenderer'
import AffiliateLinksSection from '@/components/AffiliateLinksSection'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
    const page = await queryWithRetry(() => prisma.page.findUnique({ where: { slug: 'digital-skills' } }))
    return {
        title: page?.title || 'Digital Skills Guide',
        description: page?.metaDesc || 'Digital skills guide for students and professionals in India.',
        alternates: { canonical: '/digital-skills' },
    }
}

export default async function DigitalSkillsPage() {
    const page = await queryWithRetry(() =>
        prisma.page.findUnique({
            where: { slug: 'digital-skills' },
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
        <main className="min-h-screen selection:bg-primary-500/30">
            <SectionRenderer sections={page.sections} />
            <AffiliateLinksSection title="Recommended Courses & Tools" />
        </main>
    )
}

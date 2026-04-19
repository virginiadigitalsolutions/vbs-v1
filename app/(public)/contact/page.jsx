import SectionRenderer from '@/components/SectionRenderer'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
    const page = await queryWithRetry(() => prisma.page.findUnique({ where: { slug: 'contact' } }))
    return {
        title: page?.title || 'Contact | Digital Career Guidance Platform in India',
        description: page?.metaDesc || 'Get in touch for general queries, feedback, or partnership inquiries related to digital career guidance, skills, and structured learning pathways.',
        alternates: { canonical: '/contact' },
    }
}

export default async function ContactPage() {
    const page = await queryWithRetry(() =>
        prisma.page.findUnique({
            where: { slug: 'contact' },
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
        </main>
    )
}

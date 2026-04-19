import SectionRenderer from '@/components/SectionRenderer'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
    const page = await queryWithRetry(() => prisma.page.findUnique({ where: { slug: 'about-us' } }))
    return {
        title: page?.title || 'About | Digital Career Guidance Platform in India',
        description: page?.metaDesc || 'Learn why this digital career guidance platform exists and how it helps students and professionals in India make informed decisions about skills, courses, and long-term growth.',
        alternates: { canonical: '/about-us' },
    }
}

export default async function AboutPage() {
    const page = await queryWithRetry(() =>
        prisma.page.findUnique({
            where: { slug: 'about-us' },
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

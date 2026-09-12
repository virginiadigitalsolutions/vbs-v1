import { unstable_cache } from 'next/cache'
import SectionRenderer from '@/components/SectionRenderer'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

const getPage = unstable_cache(
    async (slug) => queryWithRetry(() =>
        prisma.page.findUnique({
            where: { slug },
            include: { sections: { where: { isActive: true }, orderBy: { order: 'asc' } } },
        })
    ),
    ['page-about-us'],
    { revalidate: 3600, tags: ['page-about-us'] }
)

export async function generateMetadata() {
    const page = await getPage('about-us')
    return {
        title: page?.title || 'About | Digital Career Guidance Platform in India',
        description: page?.metaDesc || 'Learn why this digital career guidance platform exists and how it helps students and professionals in India make informed decisions about skills, courses, and long-term growth.',
        alternates: { canonical: '/about-us' },
    }
}

export default async function AboutPage() {
    const page = await getPage('about-us')
    if (!page) notFound()

    return (
        <main className="min-h-screen selection:bg-primary-500/30">
            <SectionRenderer sections={page.sections} />
        </main>
    )
}

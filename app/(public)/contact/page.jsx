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
    ['page-contact'],
    { revalidate: 3600, tags: ['page-contact'] }
)

export async function generateMetadata() {
    const page = await getPage('contact')
    return {
        title: page?.title || 'Contact | Digital Career Guidance Platform in India',
        description: page?.metaDesc || 'Get in touch for general queries, feedback, or partnership inquiries related to digital career guidance, skills, and structured learning pathways.',
        alternates: { canonical: '/contact' },
    }
}

export default async function ContactPage() {
    const page = await getPage('contact')
    if (!page) notFound()

    return (
        <main className="min-h-screen selection:bg-primary-500/30">
            <SectionRenderer sections={page.sections} />
        </main>
    )
}

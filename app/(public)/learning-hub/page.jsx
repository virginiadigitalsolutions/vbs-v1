import SectionRenderer from '@/components/SectionRenderer'
import { prisma, queryWithRetry } from '@/lib/db'
import { getLearningHubListingData } from '@/lib/learning-hub'

export async function generateMetadata() {
    const page = await queryWithRetry(() => prisma.page.findUnique({ where: { slug: 'learning-hub' } }))
    return {
        title: page?.title || 'VBS Learning Hub',
        description: page?.metaDesc || 'Insights, tutorials, and architectural deep-dives from the VBS engineering team.',
        alternates: { canonical: '/learning-hub' },
    }
}

export default async function BlogIndexPage({ searchParams }) {
    const resolvedParams = await searchParams
    const categoryFilter = resolvedParams?.category ? parseInt(resolvedParams.category, 10) : null
    const searchQuery = resolvedParams?.q?.trim() || ''
    const listing = await getLearningHubListingData({ categoryId: categoryFilter, searchQuery })

    return (
        <div className="min-h-screen bg-[#F4F6F9]">
            <SectionRenderer
                sections={listing.sectionsToRender}
                context={listing}
            />
        </div>
    )
}

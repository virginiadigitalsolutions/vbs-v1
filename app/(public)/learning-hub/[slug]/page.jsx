import SectionRenderer from '@/components/SectionRenderer'
import { prisma, queryWithRetry } from '@/lib/db'
import { redirect } from 'next/navigation'
import { getLearningHubListingData } from '@/lib/learning-hub'

export async function generateMetadata({ params }) {
    const { slug } = await params

    const category = await queryWithRetry(() =>
        prisma.category.findUnique({
            where: { slug },
            select: { id: true, name: true },
        })
    )

    if (category) {
        return {
            title: `${category.name} | VBS Learning Hub`,
            description: `Browse ${category.name} articles on the VBS Learning Hub.`,
            alternates: { canonical: `/learning-hub/${slug}` },
        }
    }

    return {
        title: 'VBS Learning Hub',
        description: 'Insights, tutorials, and practical articles from the VBS Learning Hub.',
    }
}

export default async function BlogPostRedirectPage({ params }) {
    const { slug } = await params

    const category = await queryWithRetry(() =>
        prisma.category.findUnique({
            where: { slug },
            select: { id: true },
        })
    )

    if (category) {
        const listing = await getLearningHubListingData({ categoryId: category.id })

        return (
            <div className="min-h-screen bg-[#F4F6F9]">
                <SectionRenderer
                    sections={listing.sectionsToRender}
                    context={listing}
                />
            </div>
        )
    }

    const post = await queryWithRetry(() =>
        prisma.post.findUnique({
            where: { slug },
            include: { category: true }
        })
    )

    if (!post) {
        redirect('/learning-hub')
    }

    const categorySlug = post.category?.slug || 'posts'
    redirect(`/learning-hub/${categorySlug}/${post.slug}`)
}

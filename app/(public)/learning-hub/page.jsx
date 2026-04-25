import { prisma, queryWithRetry } from '@/lib/db'
import SectionRenderer from '@/components/SectionRenderer'

const fallbackSections = [
    {
        id: 'learning-hub-hero-fallback',
        isActive: true,
        order: 1,
        type: 'hero',
        data: {
            layout: 'learning_hub_hero',
            tag: 'Learning Hub',
            heading: 'Search the Learning Hub and dive into the latest build notes.',
            subheading: 'Filter by category, search by topic, and jump into practical articles from the VBS team.',
            searchPlaceholder: 'Search the Learning Hub',
            featuredLabel: 'Featured article',
            featuredCtaText: 'Read article',
        },
    },
    {
        id: 'learning-hub-feed-fallback',
        isActive: true,
        order: 2,
        type: 'cards',
        data: {
            layout: 'learning_hub_feed',
            tag: 'Engineering Notes',
            heading: 'Latest articles from the Learning Hub',
            subheading: 'Browse the newest practical articles, guides, and breakdowns from the VBS team.',
            categoriesLabel: 'Categories',
            allTopicsLabel: 'All Topics',
            clearLabel: 'Clear',
            readButtonText: 'Read',
            emptyTitle: 'No Posts Found',
            emptyText: 'We couldn&apos;t find any articles matching your current filter.',
            clearFiltersText: 'Clear Filters',
        },
    },
]

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

    const whereClause = { isPublished: true }
    if (categoryFilter && Number.isFinite(categoryFilter)) {
        whereClause.categoryId = categoryFilter
    }
    if (searchQuery) {
        whereClause.OR = [
            { title: { contains: searchQuery } },
            { excerpt: { contains: searchQuery } },
            { metaTitle: { contains: searchQuery } },
            { metaDesc: { contains: searchQuery } },
            { author: { name: { contains: searchQuery } } },
            { category: { name: { contains: searchQuery } } },
        ]
    }

    const [posts, categories, page] = await Promise.all([
        queryWithRetry(() => prisma.post.findMany({
            where: whereClause,
            orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
            include: {
                author: { select: { id: true, name: true, avatar: true } },
                category: true,
                tags: true,
            },
        })),
        queryWithRetry(() => prisma.category.findMany({
            where: { posts: { some: { isPublished: true } } },
            include: {
                _count: {
                    select: { posts: { where: { isPublished: true } } }
                }
            },
            orderBy: { name: 'asc' }
        })),
        queryWithRetry(() => prisma.page.findUnique({
            where: { slug: 'learning-hub' },
            include: {
                sections: {
                    where: { isActive: true },
                    orderBy: { order: 'asc' }
                }
            }
        }))
    ])

    const featuredPost = posts[0] || null
    const visiblePosts = posts.length > 1 ? posts.slice(1) : posts
    const sectionsToRender = page?.sections?.length ? page.sections : fallbackSections

    return (
        <div className="min-h-screen bg-[#F4F6F9]">
            <SectionRenderer
                sections={sectionsToRender}
                context={{ posts, categories, featuredPost, visiblePosts, categoryFilter, searchQuery }}
            />
        </div>
    )
}

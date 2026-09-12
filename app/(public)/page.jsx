import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'
import SectionRenderer from '@/components/SectionRenderer'
import AffiliateLinksSection from '@/components/AffiliateLinksSection'
import JsonLd from '@/components/ui/JsonLd'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

// Cached at the Next.js data-cache level — shared between generateMetadata and the page.
// Revalidates with the route's ISR interval (inherits revalidate=3600 from layout).
const getHomePage = unstable_cache(
    async () => {
        return await queryWithRetry(() =>
            prisma.page.findUnique({
                where: { slug: 'home' },
                include: {
                    sections: {
                        where: { isActive: true },
                        orderBy: { order: 'asc' },
                    },
                },
            })
        )
    },
    ['home-page'],
    { revalidate: 3600, tags: ['home-page'] }
)

export async function generateMetadata() {
    try {
        const page = await getHomePage()
        return {
            title: page?.title || 'Virginia Business Solutions',
            description: page?.metaDesc || 'Clear digital career guidance in India for students and working professionals.',
            alternates: { canonical: '/' },
        }
    } catch {
        return {
            title: 'Virginia Business Solutions',
            description: 'Clear digital career guidance in India for students and working professionals.',
            alternates: { canonical: '/' },
        }
    }
}

export default async function HomePage() {
    let page = null
    try {
        page = await getHomePage()
    } catch (err) {
        console.error('[HomePage] DB error:', err.message)
    }

    if (!page) notFound()

    const faqItems = page.sections
        .find((section) => ['home_faq', 'generic_faq'].includes(section.data?.layout))
        ?.data?.items || []

    return (
        <main className="min-h-screen selection:bg-primary-500/30">
            {faqItems.length > 0 && <JsonLd type="FAQPage" data={{ items: faqItems }} />}
            <SectionRenderer sections={page.sections} />
            {/* Stream affiliate links in after main content — avoids blocking page render */}
            <Suspense fallback={null}>
                <AffiliateLinksSection title="Recommended Resources" />
            </Suspense>
        </main>
    )
}

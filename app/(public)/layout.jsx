import { cache } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SearchPalette from '@/components/ui/SearchPalette'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import JsonLd from '@/components/ui/JsonLd'
import PageTransition from '@/components/ui/PageTransition'
import { prisma, queryWithRetry } from '@/lib/db'

// 1 hour — site settings (logo, nav links, socials) rarely change.
// ISR will revalidate in the background; visitors always get cached HTML.
export const revalidate = 3600

// React.cache() deduplicates this call within a single render pass.
// Both this layout and any child server component that calls it get the same result
// with zero extra DB round-trips.
const getSiteSettings = cache(async () => {
    try {
        return await queryWithRetry(() => prisma.siteSettings.findFirst())
    } catch (err) {
        console.error('[PublicLayout] Failed to fetch site settings:', err.message)
        return null
    }
})

export default async function PublicLayout({ children }) {
    const siteSettings = await getSiteSettings()

    return (
        <>
            <JsonLd
                type="Organization"
                data={{
                    email: siteSettings?.contactEmail,
                    socialLinks: siteSettings?.socialLinks ? Object.values(siteSettings.socialLinks) : [],
                }}
            />
            <JsonLd type="WebSite" />
            <Navbar settings={siteSettings} />
            <SearchPalette />
            <PageTransition>
                <main>{children}</main>
            </PageTransition>
            <Footer settings={siteSettings} />
        </>
    )
}

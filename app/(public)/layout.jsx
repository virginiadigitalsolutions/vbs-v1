import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SearchPalette from '@/components/ui/SearchPalette'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import JsonLd from '@/components/ui/JsonLd'
import PageTransition from '@/components/ui/PageTransition'
import { prisma, queryWithRetry } from '@/lib/db'

export const revalidate = 300

export default async function PublicLayout({ children }) {
    let siteSettings = null
    try {
        siteSettings = await queryWithRetry(() => prisma.siteSettings.findFirst())
    } catch (err) {
        console.error('[PublicLayout] Failed to fetch site settings:', err.message)
        // Navbar/Footer gracefully fall back to defaults when settings is null.
    }

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

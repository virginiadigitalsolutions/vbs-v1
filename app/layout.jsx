import Script from 'next/script'
import { Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Providers from '@/app/providers'
import ClientEnhancements from '@/components/ui/ClientEnhancements'
import { getBaseUrl, SITE } from '@/lib/seo'
import './globals.css'

// Only load the weights actually used in the design.
// Dropped 800 & 900 — saves ~50KB of font data. Heavy headings use font-bold (700).
// display: swap ensures text is visible immediately while the font loads.
const jost = Jost({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    preload: true,
})

export const metadata = {
    title: { default: 'VBS - Job-Ready Digital Skills', template: '%s | VBS' },
    description: SITE.description,
    metadataBase: new URL(getBaseUrl()),
    applicationName: SITE.name,
    manifest: '/manifest.json',
    alternates: {
        types: { 'application/rss+xml': [{ url: '/feed.xml', title: 'VBS Learning Hub' }] },
    },
    openGraph: {
        type: 'website',
        siteName: SITE.name,
        locale: SITE.locale,
        title: 'VBS - Job-Ready Digital Skills',
        description: SITE.description,
    },
    twitter: { card: 'summary_large_image' },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    verification: {
        google: 'SGv4z2To9lhb1essbiWa5Jbz-z0sm6pYVMl9vDwhdFk',
        // Bing Webmaster Tools (feeds ChatGPT search / Copilot): set BING_SITE_VERIFICATION
        ...(process.env.BING_SITE_VERIFICATION
            ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } }
            : {}),
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'VBS',
    },
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#4873AE',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en-IN">
            <head>
                {/* Preconnect to Cloudinary so image DNS + TLS is resolved before images load */}
                <link rel="preconnect" href="https://res.cloudinary.com" />
                {/* GA: lazyOnload = loads after everything else, never blocks main thread */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-Q1LM9373N7"
                    strategy="lazyOnload"
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-Q1LM9373N7', { send_page_view: false });
                    `}
                </Script>
            </head>
            <body className={`${jost.className} antialiased relative min-h-screen`}>
                <Providers>
                    <ClientEnhancements />
                    {children}
                    <Analytics />
                    <SpeedInsights />
                </Providers>
            </body>
        </html>
    )
}

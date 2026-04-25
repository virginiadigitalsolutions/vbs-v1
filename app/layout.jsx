import Script from 'next/script'
import { Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Providers from '@/app/providers'
import ClientEnhancements from '@/components/ui/ClientEnhancements'
import './globals.css'

const jost = Jost({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return 'http://localhost:3000'
}

export const metadata = {
    title: { default: 'VBS - Job-Ready Digital Skills', template: '%s | VBS' },
    description:
        'Practical courses, career guides and expert mentorship for students, early-career and working professionals.',
    metadataBase: new URL(getBaseUrl()),
    manifest: '/manifest.json',
    verification: {
        google: 'SGv4z2To9lhb1essbiWa5Jbz-z0sm6pYVMl9vDwhdFk',
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
        <html lang="en">
            <head>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-Q1LM9373N7"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-Q1LM9373N7');
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

import { Jost } from 'next/font/google'
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
            <body className={`${jost.className} antialiased relative min-h-screen`}>
                <Providers>
                    <ClientEnhancements />
                    {children}
                </Providers>
            </body>
        </html>
    )
}

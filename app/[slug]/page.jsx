import SectionRenderer from '@/components/SectionRenderer'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const page = await queryWithRetry(() => prisma.page.findUnique({ where: { slug } }))
    if (!page) return { title: 'Not Found' }

    return {
        title: page.title,
        description: page.metaDesc || 'VBS Digital custom page.',
        alternates: { canonical: `/${slug}` },
    }
}

export default async function DynamicCMSPage({ params }) {
    // If it conflicts with existing hardcoded routes (about, contact, etc.), Next.js favors the literal folders first.
    // This strictly handles anything NOT explicitly defined in the app structure.

    const { slug } = await params

    if (slug === 'home' || slug === 'admin' || slug === 'api') {
        notFound()
    }

    const page = await queryWithRetry(() =>
        prisma.page.findUnique({
            where: { slug },
            include: {
                sections: {
                    where: { isActive: true },
                    orderBy: { order: 'asc' },
                },
            },
        })
    )

    if (!page) {
        notFound()
    }

    const isLegalPage = slug === 'privacy-policy' || slug === 'terms-and-conditions' || page.sections.some(s => s.data?.tag === 'Legal documentation')

    if (isLegalPage) {
        const heroData = page.sections.find(s => s.type === 'hero')?.data || {}
        const textData = page.sections.find(s => s.type === 'text')?.data || {}
        const otherLegalSlug = slug === 'privacy-policy' ? 'terms-and-conditions' : 'privacy-policy'
        const otherLegalLabel = slug === 'privacy-policy' ? 'Terms & Conditions' : 'Privacy Policy'

        return (
            <main className="bg-[#fafafa] dark:bg-[#0B1120] min-h-screen">
                {/* ─── Hero Section ─────────────────────────────────────────── */}
                <div className="relative pt-32 pb-48 md:pt-40 md:pb-56 overflow-hidden">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary-950 via-primary-900 to-slate-950" />
                    
                    {/* Decorative SVG pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

                    {/* Floating orbs */}
                    <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none animate-morph-blob" />
                    <div className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute top-[40%] right-[30%] w-[250px] h-[250px] bg-indigo-400/6 rounded-full blur-[80px] pointer-events-none" />
                    
                    {/* Bottom wave edge */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-16 md:h-24 text-[#fafafa] dark:text-[#0B1120]" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none">
                            <path d="M0 96L60 85.3C120 75 240 53 360 48C480 43 600 53 720 58.7C840 64 960 64 1080 58.7C1200 53 1320 43 1380 37.3L1440 32V96H1380C1320 96 1200 96 1080 96C960 96 840 96 720 96C600 96 480 96 360 96C240 96 120 96 60 96H0Z" fill="currentColor"/>
                        </svg>
                    </div>

                    <Container className="relative z-10 text-center max-w-4xl">
                        {heroData.tag && (
                            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-200 text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-xl shadow-lg shadow-black/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse shadow-[0_0_8px_rgba(72,115,174,0.6)]" />
                                {heroData.tag}
                            </span>
                        )}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.95] drop-shadow-sm">
                            {heroData.heading || page.title}
                        </h1>
                        <p className="text-lg md:text-xl text-primary-200/60 font-medium max-w-2xl mx-auto leading-relaxed">
                            {heroData.subheading || page.metaDesc}
                        </p>
                        
                        {/* Last updated badge */}
                        <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                            <svg className="w-3.5 h-3.5 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-primary-200/60 font-semibold">Last updated: March 2026</span>
                        </div>
                    </Container>
                </div>

                {/* ─── Content Card ─────────────────────────────────────────── */}
                <Container className="-mt-28 md:-mt-36 relative z-20 mb-20 max-w-4xl">
                    <div className="bg-white dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-slate-800 p-8 md:p-14 lg:p-20 overflow-hidden relative">
                        {/* Decorative top gradient line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-primary-500/30 to-transparent" />
                        
                        {/* Subtle corner accent */}
                        <div className="absolute top-0 right-0 w-60 h-60 bg-primary-50/50 dark:bg-primary-900/10 rounded-bl-full pointer-events-none -z-10" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-50/30 dark:bg-violet-900/5 rounded-tr-full pointer-events-none -z-10" />
                        
                        <style dangerouslySetInnerHTML={{ __html: `
                            .legal-content h3 {
                                font-size: 1.65rem !important;
                                font-weight: 600 !important;
                                color: #111827 !important;
                                margin-top: 3rem !important;
                                margin-bottom: 1.25rem !important;
                                padding-bottom: 1rem !important;
                                border-bottom: 1px solid #e5e7eb !important;
                                letter-spacing: -0.01em !important;
                                line-height: 1.3 !important;
                            }
                            [data-theme="dark"] .legal-content h3 {
                                color: #f1f5f9 !important;
                                border-bottom-color: #1e293b !important;
                            }
                            .legal-content p {
                                font-size: 1rem !important;
                                line-height: 1.85 !important;
                                color: #4b5563 !important;
                                margin-bottom: 1rem !important;
                            }
                            [data-theme="dark"] .legal-content p {
                                color: #cbd5e1 !important;
                            }
                            .legal-content ul {
                                margin-bottom: 1.5rem !important;
                                padding-left: 1.5rem !important;
                            }
                            .legal-content li {
                                color: #4b5563 !important;
                                margin-top: 0.5rem !important;
                                margin-bottom: 0.5rem !important;
                                line-height: 1.75 !important;
                            }
                            [data-theme="dark"] .legal-content li {
                                color: #cbd5e1 !important;
                            }
                            .legal-content strong {
                                color: #111827 !important;
                                font-weight: 700 !important;
                            }
                            [data-theme="dark"] .legal-content strong {
                                color: #f1f5f9 !important;
                            }
                            .legal-content a {
                                color: #4873AE !important;
                                font-weight: 600 !important;
                                text-decoration: none !important;
                            }
                            .legal-content a:hover {
                                text-decoration: underline !important;
                            }
                        ` }} />
                        <div 
                            className="legal-content max-w-none"
                            dangerouslySetInnerHTML={{ __html: textData.body || '' }} 
                        />
                    </div>

                    {/* ─── Bottom Navigation ─────────────────────────────────── */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                        <Link
                            href={`/${otherLegalSlug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-primary-700 shadow-sm hover:shadow-md transition-all group"
                        >
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Read {otherLegalLabel}
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 text-sm font-bold text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 shadow-sm transition-all"
                        >
                            Have questions? Contact us →
                        </Link>
                    </div>
                </Container>
            </main>
        )
    }

    return <SectionRenderer sections={page.sections} />
}

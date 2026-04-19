import { prisma, queryWithRetry } from '@/lib/db'
import Link from 'next/link'
import { HiOutlineExternalLink, HiOutlineStar } from 'react-icons/hi'

export async function generateMetadata() {
    return {
        title: 'Recommended Resources | Virginia Business Solutions',
        description: 'Handpicked courses, tools, and certifications we recommend for building real digital skills.',
        alternates: { canonical: '/resources' },
    }
}

export default async function ResourcesPage() {
    const links = await queryWithRetry(() =>
        prisma.affiliateLink.findMany({
            where: { isActive: true },
            orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        })
    )

    const featured = links.filter(l => l.isFeatured)
    const regular = links.filter(l => !l.isFeatured)

    return (
        <main className="min-h-screen font-sans selection:bg-primary-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-gray-100">
                {/* Glowing Background Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary-200/50 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-200/40 blur-[100px] pointer-events-none" />
                <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-primary-500 blur-[100px] pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary-100 shadow-sm backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">Curated by our team</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-gray-900 drop-shadow-sm">
                        Recommended Resources
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Handpicked courses, certifications, and tools we genuinely recommend. Every link has been evaluated for quality, relevance, and long-term value.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
                {/* Featured Section */}
                {featured.length > 0 && (
                    <div className="mb-24">
                        <div className="flex items-center justify-center gap-3 mb-10">
                            <div className="h-px w-12 bg-linear-to-r from-transparent to-primary-400/50"></div>
                            <HiOutlineStar className="text-primary-500 text-2xl drop-shadow-sm" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Featured Picks</h2>
                            <div className="h-px w-12 bg-linear-to-l from-transparent to-primary-400/50"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featured.map(link => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-white backdrop-blur-lg border border-gray-100 rounded-3xl p-8 hover:bg-[#EDF4FF] transition-all duration-500 block overflow-hidden isolate shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.08)] hover:-translate-y-2 ring-1 ring-amber-500/30"
                                >
                                    {/* Glassmorphism Shine Effect */}
                                    <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-primary-50/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                    {/* Featured Glow Indicator */}
                                    <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-primary-400/0 via-primary-500 to-primary-400/0 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="flex items-start justify-between mb-5 relative z-10">
                                        <span className="text-[11px] font-bold text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100 backdrop-blur-sm shadow-sm">
                                            {link.platform}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-[#EDF4FF] flex items-center justify-center group-hover:bg-primary-50 group-hover:rotate-12 transition-all duration-300 border border-gray-200">
                                            <HiOutlineExternalLink className="text-gray-400 group-hover:text-primary-600 transition-colors" />
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-primary-600 transition-colors relative z-10">{link.title}</h3>

                                    {link.description && (
                                        <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 line-clamp-3 relative z-10 group-hover:text-gray-700 transition-colors">{link.description}</p>
                                    )}

                                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider relative z-10 mt-auto">
                                        <span className="bg-[#EDF4FF] px-2.5 py-1.5 rounded-md border border-gray-200">{link.category}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Resources */}
                {regular.length > 0 && (
                    <div className="relative">
                        <div className="absolute left-0 top-0 w-1/3 h-px bg-linear-to-r from-primary-500/30 to-transparent"></div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8 pt-8">All Resources</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {regular.map(link => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl p-5 hover:bg-[#EDF4FF] transition-all duration-300 flex items-center gap-6 hover:border-primary-200 hover:shadow-[0_4px_15px_rgba(99,102,241,0.05)]"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-[#EDF4FF] flex items-center justify-center border border-gray-100 shrink-0 group-hover:bg-primary-50 group-hover:border-primary-200 group-hover:scale-110 transition-all duration-300">
                                        <HiOutlineExternalLink className="text-gray-400 group-hover:text-primary-600 text-xl transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 text-base group-hover:text-primary-700 transition-colors truncate">{link.title}</h3>
                                        {link.description && (
                                            <p className="text-sm text-gray-500 font-medium mt-1.5 truncate group-hover:text-gray-600 transition-colors">{link.description}</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-3">
                                            <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-1 rounded-md border border-primary-200">{link.platform}</span>
                                            <span className="text-[10px] font-bold text-gray-500 bg-[#EDF4FF] px-2 py-1 rounded-md border border-gray-200">{link.category}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {links.length === 0 && (
                    <div className="text-center py-32 bg-white border border-gray-100 shadow-sm rounded-3xl backdrop-blur-sm mt-12">
                        <div className="w-16 h-16 bg-[#EDF4FF] rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                            <HiOutlineStar className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-800 text-lg font-medium">Resources coming soon.</p>
                        <p className="text-gray-500 text-sm mt-2">Check back later for our curated recommendations.</p>
                    </div>
                )}

                {/* Disclaimer */}
                <div className="mt-24 relative overflow-hidden bg-linear-to-r from-primary-50 via-white to-primary-50 border border-gray-100 rounded-2xl p-8 text-center backdrop-blur-md shadow-sm">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-primary-300 to-transparent"></div>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
                        <strong className="text-primary-700 mr-2">Disclosure:</strong>
                        Some links on this page are affiliate links. If you choose to make a purchase through these links, we may earn a small commission at no extra cost to you. We only recommend resources we genuinely believe will help you in your journey.
                    </p>
                </div>
            </div>
        </main>
    )
}

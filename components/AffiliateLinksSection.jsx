import { prisma, queryWithRetry } from '@/lib/db'
import { HiOutlineExternalLink, HiOutlineStar } from 'react-icons/hi'

/**
 * Server component that fetches and renders active affiliate links.
 * Can be embedded in any page. Optionally filter by category.
 */
export default async function AffiliateLinksSection({ category, limit, title = 'Recommended Resources', showDisclosure = true }) {
    const where = { isActive: true }
    if (category) where.category = category

    const links = await queryWithRetry(() =>
        prisma.affiliateLink.findMany({
            where,
            orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
            take: limit || undefined,
        })
    )

    if (links.length === 0) return null

    return (
        <section className="relative py-20 md:py-28 px-6 text-gray-900 dark:text-gray-100 overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1120]">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-100/30 dark:bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-14">
                    <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                        <span className="w-8 h-[2px] bg-gradient-to-r from-primary-400 to-accent-400 rounded-full" />
                        Curated by our team
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-base mt-4 max-w-xl mx-auto leading-relaxed">
                        Handpicked platforms and programs we genuinely recommend for building real skills.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {links.map(link => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group bg-white dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 block shadow-sm hover:shadow-lg ${link.isFeatured ? 'ring-1 ring-amber-400/30' : ''}`}
                        >
                            {/* Top accent line */}
                            <div className={`absolute top-0 inset-x-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${link.isFeatured ? 'bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0' : 'bg-gradient-to-r from-primary-400/0 via-primary-500 to-primary-400/0'}`}></div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${link.isFeatured ? 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/20 dark:border-amber-700/30' : 'text-primary-700 bg-primary-50 border-primary-100 dark:text-primary-400 dark:bg-primary-900/20 dark:border-primary-700/30'}`}>
                                        {link.platform}
                                    </span>
                                    {link.isFeatured && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-700/30">
                                            <HiOutlineStar className="text-[11px] text-amber-500" /> Top Pick
                                        </span>
                                    )}
                                </div>
                                <div className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-slate-700 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30">
                                    <HiOutlineExternalLink className="text-sm text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{link.title}</h3>

                            {link.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 line-clamp-2">{link.description}</p>
                            )}

                            <div className="mt-auto">
                                <span className="inline-block text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-md border border-gray-100 dark:border-slate-700 uppercase tracking-wider">
                                    {link.category}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {showDisclosure && (
                    <div className="mt-16 pt-6 border-t border-gray-200 dark:border-slate-800 max-w-xl mx-auto">
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            <strong className="text-primary-600 dark:text-primary-400 mr-1.5">Disclosure:</strong>
                            Some links above are affiliate links. We may earn a small commission at no extra cost to you. We only recommend resources we genuinely believe in.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

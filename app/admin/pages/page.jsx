import { requireEditor } from '@/lib/auth'
import { prisma, queryWithRetry } from '@/lib/db'
import Link from 'next/link'

export default async function AdminPagesIndex() {
    await requireEditor()

    const pages = await queryWithRetry(() =>
        prisma.page.findMany({
            orderBy: { slug: 'asc' },
            include: {
                _count: {
                    select: { sections: true }
                }
            }
        })
    )

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-up">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between text-gray-900 bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] gap-4 relative overflow-hidden">
                    {/* Decorative accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/50 rounded-bl-full -z-10" />

                    <div className="relative z-10 pr-4">
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">All Pages</h1>
                        <p className="text-gray-500 font-medium text-sm mt-2 max-w-lg">
                            Manage your dynamic website pages. Edit settings or jump into the layout builder.
                        </p>
                    </div>

                    <Link href="/admin/pages/new" className="relative z-10 btn-primary py-3 px-6 shadow-sm shrink-0 whitespace-nowrap">
                        + Create New Page
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {pages.map(page => (
                        <div key={page.id} className="bg-white p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] transition-all duration-300 gap-4 group hover:-translate-y-1">
                            {/* Page Info */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0 shadow-sm group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                                    {page.slug === 'home' ? '🏠' : '📄'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-gray-900 text-lg">{page.title}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${page.isPublished ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                            {page.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                                        <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">/{page.slug === 'home' ? '' : page.slug}</span>
                                        <span>•</span>
                                        <span>{page._count.sections} Blocks</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 pt-4 sm:pt-0 border-t border-gray-50 sm:border-0 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                                <Link
                                    href={page.slug === 'home' ? '/' : `/${page.slug}`}
                                    target="_blank"
                                    className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200 hover:bg-white hover:border-gray-300 hover:text-gray-900 rounded-xl transition-all shrink-0"
                                >
                                    Preview
                                </Link>
                                <Link
                                    href={`/admin/pages/${page.id}/edit`}
                                    className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200 hover:bg-white hover:text-primary-600 hover:border-primary-200 rounded-xl transition-all shrink-0"
                                >
                                    Settings
                                </Link>
                                <Link
                                    href={`/admin/sections?pageId=${page.id}`}
                                    className="px-4 py-2 text-xs font-bold text-white bg-gray-900 hover:bg-primary-600 rounded-xl transition-all shadow-sm shrink-0 pl-5 pr-4 flex items-center gap-2"
                                >
                                    Design Layout <span className="text-[10px]">→</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

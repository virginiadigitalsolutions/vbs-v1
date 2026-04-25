import { requireEditor } from '@/lib/auth'
import { prisma, queryWithRetry } from '@/lib/db'
import Link from 'next/link'
import {
    HiOutlineArrowRight,
    HiOutlineDocumentText,
    HiOutlineEye,
    HiOutlinePlus,
    HiOutlineTemplate,
} from 'react-icons/hi'
import {
    AdminActionButton,
    AdminPageHeader,
    AdminPageShell,
    AdminPanel,
    AdminStatsGrid,
} from '@/components/admin/AdminPageShell'

export default async function AdminPagesIndex() {
    await requireEditor()

    const pages = await queryWithRetry(() =>
        prisma.page.findMany({
            orderBy: { slug: 'asc' },
            include: {
                _count: {
                    select: { sections: true },
                },
            },
        })
    )

    const publishedPages = pages.filter((page) => page.isPublished).length
    const totalSections = pages.reduce((sum, page) => sum + page._count.sections, 0)

    return (
        <AdminPageShell>
            <AdminPageHeader
                eyebrow="Page Control"
                title="Manage website pages and layout entry points"
                description="Create new pages, review publish state, and jump directly into layout building or page settings without hunting through different screens."
                action={
                    <AdminActionButton href="/admin/pages/new">
                        <HiOutlinePlus className="text-base" />
                        Create Page
                    </AdminActionButton>
                }
                meta={[
                    { label: 'Total Pages', value: String(pages.length) },
                    { label: 'Published', value: String(publishedPages) },
                    { label: 'Drafts', value: String(pages.length - publishedPages) },
                    { label: 'Sections', value: String(totalSections) },
                ]}
            />

            <AdminStatsGrid
                items={[
                    { label: 'Pages', value: pages.length, icon: HiOutlineDocumentText, accent: 'from-primary-500 to-primary-700', detail: 'Content surfaces' },
                    { label: 'Published', value: publishedPages, icon: HiOutlineEye, accent: 'from-emerald-500 to-teal-500', detail: 'Visible to visitors' },
                    { label: 'Drafts', value: pages.length - publishedPages, icon: HiOutlineTemplate, accent: 'from-amber-500 to-orange-500', detail: 'Still in progress' },
                    { label: 'Blocks', value: totalSections, icon: HiOutlineArrowRight, accent: 'from-violet-500 to-fuchsia-500', detail: 'Layout sections' },
                ]}
            />

            <AdminPanel
                title="All Pages"
                description="Each row gives you the page status, URL, block count, and the fastest route into editing or layout work."
                padded={false}
            >
                <div className="divide-y divide-slate-100">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className="flex flex-col gap-5 px-6 py-5 transition-colors hover:bg-slate-50/70 sm:px-7 lg:flex-row lg:items-center lg:justify-between"
                        >
                            <div className="flex min-w-0 items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 shadow-sm">
                                    <HiOutlineDocumentText className="text-2xl" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-lg font-black tracking-tight text-slate-950">{page.title}</h3>
                                        <span
                                            className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
                                                page.isPublished
                                                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                                    : 'border-slate-200 bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            {page.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                                        <span className="rounded-lg bg-primary-50 px-2 py-1 text-primary-700">
                                            /{page.slug === 'home' ? '' : page.slug}
                                        </span>
                                        <span>{page._count.sections} sections</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <AdminActionButton href={page.slug === 'home' ? '/' : `/${page.slug}`} target="_blank" variant="secondary">
                                    Preview
                                </AdminActionButton>
                                <Link
                                    href={`/admin/pages/${page.id}/edit`}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-primary-200 hover:text-primary-700"
                                >
                                    Settings
                                </Link>
                                <Link
                                    href={`/admin/sections?pageId=${page.id}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-primary-700 shadow-[0_12px_30px_rgba(15,23,42,0.16)]"
                                >
                                    Design Layout
                                    <HiOutlineArrowRight className="text-base" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </AdminPanel>
        </AdminPageShell>
    )
}

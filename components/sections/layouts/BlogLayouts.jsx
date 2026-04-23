import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Child, Reveal, StaggerChildren } from '@/components/ui/Reveal'
import { FloatingShapes, GradientOrb } from '@/components/ui/SectionVectors'
import { HiChevronDoubleRight, HiOutlineSearch } from 'react-icons/hi'
import { resolveImageAlt, resolvePublishedAt, resolveReadTimeMinutes } from '@/lib/blog'

export function BlogHero({ data }) {
    const hasBgImage = !!data.bgImage
    const align = data.contentAlign || 'center'

    const containerAlignClass =
        align === 'left' ? 'text-left items-start' :
            align === 'right' ? 'text-right items-end' :
                'text-center items-center'

    const maxWClass = align === 'center'
        ? (!data.image ? 'max-w-5xl mx-auto' : 'max-w-xl mx-auto')
        : align === 'right'
            ? (!data.image ? 'max-w-3xl ml-auto' : 'max-w-xl ml-auto')
            : (!data.image ? 'max-w-3xl' : 'max-w-xl')

    return (
        <section className={`relative z-10 overflow-hidden border-b border-gray-100 pt-32 pb-20 lg:pt-40 lg:pb-28 dark:border-slate-800 ${hasBgImage ? '' : 'bg-white dark:bg-slate-900'}`}>
            {hasBgImage && (
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${data.bgImage})` }}
                />
            )}

            {!hasBgImage && (
                <>
                    <GradientOrb className="top-[-20%] left-[-10%]" size="w-[800px] h-[800px]" colors="from-violet-300/20 to-purple-300/10 dark:from-violet-600/10 dark:to-purple-600/5" />
                    <GradientOrb className="bottom-10 right-10" size="w-64 h-64" colors="from-fuchsia-300/20 to-transparent dark:from-fuchsia-600/10" />
                    <FloatingShapes className="inset-0 h-full w-full opacity-50" />
                </>
            )}

            <Container className="relative z-10">
                <div className={`-mx-4 flex flex-wrap ${align === 'center' ? 'items-center justify-center' : 'items-center'}`}>
                    <div className={`w-full px-4 ${(data.image && align !== 'center') ? 'lg:w-1/2' : 'w-full'} ${containerAlignClass}`}>
                        <div className={maxWClass}>
                            <Reveal>
                                {data.tag && (
                                    <div className={align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}>
                                        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-primary-100 px-5 py-2 text-sm font-semibold text-primary-600 shadow-sm dark:border-primary-700/30 dark:bg-primary-900/30 dark:text-primary-400">
                                            {data.tag}
                                        </span>
                                    </div>
                                )}

                                <h1 className={`mb-8 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl ${hasBgImage ? 'text-white' : 'text-gray-900 dark:text-white'} ${align === 'center' ? 'text-center lg:text-7xl' : 'text-left lg:text-5xl xl:text-6xl'}`}>
                                    {data.heading ? data.heading.split('|').map((part, i) => (
                                        <span key={i}>
                                            {i > 0 && <br className="hidden lg:block" />}
                                            {i === 1 ? (
                                                <span className="bg-linear-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-purple-500">{part}</span>
                                            ) : part}
                                        </span>
                                    )) : 'Build Louder.'}
                                </h1>

                                <p className={`mb-12 text-lg leading-relaxed sm:text-xl md:text-2xl ${hasBgImage ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'} ${align === 'center' ? 'mx-auto max-w-[800px] text-center' : align === 'right' ? 'ml-auto max-w-[600px] text-right' : 'mr-auto max-w-[600px] text-left'}`}>
                                    {data.subheading || 'Deeply technical perspectives on modern web architecture, cloud scaling, and digital design.'}
                                </p>

                                {(data.ctaText || data.secondaryCtaText) && (
                                    <div className={`mt-8 flex flex-col gap-4 sm:flex-row ${align === 'center' ? 'justify-center mx-auto' : align === 'right' ? 'justify-end ml-auto' : 'justify-start mr-auto'}`}>
                                        {data.ctaText && (
                                            <Link href={data.ctaHref || '#'} className="btn-premium">
                                                <span>{data.ctaText}</span>
                                                <span className="btn-premium-icon">
                                                    <HiChevronDoubleRight className="transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </Link>
                                        )}
                                        {data.secondaryCtaText && (
                                            <Link href={data.secondaryCtaHref || '#'} className="btn-premium-outline">
                                                <span>{data.secondaryCtaText}</span>
                                                <span className="btn-premium-icon">
                                                    <HiChevronDoubleRight className="text-xl" />
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </Reveal>
                        </div>
                    </div>

                    {data.image && align !== 'center' && (
                        <div className={`w-full px-4 lg:w-1/2 ${align === 'left' ? 'order-last mt-16 lg:mt-0' : 'order-first mb-16 lg:mb-0 lg:order-0'}`}>
                            <Reveal delay={0.2} xOffset={align === 'left' ? 40 : -40}>
                                <div className="relative mx-auto max-w-[600px] overflow-hidden rounded-2xl border border-gray-200/50 shadow-2xl shadow-primary-500/10 dark:border-white/10">
                                    <div className="relative aspect-4/3 w-full bg-gray-100 dark:bg-slate-800">
                                        <Image
                                            src={data.image}
                                            alt={data.heading || 'Hero Image'}
                                            fill
                                            sizes="(min-width: 1024px) 600px, 92vw"
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    )}
                </div>
            </Container>

            <Breadcrumbs hasBgImage={hasBgImage} />
        </section>
    )
}

const defaultLearningHubHero = {
    tag: 'Learning Hub',
    heading: 'Search the Learning Hub and dive into the latest build notes.',
    subheading: 'Filter by category, search by topic, and jump into practical articles from the VBS team.',
    searchPlaceholder: 'Search the Learning Hub',
    featuredLabel: 'Featured article',
    featuredCtaText: 'Read article',
}

export function LearningHubHero({ data, featuredPost, categoryFilter, searchQuery, posts = [], categories = [] }) {
    const hero = { ...defaultLearningHubHero, ...(data || {}) }
    const totalPosts = posts.length
    const totalCategories = categories.length
    const hasBgImage = !!hero.bgImage

    const align = hero.contentAlign || 'left'
    const alignClasses = align === 'center' ? 'text-center items-center' : align === 'right' ? 'text-right items-end' : 'text-left items-start'

    return (
        <section className={`relative overflow-hidden pt-24 pb-8 ${hasBgImage ? '' : 'bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF5FF_52%,#F4F6F9_100%)]'}`}>
            {hasBgImage && (
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700" 
                    style={{ backgroundImage: `url(${hero.bgImage})` }}
                >
                    <div className="absolute inset-0 bg-slate-950/40" />
                </div>
            )}

            {!hasBgImage && (
                <>
                    <GradientOrb className="left-[-8%] top-[10%]" size="h-[24rem] w-[24rem]" colors="from-blue-200/40 to-transparent" />
                    <GradientOrb className="right-[-5%] top-[8%]" size="h-[22rem] w-[22rem]" colors="from-cyan-200/35 to-transparent" />
                </>
            )}

            <Container className="relative z-10 max-w-[1536px]">
                <div className={`relative overflow-hidden rounded-[2.25rem] border p-6 shadow-[0_18px_60px_rgba(37,99,235,0.10)] backdrop-blur lg:p-8 xl:p-10 ${hasBgImage ? 'border-white/20 bg-white/10 text-white' : 'border-white/70 bg-white/90'}`}>
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#14B8A6]" />
                    {!hasBgImage && (
                        <>
                            <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-cyan-100/70 blur-3xl" />
                            <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-blue-100/70 blur-3xl" />
                        </>
                    )}

                    <div className="relative z-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
                        <div className={`flex flex-col ${alignClasses}`}>
                            <p className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em] ${hasBgImage ? 'border-white/20 bg-white/10 text-white' : 'border-primary-100 bg-primary-50 text-primary-700'}`}>
                                <span className={`h-2 w-2 rounded-full ${hasBgImage ? 'bg-white' : 'bg-primary-600'}`} />
                                {hero.tag}
                            </p>
                            <h1 className={`mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-[3.75rem] lg:leading-[1.02] ${hasBgImage ? 'text-white' : 'text-slate-950'} ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}>
                                {hero.heading}
                            </h1>
                            <p className={`mt-5 max-w-3xl text-base font-medium leading-8 md:text-lg ${hasBgImage ? 'text-white/80' : 'text-slate-600'} ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}>
                                {hero.subheading}
                            </p>

                            <div className={`mt-8 flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`rounded-[1.5rem] border px-5 py-4 ${hasBgImage ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50/80'}`}>
                                    <div className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${hasBgImage ? 'text-white/40' : 'text-slate-400'}`}>Published</div>
                                    <div className={`mt-2 text-2xl font-black ${hasBgImage ? 'text-white' : 'text-slate-950'}`}>{totalPosts}</div>
                                </div>
                                <div className={`rounded-[1.5rem] border px-5 py-4 ${hasBgImage ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50/80'}`}>
                                    <div className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${hasBgImage ? 'text-white/40' : 'text-slate-400'}`}>Categories</div>
                                    <div className={`mt-2 text-2xl font-black ${hasBgImage ? 'text-white' : 'text-slate-950'}`}>{totalCategories}</div>
                                </div>
                            </div>
                        </div>

                        <div className={`rounded-[2rem] border p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] ${hasBgImage ? 'border-white/20 bg-white/10 backdrop-blur-md' : 'border-slate-100 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FBFF_100%)]'}`}>
                            <div className={`text-[11px] font-extrabold uppercase tracking-[0.22em] ${hasBgImage ? 'text-white/50' : 'text-slate-400'}`}>Find the right article</div>
                            <form action="/learning-hub" className="mt-4 space-y-4">
                                {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
                                <label className="relative block">
                                    <HiOutlineSearch className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${hasBgImage ? 'text-white/40' : 'text-slate-400'}`} />
                                    <input
                                        type="search"
                                        name="q"
                                        defaultValue={searchQuery}
                                        placeholder={hero.searchPlaceholder}
                                        className={`w-full rounded-2xl border py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:ring-4 ${
                                            hasBgImage 
                                            ? 'border-white/10 bg-white/5 text-white focus:border-white/30 focus:ring-white/10' 
                                            : 'border-slate-200 bg-white text-slate-900 focus:border-primary-300 focus:ring-primary-500/10'
                                        }`}
                                    />
                                </label>
                                <button type="submit" className={`w-full rounded-2xl px-5 py-3.5 text-sm font-bold transition-all ${hasBgImage ? 'bg-white text-slate-950 hover:bg-slate-100' : 'bg-slate-950 text-white hover:bg-primary-700'}`}>
                                    Search articles
                                </button>
                            </form>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {categories.slice(0, 4).map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/learning-hub?category=${cat.id}`}
                                        className={`rounded-full border px-3 py-2 text-xs font-bold transition-colors ${
                                            hasBgImage 
                                            ? 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20' 
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700'
                                        }`}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

const defaultLearningHubFeed = {
    tag: 'Engineering Notes',
    heading: 'Latest articles from the Learning Hub',
    subheading: 'Browse the newest practical articles, guides, and breakdowns from the VBS team.',
    allTopicsLabel: 'All Topics',
    categoriesLabel: 'Categories',
    clearLabel: 'Clear',
    readButtonText: 'Read',
    emptyTitle: 'No Posts Found',
    emptyText: 'We couldn&apos;t find any articles matching your current filter.',
    clearFiltersText: 'Clear Filters',
}

export function LearningHubFeed({ data, visiblePosts = [], categories = [], categoryFilter, searchQuery }) {
    const copy = { ...defaultLearningHubFeed, ...(data || {}) }
    const totalPosts = categories.reduce((acc, cat) => acc + (cat?._count?.posts || 0), 0)

    return (
        <section className="relative overflow-hidden bg-[#F4F6F9] py-10 pb-24">
            <Container className="max-w-[1536px]">
                <div className="grid grid-cols-1 gap-12 xl:grid-cols-12 items-start">
                    <div className="xl:col-span-9 space-y-8">
                        <StaggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {visiblePosts.length > 0 ? visiblePosts.map((post) => (
                                <Child key={post.id}>
                                    <Link href={`/learning-hub/${post.category?.slug || 'posts'}/${post.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-white/80 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)]">
                                        <div className="relative h-56 overflow-hidden bg-slate-50">
                                            {post.featuredImg ? (
                                                <Image
                                                    src={post.featuredImg}
                                                    alt={resolveImageAlt(post.featuredImgAlt, post.title)}
                                                    fill
                                                    sizes="(min-width: 1280px) 390px, (min-width: 768px) 50vw, 92vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 text-5xl font-black text-primary-700">
                                                    {post.title.charAt(0)}
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
                                        </div>

                                        <div className="flex flex-1 flex-col p-6">
                                            <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-widest leading-none text-gray-500">
                                                {post.category && (
                                                    <span className="rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-primary-700">{post.category.name}</span>
                                                )}
                                                <span>{resolvePublishedAt(post).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                <span>{resolveReadTimeMinutes(post)} min read</span>
                                            </div>

                                            <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                                                {post.title}
                                            </h3>
                                            <p className="mb-6 flex-1 line-clamp-3 text-sm font-medium text-gray-500">
                                                {post.excerpt || 'Read the full article to learn more.'}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                                <span className="flex items-center gap-2 text-xs font-bold text-gray-900">
                                                    <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-primary-50 text-[10px] text-primary-600">
                                                        {post.author?.avatar ? (
                                                            <Image
                                                                src={post.author.avatar}
                                                                alt={post.author.name}
                                                                width={28}
                                                                height={28}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            post.author?.name?.charAt(0) || 'A'
                                                        )}
                                                    </div>
                                                    {post.author?.name || 'VBS Team'}
                                                </span>
                                                <span className="inline-flex items-center gap-2 text-sm font-extrabold text-primary-700">
                                                    {copy.readButtonText}
                                                    <HiChevronDoubleRight className="transition-transform duration-300 group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </Child>
                            )) : (
                                <div className="col-span-full rounded-[2rem] border border-white/80 bg-white py-20 text-center shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
                                    <h3 className="mb-2 text-lg font-extrabold text-gray-900">{copy.emptyTitle}</h3>
                                    <p className="text-gray-500">{copy.emptyText}</p>
                                    {(categoryFilter || searchQuery) && (
                                        <Link href="/learning-hub" className="btn-premium-outline mt-6 inline-block font-bold">
                                            {copy.clearFiltersText}
                                        </Link>
                                    )}
                                </div>
                            )}
                        </StaggerChildren>
                    </div>

                    <div className="xl:col-span-3 w-full">
                        <div className="sticky top-32 flex flex-col gap-6">
                            <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-900">
                                        {copy.categoriesLabel}
                                    </h3>
                                    {(categoryFilter || searchQuery) && (
                                        <Link href="/learning-hub" className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-red-500 transition-colors hover:bg-red-100 hover:text-red-600">
                                            {copy.clearLabel}
                                        </Link>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Link href={searchQuery ? `/learning-hub?q=${encodeURIComponent(searchQuery)}` : '/learning-hub'} className={`group flex items-center justify-between rounded-2xl border p-3 transition-colors ${!categoryFilter ? 'border-primary-100 bg-primary-50 pointer-events-none' : 'border-transparent hover:border-gray-100 hover:bg-gray-50'}`}>
                                        <span className={`text-sm font-bold transition-colors ${!categoryFilter ? 'text-primary-700' : 'text-gray-700 group-hover:text-primary-600'}`}>{copy.allTopicsLabel}</span>
                                        <span className={`rounded-full px-2 py-1 text-xs font-bold transition-colors ${!categoryFilter ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600'}`}>
                                            {totalPosts}
                                        </span>
                                    </Link>
                                    {categories.map((cat) => (
                                        <Link href={`/learning-hub?category=${cat.id}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`} key={cat.id} scroll={false} className={`group flex items-center justify-between rounded-2xl border p-3 transition-colors ${categoryFilter === cat.id ? 'border-primary-100 bg-primary-50 pointer-events-none' : 'border-transparent hover:border-gray-100 hover:bg-gray-50'}`}>
                                            <span className={`text-sm font-bold transition-colors ${categoryFilter === cat.id ? 'text-primary-700' : 'text-gray-700 group-hover:text-primary-600'}`}>{cat.name}</span>
                                            <span className={`rounded-full px-2 py-1 text-xs font-bold transition-colors ${categoryFilter === cat.id ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600'}`}>{cat._count.posts}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,#1E3A8A_0%,#2563EB_52%,#14B8A6_100%)] p-6 text-white shadow-[0_18px_48px_rgba(37,99,235,0.22)]">
                                <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-blue-100">Browse smarter</div>
                                <h3 className="mt-4 text-2xl font-black leading-tight">
                                    {copy.heading}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-blue-50/90">
                                    Filter by category or search by keyword to jump straight into the topics that matter.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

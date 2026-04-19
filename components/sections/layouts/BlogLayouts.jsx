import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Child, Reveal, StaggerChildren } from '@/components/ui/Reveal'
import { FloatingShapes, GradientOrb } from '@/components/ui/SectionVectors'
import { HiChevronDoubleRight, HiOutlineSearch } from 'react-icons/hi'
import { resolveImageAlt, resolvePublishedAt, resolveReadTimeMinutes } from '@/lib/blog'

export function BlogHero({ data }) {
    const hasBgImage = !!data.bgImage;
    const align = data.contentAlign || 'center';

    const containerAlignClass =
        align === 'left' ? 'text-left items-start' :
            align === 'right' ? 'text-right items-end' :
                'text-center items-center';

    const maxWClass = align === 'center'
        ? (!data.image ? 'max-w-5xl mx-auto' : 'max-w-xl mx-auto')
        : align === 'right'
            ? (!data.image ? 'max-w-3xl ml-auto' : 'max-w-xl ml-auto')
            : (!data.image ? 'max-w-3xl' : 'max-w-xl');

    return (
        <section className={`relative z-10 overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-gray-100 dark:border-slate-800 ${hasBgImage ? '' : 'bg-white dark:bg-slate-900'}`}>
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
                    <FloatingShapes className="inset-0 w-full h-full opacity-50" />
                </>
            )}

            <Container className="relative z-10">
                <div className={`-mx-4 flex flex-wrap ${align === 'center' ? 'items-center justify-center' : 'items-center'}`}>
                    <div className={`w-full px-4 ${(data.image && align !== 'center') ? 'lg:w-1/2' : 'w-full'} ${containerAlignClass}`}>
                        <div className={maxWClass}>
                            <Reveal>
                                {data.tag && (
                                    <div className={align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}>
                                        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-5 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 shadow-sm border border-primary-200/50 dark:border-primary-700/30">
                                            {data.tag}
                                        </span>
                                    </div>
                                )}

                                <h1 className={`mb-8 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl ${hasBgImage ? 'text-white' : 'text-gray-900 dark:text-white'} ${align === 'center' ? 'lg:text-7xl text-center' : 'lg:text-5xl xl:text-6xl text-left'}`}>
                                    {data.heading ? data.heading.split('|').map((part, i) => (
                                        <span key={i}>
                                            {i > 0 && <br className="hidden lg:block" />}
                                            {i === 1 ? (
                                                <span className="bg-linear-to-r from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500 bg-clip-text text-transparent">{part}</span>
                                            ) : part}
                                        </span>
                                    )) : 'Build Louder.'}
                                </h1>

                                <p className={`mb-12 text-lg leading-relaxed sm:text-xl md:text-2xl ${hasBgImage ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'} ${align === 'center' ? 'mx-auto max-w-[800px] text-center' : align === 'right' ? 'ml-auto max-w-[600px] text-right' : 'mr-auto max-w-[600px] text-left'}`}>
                                    {data.subheading || 'Deeply technical perspectives on modern web architecture, cloud scaling, and digital design.'}
                                </p>

                                {(data.ctaText || data.secondaryCtaText) && (
                                    <div className={`flex flex-col sm:flex-row gap-4 mt-8 ${align === 'center' ? 'justify-center mx-auto' : align === 'right' ? 'justify-end ml-auto' : 'justify-start mr-auto'}`}>
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
                                <div className="relative mx-auto max-w-[600px] overflow-hidden rounded-2xl shadow-2xl shadow-primary-500/10 border border-gray-200/50 dark:border-white/10">
                                    <div className="aspect-4/3 w-full bg-gray-100 dark:bg-slate-800 relative">
                                        <Image 
                                            src={data.image} 
                                            alt={data.heading || "Hero Image"} 
                                            fill
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

export function LearningHubHero({ data, featuredPost, categoryFilter, searchQuery }) {
    const hero = { ...defaultLearningHubHero, ...(data || {}) }

    return (
        <section className="relative overflow-hidden bg-[#F4F6F9] pt-24">
            <Container className="max-w-[1536px]">
                <div className="space-y-8">
                    <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/30 lg:p-8">
                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-100/70 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary-700">{hero.tag}</p>
                                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                                    {hero.heading}
                                </h1>
                                <p className="mt-3 text-sm font-medium leading-7 text-gray-600">
                                    {hero.subheading}
                                </p>
                            </div>

                            <form action="/learning-hub" className="w-full max-w-md">
                                {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
                                <label className="relative block">
                                    <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="search"
                                        name="q"
                                        defaultValue={searchQuery}
                                        placeholder={hero.searchPlaceholder}
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm font-medium text-gray-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-500/10"
                                    />
                                </label>
                            </form>
                        </div>
                    </div>

                    {featuredPost && (
                        <Link href={`/learning-hub/${featuredPost.category?.slug || 'posts'}/${featuredPost.slug}`} className="group block overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/30">
                            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                                <div className="relative min-h-[280px] overflow-hidden bg-slate-100">
                                    {featuredPost.featuredImg ? (
                                        <img src={featuredPost.featuredImg} alt={resolveImageAlt(featuredPost.featuredImgAlt, featuredPost.title)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    ) : (
                                        <div className="flex h-full min-h-[280px] items-center justify-center bg-gradient-to-br from-sky-100 via-cyan-100 to-blue-100 text-7xl font-black text-sky-700">
                                            {featuredPost.title.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-between p-8 lg:p-10">
                                    <div>
                                        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gray-400">{hero.featuredLabel}</p>
                                        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                                            {featuredPost.category && (
                                                <span className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-primary-700">
                                                    {featuredPost.category.name}
                                                </span>
                                            )}
                                            <span>{resolvePublishedAt(featuredPost).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            <span>{resolveReadTimeMinutes(featuredPost)} min read</span>
                                        </div>
                                        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 group-hover:text-primary-600">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="mt-4 text-base font-medium leading-7 text-gray-600">
                                            {featuredPost.excerpt || 'Read the full article to learn more.'}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                                        <span className="flex items-center gap-3 text-sm font-extrabold text-gray-900">
                                            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary-50 text-primary-700">
                                                {featuredPost.author?.avatar ? (
                                                    <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    featuredPost.author?.name?.charAt(0) || 'A'
                                                )}
                                            </span>
                                            {featuredPost.author?.name || 'VBS Team'}
                                        </span>
                                        <span className="text-sm font-extrabold text-primary-700">{hero.featuredCtaText}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
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
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                    <div className="xl:col-span-9 space-y-8">
                        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/20 lg:p-8">
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary-700">{copy.tag}</p>
                            <div className="mt-4 max-w-3xl">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                                    {copy.heading}
                                </h2>
                                <p className="mt-3 text-sm font-medium leading-7 text-gray-600">
                                    {copy.subheading}
                                </p>
                            </div>
                        </div>

                        <StaggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {visiblePosts.length > 0 ? visiblePosts.map((post) => (
                                <Child key={post.id}>
                                    <Link href={`/learning-hub/${post.category?.slug || 'posts'}/${post.slug}`} className="card-elevated h-full flex flex-col group bg-white relative overflow-hidden rounded-3xl border border-gray-100">
                                        <div className="h-52 bg-gray-50 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                                            {post.featuredImg ? (
                                                <img src={post.featuredImg} alt={resolveImageAlt(post.featuredImgAlt, post.title)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            ) : (
                                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📝</span>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                                                {post.category && (
                                                    <span className="text-primary-700 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-md">{post.category.name}</span>
                                                )}
                                                <span className="flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    {resolvePublishedAt(post).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="text-gray-300">•</span>
                                                <span className="flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    {resolveReadTimeMinutes(post)} Min Read
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 font-medium text-sm line-clamp-3 mb-6 flex-1">
                                                {post.excerpt || 'Read the full article to learn more.'}
                                            </p>

                                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                                                <span className="text-xs font-bold text-gray-900 flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-[10px] overflow-hidden">
                                                        {post.author?.avatar ? (
                                                            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            post.author?.name?.charAt(0) || 'A'
                                                        )}
                                                    </div>
                                                    {post.author?.name || 'VBS Team'}
                                                </span>
                                                <span className="btn-premium py-1.5! pl-5! pr-1.5! text-xs! gap-2! scale-90 origin-right group-hover:scale-95">
                                                    {copy.readButtonText}
                                                    <span className="btn-premium-icon w-7! h-7! shadow-none!">
                                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </Child>
                            )) : (
                                <div className="col-span-full py-20 text-center text-gray-400 font-bold bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                                    <div className="text-4xl mb-4 opacity-50">🔍</div>
                                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">{copy.emptyTitle}</h3>
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
                        <div className="sticky top-32 flex flex-col gap-8">
                            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-lg">🏷️</span>
                                        {copy.categoriesLabel}
                                    </h3>
                                    {(categoryFilter || searchQuery) && (
                                        <Link href="/learning-hub" className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md">
                                            {copy.clearLabel}
                                        </Link>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Link href={searchQuery ? `/learning-hub?q=${encodeURIComponent(searchQuery)}` : '/learning-hub'} className={`group flex items-center justify-between p-3 rounded-2xl transition-colors border ${!categoryFilter ? 'bg-primary-50 border-primary-100 pointer-events-none' : 'hover:bg-gray-50 border-transparent hover:border-gray-100'}`}>
                                        <span className={`text-sm font-bold transition-colors ${!categoryFilter ? 'text-primary-700' : 'text-gray-700 group-hover:text-primary-600'}`}>{copy.allTopicsLabel}</span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full transition-colors ${!categoryFilter ? 'bg-primary-100 text-primary-700' : 'text-gray-400 bg-gray-100 group-hover:bg-primary-100 group-hover:text-primary-600'}`}>
                                            {totalPosts}
                                        </span>
                                    </Link>
                                    {categories.map((cat) => (
                                        <Link href={`/learning-hub?category=${cat.id}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`} key={cat.id} scroll={false} className={`group flex items-center justify-between p-3 rounded-2xl transition-colors border ${categoryFilter === cat.id ? 'bg-primary-50 border-primary-100 pointer-events-none' : 'hover:bg-gray-50 border-transparent hover:border-gray-100'}`}>
                                            <span className={`text-sm font-bold transition-colors ${categoryFilter === cat.id ? 'text-primary-700' : 'text-gray-700 group-hover:text-primary-600'}`}>{cat.name}</span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full transition-colors ${categoryFilter === cat.id ? 'bg-primary-100 text-primary-700' : 'text-gray-400 bg-gray-100 group-hover:bg-primary-100 group-hover:text-primary-600'}`}>{cat._count.posts}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

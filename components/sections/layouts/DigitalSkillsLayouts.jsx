'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'
import { DotsGrid, CircuitLines, FloatingShapes, HexGrid, GradientOrb } from '@/components/ui/SectionVectors'
import {
    HiOutlineTrendingUp, HiOutlinePencilAlt, HiOutlineChartBar,
    HiOutlineColorSwatch, HiOutlineLightningBolt, HiOutlineShieldCheck,
    HiOutlineAcademicCap, HiOutlineBadgeCheck, HiOutlineCube,
    HiOutlineRefresh, HiOutlineClock, HiOutlineArrowRight,
    HiOutlineSparkles, HiChevronDoubleRight
} from 'react-icons/hi'

const iconMap = {
    HiOutlineTrendingUp, HiOutlinePencilAlt, HiOutlineChartBar,
    HiOutlineColorSwatch, HiOutlineLightningBolt, HiOutlineShieldCheck,
    HiOutlineAcademicCap, HiOutlineBadgeCheck, HiOutlineCube,
    HiOutlineRefresh, HiOutlineClock, HiOutlineArrowRight,
    HiOutlineSparkles
}

/* ─── 1. Digital Skills Hero ────────────────────────────────────── */
export function DSHero({ data }) {
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

            {/* Decorative animated vectors */}
            {!hasBgImage && (
                <>
                    <GradientOrb className="top-0 right-0" size="w-[500px] h-[500px]" colors="from-secondary-300/20 to-primary-300/10 dark:from-secondary-600/10 dark:to-primary-600/5" />
                    <GradientOrb className="bottom-10 left-10" size="w-80 h-80" colors="from-accent-300/20 to-transparent dark:from-accent-600/10" />
                    <HexGrid className="top-20 left-10 w-64 h-64 opacity-20" />
                    <FloatingShapes className="inset-0 w-full h-full" />
                </>
            )}

            <Container className="relative z-10">
                <div className={`-mx-4 flex flex-wrap ${align === 'center' ? 'items-center justify-center' : 'items-center'}`}>
                    <div className={`w-full px-4 ${(data.image && align !== 'center') ? 'lg:w-1/2' : 'w-full'} ${containerAlignClass}`}>
                        <div className={maxWClass}>
                            <Reveal>
                                {/* <div className={align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}>
                                    <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-5 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 shadow-sm border border-primary-200/50 dark:border-primary-700/30">
                                        <HiOutlineSparkles className="text-base animate-sparkle" />
                                        {data.tag || 'Digital Skills Foundation'}
                                    </span>
                                </div> */}

                                <h1 className={`mb-8 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl ${hasBgImage ? 'text-white' : 'text-gray-900 dark:text-white'} ${align === 'center' ? 'lg:text-7xl text-center' : 'lg:text-5xl xl:text-6xl text-left'}`}>
                                    {data.heading?.split('|').map((part, i) => (
                                        <span key={i}>
                                            {i > 0 && <br className="hidden lg:block" />}
                                            {i === 1 ? (
                                                <span className="bg-linear-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">{part}</span>
                                            ) : part}
                                        </span>
                                    )) || 'Mastering Digital Skills'}
                                </h1>

                                <p className={`mb-12 text-lg leading-relaxed sm:text-xl md:text-2xl ${hasBgImage ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'} ${align === 'center' ? 'mx-auto max-w-[800px] text-center' : align === 'right' ? 'ml-auto max-w-[600px] text-right' : 'mr-auto max-w-[600px] text-left'}`}>
                                    {data.subheading}
                                </p>

                                <div className={`flex flex-col sm:flex-row gap-4 mt-8 ${align === 'center' ? 'justify-center mx-auto' : align === 'right' ? 'justify-end ml-auto' : 'justify-start mr-auto'}`}>
                                        <Link href={data.ctaHref || '#'} className="btn-premium">
                                            <span>{data.ctaText}</span>
                                            <span className="btn-premium-icon">
                                                <HiChevronDoubleRight className="transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </Link>
                                    {data.secondaryCtaText && (
                                        <Link href={data.secondaryCtaHref || '#'} className="btn-premium-outline">
                                            <span>{data.secondaryCtaText}</span>
                                            <span className="btn-premium-icon">
                                                <HiChevronDoubleRight className="text-xl" />
                                            </span>
                                        </Link>
                                    )}
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Side Image */}
                    {data.image && align !== 'center' && (
                        <div className={`w-full px-4 lg:w-1/2 ${align === 'left' ? 'order-last mt-16 lg:mt-0' : 'order-first mb-16 lg:mb-0 lg:order-0'}`}>
                            <Reveal delay={0.2} xOffset={align === 'left' ? 40 : -40}>
                                <div className="relative mx-auto max-w-[600px] overflow-hidden rounded-2xl shadow-2xl shadow-primary-500/10 border border-gray-200/50 dark:border-white/10">
                                    <div className="aspect-4/3 w-full bg-gray-100 dark:bg-slate-800">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={data.image} 
                                            alt={data.heading || "Hero Image"} 
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />
                                </div>
                            </Reveal>
                        </div>
                    )}
                </div>
            </Container>

            {/* Breadcrumbs - Banner Bottom Left */}
            <Breadcrumbs hasBgImage={hasBgImage} />
        </section>
    )
}

/* ─── 2. Skill Clusters ───────────────────────────────────────── */
export function DSSkillClusters({ data }) {
    const gradientMap = {
        'from-violet-500 to-indigo-600': { bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-800', glow: 'hover:shadow-violet-200/40 dark:hover:shadow-violet-900/30' },
        'from-cyan-500 to-blue-600': { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-800', glow: 'hover:shadow-cyan-200/40 dark:hover:shadow-cyan-900/30' },
        'from-emerald-500 to-teal-600': { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', glow: 'hover:shadow-emerald-200/40 dark:hover:shadow-emerald-900/30' },
        'from-amber-500 to-orange-600': { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', glow: 'hover:shadow-amber-200/40 dark:hover:shadow-amber-900/30' },
        'from-pink-500 to-rose-600': { bg: 'bg-pink-50 dark:bg-pink-900/20', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-200 dark:border-pink-800', glow: 'hover:shadow-pink-200/40 dark:hover:shadow-pink-900/30' },
    }

    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 right-0" size="w-80 h-80" />
            <GradientOrb className="bottom-0 left-0" size="w-60 h-60" colors="from-accent-300/10 to-primary-300/10 dark:from-accent-600/5 dark:to-primary-600/5" />
            <HexGrid className="top-20 left-8 w-56 h-48" />
            <DotsGrid className="bottom-10 right-8 w-40 h-40" />

            <Container className="relative z-10">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-12 max-w-[700px] text-center lg:mb-20">
                            <Reveal>
                                <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                    <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                    {data.tag || 'Explore Clusters'}
                                    <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                </span>
                                <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[42px] leading-tight">
                                    {data.heading}
                                </h2>
                                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-[600px] mx-auto">
                                    {data.subheading}
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>

                <StaggerChildren className="-mx-4 flex flex-wrap justify-center">
                    {data.cards?.map((cluster, i) => {
                        const Icon = iconMap[cluster.icon] || HiOutlineShieldCheck
                        const colors = gradientMap[cluster.color] || gradientMap['from-violet-500 to-indigo-600']
                        return (
                            <Child key={i} className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3">
                                <div className={`group rounded-2xl bg-white dark:bg-slate-800 p-10 shadow-[0px_4px_16px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-gray-100 dark:border-slate-700 hover:-translate-y-1 ${colors.glow}`}>
                                    {/* Icon with colored gradient background */}
                                    <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${colors.bg} ${colors.text} ${colors.border} border transition-all duration-300 group-hover:scale-110`}>
                                        <Icon className="text-2xl" />
                                    </div>

                                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white leading-tight">
                                        {cluster.title}
                                    </h3>
                                    <p className="mb-8 text-base text-gray-500 dark:text-gray-400 leading-relaxed grow">
                                        {cluster.description}
                                    </p>

                                    {/* Best suited for badge */}
                                    <div className={`pt-5 border-t ${colors.border} mt-auto`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`w-8 h-8 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center shrink-0 mt-0.5`}>
                                                <HiOutlineBadgeCheck className="text-sm" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold mb-1">Best suited for</p>
                                                <p className={`text-sm font-semibold ${colors.text}`}>{cluster.suited}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Child>
                        )
                    })}
                </StaggerChildren>

                {data.footerText && (
                    <Reveal delay={0.4}>
                        <div className="mt-16 text-center">
                            <div className="inline-flex items-center gap-4 bg-white dark:bg-slate-800 rounded-2xl px-8 py-5 shadow-sm border border-gray-100 dark:border-slate-700">
                                <HiChevronDoubleRight className="text-primary-500 text-xl shrink-0" />
                                <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed text-left">
                                    {data.footerText}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                )}
            </Container>
        </section>
    )
}

/* ─── 3. Evaluation ───────────────────────────────────────────── */
export function DSEvaluation({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* SVG vector decorations */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-40 bg-linear-to-b from-transparent via-primary-400 to-transparent rounded-full opacity-30 hidden lg:block" />
            <CircuitLines className="top-10 right-0 w-72 h-72 opacity-10" />
            <FloatingShapes className="inset-0 w-full h-full" />

            <Container>
                <div className="mx-auto max-w-[800px] text-center mb-16">
                    <Reveal>
                        <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                            {data.tag || 'Evaluation Strategy'}
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                        </span>
                        <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[42px] leading-tight">
                            {data.heading}
                        </h2>
                        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-[600px] mx-auto">
                            {data.subheading}
                        </p>
                    </Reveal>
                </div>

                <div className="mx-auto max-w-[800px]">
                    <StaggerChildren className="space-y-5">
                        {data.cards?.map((item, i) => {
                            const Icon = iconMap[item.icon] || HiOutlineBadgeCheck
                            return (
                                <Child key={i}>
                                    <div className="group rounded-2xl bg-[#F9FAFB] dark:bg-slate-800 p-7 sm:p-8 flex flex-col sm:flex-row gap-5 items-start border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300 hover:-translate-y-0.5">
                                        {/* Numbered step indicator with icon */}
                                        <div className="relative shrink-0">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400 border border-gray-100 dark:border-slate-600 group-hover:border-primary-200 dark:group-hover:border-primary-600 transition-colors">
                                                <Icon className="text-xl" />
                                            </div>
                                            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                                                {i + 1}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                                                {item.description || item.text}
                                            </p>
                                        </div>
                                    </div>
                                </Child>
                            )
                        })}
                    </StaggerChildren>
                </div>

                {data.footerText && (
                    <Reveal delay={0.4}>
                        <div className="mt-16 mx-auto max-w-[700px]">
                            <div className="relative bg-linear-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 rounded-2xl px-8 py-6 border border-primary-200/50 dark:border-primary-700/30">
                                <div className="absolute top-0 left-8 w-12 h-1 bg-linear-to-r from-primary-400 to-primary-600 rounded-full" />
                                <p className="text-center text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed italic">
                                    &quot;{data.footerText}&quot;
                                </p>
                            </div>
                        </div>
                    </Reveal>
                )}
            </Container>
        </section>
    )
}

/* ─── 4. AI Impact ───────────────────────────────────────────── */
export function DSAIImpact({ data }) {
    const aiIcons = ['⚡', '✍️', '📊', '🎨']
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-10 right-0" size="w-96 h-96" />
            <DotsGrid className="bottom-20 left-4 w-44 h-44" />
            <HexGrid className="top-8 right-12 w-48 h-40 opacity-10" />

            <Container className="relative z-10">
                <div className="-mx-4 flex flex-wrap items-center">
                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal>
                            <div className="mb-12 max-w-[540px] lg:mb-0">
                                <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                    <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                    AI & Digital Skills
                                </span>
                                <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-[40px] sm:leading-[1.2]">
                                    {data.heading}
                                </h2>
                                {data.body && (
                                    <div
                                        className="mb-10 text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-4 [&>p]:mb-4 last:[&>p]:mb-0"
                                        dangerouslySetInnerHTML={{ __html: data.body }}
                                    />
                                )}
                                {/* Accent divider */}
                                <div className="w-20 h-1 bg-linear-to-r from-primary-400 to-primary-600 rounded-full" />
                            </div>
                        </Reveal>
                    </div>

                    <div className="w-full px-4 lg:w-1/2">
                        <StaggerChildren className="space-y-5">
                            {data.cards?.map((item, i) => (
                                <Child key={i}>
                                    <div className="group rounded-2xl bg-white dark:bg-slate-800 p-7 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-600 transition-all duration-300 hover:-translate-y-0.5 flex items-start gap-5">
                                        {/* Emoji indicator */}
                                        <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-xl shrink-0 border border-primary-100 dark:border-primary-800 group-hover:scale-110 transition-transform">
                                            {aiIcons[i] || '🤖'}
                                        </div>
                                        <div>
                                            <p className="mb-1.5 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                                                In {item.title}
                                            </p>
                                            <p className="text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </Child>
                            ))}
                        </StaggerChildren>
                    </div>
                </div>
            </Container>
        </section>
    )
}

/* ─── 5. Mistakes ────────────────────────────────────────────── */
export function DSMistakes({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#090E34] overflow-hidden">
            {/* SVG vector decorations for dark section */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
            <DotsGrid className="top-16 right-4 w-36 h-36" color="text-white/10" />
            <CircuitLines className="bottom-8 left-4 w-56 h-56" color="text-white/5" />

            <Container className="relative z-10">
                <div className="mx-auto mb-16 max-w-[700px] text-center">
                    <Reveal>
                        <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-wider">
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse-soft" />
                            {data.tag || 'Pitfalls'}
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse-soft" />
                        </span>
                        <h2 className="mb-5 text-3xl font-bold text-white sm:text-4xl md:text-[42px] leading-tight">
                            {data.heading}
                        </h2>
                        <p className="text-base text-gray-400 leading-relaxed max-w-[550px] mx-auto">
                            {data.subheading}
                        </p>
                    </Reveal>
                </div>

                <StaggerChildren className="-mx-4 flex flex-wrap justify-center">
                    {data.cards?.map((mistake, i) => {
                        const Icon = iconMap[mistake.icon] || HiOutlineRefresh
                        return (
                            <Child key={i} className="w-full px-4 mb-6 md:w-1/2 lg:w-1/3">
                                <div className="group rounded-2xl bg-white/4 backdrop-blur-sm p-8 h-full border border-white/6 transition-all duration-400 hover:border-red-400/25 hover:bg-white/7 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(239,68,68,0.08)]">
                                    {/* Number badge + icon */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/6 text-red-400 border border-white/8 group-hover:bg-red-500/10 group-hover:border-red-400/20 transition-colors">
                                            <Icon className="text-xl" />
                                        </div>
                                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Mistake #{i + 1}</span>
                                    </div>

                                    <h3 className="mb-3 text-lg font-bold text-white leading-tight">
                                        {mistake.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {mistake.description || mistake.text}
                                    </p>
                                </div>
                            </Child>
                        )
                    })}
                </StaggerChildren>

                {data.footerText && (
                    <Reveal delay={0.4}>
                        <div className="mt-14 text-center">
                            <div className="inline-flex items-center gap-3 bg-white/4 backdrop-blur-sm rounded-full px-8 py-4 border border-white/8">
                                <HiOutlineShieldCheck className="text-emerald-400 text-lg" />
                                <p className="text-gray-300 text-sm font-medium">
                                    {data.footerText}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                )}
            </Container>
        </section>
    )
}

/* ─── 6. Where Next ──────────────────────────────────────────── */
export function DSWhereNext({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="bottom-0 left-0" size="w-96 h-96" colors="from-primary-300/10 to-accent-300/10 dark:from-primary-600/8 dark:to-accent-600/5" />
            <HexGrid className="top-12 right-4 w-52 h-44" />
            <FloatingShapes className="inset-0 w-full h-full" />

            <Container className="relative z-10">
                <div className="mx-auto mb-16 max-w-[700px] text-center">
                    <Reveal>
                        <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                            Next Steps
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                        </span>
                        <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[42px] leading-tight">
                            {data.heading}
                        </h2>
                        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-[550px] mx-auto">
                            {data.subheading}
                        </p>
                    </Reveal>
                </div>

                <StaggerChildren className="-mx-4 flex flex-wrap justify-center">
                    {data.cards?.map((card, i) => {
                        const Icon = iconMap[card.icon] || HiOutlineAcademicCap
                        return (
                            <Child key={i} className="w-full px-4 md:w-1/2 mb-6">
                                <Link href={card.url || '#'} className="group relative block rounded-2xl bg-linear-to-br from-[#F9FAFB] to-white dark:from-slate-800 dark:to-slate-800/70 p-10 border-2 border-gray-100 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-400 h-full hover:-translate-y-1">
                                    {/* Gradient top bar on hover */}
                                    <div className="absolute top-0 left-6 right-6 h-[3px] bg-linear-to-r from-primary-400 to-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex flex-col items-center text-center">
                                        <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/20">
                                            <Icon className="text-3xl" />
                                        </div>
                                        <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                            {card.title}
                                        </h3>
                                        <p className="mb-8 text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                                            {card.description}
                                        </p>
                                        <div className="btn-premium mt-4">
                                            <span>Explore Path</span>
                                            <span className="btn-premium-icon">
                                                <HiChevronDoubleRight className="transition-transform group-hover:translate-x-1.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </Child>
                        )
                    })}
                </StaggerChildren>

                {data.footerText && (
                    <Reveal delay={0.4}>
                        <div className="mt-14 mx-auto max-w-[650px]">
                            <div className="relative text-center bg-linear-to-r from-primary-50/50 via-primary-50 to-primary-50/50 dark:from-primary-900/10 dark:via-primary-900/20 dark:to-primary-900/10 rounded-2xl px-8 py-6 border border-primary-100 dark:border-primary-800/30">
                                <p className="text-gray-600 dark:text-gray-400 font-medium text-sm leading-relaxed">
                                    {data.footerText}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                )}
            </Container>
        </section>
    )
}

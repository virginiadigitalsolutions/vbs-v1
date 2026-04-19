'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'
import { DotsGrid, CircuitLines, FloatingShapes, HexGrid, GradientOrb } from '@/components/ui/SectionVectors'
import {
    HiOutlineBriefcase, HiOutlineTrendingUp, HiOutlineLightBulb,
    HiOutlineUserAdd, HiOutlineStar, HiOutlineChartPie,
    HiOutlineShieldExclamation, HiOutlineViewGridAdd, HiOutlineCurrencyRupee,
    HiOutlineLightningBolt, HiOutlineGlobe, HiOutlineLocationMarker,
    HiOutlineArrowRight, HiOutlineCheckCircle, HiOutlineExclamationCircle,
    HiOutlineSparkles, HiChevronDoubleRight
} from 'react-icons/hi'

const iconMap = {
    HiOutlineBriefcase, HiOutlineTrendingUp, HiOutlineLightBulb,
    HiOutlineUserAdd, HiOutlineStar, HiOutlineChartPie,
    HiOutlineShieldExclamation, HiOutlineViewGridAdd, HiOutlineCurrencyRupee,
    HiOutlineLightningBolt, HiOutlineGlobe, HiOutlineLocationMarker,
    HiOutlineArrowRight, HiOutlineCheckCircle, HiOutlineExclamationCircle
}

/* ─── 1. Career Hero ───────────────────────────────────────────── */
export function CareerHero({ data }) {
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

            {/* SVG vector decorations */}
            {!hasBgImage && (
                <>
                    <GradientOrb className="top-[-10%] left-[-5%]" size="w-[700px] h-[700px]" colors="from-emerald-300/20 to-teal-300/10 dark:from-emerald-600/10 dark:to-teal-600/5" />
                    <HexGrid className="bottom-10 right-10 w-80 h-80 opacity-15" />
                    <DotsGrid className="top-20 left-4 w-60 h-60 opacity-30" />
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
                                        {data.tag || 'Career Roadmap'}
                                    </span>
                                </div> */}

                                <h1 className={`mb-8 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl ${hasBgImage ? 'text-white' : 'text-gray-900 dark:text-white'} ${align === 'center' ? 'lg:text-7xl text-center' : 'lg:text-5xl xl:text-6xl text-left'}`}>
                                    {data.heading?.split('|').map((part, i) => (
                                        <span key={i}>
                                            {i > 0 && <br className="hidden lg:block" />}
                                            {i === 1 ? (
                                                <span className="bg-linear-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 bg-clip-text text-transparent">{part}</span>
                                            ) : part}
                                        </span>
                                    )) || 'Career Guides'}
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

            <Breadcrumbs hasBgImage={hasBgImage} />
        </section>
    )
}

/* ─── 2. Career Intro ───────────────────────────────────────────── */
export function CareerIntro({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 right-0" size="w-72 h-72" colors="from-emerald-300/10 to-teal-300/10 dark:from-emerald-600/5 dark:to-teal-600/5" />
            <DotsGrid className="bottom-4 left-8 w-36 h-36" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-[800px] text-center">
                    <Reveal>
                        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[40px] leading-tight">
                            {data.heading}
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        {data.body && (
                            <div 
                                className="text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-6 md:text-lg" 
                                dangerouslySetInnerHTML={{ __html: data.body }} 
                            />
                        )}
                    </Reveal>
                </div>
            </Container>
        </section>
    )
}

/* ─── 3. Why Clarity + Skills to Roles (split layout) ──────────── */
export function CareerWhyClarity({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* SVG vector decorations */}
            <CircuitLines className="top-12 right-0 w-56 h-56 opacity-10" />
            <FloatingShapes className="inset-0 w-full h-full" />

            <Container className="relative z-10">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal delay={0.1}>
                            <div className="mb-12 lg:mb-0 lg:pr-10">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
                                    <HiOutlineLightBulb className="text-2xl" />
                                </div>
                                <h2 className="mb-5 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                                    {data.leftHeading}
                                </h2>
                                {data.leftBody && (
                                    <div 
                                        className="text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-4" 
                                        dangerouslySetInnerHTML={{ __html: data.leftBody }} 
                                    />
                                )}
                            </div>
                        </Reveal>
                    </div>

                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal delay={0.2}>
                            <div className="rounded-2xl bg-[#F9FAFB] dark:bg-slate-800 p-8 lg:p-10 h-full border border-gray-100 dark:border-slate-700 shadow-sm">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                    <HiOutlineViewGridAdd className="text-2xl" />
                                </div>
                                <h2 className="mb-5 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                                    {data.rightHeading}
                                </h2>
                                {data.rightBody && (
                                    <div 
                                        className="text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-4" 
                                        dangerouslySetInnerHTML={{ __html: data.rightBody }} 
                                    />
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}

/* ─── 4. Career Progression ────────────────────────────────────── */
export function CareerProgression({ data }) {
    const stageColors = [
        { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', glow: 'hover:shadow-emerald-200/40 dark:hover:shadow-emerald-900/30', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', focus: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/10 dark:border-emerald-800 dark:text-emerald-400' },
        { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800', glow: 'hover:shadow-blue-200/40 dark:hover:shadow-blue-900/30', badge: 'bg-blue-100 text-blue-700 border-blue-200', focus: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/10 dark:border-blue-800 dark:text-blue-400' },
        { bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-800', glow: 'hover:shadow-violet-200/40 dark:hover:shadow-violet-900/30', badge: 'bg-violet-100 text-violet-700 border-violet-200', focus: 'bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-900/10 dark:border-violet-800 dark:text-violet-400' },
    ]

    return (
        <section id="career-progression" className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 left-0" size="w-80 h-80" colors="from-emerald-300/10 to-teal-300/10 dark:from-emerald-600/5 dark:to-teal-600/5" />
            <HexGrid className="top-16 right-4 w-52 h-44" />
            <DotsGrid className="bottom-8 left-8 w-36 h-36" />

            <Container className="relative z-10">
                <div className="mx-auto mb-12 max-w-[700px] text-center lg:mb-16">
                    <Reveal>
                        <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                            {data.tag || 'The Timeline'}
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

                <StaggerChildren className="-mx-4 flex flex-wrap justify-center">
                    {data.cards?.map((stage, i) => {
                        const Icon = iconMap[stage.icon] || HiOutlineUserAdd
                        const colors = stageColors[i] || stageColors[0]
                        return (
                            <Child key={i} className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3">
                                <div className={`group rounded-2xl bg-white dark:bg-slate-800 p-0 shadow-[0px_4px_16px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-gray-100 dark:border-slate-700 overflow-hidden hover:-translate-y-1 ${colors.glow}`}>
                                    {/* Header */}
                                    <div className="p-8 pb-4">
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors.bg} ${colors.text} ${colors.border} border transition-all duration-300 group-hover:scale-110 shrink-0`}>
                                                <Icon className="text-2xl" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                                                    {stage.level || stage.title}
                                                </h3>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors.badge} mt-1`}>
                                                    {stage.subtitle}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {stage.description}
                                        </p>
                                    </div>

                                    {/* Bullets */}
                                    <div className="px-8 pb-6 grow">
                                        <div className="bg-[#F9FAFB] dark:bg-slate-700/50 rounded-xl p-5 border border-gray-100 dark:border-slate-600/50">
                                            <ul className="space-y-3">
                                                {stage.bullets?.map((item, j) => (
                                                    <li key={j} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2.5">
                                                        <HiOutlineCheckCircle className={`text-base shrink-0 mt-0.5 ${colors.text}`} />
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Focus Footer */}
                                    <div className={`p-4 text-center border-t ${colors.focus}`}>
                                        <p className="text-xs font-bold uppercase tracking-widest">
                                            Focus: {stage.focus}
                                        </p>
                                    </div>
                                </div>
                            </Child>
                        )
                    })}
                </StaggerChildren>
            </Container>
        </section>
    )
}

/* ─── 5. Growth & Earning Potential ─────────────────────────────── */
export function CareerGrowth({ data }) {
    const factorNames = ['Skill Depth', 'Industry', 'Experience', 'Location', 'AI Adaptability']
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 right-0" size="w-80 h-80" />
            <CircuitLines className="bottom-8 left-0 w-48 h-48 opacity-10" />

            <Container className="relative z-10">
                <div className="-mx-4 flex flex-wrap items-center">
                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal>
                            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                {data.tag || 'Value Matrix'}
                            </span>
                            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-[40px]">
                                {data.heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={0.1}>
                            {data.body && (
                                <div 
                                    className="mb-8 text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-4" 
                                    dangerouslySetInnerHTML={{ __html: data.body }} 
                                />
                            )}
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="mb-12 lg:mb-0 space-y-3">
                                {data.checklist?.map((item, i) => (
                                    <div key={i} className="group flex items-center gap-4 bg-[#F9FAFB] dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold text-sm shrink-0 border border-primary-200 dark:border-primary-800 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                            {i + 1}
                                        </div>
                                        <p className="text-gray-900 dark:text-white font-semibold text-sm">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal delay={0.3}>
                            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                                {data.rightHeading}
                            </h3>
                            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {data.cards?.map((factor, i) => {
                                    const Icon = iconMap[factor.icon] || HiOutlineViewGridAdd
                                    return (
                                        <div key={i} className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-300">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-gray-400 shrink-0 border border-gray-100 dark:border-slate-600">
                                                <Icon className="text-xl" />
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {factor.name || factor.title || factorNames[i] || 'Factor'}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="rounded-xl bg-primary-50 dark:bg-primary-900/10 p-5 border-l-4 border-primary-500">
                                <p className="text-sm text-primary-800 dark:text-primary-200 font-medium leading-relaxed">
                                    {data.footerText}
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}

/* ─── 6. AI & Mistakes ─────────────────────────────────────────── */
export function CareerAIAndMistakes({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <HexGrid className="top-8 left-4 w-48 h-40" />
            <FloatingShapes className="inset-0 w-full h-full" />
            <DotsGrid className="bottom-8 right-8 w-32 h-32" />

            <Container className="relative z-10">
                <div className="-mx-4 flex flex-wrap">
                    {/* Left: AI */}
                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal delay={0.1}>
                            <div className="mb-12 lg:mb-0 lg:pr-10">
                                <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                    <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                    AI Adaptability
                                </span>
                                <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                                    {data.leftHeading}
                                </h2>

                                <div 
                                    className="mb-8 text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-4" 
                                    dangerouslySetInnerHTML={{ __html: data.leftBody }} 
                                />

                                <div className="rounded-2xl bg-white dark:bg-slate-800 p-7 shadow-sm border border-gray-100 dark:border-slate-700">
                                    <p className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                                        {data.leftListTitle}
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        {data.leftList?.map((item, i) => {
                                            const Ico = i === 0 ? HiOutlineGlobe : i === 1 ? HiOutlineViewGridAdd : HiOutlineTrendingUp
                                            return (
                                                <li key={i} className="flex items-center gap-4 text-gray-700 dark:text-gray-300 group">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400 shrink-0 border border-primary-100 dark:border-slate-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                                        <Ico className="text-lg" />
                                                    </div>
                                                    <span className="font-medium text-sm">{item}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <div className="border-t border-gray-100 dark:border-slate-700 pt-5">
                                        <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                                            {data.leftFooter}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: Mistakes */}
                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal delay={0.2}>
                            <div>
                                <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-red-500 uppercase tracking-wider">
                                    <span className="w-8 h-[2px] bg-red-400 rounded-full" />
                                    Common Mistakes
                                </span>

                                <p className="mb-8 text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {data.rightSubheading}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {data.rightCards?.map((mistake, i) => (
                                        <div key={i} className="flex items-start gap-4 rounded-xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-gray-100 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-700 hover:shadow-md transition-all duration-300">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">#{i + 1}</span>
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/10 text-red-500 shrink-0 border border-red-100 dark:border-red-800">
                                                    <HiOutlineExclamationCircle className="text-base" />
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                                                {mistake.text || mistake.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="rounded-2xl bg-red-600 p-6 shadow-lg text-center">
                                    <p className="text-lg font-bold text-white leading-relaxed">
                                        {data.rightFooter}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}

/* ─── 7. Aligning to Direction ─────────────────────────────────── */
export function CareerAligning({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#090E34] overflow-hidden">
            {/* SVG vector decorations for dark section */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
            <DotsGrid className="top-12 right-8 w-36 h-36" color="text-white/10" />
            <CircuitLines className="bottom-8 left-4 w-48 h-48" color="text-white/5" />

            <Container className="relative z-10">
                <Reveal>
                    <div className="mx-auto mb-12 max-w-[800px] text-center">
                        <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider">
                            <span className="w-8 h-[2px] bg-emerald-400 rounded-full" />
                            Your Direction
                            <span className="w-8 h-[2px] bg-emerald-400 rounded-full" />
                        </span>
                        <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-[42px] tracking-tight leading-tight">
                            {data.heading}
                        </h2>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="mx-auto max-w-[1000px]">
                        <div className="rounded-2xl bg-[#1D2144] p-10 md:p-14 text-center shadow-xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px]" />
                            
                            <div className="relative z-10">
                                <p className="mb-10 text-lg md:text-xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
                                    {data.subheading}
                                </p>

                                <StaggerChildren className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-y border-white/10">
                                    {data.cards?.slice(0, 3).map((step, i) => (
                                        <Child key={i}>
                                            <div className="flex flex-col items-center group">
                                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-emerald-400 font-bold text-xl border border-white/10 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                                                    {i + 1}
                                                </div>
                                                <p className="text-sm text-gray-300 font-semibold leading-relaxed px-4">
                                                    {step.description || step.title}
                                                </p>
                                            </div>
                                        </Child>
                                    ))}
                                </StaggerChildren>

                                <h3 className="mb-8 text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                                    {data.footerText}
                                </h3>
                                
                                <Link href="/contact" className="btn-premium">
                                    <span>Get Started Now</span>
                                    <span className="btn-premium-icon">
                                        <HiChevronDoubleRight className="transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    )
}

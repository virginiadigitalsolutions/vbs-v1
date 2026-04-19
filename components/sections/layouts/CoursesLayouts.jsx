'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'
import { DotsGrid, CircuitLines, FloatingShapes, HexGrid, GradientOrb } from '@/components/ui/SectionVectors'
import {
    HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineBadgeCheck,
    HiOutlineSearchCircle, HiOutlineExclamationCircle, HiOutlinePlay,
    HiOutlineDocumentSearch, HiOutlineLightBulb, HiOutlineStar,
    HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineArrowRight,
    HiOutlineSparkles, HiChevronDoubleRight
} from 'react-icons/hi'

const iconMap = {
    HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineBadgeCheck,
    HiOutlineSearchCircle, HiOutlineExclamationCircle, HiOutlinePlay,
    HiOutlineDocumentSearch, HiOutlineLightBulb, HiOutlineStar,
    HiOutlineShieldCheck, HiOutlineCheckCircle,
}

/* ─── 1. Courses Hero ──────────────────────────────────────────── */
export function CoursesHero({ data }) {
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
                    <GradientOrb className="top-20 right-1/4" size="w-96 h-96" colors="from-purple-300/20 to-primary-300/10 dark:from-purple-600/10 dark:to-primary-600/5" />
                    <GradientOrb className="bottom-0 left-1/4" size="w-[600px] h-[600px]" colors="from-accent-300/10 to-transparent dark:from-accent-600/5" />
                    <CircuitLines className="top-10 right-10 w-80 h-80 opacity-20" />
                    <DotsGrid className="bottom-20 left-20 w-40 h-40 opacity-30" />
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
                                        {data.tag || 'Learning Paths'}
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
                                    )) || 'Learning Paths'}
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

/* ─── 2. Courses Intro ─────────────────────────────────────────── */
export function CoursesIntro({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 right-0" size="w-72 h-72" />
            <DotsGrid className="bottom-8 left-8 w-40 h-40" />

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

/* ─── 3. Courses Structure ─────────────────────────────────────── */
export function CoursesStructure({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* SVG vector decorations */}
            <CircuitLines className="top-8 right-0 w-64 h-64 opacity-10" />
            <FloatingShapes className="inset-0 w-full h-full" />

            <Container className="relative z-10">
                <div className="-mx-4 flex flex-wrap items-start">
                    <div className="w-full px-4 lg:w-1/3 pt-2">
                        <Reveal xOffset={-40}>
                            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                Why Structure
                            </span>
                            <h2 className="mb-8 lg:mb-0 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                                {data.heading}
                            </h2>
                        </Reveal>
                    </div>
                    {data.body && (
                        <div className="w-full px-4 lg:w-2/3">
                            <Reveal delay={0.1} xOffset={40}>
                                <div className="rounded-2xl bg-[#F9FAFB] dark:bg-slate-800 p-8 md:p-12 border border-gray-100 dark:border-slate-700 shadow-sm">
                                    <div 
                                        className="text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-4" 
                                        dangerouslySetInnerHTML={{ __html: data.body }} 
                                    />
                                </div>
                            </Reveal>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    )
}

/* ─── 4. Learning Progression ─────────────────────────────────── */
export function CoursesProgression({ data }) {
    const stageColors = [
        { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', glow: 'hover:shadow-emerald-200/40 dark:hover:shadow-emerald-900/30', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-800', glow: 'hover:shadow-cyan-200/40 dark:hover:shadow-cyan-900/30', badge: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
        { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', glow: 'hover:shadow-amber-200/40 dark:hover:shadow-amber-900/30', badge: 'bg-amber-100 text-amber-700 border-amber-200' },
    ]

    return (
        <section id="learning-progression" className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 right-0" size="w-80 h-80" />
            <GradientOrb className="bottom-0 left-0" size="w-60 h-60" colors="from-accent-300/10 to-primary-300/10 dark:from-accent-600/5 dark:to-primary-600/5" />
            <HexGrid className="top-20 left-8 w-56 h-48" />
            <DotsGrid className="bottom-10 right-8 w-40 h-40" />

            <Container className="relative z-10">
                <div className="mx-auto mb-12 max-w-[700px] text-center lg:mb-16">
                    <Reveal>
                        <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                            {data.tag || 'The Roadmap'}
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
                        const Icon = iconMap[stage.icon] || HiOutlineSearchCircle
                        const colors = stageColors[i] || stageColors[0]
                        return (
                            <Child key={i} className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3">
                                <div className={`group rounded-2xl bg-white dark:bg-slate-800 p-0 shadow-[0px_4px_16px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-gray-100 dark:border-slate-700 overflow-hidden hover:-translate-y-1 ${colors.glow}`}>
                                    {/* Header Segment */}
                                    <div className="p-8 pb-4">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors.bg} ${colors.text} ${colors.border} border transition-all duration-300 group-hover:scale-110 shrink-0`}>
                                                <Icon className="text-2xl" />
                                            </div>
                                            <div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors.badge} mb-1`}>
                                                    {stage.level}
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                                                    {stage.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                                            {stage.description}
                                        </p>
                                    </div>

                                    <div className="px-8 pb-8 space-y-5 grow">
                                        <div className="bg-[#F9FAFB] dark:bg-slate-700/50 rounded-xl p-5 border border-gray-100 dark:border-slate-600/50">
                                            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <HiOutlineCheckCircle className={`text-sm ${colors.text}`} /> Best Suited For
                                            </h4>
                                            <ul className="space-y-2.5">
                                                {stage.suitedFor?.map((item, j) => (
                                                    <li key={j} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2.5">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${colors.bg.replace('bg-', 'bg-').replace('/20', '')} mt-1.5 shrink-0 border ${colors.border}`} />
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className={`${colors.bg} rounded-xl p-5 border ${colors.border}`}>
                                            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <HiOutlineAcademicCap className={`text-sm ${colors.text}`} /> Recommended Approach
                                            </h4>
                                            <ul className="space-y-2.5">
                                                {stage.approach?.map((item, j) => (
                                                    <li key={j} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2.5">
                                                        <span className={`font-bold mr-0.5 ${colors.text}`}>›</span>
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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

/* ─── 5. Free vs Paid ──────────────────────────────────────────── */
export function CoursesFreePaid({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 right-0" size="w-80 h-80" />
            <CircuitLines className="bottom-8 left-0 w-56 h-56 opacity-10" />

            <Container className="relative z-10">
                <div className="-mx-4 flex flex-wrap items-center">
                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal>
                            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                {data.tag || 'Strategy'}
                            </span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-[40px]">
                                {data.heading}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            {data.body && <div className="mb-8 text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-4" dangerouslySetInnerHTML={{ __html: data.body }} />}
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="rounded-2xl bg-[#F9FAFB] dark:bg-slate-800 p-8 border border-gray-100 dark:border-slate-700 mb-12 lg:mb-0 shadow-sm">
                                <p className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                                    {data.listTitle || 'Paid programs become valuable when:'}
                                </p>
                                <ul className="space-y-4">
                                    {data.checklist?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-gray-700 dark:text-gray-300">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5 border border-primary-100 dark:border-primary-800">
                                                <HiOutlineShieldCheck className="text-lg shrink-0" /> 
                                            </div>
                                            <span className="leading-relaxed font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>

                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal delay={0.4} xOffset={40}>
                            <div className="rounded-2xl bg-[#090E34] p-10 md:p-14 text-center flex flex-col justify-center border border-white/6 relative overflow-hidden group shadow-xl">
                                <DotsGrid className="top-4 right-4 w-24 h-24" color="text-white/10" />
                                <span className="text-6xl mb-8 block drop-shadow-lg relative z-10">💡</span>
                                <p className="text-2xl md:text-3xl text-white font-bold leading-tight mb-6 relative z-10">
                                    {data.cardHighlight}
                                </p>
                                <p className="text-gray-300 text-base font-medium relative z-10 leading-relaxed">
                                    {data.cardDescription}
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}

/* ─── 6. Evaluation & Mistakes ─────────────────────────────────── */
export function CoursesEvalAndMistakes({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <HexGrid className="top-8 left-4 w-48 h-40" />
            <FloatingShapes className="inset-0 w-full h-full" />

            <Container className="relative z-10">
                <div className="-mx-4 flex flex-wrap">
                    {/* Evaluating Any Course */}
                    <div className="w-full px-4 lg:w-1/2">
                        <Reveal delay={0.1}>
                            <div className="mb-12 lg:mb-0 lg:pr-10">
                                <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                    <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                    Course Evaluation
                                </span>
                                
                                <p className="mb-8 text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {data.leftSubheading}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {data.leftList?.map((item, i) => (
                                        <div key={i} className="group flex items-center gap-4 rounded-xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-gray-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400 shrink-0 font-bold text-sm border border-primary-100 dark:border-slate-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                                {i + 1}
                                            </div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 dark:border-slate-700 pt-5">
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                                        {data.leftFooter}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Common Mistakes */}
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
                                    {data.rightCards?.map((mistake, i) => {
                                        const Icon = iconMap[mistake.icon] || HiOutlineBadgeCheck
                                        return (
                                            <div key={i} className="flex items-start gap-4 rounded-xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-gray-100 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-700 hover:shadow-md transition-all duration-300">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">#{i + 1}</span>
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/10 text-red-500 shrink-0 border border-red-100 dark:border-red-800">
                                                        <Icon className="text-base" />
                                                    </div>
                                                </div>
                                                <p className="font-medium text-gray-900 dark:text-white text-sm leading-relaxed">
                                                    {mistake.text || mistake.title}
                                                </p>
                                            </div>
                                        )
                                    })}
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

/* ─── 7. Connecting Learning ────────────────────────────────────── */
export function CoursesConnecting({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#090E34] overflow-hidden">
            {/* SVG vector decorations for dark section */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
            <DotsGrid className="top-12 right-8 w-36 h-36" color="text-white/10" />
            <CircuitLines className="bottom-8 left-4 w-48 h-48" color="text-white/5" />

            <Container className="relative z-10">
                <Reveal>
                    <div className="mx-auto mb-12 max-w-[800px] text-center">
                        <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-primary-400 uppercase tracking-wider">
                            <span className="w-8 h-[2px] bg-primary-400 rounded-full" />
                            Your Next Step
                            <span className="w-8 h-[2px] bg-primary-400 rounded-full" />
                        </span>
                        <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-[42px] tracking-tight leading-tight">
                            {data.heading}
                        </h2>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="mx-auto max-w-[800px] text-center mb-12">
                        {data.body && <div className="space-y-6 text-gray-300 font-medium leading-relaxed text-base md:text-lg" dangerouslySetInnerHTML={{ __html: data.body }} />}
                    </div>
                </Reveal>
                
                <Reveal delay={0.2}>
                    <div className="flex justify-center">
                        <Link href="/contact" className="btn-premium">
                            <span>Begin Your Path</span>
                            <span className="btn-premium-icon">
                                <HiChevronDoubleRight className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </div>
                </Reveal>
            </Container>
        </section>
    )
}

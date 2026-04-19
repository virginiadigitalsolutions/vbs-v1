'use client'

import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'
import { DotsGrid, CircuitLines, FloatingShapes, HexGrid, GradientOrb } from '@/components/ui/SectionVectors'
import { 
    HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineUserGroup, 
    HiOutlineLightningBolt, HiOutlineRefresh, HiOutlineChartBar, 
    HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineTrendingUp, 
    HiOutlineEye, HiOutlineArrowRight, HiOutlineStar, HiOutlineSparkles,
    HiChevronDoubleRight
} from 'react-icons/hi'

const ICON_MAP = {
    HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineUserGroup,
    HiOutlineLightningBolt, HiOutlineRefresh, HiOutlineChartBar,
    HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineTrendingUp,
    HiOutlineEye, HiOutlineArrowRight, HiOutlineStar
}

const audienceColors = [
    { bg: 'bg-violet-50 dark:bg-violet-900/20', icon: 'text-violet-600 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-800', hover: 'hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-violet-200/30 dark:hover:shadow-violet-900/20' },
    { bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800', hover: 'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-blue-200/30 dark:hover:shadow-blue-900/20' },
    { bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', hover: 'hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-emerald-200/30 dark:hover:shadow-emerald-900/20' },
    { bg: 'bg-amber-50 dark:bg-amber-900/20', icon: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', hover: 'hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-amber-200/30 dark:hover:shadow-amber-900/20' },
    { bg: 'bg-rose-50 dark:bg-rose-900/20', icon: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-800', hover: 'hover:border-rose-300 dark:hover:border-rose-600 hover:shadow-rose-200/30 dark:hover:shadow-rose-900/20' },
    { bg: 'bg-cyan-50 dark:bg-cyan-900/20', icon: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-800', hover: 'hover:border-cyan-300 dark:hover:border-cyan-600 hover:shadow-cyan-200/30 dark:hover:shadow-cyan-900/20' },
]

/* ─── 1. About Hero ────────────────────────────────────────────── */
export function AboutHero({ data }) {
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
                                {/* <div className={align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}>
                                    <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-5 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 shadow-sm border border-primary-200/50 dark:border-primary-700/30">
                                        <HiOutlineSparkles className="text-base animate-sparkle" />
                                        {data.tag || 'About Us'}
                                    </span>
                                </div> */}

                                <h1 className={`mb-8 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl ${hasBgImage ? 'text-white' : 'text-gray-900 dark:text-white'} ${align === 'center' ? 'lg:text-7xl text-center' : 'lg:text-5xl xl:text-6xl text-left'}`}>
                                    {data.heading?.split('|').map((part, i) => (
                                        <span key={i}>
                                            {i > 0 && <br className="hidden lg:block" />}
                                            {i === 1 ? (
                                                <span className="bg-linear-to-r from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500 bg-clip-text text-transparent">{part}</span>
                                            ) : part}
                                        </span>
                                    )) || 'About Us'}
                                </h1>

                                <p className={`mb-12 text-lg leading-relaxed sm:text-xl md:text-2xl ${hasBgImage ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'} ${align === 'center' ? 'mx-auto max-w-[800px] text-center' : align === 'right' ? 'ml-auto max-w-[600px] text-right' : 'mr-auto max-w-[600px] text-left'}`}>
                                    {data.subheading}
                                </p>

                                <div className={`flex flex-col sm:flex-row gap-4 mt-8 ${align === 'center' ? 'justify-center mx-auto' : align === 'right' ? 'justify-end ml-auto' : 'justify-start mr-auto'}`}>
                                        <Link href={data.ctaHref || '/digital-skills'} className="btn-premium">
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

/* ─── 2. About Intro (Mission + Vision) ────────────────────────── */
export function AboutIntro({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 right-0" size="w-72 h-72" colors="from-violet-300/10 to-purple-300/10 dark:from-violet-600/5 dark:to-purple-600/5" />
            <DotsGrid className="bottom-4 left-8 w-36 h-36" />

            <Container className="relative z-10">
                <div className={`flex flex-col lg:flex-row items-center gap-12 mb-16 ${data.image ? 'text-left' : 'text-center'}`}>
                    <div className={data.image ? 'lg:w-3/5' : 'mx-auto max-w-[800px]'}>
                        <Reveal>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-6">
                                {data.heading || 'Why This Platform Exists'}
                            </h2>
                            {data.body && (
                                <div 
                                    className="text-base leading-relaxed text-gray-500 dark:text-gray-400 space-y-4 md:text-lg" 
                                    dangerouslySetInnerHTML={{ __html: data.body }} 
                                />
                            )}
                        </Reveal>
                    </div>
                    {data.image && (
                        <div className="lg:w-2/5 w-full max-w-[450px]">
                            <Reveal delay={0.2} xOffset={40}>
                                <div className="relative group p-2 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700">
                                    <div className="overflow-hidden rounded-2xl aspect-square relative">
                                        <Image 
                                            src={data.image} 
                                            alt={data.heading || "About Intro"} 
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    )}
                </div>

                <div className="-mx-4 flex flex-wrap justify-center">
                    <div className="w-full px-4 md:w-1/2 lg:w-5/12">
                        <Reveal delay={0.1} xOffset={-20}>
                            <div className="group mb-8 rounded-2xl bg-white dark:bg-slate-800 p-8 lg:p-10 shadow-[0px_4px_16px_rgba(0,0,0,0.04)] dark:shadow-none h-full border border-gray-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 group-hover:scale-110 transition-transform shrink-0">
                                    <HiOutlineStar className="text-2xl" />
                                </div>
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                                    {data.missionHeading || 'Our Mission'}
                                </h2>
                                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed grow">
                                    {data.missionText}
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <div className="w-full px-4 md:w-1/2 lg:w-5/12">
                        <Reveal delay={0.2} xOffset={20}>
                            <div className="group mb-8 rounded-2xl bg-white dark:bg-slate-800 p-8 lg:p-10 shadow-[0px_4px_16px_rgba(0,0,0,0.04)] dark:shadow-none h-full border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 group-hover:scale-110 transition-transform shrink-0">
                                    <HiOutlineEye className="text-2xl" />
                                </div>
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                                    {data.visionHeading || 'Our Vision'}
                                </h2>
                                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed grow">
                                    {data.visionText}
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}

/* ─── 3. Who We Serve ──────────────────────────────────────────── */
export function AboutAudience({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* SVG vector decorations */}
            <CircuitLines className="top-12 right-0 w-56 h-56 opacity-10" />
            <HexGrid className="bottom-8 left-4 w-48 h-40" />
            <FloatingShapes className="inset-0 w-full h-full" />

            <Container className="relative z-10">
                <Reveal>
                    <div className="mx-auto mb-12 max-w-[700px] text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                            {data.tag || 'Our Audience'}
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                        </span>
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[42px] leading-tight">
                            {data.heading}
                        </h2>
                        {data.body && (
                            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-[600px] mx-auto">
                                {data.body}
                            </p>
                        )}
                    </div>
                </Reveal>

                <StaggerChildren className="-mx-4 flex flex-wrap justify-center">
                    {data.cards?.map((card, i) => {
                        const Icon = ICON_MAP[card.icon] || HiOutlineUserGroup
                        const colors = audienceColors[i % audienceColors.length]
                        return (
                            <Child key={i} className="w-full px-4 mb-6 md:w-1/2 lg:w-1/3">
                                <div className={`group rounded-2xl bg-[#F9FAFB] dark:bg-slate-800 p-7 shadow-sm border ${colors.border} h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${colors.hover} flex flex-col`}>
                                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${colors.bg} ${colors.icon} border ${colors.border} group-hover:scale-110 transition-transform shrink-0`}>
                                        <Icon className="text-2xl" />
                                    </div>
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed grow">
                                        {card.description}
                                    </p>
                                </div>
                            </Child>
                        )
                    })}
                </StaggerChildren>
            </Container>
        </section>
    )
}

/* ─── 4. Our Approach ──────────────────────────────────────────── */
export function AboutApproach({ data }) {
    const phaseColors = [
        { num: 'text-emerald-600 bg-emerald-50 border-emerald-200', bar: 'bg-emerald-500' },
        { num: 'text-blue-600 bg-blue-50 border-blue-200', bar: 'bg-blue-500' },
        { num: 'text-violet-600 bg-violet-50 border-violet-200', bar: 'bg-violet-500' },
    ]

    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 left-0" size="w-80 h-80" />
            <DotsGrid className="bottom-8 right-8 w-36 h-36" />

            <Container className="relative z-10">
                <Reveal>
                    <div className="mx-auto mb-12 max-w-[700px] text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                            {data.tag || 'Our Framework'}
                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[42px] leading-tight">
                            {data.heading}
                        </h2>
                        {data.body && (
                            <p className="mt-4 text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-[600px] mx-auto">
                                {data.body}
                            </p>
                        )}
                    </div>
                </Reveal>

                {/* Steps Flow */}
                <Reveal delay={0.1}>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-14">
                        {data.steps?.map((step, i) => (
                            <div key={i} className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
                                <div className="group bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 px-10 py-5 rounded-2xl font-bold text-lg shadow-sm w-full lg:w-auto min-w-[200px] border border-gray-200 dark:border-slate-700 text-center hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Step {i + 1}</span>
                                    {step}
                                </div>
                                {i < data.steps.length - 1 && (
                                    <div className="flex flex-col items-center text-center">
                                        <HiChevronDoubleRight className="text-gray-300 dark:text-gray-600 text-2xl hidden lg:block" />
                                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 lg:hidden my-1" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Reveal>

                {/* Phase Cards */}
                <div className="-mx-4 flex flex-wrap justify-center mb-12">
                    {data.cards?.map((card, i) => {
                        const colors = phaseColors[i] || phaseColors[0]
                        return (
                            <div key={i} className="w-full px-4 md:w-1/3">
                                <Reveal delay={0.15 + i * 0.1} className="h-full">
                                    <div className="group mb-6 p-7 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 h-full hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold border mb-4 ${colors.num}`}>
                                            0{i + 1}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                            {card.text}
                                        </p>
                                    </div>
                                </Reveal>
                            </div>
                        )
                    })}
                </div>

                {/* Footer CTA */}
                <Reveal delay={0.3}>
                    <div className="rounded-2xl bg-primary-600 text-white p-8 md:p-12 text-center mx-auto max-w-4xl shadow-xl shadow-primary-500/10">
                        <p className="font-semibold text-lg md:text-xl leading-relaxed">
                            {data.footerText}
                        </p>
                    </div>
                </Reveal>
            </Container>
        </section>
    )
}

/* ─── 5. What Makes Us Different ───────────────────────────────── */
export function AboutDifferent({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-[#090E34] overflow-hidden">
            {/* SVG vector decorations for dark section */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
            <DotsGrid className="top-12 right-8 w-36 h-36" color="text-white/10" />
            <CircuitLines className="bottom-8 left-4 w-48 h-48" color="text-white/5" />

            <Container className="relative z-10">
                <Reveal>
                    <div className="mx-auto mb-12 max-w-[700px] text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-violet-400 uppercase tracking-wider">
                            <span className="w-8 h-[2px] bg-violet-400 rounded-full" />
                            {data.tag || 'Our Difference'}
                            <span className="w-8 h-[2px] bg-violet-400 rounded-full" />
                        </span>
                        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-[42px] leading-tight">
                            {data.heading}
                        </h2>
                    </div>
                </Reveal>

                <div className="-mx-4 flex flex-wrap justify-center mb-10">
                    <div className="w-full px-4 md:w-1/2 lg:w-5/12">
                        <Reveal delay={0.1} yOffset={20}>
                            <div className="mb-8 rounded-2xl bg-[#1D2144] p-8 lg:p-10 h-full border border-white/5 shadow-lg">
                                <h3 className="text-lg font-bold text-red-400 mb-6 uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-red-400 rounded-full" />
                                    {data.dontHeading || 'We do not...'}
                                </h3>
                                <ul className="space-y-4">
                                    {data.dontList?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-gray-300 group">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-red-400 shrink-0 group-hover:scale-125 transition-transform" />
                                            <span className="text-sm leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>

                    <div className="w-full px-4 md:w-1/2 lg:w-5/12">
                        <Reveal delay={0.2} yOffset={20}>
                            <div className="mb-8 rounded-2xl bg-[#1D2144] p-8 lg:p-10 h-full border border-white/5 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 rounded-bl-full" />
                                <h3 className="text-lg font-bold text-primary-400 mb-6 uppercase tracking-wider flex items-center gap-3 relative z-10">
                                    <span className="w-8 h-[2px] bg-primary-400 rounded-full" />
                                    {data.doHeading || 'Instead, we focus on...'}
                                </h3>
                                <ul className="space-y-4 relative z-10">
                                    {data.doList?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-gray-300 group">
                                            <HiOutlineCheckCircle className="mt-0.5 text-primary-400 text-lg shrink-0 group-hover:scale-125 transition-transform" />
                                            <span className="text-sm leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>

                <Reveal delay={0.3}>
                    <p className="text-center text-gray-400 max-w-3xl mx-auto text-base leading-relaxed italic">
                        &quot;{data.footerText}&quot;
                    </p>
                </Reveal>
            </Container>
        </section>
    )
}

/* ─── 6. Building Careers CTA ──────────────────────────────────── */
export function AboutCTA({ data }) {
    return (
        <section className="relative py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* SVG vector decorations */}
            <GradientOrb className="top-0 left-0" size="w-72 h-72" colors="from-violet-300/10 to-purple-300/10 dark:from-violet-600/5 dark:to-purple-600/5" />
            <HexGrid className="bottom-4 right-8 w-44 h-36" />

            <Container className="relative z-10">
                <Reveal>
                    <div className="mx-auto mb-10 max-w-[800px] text-center">
                        <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[42px] leading-tight">
                            {data.heading}
                        </h2>
                        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                            {data.body}
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="mx-auto max-w-[900px]">
                        <div className="relative rounded-2xl bg-primary-600 p-10 md:p-14 text-center shadow-xl shadow-primary-500/20 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px]" />
                            
                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-5 tracking-tight">
                                    {data.ctaHeading || 'Start With the Right Foundation'}
                                </h3>
                                <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
                                    {data.ctaBody}
                                </p>
                                
                                <Link href={data.ctaHref || '/digital-skills'} className="group relative inline-flex items-center gap-6 rounded-full bg-white py-2 pl-8 pr-2 text-base font-bold text-primary-600 transition-all hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 shadow-xl">
                                    <span>{data.ctaText || 'Explore Digital Skills'}</span>
                                    <span className="flex h-10 w-16 items-center justify-center rounded-full bg-primary-600 text-white transition-all group-hover:scale-105">
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

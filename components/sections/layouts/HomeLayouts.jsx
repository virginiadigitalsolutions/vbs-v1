'use client'

import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import WaveSeparator from '@/components/ui/WaveSeparator'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'
import {
    MeshGradient,
    ModernGrid,
    GlassShapes,
    GradientOrb,
    CircuitLines,
    FloatingShapes,
    HexGrid,
    DotsGrid,
} from '@/components/ui/SectionVectors'
import {
    HiOutlineAcademicCap,
    HiOutlineBriefcase,
    HiOutlineUserGroup,
    HiOutlineLightningBolt,
    HiOutlineBookOpen,
    HiOutlineTrendingUp,
    HiOutlineShieldCheck,
    HiOutlineEye,
    HiOutlineTemplate,
    HiOutlineClock,
    HiOutlineScale,
    HiOutlineCheckCircle,
    HiOutlineSparkles,
    HiChevronDoubleRight,
} from 'react-icons/hi'

const iconMap = {
    HiOutlineAcademicCap,
    HiOutlineBriefcase,
    HiOutlineUserGroup,
    HiOutlineLightningBolt,
    HiOutlineBookOpen,
    HiOutlineTrendingUp,
    HiOutlineShieldCheck,
    HiOutlineEye,
    HiOutlineTemplate,
    HiOutlineClock,
    HiOutlineScale,
    HiOutlineCheckCircle,
}

const defaultHeroStats = [
    { value: '10K+', label: 'Students Guided' },
    { value: '50+', label: 'Digital Skills' },
    { value: '98%', label: 'Satisfaction' },
]

const defaultAudienceTints = [
    {
        shell: 'bg-[#EAF2FF]',
        card: 'from-white to-[#F4F8FF]',
        badge: 'bg-primary-100 text-primary-700',
        border: 'border-primary-200',
        image: '/images/home/audience-student.png',
    },
    {
        shell: 'bg-[#EAFBF7]',
        card: 'from-white to-[#F3FFFC]',
        badge: 'bg-teal-100 text-teal-700',
        border: 'border-teal-200',
        image: '/images/home/audience-early-career.png',
    },
    {
        shell: 'bg-[#F5F7FA]',
        card: 'from-white to-[#FBFCFE]',
        badge: 'bg-slate-200 text-slate-700',
        border: 'border-slate-200',
        image: '/images/home/audience-professional.png',
    },
]

const frameworkStepColors = [
    'from-primary-600 to-blue-500',
    'from-teal-500 to-cyan-500',
    'from-amber-500 to-orange-500',
]

const challengeIcons = [HiOutlineEye, HiOutlineClock, HiOutlineScale]

export function HomeHero({ data }) {
    const hasBgImage = !!data.bgImage
    const stats = data.stats?.length ? data.stats : defaultHeroStats
    const highlights = data.highlights?.length ? data.highlights : []

    return (
        <section
            id="home-hero"
            className={`relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32 ${hasBgImage ? '' : 'bg-white'}`}
        >
            {hasBgImage && (
                <>
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${data.bgImage})` }}
                    />
                    <div className="absolute inset-0 z-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.88),rgba(30,58,138,0.72),rgba(20,184,166,0.38))]" />
                </>
            )}

            {!hasBgImage && (
                <>
                    <MeshGradient />
                    <ModernGrid className="opacity-60" showBeams={false} />
                    <GlassShapes />
                    <GradientOrb className="left-[-8%] top-[8%]" size="h-[28rem] w-[28rem]" colors="from-primary-300/20 to-transparent" />
                    <GradientOrb className="bottom-[-6%] right-[-5%]" size="h-[24rem] w-[24rem]" colors="from-teal-300/20 to-transparent" />
                    <DotsGrid className="right-8 top-24 h-44 w-44" />
                </>
            )}

            <Container className="relative z-10">
                <div className={`grid items-center gap-12 lg:gap-16 ${hasBgImage ? '' : 'lg:grid-cols-[1.05fr_0.95fr]'}`}>
                    <div className={`${hasBgImage ? 'mx-auto max-w-5xl text-center' : 'text-center lg:text-left'}`}>
                        <Reveal>
                            {data.tag && (
                                <span className={`mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold backdrop-blur ${hasBgImage ? 'border border-white/20 bg-white/10 text-white' : 'border border-primary-200 bg-primary-50 text-primary-700'}`}>
                                    <HiOutlineSparkles className={hasBgImage ? 'text-teal-300' : 'text-teal-500'} />
                                    {data.tag}
                                </span>
                            )}

                            <h1 className={`mb-8 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl ${hasBgImage ? 'text-white lg:text-7xl' : 'text-slate-950 lg:text-[4.25rem]'}`}>
                                {data.heading?.split('|').map((part, i) => (
                                    <span key={i}>
                                        {i > 0 && ' '}
                                        {hasBgImage || i % 2 === 0 ? part : (
                                            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
                                                {part}
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </h1>

                            <p className={`mx-auto mb-10 max-w-[760px] text-lg leading-relaxed sm:text-xl ${hasBgImage ? 'text-slate-200' : 'text-slate-600 lg:mx-0'}`}>
                                {data.subheading}
                            </p>

                            <div className={`flex flex-col gap-4 sm:flex-row ${hasBgImage ? 'justify-center' : 'justify-center lg:justify-start'}`}>
                                {data.ctaText && (
                                    <Link href={data.ctaHref || '#'} className="btn-premium">
                                        <span>{data.ctaText}</span>
                                        <span className="btn-premium-icon">
                                            <HiChevronDoubleRight className="text-lg" />
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
                        </Reveal>

                        {highlights.length > 0 && (
                            <Reveal delay={0.16}>
                                <div className={`mt-8 flex flex-wrap gap-3 ${hasBgImage ? 'justify-center' : 'justify-center lg:justify-start'}`}>
                                    {highlights.map((item, i) => (
                                        <span
                                            key={i}
                                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition-transform duration-300 hover:-translate-y-0.5 ${hasBgImage ? 'border border-white/15 bg-white/10 text-white backdrop-blur' : 'border border-slate-200 bg-white text-slate-700'}`}
                                        >
                                            <span className={`h-2 w-2 rounded-full ${hasBgImage ? 'bg-teal-300' : 'bg-teal-500'}`} />
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>
                        )}

                        <Reveal delay={0.28}>
                            <div className={`mt-14 flex flex-wrap gap-5 ${hasBgImage ? 'justify-center' : 'justify-center lg:justify-start'}`}>
                                {stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-2xl border px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,58,138,0.12)] ${hasBgImage ? 'border-white/15 bg-white/10 backdrop-blur' : 'border-slate-200 bg-white'}`}
                                        style={{ animationDelay: `${0.55 + i * 0.14}s` }}
                                    >
                                        <div className={`text-2xl font-extrabold md:text-3xl ${hasBgImage ? 'text-white' : 'bg-gradient-to-r from-primary-700 to-teal-500 bg-clip-text text-transparent'}`}>
                                            {stat.value}
                                        </div>
                                        <div className={`mt-1 text-xs font-semibold uppercase tracking-[0.18em] ${hasBgImage ? 'text-slate-300' : 'text-slate-500'}`}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {!hasBgImage && (
                        <div className="w-full">
                            <Reveal delay={0.2} xOffset={40}>
                                <div className="relative mx-auto max-w-[610px]">
                                    <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-tr from-primary-300/20 via-transparent to-teal-300/20 blur-3xl" />
                                    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.12)]">
                                        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/60 bg-white/80 px-5 py-3 backdrop-blur">
                                            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-700">Career Clarity</span>
                                            <span className="rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-700">Live Guidance</span>
                                        </div>
                                        <div className="relative aspect-[4/3]">
                                            <Image
                                                src={data.image || '/images/home/hero-career.png'}
                                                alt={data.heading || 'Career Growth'}
                                                fill
                                                priority
                                                className="object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-white/10" />
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    )}
                </div>
            </Container>

            <Breadcrumbs hasBgImage={hasBgImage} />
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <WaveSeparator variant="wave" fillColor="#F8FAFC" />
            </div>
        </section>
    )
}

export function HomeAudience({ data }) {
    return (
        <section id="home-audience" className="relative overflow-hidden bg-[#F8FAFC] py-20 md:py-28 lg:py-32">
            <GradientOrb className="right-[-8%] top-[10%]" size="h-[20rem] w-[20rem]" colors="from-primary-200/30 to-transparent" />
            <HexGrid className="bottom-10 left-0 h-40 w-48" />

            <Container className="relative z-10">
                <div className={`mb-16 flex flex-col gap-12 ${data.image ? 'lg:flex-row lg:items-center' : 'text-center'}`}>
                    <div className={data.image ? 'lg:w-3/5' : 'mx-auto max-w-[760px]'}>
                        <Reveal>
                            <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary-700">
                                <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-primary-500 to-teal-400" />
                                {data.tag || 'Who We Help'}
                                <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-teal-400 to-primary-500" />
                            </span>
                            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-[3rem]">
                                {data.heading}
                            </h2>
                            {data.subheading && (
                                <p className="mt-5 max-w-[680px] text-lg leading-relaxed text-slate-600">
                                    {data.subheading}
                                </p>
                            )}
                        </Reveal>
                    </div>

                    {data.image && (
                        <div className="lg:w-2/5">
                            <Reveal delay={0.18} xOffset={36}>
                                <div className="relative mx-auto max-w-[430px] overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.1)]">
                                    <div className="relative aspect-square overflow-hidden rounded-[1.35rem]">
                                        <Image src={data.image} alt={data.heading} fill className="object-cover transition-transform duration-700 hover:scale-105" />
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    )}
                </div>

                <StaggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.cards?.map((card, i) => {
                        const Icon = iconMap[card.icon] || HiOutlineAcademicCap
                        const tint = defaultAudienceTints[i % defaultAudienceTints.length]
                        const lines = card.lines?.length ? card.lines : (card.description ? [card.description] : [])

                        return (
                            <Child key={i}>
                                <div className={`group h-full rounded-[1.75rem] ${tint.shell} p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_rgba(37,99,235,0.14)]`}>
                                    <div className={`flex h-full flex-col overflow-hidden rounded-[1.3rem] border ${tint.border} bg-gradient-to-b ${tint.card}`}>
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={card.image || tint.image}
                                                alt={card.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/10" />
                                        </div>
                                        <div className="flex flex-1 flex-col p-7">
                                            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full ${tint.badge} shadow-sm`}>
                                                <Icon className="text-xl" />
                                            </div>
                                            <h3 className="mb-3 text-xl font-bold text-slate-950">{card.title}</h3>
                                            <div className="space-y-3">
                                                {lines.map((line, j) => (
                                                    <p key={j} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-500" />
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Child>
                        )
                    })}
                </StaggerChildren>
            </Container>

            <div className="absolute bottom-0 left-0 right-0 z-10">
                <WaveSeparator variant="curve" fillColor="#FFFFFF" />
            </div>
        </section>
    )
}

export function HomeChallenge({ data }) {
    return (
        <section id="home-challenge" className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-32">
            <CircuitLines className="right-0 top-8 h-64 w-64 opacity-10" />
            <FloatingShapes className="inset-0 h-full w-full" />

            <Container className="relative z-10">
                <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                        <Reveal>
                            <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary-700">
                                <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-primary-500 to-teal-400" />
                                {data.tag || 'Why It Feels Confusing'}
                            </span>
                            <h2 className="max-w-[640px] text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-[3rem]">
                                {data.heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={0.12}>
                            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#F5F7FA] to-[#EAF2FF] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:p-10">
                                {data.body && (
                                    <div
                                        className="prose prose-slate max-w-none text-base leading-8 text-slate-600"
                                        dangerouslySetInnerHTML={{ __html: data.body }}
                                    />
                                )}

                                {data.points?.length > 0 && (
                                    <div className="mt-8 space-y-4">
                                        {data.points.map((point, i) => {
                                            const PointIcon = challengeIcons[i % challengeIcons.length]
                                            return (
                                                <div key={i} className="flex items-start gap-4 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-sm">
                                                        <PointIcon className="text-xl" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-700">
                                                            {String(i + 1).padStart(2, '0')}
                                                        </div>
                                                        <p className="mt-1 text-sm leading-7 text-slate-600">{point}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>

                    <div>
                        <Reveal delay={0.2} xOffset={36}>
                            <div className="relative mx-auto max-w-[560px]">
                                <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-tr from-primary-200/25 via-transparent to-teal-200/20 blur-3xl" />
                                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                                    <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.45rem]">
                                        <Image
                                            src={data.image || '/images/home/challenge-confusion.png'}
                                            alt={data.heading || 'Career confusion'}
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/5" />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>

            <div className="absolute bottom-0 left-0 right-0 z-10">
                <WaveSeparator variant="tilt" fillColor="#EFF6FF" />
            </div>
        </section>
    )
}

export function HomeFramework({ data }) {
    return (
        <section id="home-framework" className="relative overflow-hidden bg-[linear-gradient(180deg,#EFF6FF_0%,#F7FBFF_100%)] py-20 md:py-28 lg:py-32">
            <GradientOrb className="left-[-8%] top-[14%]" size="h-[20rem] w-[20rem]" colors="from-primary-200/25 to-transparent" />
            <GradientOrb className="right-[-6%] bottom-[10%]" size="h-[18rem] w-[18rem]" colors="from-teal-200/25 to-transparent" />
            <ModernGrid className="opacity-30" showBeams={false} />

            <Container className="relative z-10">
                <div className="mb-16 text-center">
                    <Reveal>
                        <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary-700">
                            <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-primary-500 to-teal-400" />
                            {data.tag || 'Our Framework'}
                            <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-teal-400 to-primary-500" />
                        </span>
                        <h2 className="mx-auto max-w-[780px] text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-[3rem]">
                            {data.heading}
                        </h2>
                        {data.subheading && (
                            <p className="mx-auto mt-5 max-w-[680px] text-lg leading-relaxed text-slate-600">
                                {data.subheading}
                            </p>
                        )}
                    </Reveal>
                </div>

                <div className="hidden lg:block">
                    <div className="grid grid-cols-3 gap-6">
                        {data.cards?.map((card, i) => {
                            const Icon = iconMap[card.icon] || [HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineTrendingUp][i % 3]
                            const stepLabel = card.stepLabel || `Step ${i + 1}`
                            return (
                                <Reveal key={i} delay={i * 0.08}>
                                    <div className="group relative h-full">
                                        {i < (data.cards?.length || 0) - 1 && (
                                            <div className="pointer-events-none absolute left-[calc(100%-0.25rem)] top-24 z-0 h-[2px] w-8 bg-gradient-to-r from-primary-400 via-primary-300 to-teal-300" />
                                        )}
                                        <Link
                                            href={card.href || '#'}
                                            className="relative z-10 flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white/92 shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(37,99,235,0.16)]"
                                        >
                                            <div className="relative h-56 overflow-hidden">
                                                <Image
                                                    src={card.image || '/images/home/hero-career.png'}
                                                    alt={card.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/10 to-white/5" />
                                                <div className="absolute left-5 top-5 flex items-center gap-3">
                                                    <span className={`inline-flex rounded-full bg-gradient-to-r px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-lg ${frameworkStepColors[i % frameworkStepColors.length]}`}>
                                                        {stepLabel}
                                                    </span>
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-white backdrop-blur">
                                                        <Icon className="text-xl" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-1 flex-col p-7">
                                                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary-700">
                                                    {card.kicker || 'Career Path Stage'}
                                                </div>
                                                <h3 className="mt-3 text-2xl font-extrabold leading-tight text-slate-950">
                                                    {card.title}
                                                </h3>
                                                <p className="mt-4 text-sm leading-8 text-slate-600">
                                                    {card.description}
                                                </p>

                                                <div className="mt-auto pt-6">
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-primary-700 transition-all duration-300 group-hover:gap-3">
                                                        {card.ctaText || 'Explore'}
                                                        <HiChevronDoubleRight className="transition-transform duration-300 group-hover:translate-x-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </Reveal>
                            )
                        })}
                    </div>
                </div>

                <StaggerChildren className="grid grid-cols-1 gap-6 lg:hidden">
                    {data.cards?.map((card, i) => {
                        const Icon = iconMap[card.icon] || [HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineTrendingUp][i % 3]
                        return (
                            <Child key={i}>
                                <Link href={card.href || '#'} className="block overflow-hidden rounded-[1.75rem] border border-white/70 bg-white p-0 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                                    <div className="relative h-44 overflow-hidden">
                                        <Image
                                            src={card.image || '/images/home/hero-career.png'}
                                            alt={card.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-white/10" />
                                        <span className={`absolute left-4 top-4 rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white ${frameworkStepColors[i % frameworkStepColors.length]}`}>
                                            {card.stepLabel || `Step ${i + 1}`}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                                                <Icon className="text-xl" />
                                            </div>
                                            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                                                {card.kicker || 'Career Path Stage'}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-950">{card.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                                    </div>
                                </Link>
                            </Child>
                        )
                    })}
                </StaggerChildren>
            </Container>

            <div className="absolute bottom-0 left-0 right-0 z-10">
                <WaveSeparator variant="wave" fillColor="#FFFFFF" />
            </div>
        </section>
    )
}

export function HomeStandards({ data }) {
    return (
        <section id="home-standards" className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-32">
            <GradientOrb className="right-[-6%] top-[8%]" size="h-[18rem] w-[18rem]" colors="from-primary-200/20 to-transparent" />
            <FloatingShapes className="inset-0 h-full w-full" />

            <Container className="relative z-10">
                <div className="mb-14 text-center">
                    <Reveal>
                        <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary-700">
                            <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-primary-500 to-teal-400" />
                            {data.tag || 'Our Standards'}
                            <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-teal-400 to-primary-500" />
                        </span>
                        <h2 className="mx-auto max-w-[760px] text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-[3rem]">
                            {data.heading}
                        </h2>
                    </Reveal>
                </div>

                <Reveal delay={0.1}>
                    <div className="relative mb-14 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#14B8A6] p-8 text-white shadow-[0_18px_48px_rgba(30,58,138,0.28)] md:p-12">
                        <div className="absolute -right-8 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-amber-300/10 blur-2xl" />
                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                                <HiOutlineShieldCheck className="text-3xl text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold md:text-3xl">
                                    {data.highlightTitle || 'Quality You Can Trust'}
                                </h3>
                                <p className="mt-3 max-w-[640px] text-base leading-8 text-blue-50 md:text-lg">
                                    {data.highlightText || data.subheading || 'Every recommendation is reviewed for clarity, relevance, and long-term value before it appears on the site.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <StaggerChildren className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {data.cards?.map((item, i) => {
                        const Icon = iconMap[item.icon] || HiOutlineCheckCircle
                        return (
                            <Child key={i}>
                                <div className="group h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(37,99,235,0.12)]">
                                    {item.image && (
                                        <div className="relative h-44 overflow-hidden border-b border-slate-100">
                                            <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/5" />
                                        </div>
                                    )}
                                    <div className="p-7">
                                        <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${i % 2 === 0 ? 'bg-primary-50 text-primary-700 group-hover:bg-primary-600 group-hover:text-white' : 'bg-teal-50 text-teal-700 group-hover:bg-teal-500 group-hover:text-white'}`}>
                                            <Icon className="text-xl" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.text || item.description}</p>
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

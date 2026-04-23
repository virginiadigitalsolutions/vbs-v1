'use client'

import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Reveal } from '@/components/ui/Reveal'
import { motion } from 'framer-motion'
import { HiOutlineArrowRight, HiOutlineSparkles, HiChevronDoubleRight } from 'react-icons/hi'
import { MeshGradient, ModernGrid, GlassShapes, DotsGrid } from '@/components/ui/SectionVectors'

export default function HeroSection({ data }) {
    if (!data) return null

    const hasBgImage = !!data.bgImage
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
        <section className={`relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-gray-100 dark:border-slate-800 ${hasBgImage ? '' : 'bg-white dark:bg-[#0B1120]'}`}>
            {!hasBgImage && (
                <>
                    <MeshGradient />
                    <ModernGrid />
                    <GlassShapes />
                    <DotsGrid className="top-10 left-10" />
                    <DotsGrid className="bottom-10 right-10" />
                </>
            )}
            
            {hasBgImage && (
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${data.bgImage})` }}
                />
            )}

            <Container className="relative z-10">
                <div className={`-mx-4 flex flex-wrap ${align === 'center' ? 'items-center justify-center' : 'items-center'}`}>
                    <div className={`w-full px-4 ${(data.image && align !== 'center') ? 'lg:w-1/2' : 'w-full'} ${containerAlignClass}`}>
                        <div className={maxWClass}>
                            <Reveal>
                                <div className={align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}>
                                    {/* {data.trustBadge && (
                                        <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                            {data.trustBadge}
                                            <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                        </span>
                                    )} */}
                                </div>

                                {/* Heading */}
                                <h1 className={`mb-8 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl ${hasBgImage ? 'text-white' : 'text-gray-900 dark:text-white'} ${align === 'center' ? 'lg:text-7xl text-center' : 'lg:text-5xl xl:text-6xl text-left'}`}>
                                    {data.heading}
                                </h1>

                                <p className={`mb-12 text-lg leading-relaxed sm:text-xl md:text-2xl ${hasBgImage ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'} ${align === 'center' ? 'mx-auto max-w-[800px] text-center' : align === 'right' ? 'ml-auto max-w-[600px] text-right' : 'mr-auto max-w-[600px] text-left'}`}>
                                    {data.subheading}
                                </p>

                                {/* CTAs */}
                                <div className={`flex flex-col sm:flex-row gap-4 mt-8 ${align === 'center' ? 'justify-center mx-auto' : align === 'right' ? 'justify-end ml-auto' : 'justify-start mr-auto'}`}>
                                        <Link href={data.ctaHref} className="btn-premium">
                                            <span>{data.ctaText}</span>
                                            <span className="btn-premium-icon">
                                                <HiChevronDoubleRight className="text-xl" />
                                            </span>
                                        </Link>
                                    {data.secondaryCtaText && data.secondaryCtaHref && (
                                        <Link href={data.secondaryCtaHref} className="btn-premium-outline">
                                            <span>{data.secondaryCtaText}</span>
                                            <span className="btn-premium-icon">
                                                <HiChevronDoubleRight className="text-xl" />
                                            </span>
                                        </Link>
                                    )}
                                </div>

                                {/* Advanced Stats Bar */}
                                <div className={`mt-20 flex flex-wrap gap-8 lg:gap-16 ${align === 'center' ? 'justify-center mx-auto' : align === 'right' ? 'justify-end ml-auto' : 'justify-start mr-auto'}`}>
                                    {[
                                        { value: '10K+', label: 'Students' },
                                        { value: '50+', label: 'Skills' },
                                        { value: '98%', label: 'Satisfaction' },
                                    ].map((stat, i) => (
                                        <div key={i} className="flex flex-col gap-1">
                                            <div className={`text-3xl font-bold md:text-4xl ${hasBgImage ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{stat.value}</div>
                                            <div className={`text-sm font-semibold uppercase tracking-wider ${hasBgImage ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>{stat.label}</div>
                                        </div>
                                    ))}
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
                                        <Image
                                            src={data.image}
                                            alt={data.heading || "Hero Image"}
                                            width={600}
                                            height={450}
                                            sizes="(min-width: 1024px) 600px, 92vw"
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

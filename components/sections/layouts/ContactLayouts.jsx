'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Reveal } from '@/components/ui/Reveal'
import ContactForm from '@/components/ContactForm'
import { MeshGradient, ModernGrid, GlassShapes, DotsGrid, GradientOrb } from '@/components/ui/SectionVectors'
import { 
    HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone, 
    HiOutlineArrowRight, HiOutlineExternalLink, HiChevronDoubleRight
} from 'react-icons/hi'

/* ─── 1. Contact Hero ──────────────────────────────────────────── */
export function ContactHero({ data }) {
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
        <section className={`relative z-10 overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-gray-100 dark:border-slate-800 ${hasBgImage ? '' : 'bg-white dark:bg-[#0B1120]'}`}>
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
                                {/* <div className={align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}>
                                    <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                        <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                        {data.tag || 'Contact Us'}
                                        <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                    </span>
                                </div> */}

                                <h1 className={`mb-8 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl ${hasBgImage ? 'text-white' : 'text-gray-900 dark:text-white'} ${align === 'center' ? 'lg:text-7xl text-center' : 'lg:text-5xl xl:text-6xl text-left'}`}>
                                    {data.heading?.split('|').join(' ') || 'Get in Touch'}
                                </h1>

                                <p className={`mb-12 text-lg leading-relaxed sm:text-xl md:text-2xl ${hasBgImage ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'} ${align === 'center' ? 'mx-auto max-w-[800px] text-center' : align === 'right' ? 'ml-auto max-w-[600px] text-right' : 'mr-auto max-w-[600px] text-left'}`}>
                                    {data.subheading || 'We’d love to hear from you. Please fill out the form below or reach out to us directly.'}
                                </p>

                                <div className={`flex flex-col sm:flex-row gap-4 mt-8 ${align === 'center' ? 'justify-center mx-auto' : align === 'right' ? 'justify-end ml-auto' : 'justify-start mr-auto'}`}>
                                    {data.ctaText && (
                                        <Link href={data.ctaHref || '#'} className="btn-premium">
                                            <span>{data.ctaText}</span>
                                            <span className="btn-premium-icon">
                                                <HiChevronDoubleRight className="text-xl" />
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

/* ─── 2. Contact Form Section ──────────────────────────────────── */
export function ContactFormSection({ data }) {
    return (
        <section className="relative py-16 md:py-24 lg:py-32 bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden">
            {/* Background elements */}
            <GradientOrb className="top-0 left-0" size="w-96 h-96 opacity-40" />
            <ModernGrid className="opacity-[0.03]" showBeams={false} />

            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 xl:gap-20">
                    {/* Info Column - Now First for better mobile hierarchy */}
                    <div className="w-full lg:w-5/12 xl:w-4/12 order-2 lg:order-1">
                        <Reveal>
                            <div className="mb-10 lg:mb-12">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                                    {data.heading || 'Let’s Build the Future Together'}
                                </h2>
                                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                                    {data.subheading || 'Have a question or ready to start your next project? We are here to help you navigate through your challenges.'}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Email Card */}
                                <div className="group relative p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200/50 dark:border-primary-800/50 group-hover:scale-110 transition-transform">
                                            <HiOutlineMail className="text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                                                Email Address
                                            </h4>
                                            <a 
                                                href={`mailto:${data.email || 'contact@virginiabusinesssolutions.in'}`} 
                                                className="text-lg font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors break-all"
                                            >
                                                {data.email || 'contact@virginiabusinesssolutions.in'}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 text-gray-300 dark:text-gray-600 group-hover:text-primary-400 transition-colors">
                                        <HiOutlineExternalLink className="text-xl" />
                                    </div>
                                </div>

                                {/* Location Card */}
                                <div className="group relative p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-100 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 border border-accent-200/50 dark:border-accent-800/50 group-hover:scale-110 transition-transform">
                                            <HiOutlineLocationMarker className="text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                                                Our Location
                                            </h4>
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                Virginia Business Solutions
                                                <span className="block text-base font-medium text-gray-500">Support Team</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Card (Optional extension) */}
                                {data.phone && (
                                    <div className="group relative p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center gap-5">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 group-hover:scale-110 transition-transform">
                                                <HiOutlinePhone className="text-2xl" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                                                    Call Us Directly
                                                </h4>
                                                <a 
                                                    href={`tel:${data.phone}`} 
                                                    className="text-lg font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors"
                                                >
                                                    {data.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>

                    {/* Form Column */}
                    <div className="w-full lg:w-7/12 xl:w-8/12 order-1 lg:order-2">
                        <Reveal delay={0.1} xOffset={20}>
                            <div className="relative group p-1 sm:p-2 bg-linear-to-br from-primary-500/20 to-accent-500/20 rounded-[2.5rem] shadow-2xl">
                                <div className="rounded-[2rem] bg-white dark:bg-slate-800 px-6 py-10 sm:p-12 lg:p-14 border border-white/50 dark:border-slate-700 relative overflow-hidden">
                                    {/* Subtle internal vectors */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/50 dark:bg-primary-900/10 rounded-full blur-3xl pointer-events-none" />
                                    
                                    <div className="relative z-10">
                                        <ContactForm />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}

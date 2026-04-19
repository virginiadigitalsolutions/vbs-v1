'use client'

import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { HiOutlineArrowRight, HiChevronDoubleRight } from 'react-icons/hi'
import { MeshGradient, ModernGrid } from '@/components/ui/SectionVectors'

export default function CTASection({ data }) {
    if (!data) return null

    return (
        <section className="py-16 md:py-20 lg:py-28 bg-[#F9FAFB] dark:bg-[#0B1120] relative z-20">
            <Container>
                <Reveal>
                    <div className="relative z-10 w-full rounded-[32px] bg-primary-600 px-8 py-16 md:py-20 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left shadow-2xl overflow-hidden border border-primary-500">
                        {/* Background effect */}
                        <MeshGradient className="opacity-30" />
                        <ModernGrid className="opacity-10" showBeams={false} />
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-primary-400/30 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-96 h-96 bg-accent-400/20 rounded-full blur-[120px]" />

                        <div className={`relative z-20 w-full ${data.image ? 'lg:w-3/5' : 'max-w-[800px] mx-auto text-center'}`}>
                            <span className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 border border-white/20 backdrop-blur-md">
                                {data.tag || 'Take the Leap'}
                            </span>
                            
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.15] tracking-tight">
                                {data.heading}
                            </h2>

                            <p className="text-lg md:text-xl text-primary-100 font-medium mb-10 leading-relaxed opacity-90">
                                {data.body || data.subheading}
                            </p>

                            <div className={`flex flex-col sm:flex-row items-center gap-4 w-full ${!data.image ? 'justify-center' : ''}`}>
                                <Link href={data.ctaHref || '/contact'} className="group relative inline-flex items-center gap-6 rounded-full bg-white py-2 pl-8 pr-2 text-base font-bold text-primary-600 transition-all hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 shadow-xl">
                                    <span>{data.ctaText || 'Get Started Now'}</span>
                                    <span className="flex h-10 w-16 items-center justify-center rounded-full bg-primary-600 text-white transition-all group-hover:scale-105">
                                        <HiChevronDoubleRight />
                                    </span>
                                </Link>
                                
                                {data.secondaryCtaText && (
                                    <Link href={data.secondaryCtaHref || '/about-us'} className="btn-premium-outline">
                                        <span>{data.secondaryCtaText}</span>
                                        <span className="btn-premium-icon">
                                            <HiChevronDoubleRight />
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {data.image && (
                            <div className="relative z-20 w-full lg:w-2/5 flex justify-center">
                                <div className="relative group p-2 bg-white/10 rounded-[28px] border border-white/20 backdrop-blur-sm shadow-2xl">
                                    <div className="overflow-hidden rounded-[20px] relative aspect-4/3 w-full min-h-[300px]">
                                        <Image 
                                            src={data.image} 
                                            alt={data.heading} 
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/20 pointer-events-none" />
                                </div>
                            </div>
                        )}
                    </div>
                </Reveal>
            </Container>
        </section>
    )
}

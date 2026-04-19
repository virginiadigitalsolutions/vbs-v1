'use client'

import Container from '@/components/ui/Container'
import Image from 'next/image'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'
import { motion } from 'framer-motion'
import { HiOutlineArrowRight, HiChevronDoubleRight } from 'react-icons/hi'

export default function CardsSection({ data }) {
    if (!data) return null

    return (
        <section className="py-16 md:py-20 lg:py-28 bg-[#F9FAFB] dark:bg-[#0B1120]">
            <Container>
                <Reveal>
                    <div className={`flex flex-col lg:flex-row items-center gap-10 mb-16 ${data.image ? 'text-left' : 'text-center'}`}>
                        <div className={data.image ? 'lg:w-3/5' : 'w-full max-w-[800px] mx-auto'}>
                            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                                <span className="w-8 h-[2px] bg-primary-400 dark:bg-primary-500 rounded-full" />
                                {data.tag || 'The Framework'}
                            </span>
                            <h2 className="text-3xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-[42px] tracking-tight">
                                {data.heading}
                            </h2>
                            {data.subheading && (
                                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                                    {data.subheading}
                                </p>
                            )}
                        </div>
                        {data.image && (
                            <div className="lg:w-2/5 w-full max-w-[400px]">
                                <div className="relative group p-1.5 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-700">
                                    <div className="overflow-hidden rounded-2xl relative aspect-4/3">
                                        <Image 
                                            src={data.image} 
                                            alt={data.heading} 
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5 dark:ring-white/5 pointer-events-none" />
                                </div>
                            </div>
                        )}
                    </div>
                </Reveal>

                {data.cards && (
                    <StaggerChildren className="-mx-4 flex flex-wrap justify-center">
                        {data.cards.map((card, idx) => {
                            return (
                                <Child key={idx} className="w-full px-4 md:w-1/2 lg:w-1/3">
                                    <div className="mb-8 rounded-[20px] bg-white dark:bg-slate-800 p-10 shadow-[0px_8px_24px_rgba(149,157,165,0.1)] dark:shadow-none hover:shadow-lg transition-shadow h-full flex flex-col border border-gray-100 dark:border-slate-700 group">
                                        <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                                            <span className="text-3xl transition-transform duration-500 group-hover:scale-110">
                                                {card.icon}
                                            </span>
                                        </div>
                                        
                                        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                            {card.title}
                                        </h3>
                                        
                                        <p className="mb-8 text-base text-gray-500 dark:text-gray-400 leading-relaxed grow">
                                            {card.description}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-700">
                                            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Engage Now
                                            <HiChevronDoubleRight className="text-lg" />
                                            </span>
                                        </div>
                                    </div>
                                </Child>
                            )
                        })}
                    </StaggerChildren>
                )}
            </Container>
        </section>
    )
}

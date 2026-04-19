'use client'

import Container from '@/components/ui/Container'
import Image from 'next/image'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'
import { HiOutlineCheck, HiOutlineInformationCircle } from 'react-icons/hi'

export default function TextSection({ data }) {
    if (!data) return null

    const align = data.imagePosition || 'right';
    const hasImage = !!data.image;
    const hasChecklist = !!(data.checklist && data.checklist.length > 0);
    const showSidebar = hasImage || hasChecklist;
    
    return (
        <section className="py-16 md:py-20 lg:py-28 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
            <Container>
                <div className="flex flex-col lg:flex-row lg:items-start -mx-4">
                    {/* Branding & Copy */}
                    <div className={`w-full px-4 ${showSidebar ? (align === 'left' && hasImage ? 'lg:w-1/2 lg:order-last' : 'lg:w-1/2 lg:order-first') : 'lg:w-3/4 mx-auto'}`}>
                        <Reveal>
                            {data.tag && (
                                <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                    {data.tag}
                                </span>
                            )}
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-[40px]">
                                {data.heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            {data.body && (
                                <div 
                                    className="mb-12 lg:mb-0 text-base leading-relaxed text-gray-600 dark:text-gray-300 space-y-4 md:text-lg prose prose-primary dark:prose-invert max-w-none prose-headings:font-bold prose-h3:text-gray-900 prose-h3:dark:text-white prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-4" 
                                    dangerouslySetInnerHTML={{ __html: data.body }} 
                                />
                            )}
                        </Reveal>
                    </div>

                    {/* Right / Left : Premium Checklist OR Image */}
                    {showSidebar && (
                        <div className={`w-full px-4 lg:w-1/2 mt-12 lg:mt-0 ${align === 'left' && hasImage ? 'lg:order-first lg:pr-12' : 'lg:order-last lg:pl-12'}`}>
                            <Reveal delay={0.3} xOffset={align === 'left' ? -40 : 40}>
                                {hasImage ? (
                                    <div className="relative mx-auto w-full max-w-[600px] overflow-hidden rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800 group">
                                    <div className="relative aspect-4/3 w-full bg-gray-100 dark:bg-slate-800">
                                        <Image 
                                            src={data.image} 
                                            alt={data.heading || "Content Image"} 
                                            fill
                                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />
                                    </div>
                                ) : (
                                    <div className="rounded-[20px] bg-[#F9FAFB] dark:bg-slate-800 p-8 md:p-12 border border-gray-100 dark:border-slate-700">
                                        <h3 className="mb-8 flex items-center gap-4 text-xl font-bold text-gray-900 dark:text-white">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm">
                                                <HiOutlineCheck className="text-2xl" />
                                            </span>
                                            Key Principles
                                        </h3>

                                        <StaggerChildren className="space-y-6">
                                            {data.checklist.map((item, idx) => {
                                                const parts = item.split(': ')
                                                const hasTitle = parts.length > 1

                                                return (
                                                    <Child key={idx}>
                                                        <div className="flex items-start gap-4">
                                                            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-md bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 shrink-0">
                                                                <HiOutlineCheck className="text-lg" />
                                                            </div>
                                                            <div>
                                                                {hasTitle ? (
                                                                    <>
                                                                        <span className="block text-base font-semibold text-gray-900 dark:text-white mb-1 tracking-tight">{parts[0]}</span>
                                                                        <span className="block text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{parts.slice(1).join(': ')}</span>
                                                                    </>
                                                                ) : (
                                                                    <span className="block text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Child>
                                                )
                                            })}
                                        </StaggerChildren>
                                    </div>
                                )}
                            </Reveal>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    )
}

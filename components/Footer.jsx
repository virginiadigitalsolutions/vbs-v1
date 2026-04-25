'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import { HiChevronDoubleRight } from 'react-icons/hi'
import ReactMarkdown from 'react-markdown'
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const footerLinks = {
    'Resource': [
        { label: 'About Us', href: '/about-us' },
        { label: 'Digital Skills', href: '/digital-skills' },
        { label: 'Certifications', href: '/courses-certifications' },
        { label: 'Career Guides', href: '/career-guides' },
    ],
    'Explore': [
        { label: 'Learning Hub', href: '/learning-hub' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    ],
}

export default function Footer({ settings }) {
    const siteName = settings?.siteName || 'Virginia Business Solutions'
    const footerText = settings?.footerText || ''
    const socialLinks = settings?.socialLinks || {}

    return (
        <footer className="relative overflow-hidden border-t border-slate-200 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] pb-10 dark:border-slate-800 dark:bg-[#0B1120]">
            <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary-500/50 to-transparent z-20" />

            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-100/50 dark:bg-primary-900/20 rounded-full blur-[120px] animate-morph-blob pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-100/50 dark:bg-accent-900/10 rounded-full blur-[100px] animate-morph-blob pointer-events-none -z-10 delay-2000" />

            <Container className="relative pt-10 md:pt-12">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-12 lg:gap-6">

                    <div className="md:col-span-12 lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/85 p-7 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-800/50 md:p-8">
                        <div>
                            <Link href="/" className="group/logo mb-6 inline-block">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 flex items-center justify-center bg-linear-to-br from-primary-500 to-primary-700 rounded-2xl shadow-xl shadow-primary-500/20 group-hover/logo:scale-110 transition-transform duration-500">
                                        <span className="font-black text-white text-2xl z-10">V</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 dark:text-gray-100 text-2xl tracking-tighter leading-tight uppercase">
                                            {siteName.split(' ')[0]}
                                        </span>
                                        <span className="text-xs font-bold text-primary-500 dark:text-primary-400 tracking-[0.2em] uppercase">
                                            {siteName.split(' ').slice(1).join(' ')}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <div className="prose prose-sm prose-primary mb-7 max-w-md text-sm leading-relaxed text-slate-600 dark:text-gray-400 dark:prose-invert">
                                {footerText ? (
                                    <ReactMarkdown>{footerText}</ReactMarkdown>
                                ) : (
                                    <p>Empowering the next generation of digital leaders through elite training and career guidance.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {socialLinks.linkedin && (
                                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0A66C2] hover:text-[#0A66C2] dark:border-slate-600 dark:bg-slate-700 dark:text-gray-400 dark:hover:text-blue-400">
                                    <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a href={socialLinks.twitter} target="_blank" rel="noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-900 hover:text-gray-900 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white">
                                    <FaXTwitter className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.instagram && (
                                <a href={socialLinks.instagram} target="_blank" rel="noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#E1306C] hover:text-[#E1306C] dark:border-slate-600 dark:bg-slate-700 dark:text-gray-400 dark:hover:text-pink-400">
                                    <FaInstagram className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.youtube && (
                                <a href={socialLinks.youtube} target="_blank" rel="noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#FF0000] hover:text-[#FF0000] dark:border-slate-600 dark:bg-slate-700 dark:text-gray-400 dark:hover:text-red-400">
                                    <FaYoutube className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.facebook && (
                                <a href={socialLinks.facebook} target="_blank" rel="noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1877F2] hover:text-[#1877F2] dark:border-slate-600 dark:bg-slate-700 dark:text-gray-400 dark:hover:text-blue-500">
                                    <FaFacebook className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:col-span-12 lg:col-span-7 sm:grid-cols-2 lg:gap-6">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category} className="rounded-2xl border border-slate-200/80 bg-white/85 p-7 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-800/50">
                                <h4 className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(72,115,174,0.4)] dark:shadow-[0_0_8px_rgba(72,115,174,0.8)]" />
                                    {category}
                                </h4>
                                <ul className="space-y-3.5">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="group flex items-center gap-2 font-medium text-gray-500 transition-colors duration-300 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                                            >
                                                <span className="w-0 group-hover:w-3 h-px bg-primary-500 transition-all duration-300" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className="group rounded-2xl border border-primary-100 bg-[linear-gradient(135deg,#EFF6FF_0%,#F8FAFC_100%)] p-7 transition-all hover:border-primary-200 dark:border-primary-800/30 dark:bg-primary-900/10 sm:col-span-2">
                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h4 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Ready to level up?</h4>
                                    <p className="font-medium text-gray-600 dark:text-gray-400">Start with the right digital skills and a clearer career path.</p>
                                </div>
                                <Link href="/contact" className="btn-premium shrink-0">
                                    <span>Get Started</span>
                                    <span className="btn-premium-icon">
                                        <HiChevronDoubleRight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-center dark:border-white/10 md:flex-row md:text-left">
                    <p className="text-sm font-bold tracking-tight text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} {siteName}. DESIGNED BY <span className="text-gray-400 dark:text-gray-500">VBS ENG</span>
                    </p>
                </div>
            </Container>
        </footer>
    )
}


'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import { motion } from 'framer-motion'
import { HiOutlineArrowRight, HiChevronDoubleRight } from 'react-icons/hi'
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
        <footer className="relative pb-12 overflow-hidden bg-white dark:bg-[#0B1120] border-t border-gray-100 dark:border-slate-800">
            {/* Background Base */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary-500/50 to-transparent z-20" />

            {/* Animated Aurora Orbs - Subtle Light Mode effect */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-100/50 dark:bg-primary-900/20 rounded-full blur-[120px] animate-morph-blob pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-100/50 dark:bg-accent-900/10 rounded-full blur-[100px] animate-morph-blob pointer-events-none -z-10 delay-2000" />

            <Container className="relative pt-12">
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

                    {/* Brand Card - Bento Large */}
                    <div className="md:col-span-12 lg:col-span-5 rounded-[20px] bg-[#F9FAFB] dark:bg-slate-800/50 p-8 md:p-10 border border-gray-100 dark:border-slate-800 flex flex-col justify-between group">
                        <div>
                            <Link href="/" className="inline-block mb-8 group/logo">
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
                            <div className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-md prose prose-sm prose-primary dark:prose-invert">
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
                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-[#0A66C2] hover:text-[#0A66C2] dark:hover:text-blue-400 text-gray-500 dark:text-gray-400 flex items-center justify-center transition-all shadow-sm group">
                                    <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a href={socialLinks.twitter} target="_blank" rel="noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-gray-900 hover:text-gray-900 dark:hover:text-white dark:hover:border-white text-gray-500 dark:text-gray-400 flex items-center justify-center transition-all shadow-sm group">
                                    <FaXTwitter className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.instagram && (
                                <a href={socialLinks.instagram} target="_blank" rel="noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-[#E1306C] hover:text-[#E1306C] dark:hover:text-pink-400 text-gray-500 dark:text-gray-400 flex items-center justify-center transition-all shadow-sm group">
                                    <FaInstagram className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.youtube && (
                                <a href={socialLinks.youtube} target="_blank" rel="noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-[#FF0000] hover:text-[#FF0000] dark:hover:text-red-400 text-gray-500 dark:text-gray-400 flex items-center justify-center transition-all shadow-sm group">
                                    <FaYoutube className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.facebook && (
                                <a href={socialLinks.facebook} target="_blank" rel="noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-[#1877F2] hover:text-[#1877F2] dark:hover:text-blue-500 text-gray-500 dark:text-gray-400 flex items-center justify-center transition-all shadow-sm group">
                                    <FaFacebook className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Links Bento Grid */}
                    <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category} className="rounded-[20px] bg-[#F9FAFB] dark:bg-slate-800/50 p-8 border border-gray-100 dark:border-slate-800">
                                <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-8 tracking-[0.2em] uppercase flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(72,115,174,0.4)] dark:shadow-[0_0_8px_rgba(72,115,174,0.8)]" />
                                    {category}
                                </h4>
                                <ul className="space-y-4">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 group flex items-center gap-2 transition-colors duration-300 font-medium"
                                            >
                                                <span className="w-0 group-hover:w-3 h-px bg-primary-500 transition-all duration-300" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Newsletter/CTA Bento Card */}
                        <div className="sm:col-span-2 rounded-[20px] bg-primary-50 dark:bg-primary-900/10 p-8 border border-primary-100 dark:border-primary-800/30 group hover:border-primary-200 dark:hover:border-primary-700/50 transition-all">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold text-xl mb-2">Ready to level up?</h4>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium">Join 5,000+ students learning digital skills.</p>
                                </div>
                                <Link href="/contact" className="btn-premium">
                                    <span>Get Started</span>
                                    <span className="btn-premium-icon">
                                        <HiChevronDoubleRight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-tight">
                        &copy; {new Date().getFullYear()} {siteName}. DESIGNED BY <span className="text-gray-400 dark:text-gray-500">VBS ENG</span>
                    </p>
                </div>
            </Container>
        </footer>
    )
}


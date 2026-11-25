import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { prisma, queryWithRetry } from '@/lib/db'
import { HiArrowLeft, HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineBriefcase, HiOutlineLightBulb } from 'react-icons/hi'

export const metadata = {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or has moved.',
    robots: { index: false, follow: true },
}

async function getSiteSettings() {
    try {
        return await queryWithRetry(() => prisma.siteSettings.findFirst())
    } catch {
        return null
    }
}

const quickLinks = [
    { href: '/learning-hub', label: 'Learning Hub', desc: 'Guides, tutorials & articles', Icon: HiOutlineBookOpen },
    { href: '/digital-skills', label: 'Digital Skills', desc: 'In-demand skills to learn', Icon: HiOutlineLightBulb },
    { href: '/courses-certifications', label: 'Courses & Certifications', desc: 'Get certified, get hired', Icon: HiOutlineAcademicCap },
    { href: '/career-guides', label: 'Career Guides', desc: 'Roadmaps for your next role', Icon: HiOutlineBriefcase },
]

export default async function NotFound() {
    const settings = await getSiteSettings()

    return (
        <>
            <Navbar settings={settings} />
            <main className="relative overflow-hidden bg-(--bg-body) dark:bg-[#0B1120]">
                {/* Soft background glow */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary-500/15 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-accent-500/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(37,99,235,0.08)_1px,transparent_0)] bg-size-[24px_24px]" />
                </div>

                <section className="relative mx-auto flex min-h-[80vh] w-full max-w-5xl flex-col items-center justify-center px-6 pt-36 pb-20 text-center sm:px-10">
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-primary-500 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 dark:text-primary-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-500" />
                        Error 404
                    </span>

                    <h1 className="bg-linear-to-br from-primary-900 via-primary-500 to-accent-500 bg-clip-text text-[7rem] leading-none font-bold tracking-tight text-transparent sm:text-[10rem] dark:from-white dark:via-primary-300 dark:to-accent-300">
                        404
                    </h1>

                    <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-white">
                        This page took a different career path
                    </h2>
                    <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-400">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to learning.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:-translate-y-0.5 hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:outline-none"
                        >
                            <HiArrowLeft className="h-5 w-5" />
                            Back to Home
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 py-3 font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                        >
                            Contact Us
                        </Link>
                    </div>

                    <div className="mt-16 grid w-full gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
                        {quickLinks.map(({ href, label, desc, Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="group rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-primary-500/50"
                            >
                                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition group-hover:bg-primary-500 group-hover:text-white dark:bg-slate-800 dark:text-primary-300">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
            <Footer settings={settings} />
        </>
    )
}

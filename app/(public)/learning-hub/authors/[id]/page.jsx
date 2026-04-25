import { prisma, queryWithRetry } from '@/lib/db'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'
import { FloatingShapes, GradientOrb } from '@/components/ui/SectionVectors'
import { notFound } from 'next/navigation'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { HiOutlineGlobe } from 'react-icons/hi'
import { resolveImageAlt, resolvePublishedAt, resolveReadTimeMinutes } from '@/lib/blog'

export const revalidate = 300

export async function generateStaticParams() {
    const authors = await queryWithRetry(() =>
        prisma.adminUser.findMany({
            where: {
                isActive: true,
                posts: { some: { isPublished: true } },
            },
            select: { id: true },
        })
    )

    return authors.map((author) => ({ id: String(author.id) }))
}

export async function generateMetadata({ params }) {
    const { id } = await params
    const author = await queryWithRetry(() =>
        prisma.adminUser.findUnique({ where: { id: parseInt(id) }, select: { name: true, designation: true, bio: true } })
    )
    if (!author) return { title: 'Author Not Found' }
    return {
        title: `${author.name} | VBS Learning Hub`,
        description: author.bio || `Read articles by ${author.name} on the VBS Learning Hub.`,
        alternates: { canonical: `/learning-hub/authors/${id}` },
    }
}

export default async function AuthorProfilePage({ params }) {
    const { id } = await params

    const author = await queryWithRetry(() =>
        prisma.adminUser.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true, name: true, avatar: true, bio: true, designation: true, socialLinks: true,
                posts: {
                    where: { isPublished: true },
                    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
                    include: { category: true, tags: true }
                }
            }
        })
    )

    if (!author) notFound()

    const socialLinks = author.socialLinks || {}

    return (
        <div className="min-h-screen bg-[#F4F6F9]">
            {/* Hero */}
            <section className="relative z-10 overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <GradientOrb className="top-[-20%] left-[-10%]" size="w-[800px] h-[800px]" colors="from-violet-300/20 to-purple-300/10 dark:from-violet-600/10 dark:to-purple-600/5" />
                <FloatingShapes className="inset-0 w-full h-full opacity-50" />

                <Container className="relative z-10 flex flex-col items-center text-center">
                    <Reveal>
                        {/* Avatar */}
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-5xl mb-8 overflow-hidden border-4 border-violet-200 mx-auto shadow-2xl shadow-violet-500/10">
                            {author.avatar ? (
                                <Image
                                    src={author.avatar}
                                    alt={author.name}
                                    width={160}
                                    height={160}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                author.name.charAt(0)
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
                            {author.name}
                        </h1>
                        {author.designation && (
                            <p className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-4">{author.designation}</p>
                        )}
                        {author.bio && (
                            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-[700px] mx-auto leading-relaxed mb-6 whitespace-pre-wrap">{author.bio}</p>
                        )}

                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-3">
                            {socialLinks.linkedin && (
                                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-[#0A66C2] hover:text-[#0A66C2] text-gray-500 flex items-center justify-center transition-all shadow-sm group">
                                    <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-gray-900 hover:text-gray-900 text-gray-500 flex items-center justify-center transition-all shadow-sm group">
                                    <FaXTwitter className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.github && (
                                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-gray-900 hover:text-gray-900 text-gray-500 flex items-center justify-center transition-all shadow-sm group">
                                    <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {socialLinks.website && (
                                <a href={socialLinks.website} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-primary-600 hover:text-primary-600 text-gray-500 flex items-center justify-center transition-all shadow-sm group">
                                    <HiOutlineGlobe className="text-xl group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                        </div>
                    </Reveal>
                </Container>
                <Breadcrumbs />
            </section>

            {/* Published Posts */}
            <section className="py-24">
                <Container className="max-w-6xl">
                    <Reveal>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Published Articles</h2>
                        <p className="text-gray-500 font-medium mb-12">{author.posts.length} article{author.posts.length !== 1 ? 's' : ''} by {author.name}</p>
                    </Reveal>

                    {author.posts.length > 0 ? (
                        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {author.posts.map(post => (
                                <Child key={post.id}>
                                    <Link href={`/learning-hub/${post.category?.slug || 'posts'}/${post.slug}`} className="card-elevated h-full flex flex-col group bg-white relative overflow-hidden rounded-3xl border border-gray-100">
                                        {/* Thumbnail */}
                                        <div className="h-52 bg-gray-50 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                                            {post.featuredImg ? (
                                                <Image
                                                    src={post.featuredImg}
                                                    alt={resolveImageAlt(post.featuredImgAlt, post.title)}
                                                    fill
                                                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 92vw"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📝</span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                                                {post.category && (
                                                    <span className="text-primary-700 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-md">{post.category.name}</span>
                                                )}
                                                <span className="flex items-center gap-1.5 flex-row">
                                                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    {resolvePublishedAt(post).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="text-gray-300">•</span>
                                                <span className="flex items-center gap-1.5 flex-row">
                                                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    {resolveReadTimeMinutes(post)} Min Read
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>

                                            {post.excerpt && (
                                                <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-3 mb-6 flex-1">{post.excerpt}</p>
                                            )}

                                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                                <span className="btn-premium py-1.5! pl-5! pr-1.5! text-xs! gap-2! scale-90 origin-right group-hover:scale-95 ml-auto">
                                                    Read Article
                                                    <span className="btn-premium-icon w-7! h-7! shadow-none!">
                                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </Child>
                            ))}
                        </StaggerChildren>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-xl font-bold text-gray-900">No published articles yet</p>
                            <p className="text-gray-500 mt-2">Check back soon for new content from this author.</p>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )
}

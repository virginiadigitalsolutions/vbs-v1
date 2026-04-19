import { prisma, queryWithRetry } from '@/lib/db'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'
import { FloatingShapes, GradientOrb } from '@/components/ui/SectionVectors'

export const metadata = {
    title: 'Our Authors | VBS Learning Hub',
    description: 'Meet the writers and engineers behind the VBS Learning Hub.',
}

export default async function AuthorsListPage() {
    const authors = await queryWithRetry(() =>
        prisma.adminUser.findMany({
            where: {
                isActive: true,
                posts: { some: { isPublished: true } }
            },
            orderBy: { name: 'asc' },
            select: {
                id: true, name: true, avatar: true, bio: true, designation: true, socialLinks: true,
                _count: { select: { posts: { where: { isPublished: true } } } }
            }
        })
    )

    return (
        <div className="min-h-screen bg-[#F4F6F9]">
            {/* Hero */}
            <section className="relative z-10 overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <GradientOrb className="top-[-20%] left-[-10%]" size="w-[800px] h-[800px]" colors="from-violet-300/20 to-purple-300/10 dark:from-violet-600/10 dark:to-purple-600/5" />
                <GradientOrb className="bottom-10 right-10" size="w-64 h-64" colors="from-fuchsia-300/20 to-transparent dark:from-fuchsia-600/10" />
                <FloatingShapes className="inset-0 w-full h-full opacity-50" />

                <Container className="relative z-10 text-center">
                    <Reveal>
                        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/30 px-5 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 shadow-sm border border-primary-200/50 dark:border-primary-700/30">
                            Our Team
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
                            Meet the <span className="bg-linear-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">Authors</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-[700px] mx-auto leading-relaxed">
                            The engineers, writers, and thinkers behind every article on our Learning Hub.
                        </p>
                    </Reveal>
                </Container>
                <Breadcrumbs />
            </section>

            {/* Authors Grid */}
            <section className="py-24">
                <Container className="max-w-6xl">
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {authors.map(author => (
                            <Child key={author.id}>
                                <Link href={`/learning-hub/authors/${author.id}`} className="card-modern group bg-white h-full flex flex-col items-center text-center p-8 hover:border-primary-200 transition-all">
                                    {/* Avatar */}
                                    <div className="w-24 h-24 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-3xl mb-6 overflow-hidden border-2 border-violet-200 group-hover:scale-105 transition-transform">
                                        {author.avatar ? (
                                            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                                        ) : (
                                            author.name.charAt(0)
                                        )}
                                    </div>

                                    {/* Info */}
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{author.name}</h3>
                                    {author.designation && <p className="text-sm font-semibold text-violet-600 mb-3">{author.designation}</p>}
                                    {author.bio && <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">{author.bio}</p>}

                                    <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                                        <span className="text-xs font-bold text-gray-400">{author._count?.posts || 0} Published Articles</span>
                                    </div>
                                </Link>
                            </Child>
                        ))}
                    </StaggerChildren>

                    {authors.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-xl font-bold text-gray-900">No authors yet</p>
                            <p className="text-gray-500 mt-2">Authors will appear here once they publish their first article.</p>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )
}

import { prisma, queryWithRetry } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { resolveImageAlt } from '@/lib/blog'

export default async function RelatedPosts({ currentSlug, categoryId, limit = 3 }) {
    let posts = []

    try {
        // Try to find posts in the same category first
        if (categoryId) {
            posts = await queryWithRetry(() =>
                prisma.post.findMany({
                    where: {
                        isPublished: true,
                        slug: { not: currentSlug },
                        categoryId: categoryId,
                    },
                    select: {
                        slug: true,
                        title: true,
                        excerpt: true,
                        featuredImg: true,
                        featuredImgAlt: true,
                        createdAt: true,
                        category: { select: { slug: true, name: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                    take: limit,
                })
            )
        }

        // If not enough, fill with latest posts
        if (posts.length < limit) {
            const excludeSlugs = [currentSlug, ...posts.map((p) => p.slug)]
            const morePosts = await queryWithRetry(() =>
                prisma.post.findMany({
                    where: {
                        isPublished: true,
                        slug: { notIn: excludeSlugs },
                    },
                    select: {
                        slug: true,
                        title: true,
                        excerpt: true,
                        featuredImg: true,
                        featuredImgAlt: true,
                        createdAt: true,
                        category: { select: { slug: true, name: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                    take: limit - posts.length,
                })
            )
            posts = [...posts, ...morePosts]
        }
    } catch (err) {
        console.error('[RelatedPosts] Error:', err.message)
        return null
    }

    if (posts.length === 0) return null

    return (
        <section className="py-16 border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-4">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight">
                    Related Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/learning-hub/${post.category?.slug || 'posts'}/${post.slug}`}
                            className="card-modern group flex flex-col overflow-hidden hover:border-primary-200 transition-all"
                        >
                            <div className="h-36 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                {post.featuredImg ? (
                                    <Image
                                        src={post.featuredImg}
                                        alt={resolveImageAlt(post.featuredImgAlt, post.title)}
                                        fill
                                        sizes="(min-width: 768px) 320px, 92vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <span className="text-3xl">📝</span>
                                )}
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                {post.category && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 mb-2">
                                        {post.category.name}
                                    </span>
                                )}
                                <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                                    {post.title}
                                </h4>
                                <p className="text-sm text-gray-500 line-clamp-2 flex-1">
                                    {post.excerpt || 'Read the full article to learn more.'}
                                </p>
                                <span className="text-xs font-bold text-primary-600 mt-3 group-hover:translate-x-1 transition-transform inline-block">
                                    Read More →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

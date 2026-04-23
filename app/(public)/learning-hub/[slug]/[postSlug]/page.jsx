import { prisma, queryWithRetry } from '@/lib/db'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ShareButtons from '@/components/ui/ShareButtons'
import RelatedPosts from '@/components/ui/RelatedPosts'
import JsonLd from '@/components/ui/JsonLd'
import ReactMarkdown from 'react-markdown'
import { parseBlogBlocks, resolveImageAlt, resolvePublishedAt, resolveReadTimeMinutes } from '@/lib/blog'

export const revalidate = 300

export async function generateStaticParams() {
    const posts = await queryWithRetry(() =>
        prisma.post.findMany({
            where: { isPublished: true },
            select: {
                slug: true,
                category: { select: { slug: true } },
            },
        })
    )

    return posts.map((post) => ({
        slug: post.category?.slug || 'posts',
        postSlug: post.slug,
    }))
}

export async function generateMetadata({ params }) {
    const { postSlug } = await params
    const post = await queryWithRetry(() => prisma.post.findUnique({
        where: { slug: postSlug },
        include: { category: true }
    }))

    if (!post) return { title: 'Post Not Found' }

    return {
        title: `${post.metaTitle || post.title} | VBS Learning Hub`,
        description: post.metaDesc || post.excerpt || 'Read the full article on VBS Digital.',
    }
}

const slugify = (text) => text?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || ''

function renderBlock(block, postTitle) {
    if (block.type === 'header') {
        const Tag = `h${block.data.level}`
        return (
            <Tag
                key={block.id}
                id={slugify(block.data.text)}
                className="font-extrabold text-gray-900 tracking-tight scroll-mt-32 mt-12 mb-6"
                style={{ fontSize: block.data.level === 2 ? '2rem' : block.data.level === 3 ? '1.5rem' : '1.25rem' }}
            >
                {block.data.text}
            </Tag>
        )
    }

    if (block.type === 'text') {
        return (
            <div
                key={block.id}
                className="prose prose-lg prose-neutral max-w-none break-words prose-headings:font-extrabold prose-p:text-gray-600 prose-a:text-primary-600 prose-strong:text-gray-900 [&_*]:max-w-full [&_*]:break-words"
                dangerouslySetInnerHTML={{ __html: block.data.html }}
            />
        )
    }

    if (block.type === 'image' && block.data.url) {
        return (
            <figure key={block.id} className="my-12 overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-3 shadow-xl shadow-gray-200/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.data.url} alt={resolveImageAlt(block.data.alt, postTitle)} className="w-full rounded-[1.4rem] object-cover max-h-[680px]" />
                {block.data.alt && <figcaption className="px-3 pt-4 text-center text-sm font-medium text-gray-500">{block.data.alt}</figcaption>}
            </figure>
        )
    }

    if (block.type === 'video') {
        return (
            <div key={block.id} className="relative my-12 aspect-video overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-900 shadow-xl shadow-gray-200/30">
                <iframe src={block.data.url.replace('watch?v=', 'embed/').split('&')[0].replace('youtu.be/', 'www.youtube.com/embed/')} className="absolute inset-0 h-full w-full" frameBorder="0" allowFullScreen></iframe>
            </div>
        )
    }

    if (block.type === 'quote') {
        return (
            <figure key={block.id} className="my-12 rounded-[2rem] border border-primary-100 bg-linear-to-br from-primary-50 to-cyan-50 px-8 py-10 shadow-lg shadow-primary-100/40">
                <blockquote className="text-2xl font-medium italic leading-loose text-gray-800">
                    &quot;{block.data.text}&quot;
                </blockquote>
                {block.data.author && (
                    <figcaption className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-primary-700">
                        {block.data.author}
                    </figcaption>
                )}
            </figure>
        )
    }

    if (block.type === 'divider') {
        return <hr key={block.id} className="my-16 border-t-2 border-gray-100" />
    }

    if (block.type === 'button') {
        const btnClass = block.data.style === 'primary'
            ? 'btn-premium shadow-xl shadow-primary-500/20'
            : block.data.style === 'secondary'
                ? 'btn-premium bg-gray-900 text-white border-gray-800 shadow-xl shadow-gray-900/20'
                : 'btn-premium-outline text-gray-900 border-gray-300 shadow-sm'

        return (
            <div key={block.id} className="my-12 text-center">
                <a href={block.data.url || '#'} target="_blank" rel="noopener noreferrer" className={`scale-105 origin-center ${btnClass}`}>
                    {block.data.text || 'Click Here'}
                    <span className="btn-premium-icon ml-2">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </span>
                </a>
            </div>
        )
    }

    if (block.type === 'html') {
        return (
            <div key={block.id} className="my-12 overflow-hidden rounded-[2rem]" dangerouslySetInnerHTML={{ __html: block.data.code }} />
        )
    }

    if (block.type === 'faq') {
        return (
            <div key={block.id} className="my-14">
                <h3 className="mb-6 text-2xl font-extrabold text-gray-900">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {block.data.items?.map((item, idx) => (
                        <details key={idx} className="group rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden transition-all hover:border-primary-200">
                            <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-gray-900">
                                <span>{item.q}</span>
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition group-open:rotate-180">
                                    <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </span>
                            </summary>
                            <div className="mt-4 whitespace-pre-line font-medium leading-relaxed text-gray-600">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        )
    }

    if (block.type === 'callout') {
        const themes = {
            info: 'bg-blue-50 text-blue-900 border-blue-200',
            success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
            warning: 'bg-amber-50 text-amber-900 border-amber-200',
            danger: 'bg-red-50 text-red-900 border-red-200',
        }
        const icons = {
            info: 'Info',
            success: 'Success',
            warning: 'Warning',
            danger: 'Important'
        }
        const theme = themes[block.data.style] || themes.info
        const label = icons[block.data.style] || icons.info

        return (
            <div key={block.id} className={`my-10 rounded-[1.5rem] border p-6 ${theme}`}>
                <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.2em]">{label}</p>
                <div className="whitespace-pre-line text-base font-medium leading-relaxed">
                    {block.data.text}
                </div>
            </div>
        )
    }

    return null
}

export default async function BlogPostPage({ params }) {
    const { slug, postSlug } = await params
    const post = await queryWithRetry(() =>
        prisma.post.findUnique({
            where: { slug: postSlug },
            include: {
                author: { select: { id: true, name: true, role: true, avatar: true, designation: true } },
                category: true,
                tags: true,
            },
        })
    )

    if (!post || !post.isPublished) {
        notFound()
    }

    const expectedCategorySlug = post.category?.slug || 'posts'
    if (slug !== expectedCategorySlug) {
        notFound()
    }

    const blocks = parseBlogBlocks(post.content)
    const readTime = resolveReadTimeMinutes(post)
    const publishedAt = resolvePublishedAt(post)
    const toc = blocks ? blocks.filter((block) => block.type === 'header') : []
    const categories = await queryWithRetry(() =>
        prisma.category.findMany({
            where: { posts: { some: { isPublished: true } } },
            include: { _count: { select: { posts: { where: { isPublished: true } } } } },
            orderBy: { name: 'asc' }
        })
    )

    return (
        <div className="min-h-screen bg-[#f3f6fb]">
            <JsonLd
                type="Article"
                data={{
                    title: post.metaTitle || post.title,
                    description: post.metaDesc || post.excerpt || '',
                    image: post.featuredImg || '',
                    publishedAt: publishedAt.toISOString(),
                    updatedAt: post.updatedAt.toISOString(),
                    authorName: post.author.name,
                    url: `/learning-hub/${expectedCategorySlug}/${post.slug}`,
                }}
            />

            {/* HERO SPLIT CARD LAYOUT */}
            <section className="bg-[#fbfcff] pt-24 pb-12 xl:pt-32 xl:pb-12 border-b border-gray-100 relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-linear-to-bl from-cyan-50/50 to-transparent pointer-events-none rounded-bl-full"></div>
                
                <Container className="relative z-10 max-w-[1400px] px-6">
                    <div className="mb-6">
                        <Link href="/learning-hub" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors">
                            <span>←</span>
                            Back to Learning Hub
                        </Link>
                    </div>

                    <div className="flex flex-col xl:flex-row bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 min-h-[300px]">
                        
                        {/* LEFT SIDE: Image */}
                        <div className="xl:w-1/2 relative min-h-[250px] overflow-hidden">
                            {post.featuredImg ? (
                                <Image
                                    src={post.featuredImg}
                                    alt={resolveImageAlt(post.featuredImgAlt, post.title)}
                                    fill
                                    priority
                                    sizes="(min-width: 1280px) 700px, 100vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-linear-to-br from-[#0A4186] to-[#041a35] flex items-center justify-center text-8xl font-black text-white/20">
                                    {post.title.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* RIGHT SIDE: Content (Slimmer without H1) */}
                        <div className="xl:w-1/2 p-8 md:p-10 xl:p-12 flex flex-col justify-center">
                            <div className="mb-6 font-extrabold uppercase tracking-[0.2em] text-[#869ab8] text-sm">
                                Featured Article
                            </div>

                            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-bold text-[#869ab8] uppercase tracking-widest">
                                {post.category && (
                                    <span className="rounded-full bg-[#f0f4f8] text-[#0A4186] px-4 py-1.5 font-black uppercase text-xs">
                                        {post.category.name}
                                    </span>
                                )}
                                <span>{publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                <span>{readTime} Min Read</span>
                            </div>

                            {(post.excerpt || post.metaDesc) && (
                                <p className="text-[#0A4186] text-2xl md:text-3xl xl:text-4xl font-black leading-[1.3] mb-auto line-clamp-3">
                                    {post.excerpt || post.metaDesc}
                                </p>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                                <Link href={`/learning-hub/authors/${post.author.id}`} className="group flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#f0f4f8] flex items-center justify-center text-[#0A4186] font-black text-base overflow-hidden">
                                        {post.author.avatar ? (
                                            <Image
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                width={48}
                                                height={48}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            post.author.name.charAt(0)
                                        )}
                                    </div>
                                    <div>
                                        <span className="font-extrabold text-gray-900 text-base group-hover:text-primary-600 transition-colors">{post.author.name}</span>
                                    </div>
                                </Link>
                                
                                <div className="text-[#0A4186] font-bold text-sm tracking-wide">
                                    Admin • VBS
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FULL WIDTH H1 AFTER HERO */}
            <section className="bg-[#f3f6fb] pt-12 pb-6 xl:pt-16 xl:pb-8 border-b border-gray-100">
                <Container className="max-w-[1200px] px-6 text-center">
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-[#0A4186] leading-[1.1] md:leading-[1.15] tracking-tight text-balance mx-auto">
                        {post.h1 || post.title}
                    </h1>
                </Container>
            </section>

            <section className="bg-[#f3f6fb] py-12 xl:py-16">
                <Container className="max-w-[1536px] px-6">
                    <div className="grid grid-cols-1 gap-10 xl:grid-cols-[280px_minmax(0,1fr)_280px] xl:items-start">
                        <aside className="xl:sticky xl:top-28 xl:self-start">
                            {post.showToc && toc.length > 0 && (
                                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/30">
                                    <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gray-400">On This Page</p>
                                    <ul className="space-y-3">
                                        {toc.map((header) => (
                                            <li key={header.id} style={{ marginLeft: `${(header.data.level - 2) * 0.75}rem` }}>
                                                <a href={`#${slugify(header.data.text)}`} className="group flex items-start gap-3 text-sm font-bold leading-snug text-gray-500 transition-colors hover:text-primary-600">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-200 group-hover:bg-primary-500 transition-colors"></span>
                                                    <span>{header.data.text}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>

                        <main className="min-w-0">
                            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/30 md:p-12 xl:p-14">
                                {blocks ? (
                                    <div className="max-w-full space-y-4 overflow-visible">
                                        {blocks.map((block) => renderBlock(block, post.title))}
                                    </div>
                                ) : (
                                    <article className="prose prose-lg prose-neutral max-w-none break-words prose-headings:font-extrabold prose-headings:tracking-tight prose-p:text-gray-600 prose-img:rounded-2xl prose-img:shadow-xl prose-p:leading-relaxed [&_*]:max-w-full [&_*]:break-words">
                                        <ReactMarkdown>{post.content}</ReactMarkdown>
                                    </article>
                                )}

                                {post.tags && post.tags.length > 0 && (
                                    <div className="mt-16 flex flex-wrap gap-2 border-t border-gray-100 pt-8">
                                        {post.tags.map((tag) => (
                                            <span key={tag.id} className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600">
                                                #{tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </main>

                        <aside className="xl:sticky xl:top-28 xl:self-start">
                            <div className="space-y-6">
                                <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/40">
                                    <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-primary-700">Share</p>
                                    <ShareButtons title={post.title} url={`/learning-hub/${expectedCategorySlug}/${post.slug}`} />
                                </div>

                                <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/40">
                                    <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-primary-700">Explore Topics</p>
                                    <div className="space-y-2">
                                        {categories.map((cat) => (
                                            <Link key={cat.id} href={`/learning-hub?category=${cat.id}`} className="group flex items-center justify-between rounded-2xl border border-transparent p-3 transition-colors hover:border-gray-100 hover:bg-gray-50">
                                                <span className="text-sm font-bold text-gray-700 group-hover:text-primary-600">{cat.name}</span>
                                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-bold text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-700">
                                                    {cat._count.posts}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </Container>
            </section>

            <RelatedPosts currentSlug={post.slug} categoryId={post.categoryId} />
        </div>
    )
}

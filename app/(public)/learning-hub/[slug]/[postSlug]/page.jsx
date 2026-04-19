import { prisma, queryWithRetry } from '@/lib/db'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ShareButtons from '@/components/ui/ShareButtons'
import RelatedPosts from '@/components/ui/RelatedPosts'
import JsonLd from '@/components/ui/JsonLd'
import ReactMarkdown from 'react-markdown'
import { parseBlogBlocks, resolveImageAlt, resolvePublishedAt, resolveReadTimeMinutes } from '@/lib/blog'

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
                className="prose prose-lg prose-neutral prose-headings:font-extrabold prose-p:text-gray-600 prose-a:text-primary-600 prose-strong:text-gray-900 max-w-none"
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

            {/* NEW PREMIUM HEADER */}
            <section className="relative overflow-hidden bg-[#fafcff] pt-28 pb-8 xl:pt-36 xl:pb-12 border-b border-gray-100">
                <Container className="relative z-10 max-w-[1200px] px-6 text-center">
                    <Link href="/learning-hub" className="group mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[13px] font-bold text-gray-500 shadow-sm transition-all hover:bg-gray-50 hover:text-primary-600 hover:border-primary-200">
                        <span className="transition-transform group-hover:-translate-x-1">←</span>
                        Back to Learning Hub
                    </Link>

                    {/* Metadata One-liner */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {post.category && (
                            <span className="rounded-md border border-primary-200/50 bg-primary-50 px-3 py-1 text-primary-700 shadow-sm">
                                {post.category.name}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {publishedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {readTime} Min Read
                        </span>
                    </div>
                </Container>
            </section>

            {/* Featured Image (Banner) */}
            <Container className="max-w-[1200px] px-6 mt-10 mb-12 relative z-20">
                <div className="aspect-[16/9] lg:aspect-[2.4/1] w-full overflow-hidden rounded-[2.5rem] bg-white border-[6px] border-white shadow-2xl shadow-gray-200/50">
                    {post.featuredImg ? (
                        <img src={post.featuredImg} alt={resolveImageAlt(post.featuredImgAlt, post.title)} className="h-full w-full object-cover rounded-[2rem]" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-50 text-8xl font-black text-gray-200 rounded-[2rem]">
                            {post.title.charAt(0)}
                        </div>
                    )}
                </div>
            </Container>

            <section className="pb-24">
                <Container className="max-w-[1000px] px-6 text-center mb-16">
                    {/* H1 (After Banner) */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-gray-900 mb-6 mx-auto -tracking-[0.02em] max-w-[900px]">
                        {post.h1 || post.title}
                    </h1>

                    {/* Excerpt */}
                    {(post.excerpt || post.metaDesc) && (
                        <p className="text-xl sm:text-2xl leading-[1.6] text-gray-500 font-medium mb-10 max-w-[800px] mx-auto text-balance">
                            {post.excerpt || post.metaDesc}
                        </p>
                    )}

                    {/* Minimal Author Box */}
                    <div className="flex items-center justify-center gap-4 max-w-sm mx-auto">
                        <Link href={`/learning-hub/authors/${post.author.id}`} className="group flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full ring-2 ring-white shadow-md bg-gray-100 text-lg font-black text-gray-500 border border-gray-200">
                                {post.author.avatar ? (
                                    <img src={post.author.avatar} alt={post.author.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                ) : (
                                    post.author.name.charAt(0)
                                )}
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors">{post.author.name}</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                                    {post.author.designation || 'Technical Author'}
                                </p>
                            </div>
                        </Link>
                    </div>
                </Container>

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
                                    <div className="max-w-full overflow-hidden space-y-4">
                                        {blocks.map((block) => renderBlock(block, post.title))}
                                    </div>
                                ) : (
                                    <article className="prose prose-lg prose-neutral prose-headings:font-extrabold prose-headings:tracking-tight prose-p:text-gray-600 prose-img:rounded-2xl prose-img:shadow-xl prose-p:leading-relaxed max-w-none">
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

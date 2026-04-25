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
    const { slug, postSlug } = await params
    const post = await queryWithRetry(() =>
        prisma.post.findUnique({
            where: { slug: postSlug },
            include: { category: true },
        })
    )

    if (!post) return { title: 'Post Not Found' }

    return {
        title: `${post.metaTitle || post.title} | VBS Learning Hub`,
        description: post.metaDesc || post.excerpt || 'Read the full article on VBS Digital.',
        alternates: { canonical: `/learning-hub/${slug}/${post.slug}` },
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
                className="mt-12 mb-6 scroll-mt-32 font-extrabold tracking-tight text-slate-950"
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
                className="article-rich prose prose-neutral max-w-none prose-a:text-primary-600 prose-strong:text-slate-900 [&_*]:max-w-full"
                dangerouslySetInnerHTML={{ __html: block.data.html }}
            />
        )
    }

    if (block.type === 'image' && block.data.url) {
        return (
            <figure key={block.id} className="my-12 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-50 p-3 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.data.url} alt={resolveImageAlt(block.data.alt, postTitle)} className="max-h-[680px] w-full rounded-[1.4rem] object-cover" />
                {block.data.alt && <figcaption className="px-3 pt-4 text-center text-sm font-medium text-slate-500">{block.data.alt}</figcaption>}
            </figure>
        )
    }

    if (block.type === 'video') {
        return (
            <div key={block.id} className="relative my-12 aspect-video overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <iframe src={block.data.url.replace('watch?v=', 'embed/').split('&')[0].replace('youtu.be/', 'www.youtube.com/embed/')} className="absolute inset-0 h-full w-full" frameBorder="0" allowFullScreen></iframe>
            </div>
        )
    }

    if (block.type === 'quote') {
        return (
            <figure key={block.id} className="my-12 rounded-[2rem] border border-primary-100 bg-[linear-gradient(135deg,#eff6ff_0%,#ecfeff_100%)] px-8 py-10 shadow-[0_18px_40px_rgba(72,115,174,0.10)]">
                <blockquote className="text-2xl font-medium italic leading-loose text-slate-800">
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
        return <hr key={block.id} className="my-16 border-t-2 border-slate-200" />
    }

    if (block.type === 'button') {
        const btnClass =
            block.data.style === 'primary'
                ? 'btn-premium shadow-xl shadow-primary-500/20'
                : block.data.style === 'secondary'
                    ? 'btn-premium bg-slate-950 text-white border-slate-900 shadow-xl shadow-slate-900/20'
                    : 'btn-premium-outline text-slate-900 border-slate-300 shadow-sm'

        return (
            <div key={block.id} className="my-12 text-center">
                <a href={block.data.url || '#'} target="_blank" rel="noopener noreferrer" className={`scale-105 origin-center ${btnClass}`}>
                    {block.data.text || 'Click Here'}
                    <span className="btn-premium-icon ml-2">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </span>
                </a>
            </div>
        )
    }

    if (block.type === 'html') {
        return <div key={block.id} className="my-12 overflow-hidden rounded-[2rem]" dangerouslySetInnerHTML={{ __html: block.data.code }} />
    }

    if (block.type === 'faq') {
        return (
            <div key={block.id} className="my-14">
                <h3 className="mb-6 text-2xl font-extrabold text-slate-950">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {block.data.items?.map((item, idx) => (
                        <details key={idx} className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary-200 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-slate-900">
                                <span>{item.q}</span>
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition group-open:rotate-180">
                                    <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
                            </summary>
                            <div className="mt-4 whitespace-pre-line text-base font-medium leading-relaxed text-slate-600">{item.a}</div>
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
            danger: 'Important',
        }
        const theme = themes[block.data.style] || themes.info
        const label = icons[block.data.style] || icons.info

        return (
            <div key={block.id} className={`my-10 rounded-[1.5rem] border p-6 ${theme}`}>
                <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.2em]">{label}</p>
                <div className="whitespace-pre-line text-base font-medium leading-relaxed">{block.data.text}</div>
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
    const displayTitle = post.h1 || post.title
    const heroIntro = [post.excerpt, post.metaDesc]
        .map((value) => value?.trim())
        .find((value) => value && value.toLowerCase() !== displayTitle.toLowerCase())
    const toc = blocks ? blocks.filter((block) => block.type === 'header') : []
    const categories = await queryWithRetry(() =>
        prisma.category.findMany({
            where: { posts: { some: { isPublished: true } } },
            include: { _count: { select: { posts: { where: { isPublished: true } } } } },
            orderBy: { name: 'asc' },
        })
    )

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f1f6fd_32%,#eef3f8_100%)]">
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
            <style>{`
                .article-rich {
                    font-family: Georgia, "Times New Roman", serif;
                    font-size: 1.08rem;
                    line-height: 1.95;
                    color: #0f172a;
                    word-break: normal;
                    overflow-wrap: break-word;
                    hyphens: manual;
                }
                .article-rich h1,
                .article-rich h2,
                .article-rich h3,
                .article-rich h4,
                .article-rich h5,
                .article-rich h6 {
                    color: #020617;
                    font-weight: 800;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                    margin: 1.7em 0 0.7em;
                    font-family: 'Jost', system-ui, sans-serif;
                }
                .article-rich h2 {
                    font-size: clamp(2.3rem, 4vw, 3.2rem);
                }
                .article-rich h3 {
                    font-size: clamp(1.6rem, 2.6vw, 2.1rem);
                }
                .article-rich p,
                .article-rich li,
                .article-rich blockquote,
                .article-rich h1,
                .article-rich h2,
                .article-rich h3,
                .article-rich h4,
                .article-rich h5,
                .article-rich h6 {
                    word-break: normal;
                    overflow-wrap: break-word;
                    hyphens: manual;
                    white-space: normal;
                }
                .article-rich p,
                .article-rich ul,
                .article-rich ol,
                .article-rich blockquote,
                .article-rich pre {
                    margin-bottom: 1.15em;
                }
                .article-rich ul,
                .article-rich ol {
                    padding-left: 1.5rem;
                }
                .article-rich li::marker {
                    color: #64748b;
                }
                .article-rich p {
                    color: #1e293b;
                }
                .article-rich strong {
                    color: #0f172a;
                    font-weight: 700;
                }
                .article-rich blockquote {
                    border-left: 4px solid #8b5cf6;
                    padding: 0.2rem 0 0.2rem 1.1rem;
                    color: #334155;
                    font-style: italic;
                }
                .article-rich blockquote p {
                    color: inherit;
                }
                .article-rich a,
                .article-rich code,
                .article-rich pre,
                .article-rich td,
                .article-rich th {
                    overflow-wrap: anywhere;
                }
                .article-rich .ql-align-center { text-align: center; }
                .article-rich .ql-align-right { text-align: right; }
                .article-rich .ql-align-justify { text-align: justify; }
                .article-rich .ql-align-center img { margin-left: auto; margin-right: auto; display: block; }
                .article-rich .ql-align-right img { margin-left: auto; margin-right: 0; display: block; }
            `}</style>

            <section className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,#fbfdff_0%,#f4f8ff_100%)] pt-24 pb-12 xl:pt-32 xl:pb-16">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-primary-200/25 blur-3xl" />
                    <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-cyan-200/20 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-blue-100/30 blur-3xl" />
                </div>

                <Container className="relative z-10 max-w-[1480px] px-6">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <Link
                            href="/learning-hub"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:text-primary-700"
                        >
                            <span>←</span>
                            Back to Learning Hub
                        </Link>
                        <div className="hidden text-[11px] font-black uppercase tracking-[0.22em] text-slate-400 lg:block">
                            VBS Learning Hub
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white shadow-[0_28px_70px_rgba(15,23,42,0.10)]">
                        <div className="grid grid-cols-1 xl:grid-cols-[1.08fr_0.92fr]">
                            <div className="relative min-h-[320px] xl:min-h-[520px]">
                                {post.featuredImg ? (
                                    <Image
                                        src={post.featuredImg}
                                        alt={resolveImageAlt(post.featuredImgAlt, post.title)}
                                        fill
                                        priority
                                        sizes="(min-width: 1280px) 760px, 100vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#0A4186_0%,#10264f_100%)] text-8xl font-black text-white/20">
                                        {post.title.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,65,134,0.06),rgba(2,6,23,0.26))]" />
                                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white backdrop-blur-md">
                                        <span className="h-2 w-2 rounded-full bg-cyan-300" />
                                        Featured article
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 p-8 md:p-10 xl:justify-center xl:p-12">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        {post.category && (
                                            <span className="rounded-full bg-primary-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-primary-700">
                                                {post.category.name}
                                            </span>
                                        )}
                                        <span className="rounded-full bg-slate-100 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                                            {publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="rounded-full bg-slate-100 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                                            {readTime} min read
                                        </span>
                                    </div>

                                    {heroIntro && (
                                        <p className="mt-6 max-w-[44rem] text-2xl font-black leading-[1.15] tracking-tight text-[#0A4186] md:max-w-[48rem] md:text-3xl xl:max-w-[52rem]">
                                            {heroIntro}
                                        </p>
                                    )}

                                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50/80 px-4 py-4">
                                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Published</div>
                                            <div className="mt-2 text-sm font-bold text-slate-900">
                                                {publishedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                                            </div>
                                        </div>
                                        <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50/80 px-4 py-4">
                                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Reading Time</div>
                                            <div className="mt-2 text-sm font-bold text-slate-900">{readTime} minutes</div>
                                        </div>
                                        <div className="col-span-2 rounded-[1.4rem] border border-slate-200 bg-slate-50/80 px-4 py-4 sm:col-span-1">
                                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Topic</div>
                                            <div className="mt-2 text-sm font-bold text-slate-900">{post.category?.name || 'Learning Hub'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 pt-5">
                                    <Link href={`/learning-hub/authors/${post.author.id}`} className="group flex items-center gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-base font-black text-primary-700 shadow-sm">
                                            {post.author.avatar ? (
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    width={56}
                                                    height={56}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                post.author.name.charAt(0)
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Written by</div>
                                            <div className="mt-1 text-base font-black text-slate-950 transition-colors group-hover:text-primary-700">
                                                {post.author.name}
                                            </div>
                                            <div className="mt-1 text-sm font-medium text-slate-500">
                                                {post.author.designation || 'VBS Editorial Team'}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="border-b border-slate-200/70 bg-transparent py-10 xl:py-12">
                <Container className="max-w-[1240px] px-6 text-center">
                    <h1 className="mx-auto max-w-[920px] text-balance text-[1.7rem] font-black leading-[1.1] tracking-tight text-[#0A4186] md:text-[2.2rem] xl:text-[2.65rem]">
                        {displayTitle}
                    </h1>
                </Container>
            </section>

            <section className="py-12 xl:py-16">
                <Container className="max-w-[1536px] px-6">
                    <div className="grid grid-cols-1 gap-10 xl:grid-cols-[280px_minmax(0,1fr)_280px] xl:items-start">
                        <aside className="xl:sticky xl:top-28 xl:self-start">
                            {post.showToc && toc.length > 0 && (
                                <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                                    <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">In This Article</p>
                                    <ul className="space-y-3">
                                        {toc.map((header) => (
                                            <li key={header.id} style={{ marginLeft: `${(header.data.level - 2) * 0.75}rem` }}>
                                                <a href={`#${slugify(header.data.text)}`} className="group flex items-start gap-3 text-sm font-bold leading-snug text-slate-500 transition-colors hover:text-primary-600">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-200 transition-colors group-hover:bg-primary-500"></span>
                                                    <span>{header.data.text}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>

                        <main className="min-w-0">
                            <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.07)] md:p-12 xl:p-14">
                                {blocks ? (
                                    <div className="article-rich max-w-full space-y-4 overflow-visible">
                                        {blocks.map((block) => renderBlock(block, post.title))}
                                    </div>
                                ) : (
                                    <article className="article-rich prose prose-neutral max-w-none prose-img:rounded-2xl prose-img:shadow-xl [&_*]:max-w-full">
                                        <ReactMarkdown>{post.content}</ReactMarkdown>
                                    </article>
                                )}

                                {post.tags && post.tags.length > 0 && (
                                    <div className="mt-16 border-t border-slate-200 pt-8">
                                        <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Tagged Under</p>
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <span key={tag.id} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600">
                                                    #{tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </main>

                        <aside className="xl:sticky xl:top-28 xl:self-start">
                            <div className="space-y-6">
                                <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                                    <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-primary-700">Share This Article</p>
                                    <ShareButtons title={post.title} url={`/learning-hub/${expectedCategorySlug}/${post.slug}`} />
                                </div>

                                <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                                    <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-primary-700">About the Author</p>
                                    <Link href={`/learning-hub/authors/${post.author.id}`} className="group flex items-start gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-base font-black text-primary-700">
                                            {post.author.avatar ? (
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    width={56}
                                                    height={56}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                post.author.name.charAt(0)
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-base font-black text-slate-950 transition-colors group-hover:text-primary-700">{post.author.name}</div>
                                            <div className="mt-1 text-sm font-medium text-slate-500">
                                                {post.author.designation || 'VBS contributor'}
                                            </div>
                                            <div className="mt-3 text-sm font-medium leading-7 text-slate-500">
                                                Explore more articles and insights from this author.
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                                    <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-primary-700">Explore Topics</p>
                                    <div className="space-y-2">
                                        {categories.map((cat) => (
                                            <Link key={cat.id} href={`/learning-hub?category=${cat.id}`} className="group flex items-center justify-between rounded-2xl border border-transparent p-3 transition-colors hover:border-slate-200 hover:bg-slate-50">
                                                <span className="text-sm font-bold text-slate-700 group-hover:text-primary-600">{cat.name}</span>
                                                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500 group-hover:bg-primary-100 group-hover:text-primary-700">
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

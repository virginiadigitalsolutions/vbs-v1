import { after } from 'next/server'
import { getBaseUrl, getCanonicalUrl } from '@/lib/seo'

// IndexNow instantly notifies Bing, Yandex, Seznam, Naver and others (Bing's index
// also feeds ChatGPT search and Copilot) whenever a URL is added, updated or removed.
// The key must also be served at /{key}.txt — see public/.
export const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'eb4f42d3a4561e47ad0b248e15166aa3'

/**
 * Fire-and-forget submission. Never throws — indexing pings must not break saves.
 * Skipped outside production so local/preview edits don't ping search engines.
 */
export async function submitToIndexNow(paths = []) {
    if (process.env.NODE_ENV !== 'production' || process.env.INDEXNOW_DISABLED === 'true') return { skipped: true }

    const urlList = [...new Set(paths.filter(Boolean).map((p) => (p.startsWith('http') ? p : getCanonicalUrl(p))))]
    if (urlList.length === 0) return { skipped: true }

    const host = new URL(getBaseUrl()).host

    try {
        const res = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host,
                key: INDEXNOW_KEY,
                keyLocation: `${getBaseUrl()}/${INDEXNOW_KEY}.txt`,
                urlList: urlList.slice(0, 10000),
            }),
            signal: AbortSignal.timeout(8000),
        })
        if (!res.ok) console.warn('[IndexNow] status', res.status)
        return { status: res.status, count: urlList.length }
    } catch (err) {
        console.warn('[IndexNow] failed:', err.message)
        return { error: err.message }
    }
}

/** URLs that change whenever a blog post changes. */
export function postRelatedPaths(post) {
    const categorySlug = post?.category?.slug || 'posts'
    return [
        `/learning-hub/${categorySlug}/${post.slug}`,
        `/learning-hub/${categorySlug}`,
        '/learning-hub',
        post?.authorId ? `/learning-hub/authors/${post.authorId}` : null,
        '/sitemap.xml',
        '/feed.xml',
        '/llms.txt',
        '/llms-full.txt',
    ].filter(Boolean)
}

// Section editors save often; only re-ping the same URL once every 10 minutes
// per server instance so IndexNow doesn't throttle us.
const recentPings = new Map()
const PING_COOLDOWN_MS = 10 * 60 * 1000

/** Call after a CMS page or section changes. Safe to call on every save. */
export function pingPageChange(slug) {
    if (!slug) return
    const path = slug === 'home' ? '/' : `/${slug}`
    const now = Date.now()
    if (now - (recentPings.get(path) || 0) < PING_COOLDOWN_MS) return
    recentPings.set(path, now)
    after(() => submitToIndexNow([path]))
}

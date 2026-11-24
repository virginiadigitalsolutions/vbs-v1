import { getBaseUrl } from '@/lib/seo'

// Search engines and AI answer engines we explicitly welcome. Being crawlable by
// these is what lets the site be cited in ChatGPT, Perplexity, Claude, Gemini,
// Copilot and Google AI Overviews (GEO / AEO).
const AI_AND_SEARCH_BOTS = [
    'Googlebot',
    'Bingbot',
    'Google-Extended',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Applebot',
    'Applebot-Extended',
    'Amazonbot',
    'meta-externalagent',
    'DuckAssistBot',
    'CCBot',
    'YandexBot',
]

const PRIVATE_PATHS = ['/admin/', '/api/']

export default function robots() {
    const baseUrl = getBaseUrl()
    return {
        rules: [
            { userAgent: AI_AND_SEARCH_BOTS, allow: ['/', '/llms.txt', '/llms-full.txt'], disallow: PRIVATE_PATHS },
            { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
        ],
        host: baseUrl,
        sitemap: [`${baseUrl}/sitemap.xml`],
    }
}

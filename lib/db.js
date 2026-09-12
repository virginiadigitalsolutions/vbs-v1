import { PrismaClient } from '@prisma/client'

// Use a global variable to persist the Prisma Client instance across
// Next.js hot-reloads (dev) and warm serverless invocations (prod).
const globalForPrisma = globalThis

const enforceConnectionLimit = () => {
  let url = process.env.DATABASE_URL
  if (!url) return url

  const params = new URLSearchParams()

  // Force each serverless function to hold at most 1 connection
  if (!url.includes('connection_limit=')) params.append('connection_limit', '1')
  // Fail fast if no connection is available within 10s instead of hanging forever
  if (!url.includes('pool_timeout=')) params.append('pool_timeout', '10')
  // Fail fast on TCP connect instead of hanging
  if (!url.includes('connect_timeout=')) params.append('connect_timeout', '10')

  const paramStr = params.toString()
  if (paramStr) {
    url += url.includes('?') ? `&${paramStr}` : `?${paramStr}`
  }

  return url
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: { url: enforceConnectionLimit() }
  }
})

// Cache the client globally so hot-reloads and warm invocations reuse it.
// ALWAYS cache — the free MySQL host only allows 5 connections.
globalForPrisma.prisma = prisma

/**
 * Retry wrapper for Prisma queries.
 * Handles transient "max_user_connections exceeded" errors on cheap MySQL hosts.
 * On Vercel, multiple serverless functions cold-start simultaneously — each opens
 * a connection, often exceeding the 5-connection limit for a few hundred ms.
 * Retrying with backoff + jitter lets the burst settle without thundering herd.
 *
 * Usage: const data = await queryWithRetry(() => prisma.post.findMany())
 */
export async function queryWithRetry(fn, retries = 3, delayMs = 300) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const isConnectionError =
        err?.constructor?.name === 'PrismaClientInitializationError' ||
        err?.message?.includes('max_user_connections') ||
        err?.message?.includes('Connection refused') ||
        err?.message?.includes('Can\'t reach database') ||
        err?.message?.includes('pool_timeout')

      if (isConnectionError && attempt < retries) {
        // Add ±25% jitter so concurrent cold-starts don't all retry at the same ms
        const jitter = delayMs * 0.25 * (Math.random() * 2 - 1)
        const wait = Math.max(100, delayMs + jitter)
        console.warn(`[DB] Connection error (attempt ${attempt}/${retries}), retrying in ${Math.round(wait)}ms...`)
        await new Promise(r => setTimeout(r, wait))
        delayMs *= 2 // exponential backoff: 300 → 600 → 1200
        continue
      }
      throw err
    }
  }
}


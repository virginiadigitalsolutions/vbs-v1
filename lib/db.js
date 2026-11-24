import { PrismaClient } from '@prisma/client'

// Use a global variable to persist the Prisma Client instance across
// Next.js hot-reloads (dev) and warm serverless invocations (prod).
const globalForPrisma = globalThis

// `next build` pre-renders dozens of pages in parallel inside one process. With a
// single pooled connection they queue up and time out (Prisma P2024), failing
// the deploy. Build gets a slightly bigger pool and a longer wait; runtime
// serverless functions keep 1 connection each (the MySQL host allows only 5).
const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

const POOL_SETTINGS = isBuild
  ? { connection_limit: '2', pool_timeout: '60', connect_timeout: '20' }
  : { connection_limit: '1', pool_timeout: '10', connect_timeout: '10' }

const enforceConnectionLimit = () => {
  const url = process.env.DATABASE_URL
  if (!url) return url

  const [base, query = ''] = url.split('?')
  const params = new URLSearchParams(query)

  for (const [key, value] of Object.entries(POOL_SETTINGS)) {
    // During build we always override; at runtime we respect values set in the URL.
    if (isBuild || !params.has(key)) params.set(key, value)
  }

  return `${base}?${params.toString()}`
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
        err?.code === 'P2024' || // Timed out fetching a new connection from the pool
        err?.message?.includes('Timed out fetching a new connection') ||
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


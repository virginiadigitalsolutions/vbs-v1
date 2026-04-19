import { PrismaClient } from '@prisma/client'

// Use a global variable to persist the Prisma Client instance across
// Next.js hot-reloads (dev) and warm serverless invocations (prod).
const globalForPrisma = globalThis

const enforceConnectionLimit = () => {
  let url = process.env.DATABASE_URL
  if (!url) return url
  // Force each serverless function to only hold 1 connection
  if (url.includes('connection_limit=')) {
    url = url.replace(/connection_limit=\d+/, 'connection_limit=1')
  } else {
    url += url.includes('?') ? '&connection_limit=1' : '?connection_limit=1'
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
 * Retrying with backoff lets the burst settle.
 *
 * Usage: const data = await queryWithRetry(() => prisma.post.findMany())
 */
export async function queryWithRetry(fn, retries = 3, delayMs = 500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const isConnectionError =
        err?.constructor?.name === 'PrismaClientInitializationError' ||
        err?.message?.includes('max_user_connections') ||
        err?.message?.includes('Connection refused') ||
        err?.message?.includes('Can\'t reach database')

      if (isConnectionError && attempt < retries) {
        console.warn(`[DB] Connection error (attempt ${attempt}/${retries}), retrying in ${delayMs}ms...`)
        await new Promise(r => setTimeout(r, delayMs))
        delayMs *= 2 // exponential backoff: 500 → 1000 → 2000
        continue
      }
      throw err
    }
  }
}


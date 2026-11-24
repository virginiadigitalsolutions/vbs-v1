import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { submitToIndexNow } from '@/lib/indexnow'
import sitemap from '@/app/sitemap'

// POST /api/admin/indexnow — submits every sitemap URL to IndexNow in one go.
// Use once after deploying, or after bulk content changes.
export async function POST() {
    const session = await getAuthSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const entries = await sitemap()
    const result = await submitToIndexNow(entries.map((entry) => entry.url))
    return NextResponse.json({ submitted: entries.length, ...result })
}

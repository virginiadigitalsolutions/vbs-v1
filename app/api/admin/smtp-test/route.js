import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { sendTestEmail, getSmtpStatus } from '@/lib/mailer'

export async function GET() {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        return NextResponse.json(getSmtpStatus())
    } catch (err) {
        console.error('[smtp-test GET]', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { email } = await request.json()
        const toEmail = email || process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER

        if (!toEmail) {
            return NextResponse.json({ error: 'No recipient email provided' }, { status: 400 })
        }

        await sendTestEmail(toEmail)

        return NextResponse.json({ success: true, sentTo: toEmail })
    } catch (err) {
        console.error('[smtp-test POST]', err)
        return NextResponse.json({ error: err.message || 'Failed to send test email' }, { status: 500 })
    }
}

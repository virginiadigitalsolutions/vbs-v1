import { z } from 'zod'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { sendContactNotification, sendContactConfirmation } from '@/lib/mailer'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(request) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const contact = await prisma.contact.create({ data: parsed.data })

    // Send emails (non-blocking — failures don't affect response)
    sendContactNotification(parsed.data).catch(() => {})
    sendContactConfirmation(parsed.data).catch(() => {})

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 })
  } catch (err) {
    console.error('[contact API]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

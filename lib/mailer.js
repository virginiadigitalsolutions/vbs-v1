import nodemailer from 'nodemailer'

// ─── Transporter (lazy singleton) ──────────────────────────────────────────
let transporter = null

function getTransporter() {
    if (transporter) return transporter

    const host = process.env.SMTP_HOST
    const port = parseInt(process.env.SMTP_PORT || '587')
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!host || !user || !pass) {
        console.warn('[Mailer] SMTP not configured — emails will be skipped')
        return null
    }

    transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    })

    return transporter
}

// ─── Brand constants ───────────────────────────────────────────────────────
const BRAND = {
    name: 'Virginia Business Solutions',
    color: '#4873AE',
    url: process.env.NEXTAUTH_URL || 'https://virginiabusinesssolutions.in',
    logo: '',
}

// ─── HTML email wrapper ────────────────────────────────────────────────────
function emailLayout(title, bodyHtml) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(135deg,${BRAND.color} 0%,#2d5a8e 100%);padding:32px 40px;text-align:center;">
                            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
                                ${BRAND.name}
                            </h1>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            ${bodyHtml}
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                            <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                                ${BRAND.name} &bull; Digital Career Guidance<br/>
                                <a href="${BRAND.url}" style="color:${BRAND.color};text-decoration:none;font-weight:600;">${BRAND.url.replace('https://', '')}</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}

// ─── Send: Admin notification ──────────────────────────────────────────────
export async function sendContactNotification({ name, email, phone, subject, message }) {
    const t = getTransporter()
    if (!t) return

    const to = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER
    if (!to) return

    const bodyHtml = `
        <h2 style="margin:0 0 8px;color:#0f172a;font-size:20px;font-weight:700;">📩 New Contact Enquiry</h2>
        <p style="margin:0 0 24px;color:#64748b;font-size:14px;">You received a new message from your website contact form.</p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
                <td style="padding:12px 16px;background:#f8fafc;border-radius:10px 10px 0 0;border-bottom:1px solid #e2e8f0;">
                    <span style="color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">From</span><br/>
                    <span style="color:#0f172a;font-size:15px;font-weight:600;">${name}</span>
                </td>
            </tr>
            <tr>
                <td style="padding:12px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                    <span style="color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                    <a href="mailto:${email}" style="color:${BRAND.color};font-size:15px;font-weight:600;text-decoration:none;">${email}</a>
                </td>
            </tr>
            ${phone ? `<tr>
                <td style="padding:12px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                    <span style="color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Phone</span><br/>
                    <span style="color:#0f172a;font-size:15px;font-weight:600;">${phone}</span>
                </td>
            </tr>` : ''}
            ${subject ? `<tr>
                <td style="padding:12px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                    <span style="color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Subject</span><br/>
                    <span style="color:#0f172a;font-size:15px;font-weight:600;">${subject}</span>
                </td>
            </tr>` : ''}
            <tr>
                <td style="padding:12px 16px;background:#f8fafc;border-radius:0 0 10px 10px;">
                    <span style="color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Message</span><br/>
                    <p style="margin:8px 0 0;color:#334155;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</p>
                </td>
            </tr>
        </table>

        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your enquiry')}" style="display:inline-block;background:${BRAND.color};color:#ffffff;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">
            Reply to ${name}
        </a>
    `

    try {
        await t.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject: `New Enquiry: ${subject || 'Contact Form'} — ${name}`,
            html: emailLayout('New Contact Enquiry', bodyHtml),
        })
        console.log('[Mailer] Admin notification sent to', to)
    } catch (err) {
        console.error('[Mailer] Failed to send admin notification:', err.message)
    }
}

// ─── Send: User confirmation ───────────────────────────────────────────────
export async function sendContactConfirmation({ name, email }) {
    const t = getTransporter()
    if (!t) return

    const bodyHtml = `
        <h2 style="margin:0 0 8px;color:#0f172a;font-size:20px;font-weight:700;">Thank you, ${name}! 🎉</h2>
        <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
            We've received your message and will get back to you as soon as possible — typically within 24–48 hours.
        </p>
        
        <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:20px;margin-bottom:24px;">
            <p style="margin:0;color:#0369a1;font-size:13px;font-weight:600;">
                💡 While you wait, explore our resources on digital skills, career guides, and certifications to start building your future today.
            </p>
        </div>

        <a href="${BRAND.url}" style="display:inline-block;background:${BRAND.color};color:#ffffff;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">
            Explore Our Resources
        </a>

        <p style="margin:24px 0 0;color:#94a3b8;font-size:12px;">
            This is an automated confirmation. Please do not reply to this email.
        </p>
    `

    try {
        await t.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: `We received your message — ${BRAND.name}`,
            html: emailLayout('Message Received', bodyHtml),
        })
        console.log('[Mailer] Confirmation sent to', email)
    } catch (err) {
        console.error('[Mailer] Failed to send confirmation:', err.message)
    }
}

// ─── Send: Test email ──────────────────────────────────────────────────────
export async function sendTestEmail(toEmail) {
    const t = getTransporter()
    if (!t) throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in your .env file.')

    const bodyHtml = `
        <h2 style="margin:0 0 8px;color:#0f172a;font-size:20px;font-weight:700;">✅ SMTP Test Successful</h2>
        <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
            Your email configuration is working correctly. Contact form submissions will now trigger email notifications.
        </p>
        
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;">Configuration</td></tr>
                <tr><td style="color:#334155;font-size:13px;padding:2px 0;"><strong>Host:</strong> ${process.env.SMTP_HOST}</td></tr>
                <tr><td style="color:#334155;font-size:13px;padding:2px 0;"><strong>Port:</strong> ${process.env.SMTP_PORT}</td></tr>
                <tr><td style="color:#334155;font-size:13px;padding:2px 0;"><strong>From:</strong> ${process.env.SMTP_FROM || process.env.SMTP_USER}</td></tr>
                <tr><td style="color:#334155;font-size:13px;padding:2px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</td></tr>
            </table>
        </div>
    `

    await t.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: toEmail,
        subject: `✅ SMTP Test — ${BRAND.name}`,
        html: emailLayout('SMTP Test', bodyHtml),
    })
}

// ─── Check SMTP status ────────────────────────────────────────────────────
export function getSmtpStatus() {
    return {
        configured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
        host: process.env.SMTP_HOST || '',
        port: process.env.SMTP_PORT || '587',
        user: process.env.SMTP_USER ? process.env.SMTP_USER.replace(/(.{3}).*(@.*)/, '$1***$2') : '',
        from: process.env.SMTP_FROM || '',
        adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL || '',
    }
}

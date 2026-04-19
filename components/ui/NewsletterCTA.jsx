'use client'

import { useState } from 'react'
import { HiOutlineMail, HiOutlineSparkles } from 'react-icons/hi'

export default function NewsletterCTA() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return
        // Placeholder — in production, integrate with email service (Resend, SendGrid, etc.)
        console.log('[Newsletter] Subscriber:', email)
        setSubmitted(true)
        setEmail('')
    }

    return (
        <section className="relative py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary-500/5 via-transparent to-accent-400/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/8 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 mb-6">
                    <HiOutlineSparkles className="text-primary-500 text-sm" />
                    <span className="text-primary-700 text-xs font-bold uppercase tracking-wider">Stay Ahead</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                    Get Career Insights Weekly
                </h3>
                <p className="text-gray-500 font-medium text-lg mb-8 max-w-lg mx-auto">
                    Curated tips on digital skills, courses, and career moves — delivered to your inbox every week.
                </p>

                {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 animate-fade-up">
                        <p className="text-green-700 font-bold text-lg">🎉 You&apos;re in!</p>
                        <p className="text-green-600 text-sm mt-1">Check your inbox for a confirmation email.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <div className="relative flex-1">
                            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-primary py-3.5 px-6 rounded-xl text-sm whitespace-nowrap"
                        >
                            Subscribe →
                        </button>
                    </form>
                )}

                <p className="text-xs text-gray-400 font-medium mt-4">
                    No spam, ever. Unsubscribe anytime.
                </p>
            </div>
        </section>
    )
}

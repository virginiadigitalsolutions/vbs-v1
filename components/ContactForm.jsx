'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { showSuccess, showError } from '@/lib/swal'
import { HiOutlineArrowRight, HiChevronDoubleRight } from 'react-icons/hi'

const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    subject: z.string().min(1, 'Please select a subject'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

const SUBJECTS = [
    'General Query',
    'Learning Guidance',
    'Feedback',
    'Partnership / Collaboration',
]

const inputClasses = 'w-full bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-200 font-medium'

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: zodResolver(schema) })

    async function onSubmit(data) {
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error('Failed to submit')
            showSuccess('Message sent! We\'ll get back to you within a reasonable timeframe.')
            reset()
        } catch {
            showError('Something went wrong. Please try again.')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-8">
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                    Send a Message
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Expected response time: within 24 hours
                </p>
                <div className="mt-4 h-1 w-20 bg-linear-to-r from-primary-500 to-accent-500 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('name')}
                        placeholder="e.g. John Doe"
                        className={inputClasses}
                    />
                    {errors.name && <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1.5 before:content-[''] before:block before:w-1 before:h-1 before:bg-red-500 before:rounded-full">{errors.name.message}</p>}
                </div>

                <div className="group">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="you@example.com"
                        className={inputClasses}
                    />
                    {errors.email && <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1.5 before:content-[''] before:block before:w-1 before:h-1 before:bg-red-500 before:rounded-full">{errors.email.message}</p>}
                </div>
            </div>

            <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">
                    Subject Topic <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        {...register('subject')}
                        className={`${inputClasses} appearance-none cursor-pointer pr-12`}
                        defaultValue=""
                    >
                        <option value="" disabled>How can we help?</option>
                        {SUBJECTS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
                {errors.subject && <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1.5 before:content-[''] before:block before:w-1 before:h-1 before:bg-red-500 before:rounded-full">{errors.subject.message}</p>}
            </div>

            <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">
                    Detailed Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    {...register('message')}
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className={`${inputClasses} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1.5 before:content-[''] before:block before:w-1 before:h-1 before:bg-red-500 before:rounded-full">{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn-premium w-full justify-between! px-8!"
            >
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-lg">
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </span>
                <span className="btn-premium-icon">
                    <HiChevronDoubleRight className="transition-transform group-hover:translate-x-1" />
                </span>
            </button>
        </form>
    )
}

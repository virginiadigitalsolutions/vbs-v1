'use client'

import { signIn } from 'next-auth/react'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { showError } from '@/lib/swal'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (result?.error) {
            showError('Invalid email or password')
        } else {
            const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
            // Full page reload is required so the server-side AdminLayout
            // re-runs getServerSession() and renders the sidebar.
            // router.push() would do a client-side nav and skip the server layout.
            window.location.href = callbackUrl
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#F4F6F9] relative overflow-hidden">
            {/* Background elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[20%] left-[30%] h-[400px] w-[400px] rounded-full bg-primary-500/10 blur-[100px] animate-float" />
                <div className="absolute bottom-[20%] right-[20%] h-[300px] w-[300px] rounded-full bg-accent-400/10 blur-[80px] animate-float-slow" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-up">
                {/* Card */}
                <div className="card-modern p-8 bg-white/90 backdrop-blur-xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 mb-4 animate-float">
                            <span className="text-white font-black text-xl">V</span>
                        </div>
                        <h1 className="text-gray-900 font-extrabold text-2xl tracking-tight">VBS Admin</h1>
                        <p className="text-gray-500 font-medium text-sm mt-1">Content Management System</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-gray-700 font-bold text-sm">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@vbs.com"
                                required
                                className="w-full bg-gray-50/50 border-2 border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-gray-700 font-bold text-sm">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full bg-gray-50/50 border-2 border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 mt-4 text-base disabled:opacity-60"
                        >
                            {loading ? 'Authenticating...' : 'Secure Login →'}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <Link href="/" className="text-gray-500 font-bold text-sm hover:text-primary-600 transition-colors flex items-center justify-center gap-2">
                        <span>←</span> Return to public site
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center">Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f3f6fb_45%,#eef2f8_100%)]">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <AdminSidebar user={session.user} />
                <div className="flex min-w-0 flex-1 flex-col">
                    <AdminTopbar user={session.user} />
                    <main className="relative flex-1 overflow-x-hidden">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(72,115,174,0.10),transparent_62%)]" />
                        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-8 pt-6 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

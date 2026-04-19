import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return <>{children}</>
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8FAFC]">
            <AdminSidebar user={session.user} />
            <main className="flex-1 flex flex-col min-w-0 h-[calc(100vh-64px)] lg:h-screen overflow-y-auto relative">
                <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-primary-50/50 to-transparent pointer-events-none -z-10" />
                {children}
            </main>
        </div>
    )
}

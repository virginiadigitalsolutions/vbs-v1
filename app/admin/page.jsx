import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function AdminIndexPage() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/admin/dashboard')
    } else {
        redirect('/admin/login')
    }
}

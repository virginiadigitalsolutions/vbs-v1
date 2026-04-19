import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export async function getAuthSession() {
  return await getServerSession(authOptions)
}

export async function requireSuperAdmin() {
  const session = await getAuthSession()
  
  if (!session) {
    redirect('/admin/login')
  }
  
  if (session.user.role !== 'SUPER_ADMIN') {
    redirect('/admin/dashboard?error=unauthorized')
  }
  
  return session
}

export async function requireEditor() {
  const session = await getAuthSession()
  
  if (!session) {
    redirect('/admin/login')
  }
  
  if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'EDITOR') {
    redirect('/admin/dashboard?error=unauthorized')
  }
  
  return session
}

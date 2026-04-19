import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "i29s5gjAmhw/rK98XbHRyt155diV0cJVwHZiS3BsB6WI="
})

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/sections/:path*',
    '/admin/affiliates/:path*',
    '/admin/learning-hub/:path*',
    '/admin/media/:path*',
    '/admin/users/:path*',
    '/admin/pages/:path*',
    '/admin/settings/:path*',
  ],
}

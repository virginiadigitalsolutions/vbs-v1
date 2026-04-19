import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Check 1: Can we connect to DB?
    const userCount = await prisma.adminUser.count()
    
    // Check 2: Can we find the admin user?
    const admin = await prisma.adminUser.findFirst({
      select: { id: true, email: true, name: true, role: true }
    })

    // Check 3: Environment variables
    const envCheck = {
      DATABASE_URL: process.env.DATABASE_URL ? '✅ SET (' + process.env.DATABASE_URL.substring(0, 20) + '...)' : '❌ NOT SET',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ SET' : '❌ NOT SET (using fallback)',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || '❌ NOT SET',
      VERCEL_URL: process.env.VERCEL_URL || '❌ NOT SET',
      NODE_ENV: process.env.NODE_ENV,
    }

    return Response.json({
      status: 'ok',
      db_connected: true,
      admin_users_count: userCount,
      first_admin: admin,
      env: envCheck,
    })
  } catch (error) {
    return Response.json({
      status: 'error',
      error: error.message,
      errorName: error.constructor.name,
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? '✅ SET (' + process.env.DATABASE_URL.substring(0, 20) + '...)' : '❌ NOT SET',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ SET' : '❌ NOT SET (using fallback)',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || '❌ NOT SET',
        VERCEL_URL: process.env.VERCEL_URL || '❌ NOT SET',
        NODE_ENV: process.env.NODE_ENV,
      }
    }, { status: 500 })
  }
}

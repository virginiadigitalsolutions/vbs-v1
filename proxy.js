import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

// Legacy WordPress URLs (old /blogs/* posts, tags, categories, authors, feeds,
// dated permalinks, wp-content, etc.) and other retired paths. Search Console
// reported these as 404/410 — they now permanently (301) redirect to the home
// page so visitors and any remaining link equity land somewhere useful.
const legacyExactUrls = new Set(['/ruban', '/blogs']);
const legacyPrefixes = [
  '/blogs/',
  '/wp-content/',
  '/wp-admin/',
  '/wp-includes/',
  '/category/',
  '/tag/',
  '/author/',
];

function isLegacyUrl(path) {
  const clean = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  return (
    legacyExactUrls.has(clean) ||
    legacyPrefixes.some((prefix) => path.startsWith(prefix) || `${clean}/` === prefix)
  );
}

const authMiddleware = withAuth({
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "i29s5gjAmhw/rK98XbHRyt155diV0cJVwHZiS3BsB6WI="
});

export default function middleware(req, event) {
  const path = req.nextUrl.pathname;

  // /blog redirects to /learning-hub
  if (path === '/blog' || path === '/blog/') {
    return NextResponse.redirect(new URL('/learning-hub', req.url), 301);
  }

  // Legacy URLs -> home page (301 permanent)
  if (isLegacyUrl(path)) {
    return NextResponse.redirect(new URL('/', req.url), 301);
  }

  // Only run auth middleware for admin routes
  if (path.startsWith('/admin')) {
    return authMiddleware(req, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Legacy URLs (redirected)
    '/blog',
    '/blog/',
    '/ruban',
    '/ruban/',
    '/blogs',
    '/blogs/:path*',
    '/wp-content/:path*',
    '/wp-admin/:path*',
    '/wp-includes/:path*',
    '/category/:path*',
    '/tag/:path*',
    '/author/:path*',

    // Admin URLs
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

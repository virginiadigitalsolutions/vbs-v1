import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

const exactGoneUrls = new Set([
  '/blogs/tag/why-is-seo-important-in-digital-marketing/',
  '/blogs/seo-strategy/',
  '/blogs/what-is-an-seo-audit-why-is-it-important-for-your-website/',
  '/blogs/category/digital-marketing/',
  '/blogs/why-are-social-media-handles-important-for-your-business/',
  '/blogs/importance-of-content-marketing-for-your-digital-marketing-strategy/',
  '/blogs/seo-company-in-chennai/',
  '/blogs/digital-marketing-agency-in-chennai/',
  '/blogs/9-ways-a-digital-marketing-agency-can-help-grow-your-business/',
  '/blogs/seo-tips-in-2024/',
  '/blogs/how-seo-works-for-business/',
  '/blogs/seo-vs-sem/',
  '/blogs/tag/user-experience-and-technical-seo/',
  '/blogs/why-is-content-marketing-crucial-to-business-growth-in-2024/',
  '/blogs/tag/credibility-and-trust/',
  '/blogs/category/social-media/',
  '/blogs/tag/contentmarketing/',
  '/blogs/tag/link-building/',
  '/blogs/tag/monitoring-analytics-the-performance/',
  '/blogs/tag/seo-secrets-for-success-in-2024/feed/',
  '/blogs/author/daniel-joseph/'
]);

const authMiddleware = withAuth({
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "i29s5gjAmhw/rK98XbHRyt155diV0cJVwHZiS3BsB6WI="
});

export default function middleware(req, event) {
  const path = req.nextUrl.pathname;
  
  // /blog redirects to /learning-hub, while blog listing and /blogs pages remain Gone
  if (path === '/blog' || path === '/blog/') {
    return NextResponse.redirect(new URL('/learning-hub', req.url), 301);
  }

  // 410 Gone logic
  const pathWithSlash = path.endsWith('/') ? path : `${path}/`;
  const pathWithoutSlash = path.endsWith('/') ? path.slice(0, -1) : path;
  if (
    exactGoneUrls.has(path) || 
    exactGoneUrls.has(pathWithSlash) || 
    exactGoneUrls.has(pathWithoutSlash) || 
    path.startsWith('/blogs/') || 
    path === '/blogs'
  ) {
    return new NextResponse(null, { status: 410, statusText: 'Gone' });
  }

  // Only run auth middleware for admin routes
  if (path.startsWith('/admin')) {
    return authMiddleware(req, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Gone URLs
    '/blog',
    '/blogs/:path*',
    
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

// Primary domain is non-www: https://virginiabusinesssolutions.in
// Canonicals, sitemap, robots, JSON-LD, llms.txt, RSS and IndexNow all come
// from getBaseUrl() in lib/seo.js (override with NEXT_PUBLIC_SITE_URL).
//
// The www -> non-www redirect is configured ONLY in Vercel (Project > Settings >
// Domains: www.virginiabusinesssolutions.in "Redirect to" virginiabusinesssolutions.in,
// 308). Keeping it in one place makes a redirect loop impossible.

/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  compress: true,
  poweredByHeader: false,
  staticPageGenerationTimeout: 120,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Short cache for API responses — prevents redundant fetches from same client
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

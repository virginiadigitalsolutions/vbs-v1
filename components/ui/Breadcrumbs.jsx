'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiChevronRight, HiHome } from 'react-icons/hi'
import JsonLd from './JsonLd'
import Container from './Container'

const LABEL_MAP = {
    'about': 'About Us',
    'about-us': 'About Us',
    'digital-skills': 'Digital Skills',
    'courses-certifications': 'Courses & Certifications',
    'career-guides': 'Career Guides',
    'career-roadmap': 'Career Roadmap',
    'skill-quiz': 'Skill Quiz',
    'blog': 'Blog',
    'contact': 'Contact',
    'resources': 'Resources',
    'privacy-policy': 'Privacy Policy',
    'terms-and-conditions': 'Terms & Conditions',
}

/**
 * HeroBreadcrumbs — renders auto-generated breadcrumbs
 * at the bottom-left of a hero section.
 * 
 * Must be placed inside a `relative` parent (the hero `<section>`).
 * Props:
 *   hasBgImage — adjusts text color for dark backgrounds
 */
export default function Breadcrumbs({ hasBgImage = false }) {
    const pathname = usePathname()

    if (pathname === '/') return null

    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbItems = [
        { name: 'Home', url: '/' },
        ...segments.map((seg, i) => ({
            name: LABEL_MAP[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            url: i === segments.length - 1 ? null : '/' + segments.slice(0, i + 1).join('/'),
        })),
    ]

    return (
        <>
            <JsonLd type="BreadcrumbList" data={{ items: breadcrumbItems }} />
            <div className="absolute bottom-0 w-full left-0 z-20 pointer-events-none pb-5 lg:pb-8">
                <Container>
                    <nav aria-label="Breadcrumb" className="pointer-events-auto">
                        <ol className="flex items-center gap-1.5 text-sm font-medium flex-wrap">
                            {breadcrumbItems.map((item, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                    {i > 0 && (
                                        <HiChevronRight className={`text-xs shrink-0 ${hasBgImage ? 'text-gray-500' : 'text-gray-300 dark:text-gray-600'}`} />
                                    )}
                                    {item.url ? (
                                        <Link
                                            href={item.url}
                                            className={`transition-colors hover:text-primary-500 flex items-center gap-1 ${hasBgImage ? 'text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}
                                        >
                                            {i === 0 && <HiHome className="text-sm" />}
                                            <span>{item.name}</span>
                                        </Link>
                                    ) : (
                                        <span className={`font-semibold truncate max-w-[200px] ${hasBgImage ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                            {item.name}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </Container>
            </div>
        </>
    )
}

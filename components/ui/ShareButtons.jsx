'use client'

import { useState, useEffect } from 'react'
import { HiOutlineShare } from 'react-icons/hi'
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function ShareButtons({ title, url }) {
    const [copied, setCopied] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    /* eslint-disable */
    useEffect(() => {
        setIsMounted(true)
    }, [])
    /* eslint-enable */

    const fullUrl = isMounted ? `${window.location.origin}${url}` : url
    const encodedTitle = encodeURIComponent(title)
    const encodedUrl = encodeURIComponent(fullUrl)

    const shareLinks = [
        {
            name: 'X',
            icon: FaXTwitter,
            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: 'hover:bg-gray-900 hover:text-white',
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedinIn,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:bg-[#0077B5] hover:text-white',
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            color: 'hover:bg-[#25D366] hover:text-white',
        },
    ]

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Fallback
            const input = document.createElement('input')
            input.value = fullUrl
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold text-gray-500 flex items-center gap-1.5">
                <HiOutlineShare className="text-base" />
                Share
            </span>
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Share on ${link.name}`}
                    className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 transition-all duration-300 ${link.color} hover:scale-110 hover:shadow-lg`}
                >
                    <link.icon className="text-base" />
                </a>
            ))}
            <button
                onClick={copyLink}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${copied
                    ? 'bg-green-100 text-green-700 scale-105'
                    : 'bg-gray-100 text-gray-500 hover:bg-primary-50 hover:text-primary-600 hover:scale-105'
                    }`}
            >
                {copied ? '✓ Copied!' : '🔗 Copy Link'}
            </button>
        </div>
    )
}

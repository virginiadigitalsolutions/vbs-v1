import clsx from 'clsx'

const tags = { h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4' }

const sizes = {
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight',
    h2: 'text-3xl sm:text-4xl font-bold leading-snug',
    h3: 'text-2xl font-semibold leading-snug',
    h4: 'text-xl font-semibold',
}

export default function Heading({ as = 'h2', children, className = '' }) {
    const Tag = tags[as] || 'h2'
    return (
        <Tag className={clsx('text-gray-900', sizes[as] || sizes['h2'], className)}>
            {children}
        </Tag>
    )
}

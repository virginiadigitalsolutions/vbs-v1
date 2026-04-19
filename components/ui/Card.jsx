import clsx from 'clsx'

export default function Card({ children, className = '', hover = false }) {
    return (
        <div
            className={clsx(
                'bg-white rounded-2xl border border-gray-100 shadow-sm p-6',
                hover && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
                className,
            )}
        >
            {children}
        </div>
    )
}

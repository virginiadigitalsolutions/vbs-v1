import clsx from 'clsx'

export default function Section({ children, className = '', id }) {
    return (
        <section
            id={id}
            className={clsx('py-16 md:py-24', className)}
        >
            {children}
        </section>
    )
}

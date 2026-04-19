import { prisma, queryWithRetry } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function BlogPostRedirectPage({ params }) {
    const { slug } = await params
    
    const post = await queryWithRetry(() => 
        prisma.post.findUnique({
            where: { slug },
            include: { category: true }
        })
    )

    if (!post) {
        redirect('/learning-hub')
    }

    const categorySlug = post.category?.slug || 'posts'
    redirect(`/learning-hub/${categorySlug}/${post.slug}`)
}

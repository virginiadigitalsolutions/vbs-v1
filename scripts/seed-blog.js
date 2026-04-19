const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding Blog page...')

    const blogData = {
        title: 'VBS Engineering Blog',
        slug: 'blog',
        metaDesc: 'Insights, tutorials, and architectural deep-dives from the VBS engineering team.',
        sections: [
            {
                type: 'hero',
                order: 0,
                data: {
                    layout: 'blog_hero',
                    tag: 'Engineering Blog',
                    heading: 'Build |Louder.',
                    subheading: 'Deeply technical perspectives on modern web architecture, cloud scaling, and digital design.',
                }
            }
        ]
    }

    let page = await prisma.page.findUnique({
        where: { slug: 'blog' }
    })

    if (!page) {
        console.log('Creating new Blog page...')
        await prisma.page.create({
            data: {
                title: blogData.title,
                slug: blogData.slug,
                metaDesc: blogData.metaDesc,
                sections: {
                    create: blogData.sections
                }
            }
        })
    } else {
        console.log('Blog page exists. Updating...')
        await prisma.page.update({
            where: { id: page.id },
            data: {
                title: blogData.title,
                metaDesc: blogData.metaDesc
            }
        })
        await prisma.section.deleteMany({
            where: { pageId: page.id }
        })
        for (const sec of blogData.sections) {
            await prisma.section.create({
                data: { ...sec, pageId: page.id }
            })
        }
    }
    console.log('Blog page seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e.message || e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

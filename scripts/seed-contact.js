const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding Contact page...')

    const contactData = {
        title: 'Contact | Digital Career Guidance Platform in India',
        slug: 'contact',
        metaDesc: 'Get in touch for general queries, feedback, or partnership inquiries related to digital career guidance, skills, and structured learning pathways.',
        sections: [
            {
                type: 'hero',
                order: 0,
                data: {
                    layout: 'contact_hero',
                    tag: 'Contact',
                    heading: 'Get in Touch',
                    subheading: 'For questions, feedback, or collaboration inquiries related to digital skills and career guidance.'
                }
            },
            {
                type: 'text',
                order: 1,
                data: {
                    layout: 'contact_form',
                    heading: 'Contact Us',
                    body: '<p>If you have questions about digital skills, learning pathways, or career direction, feel free to reach out. We also welcome feedback and relevant collaboration inquiries that align with our mission of structured digital career guidance.</p><p>We aim to respond thoughtfully and within a reasonable timeframe.</p>',
                    email: 'contact@virginiabusinesssolutions.in'
                }
            }
        ]
    }

    let page = await prisma.page.findUnique({
        where: { slug: contactData.slug }
    })

    if (!page) {
        console.log('Creating new Contact page...')
        page = await prisma.page.create({
            data: {
                title: contactData.title,
                slug: contactData.slug,
                metaDesc: contactData.metaDesc,
                sections: {
                    create: contactData.sections
                }
            }
        })
        console.log(`Created Contact page with ${contactData.sections.length} sections!`)
    } else {
        console.log('Contact page exists. Updating title/meta and replacing sections...')
        await prisma.page.update({
            where: { id: page.id },
            data: {
                title: contactData.title,
                metaDesc: contactData.metaDesc
            }
        })
        await prisma.section.deleteMany({
            where: { pageId: page.id }
        })
        for (const sec of contactData.sections) {
            await prisma.section.create({
                data: {
                    ...sec,
                    pageId: page.id
                }
            })
        }
        console.log(`Replaced ${contactData.sections.length} sections for Contact page!`)
    }

    console.log('Contact page seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e.message || e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

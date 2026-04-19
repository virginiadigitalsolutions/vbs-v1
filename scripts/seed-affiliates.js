const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const links = [
        {
            title: 'AWS Cloud Practitioner - Coursera',
            url: 'https://www.coursera.org/professional-certificates/aws-cloud-practitioner?ref=vbs',
            platform: 'Coursera',
            category: 'Certification',
            description: 'Official AWS certification prep. Ideal for beginners entering cloud computing.',
            commission: '15% per enrollment',
            isActive: true,
            isFeatured: true,
        },
        {
            title: 'Google Data Analytics Professional Certificate',
            url: 'https://www.coursera.org/professional-certificates/google-data-analytics?ref=vbs',
            platform: 'Google',
            category: 'Course',
            description: 'Google-designed program covering spreadsheets, SQL, Tableau, and R. No experience required.',
            commission: '15% per enrollment',
            isActive: true,
            isFeatured: true,
        },
        {
            title: 'The Complete Web Developer Bootcamp - Udemy',
            url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/?ref=vbs',
            platform: 'Udemy',
            category: 'Course',
            description: 'Full-stack web development from HTML to React to Node.js. Bestseller with 200k+ students.',
            commission: '$10 per sale',
            isActive: true,
            isFeatured: false,
        },
        {
            title: 'Figma Professional - UI/UX Design Masterclass',
            url: 'https://www.udemy.com/course/figma-ux-ui-design-masterclass/?ref=vbs',
            platform: 'Udemy',
            category: 'Tool',
            description: 'Master Figma from scratch - prototyping, design systems, and handoff workflows.',
            commission: '$8 per sale',
            isActive: true,
            isFeatured: false,
        },
        {
            title: 'LinkedIn Learning - Business Premium',
            url: 'https://www.linkedin.com/learning/subscription/products?ref=vbs',
            platform: 'LinkedIn Learning',
            category: 'Software',
            description: 'Access 16,000+ courses on business, tech, and creative skills. Free 1-month trial.',
            commission: '20% recurring',
            isActive: true,
            isFeatured: true,
        },
    ]

    for (const link of links) {
        const existing = await prisma.affiliateLink.findFirst({ where: { title: link.title } })
        if (!existing) {
            await prisma.affiliateLink.create({ data: link })
            console.log(`✅ Created: ${link.title}`)
        } else {
            console.log(`⏭️  Exists: ${link.title}`)
        }
    }

    console.log('\n✅ Affiliate links seeded!')
}

main().catch(console.error).finally(() => prisma.$disconnect())

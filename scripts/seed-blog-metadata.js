const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('--- Seeding Blog Category & Author ---')

    const author = await prisma.adminUser.upsert({
        where: { email: 'author@vbs.com' },
        update: {},
        create: {
            name: 'Demo Author',
            email: 'author@vbs.com',
            passwordHash: 'demopass', // no hash for demo
            role: 'EDITOR'
        }
    })
    console.log('Upserted Author:', author.name)

    const cat = await prisma.category.upsert({
        where: { slug: 'technology' },
        update: {},
        create: {
            name: 'Technology',
            slug: 'technology'
        }
    })
    console.log('Upserted Category:', cat.name)

    console.log('--- Done ---')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

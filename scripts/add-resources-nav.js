const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const settings = await prisma.siteSettings.findFirst()
    if (!settings) {
        console.log('No settings found. Skipping.')
        return
    }

    const links = settings.navLinks || []
    const exists = links.find(l => l.url === '/resources')

    if (!exists) {
        links.push({ label: 'Resources', url: '/resources' })
        await prisma.siteSettings.update({
            where: { id: settings.id },
            data: { navLinks: links }
        })
        console.log('✅ Added "Resources" to navbar links!')
    } else {
        console.log('⏭️  "Resources" already in navbar.')
    }
}

main().catch(console.error).finally(() => prisma.$disconnect())

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function patchSettingsAndPages() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    if (settings && settings.navLinks) {
      const updatedLinks = settings.navLinks.map(link => {
        if (link.url === '/about') {
          return { ...link, url: '/about-us' }
        }
        return link
      })
      await prisma.siteSettings.update({
        where: { id: settings.id },
        data: { navLinks: updatedLinks }
      })
      console.log('Patched Settings navLinks.')
    }

    const pages = await prisma.page.findMany({ include: { sections: true }})
    for (const page of pages) {
      for (const section of page.sections) {
        let changed = false
        const data = { ...section.data }
        
        if (data.ctaHref === '/about') { data.ctaHref = '/about-us'; changed = true }
        if (data.secondaryCtaHref === '/about') { data.secondaryCtaHref = '/about-us'; changed = true }
        
        if (changed) {
          await prisma.section.update({
            where: { id: section.id },
            data: { data }
          })
          console.log(`Patched section ${section.id} in page ${page.slug}`)
        }
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

patchSettingsAndPages()

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

require('dotenv').config()

const prisma = new PrismaClient()

async function main() {
  // ─── Admin User ───────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12)
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@vbs.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@vbs.com',
      name: 'Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ AdminUser seeded')

  // ─── Home Page ────────────────────────────────────────────────────────────
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Home',
      metaDesc:
        'VBS - helping students, early-career professionals and working adults build job-ready digital skills for the 2026 economy.',
    },
  })
  console.log('✅ Page (home) seeded')

  // ─── Check if sections already exist ──────────────────────────────────────
  const existingCount = await prisma.section.count({ where: { pageId: homePage.id } })
  if (existingCount > 0) {
    console.log('ℹ️  Sections already exist, skipping seed')
    return
  }

  // ─── Sections ─────────────────────────────────────────────────────────────
  const sections = [
    {
      type: 'hero',
      order: 1,
      isActive: true,
      data: {
        layout: 'home_hero',
        tag: "Virginia Business Solutions",
        heading: "Make Smarter Decisions About|Digital Skills, Courses, and Careers",
        subheading: "Clear guidance for students and working professionals in India - without hype or shortcuts",
        ctaText: "Explore Digital Skills",
        ctaHref: "/digital-skills",
        secondaryCtaText: "Learn About Us",
        secondaryCtaHref: "/about-us"
      },
    },
    {
      type: 'cards',
      order: 2,
      isActive: true,
      data: {
        layout: 'home_audience',
        heading: "Who We Help",
        cards: [
            { title: "Students", icon: "HiOutlineAcademicCap", description: "You are exploring digital careers and want to understand where to begin. Countless skills compete for your attention." },
            { title: "Early Career Professionals", icon: "HiOutlineBriefcase", description: "You have entered the workforce and want to strengthen your direction. Certifications promise growth, but not all paths move you forward." },
            { title: "Working Professionals", icon: "HiOutlineUserGroup", description: "You are considering upskilling or transitioning into a digital role. The landscape is evolving quickly." }
        ]
      },
    },
    {
      type: 'cards',
      order: 3,
      isActive: true,
      data: {
        layout: 'home_framework',
        tag: "Our Approach",
        heading: "A Clear Framework for Smarter Career Decisions",
        subheading: "Instead of chasing trends or reacting to noise, a structured approach helps you understand what to learn.",
        cards: [
            { title: "Digital Skills", icon: "HiOutlineLightningBolt", description: "Understand which digital skills are foundational and which are temporary trends.", href: "/digital-skills" },
            { title: "Courses & Certifications", icon: "HiOutlineBookOpen", description: "Evaluate learning paths with clarity. Compare free and paid options.", href: "/courses-certifications" },
            { title: "Career Guides", icon: "HiOutlineTrendingUp", description: "See how skills and courses translate into career pathways.", href: "/career-guides" }
        ]
      },
    },
    {
      type: 'cards',
      order: 4,
      isActive: true,
      data: {
          layout: 'generic_feature_grid',
          tag: 'Core Principles',
          heading: "Why VBS is Different",
          subheading: "We filter the noise so you don't have to.",
          cards: [
              { title: "Objective Advice", description: "No hype, no false promises. Just clear, industry-aligned guidance on what works.", icon: "HiOutlineScale" },
              { title: "Curated Pathways", description: "We synthesize hundreds of options into structured learning tracks.", icon: "HiOutlineMap" },
              { title: "Current Insights", description: "Our views are shaped by active industry practitioners, not static syllabi.", icon: "HiOutlineLightBulb" },
              { title: "Long-term Value", description: "We focus on foundational skills that endure across technology cycles.", icon: "HiOutlineTrendingUp" },
              { title: "Practical Focus", description: "Theory matters, but we index heavily on application and portfolio building.", icon: "HiOutlineBriefcase" },
              { title: "Community Driven", description: "Learn alongside ambitious peers navigating the exact same transitions.", icon: "HiOutlineUserGroup" }
          ]
      }
    },
    {
      type: 'cta',
      order: 5,
      isActive: true,
      data: {
        layout: 'generic_contact_cta',
        tag: "Get In Touch",
        heading: "Ready to Discuss Your Next Step?",
        body: "Whether you are a student exploring options or a professional planning a pivot, we can provide clarity.",
        ctaText: "Reach out to us",
        ctaHref: "/contact",
        secondaryCtaText: "Browse Insights",
        secondaryCtaHref: "/learning-hub"
      },
    },
  ]

  for (const section of sections) {
    await prisma.section.create({
      data: { pageId: homePage.id, ...section },
    })
  }
  console.log('✅ Homepage sections seeded (6)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

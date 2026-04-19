const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * Seeds Page records + default sections for all public pages.
 * Safe to run multiple times - uses upsert for pages.
 */
async function main() {
  const pages = [
    {
      slug: 'about',
      title: 'About Us | Virginia Business Solutions',
      metaDesc: 'Learn about our mission, values, and the team behind Virginia Business Solutions.',
      sections: [
        {
          type: 'hero',
          order: 1,
          isActive: true,
          data: {
            layout: 'generic_hero_split',
            tag: "Our Vision",
            heading: "Build the Future.",
            subheading: "We are a passionate team crafting premium digital experiences, resilient cloud infrastructures, and intelligent data systems that empower modern enterprises.",
            ctaText: "Our Services",
            ctaHref: "/digital-skills",
            secondaryCtaText: "Contact Us",
            secondaryCtaHref: "/contact"
          }
        },
        {
          type: 'cards',
          order: 2,
          isActive: true,
          data: {
            layout: 'generic_feature_grid',
            tag: "Principles",
            heading: "Core Values",
            subheading: "The principles that guide every line of code we write.",
            cards: [
              { title: "Speed & Precision", description: "We optimize for milliseconds, ensuring your users never wait and operations remain perfectly efficient and scalable.", icon: "HiOutlineLightningBolt" },
              { title: "Unbreakable Security", description: "Security isn't an afterthought. It's woven into our architecture from the foundational layer upwards.", icon: "HiOutlineShieldCheck" },
              { title: "Continuous Evolution", description: "We constantly adapt to emerging tech, guaranteeing our stack remains modern and your competitive edge sharp.", icon: "HiOutlineSparkles" }
            ]
          }
        }
      ]
    },
    {
      slug: 'contact',
      title: 'Contact Us | Virginia Business Solutions',
      metaDesc: 'Get in touch with our team. We respond within 2 hours.',
      sections: [
        {
          type: 'cta',
          order: 1,
          isActive: true,
          data: {
            layout: 'generic_contact_cta',
            tag: "Get In Touch",
            heading: "Let's build something iconic.",
            body: "Whether you need a massive digital transformation or a surgical precision API, our architects are ready to map it out. Our technical leads usually reply within 2 hours.",
            ctaText: "Send a Message",
            ctaHref: "mailto:contact@vbs-digital.com"
          }
        }
      ]
    },
    {
      slug: 'career-guides',
      title: 'Career Guides | Virginia Business Solutions',
      metaDesc: 'Deep-dive articles, architectural breakdowns, and strategic blueprints from our senior engineering team.',
      sections: [
        {
          type: 'hero',
          order: 1,
          isActive: true,
          data: {
            layout: 'generic_hero_split',
            tag: "Knowledge Base",
            heading: "Master Your Craft.",
            subheading: "Deep-dive articles, architectural breakdowns, and strategic blueprints from our senior engineering team.",
            ctaText: "Browse Guides",
            ctaHref: "#guides"
          }
        },
        {
          type: 'text',
          order: 2,
          isActive: true,
          data: {
            layout: 'generic_faq_accordion',
            tag: "Latest Insights",
            heading: "Strategic Guidelines",
            subheading: "Concepts that define modern web architectures.",
            items: [
              { question: "The 2026 Developer Roadmap", answer: "A comprehensive guide to the tools and frameworks that matter today." },
              { question: "Why Vercel Edge is Winning", answer: "Understanding the shift to edge computing and what it means for latency, cost, and developer experience." },
              { question: "Design Systems in Figma", answer: "Building scalable design systems that bridge the gap between design and frontend engineering seamlessly." },
              { question: "Scaling Prisma to 10M Rows", answer: "Production-tested patterns for high-volume database operations, connection pooling, and indexing." }
            ]
          }
        }
      ]
    },
    {
      slug: 'courses-certifications',
      title: 'Courses & Certifications | Virginia Business Solutions',
      metaDesc: 'Industry-aligned curriculum designed by leading experts. Master the exact technologies driving digital transformations.',
      sections: [
        {
          type: 'hero',
          order: 1,
          isActive: true,
          data: {
            layout: 'generic_hero_split',
            tag: "Upskill",
            heading: "Accelerate Your Career Trajectory.",
            subheading: "Industry-aligned curriculum designed by leading experts. Master the exact technologies driving today's largest digital transformations.",
            ctaText: "View Programs",
            ctaHref: "#courses"
          }
        },
        {
          type: 'cards',
          order: 2,
          isActive: true,
          data: {
            layout: 'generic_cards_grid',
            tag: "Programs",
            heading: "Premium Offerings",
            subheading: "Select the program that matches your career trajectory.",
            cards: [
              { title: "AI Mastery Program", description: "6 Months • Advanced - Deep learning, NLP, and production ML systems.", icon: "HiOutlineLightBulb" },
              { title: "Data Science Pro Track", description: "4 Months • Intermediate - Statistical analysis, Python, and data visualization.", icon: "HiOutlineChartSquareBar" },
              { title: "Cloud DevOps FastTrack", description: "3 Months • Intermediate - AWS, CI/CD pipelines, and container orchestration.", icon: "HiOutlineCloud" },
              { title: "Full-Stack Bootcam", description: "5 Months • Beginner - React, Node.js, and database design from scratch.", icon: "HiOutlineCode" }
            ]
          }
        }
      ]
    },
    {
      slug: 'digital-skills',
      title: 'Digital Skills | Virginia Business Solutions',
      metaDesc: 'Augment your team with specialized engineers who live and breathe modern web architectures.',
      sections: [
        {
          type: 'hero',
          order: 1,
          isActive: true,
          data: {
            layout: 'generic_hero_split',
            tag: "Services",
            heading: "Hire the 1%.",
            subheading: "Augment your team with specialized engineers who live and breathe modern web architectures.",
            ctaText: "Explore Skills",
            ctaHref: "#skills"
          }
        },
        {
          type: 'cards',
          order: 2,
          isActive: true,
          data: {
            layout: 'generic_feature_grid',
            tag: "Capabilities",
            heading: "In-Demand Skills",
            subheading: "High-performance expertise for modern teams.",
            cards: [
              { title: "React Performance Tuning", description: "Optimizing render cycles and memoization for blazing-fast UIs.", icon: "HiOutlineLightningBolt" },
              { title: "Serverless Architectures", description: "AWS Lambda, Vercel Edge, and Cloudflare Workers for scalable backends.", icon: "HiOutlineCloud" },
              { title: "GraphQL Federation", description: "Scaling APIs across microservices seamlessly with unified schemas.", icon: "HiOutlineShare" },
              { title: "WebGL / Three.js", description: "High-performance 3D rendering in the browser for immersive experiences.", icon: "HiOutlineCube" }
            ]
          }
        }
      ]
    }
  ]

  for (const pageData of pages) {
    const { slug, title, metaDesc, sections } = pageData

    // Upsert the page
    const page = await prisma.page.upsert({
      where: { slug },
      update: { title, metaDesc },
      create: { slug, title, metaDesc, isPublished: true }
    })

    // Only seed sections if the page has zero sections (don't overwrite existing)
    const existingCount = await prisma.section.count({ where: { pageId: page.id } })
    if (existingCount === 0) {
      for (const section of sections) {
        await prisma.section.create({
          data: { pageId: page.id, ...section }
        })
      }
      console.log(`✅ Seeded "${slug}" with ${sections.length} sections`)
    } else {
      console.log(`⏭️  "${slug}" already has ${existingCount} sections - skipping seed`)
    }
  }

  console.log('\n✅ All pages seeded successfully!')
}

main().catch(console.error).finally(() => prisma.$disconnect())

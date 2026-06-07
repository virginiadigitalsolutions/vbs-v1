require('dotenv/config')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const homeFaqItems = [
  {
    question: 'What is a digital career?',
    answer: 'A digital career involves using technology, online platforms, content, data, marketing, AI, or digital tools to create value and solve problems. Examples include content writing, SEO, digital marketing, video creation, analytics, and creator-focused careers.'
  },
  {
    question: 'How do I choose the right digital career path?',
    answer: 'The right career depends on your interests, strengths, values, communication skills, learning style, and long-term goals. Before choosing a career path, it is important to understand what motivates you, what you enjoy doing, and where your natural abilities lie. A personal SWOT analysis, self-assessment, and structured career guidance can help you identify digital career options that align with your strengths and aspirations.'
  },
  {
    question: 'Can I start a digital career without experience?',
    answer: 'Yes. Many digital careers allow beginners to build practical skills through guided learning, projects, certifications, internships, freelancing, and portfolio development before applying for jobs.'
  },
  {
    question: 'Which digital skills are most in demand today?',
    answer: 'Skills such as content writing, SEO, AI-assisted content creation, social media marketing, video creation, analytics, digital marketing, and creator-focused skills continue to be in demand across industries. As businesses increasingly adopt digital and AI-driven technologies, professionals with a combination of technical, creative, and strategic skills are likely to have stronger career opportunities.'
  },
  {
    question: 'Is content writing still a good career in the age of AI?',
    answer: 'Yes. AI can assist with content creation, but businesses still need professionals who can research, strategize, edit, optimize, and create content that connects with audiences and supports business goals.'
  },
  {
    question: 'Is SEO a good career choice in India?',
    answer: 'Yes. SEO remains a valuable career path because businesses continue to depend on search visibility to attract customers and grow online. Professionals who understand search intent, content strategy, technical SEO, analytics, and AI-driven search trends continue to be in demand across industries.'
  },
  {
    question: 'Can BA English students build successful digital careers?',
    answer: 'Yes. Many BA English graduates transition into content writing, SEO, content strategy, digital marketing, social media management, corporate communication, and creator-focused careers. Strong communication, research, and analytical skills often provide a solid foundation for these digital career paths.'
  },
  {
    question: 'Will AI replace digital careers?',
    answer: 'AI is changing how digital work is performed, but it is not eliminating the need for human creativity, critical thinking, communication, strategy, and decision-making. Professionals who learn to work alongside AI are likely to have stronger career opportunities.'
  },
  {
    question: 'Why do many people struggle to choose the right digital career?',
    answer: 'Many students and professionals choose courses based on trends, social media hype, peer pressure, or salary expectations without fully understanding their strengths, interests, and career goals. This often leads to confusion, frustration, and wasted time. Career guidance helps individuals make informed decisions, identify suitable opportunities, and build a clearer path toward long-term growth and success.'
  },
  {
    question: 'Do I need a degree to build a successful digital career?',
    answer: 'A degree can be helpful, but it is not always the deciding factor in digital careers. Employers and clients often value practical skills, portfolios, projects, certifications, communication abilities, and problem-solving skills. With the right guidance, learning path, and consistent effort, many individuals build successful digital careers regardless of their academic background.'
  }
]

async function main() {
  const homePage = await prisma.page.findUnique({ where: { slug: 'home' } })
  
  if (!homePage) {
    console.log('Home page not found')
    return
  }

  // Update Home Page Meta
  await prisma.page.update({
    where: { slug: 'home' },
    data: {
      title: 'Digital Career Guidance in India | Virginia Business Solutions',
      metaDesc: 'Clear digital career guidance in India for students and working professionals. Explore digital skills, courses, and career paths without hype or shortcuts.',
    }
  })

  // Delete existing sections
  await prisma.section.deleteMany({ where: { pageId: homePage.id } })

  const sections = [
    {
      type: 'hero',
      order: 1,
      isActive: true,
      data: {
        layout: 'home_hero',
        tag: 'Make smarter decisions about digital skills, courses, and careers',
        heading: 'Make Smarter Decisions About Digital Skills, Courses, and Careers',
        subheading: 'Clear guidance for students and working professionals in India, without hype or shortcuts',
        ctaText: 'Explore Digital Skills →',
        ctaHref: '/digital-skills'
      }
    },
    {
      type: 'cards',
      order: 2,
      isActive: true,
      data: {
        layout: 'home_audience',
        heading: 'Who is this for?',
        cards: [
          {
            title: 'Students',
            icon: 'HiOutlineAcademicCap',
            lines: [
              "You\u2019re exploring digital careers and want to understand where to begin.",
              "There are countless skills, tools, and courses competing for your attention.",
              "Before choosing your first step, you want clarity on what truly matters."
            ]
          },
          {
            title: 'Early Career Professionals',
            icon: 'HiOutlineBriefcase',
            lines: [
              "You\u2019ve entered the workforce and want to strengthen your direction.",
              "Certifications and skill upgrades promise growth, but not all paths move you forward.",
              "Before investing your time and effort, you want clarity on what adds real value."
            ]
          },
          {
            title: 'Working Professionals',
            icon: 'HiOutlineUserGroup',
            lines: [
              "You\u2019re considering upskilling or transitioning into a digital role.",
              "The landscape is evolving quickly, and staying relevant requires thoughtful choices.",
              "Before committing your time and money, you want clarity about your next move."
            ]
          }
        ]
      }
    },
    {
      type: 'text',
      order: 3,
      isActive: true,
      data: {
        layout: 'home_challenge',
        tag: 'The Challenge',
        heading: 'Why Choosing Digital Skills Today Feels Confusing',
        body: '<p>The digital space has expanded rapidly over the last few years. New tools, certifications, and roles appear almost every month, each claiming to offer better opportunities and faster growth.</p><p>Social media platforms amplify success stories, while course providers promise quick results.</p><p>At the same time, automation and AI are reshaping how work is done, making it harder to understand which skills will remain valuable long term.</p><p>For students and professionals alike, the challenge is not a lack of options, it\u2019s an excess of them.</p><p>Without a clear structure, it becomes difficult to separate foundational skills from temporary trends.</p>',
      }
    },
    {
      type: 'cards',
      order: 4,
      isActive: true,
      data: {
        layout: 'home_framework',
        tag: 'Our Approach',
        heading: 'A Clear Framework for Smarter Career Decisions',
        subheading: 'Making informed decisions becomes easier when you follow a clear structure. Instead of chasing trends or reacting to noise, a structured approach helps you understand what to learn, where to learn it, and how it connects to real career outcomes.',
        cards: [
          {
            title: 'Digital Skills',
            icon: 'HiOutlineLightningBolt',
            description: 'Understand which digital skills are foundational and which are temporary trends. Explore how different skills connect to real-world roles and where AI is reshaping expectations.',
            href: '/digital-skills'
          },
          {
            title: 'Courses & Certifications',
            icon: 'HiOutlineBookOpen',
            description: 'Evaluate learning paths with clarity. Compare free and paid options, structured programs, and certifications to choose what aligns with your stage and goals.',
            href: '/courses-certifications'
          },
          {
            title: 'Career Guides',
            icon: 'HiOutlineTrendingUp',
            description: 'See how skills and courses translate into career pathways. Understand role expectations, growth trajectories, and how to stay relevant in a changing landscape.',
            href: '/career-guides'
          }
        ]
      }
    },
    {
      type: 'cards',
      order: 5,
      isActive: true,
      data: {
        layout: 'home_standards',
        tag: 'Our Standards',
        heading: 'How Recommendations Are Evaluated',
        cards: [
          {
            title: 'Practical Relevance',
            icon: 'HiOutlineCheckCircle',
            description: 'Does this skill or course reflect how work is actually done today?'
          },
          {
            title: 'Learning Depth',
            icon: 'HiOutlineEye',
            description: 'Does it build real understanding, not just surface familiarity?'
          },
          {
            title: 'Curriculum Clarity',
            icon: 'HiOutlineTemplate',
            description: 'Is the structure transparent, structured, and outcome-oriented?'
          },
          {
            title: 'Long-Term Value',
            icon: 'HiOutlineClock',
            description: 'Will this knowledge remain useful beyond short-term trends?'
          },
          {
            title: 'Stage Alignment',
            icon: 'HiOutlineScale',
            description: 'Is it suitable for beginners, early professionals, or experienced learners?'
          },
          {
            title: 'Balanced Options',
            icon: 'HiOutlineShieldCheck',
            description: 'Are free and paid paths both considered based on value, not marketing?'
          }
        ]
      }
    },
    {
      type: 'text',
      order: 6,
      isActive: true,
      data: {
        layout: 'home_faq',
        heading: 'Frequently Asked Questions',
        items: homeFaqItems
      }
    }
  ]
  
  for (const section of sections) {
    await prisma.section.create({
      data: { pageId: homePage.id, ...section }
    })
  }

  console.log('VBS Homepage content seeded (6 sections)')

  // Update Site Settings (navLinks + footerText)
  const defaultSettings = {
    siteName: 'Virginia Business Solutions',
    logoUrl: '',
    contactEmail: 'contact@vbs-digital.com',
    contactPhone: '+91 98765 43210',
    footerText: 'Providing structured digital career guidance for students and professionals in India. We help you choose the right skills, learning paths, and career direction with clarity and long-term focus. Our content is designed to support informed decisions at every stage of learning and career growth.',
    seoDefaultTitle: 'Virginia Business Solutions | Digital Guidance',
    seoDefaultDesc: 'Clear digital career guidance in India without hype or shortcuts.',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/vbs',
      twitter: 'https://twitter.com/vbs',
    },
    navLinks: [
      { label: 'HOME', url: '/' },
      { label: 'Digital Skills', url: '/digital-skills' },
      { label: 'Courses & Certifications', url: '/courses-certifications' },
      { label: 'Career Guides', url: '/career-guides' },
      { label: 'About', url: '/about-us' },
    ]
  }

  const existingSettings = await prisma.siteSettings.findFirst()
  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: defaultSettings
    })
    console.log('✅ Global SiteSettings updated')
  } else {
    await prisma.siteSettings.create({
      data: defaultSettings
    })
    console.log('✅ Global SiteSettings seeded')
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())

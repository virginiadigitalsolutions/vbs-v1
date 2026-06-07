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
  const page = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: true }
  })

  if (!page) {
    throw new Error('Home page not found')
  }

  const existingFaq = page.sections.find(
    (section) => section.data?.layout === 'home_faq' || section.data?.layout === 'generic_faq'
  )

  const lastOrder = page.sections.reduce((max, section) => Math.max(max, section.order), 0)
  const data = {
    layout: 'home_faq',
    heading: 'Frequently Asked Questions',
    items: homeFaqItems
  }

  if (existingFaq) {
    await prisma.section.update({
      where: { id: existingFaq.id },
      data: { type: 'text', isActive: true, data }
    })
    console.log(`Updated home FAQ section ${existingFaq.id}`)
    return
  }

  const created = await prisma.section.create({
    data: {
      pageId: page.id,
      type: 'text',
      order: lastOrder + 1,
      isActive: true,
      data
    }
  })

  console.log(`Created home FAQ section ${created.id}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())

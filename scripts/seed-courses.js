const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  let page = await prisma.page.findUnique({ where: { slug: 'courses-certifications' } })

  if (!page) {
    page = await prisma.page.create({
      data: {
        slug: 'courses-certifications',
        title: 'Digital Courses & Certifications in India | Structured Learning Paths',
        metaDesc: 'Explore structured digital courses and certifications in India. Learn through beginner, intermediate, and advanced paths with clear guidance on free and paid options.',
      }
    })
    console.log('✅ Created courses-certifications page')
  } else {
    await prisma.page.update({
      where: { slug: 'courses-certifications' },
      data: {
        title: 'Digital Courses & Certifications in India | Structured Learning Paths',
        metaDesc: 'Explore structured digital courses and certifications in India. Learn through beginner, intermediate, and advanced paths with clear guidance on free and paid options.',
      }
    })
    console.log('✅ Updated courses-certifications page meta')
  }

  // Delete existing sections
  await prisma.section.deleteMany({ where: { pageId: page.id } })

  const sections = [
    // ── 1. Hero ──────────────────────────────────────────────────────────
    {
      type: 'hero',
      order: 1,
      isActive: true,
      data: {
        layout: 'courses_hero',
        tag: 'Virginia Business Solutions',
        heading: 'Structured Learning Paths|for Real Skill Development',
        subheading: 'Move from foundational knowledge to applied competence with clear, stage-based learning paths.',
        ctaText: 'View Learning Stages \u2193',
        ctaHref: '#learning-progression',
        secondaryCtaText: 'Explore Career Guides',
        secondaryCtaHref: '/career-guides',
      }
    },

    // ── 2. Intro ─────────────────────────────────────────────────────────
    {
      type: 'text',
      order: 2,
      isActive: true,
      data: {
        layout: 'courses_intro',
        heading: 'Choosing the Right Courses and Certifications for Long-Term Growth',
        body: '<p>Once you\u2019ve identified the digital skill you want to develop, the next decision is how to learn it effectively.</p><p>The internet offers countless courses, certifications, and training programs, but not all build meaningful capability.</p><p class="text-xl text-indigo-700 font-bold max-w-2xl mx-auto my-8">A structured learning progression helps you move from understanding concepts to applying them confidently in real-world scenarios.</p><p>Learning is most effective when it follows a clear sequence rather than scattered enrollment.</p>'
      }
    },

    // ── 3. Why Structure ─────────────────────────────────────────────────
    {
      type: 'text',
      order: 3,
      isActive: true,
      data: {
        layout: 'courses_structure',
        heading: 'Why Course Selection Requires Structure',
        body: '<p>Online education has expanded rapidly across platforms and providers. Introductory tutorials, bootcamps, certification programs, and advanced specializations are all available, often without clarity on depth or expected outcomes.</p><p class="font-bold text-gray-900">Without structure, learners risk investing time in fragmented modules that do not connect into usable expertise.</p><p>Clear progression ensures that each stage builds on the previous one and contributes to long-term competence.</p>'
      }
    },

    // ── 4. Learning Progression (3 stages) ───────────────────────────────
    {
      type: 'cards',
      order: 4,
      isActive: true,
      data: {
        layout: 'courses_progression',
        tag: 'The Roadmap',
        heading: 'A Structured Learning Progression',
        subheading: 'Digital learning works best when approached in stages. Moving systematically ensures you build genuine capability.',
        cards: [
          {
            level: 'Beginner Stage',
            title: 'Foundational Exposure',
            icon: 'HiOutlineSearchCircle',
            description: 'At this level, the objective is clarity and orientation. Learners explore core terminology, workflows, and essential concepts. The goal is not certification, it is understanding.',
            suitedFor: [
              'Students exploring a new field',
              'Career switchers testing interest',
              'Professionals evaluating skill expansion'
            ],
            approach: [
              'Free introductory courses',
              'Platform-based tutorials',
              'Concept-focused modules'
            ]
          },
          {
            level: 'Intermediate Stage',
            title: 'Applied Skill Development',
            icon: 'HiOutlineBriefcase',
            description: 'Here, the focus shifts from theory to structured practice. Projects, exercises, and real-case simulations become essential. This stage builds demonstrable competence.',
            suitedFor: [
              'Learners who understand basics',
              'Individuals preparing for job readiness',
              'Professionals strengthening applied ability'
            ],
            approach: [
              'Structured online programs',
              'Guided project-based courses',
              'Skill-building certifications'
            ],
            color: 'from-cyan-500 to-blue-600',
            shadow: 'shadow-cyan-500/20',
            borderHover: 'hover:border-cyan-300'
          },
          {
            level: 'Advanced Stage',
            title: 'Professional Positioning',
            icon: 'HiOutlineStar',
            description: 'At this stage, learning becomes specialized. The focus is differentiation and depth. The emphasis shifts from learning to positioning.',
            suitedFor: [
              'Professionals aiming for leadership roles',
              'Specialists deepening domain expertise',
              'Individuals seeking recognized credentials'
            ],
            approach: [
              'Advanced certifications',
              'Portfolio-focused programs',
              'Industry-recognized qualifications'
            ],
            color: 'from-amber-500 to-orange-600',
            shadow: 'shadow-amber-500/20',
            borderHover: 'hover:border-amber-300'
          }
        ]
      }
    },

    // ── 5. Free vs Paid ──────────────────────────────────────────────────
    {
      type: 'text',
      order: 5,
      isActive: true,
      data: {
        layout: 'courses_free_paid',
        tag: 'Investment',
        heading: 'Free vs Paid Learning: Making the Right Choice',
        body: '<p>Free resources are effective when the goal is exploration or foundational clarity. They allow learners to test interest before making financial commitments.</p>',
        listTitle: 'Paid programs become valuable when:',
        checklist: [
          'Structured curriculum is required',
          'Project-based validation matters',
          'Mentorship or feedback is important',
          'Credentials influence hiring decisions'
        ],
        cardHighlight: 'The decision should reflect your stage, not marketing pressure.',
        cardDescription: 'Use free resources to build a foundation. Invest in paid programs to validate and certify your expertise.'
      }
    },

    // ── 6. Evaluation + Mistakes (split layout) ─────────────────────────
    {
      type: 'cards',
      order: 6,
      isActive: true,
      data: {
        layout: 'courses_eval_mistakes',
        leftHeading: 'How to Evaluate Any Course or Certification',
        leftSubheading: 'Before enrolling, consider evaluating the program through these key questions to ensure quality and relevance.',
        leftList: [
          'Is the curriculum transparent and structured?',
          'Does it include practical application?',
          'Are learning outcomes clearly defined?',
          'Is the credential recognized or relevant to industry?',
          'Does it align with your long-term direction?'
        ],
        leftFooter: 'Evaluating courses with discipline prevents wasted effort and unnecessary switching.',
        rightHeading: 'Common Mistakes in Course Selection',
        rightSubheading: 'Many learners fall into these traps. Being aware of them is the first step to avoiding them.',
        rightCards: [
          { text: 'Enroll in advanced programs too early', icon: 'HiOutlineExclamationCircle' },
          { text: 'Choose certifications based solely on brand recognition', icon: 'HiOutlineBadgeCheck' },
          { text: 'Prioritize completion over comprehension', icon: 'HiOutlinePlay' },
          { text: 'Skip project-building phases', icon: 'HiOutlineDocumentSearch' },
          { text: 'Assume certificates automatically lead to employment', icon: 'HiOutlineLightBulb' }
        ],
        rightFooter: 'Structured progression reduces these risks.'
      }
    },

    // ── 7. Connecting Learning to Direction ──────────────────────────────
    {
      type: 'text',
      order: 7,
      isActive: true,
      data: {
        layout: 'courses_connecting',
        heading: 'Connecting Learning to Direction',
        body: '<p>Courses and certifications are only one part of professional growth. The value of any program becomes clearer when it is connected to a specific skill pathway and long-term role trajectory.</p><p>Structured learning works best when it begins with clarity about the skill itself and continues with a realistic understanding of how that skill translates into career opportunities. Alignment between skill, course selection, and role expectations creates stronger positioning over time.</p><p class="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 py-2">Choosing what to learn is important. Understanding why you are learning it matters even more.</p>'
      }
    }
  ]

  for (const section of sections) {
    await prisma.section.create({
      data: { pageId: page.id, ...section }
    })
  }

  console.log('\u2705 Courses & Certifications page seeded with 7 sections')
}

main().catch(console.error).finally(() => prisma.$disconnect())

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Find or create the digital-skills page
  let page = await prisma.page.findUnique({ where: { slug: 'digital-skills' } })

  if (!page) {
    page = await prisma.page.create({
      data: {
        slug: 'digital-skills',
        title: 'Digital Skills for Long-Term Growth | Virginia Business Solutions',
        metaDesc: 'Digital skills guide for students and professionals in India. Understand foundational skills, AI impact, and how to choose the right path for long-term growth.',
      }
    })
    console.log('✅ Created digital-skills page')
  } else {
    await prisma.page.update({
      where: { slug: 'digital-skills' },
      data: {
        title: 'Digital Skills for Long-Term Growth | Virginia Business Solutions',
        metaDesc: 'Digital skills guide for students and professionals in India. Understand foundational skills, AI impact, and how to choose the right path for long-term growth.',
      }
    })
    console.log('✅ Updated digital-skills page meta')
  }

  // Delete existing sections
  await prisma.section.deleteMany({ where: { pageId: page.id } })

  const sections = [
    // ── Section 1: Hero ──────────────────────────────────────────────────
    {
      type: 'hero',
      order: 1,
      isActive: true,
      data: {
        layout: 'ds_hero',
        tag: 'Virginia Business Solutions',
        heading: 'Choosing the Right Digital|Skills for Long-Term Growth',
        subheading: 'Understand which digital skills matter and how they shape real careers',
        ctaText: 'Explore Courses →',
        ctaHref: '/courses-certifications',
        secondaryCtaText: 'View Career Guides',
        secondaryCtaHref: '/career-guides',
      }
    },

    // ── Section 2: Intro body + Why Structured Approach ─────────────────
    {
      type: 'text',
      order: 2,
      isActive: true,
      data: {
        tag: 'Introduction',
        heading: 'Why Digital Skills Require a Structured Approach',
        body: '<p class="text-lg text-gray-700 font-medium leading-relaxed mb-6">Digital skills shape how modern teams operate, communicate, and solve problems. Yet not every trending tool or certification translates into meaningful career progress. Choosing the right skill requires understanding how it fits into real workflows, how it evolves with technology, and how it supports long-term adaptability rather than short-term momentum.</p><p>The digital ecosystem expands constantly. New platforms emerge, automation reshapes processes, and short-form content often amplifies simplified success stories.</p><p class="text-indigo-700 font-bold bg-indigo-50 border-l-4 border-indigo-400 px-5 py-3 rounded-r-xl my-5">This creates the illusion that learning a single tool or completing one course is enough.</p><p>In reality, sustainable growth depends on building layered capability. Foundational thinking, practical application, and adaptability to AI-driven changes matter more than isolated trends.</p><p>Without structure, it becomes easy to invest time in skills that lack long-term relevance.</p><p>Clarity begins by understanding how skills connect, not just what they are called.</p>'
      }
    },

    // ── Section 3: Core Digital Skill Clusters ──────────────────────────
    {
      type: 'cards',
      order: 3,
      isActive: true,
      data: {
        layout: 'ds_skill_clusters',
        tag: 'Explore Clusters',
        heading: 'Core Digital Skill Clusters',
        subheading: 'Digital skills are easier to evaluate when grouped into broader categories. Instead of focusing on individual tools or trending platforms, it helps to understand how different skills function within the larger digital ecosystem. Below are the primary clusters that shape most digital roles today.',
        footerText: 'Understanding these clusters is the first step. The next is evaluating which specific skill within a cluster aligns with your goals and long-term adaptability.',
        cards: [
          {
            title: 'Marketing & Growth Skills',
            icon: 'HiOutlineTrendingUp',
            description: 'These skills focus on visibility, acquisition, and measurable performance. They include areas such as search optimization, paid advertising, and analytics-driven decision-making.',
            suited: 'Individuals who prefer strategic thinking, experimentation, and outcome-based work.',
            color: 'from-violet-500 to-indigo-600',
            shadow: 'shadow-violet-500/20'
          },
          {
            title: 'Content & Communication Skills',
            icon: 'HiOutlinePencilAlt',
            description: 'These skills center on structured messaging, storytelling, and audience engagement across digital channels. It includes writing, brand communication, and content strategy.',
            suited: 'Those who value clarity of expression, structured thinking, and understanding audience psychology.',
            color: 'from-cyan-500 to-blue-600',
            shadow: 'shadow-cyan-500/20'
          },
          {
            title: 'Data & Analytics Skills',
            icon: 'HiOutlineChartBar',
            description: 'Data-oriented skills revolve around interpreting performance metrics, identifying patterns, and guiding decisions through evidence.',
            suited: 'Individuals who prefer logical frameworks, measurable insights, and structured problem-solving.',
            color: 'from-emerald-500 to-teal-600',
            shadow: 'shadow-emerald-500/20'
          },
          {
            title: 'Creative & Production Skills',
            icon: 'HiOutlineColorSwatch',
            description: 'These skills involve designing and producing digital assets such as video, graphics, and multimedia content.',
            suited: 'Individuals who combine technical tools with creative direction and visual thinking.',
            color: 'from-amber-500 to-orange-600',
            shadow: 'shadow-amber-500/20'
          },
          {
            title: 'AI & Automation Skills',
            icon: 'HiOutlineLightningBolt',
            description: 'AI now intersects with nearly every digital discipline. This cluster focuses on understanding how automation tools enhance productivity, improve research, and support decision-making.',
            suited: 'Learners who are curious about efficiency, experimentation, and adapting to technological shifts.',
            color: 'from-pink-500 to-rose-600',
            shadow: 'shadow-pink-500/20'
          }
        ]
      }
    },

    // ── Section 4: How to Evaluate a Digital Skill ──────────────────────
    {
      type: 'cards',
      order: 4,
      isActive: true,
      data: {
        layout: 'ds_evaluation',
        tag: 'Before You Commit',
        heading: 'How to Evaluate a Digital Skill Before Committing',
        subheading: 'Choosing a skill requires more than identifying demand. It requires examining how sustainable and transferable that skill will be over time. Before investing time or money, consider the following:',
        footerText: 'Evaluating a skill through this lens helps reduce impulsive decisions and builds a more resilient foundation for long-term growth.',
        cards: [
          { title: 'Is It Foundational or Tool-Specific?', text: 'Foundational skills (like strategy, analysis, or communication) remain valuable even as tools change. Tool-specific skills may require frequent adaptation.', icon: 'HiOutlineShieldCheck' },
          { title: 'Does It Build Transferable Thinking?', text: 'Strong digital skills develop problem-solving ability, structured thinking, and practical execution \u2014 not just familiarity with platforms.', icon: 'HiOutlineCube' },
          { title: 'How Is AI Influencing It?', text: 'Some repetitive tasks are becoming automated. However, strategic thinking, interpretation, and creative judgment remain human-driven. Understanding this distinction is critical.', icon: 'HiOutlineLightningBolt' },
          { title: 'Is There Clear Role Alignment?', text: 'Every skill should connect to specific job roles or growth paths. If that connection is unclear, the skill may lack long-term direction.', icon: 'HiOutlineBadgeCheck' },
          { title: 'Can It Be Demonstrated Through Projects?', text: 'Digital skills gain credibility when they can be applied in real scenarios. Project-based validation matters more than theoretical completion.', icon: 'HiOutlineAcademicCap' }
        ]
      }
    },

    // ── Section 5: How AI Is Reshaping Digital Skills ────────────────────
    {
      type: 'cards',
      order: 5,
      isActive: true,
      data: {
        layout: 'ds_ai_impact',
        heading: 'How AI Is Reshaping Digital Skills',
        body: '<p>Artificial intelligence is not replacing digital skills \u2014 it is redefining how they are applied. Tasks that once required manual effort are becoming automated, while strategic thinking, interpretation, and judgment are becoming more valuable.</p><p>The shift is not about competing with automation, but learning how to integrate it effectively. Digital professionals who understand how AI augments their skill set are better positioned for long-term adaptability.</p><p class="text-indigo-700 font-bold">When evaluating a skill today, it is no longer enough to ask whether it is in demand. The more important question is how that skill evolves alongside intelligent tools.</p>',
        cards: [
          { title: 'Marketing', description: 'AI supports research, keyword discovery, and performance optimization.' },
          { title: 'Content Creation', description: 'It accelerates drafting and editing.' },
          { title: 'Analytics', description: 'It enhances forecasting and pattern recognition.' },
          { title: 'Creative Production', description: 'It streamlines repetitive workflows.' }
        ]
      }
    },

    // ── Section 6: Common Mistakes ──────────────────────────────────────
    {
      type: 'cards',
      order: 6,
      isActive: true,
      data: {
        layout: 'ds_mistakes',
        tag: 'Avoid These Pitfalls',
        heading: 'Common Mistakes When Choosing Digital Skills',
        subheading: 'The availability of online courses and tutorials has made digital learning more accessible than ever. However, accessibility does not eliminate poor decision-making. Some common mistakes include:',
        footerText: 'Avoiding these mistakes strengthens long-term positioning and reduces unnecessary pivots.',
        cards: [
          { title: 'Chasing Trends Instead of Foundations', text: 'Temporary demand spikes can create urgency. Foundational capability creates longevity.', icon: 'HiOutlineTrendingUp' },
          { title: 'Confusing Tools with Transferable Skills', text: 'Knowing how to use a platform is different from understanding strategy or structure.', icon: 'HiOutlineCube' },
          { title: 'Prioritizing Certificates Over Competence', text: 'Certificates may support credibility, but demonstrable skill and project experience carry greater weight.', icon: 'HiOutlineBadgeCheck' },
          { title: 'Skipping the Learning Sequence', text: 'Jumping into advanced topics without mastering fundamentals often leads to shallow understanding.', icon: 'HiOutlineRefresh' },
          { title: 'Expecting Immediate Outcomes', text: 'Digital capability compounds over time. Sustainable growth requires consistency and structured effort.', icon: 'HiOutlineClock' }
        ]
      }
    },

    // ── Section 7: Where to Go Next ─────────────────────────────────────
    {
      type: 'cards',
      order: 7,
      isActive: true,
      data: {
        layout: 'ds_where_next',
        heading: 'Where to Go Next',
        subheading: 'Once you\u2019ve identified which skill cluster aligns with your interests and strengths, the next step is structured learning.',
        footerText: 'Clarity begins with choosing the right skill. Progress continues with learning it strategically and applying it with intention.',
        cards: [
          {
            title: 'Courses & Certifications',
            description: 'Explore curated learning paths and certifications that build depth and practical credibility.',
            icon: 'HiOutlineAcademicCap',
            url: '/courses-certifications'
          },
          {
            title: 'Career Guides',
            description: 'Understand how specific skills translate into real roles, growth trajectories, and long-term positioning.',
            icon: 'HiOutlineTrendingUp',
            url: '/career-guides'
          }
        ]
      }
    }
  ]

  for (const section of sections) {
    await prisma.section.create({
      data: { pageId: page.id, ...section }
    })
  }

  console.log('✅ Digital Skills page seeded with 7 sections')
}

main().catch(console.error).finally(() => prisma.$disconnect())

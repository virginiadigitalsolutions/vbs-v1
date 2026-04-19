const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Seeding About page...')

    const aboutData = {
        title: 'About | Digital Career Guidance Platform in India',
        slug: 'about-us',
        metaDesc: 'Learn why this digital career guidance platform exists and how it helps students and professionals in India make informed decisions about skills, courses, and long-term growth.',
        sections: [
            {
                type: 'hero',
                order: 0,
                data: {
                    layout: 'about_hero',
                    tag: 'About Us',
                    heading: 'Bringing Structure to|Digital Career Decisions',
                    subheading: 'We help students and professionals in India make informed choices about digital skills, learning paths, and long-term career growth.',
                    ctaText: 'Explore Digital Skills →',
                    ctaHref: '/digital-skills'
                }
            },
            {
                type: 'text',
                order: 1,
                data: {
                    layout: 'about_intro',
                    heading: 'Why This Platform Exists',
                    body: '<p>Access to information has never been easier. Yet confusion around skills, certifications, and career direction continues to grow. Learners often move from one course to another without understanding how those decisions connect to long-term outcomes.</p><p>This platform exists to reduce that confusion by offering structured, stage-based guidance that aligns learning with real professional growth.</p>',
                    missionHeading: 'Our Mission',
                    missionText: 'To provide structured, practical digital career guidance that helps individuals build relevant skills, choose appropriate learning pathways, and grow with long-term clarity.',
                    visionHeading: 'Our Vision',
                    visionText: 'To become a trusted digital career guidance platform in India that supports learners at every stage, from early exploration to advanced professional positioning.'
                }
            },
            {
                type: 'cards',
                order: 2,
                data: {
                    layout: 'about_audience',
                    tag: 'Our Audience',
                    heading: 'Who We Serve',
                    body: '',
                    cards: [
                        { title: 'School Students', icon: 'HiOutlineAcademicCap', description: 'Exploring digital possibilities and understanding the landscape before making early career choices.' },
                        { title: 'College Students', icon: 'HiOutlineBriefcase', description: 'Preparing for employment through structured learning and building relevant skills during studies.' },
                        { title: 'Freshers', icon: 'HiOutlineTrendingUp', description: 'Entering the workforce and seeking clarity on which skills and roles align with long-term growth.' },
                        { title: 'Experienced Professionals', icon: 'HiOutlineChartBar', description: 'Seeking advancement through upskilling, specialization, and strategic career positioning.' },
                        { title: 'Career Transitioners', icon: 'HiOutlineRefresh', description: 'Considering career transitions, including those restarting or reshaping their careers after personal milestones.' }
                    ]
                }
            },
            {
                type: 'cards',
                order: 3,
                data: {
                    layout: 'about_approach',
                    tag: 'Our Approach',
                    heading: 'Our Approach',
                    body: 'Our content follows a simple, structured progression:',
                    steps: ['Skills', 'Courses', 'Careers'],
                    cards: [
                        { text: 'First, we help you understand which digital skills are foundational and sustainable.' },
                        { text: 'Next, we guide you through structured learning pathways — from beginner to advanced stages.' },
                        { text: 'Finally, we connect those skills and certifications to real career roles, growth trajectories, and long-term positioning.' }
                    ],
                    footerText: 'This framework ensures that decisions are intentional rather than reactive. Digital growth does not follow a single timeline. Our role is to provide clarity at every stage.'
                }
            },
            {
                type: 'text',
                order: 4,
                data: {
                    layout: 'about_different',
                    tag: 'Our Difference',
                    heading: 'What Makes This Different',
                    dontHeading: 'We do not...',
                    dontList: [
                        'Promote shortcuts or trends',
                        'Prioritize certificates over competence',
                        'Treat learning as isolated enrollment decisions'
                    ],
                    doHeading: 'Instead, we focus on...',
                    doList: [
                        'Foundational understanding',
                        'Stage-based progression',
                        'AI-aware skill development',
                        'Long-term adaptability'
                    ],
                    footerText: 'The digital landscape evolves rapidly. Structured clarity allows individuals to evolve with it.'
                }
            },
            {
                type: 'cta',
                order: 5,
                data: {
                    layout: 'about_cta',
                    heading: 'Building Careers With Clarity',
                    body: 'Digital careers are built through informed decisions, consistent effort, and thoughtful progression. When skills, learning pathways, and career direction align, growth becomes sustainable. This platform was created to make that alignment clearer.',
                    ctaHeading: 'Start With the Right Foundation',
                    ctaBody: 'Explore the digital skills that form the base of sustainable career growth.',
                    ctaText: 'Explore Digital Skills →',
                    ctaHref: '/digital-skills'
                }
            }
        ]
    }

    // Check if page exists by looking for about or about-us
    let page = await prisma.page.findFirst({
        where: { OR: [{ slug: 'about' }, { slug: 'about-us' }] }
    })

    if (!page) {
        console.log('Creating new About page...')
        page = await prisma.page.create({
            data: {
                title: aboutData.title,
                slug: aboutData.slug,
                metaDesc: aboutData.metaDesc,
                sections: {
                    create: aboutData.sections
                }
            }
        })
        console.log(`Created About page with ${aboutData.sections.length} sections!`)
    } else {
        console.log('About page exists. Updating title/meta, slug, and replacing sections...')
        
        await prisma.page.update({
            where: { id: page.id },
            data: {
                title: aboutData.title,
                slug: aboutData.slug,
                metaDesc: aboutData.metaDesc
            }
        })
        
        await prisma.section.deleteMany({
            where: { pageId: page.id }
        })
        
        for (const sec of aboutData.sections) {
            await prisma.section.create({
                data: {
                    ...sec,
                    pageId: page.id
                }
            })
        }
        console.log(`Replaced ${aboutData.sections.length} sections for About page!`)
    }

    console.log('About page seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e.message || e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

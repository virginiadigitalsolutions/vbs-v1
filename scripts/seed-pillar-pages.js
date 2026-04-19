const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Starting seed script for pillar pages...')

    // Define the full content structures
    const pages = [
        {
            title: 'Virginia Business Solutions',
            slug: 'home',
            metaDesc: 'Clear digital career guidance in India for students and working professionals.',
            sections: [
                {
                    type: 'hero',

                    order: 0,
                    data: {
                        layout: 'home_hero',
                        tag: 'Virginia Business Solutions',
                        heading: 'Make Smarter Decisions About|Digital Skills, Courses, and Careers',
                        subheading: 'Clear guidance for students and working professionals in India - without hype or shortcuts',
                        ctaText: 'Explore Digital Skills',
                        ctaHref: '/digital-skills',
                        secondaryCtaText: 'Learn About Us',
                        secondaryCtaHref: '/about-us'
                    }
                },
                {
                    type: 'cards',
                    order: 1,
                    data: {
                        layout: 'home_audience',
                        cards: [
                            { title: 'Students', icon: 'HiOutlineAcademicCap', lines: ["You're exploring digital careers and want to understand where to begin.", "There are countless skills, tools, and courses competing for your attention.", "Before choosing your first step, you want clarity on what truly matters."] },
                            { title: 'Early Career Professionals', icon: 'HiOutlineBriefcase', lines: ["You've entered the workforce and want to strengthen your direction.", "Certifications and skill upgrades promise growth, but not all paths move you forward.", "Before investing your time and effort, you want clarity on what adds real value."] },
                            { title: 'Working Professionals', icon: 'HiOutlineUserGroup', lines: ["You're considering upskilling or transitioning into a digital role.", "The landscape is evolving quickly, and staying relevant requires thoughtful choices.", "Before committing your time and money, you want clarity about your next move."] }
                        ]
                    }
                },
                {
                    type: 'text',
                    order: 2,
                    data: {
                        layout: 'home_challenge',
                        tag: 'The Challenge',
                        heading: 'Why Choosing Digital Skills Today Feels Confusing',
                        body: '<p>The digital space has expanded rapidly over the last few years. New tools, certifications, and roles appear almost every month - each claiming to offer better opportunities and faster growth.</p><p>Social media platforms amplify success stories, while course providers promise quick results. At the same time, automation and AI are reshaping how work is done, making it harder to understand which skills will remain valuable long term.</p><div class="bg-white border-2 border-indigo-100 rounded-2xl p-6 my-6"><p class="text-indigo-800 font-bold text-base leading-relaxed">For students and professionals alike, the challenge is not a lack of options - it is an excess of them.</p></div><p>Without a clear structure, it becomes difficult to separate foundational skills from temporary trends.</p>'
                    }
                },
                {
                    type: 'cards',
                    order: 3,
                    data: {
                        layout: 'home_framework',
                        tag: 'Our Approach',
                        heading: 'A Clear Framework for Smarter Career Decisions',
                        subheading: 'Instead of chasing trends or reacting to noise, a structured approach helps you understand what to learn, where to learn it, and how it connects to real career outcomes.',
                        cards: [
                            { title: 'Digital Skills', icon: 'HiOutlineLightningBolt', description: 'Understand which digital skills are foundational and which are temporary trends. Explore how different skills connect to real-world roles and where AI is reshaping expectations.', href: '/digital-skills' },
                            { title: 'Courses & Certifications', icon: 'HiOutlineBookOpen', description: 'Evaluate learning paths with clarity. Compare free and paid options, structured programs, and certifications to choose what aligns with your stage and goals.', href: '/courses-certifications' },
                            { title: 'Career Guides', icon: 'HiOutlineTrendingUp', description: 'See how skills and courses translate into career pathways. Understand role expectations, growth trajectories, and how to stay relevant in a changing landscape.', href: '/career-guides' }
                        ]
                    }
                },
                {
                    type: 'cards',
                    order: 4,
                    data: {
                        layout: 'home_standards',
                        tag: 'Our Standards',
                        heading: 'How Recommendations Are Evaluated',
                        cards: [
                            { title: 'Practical Relevance', text: 'Does this skill or course reflect how work is actually done today?', icon: 'HiOutlineCheckCircle' },
                            { title: 'Learning Depth', text: 'Does it build real understanding, not just surface familiarity?', icon: 'HiOutlineEye' },
                            { title: 'Curriculum Clarity', text: 'Is the structure transparent, structured, and outcome-oriented?', icon: 'HiOutlineTemplate' },
                            { title: 'Long-Term Value', text: 'Will this knowledge remain useful beyond short-term trends?', icon: 'HiOutlineClock' },
                            { title: 'Stage Alignment', text: 'Is it suitable for beginners, early professionals, or experienced learners?', icon: 'HiOutlineScale' },
                            { title: 'Balanced Options', text: 'Are free and paid paths both considered based on value, not marketing?', icon: 'HiOutlineShieldCheck' }
                        ]
                    }
                }
            ]
        },
        {
            title: 'Digital Skills',
            slug: 'digital-skills',
            metaDesc: 'Digital skills guide for students and professionals in India. Understand foundational skills, AI impact, and how to choose the right path.',
            sections: [
                {
                    type: 'hero',

                    order: 0,
                    data: {
                        layout: 'ds_hero',
                        tag: 'Virginia Business Solutions',
                        heading: 'Choosing the Right Digital|Skills for Long-Term Growth',
                        subheading: 'Understand which digital skills matter and how they shape real careers',
                        ctaText: 'Explore Courses →',
                        ctaHref: '/courses-certifications',
                        secondaryCtaText: 'View Career Guides',
                        secondaryCtaHref: '/career-guides'
                    }
                },
                {
                    type: 'text',
                    order: 1,
                    data: {
                        tag: 'Introduction',
                        heading: 'Why Digital Skills Require a Structured Approach',
                        body: '<p class="text-lg text-gray-700 font-medium leading-relaxed mb-6">Digital skills shape how modern teams operate, communicate, and solve problems. Yet not every trending tool or certification translates into meaningful career progress. Choosing the right skill requires understanding how it fits into real workflows, how it evolves with technology, and how it supports long-term adaptability rather than short-term momentum.</p><p>The digital ecosystem expands constantly. New platforms emerge, automation reshapes processes, and short-form content often amplifies simplified success stories.</p><p class="text-indigo-700 font-bold bg-indigo-50 border-l-4 border-indigo-400 px-5 py-3 rounded-r-xl my-5">This creates the illusion that learning a single tool or completing one course is enough.</p><p>In reality, sustainable growth depends on building layered capability. Foundational thinking, practical application, and adaptability to AI-driven changes matter more than isolated trends.</p>'
                    }
                },
                {
                    type: 'cards',
                    order: 2,
                    data: {
                        layout: 'ds_skill_clusters',
                        tag: 'Explore Clusters',
                        heading: 'Core Digital Skill Clusters',
                        subheading: 'Instead of focusing on individual tools or trending platforms, understand how different skills function within the larger digital ecosystem.',
                        footerText: 'Understanding these clusters is the first step. The next is evaluating which specific skill within a cluster aligns with your goals and long-term adaptability.',
                        cards: [
                            { title: 'Marketing & Growth Skills', icon: 'HiOutlineTrendingUp', description: 'These skills focus on visibility, acquisition, and measurable performance. They include areas such as search optimization, paid advertising, and analytics-driven decision-making.', suited: 'Individuals who prefer strategic thinking, experimentation, and outcome-based work.', color: 'from-violet-500 to-indigo-600', shadow: 'shadow-violet-500/20' },
                            { title: 'Content & Communication Skills', icon: 'HiOutlinePencilAlt', description: 'These skills center on structured messaging, storytelling, and audience engagement across digital channels. Includes writing, brand communication, and content strategy.', suited: 'Those who value clarity of expression, structured thinking, and understanding audience psychology.', color: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/20' },
                            { title: 'Data & Analytics Skills', icon: 'HiOutlineChartBar', description: 'Data-oriented skills revolve around interpreting performance metrics, identifying patterns, and guiding decisions through evidence.', suited: 'Individuals who prefer logical frameworks, measurable insights, and structured problem-solving.', color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/20' },
                            { title: 'Creative & Production Skills', icon: 'HiOutlineColorSwatch', description: 'These skills involve designing and producing digital assets such as video, graphics, and multimedia content.', suited: 'Individuals who combine technical tools with creative direction and visual thinking.', color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/20' },
                            { title: 'AI & Automation Skills', icon: 'HiOutlineLightningBolt', description: 'AI now intersects with nearly every digital discipline. This cluster focuses on understanding how automation tools enhance productivity, improve research, and support decision-making.', suited: 'Learners who are curious about efficiency, experimentation, and adapting to technological shifts.', color: 'from-pink-500 to-rose-600', shadow: 'shadow-pink-500/20' }
                        ]
                    }
                },
                {
                    type: 'cards',
                    order: 3,
                    data: {
                        layout: 'ds_evaluation',
                        tag: 'Before You Commit',
                        heading: 'How to Evaluate a Digital Skill',
                        subheading: 'Choosing a skill requires more than identifying demand. It requires examining how sustainable and transferable that skill will be over time.',
                        footerText: 'Evaluating a skill through this lens helps reduce impulsive decisions and builds a more resilient foundation for long-term growth.',
                        cards: [
                            { title: 'Is It Foundational or Tool-Specific?', text: 'Foundational skills (like strategy, analysis, or communication) remain valuable even as tools change. Tool-specific skills may require frequent adaptation.', icon: 'HiOutlineShieldCheck' },
                            { title: 'Does It Build Transferable Thinking?', text: 'Strong digital skills develop problem-solving ability, structured thinking, and practical execution - not just familiarity with platforms.', icon: 'HiOutlineCube' },
                            { title: 'How Is AI Influencing It?', text: 'Some repetitive tasks are becoming automated. However, strategic thinking, interpretation, and creative judgment remain human-driven. Understanding this distinction is critical.', icon: 'HiOutlineLightningBolt' },
                            { title: 'Is There Clear Role Alignment?', text: 'Every skill should connect to specific job roles or growth paths. If that connection is unclear, the skill may lack long-term direction.', icon: 'HiOutlineBadgeCheck' },
                            { title: 'Can It Be Demonstrated Through Projects?', text: 'Digital skills gain credibility when applied in real scenarios. Project-based validation matters more than theoretical completion.', icon: 'HiOutlineAcademicCap' }
                        ]
                    }
                },
                {
                    type: 'cards',
                    order: 4,
                    data: {
                        layout: 'ds_ai_impact',
                        heading: 'How AI Is Reshaping Digital Skills',
                        body: '<p>Artificial intelligence is not replacing digital skills - it is redefining how they are applied. Tasks that once required manual effort are becoming automated, while strategic thinking, interpretation, and judgment are becoming more valuable.</p><p>The shift is not about competing with automation, but learning how to integrate it effectively. Digital professionals who understand how AI augments their skill set are better positioned for long-term adaptability.</p><p class="text-indigo-700 font-bold">When evaluating a skill today, it is no longer enough to ask whether it is in demand. The more important question is how that skill evolves alongside intelligent tools.</p>',
                        cards: [
                            { title: 'Marketing', description: 'AI supports research, keyword discovery, and performance optimization.' },
                            { title: 'Content Creation', description: 'It accelerates drafting, editing, and content iteration.' },
                            { title: 'Analytics', description: 'It enhances forecasting and pattern recognition.' },
                            { title: 'Creative Production', description: 'It streamlines repetitive workflows and asset generation.' }
                        ]
                    }
                },
                {
                    type: 'cards',
                    order: 5,
                    data: {
                        layout: 'ds_mistakes',
                        tag: 'Avoid These Pitfalls',
                        heading: 'Common Mistakes When Choosing Digital Skills',
                        subheading: 'Accessibility of online courses does not eliminate poor decision-making. Here are the most common pitfalls to avoid.',
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
                {
                    type: 'cards',
                    order: 6,
                    data: {
                        layout: 'ds_where_next',
                        heading: 'Where to Go Next',
                        subheading: 'Once you have identified which skill cluster aligns with your interests and strengths, the next step is structured learning.',
                        footerText: 'Clarity begins with choosing the right skill. Progress continues with learning it strategically and applying it with intention.',
                        cards: [
                            { title: 'Courses & Certifications', description: 'Explore curated learning paths and certifications that build depth and practical credibility.', icon: 'HiOutlineAcademicCap', url: '/courses-certifications' },
                            { title: 'Career Guides', description: 'Understand how specific skills translate into real roles, growth trajectories, and long-term positioning.', icon: 'HiOutlineTrendingUp', url: '/career-guides' }
                        ]
                    }
                }
            ]
        },
        {
            title: 'Courses & Certifications',
            slug: 'courses-certifications',
            metaDesc: 'Explore structured digital courses and certifications in India. Learn through beginner, intermediate, and advanced paths with clear guidance on free and paid options.',
            sections: [
                {
                    type: 'hero',
                    order: 0,
                    data: {
                        layout: 'courses_hero',
                        tag: 'Virginia Business Solutions',
                        heading: 'Structured Learning Paths|for Real Skill Development',
                        subheading: 'Move from foundational knowledge to applied competence with clear, stage-based learning paths.',
                        ctaText: 'View Learning Stages ↓',
                        ctaHref: '#learning-progression',
                        secondaryCtaText: 'Explore Career Guides',
                        secondaryCtaHref: '/career-guides'
                    }
                },
                {
                    type: 'text',
                    order: 1,
                    data: {
                        layout: 'courses_intro',
                        heading: 'Choosing the Right Courses and Certifications for Long-Term Growth',
                        body: '<p>Once you’ve identified the digital skill you want to develop, the next decision is how to learn it effectively. The internet offers countless courses, certifications, and training programs, but not all build meaningful capability.</p><p class="text-xl text-indigo-700 font-bold max-w-2xl mx-auto my-8">A structured learning progression helps you move from understanding concepts to applying them confidently in real-world scenarios.</p><p>Learning is most effective when it follows a clear sequence rather than scattered enrollment.</p>'
                    }
                },
                {
                    type: 'text',
                    order: 2,
                    data: {
                        layout: 'courses_structure',
                        heading: 'Why Course Selection Requires Structure',
                        body: '<p>Online education has expanded rapidly across platforms and providers. Introductory tutorials, bootcamps, certification programs, and advanced specializations are all available, often without clarity on depth or expected outcomes.</p><p class="font-bold text-gray-900">Without structure, learners risk investing time in fragmented modules that do not connect into usable expertise.</p><p>Clear progression ensures that each stage builds on the previous one and contributes to long-term competence.</p>'
                    }
                },
                {
                    type: 'cards',
                    order: 3,
                    data: {
                        layout: 'courses_progression',
                        tag: 'The Roadmap',
                        heading: 'A Structured Learning Progression',
                        subheading: 'Digital learning works best when approached in stages. Moving systematically ensures you build genuine capability.',
                        cards: [
                            { level: 'Beginner Stage', title: 'Foundational Exposure', icon: 'HiOutlineSearchCircle', description: 'At this level, the objective is clarity and orientation. Learners explore core terminology, workflows, and essential concepts. The goal is not certification, it is understanding.', suitedFor: ['Students exploring a new field', 'Career switchers testing interest', 'Professionals evaluating skill expansion'], approach: ['Free introductory courses', 'Platform-based tutorials', 'Concept-focused modules'] },
                            { level: 'Intermediate Stage', title: 'Applied Skill Development', icon: 'HiOutlineBriefcase', description: 'Here, the focus shifts from theory to structured practice. Projects, exercises, and real-case simulations become essential. This stage builds demonstrable competence.', suitedFor: ['Learners who understand basics', 'Individuals preparing for job readiness', 'Professionals strengthening applied ability'], approach: ['Structured online programs', 'Guided project-based courses', 'Skill-building certifications'], color: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/20', borderHover: 'hover:border-cyan-300' },
                            { level: 'Advanced Stage', title: 'Professional Positioning', icon: 'HiOutlineStar', description: 'At this stage, learning becomes specialized. The focus is differentiation and depth. The emphasis shifts from learning to positioning.', suitedFor: ['Professionals aiming for leadership roles', 'Specialists deepening domain expertise', 'Individuals seeking recognized credentials'], approach: ['Advanced certifications', 'Portfolio-focused programs', 'Industry-recognized qualifications'], color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/20', borderHover: 'hover:border-amber-300' }
                        ]
                    }
                },
                {
                    type: 'text',
                    order: 4,
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
                {
                    type: 'cards',
                    order: 5,
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
                {
                    type: 'text',
                    order: 6,
                    data: {
                        layout: 'courses_connecting',
                        heading: 'Connecting Learning to Direction',
                        body: '<p>Courses and certifications are only one part of professional growth. The value of any program becomes clearer when it is connected to a specific skill pathway and long-term role trajectory.</p><p>Structured learning works best when it begins with clarity about the skill itself and continues with a realistic understanding of how that skill translates into career opportunities. Alignment between skill, course selection, and role expectations creates stronger positioning over time.</p><p class="font-bold text-2xl text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-600 py-2">Choosing what to learn is important. Understanding why you are learning it matters even more.</p>'
                    }
                }
            ]
        },
        {
            title: 'Career Guides',
            slug: 'career-guides',
            metaDesc: 'Explore digital career paths in India. Understand roles, required skills, growth trajectories, and how certifications translate into long-term opportunities.',
            sections: [
                {
                    type: 'hero',
                    order: 0,
                    data: {
                        layout: 'career_hero',
                        tag: 'Virginia Business Solutions',
                        heading: 'Understand Where Digital Skills|Can Take You',
                        subheading: 'Explore real digital career paths, role expectations, growth potential, and how structured learning translates into professional outcomes.',
                        ctaText: 'Explore Career Paths ↓',
                        ctaHref: '#career-progression',
                        secondaryCtaText: 'View Digital Skills',
                        secondaryCtaHref: '/digital-skills'
                    }
                },
                {
                    type: 'text',
                    order: 1,
                    data: {
                        layout: 'career_intro',
                        heading: 'Digital Career Paths, Roles, and Long-Term Growth',
                        body: '<p>Digital careers are not defined by titles alone, but by the skills and capabilities that support them. Understanding how roles evolve, what they demand, and how growth happens over time brings structure to career decisions.</p><p class="text-2xl text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600 font-bold py-2">Clarity begins with seeing how skills translate into real professional pathways.</p>'
                    }
                },
                {
                    type: 'text',
                    order: 2,
                    data: {
                        layout: 'career_why_clarity',
                        leftHeading: 'Why Career Clarity Matters',
                        leftBody: '<p>Choosing a digital skill or course is only part of the equation. Understanding how that skill connects to real job roles and long-term growth provides essential context.</p><p>Without this connection, learning can feel disconnected from practical outcomes. Digital careers are not defined by titles alone. They are shaped by skill combinations, experience depth, and adaptability to technological shifts.</p>',
                        rightHeading: 'How Digital Skills Translate Into Roles',
                        rightBody: '<p>Digital careers rarely rely on just one skill; they usually combine several related capabilities.</p><div class="bg-white/10 rounded-xl p-4 border border-white/10 my-4"><p class="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wide">For Example:</p><p class="text-white text-base">Behind every role is a combination of skills working together.</p></div><p>When you understand that connection, career decisions become less confusing.</p>'
                    }
                },
                {
                    type: 'cards',
                    order: 3,
                    data: {
                        layout: 'career_progression',
                        tag: 'The Timeline',
                        heading: 'Career Progression by Stage',
                        subheading: 'Growth in digital careers follows a progression from execution to ownership, and eventually to strategic direction.',
                        cards: [
                            { level: 'Entry-Level Roles', subtitle: 'You as a FRESHER…', icon: 'HiOutlineUserAdd', description: 'This is where most digital careers begin, learning how things actually work in practice.', focus: "At this stage, the focus isn't perfection. It's building confidence through consistent execution.", bullets: ['Understanding core concepts', 'Working on guided projects', 'Getting comfortable with essential tools'] },
                            { level: 'Mid-Level Roles', subtitle: 'Moving to Ownership', icon: 'HiOutlineTrendingUp', color: 'from-blue-400 to-indigo-500', shadow: 'shadow-blue-500/20', borderHover: 'hover:border-blue-300', description: 'This stage is about moving from doing tasks to owning outcomes, like taking on more responsibilities, thinking differently and getting to be a leader.', focus: "Here, growth comes from accountability. You're not just learning, you're delivering measurable impact.", bullets: ['Managing independent projects', 'Improving performance metrics', 'Strengthening specialization'] },
                            { level: 'Senior-Level Roles', subtitle: 'Captain of Your Ship', icon: 'HiOutlineStar', color: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-500/20', borderHover: 'hover:border-violet-300', description: 'Senior roles shift the focus from execution to direction. Here you are the captain of your ship.', focus: "At this level, experience turns into judgment. The goal is no longer just doing the work, it's shaping how the work is done.", bullets: ['Leading strategy and decision-making', 'Connecting multiple skill areas', 'Guiding teams and long-term planning'] }
                        ]
                    }
                },
                {
                    type: 'cards',
                    order: 4,
                    data: {
                        layout: 'career_growth',
                        tag: 'Economics of Value',
                        heading: 'Growth and Earning Potential',
                        body: '<p>If you are investing time in building digital skills, it is natural to wonder where it can lead, both professionally and financially.</p><p>Growth in digital careers does not follow a fixed ladder, but it does follow capability. As your skills deepen and your impact becomes measurable, opportunities tend to expand alongside them.</p>',
                        checklist: [
                            'Entry-level positions often prioritize learning exposure.',
                            'Mid-level roles reward measurable contribution.',
                            'Senior roles reflect leadership and strategic impact.'
                        ],
                        rightHeading: 'Compensation varies based on several factors:',
                        cards: [
                            { icon: 'HiOutlineViewGridAdd' },
                            { icon: 'HiOutlineChartPie' },
                            { icon: 'HiOutlineBriefcase' },
                            { icon: 'HiOutlineLocationMarker' },
                            { icon: 'HiOutlineLightningBolt' }
                        ],
                        footerText: 'Long-term growth depends less on certificates and more on demonstrable capability and adaptability.'
                    }
                },
                {
                    type: 'cards',
                    order: 5,
                    data: {
                        layout: 'career_ai_mistakes',
                        leftHeading: 'How AI Is Influencing Digital Careers',
                        leftBody: '<p>AI is the new now tech, its meant to be around for a while. It will not wipe out careers or jobs, it will enhance productivity and make space for more jobs.</p><p>Automation is changing workflows across marketing, analytics, and creative production. However, AI typically enhances roles rather than eliminates them.</p>',
                        leftListTitle: 'Professionals who are better positioned for sustainable growth:',
                        leftList: [
                            'Understand core fundamentals',
                            'Learn to integrate AI tools',
                            'Adapt continuously'
                        ],
                        leftFooter: 'Career resilience now includes technological adaptability.',
                        rightHeading: 'Mistakes That Slow Career Progression',
                        rightSubheading: 'Common patterns that lead to frustration and stagnant growth include:',
                        rightCards: [
                            { title: 'Selecting roles without understanding required skills' },
                            { title: 'Overvaluing certifications over competence' },
                            { title: 'Avoiding specialization too long' },
                            { title: 'Ignoring project-building' },
                            { title: 'Failing to adapt to AI-driven changes' }
                        ],
                        rightFooter: 'Career clarity reduces unnecessary pivots.'
                    }
                },
                {
                    type: 'cta',
                    order: 6,
                    data: {
                        layout: 'career_aligning',
                        heading: 'Aligning Skills, Courses, and Career Direction',
                        subheading: 'Strong career progression begins with choosing the right skill foundation and building it through structured learning.',
                        cards: [
                            { title: 'Understanding digital skills provides clarity at the starting point.' },
                            { title: 'Structured courses strengthen application.' },
                            { title: 'Career awareness aligns those efforts with long-term outcomes.' }
                        ],
                        footerText: 'When these three elements connect, progression becomes intentional rather than reactive.'
                    }
                }
            ]
        }
    ]

    for (const p of pages) {
        console.log(`Checking page: ${p.slug}...`)
        // Check if page exists
        let page = await prisma.page.findUnique({
            where: { slug: p.slug }
        })

        if (!page) {
            console.log(`Creating new page: ${p.slug}...`)
            page = await prisma.page.create({
                data: {
                    title: p.title,
                    slug: p.slug,
                    metaDesc: p.metaDesc,
                    sections: {
                        create: p.sections
                    }
                }
            })
            console.log(`Created new page ${p.slug} with ${p.sections.length} sections!`)
        } else {
            console.log(`Page ${p.slug} already exists. Replacing its sections...`)
            // Delete old sections for the page
            await prisma.section.deleteMany({
                where: { pageId: page.id }
            })
            // Create new sections
            for (const sec of p.sections) {
                await prisma.section.create({
                    data: {
                        ...sec,
                        pageId: page.id
                    }
                })
            }
            console.log(`Replaced sections for page ${p.slug}!`)
        }
    }

    console.log('Finished seeding pillar pages!')
}

main()
    .catch((e) => {
        console.error(e.message || e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

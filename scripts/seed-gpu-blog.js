require('dotenv/config')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function genId() {
    return Math.random().toString(36).substring(2, 9)
}

async function main() {
    console.log('Seeding blog post: 10,571 GPUs for AI Education with refined TOC structure...')

    let category = await prisma.category.findUnique({
        where: { slug: 'digital-skills' }
    })
    if (!category) {
        category = await prisma.category.create({
            data: { name: 'Digital Skills', slug: 'digital-skills' }
        })
    }

    let author = await prisma.adminUser.findFirst()
    if (!author) {
        throw new Error('No author found in AdminUser table!')
    }

    const tagNames = ['AI Education', 'Digital Skills', 'IndiaAI', 'Career Guidance', 'GPUs', 'AI Careers']
    const tags = []
    for (const name of tagNames) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        let tag = await prisma.tag.findUnique({ where: { slug } })
        if (!tag) {
            tag = await prisma.tag.create({ data: { name, slug } })
        }
        tags.push(tag)
    }

    const blocks = [
        // Intro Block
        {
            id: genId(),
            type: 'text',
            data: {
                html: `<p>10,571 GPUs sounds enormous, doesn’t it?</p>
<p>But if you're a student in India, you may have a more practical question:</p>
<p class="text-xl font-bold text-[#0A4186]"><em>What does that number actually mean for me?</em></p>
<ul>
<li>Does it mean you can now access powerful AI computing without buying an expensive computer?</li>
<li>Does it mean colleges will have GPUs available for students?</li>
<li>Does it mean AI-related career opportunities are about to expand?</li>
<li>Or is it simply another big technology announcement that sounds impressive but has little to do with your everyday education?</li>
</ul>
<p>The answer is somewhere in between.</p>
<p>In August 2026, MeitY Secretary S. Krishnan said that 10,571 GPUs had been allocated through the IndiaAI Compute initiative, under which academia and students are eligible end-users. The model is based on shared, cloud-based access rather than requiring every institution to buy and maintain its own high-end GPU hardware.</p>
<p>But there is an important qualification: <strong>10,571 GPUs does not mean 10,571 GPUs have been reserved exclusively for college students.</strong> The government has not created a fixed percentage of the compute pool exclusively for universities or undergraduate students. Access depends on eligibility, projects, institutional processes and availability.</p>
<p>So the real story isn't simply about 10,571 machines. It is about India making high-performance AI computing more accessible, and what students do with that access.</p>`
            }
        },

        // Section 1
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'What Are GPUs and Why Do They Matter for AI?'
            }
        },
        {
            id: genId(),
            type: 'text',
            data: {
                html: `<p>A GPU, or Graphics Processing Unit, is a type of processor designed to perform many calculations in parallel.</p>
<p>That makes GPUs particularly useful for AI and machine learning workloads, where huge numbers of mathematical operations need to be performed repeatedly.</p>
<p>You don't need to understand GPU architecture to begin learning AI.</p>
<p>But understanding one thing is useful: <strong>Modern AI requires computing power.</strong></p>
<p>Training models, processing large datasets and running certain AI workloads can require substantially more computing resources than an ordinary laptop can provide. That is why access to shared AI infrastructure matters.</p>
<p>India's IndiaAI Mission was approved in March 2024 with a total outlay of ₹10,371.92 crore over five years, with compute capacity as one of its seven major pillars.</p>
<p>By early 2026, the government said more than 38,000 GPUs had been onboarded for common compute facilities, making the 10,571 figure part of a much larger expansion of India's AI computing ecosystem.</p>
<p>For students, the important question isn't: <em>"How many GPUs does India have?"</em></p>
<p>It is: <strong>"Can I use these resources to learn, experiment and build something useful?"</strong></p>
<p>That's where things become interesting.</p>`
            }
        },

        // Section 2
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'What Does the 10,571-GPU Allocation Actually Mean?'
            }
        },
        {
            id: genId(),
            type: 'text',
            data: {
                html: `<p>The simplest way to understand it is this:</p>
<p><strong>India is expanding access to AI computing through a shared cloud model rather than expecting every college or student to own expensive hardware.</strong></p>
<p>The IndiaAI Compute portal is designed to provide AI compute infrastructure through cloud services to categories that include academia, researchers, students, startups and other approved users.</p>
<p>Students working on eligible AI/ML projects can apply through the IndiaAI Compute system. The current portal specifically lists students with AI/ML-aligned academic projects among eligible categories.</p>
<p>That changes the learning equation. A student doesn't necessarily need to own a powerful GPU-equipped computer to begin experimenting with AI. Instead, the computing can potentially be accessed remotely.</p>`
            }
        },
        {
            id: genId(),
            type: 'callout',
            data: {
                style: 'warning',
                text: `But there is a catch: Access is not automatic.

The August 2026 report that brought the 10,571 figure into public attention also highlighted the gap between national compute capacity and actual institutional access. There is no guarantee that every undergraduate student will automatically receive GPU access simply because the national pool exists.

That distinction matters. The opportunity exists. Your job is to learn how to make use of it.`
            }
        },

        // Section 3
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'What 10,571 GPUs Do NOT Mean for Students'
            }
        },
        {
            id: genId(),
            type: 'text',
            data: {
                html: `<p>Let's remove some of the hype.</p>
<ul>
<li><strong>It does not mean every student gets a GPU:</strong> The GPUs are part of a shared computing infrastructure. Students and academic users can be eligible to access resources, but that doesn't mean every student receives dedicated hardware.</li>
<li><strong>It does not mean you automatically become an AI professional:</strong> Access to computing is infrastructure. It is not expertise. Giving someone access to a powerful computer does not teach them how to solve a business problem, prepare data, build a model or evaluate an AI system.</li>
<li><strong>It does not mean every student needs to learn machine learning:</strong> This is perhaps the biggest misconception. AI is becoming relevant across marketing, finance, healthcare, content, design, operations, education, software and many other fields. You don't have to become an ML engineer to build an AI-enabled career.</li>
<li><strong>It does not replace fundamentals:</strong> AI tools can accelerate work. They cannot replace your understanding of the problem you're trying to solve.</li>
</ul>
<p>That leads to a much more useful distinction.</p>`
            }
        },

        // Section 4
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'AI Literacy Is Not the Same as AI Capability'
            }
        },
        {
            id: genId(),
            type: 'text',
            data: {
                html: `<p>You can use ChatGPT, Claude or Gemini every day and still have limited AI capability.</p>
<p>Why? Because using an AI tool and being able to apply AI to a real problem are two different things.</p>
<p>Think about AI capability in four stages:</p>
<div class="space-y-6 my-6">
    <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
        <h3 class="text-lg font-bold text-slate-900 mb-2">1. AI Awareness</h3>
        <p class="text-sm font-medium text-slate-600">You understand what AI is, what generative AI does and where it is being used across industries.</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
        <h3 class="text-lg font-bold text-slate-900 mb-2">2. AI Literacy</h3>
        <p class="text-sm font-medium text-slate-600">You can use AI tools effectively for research, writing, analysis, brainstorming, summarisation or other tasks.</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
        <h3 class="text-lg font-bold text-slate-900 mb-2">3. Applied AI Capability</h3>
        <p class="text-sm font-medium text-slate-600 mb-3">You can combine AI tools with your existing skills to solve a real problem. For example:</p>
        <ul class="text-sm space-y-1 text-slate-600">
            <li>A marketer uses AI for customer research and campaign analysis.</li>
            <li>A content professional combines AI with SEO and search-intent analysis.</li>
            <li>A commerce student uses AI and data tools to analyse financial information.</li>
            <li>A developer builds an application using an AI API.</li>
        </ul>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
        <h3 class="text-lg font-bold text-slate-900 mb-2">4. Demonstrated AI Capability</h3>
        <p class="text-sm font-medium text-slate-600 mb-2">You can show someone what you built and explain how it works.</p>
        <p class="text-sm font-medium text-slate-600">This is where a course certificate becomes less important than evidence. Instead of just saying <em>"I know AI,"</em> you can demonstrate: <strong>"Here is a project I built using AI, the problem it solved, the approach, tools used, results and limitations."</strong></p>
    </div>
</div>`
            }
        },

        // Section 5
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'So What Skills Should Students Build?'
            }
        },
        {
            id: genId(),
            type: 'text',
            data: {
                html: `<p>The growth of AI infrastructure doesn't mean everyone should follow the same learning path.</p>
<p>A better approach is to combine AI with something you already understand or want to become good at. The skills you need will depend on the direction you choose:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    <div class="rounded-2xl border border-slate-200 p-6 bg-white">
        <h3 class="text-lg font-bold text-[#0A4186] mb-3">AI Literacy & AI Tools</h3>
        <p class="text-sm text-slate-600 mb-3">Almost everyone can benefit from understanding how modern AI tools work:</p>
        <ul class="text-sm space-y-1.5 text-slate-700">
            <li>Generative AI practical concepts</li>
            <li>Prompting & instruction design</li>
            <li>AI-assisted research & fact-checking</li>
            <li>Working with documents and structured data</li>
            <li>Workflow design & responsible AI usage</li>
        </ul>
        <p class="text-xs font-semibold text-slate-500 mt-3 italic">Don't stop at prompting. Prompting is a tool skill; problem-solving is the deeper capability.</p>
    </div>

    <div class="rounded-2xl border border-slate-200 p-6 bg-white">
        <h3 class="text-lg font-bold text-[#0A4186] mb-3">Data & Analytics</h3>
        <p class="text-sm text-slate-600 mb-3">AI depends heavily on data. Building data literacy gives you a competitive layer:</p>
        <ul class="text-sm space-y-1.5 text-slate-700">
            <li>Excel & advanced spreadsheets</li>
            <li>Data visualisation & basic statistics</li>
            <li>SQL fundamentals</li>
            <li>Analytics platforms & data interpretation</li>
        </ul>
        <p class="text-xs font-semibold text-slate-500 mt-3 italic">A marketer who understands campaign data is more capable than one who only generates ad copy.</p>
    </div>

    <div class="rounded-2xl border border-slate-200 p-6 bg-white">
        <h3 class="text-lg font-bold text-[#0A4186] mb-3">Python & Programming</h3>
        <p class="text-sm text-slate-600 mb-3">For technical AI roles, programming becomes increasingly important:</p>
        <ul class="text-sm space-y-1.5 text-slate-700">
            <li>Python fundamentals & data structures</li>
            <li>APIs & data handling</li>
            <li>Machine learning basics & model evaluation</li>
            <li>Cloud & notebook environments</li>
        </ul>
    </div>

    <div class="rounded-2xl border border-slate-200 p-6 bg-white">
        <h3 class="text-lg font-bold text-[#0A4186] mb-3">Domain Knowledge + AI</h3>
        <p class="text-sm text-slate-600 mb-3">One of the most powerful combinations for students:</p>
        <p class="text-sm font-medium text-slate-700">Instead of asking <em>"Should I become an AI professional?"</em>, ask: <strong>"How can AI make me better at the field I want to work in?"</strong></p>
    </div>
</div>`
            }
        },

        // Section 6
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'You Don\'t Have to Be a Computer Science Student'
            }
        },
        {
            id: genId(),
            type: 'text',
            data: {
                html: `<p>Consider four students from different disciplines and how AI amplifies their specific goals:</p>

<div class="space-y-4 my-6">
    <div class="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 class="text-base font-bold text-slate-900 mb-1">A B.Com Student</h3>
        <p class="text-sm font-semibold text-primary-700 mb-2">Commerce + Financial Analysis + AI Tools + Data Literacy</p>
        <p class="text-sm text-slate-600">A practical project could involve analysing a financial dataset and using AI to assist with trend reporting and interpretation.</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 class="text-base font-bold text-slate-900 mb-1">A Marketing Student</h3>
        <p class="text-sm font-semibold text-primary-700 mb-2">Marketing + AI + Analytics + Automation</p>
        <p class="text-sm text-slate-600">A project could involve customer research, audience segmentation and an AI-assisted campaign workflow.</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 class="text-base font-bold text-slate-900 mb-1">A Content Student</h3>
        <p class="text-sm font-semibold text-primary-700 mb-2">Content + AI + SEO + Search Intent</p>
        <p class="text-sm text-slate-600">A project could involve building an AI-assisted research and content optimisation workflow, documenting human editorial judgment.</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 class="text-base font-bold text-slate-900 mb-1">A Computer Science Student</h3>
        <p class="text-sm font-semibold text-primary-700 mb-2">Python + Data + Machine Learning + AI + Cloud Computing</p>
        <p class="text-sm text-slate-600">A project might involve developing and deploying a functional AI application or pipeline.</p>
    </div>
</div>
<p class="text-sm font-medium text-slate-600">The point isn't that one pathway is better than another. The point is that AI can become a high-leverage layer across every discipline.</p>`
            }
        },

        // Section 7
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'What Should a Student Do Now?'
            }
        },
        {
            id: genId(),
            type: 'text',
            data: {
                html: `<p>Don't start by searching for the "best AI course." Start with a structured 6-step action plan:</p>

<div class="space-y-6 my-6">
    <div class="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <h3 class="text-base font-bold text-slate-900 mb-1">Step 1: Understand AI</h3>
        <p class="text-sm text-slate-600">Learn the core fundamentals: generative AI, machine learning, data, automation and AI applications. Build enough clarity to make informed learning choices.</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <h3 class="text-base font-bold text-slate-900 mb-1">Step 2: Choose a Direction</h3>
        <p class="text-sm text-slate-600">Identify the work that interests you: writing, numbers, business, design, technology, research or marketing. Your choice determines how deep you need to go into AI.</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <h3 class="text-base font-bold text-slate-900 mb-1">Step 3: Build the Foundation</h3>
        <p class="text-sm text-slate-600">Select complementary skill pairings (e.g. Content → Writing + SEO + AI; Marketing → Marketing + Analytics + AI; Tech → Python + ML + Cloud).</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <h3 class="text-base font-bold text-slate-900 mb-1">Step 4: Use AI to Practise</h3>
        <p class="text-sm text-slate-600">Move from passive video consumption to active implementation: ask questions, analyse datasets, build small workflows and evaluate outputs.</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <h3 class="text-base font-bold text-slate-900 mb-2">Step 5: Build a Practical Project</h3>
        <p class="text-sm text-slate-600 mb-2">Build something small that solves a real problem. Examples:</p>
        <ul class="text-sm space-y-1 text-slate-700">
            <li><strong>AI Study Assistant:</strong> Document question-answering tool for academic notes.</li>
            <li><strong>Content Research Workflow:</strong> Systematic keyword intent & brief builder.</li>
            <li><strong>Business Data Assistant:</strong> Workflow analysing public datasets to generate reports.</li>
            <li><strong>AI Marketing Assistant:</strong> Customer segment ideation and messaging planner.</li>
        </ul>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <h3 class="text-base font-bold text-slate-900 mb-2">Step 6: Turn the Project Into Portfolio Evidence</h3>
        <p class="text-sm text-slate-600">Document the problem, approach, tools, your individual contribution, results, limitations and lessons learned. This gives you tangible talking points in any job interview.</p>
    </div>
</div>`
            }
        },

        // Section 8
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'The Real Opportunity Is Not the GPU'
            }
        },
        {
            id: genId(),
            type: 'quote',
            data: {
                text: 'A GPU is infrastructure. It gives you computing power. It does not give you curiosity, problem-solving ability, domain knowledge, programming ability, communication skills, judgment, project experience, or portfolio evidence. Those are things you have to build.',
                author: 'VBS Digital Career Guidance'
            }
        },
        {
            id: genId(),
            type: 'callout',
            data: {
                style: 'info',
                text: `The Practical AI Career Progression:

Career direction
↓
Choose the right skill combination
↓
Learn the fundamentals
↓
Use AI tools
↓
Practise & build a project
↓
Document work & create portfolio evidence
↓
Explore internships, jobs, freelance work or advanced roles

This is a much stronger pathway than: See AI trend → Buy course → Collect certificate → Wait for job.`
            }
        },

        // Section 9
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'What This Means for India\'s Students'
            }
        },
        {
            id: genId(),
            type: 'text',
            data: {
                html: `<p>India's AI infrastructure is expanding rapidly.</p>
<p>The India AI Mission has a broad mandate covering compute, datasets, application development, future skills, startup financing and safe and trusted AI. The government has also said that more than 38,000 GPUs have been onboarded for common compute facilities, with affordable access being offered to academia and other eligible users.</p>
<p>The 10,571 figure is therefore one part of a much larger movement.</p>
<p>But infrastructure alone doesn't create an AI-ready workforce. <strong>People do.</strong></p>
<p>And that means students don't need to wait for the future of AI to arrive. They can start by asking a much simpler question:</p>
<p class="text-xl font-bold text-slate-900">What can I learn, practise and build today that will make me more capable tomorrow?</p>
<p>That is the question worth answering.</p>`
            }
        },

        // Section 10 - FAQ
        {
            id: genId(),
            type: 'header',
            data: {
                level: 2,
                text: 'Frequently Asked Questions'
            }
        },
        {
            id: genId(),
            type: 'faq',
            data: {
                items: [
                    {
                        q: 'What are the 10,571 GPUs for AI education in India?',
                        a: 'The 10,571 figure refers to GPUs allocated through the IndiaAI Compute initiative. The programme provides eligible users, including students and academia, access to subsidised AI computing capacity through empanelled cloud providers.'
                    },
                    {
                        q: 'Can Indian students access IndiaAI Compute GPUs?',
                        a: 'Eligible students can apply for access to IndiaAI Compute resources subject to the programme\'s eligibility requirements and access process.'
                    },
                    {
                        q: 'Do all college students automatically get access to the 10,571 GPUs?',
                        a: 'No. The availability of GPUs through IndiaAI Compute does not mean that every college student automatically receives access. Students and institutions must meet the applicable eligibility and access requirements.'
                    },
                    {
                        q: 'Do I need a powerful computer to learn AI?',
                        a: 'Not necessarily. Many AI learning activities can be performed using cloud-based tools and platforms. Access to cloud computing can also reduce the need for students to own expensive specialised hardware.'
                    },
                    {
                        q: 'Do I need to learn Python to build an AI career?',
                        a: 'Python is highly useful for technical AI and machine-learning careers, but not every AI-related career requires programming. Students can combine AI with fields such as marketing, content, design, business, analytics and other disciplines.'
                    },
                    {
                        q: 'Can commerce, arts and business students build AI-related careers?',
                        a: 'Yes. AI can be combined with domain skills in areas such as marketing, content, business, design, research and analytics. Students do not necessarily need to become AI engineers to develop AI-related capabilities.'
                    },
                    {
                        q: 'What is the difference between AI literacy and AI capability?',
                        a: 'AI literacy means understanding what AI is, what it can do and where its limitations lie. AI capability goes further by applying AI to real tasks, solving problems, building projects and demonstrating practical results.'
                    },
                    {
                        q: 'What AI skills should students learn in 2026?',
                        a: 'Students should develop AI literacy, AI-assisted productivity, analytical thinking, responsible AI practices and the ability to combine AI with a useful domain skill. Technical students can also develop programming, data and machine-learning capabilities.'
                    },
                    {
                        q: 'How can students build AI experience without an internship?',
                        a: 'Students can build experience by completing practical projects, documenting how they used AI, publishing their work, creating portfolio evidence and explaining the problems they solved and the results they achieved.'
                    },
                    {
                        q: 'Is getting an AI certificate enough to build an AI career?',
                        a: 'A certificate can demonstrate that you completed a course, but it does not by itself demonstrate practical capability. Projects, applied skills and portfolio evidence can provide stronger evidence of what you can actually do.'
                    },
                    {
                        q: 'What should a student do after learning basic AI?',
                        a: 'After learning the fundamentals, students should choose a direction, practise using AI in that domain, build a practical project, document the process and turn the result into portfolio evidence.'
                    },
                    {
                        q: 'What is the IndiaAI Mission?',
                        a: 'IndiaAI is a national initiative focused on strengthening India\'s artificial intelligence ecosystem, including areas such as AI compute infrastructure, datasets, skills, innovation and responsible AI.'
                    }
                ]
            }
        }
    ]

    const postData = {
        title: '10,571 GPUs for AI Education: What Does It Mean for Students and Their Careers?',
        h1: '10,571 GPUs for AI Education: What Does It Mean for Students and Their Careers?',
        slug: '10571-gpus-ai-education-students-careers',
        metaTitle: '10,571 GPUs for AI Education: What It Means for Students',
        metaDesc: "India's 10,571-GPU allocation could expand access to AI computing. Here's what it means for students, skills, projects and AI careers.",
        excerpt: '10,571 GPUs. What does this mean for you?',
        featuredImg: '/images/blog/gpu-ai-education-students.jpg',
        featuredImgAlt: 'Students learning AI using GPU-powered computing infrastructure in India',
        readTimeMinutes: 9,
        isPublished: true,
        showToc: true,
        publishedAt: new Date('2026-09-28T16:21:00.000Z'),
        categoryId: category.id,
        authorId: author.id,
        content: JSON.stringify(blocks),
    }

    const existing = await prisma.post.findUnique({
        where: { slug: postData.slug }
    })

    let post
    if (existing) {
        post = await prisma.post.update({
            where: { id: existing.id },
            data: {
                ...postData,
                tags: {
                    set: tags.map((t) => ({ id: t.id }))
                }
            }
        })
    } else {
        post = await prisma.post.create({
            data: {
                ...postData,
                tags: {
                    connect: tags.map((t) => ({ id: t.id }))
                }
            }
        })
    }

    console.log('✅ Post updated with clean TOC structure!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

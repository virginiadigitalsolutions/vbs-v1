// This file defines the predefined section templates available in the Admin Panel.
// It uses the standard generic section types (hero, text, cards, cta) but leverages
// the custom 'layout' property to render premium designs via SectionRenderer.

export const SECTION_TEMPLATES = [
    // ════════ HOME PAGES ════════
    {
        id: 'home_hero_gradient',
        name: 'Homepage: Deep Gradient Hero',
        category: 'hero',
        description: 'Immersive dark hero with animated gradient orbs and grid pattern.',
        type: 'hero',
        data: {
            layout: 'home_hero',
            tag: "Virginia Business Solutions",
            heading: "Make Smarter Decisions About|Digital Skills, Courses, and Careers",
            subheading: "Clear guidance for students and working professionals in India - without hype or shortcuts",
            image: "/images/home/hero-career.png",
            ctaText: "Explore Digital Skills",
            ctaHref: "/digital-skills",
            secondaryCtaText: "Learn About Us",
            secondaryCtaHref: "/about-us",
            highlights: [
                "Clear career direction",
                "Practical learning paths",
                "Guidance for India-based learners"
            ]
        }
    },
    {
        id: 'home_audience_cards',
        name: 'Homepage: Audience Target Cards',
        category: 'cards',
        description: 'Three distinct cards targeted at different user segments with checklist points.',
        type: 'cards',
        data: {
            layout: 'home_audience',
            heading: "Who We Help",
            cards: [
                { title: "Students", icon: "HiOutlineAcademicCap", image: "/images/home/audience-student.png", description: "You are exploring digital careers and want to understand where to begin. Countless skills compete for your attention." },
                { title: "Early Career Professionals", icon: "HiOutlineBriefcase", image: "/images/home/audience-early-career.png", description: "You have entered the workforce and want to strengthen your direction. Certifications promise growth, but not all paths move you forward." },
                { title: "Working Professionals", icon: "HiOutlineUserGroup", image: "/images/home/audience-professional.png", description: "You are considering upskilling or transitioning into a digital role. The landscape is evolving quickly." }
            ]
        }
    },
    {
        id: 'home_framework_grid',
        name: 'Homepage: Feature Framework Grid',
        category: 'cards',
        description: 'Three large cards linking out to pillar pages with deep hover states.',
        type: 'cards',
        data: {
            layout: 'home_framework',
            tag: "Our Approach",
            heading: "A Clear Framework for Smarter Career Decisions",
            subheading: "Instead of chasing trends or reacting to noise, a structured approach helps you understand what to learn.",
            cards: [
                { title: "Digital Skills", icon: "HiOutlineLightningBolt", image: "/images/home/hero-career.png", stepLabel: "Step 1", kicker: "Understand the Skill", ctaText: "Explore Skills", description: "Understand which digital skills are foundational and which are temporary trends.", href: "/digital-skills" },
                { title: "Courses & Certifications", icon: "HiOutlineBookOpen", image: "/images/home/challenge-confusion.png", stepLabel: "Step 2", kicker: "Choose the Course", ctaText: "Compare Courses", description: "Evaluate learning paths with clarity. Compare free and paid options.", href: "/courses-certifications" },
                { title: "Career Guides", icon: "HiOutlineTrendingUp", image: "/images/home/audience-professional.png", stepLabel: "Step 3", kicker: "Map the Career", ctaText: "See Career Guides", description: "See how skills and courses translate into career pathways.", href: "/career-guides" }
            ]
        }
    },

    // ════════ DIGITAL SKILLS PAGES ════════
    {
        id: 'ds_hero_pulse',
        name: 'Skills: Pulsing Hero',
        category: 'hero',
        description: 'Dark hero banner with pulsing background elements and dual CTAs.',
        type: 'hero',
        data: {
            layout: 'ds_hero',
            tag: "Virginia Business Solutions",
            heading: "Choosing the Right Digital|Skills for Long-Term Growth",
            subheading: "Understand which digital skills matter and how they shape real careers",
            ctaText: "Explore Courses →",
            ctaHref: "/courses-certifications",
            secondaryCtaText: "View Career Guides",
            secondaryCtaHref: "/career-guides"
        }
    },
    {
        id: 'ds_skill_clusters',
        name: 'Skills: Core Skill Clusters',
        category: 'cards',
        description: 'Complex card layout with icons, descriptions, and a "Best suited for" subtext block.',
        type: 'cards',
        data: {
            layout: 'ds_skill_clusters',
            tag: "Explore Clusters",
            heading: "Core Digital Skill Clusters",
            subheading: "Instead of focusing on individual tools, understand how different skills function.",
            cards: [
                { title: "Marketing & Growth", icon: "HiOutlineTrendingUp", description: "These skills focus on visibility, acquisition, and measurable performance.", suited: "Individuals who prefer strategic thinking and outcome-based work." },
                { title: "Data & Analytics", icon: "HiOutlineChartBar", description: "Data-oriented skills revolve around interpreting performance metrics.", suited: "Individuals who prefer logical frameworks and structured problem-solving." }
            ],
            footerText: "Understanding these clusters is the first step."
        }
    },
    {
        id: 'ds_evaluation_cards',
        name: 'Skills: Evaluation Box List',
        category: 'cards',
        description: 'Dark themed vertical list of styled cards with icons.',
        type: 'cards',
        data: {
            layout: 'ds_evaluation',
            tag: "Before You Commit",
            heading: "How to Evaluate a Digital Skill",
            subheading: "Choosing a skill requires examining how sustainable and transferable that skill will be over time.",
            cards: [
                { title: "Is It Foundational or Tool-Specific?", icon: "HiOutlineShieldCheck", description: "Foundational skills remain valuable even as tools change." },
                { title: "Does It Build Transferable Thinking?", icon: "HiOutlineCube", description: "Strong digital skills develop problem-solving ability, not just platform familiarity." }
            ]
        }
    },
    {
        id: 'ds_where_next',
        name: 'Skills: Where to Go Next Block',
        category: 'cards',
        description: 'Side-by-side large CTA cards offering direct pathways.',
        type: 'cards',
        data: {
            layout: 'ds_where_next',
            heading: "Where to Go Next",
            subheading: "Once you have identified which skill cluster aligns with your interests, the next step is structured learning.",
            cards: [
                { title: "Courses & Certifications", icon: "HiOutlineAcademicCap", description: "Explore curated learning paths that build depth.", url: "/courses-certifications" },
                { title: "Career Guides", icon: "HiOutlineTrendingUp", description: "Understand how specific skills translate into real roles.", url: "/career-guides" }
            ],
            footerText: ""
        }
    },

    // ════════ COURSES & CERTIFICATIONS PAGES ════════
    {
        id: 'courses_hero',
        name: 'Courses: Structured Learning Hero',
        category: 'hero',
        description: 'Immersive dark hero emphasizing structured steps.',
        type: 'hero',
        data: {
            layout: 'courses_hero',
            tag: "Virginia Business Solutions",
            heading: "Structured Learning Paths|for Real Skill Development",
            subheading: "Move from foundational knowledge to applied competence with clear pathways.",
            ctaText: "View Learning Stages ↓",
            ctaHref: "#learning-progression",
            secondaryCtaText: "Explore Career Guides",
            secondaryCtaHref: "/career-guides"
        }
    },
    {
        id: 'courses_progression',
        name: 'Courses: Progression Stages',
        category: 'cards',
        description: 'Detailed 3-column progression map detailing level, objective, approach, and suitability.',
        type: 'cards',
        data: {
            layout: 'courses_progression',
            tag: "The Roadmap",
            heading: "A Structured Learning Progression",
            subheading: "Digital learning works best when approached in stages.",
            cards: [
                { title: "Foundational Exposure", level: "Beginner Stage", icon: "HiOutlineSearchCircle", description: "At this level, the objective is clarity and orientation." },
                { title: "Applied Skill Development", level: "Intermediate Stage", icon: "HiOutlineBriefcase", description: "Here, the focus shifts from theory to structured practice." },
                { title: "Professional Positioning", level: "Advanced Stage", icon: "HiOutlineStar", description: "At this stage, learning becomes specialized." }
            ]
        }
    },
    {
        id: 'courses_free_paid',
        name: 'Courses: Free vs Paid Comparison',
        category: 'text',
        description: 'Dark-themed split container detailing free and paid investments with a large highlight callout box.',
        type: 'text',
        data: {
            layout: 'courses_free_paid',
            tag: "Investment",
            heading: "Free vs Paid Learning: Making the Right Choice",
            body: "<p>Free resources are effective when the goal is exploration or foundational clarity.</p>",
            listTitle: "Paid programs become valuable when:",
            checklist: [
                "Structured curriculum is required",
                "Project-based validation matters",
                "Mentorship or feedback is important",
                "Credentials influence hiring decisions"
            ],
            cardHighlight: "The decision should reflect your stage, not marketing pressure.",
            cardDescription: "Use free resources to build a foundation. Invest in paid programs to validate expertise."
        }
    },
    {
        id: 'courses_eval_mistakes',
        name: 'Courses: Evaluation & Mistakes Split',
        category: 'cards',
        description: 'Side by side split list detailing criteria on the left and common mistakes on the right.',
        type: 'cards',
        data: {
            layout: 'courses_eval_mistakes',
            leftHeading: "How to Evaluate Any Course",
            leftSubheading: "Consider evaluating the program through these key questions.",
            leftList: [
                "Is the curriculum transparent and structured?",
                "Does it include practical application?",
                "Are learning outcomes clearly defined?"
            ],
            leftFooter: "Evaluating courses with discipline prevents wasted effort.",
            rightHeading: "Common Mistakes in Course Selection",
            rightSubheading: "Many learners fall into these traps.",
            rightCards: [
                { title: "Enroll in advanced programs too early", icon: "HiOutlineExclamationCircle" },
                { title: "Prioritize completion over comprehension", icon: "HiOutlinePlay" }
            ],
            rightFooter: "Structured progression reduces these risks."
        }
    },

    // ════════ CAREER GUIDES PAGES ════════
    {
        id: 'career_hero',
        name: 'Careers: Pathways Hero',
        category: 'hero',
        description: 'Immersive dark hero banner discussing where skills can lead.',
        type: 'hero',
        data: {
            layout: 'career_hero',
            tag: "Virginia Business Solutions",
            heading: "Understand Where Digital Skills|Can Take You",
            subheading: "Explore real digital career paths, role expectations, and growth potential.",
            ctaText: "Explore Career Paths ↓",
            ctaHref: "#career-progression",
            secondaryCtaText: "View Digital Skills",
            secondaryCtaHref: "/digital-skills"
        }
    },
    {
        id: 'career_progression',
        name: 'Careers: Role Progression Timeline',
        category: 'cards',
        description: 'Vertical progression stack for Entry, Mid, and Senior roles highlighting focus shifts.',
        type: 'cards',
        data: {
            layout: 'career_progression',
            tag: "The Timeline",
            heading: "Career Progression by Stage",
            subheading: "Growth in digital careers follows a progression from execution to ownership.",
            cards: [
                { title: "Entry-Level Roles", subtitle: "You as a FRESHER", icon: "HiOutlineUserAdd", description: "This is where careers begin, learning how things work.", focus: "Building confidence through consistent execution." },
                { title: "Mid-Level Roles", subtitle: "Moving to Ownership", icon: "HiOutlineTrendingUp", description: "Moving from doing tasks to owning outcomes.", focus: "Growth comes from accountability and measurable impact." }
            ]
        }
    },
    {
        id: 'career_aligning',
        name: 'Careers: Aligning CTA Block',
        category: 'cta',
        description: 'A dark, premium 3-step timeline block aiming to align disciplines.',
        type: 'cta',
        data: {
            layout: 'career_aligning',
            heading: "Aligning Skills, Courses, and Career Direction",
            subheading: "Strong career progression begins with choosing the right skill foundation and building it through structured learning.",
            cards: [
                { title: "Understanding digital skills provides clarity at the starting point." },
                { title: "Structured courses strengthen application." },
                { title: "Career awareness aligns those efforts with long-term outcomes." }
            ],
            footerText: "When these three elements connect, progression becomes intentional."
        }
    },

    // ════════ GENERIC REUSABLE LAYOUTS ════════

    // ─── Testimonials ───
    {
        id: 'generic_testimonials',
        name: 'Testimonials: Client Reviews',
        category: 'cards',
        description: 'Glassmorphism quote cards with avatar, name, role and star ratings.',
        type: 'cards',
        preview: 'testimonials',
        data: {
            layout: 'generic_testimonials',
            tag: "What People Say",
            heading: "Trusted by Professionals",
            subheading: "Hear from professionals who transformed their career with structured guidance.",
            cards: [
                { name: "Arun Sharma", role: "Digital Marketing Lead", company: "Infosys", quote: "The career roadmap helped me transition from a generalist to a specialist in under 6 months.", rating: 5, avatar: "AS" },
                { name: "Priya Menon", role: "Data Analyst", company: "TCS", quote: "I finally understood which certifications actually matter. Stopped wasting money on the wrong courses.", rating: 5, avatar: "PM" },
                { name: "Rahul Verma", role: "Cloud Engineer", company: "Wipro", quote: "The structured learning path made AWS certification feel achievable, not overwhelming.", rating: 4, avatar: "RV" }
            ]
        }
    },

    // ─── Stats Counter ───
    {
        id: 'generic_stats',
        name: 'Stats: Impact Numbers',
        category: 'cards',
        description: 'Large animated counter cards showing key metrics and impact numbers.',
        type: 'cards',
        preview: 'stats',
        data: {
            layout: 'generic_stats',
            tag: "Our Impact",
            heading: "Numbers That Speak",
            cards: [
                { value: "10,000+", label: "Career Paths Explored", icon: "HiOutlineTrendingUp" },
                { value: "500+", label: "Courses Reviewed", icon: "HiOutlineBookOpen" },
                { value: "50+", label: "Industry Partnerships", icon: "HiOutlineBriefcase" },
                { value: "95%", label: "Satisfaction Rate", icon: "HiOutlineStar" }
            ]
        }
    },

    // ─── FAQ Accordion ───
    {
        id: 'generic_faq',
        name: 'FAQ: Accordion Section',
        category: 'text',
        description: 'Expandable FAQ items with clean accordion animation and category badges.',
        type: 'text',
        preview: 'faq',
        data: {
            layout: 'generic_faq',
            tag: "Common Questions",
            heading: "Frequently Asked Questions",
            subheading: "Everything you need to know about getting started.",
            items: [
                { question: "How do I choose the right digital skill?", answer: "Start by understanding your natural inclinations — whether creative, analytical, or technical. Our Career Roadmap tool helps you explore all three tracks.", category: "Getting Started" },
                { question: "Are free courses enough to get a job?", answer: "Free courses build foundational knowledge, but employers often look for structured certifications and project portfolios. We recommend a hybrid approach.", category: "Courses" },
                { question: "How long does it take to switch careers?", answer: "A focused transition typically takes 6-18 months depending on your starting point and target role. Our skill quiz can assess your current level.", category: "Career Change" },
                { question: "Do you offer personal mentoring?", answer: "Yes, we connect learners with industry professionals for guidance. Contact us for mentoring availability.", category: "Support" },
                { question: "What industries do your guides cover?", answer: "Our guides span Digital Marketing, Data & Analytics, Cloud & DevOps, UI/UX Design, and more. Each is researched against real job market data.", category: "Content" }
            ]
        }
    },

    // ─── Team Grid ───
    {
        id: 'generic_team',
        name: 'Team: Members Grid',
        category: 'cards',
        description: 'Grid of team member cards with photo placeholder, name, role and social links.',
        type: 'cards',
        preview: 'team',
        data: {
            layout: 'generic_team',
            tag: "Our Team",
            heading: "Meet the People Behind VBS",
            subheading: "A team of industry professionals, educators, and career coaches.",
            cards: [
                { name: "Rajesh Kumar", role: "Founder & Career Strategist", bio: "15+ years in digital transformation. Passionate about making career guidance accessible.", initials: "RK" },
                { name: "Ananya Desai", role: "Head of Content", bio: "Former EdTech lead. Specializes in curriculum design and learning outcomes.", initials: "AD" },
                { name: "Vikram Singh", role: "Technology Lead", bio: "Full-stack engineer focused on building tools that simplify career decisions.", initials: "VS" },
                { name: "Meera Patel", role: "Career Coach", bio: "Certified career counselor with expertise in digital industry transitions.", initials: "MP" }
            ]
        }
    },

    // ─── Feature Showcase ───
    {
        id: 'generic_features',
        name: 'Features: Icon Grid Showcase',
        category: 'cards',
        description: '6-column icon-based feature grid with descriptions and hover animations.',
        type: 'cards',
        preview: 'features',
        data: {
            layout: 'generic_features',
            tag: "Why Choose Us",
            heading: "Everything You Need to Succeed",
            subheading: "Built with one goal — helping you make informed career decisions.",
            cards: [
                { title: "Curated Content", icon: "HiOutlineBookOpen", description: "Every guide is researched against real job market data." },
                { title: "Interactive Tools", icon: "HiOutlineLightningBolt", description: "Career roadmaps and skill quizzes bring clarity." },
                { title: "Industry Aligned", icon: "HiOutlineBriefcase", description: "Content built around what employers actually value." },
                { title: "Free to Explore", icon: "HiOutlineStar", description: "Core resources are always free and accessible." },
                { title: "Expert Reviews", icon: "HiOutlineShieldCheck", description: "Courses evaluated by working professionals." },
                { title: "Community Driven", icon: "HiOutlineUserGroup", description: "Learn alongside a growing community of professionals." }
            ]
        }
    },

    // ─── Pricing / Comparison ───
    {
        id: 'generic_pricing',
        name: 'Pricing: Comparison Cards',
        category: 'cards',
        description: 'Side-by-side pricing/plan comparison cards with feature lists and CTA buttons.',
        type: 'cards',
        preview: 'pricing',
        data: {
            layout: 'generic_pricing',
            tag: "Plans",
            heading: "Choose Your Learning Path",
            subheading: "Start free, upgrade when you are ready for structured guidance.",
            cards: [
                { title: "Explorer", price: "Free", period: "forever", description: "Perfect for getting started", features: ["Career Roadmap Access", "Skill Quiz", "Blog & Guides", "Community Access"], ctaText: "Start Free", ctaHref: "/career-roadmap", highlighted: false },
                { title: "Professional", price: "₹999", period: "/month", description: "For serious career builders", features: ["Everything in Explorer", "1-on-1 Mentoring Sessions", "Resume Reviews", "Priority Support", "Exclusive Workshops"], ctaText: "Get Started", ctaHref: "/contact", highlighted: true },
                { title: "Enterprise", price: "Custom", period: "", description: "For teams and organizations", features: ["Everything in Professional", "Custom Training Programs", "Bulk Assessments", "Dedicated Account Manager", "API Access"], ctaText: "Contact Us", ctaHref: "/contact", highlighted: false }
            ]
        }
    },

    // ─── Logo Cloud ───
    {
        id: 'generic_logos',
        name: 'Logos: Partner/Client Cloud',
        category: 'cards',
        description: 'Scrolling logo cloud section showing partner or certification brands.',
        type: 'cards',
        preview: 'logos',
        data: {
            layout: 'generic_logos',
            heading: "Recognized by Leading Platforms",
            cards: [
                { name: "Google" }, { name: "AWS" }, { name: "Microsoft" },
                { name: "HubSpot" }, { name: "Meta" }, { name: "Coursera" },
                { name: "LinkedIn Learning" }, { name: "Udemy" }
            ]
        }
    },

    // ─── Timeline ───
    {
        id: 'generic_timeline',
        name: 'Timeline: Milestone Steps',
        category: 'text',
        description: 'Vertical timeline with alternating left/right milestone nodes and descriptions.',
        type: 'text',
        preview: 'timeline',
        data: {
            layout: 'generic_timeline',
            tag: "Our Journey",
            heading: "How We Got Here",
            items: [
                { year: "2020", title: "The Idea", description: "Started as a blog helping students navigate digital career choices." },
                { year: "2021", title: "Building Foundation", description: "Launched comprehensive guides for 5 major digital skill areas." },
                { year: "2022", title: "Growing Community", description: "Reached 10,000+ monthly readers and launched mentoring program." },
                { year: "2023", title: "Platform Launch", description: "Built the interactive Career Roadmap and Skill Quiz tools." },
                { year: "2024", title: "Industry Partnerships", description: "Partnered with 50+ companies for placement and training." }
            ]
        }
    },

    // ─── Split Image + Text ───
    {
        id: 'generic_split_content',
        name: 'Content: Split Image + Text',
        category: 'text',
        description: 'Side-by-side layout with image on one side and rich text content on the other.',
        type: 'text',
        preview: 'split',
        data: {
            layout: 'generic_split_content',
            tag: "About This",
            heading: "Learn with Structure, Grow with Confidence",
            body: "<p>Our approach combines <strong>industry research</strong> with <strong>practical tools</strong> to help you make informed decisions about your digital career.</p><p>Unlike generic advice, every recommendation is backed by real job market data and validated by working professionals.</p>",
            checklist: [
                "Research-backed career guides",
                "Interactive assessment tools",
                "Expert-reviewed course recommendations",
                "Community of 10,000+ professionals"
            ],
            ctaText: "Get Started →",
            ctaHref: "/career-roadmap",
            imagePosition: "right"
        }
    },

    // ─── Newsletter Banner ───
    {
        id: 'generic_newsletter',
        name: 'CTA: Newsletter Banner',
        category: 'cta',
        description: 'Full-width gradient banner with email subscription form.',
        type: 'cta',
        preview: 'newsletter',
        data: {
            layout: 'generic_newsletter',
            heading: "Stay Ahead of the Curve",
            subheading: "Weekly insights on digital skills, curated courses, and career opportunities.",
            ctaText: "Subscribe",
            placeholder: "Enter your email"
        }
    },

    // ─── Contact CTA ───
    {
        id: 'generic_contact_cta',
        name: 'CTA: Contact Us Banner',
        category: 'cta',
        description: 'Premium dark CTA section with heading, description and dual action buttons.',
        type: 'cta',
        preview: 'contact_cta',
        data: {
            layout: 'generic_contact_cta',
            tag: "Ready to Start?",
            heading: "Let's Build Your Career Path Together",
            subheading: "Whether you are just starting or looking to transition, we are here to help you find the right direction.",
            ctaText: "Get in Touch",
            ctaHref: "/contact",
            secondaryCtaText: "Take Skill Quiz",
            secondaryCtaHref: "/skill-quiz"
        }
    },

    // ─── Icon Feature Grid ───
    {
        id: 'generic_icon_grid',
        name: 'Grid: Icon Feature List',
        category: 'cards',
        description: 'Clean 2x3 grid with large icons, titles, and short descriptions.',
        type: 'cards',
        preview: 'icon_grid',
        data: {
            layout: 'generic_icon_grid',
            tag: "How It Works",
            heading: "Simple Steps to Clarity",
            cards: [
                { title: "Take the Quiz", icon: "HiOutlineLightningBolt", description: "Assess your interests and discover your ideal career track." },
                { title: "Explore Roadmaps", icon: "HiOutlineLocationMarker", description: "See the exact skills, roles, and timeline for your chosen path." },
                { title: "Learn & Build", icon: "HiOutlineBookOpen", description: "Follow curated courses and build a portfolio that matters." },
                { title: "Get Mentored", icon: "HiOutlineUserGroup", description: "Connect with industry professionals for guidance." },
                { title: "Track Progress", icon: "HiOutlineChartBar", description: "Monitor your skill growth and career readiness." },
                { title: "Land Your Role", icon: "HiOutlineBriefcase", description: "Apply with confidence, backed by real skills and clarity." }
            ]
        }
    },
    {
        id: 'learning_hub_hero',
        name: 'Learning Hub: Hero + Featured Article',
        category: 'hero',
        description: 'Search hero with featured article highlight, editable from CMS while still pulling live post data.',
        type: 'hero',
        data: {
            layout: 'learning_hub_hero',
            tag: 'Learning Hub',
            heading: 'Search the Learning Hub and dive into the latest build notes.',
            subheading: 'Filter by category, search by topic, and jump into practical articles from the VBS team.',
            searchPlaceholder: 'Search the Learning Hub',
            featuredLabel: 'Featured article',
            featuredCtaText: 'Read article'
        }
    },
    {
        id: 'learning_hub_feed',
        name: 'Learning Hub: Dynamic Article Feed',
        category: 'cards',
        description: 'Dynamic article card grid and category sidebar fed by published Learning Hub posts.',
        type: 'cards',
        data: {
            layout: 'learning_hub_feed',
            tag: 'Engineering Notes',
            heading: 'Latest articles from the Learning Hub',
            subheading: 'Browse the newest practical articles, guides, and breakdowns from the VBS team.',
            categoriesLabel: 'Categories',
            allTopicsLabel: 'All Topics',
            clearLabel: 'Clear',
            readButtonText: 'Read',
            emptyTitle: 'No Posts Found',
            emptyText: 'We couldn&apos;t find any articles matching your current filter.',
            clearFiltersText: 'Clear Filters'
        }
    },
]


import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import CTASection from '@/components/sections/CTASection'
import CardsSection from '@/components/sections/CardsSection'
import TextSection from '@/components/sections/TextSection'

// Skeleton placeholder — prevents CLS while dynamic layout chunks load
const SectionSkeleton = () => <div className="min-h-[300px]" aria-hidden="true" />

// Custom Layouts — dynamically imported so only the needed file is downloaded per page.
// Each layout file is ~30-40KB; bundling all 7 eagerly was ~250KB of extra initial JS.
//
// NOTE: next/dynamic options MUST be an inline object literal (not a variable).
// Next.js statically analyses these calls to build the chunk manifest at compile time.

const DigitalSkillsLayouts = {
    DSHero:          dynamic(() => import('./sections/layouts/DigitalSkillsLayouts').then(m => m.DSHero),          { loading: SectionSkeleton }),
    DSSkillClusters: dynamic(() => import('./sections/layouts/DigitalSkillsLayouts').then(m => m.DSSkillClusters), { loading: SectionSkeleton }),
    DSEvaluation:    dynamic(() => import('./sections/layouts/DigitalSkillsLayouts').then(m => m.DSEvaluation),    { loading: SectionSkeleton }),
    DSAIImpact:      dynamic(() => import('./sections/layouts/DigitalSkillsLayouts').then(m => m.DSAIImpact),      { loading: SectionSkeleton }),
    DSMistakes:      dynamic(() => import('./sections/layouts/DigitalSkillsLayouts').then(m => m.DSMistakes),      { loading: SectionSkeleton }),
    DSWhereNext:     dynamic(() => import('./sections/layouts/DigitalSkillsLayouts').then(m => m.DSWhereNext),     { loading: SectionSkeleton }),
}

const CoursesLayouts = {
    CoursesHero:            dynamic(() => import('./sections/layouts/CoursesLayouts').then(m => m.CoursesHero),            { loading: SectionSkeleton }),
    CoursesIntro:           dynamic(() => import('./sections/layouts/CoursesLayouts').then(m => m.CoursesIntro),           { loading: SectionSkeleton }),
    CoursesStructure:       dynamic(() => import('./sections/layouts/CoursesLayouts').then(m => m.CoursesStructure),       { loading: SectionSkeleton }),
    CoursesProgression:     dynamic(() => import('./sections/layouts/CoursesLayouts').then(m => m.CoursesProgression),     { loading: SectionSkeleton }),
    CoursesFreePaid:        dynamic(() => import('./sections/layouts/CoursesLayouts').then(m => m.CoursesFreePaid),        { loading: SectionSkeleton }),
    CoursesEvalAndMistakes: dynamic(() => import('./sections/layouts/CoursesLayouts').then(m => m.CoursesEvalAndMistakes), { loading: SectionSkeleton }),
    CoursesConnecting:      dynamic(() => import('./sections/layouts/CoursesLayouts').then(m => m.CoursesConnecting),      { loading: SectionSkeleton }),
}

const CareerLayouts = {
    CareerHero:         dynamic(() => import('./sections/layouts/CareerLayouts').then(m => m.CareerHero),         { loading: SectionSkeleton }),
    CareerIntro:        dynamic(() => import('./sections/layouts/CareerLayouts').then(m => m.CareerIntro),        { loading: SectionSkeleton }),
    CareerWhyClarity:   dynamic(() => import('./sections/layouts/CareerLayouts').then(m => m.CareerWhyClarity),   { loading: SectionSkeleton }),
    CareerProgression:  dynamic(() => import('./sections/layouts/CareerLayouts').then(m => m.CareerProgression),  { loading: SectionSkeleton }),
    CareerGrowth:       dynamic(() => import('./sections/layouts/CareerLayouts').then(m => m.CareerGrowth),       { loading: SectionSkeleton }),
    CareerAIAndMistakes:dynamic(() => import('./sections/layouts/CareerLayouts').then(m => m.CareerAIAndMistakes),{ loading: SectionSkeleton }),
    CareerAligning:     dynamic(() => import('./sections/layouts/CareerLayouts').then(m => m.CareerAligning),     { loading: SectionSkeleton }),
}

const HomeLayouts = {
    HomeHero:      dynamic(() => import('./sections/layouts/HomeLayouts').then(m => m.HomeHero),      { loading: SectionSkeleton }),
    HomeAudience:  dynamic(() => import('./sections/layouts/HomeLayouts').then(m => m.HomeAudience),  { loading: SectionSkeleton }),
    HomeChallenge: dynamic(() => import('./sections/layouts/HomeLayouts').then(m => m.HomeChallenge), { loading: SectionSkeleton }),
    HomeFramework: dynamic(() => import('./sections/layouts/HomeLayouts').then(m => m.HomeFramework), { loading: SectionSkeleton }),
    HomeStandards: dynamic(() => import('./sections/layouts/HomeLayouts').then(m => m.HomeStandards), { loading: SectionSkeleton }),
    HomeFaq:       dynamic(() => import('./sections/layouts/HomeLayouts').then(m => m.HomeFaq),       { loading: SectionSkeleton }),
}

const AboutLayouts = {
    AboutHero:      dynamic(() => import('./sections/layouts/AboutLayouts').then(m => m.AboutHero),      { loading: SectionSkeleton }),
    AboutIntro:     dynamic(() => import('./sections/layouts/AboutLayouts').then(m => m.AboutIntro),     { loading: SectionSkeleton }),
    AboutAudience:  dynamic(() => import('./sections/layouts/AboutLayouts').then(m => m.AboutAudience),  { loading: SectionSkeleton }),
    AboutApproach:  dynamic(() => import('./sections/layouts/AboutLayouts').then(m => m.AboutApproach),  { loading: SectionSkeleton }),
    AboutDifferent: dynamic(() => import('./sections/layouts/AboutLayouts').then(m => m.AboutDifferent), { loading: SectionSkeleton }),
    AboutCTA:       dynamic(() => import('./sections/layouts/AboutLayouts').then(m => m.AboutCTA),       { loading: SectionSkeleton }),
}

const ContactLayouts = {
    ContactHero:        dynamic(() => import('./sections/layouts/ContactLayouts').then(m => m.ContactHero),        { loading: SectionSkeleton }),
    ContactFormSection: dynamic(() => import('./sections/layouts/ContactLayouts').then(m => m.ContactFormSection), { loading: SectionSkeleton }),
}

const BlogLayouts = {
    BlogHero:        dynamic(() => import('./sections/layouts/BlogLayouts').then(m => m.BlogHero),        { loading: SectionSkeleton }),
    LearningHubFeed: dynamic(() => import('./sections/layouts/BlogLayouts').then(m => m.LearningHubFeed), { loading: SectionSkeleton }),
    LearningHubHero: dynamic(() => import('./sections/layouts/BlogLayouts').then(m => m.LearningHubHero), { loading: SectionSkeleton }),
}

const LAYOUT_MAP = {
    // Home
    'home_hero':       HomeLayouts.HomeHero,
    'home_audience':   HomeLayouts.HomeAudience,
    'home_challenge':  HomeLayouts.HomeChallenge,
    'home_framework':  HomeLayouts.HomeFramework,
    'home_standards':  HomeLayouts.HomeStandards,
    'home_faq':        HomeLayouts.HomeFaq,
    'generic_faq':     HomeLayouts.HomeFaq,

    // Digital Skills
    'ds_hero':          DigitalSkillsLayouts.DSHero,
    'ds_skill_clusters':DigitalSkillsLayouts.DSSkillClusters,
    'ds_evaluation':    DigitalSkillsLayouts.DSEvaluation,
    'ds_ai_impact':     DigitalSkillsLayouts.DSAIImpact,
    'ds_mistakes':      DigitalSkillsLayouts.DSMistakes,
    'ds_where_next':    DigitalSkillsLayouts.DSWhereNext,

    // Courses
    'courses_hero':          CoursesLayouts.CoursesHero,
    'courses_intro':         CoursesLayouts.CoursesIntro,
    'courses_structure':     CoursesLayouts.CoursesStructure,
    'courses_progression':   CoursesLayouts.CoursesProgression,
    'courses_free_paid':     CoursesLayouts.CoursesFreePaid,
    'courses_eval_mistakes': CoursesLayouts.CoursesEvalAndMistakes,
    'courses_connecting':    CoursesLayouts.CoursesConnecting,

    // Career Guides
    'career_hero':        CareerLayouts.CareerHero,
    'career_intro':       CareerLayouts.CareerIntro,
    'career_why_clarity': CareerLayouts.CareerWhyClarity,
    'career_progression': CareerLayouts.CareerProgression,
    'career_growth':      CareerLayouts.CareerGrowth,
    'career_ai_mistakes': CareerLayouts.CareerAIAndMistakes,
    'career_aligning':    CareerLayouts.CareerAligning,

    // About
    'about_hero':      AboutLayouts.AboutHero,
    'about_intro':     AboutLayouts.AboutIntro,
    'about_audience':  AboutLayouts.AboutAudience,
    'about_approach':  AboutLayouts.AboutApproach,
    'about_different': AboutLayouts.AboutDifferent,
    'about_cta':       AboutLayouts.AboutCTA,

    // Contact
    'contact_hero': ContactLayouts.ContactHero,
    'contact_form': ContactLayouts.ContactFormSection,

    // Blog
    'blog_hero':          BlogLayouts.BlogHero,
    'learning_hub_hero':  BlogLayouts.LearningHubHero,
    'learning_hub_feed':  BlogLayouts.LearningHubFeed,
}

export default function SectionRenderer({ sections, context = {} }) {
    if (!sections || sections.length === 0) return null

    return (
        <>
            {sections
                .filter((s) => s.isActive)
                .sort((a, b) => a.order - b.order)
                .map((section) => {
                    const LayoutComponent = section.data?.layout ? LAYOUT_MAP[section.data.layout] : null

                    if (LayoutComponent) {
                        return <LayoutComponent key={section.id} data={section.data} {...context} />
                    }

                    switch (section.type) {
                        case 'hero':  return <HeroSection  key={section.id} data={section.data} />
                        case 'cards': return <CardsSection key={section.id} data={section.data} />
                        case 'text':  return <TextSection  key={section.id} data={section.data} />
                        case 'cta':   return <CTASection   key={section.id} data={section.data} />
                        default:      return null
                    }
                })}
        </>
    )
}

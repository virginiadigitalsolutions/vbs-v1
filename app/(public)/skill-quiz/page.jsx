import { buildMetadata } from '@/lib/seo'
import SkillQuiz from '@/components/sections/SkillQuiz'

export const metadata = buildMetadata({
    title: 'Skill Quiz — Discover Your Digital Career Path',
    description: 'Take our free 10-question assessment to discover which digital career path — Marketing, Data & Analytics, or Cloud & DevOps — fits your strengths.',
    path: '/skill-quiz',
})

export default function SkillQuizPage() {
    return <SkillQuiz />
}

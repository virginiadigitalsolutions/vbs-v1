import { buildMetadata } from '@/lib/seo'
import CareerRoadmap from '@/components/sections/CareerRoadmap'

export const metadata = buildMetadata({
    title: 'Career Roadmap — Interactive Career Path Builder',
    description: 'Explore interactive career roadmaps for Digital Marketing, Data & Analytics, and Cloud & DevOps. See skills, roles, and timelines for each stage.',
    path: '/career-roadmap',
})

export default function CareerRoadmapPage() {
    return <CareerRoadmap />
}

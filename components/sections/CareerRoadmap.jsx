'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineLightningBolt, HiOutlineChartBar, HiOutlineCloud, HiOutlineCode, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineStar, HiOutlineCheckCircle } from 'react-icons/hi'
import Link from 'next/link'

const TRACKS = [
    {
        id: 'marketing',
        title: 'Digital Marketing',
        icon: HiOutlineLightningBolt,
        color: 'from-blue-500 to-cyan-500',
        accentBg: 'bg-blue-500/10',
        accentText: 'text-blue-600',
        accentBorder: 'border-blue-500/20',
        stages: [
            {
                level: 'Beginner',
                icon: HiOutlineAcademicCap,
                title: 'Foundation Explorer',
                duration: '0-6 months',
                skills: ['SEO Basics', 'Social Media Marketing', 'Content Writing', 'Google Analytics'],
                roles: ['Marketing Intern', 'Social Media Coordinator'],
                goal: 'Understand digital channels and build basic writing skills.',
            },
            {
                level: 'Intermediate',
                icon: HiOutlineBriefcase,
                title: 'Growth Practitioner',
                duration: '6-18 months',
                skills: ['Google Ads', 'Meta Ads', 'Email Marketing', 'A/B Testing', 'CRM Tools'],
                roles: ['Digital Marketing Executive', 'SEO Specialist', 'Content Strategist'],
                goal: 'Run campaigns, measure ROI, and own specific channels.',
            },
            {
                level: 'Advanced',
                icon: HiOutlineStar,
                title: 'Strategy Leader',
                duration: '18-36 months',
                skills: ['Marketing Automation', 'Attribution Modeling', 'Brand Strategy', 'Team Leadership'],
                roles: ['Growth Manager', 'Head of Marketing', 'CMO'],
                goal: 'Drive revenue through multi-channel strategies and lead teams.',
            },
        ],
    },
    {
        id: 'data',
        title: 'Data & Analytics',
        icon: HiOutlineChartBar,
        color: 'from-purple-500 to-pink-500',
        accentBg: 'bg-purple-500/10',
        accentText: 'text-purple-600',
        accentBorder: 'border-purple-500/20',
        stages: [
            {
                level: 'Beginner',
                icon: HiOutlineAcademicCap,
                title: 'Data Curious',
                duration: '0-6 months',
                skills: ['Excel/Sheets', 'SQL Basics', 'Statistics', 'Data Visualization'],
                roles: ['Data Entry Analyst', 'Junior Analyst', 'BI Assistant'],
                goal: 'Learn to query, clean, and visualize data.',
            },
            {
                level: 'Intermediate',
                icon: HiOutlineBriefcase,
                title: 'Insight Builder',
                duration: '6-18 months',
                skills: ['Python/Pandas', 'Tableau/PowerBI', 'Machine Learning Basics', 'A/B Testing'],
                roles: ['Data Analyst', 'Business Analyst', 'Analytics Engineer'],
                goal: 'Build dashboards, automate reports, and derive actionable insights.',
            },
            {
                level: 'Advanced',
                icon: HiOutlineStar,
                title: 'Decision Architect',
                duration: '18-36 months',
                skills: ['Deep Learning', 'MLOps', 'Data Engineering', 'Stakeholder Communication'],
                roles: ['Senior Data Scientist', 'Analytics Lead', 'Head of Data'],
                goal: 'Build ML models, influence business decisions, lead data teams.',
            },
        ],
    },
    {
        id: 'cloud',
        title: 'Cloud & DevOps',
        icon: HiOutlineCloud,
        color: 'from-emerald-500 to-teal-500',
        accentBg: 'bg-emerald-500/10',
        accentText: 'text-emerald-600',
        accentBorder: 'border-emerald-500/20',
        stages: [
            {
                level: 'Beginner',
                icon: HiOutlineAcademicCap,
                title: 'Cloud Explorer',
                duration: '0-6 months',
                skills: ['Linux Basics', 'Networking', 'AWS/GCP Fundamentals', 'Git'],
                roles: ['IT Support', 'Junior DevOps', 'Cloud Intern'],
                goal: 'Understand cloud infrastructure and version control.',
            },
            {
                level: 'Intermediate',
                icon: HiOutlineBriefcase,
                title: 'Infrastructure Builder',
                duration: '6-18 months',
                skills: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Terraform', 'Monitoring'],
                roles: ['DevOps Engineer', 'Cloud Engineer', 'SRE'],
                goal: 'Build, deploy, and maintain production infrastructure.',
            },
            {
                level: 'Advanced',
                icon: HiOutlineStar,
                title: 'Platform Architect',
                duration: '18-36 months',
                skills: ['Multi-Cloud Strategy', 'Security (IAM)', 'Cost Optimization', 'Architecture Design'],
                roles: ['Senior DevOps', 'Solutions Architect', 'VP of Engineering'],
                goal: 'Design scalable architectures and lead platform teams.',
            },
        ],
    },
]

export default function CareerRoadmap() {
    const [activeTrack, setActiveTrack] = useState('marketing')
    const [activeStage, setActiveStage] = useState(0)

    const track = TRACKS.find((t) => t.id === activeTrack)
    const stage = track.stages[activeStage]
    const Icon = track.icon

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="hero-dark pt-40 pb-28 relative">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 animate-pulse-soft" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-400/8 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <span className="badge badge-cyan mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">Interactive Tool</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                        Career <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-accent-400">Roadmap</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
                        Choose a career track. See the exact skills, roles, and timeline for each stage of your journey.
                    </p>
                </div>
            </section>

            {/* Track Selector */}
            <section className="py-16 relative">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {TRACKS.map((t) => {
                            const TIcon = t.icon
                            return (
                                <button
                                    key={t.id}
                                    onClick={() => { setActiveTrack(t.id); setActiveStage(0) }}
                                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-300 border-2 ${activeTrack === t.id
                                        ? `bg-linear-to-r ${t.color} text-white border-transparent shadow-xl scale-105`
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:shadow-md'
                                        }`}
                                >
                                    <TIcon className="text-xl" />
                                    {t.title}
                                </button>
                            )
                        })}
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Progress Line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2">
                            <motion.div
                                className={`w-full bg-linear-to-b ${track.color} rounded-full`}
                                initial={{ height: '0%' }}
                                animate={{ height: `${((activeStage + 1) / track.stages.length) * 100}%` }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            />
                        </div>

                        {/* Stage Nodes */}
                        <div className="space-y-8 md:space-y-16 relative">
                            {track.stages.map((s, i) => {
                                const SIcon = s.icon
                                const isActive = i === activeStage
                                const isPast = i < activeStage

                                return (
                                    <motion.div
                                        key={`${track.id}-${i}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.15 }}
                                        className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 cursor-pointer ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                        onClick={() => setActiveStage(i)}
                                    >
                                        {/* Card */}
                                        <div className={`flex-1 w-full md:w-auto p-8 rounded-3xl border-2 transition-all duration-500 ${isActive
                                            ? `bg-white shadow-2xl ${track.accentBorder} scale-[1.02]`
                                            : isPast
                                                ? 'bg-white/60 border-green-200 shadow-md'
                                                : 'bg-white/40 border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200'
                                            }`}>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? track.accentBg : isPast ? 'bg-green-50' : 'bg-gray-50'}`}>
                                                    {isPast ? <HiOutlineCheckCircle className="text-xl text-green-500" /> : <SIcon className={`text-xl ${isActive ? track.accentText : 'text-gray-400'}`} />}
                                                </div>
                                                <div>
                                                    <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? track.accentText : isPast ? 'text-green-600' : 'text-gray-400'}`}>
                                                        {s.level}
                                                    </span>
                                                    <h3 className={`font-extrabold text-lg ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{s.title}</h3>
                                                </div>
                                                <span className={`ml-auto text-xs font-bold px-3 py-1 rounded-full ${isActive ? `${track.accentBg} ${track.accentText}` : 'bg-gray-50 text-gray-400'}`}>
                                                    {s.duration}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 font-medium text-sm mb-4">{s.goal}</p>

                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                                                            <div>
                                                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Key Skills</h4>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {s.skills.map((skill) => (
                                                                        <span key={skill} className={`text-xs font-bold px-2.5 py-1 rounded-lg ${track.accentBg} ${track.accentText}`}>
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Target Roles</h4>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {s.roles.map((role) => (
                                                                        <span key={role} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">
                                                                            {role}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Node Dot */}
                                        <div className={`hidden md:flex w-12 h-12 rounded-full items-center justify-center shrink-0 z-10 border-4 transition-all duration-300 ${isActive
                                            ? `bg-linear-to-br ${track.color} border-white shadow-xl text-white`
                                            : isPast
                                                ? 'bg-green-500 border-white shadow-md text-white'
                                                : 'bg-white border-gray-200 text-gray-400'
                                            }`}>
                                            <span className="font-black text-sm">{i + 1}</span>
                                        </div>

                                        {/* Empty spacer for alignment */}
                                        <div className="flex-1 hidden md:block" />
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-20">
                        <p className="text-gray-500 font-medium mb-6 text-lg">
                            Ready to test your current skill level?
                        </p>
                        <Link href="/skill-quiz" className="btn-primary text-lg px-8 py-4 rounded-xl">
                            Take the Skill Quiz →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

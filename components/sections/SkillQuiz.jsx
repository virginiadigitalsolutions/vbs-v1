'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineLightningBolt, HiOutlineChartBar, HiOutlineCloud, HiOutlineCheckCircle, HiOutlineRefresh } from 'react-icons/hi'
import Link from 'next/link'

const QUESTIONS = [
    {
        question: 'Which area interests you the most?',
        options: [
            { text: 'Creating content and growing audiences', category: 'marketing' },
            { text: 'Working with numbers and finding patterns', category: 'data' },
            { text: 'Building and deploying technology systems', category: 'cloud' },
            { text: 'Designing user experiences', category: 'marketing' },
        ],
    },
    {
        question: 'How do you prefer to solve problems?',
        options: [
            { text: 'Through creative storytelling and persuasion', category: 'marketing' },
            { text: 'By analyzing data and testing hypotheses', category: 'data' },
            { text: 'By building automated systems and tools', category: 'cloud' },
            { text: 'By researching and implementing best practices', category: 'data' },
        ],
    },
    {
        question: 'Which tool would you most enjoy learning?',
        options: [
            { text: 'Google Ads or Meta Business Suite', category: 'marketing' },
            { text: 'Python or SQL for data analysis', category: 'data' },
            { text: 'Docker, Kubernetes, or AWS', category: 'cloud' },
            { text: 'Tableau or Power BI dashboards', category: 'data' },
        ],
    },
    {
        question: 'What type of work energizes you?',
        options: [
            { text: 'Writing campaigns that drive sign-ups', category: 'marketing' },
            { text: 'Building dashboards that reveal insights', category: 'data' },
            { text: 'Setting up CI/CD pipelines and servers', category: 'cloud' },
            { text: 'Optimizing SEO rankings and conversions', category: 'marketing' },
        ],
    },
    {
        question: 'Which metric would you find most satisfying to improve?',
        options: [
            { text: 'Website traffic and conversion rates', category: 'marketing' },
            { text: 'Prediction accuracy of a model', category: 'data' },
            { text: 'System uptime from 99.9% to 99.99%', category: 'cloud' },
            { text: 'Customer engagement and retention', category: 'marketing' },
        ],
    },
    {
        question: 'How do you handle a new technology?',
        options: [
            { text: 'I explore how it helps reach customers', category: 'marketing' },
            { text: 'I dive into the data it produces', category: 'data' },
            { text: 'I deploy it and understand its architecture', category: 'cloud' },
            { text: 'I evaluate its ROI and share findings', category: 'data' },
        ],
    },
    {
        question: 'Which certification sounds most exciting?',
        options: [
            { text: 'Google Digital Marketing Certification', category: 'marketing' },
            { text: 'Google Data Analytics Professional Certificate', category: 'data' },
            { text: 'AWS Solutions Architect Certification', category: 'cloud' },
            { text: 'HubSpot Inbound Marketing Certification', category: 'marketing' },
        ],
    },
    {
        question: 'What would your dream project look like?',
        options: [
            { text: 'Launching a viral social media campaign', category: 'marketing' },
            { text: 'Building a churn prediction ML model', category: 'data' },
            { text: 'Architecting a multi-region cloud platform', category: 'cloud' },
            { text: 'Creating a real-time analytics dashboard', category: 'data' },
        ],
    },
    {
        question: 'Which team would you join?',
        options: [
            { text: 'Growth & Marketing team', category: 'marketing' },
            { text: 'Data Science & Analytics team', category: 'data' },
            { text: 'Platform Engineering & DevOps team', category: 'cloud' },
            { text: 'Product team (data-driven decisions)', category: 'data' },
        ],
    },
    {
        question: 'Where do you see yourself in 5 years?',
        options: [
            { text: 'Leading digital marketing for a brand', category: 'marketing' },
            { text: 'Running data science for a company', category: 'data' },
            { text: 'Architecting global cloud infrastructure', category: 'cloud' },
            { text: 'Building my own tech startup', category: 'cloud' },
        ],
    },
]

const RESULTS = {
    marketing: {
        title: 'Digital Marketing',
        icon: HiOutlineLightningBolt,
        color: 'from-blue-500 to-cyan-500',
        description: 'You have a strong inclination for creativity, communication, and growth. Digital marketing is your arena — from content strategy to performance campaigns.',
        nextSteps: ['Explore Google Digital Marketing Certification', 'Start a personal blog or social media project', 'Learn Google Analytics and SEO basics'],
        roadmapLink: '/career-roadmap',
    },
    data: {
        title: 'Data & Analytics',
        icon: HiOutlineChartBar,
        color: 'from-purple-500 to-pink-500',
        description: 'You think in patterns, love problem-solving, and are energized by insights. Data analytics and data science are calling you.',
        nextSteps: ['Learn SQL and Python fundamentals', 'Take Google Data Analytics Certificate', 'Practice with real datasets on Kaggle'],
        roadmapLink: '/career-roadmap',
    },
    cloud: {
        title: 'Cloud & DevOps',
        icon: HiOutlineCloud,
        color: 'from-emerald-500 to-teal-500',
        description: 'You love building systems, automating processes, and understanding how technology works at scale. Cloud and DevOps is your path.',
        nextSteps: ['Start with AWS Free Tier labs', 'Learn Docker and basic Linux commands', 'Explore the AWS Solutions Architect path'],
        roadmapLink: '/career-roadmap',
    },
}

export default function SkillQuiz() {
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState({})
    const [showResult, setShowResult] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)

    const handleAnswer = (category, optionIdx) => {
        setSelectedOption(optionIdx)
        setAnswers((prev) => ({ ...prev, [category]: (prev[category] || 0) + 1 }))

        setTimeout(() => {
            setSelectedOption(null)
            if (currentQ < QUESTIONS.length - 1) {
                setCurrentQ((q) => q + 1)
            } else {
                setShowResult(true)
            }
        }, 400)
    }

    const getResult = () => {
        const sorted = Object.entries(answers).sort((a, b) => b[1] - a[1])
        return RESULTS[sorted[0]?.[0]] || RESULTS.marketing
    }

    const restart = () => {
        setCurrentQ(0)
        setAnswers({})
        setShowResult(false)
        setSelectedOption(null)
    }

    const progress = ((currentQ + (showResult ? 1 : 0)) / QUESTIONS.length) * 100

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="hero-dark pt-40 pb-28 relative">
                <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-accent-400/8 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <span className="badge badge-cyan mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">Free Assessment</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                        Skill <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-400 to-primary-400">Quiz</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
                        Answer 10 questions. Discover which digital career path fits you best.
                    </p>
                </div>
            </section>

            {/* Quiz Section */}
            <section className="py-20 relative">
                <div className="max-w-3xl mx-auto px-6">

                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-400">
                                {showResult ? 'Complete!' : `Question ${currentQ + 1} of ${QUESTIONS.length}`}
                            </span>
                            <span className="text-sm font-bold text-primary-600">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-linear-to-r from-primary-500 to-accent-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {!showResult ? (
                            <motion.div
                                key={currentQ}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
                                    {QUESTIONS[currentQ].question}
                                </h2>

                                <div className="space-y-3">
                                    {QUESTIONS[currentQ].options.map((option, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(option.category, i)}
                                            disabled={selectedOption !== null}
                                            className={`w-full text-left p-5 rounded-2xl border-2 font-semibold text-base transition-all duration-300 ${selectedOption === i
                                                ? 'bg-primary-500 text-white border-primary-500 shadow-xl scale-[1.02]'
                                                : selectedOption !== null
                                                    ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-default'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-400 hover:bg-primary-50 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${selectedOption === i
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    {String.fromCharCode(65 + i)}
                                                </span>
                                                {option.text}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {(() => {
                                    const result = getResult()
                                    const ResultIcon = result.icon
                                    return (
                                        <div className="text-center">
                                            <div className={`inline-flex w-20 h-20 rounded-3xl items-center justify-center bg-linear-to-br ${result.color} shadow-2xl mb-6`}>
                                                <ResultIcon className="text-4xl text-white" />
                                            </div>

                                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                                                Your Path: {result.title}
                                            </h2>
                                            <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto mb-8">
                                                {result.description}
                                            </p>

                                            {/* Score breakdown */}
                                            <div className="flex justify-center gap-4 mb-10 flex-wrap">
                                                {Object.entries(answers)
                                                    .sort((a, b) => b[1] - a[1])
                                                    .map(([cat, count]) => (
                                                        <div key={cat} className="bg-white rounded-2xl border border-gray-200 px-5 py-3 shadow-sm">
                                                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{RESULTS[cat]?.title}</span>
                                                            <p className="text-2xl font-black text-gray-900">{Math.round((count / QUESTIONS.length) * 100)}%</p>
                                                        </div>
                                                    ))}
                                            </div>

                                            {/* Next Steps */}
                                            <div className="bg-white rounded-3xl border border-gray-200 p-8 text-left max-w-lg mx-auto shadow-lg mb-10">
                                                <h3 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                                                    <HiOutlineCheckCircle className="text-green-500" />
                                                    Recommended Next Steps
                                                </h3>
                                                <ul className="space-y-3">
                                                    {result.nextSteps.map((step, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-gray-600 font-medium">
                                                            <span className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                                                {i + 1}
                                                            </span>
                                                            {step}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                <Link href={result.roadmapLink} className="btn-primary text-base px-8 py-4 rounded-xl">
                                                    View Full Roadmap →
                                                </Link>
                                                <button
                                                    onClick={restart}
                                                    className="btn-ghost text-base px-8 py-4 rounded-xl flex items-center gap-2 justify-center"
                                                >
                                                    <HiOutlineRefresh /> Retake Quiz
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    )
}

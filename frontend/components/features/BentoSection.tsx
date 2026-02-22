"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Rocket, Trophy, Palette, Megaphone, Settings, Star, Briefcase } from "lucide-react"
import { BentoGrid, BentoCard } from "@/components/ui/layouts"
import { AnimatedCounter } from "@/components/ui/effects"
import { FadeIn, StaggerContainer } from "@/components/ui/interacts"
import { BentoDetailModal, BentoDetail } from "./BentoDetailModal"

const bentoItems: (BentoDetail & { span: "1x1" | "2x1" | "1x2" | "2x2", className: string })[] = [
    {
        span: "2x2",
        title: "Tech Innovation",
        description: "Pushing the boundaries of what's possible. From AI-driven solutions to decentralized apps, our tech team turns concepts into reality.",
        icon: <Rocket className="w-32 h-32" />,
        graphic: (
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-blue-500/5" />
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
            </div>
        ),
        className: "bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20",
        children: (
            <div className="mt-auto grid grid-cols-2 gap-4 relative z-10">
                <div className="glass-card p-4 rounded-lg border-blue-500/20">
                    <div className="text-xl md:text-3xl font-bold font-mono text-blue-400 mb-1">
                        <AnimatedCounter end={50} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Live Projects</div>
                </div>
                <div className="glass-card p-4 rounded-lg border-blue-500/20">
                    <div className="text-xl md:text-3xl font-bold font-mono text-cyan-400 mb-1">
                        <AnimatedCounter end={10000} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Commits Pushed</div>
                </div>
            </div>
        )
    },
    {
        span: "1x1",
        title: "Global Recognition",
        description: "Consistently ranking in top positions at international hackathons and coding contests.",
        icon: <Trophy className="w-24 h-24" />,
        graphic: (
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-500/20 blur-[60px] rounded-full" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>
        ),
        className: "bg-gradient-to-br from-yellow-500/5 to-transparent border-yellow-500/20"
    },
    {
        span: "1x1",
        title: "Design Mastery",
        description: "Creating award-winning UI/UX designs and brand identities that set new industry standards.",
        icon: <Palette className="w-24 h-24" />,
        graphic: (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 blur-[60px] rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/30 blur-[60px] rounded-full" />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
            </div>
        ),
        className: "bg-gradient-to-br from-purple-500/5 to-transparent border-purple-500/20"
    },
    {
        span: "2x1",
        title: "Community & Outreach",
        description: "Building a vibrant ecosystem of 500+ innovators. Our PR team amplifies our voice and connects us with industry leaders.",
        icon: <Megaphone className="w-24 h-24" />,
        graphic: (
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-pink-500/10 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(236,72,153,0.05)_50%,transparent_75%,transparent_100%)] bg-[size:20px_20px]" />
            </div>
        ),
        className: "bg-gradient-to-br from-pink-500/5 to-transparent border-pink-500/20",
        children: (
            <div className="flex items-center gap-3 mt-auto relative z-10">
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-[10px] font-bold text-background shadow-lg shadow-pink-500/20">
                            {i === 1 ? 'G' : i === 2 ? 'F' : i === 3 ? 'G' : ''}
                        </div>
                    ))}
                </div>
                <span className="text-sm font-medium text-pink-400">Growing every day</span>
            </div>
        )
    },
    {
        span: "1x1",
        title: "Operational Excellence",
        description: "Flawless execution of large-scale events, workshops, and hackathons with precision management.",
        icon: <Settings className="w-24 h-24" />,
        graphic: (
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b10_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b10_1px,transparent_1px)] bg-[size:14px_14px]" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/20 blur-[50px]" />
            </div>
        ),
        className: "bg-gradient-to-br from-orange-500/5 to-transparent border-orange-500/20"
    },
    {
        span: "1x1",
        title: "Industry Ready",
        description: "Bridging the gap between campus and corporate with industry-grade projects and mentorship.",
        icon: <Briefcase className="w-24 h-24" />,
        graphic: (
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            </div>
        ),
        className: "bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20"
    },
    {
        span: "2x1",
        title: "Our Impact",
        description: "Measuring our success through the achievements of our members and the community we've built.",
        icon: <Star className="w-24 h-24" />,
        graphic: (
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 via-transparent to-blue-500/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
            </div>
        ),
        className: "bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20",
        children: (
            <div className="grid grid-cols-3 gap-3 mt-auto relative z-10">
                <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-lg md:text-2xl font-bold font-mono text-yellow-500">
                        <AnimatedCounter end={25} suffix="+" />
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Wins</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-lg md:text-2xl font-bold font-mono text-green-500">
                        <AnimatedCounter end={50} suffix="+" />
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Interns</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-lg md:text-2xl font-bold font-mono text-blue-500">
                        <AnimatedCounter end={100} suffix="+" />
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Events</div>
                </div>
            </div>
        )
    }
]

export function BentoSection() {
    const [selectedBento, setSelectedBento] = useState<BentoDetail | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCardClick = (item: BentoDetail) => {
        setSelectedBento(item)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <section className="relative py-[8vh] overflow-hidden bg-background min-h-screen flex items-center" id="innovation">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

            <div className="max-w-7xl mx-auto w-full relative z-10 px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-[4vh]"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/5 border border-secondary/20 backdrop-blur-md mb-6 text-xs font-mono text-secondary font-bold tracking-[0.3em] uppercase">
                        OUR IMPACT
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk mb-6">
                        <span className="text-secondary">#</span> Chapter Highlights
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-light">
                        Celebrating excellence across Tech, Design, Outreach, and Operations
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <StaggerContainer className="max-w-7xl mx-auto" delay={0.2}>
                    <BentoGrid className="auto-rows-[minmax(180px,auto)] md:auto-rows-[220px]">
                        {bentoItems.map((item, i) => (
                            <FadeIn key={i}>
                                <BentoCard
                                    onClick={() => handleCardClick(item)}
                                    span={item.span}
                                    title={item.title}
                                    description={item.description}
                                    icon={item.icon}
                                    graphic={item.graphic}
                                    className={item.className}
                                >
                                    {item.children}
                                </BentoCard>
                            </FadeIn>
                        ))}
                    </BentoGrid>
                </StaggerContainer>
            </div>
            <BentoDetailModal item={selectedBento} isOpen={isModalOpen} onClose={handleCloseModal} />
        </section>
    )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Cpu, Palette, Megaphone, Settings } from "lucide-react"
import { GlitchText } from "@/components/ui/effects"
import { NeonCard } from "@/components/ui/cards"
import { TeamDetailModal, TeamDetail } from "./TeamDetailModal"
import { cn } from "@/lib/utils"

export function TracksSection() {
    const [selectedTeam, setSelectedTeam] = useState<TeamDetail | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const tracks: TeamDetail[] = [
        {
            title: "Tech Team",
            description: "Building the future with code. innovative solutions in Web, App, AI, and Blockchain.",
            icon: Cpu,
            color: "text-blue-400",
            variant: "secondary",
            focusAreas: ["Web Development", "Mobile Apps", "AI/ML", "Blockchain", "Cloud Computing"],
            techStack: ["React", "Next.js", "TypeScript", "Python", "TensorFlow", "Solidity", "AWS", "Docker"],
            currentProjects: [
                { name: "GFG Official Website Redesign", description: "Modern, responsive website with cutting-edge UI/UX", status: "active" },
                { name: "AI-powered Code Review Tool", description: "Automated code analysis using machine learning", status: "planning" },
                { name: "Campus Blockchain Network", description: "Decentralized platform for student credentials", status: "active" }
            ],
            teamMembers: [
                { name: "Vivek Ranjan", role: "Vice President", avatar: "https://github.com/msVivekRanjan.png" },
                { name: "Raj Biswal", role: "Tech Lead" },
                { name: "Dev Team", role: "Core Developers" }
            ],
            achievements: [
                "50+ projects deployed in production",
                "100+ members trained in modern tech stacks",
                "Winner of multiple hackathons",
                "Contributed to 10+ open source projects"
            ],
            stats: {
                memberCount: 100,
                projectCount: 50,
                successRate: 95
            }
        },
        {
            title: "Design Team",
            description: "Crafting visual experiences that captivate and inspire. UI/UX, Graphic Design, and Branding.",
            icon: Palette,
            color: "text-purple-400",
            variant: "primary",
            focusAreas: ["UI/UX Design", "Graphic Design", "Brand Identity", "Motion Graphics", "Product Design"],
            techStack: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Blender", "Framer", "Principle"],
            currentProjects: [
                { name: "GFG Brand Refresh 2026", description: "Complete visual identity redesign for modern appeal", status: "active" },
                { name: "Event Poster Campaign", description: "Creative promotional materials for all events", status: "active" },
                { name: "Mobile App UI System", description: "Comprehensive design system for mobile applications", status: "completed" }
            ],
            teamMembers: [
                { name: "Runjhun Pradhan", role: "Media Lead" },
                { name: "Design Team", role: "UI/UX Designers" },
                { name: "Creative Team", role: "Graphic Artists" }
            ],
            achievements: [
                "200+ designs created for various campaigns",
                "15+ brand partnerships established",
                "Featured in design showcases",
                "Consistent brand identity across all platforms"
            ],
            stats: {
                memberCount: 45,
                projectCount: 200,
                successRate: 98
            }
        },
        {
            title: "PR & Outreach",
            description: "Amplifying our voice and connecting with the community. Social Media, Events, and Partnerships.",
            icon: Megaphone,
            color: "text-pink-400",
            variant: "accent",
            focusAreas: ["Social Media Management", "Event Marketing", "Community Building", "Content Creation", "Partnerships"],
            techStack: ["Canva", "Buffer", "Hootsuite", "Google Analytics", "Mailchimp", "HubSpot"],
            currentProjects: [
                { name: "Campus Ambassador Program", description: "Building a network of student representatives", status: "active" },
                { name: "Tech Talk Series Promotion", description: "Marketing campaign for speaker events", status: "active" },
                { name: "Industry Partnership Drive", description: "Connecting with tech companies for collaborations", status: "planning" }
            ],
            teamMembers: [
                { name: "Ayush Pradhan", role: "PR & Outreach" },
                { name: "Social Team", role: "Content Creators" },
                { name: "Outreach Team", role: "Community Managers" }
            ],
            achievements: [
                "10K+ social media followers across platforms",
                "50+ events successfully promoted",
                "20+ industry partnerships secured",
                "90% event attendance rate"
            ],
            stats: {
                memberCount: 30,
                projectCount: 50,
                successRate: 90
            }
        },
        {
            title: "Operations",
            description: "The backbone of our events. Logistics, Management, and Execution excellence.",
            icon: Settings,
            color: "text-yellow-400",
            variant: "secondary",
            focusAreas: ["Event Logistics", "Resource Management", "Budget Planning", "Vendor Coordination", "Team Coordination"],
            techStack: ["Notion", "Trello", "Asana", "Google Workspace", "Slack", "Zoom", "Excel"],
            currentProjects: [
                { name: "Annual Tech Fest 2026", description: "Planning and execution of flagship annual event", status: "planning" },
                { name: "Workshop Series Coordination", description: "Managing logistics for monthly skill workshops", status: "active" },
                { name: "Resource Optimization System", description: "Streamlining resource allocation and tracking", status: "active" }
            ],
            teamMembers: [
                { name: "Mukesh Padhi", role: "Management Lead", avatar: "https://github.com/Mukeshkup.png" },
                { name: "Ops Team", role: "Event Coordinators" },
                { name: "Logistics Team", role: "Resource Managers" }
            ],
            achievements: [
                "30+ events executed flawlessly",
                "5000+ attendees managed across events",
                "Zero major incidents in event execution",
                "95% vendor satisfaction rate"
            ],
            stats: {
                memberCount: 35,
                projectCount: 30,
                successRate: 97
            }
        }
    ]

    const handleExploreClick = (team: TeamDetail) => {
        setSelectedTeam(team)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedTeam(null), 300) // Clear after animation
    }

    return (
        <section className="relative py-[8vh] bg-transparent min-h-screen flex items-center">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-x-12 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary/5 -skew-x-12 blur-3xl -z-10" />

            <div className="container mx-auto relative z-10 px-6 w-full max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-[5vh] animate-on-scroll">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <span className="text-sm font-mono text-primary font-bold tracking-[0.3em] uppercase">
                            {"//"} DOMAINS
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 text-white"
                    >
                        Focus <GlitchText text="Tracks" className="text-primary" />
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg font-light"
                    >
                        Explore our four core pillars of excellence. Choose your path and master the craft.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {tracks.map((track, i) => (
                        <motion.div
                            key={track.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <NeonCard
                                variant={track.variant as any}
                                className="h-full p-8 group hover:bg-white/5 transition-all cursor-pointer"
                                onClick={() => handleExploreClick(track)}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={cn(
                                        "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
                                        "bg-white/5 border border-white/10 group-hover:border-white/20",
                                        track.color
                                    )}>
                                        <track.icon className="w-7 h-7" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 font-space-grotesk text-white group-hover:text-glow transition-all">
                                        {track.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                                        {track.description}
                                    </p>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleExploreClick(track)
                                        }}
                                        className="flex items-center text-xs font-mono font-bold uppercase tracking-widest text-white/50 group-hover:text-primary transition-colors"
                                    >
                                        <span className="mr-2">Explore </span>
                                        <div className="h-px flex-grow bg-white/10 group-hover:bg-primary/50 transition-colors" />
                                    </button>
                                </div>
                            </NeonCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Team Detail Modal */}
            <TeamDetailModal
                team={selectedTeam}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    )
}

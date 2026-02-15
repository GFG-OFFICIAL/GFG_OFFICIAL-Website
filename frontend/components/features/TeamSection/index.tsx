"use client"

import { TeamMember } from "./types"
import { TechCard } from "./TechCard"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const DUMMY_TEAM: TeamMember[] = [
    {
        id: "GFG-EXEC-001",
        name: "Subasis Mishra",
        role: "President",
        position: "COMMANDER",
        photo: "https://github.com/subasis3124.png",
        email: "subasis@gfg.com",
        specialty: "Strategic Vision",
        bio: "Leading the future of tech.",
        achievements: [],
        skills: ["Leadership", "System Design"],
        joinedDate: "2024",
        social: { github: "https://github.com/subasis3124", linkedin: "https://linkedin.com/in/subasismishra" },
        stats: { projectsLed: 12, eventsOrganized: 10, contributionScore: 99 }
    },
    {
        id: "GFG-EXEC-002",
        name: "Vivek Ranjan Sahoo",
        role: "Vice President",
        position: "XO",
        photo: "https://github.com/msVivekRanjan.png",
        email: "vivek@gfg.com",
        specialty: "Operations & Tech",
        bio: "Orchestrating excellence.",
        achievements: [],
        skills: ["Operations", "Full Stack"],
        joinedDate: "2024",
        social: {
            github: "https://github.com/msVivekRanjan",
            linkedin: "https://www.linkedin.com/in/vivekranjansahoo7/",
            twitter: "https://x.com/MsVivekRanjan"
        },
        stats: { projectsLed: 15, eventsOrganized: 8, contributionScore: 98 }
    },
    {
        id: "GFG-ARCH-001",
        name: "Raj Sahasransu Biswal",
        role: "Tech Lead",
        position: "ARCHITECT",
        photo: "/team/placeholder.jpg",
        email: "raj@gfg.com",
        specialty: "Technical Architecture",
        bio: "Driving technical innovation.",
        achievements: [],
        skills: ["Java", "Cloud Arch"],
        joinedDate: "2024",
        social: { linkedin: "https://linkedin.com/in/raj-sahasransu-biswal" },
        stats: { projectsLed: 8, eventsOrganized: 4, contributionScore: 94 }
    },
    {
        id: "GFG-OPS-001",
        name: "Mukesh Kumar Padhi",
        role: "Management Lead",
        position: "STRATEGIST",
        photo: "https://github.com/mukesh663.png",
        email: "mukesh@gfg.com",
        specialty: "Strategic Management",
        bio: "Optimizing operational efficiency.",
        achievements: [],
        skills: ["Management", "Agile"],
        joinedDate: "2024",
        social: {
            linkedin: "https://linkedin.com/in/mukesh-kumar-padhi07",
            github: "https://github.com/Mukeshkup"
        },
        stats: { projectsLed: 6, eventsOrganized: 5, contributionScore: 92 }
    },
    {
        id: "GFG-CREATIVE-001",
        name: "Runjhun Pradhan",
        role: "Media Lead",
        position: "DIRECTOR",
        photo: "/team/placeholder.jpg",
        email: "runjhun@gfg.com",
        specialty: "Creative Direction",
        bio: "Visualizing the brand identity.",
        achievements: [],
        skills: ["Design", "Branding"],
        joinedDate: "2024",
        social: { linkedin: "https://linkedin.com/in/runjhun-pradhan" },
        stats: { projectsLed: 5, eventsOrganized: 6, contributionScore: 91 }
    },
    {
        id: "GFG-COMMS-001",
        name: "Ayush Ranjan Pradhan",
        role: "PR & Outreach",
        position: "DIPLOMAT",
        photo: "/team/placeholder.jpg",
        email: "ayush@gfg.com",
        specialty: "Public Relations",
        bio: "Connecting with the community.",
        achievements: [],
        skills: ["Communication", "Outreach"],
        joinedDate: "2024",
        social: { linkedin: "https://linkedin.com/in/ayush-ranjan-pradhan-008468309" },
        stats: { projectsLed: 4, eventsOrganized: 8, contributionScore: 93 }
    }
]

export function TeamSection() {
    const president = DUMMY_TEAM.find(m => m.role === "President")
    const vicePresident = DUMMY_TEAM.find(m => m.role === "Vice President")

    const leads = DUMMY_TEAM.filter(m => !["President", "Vice President"].includes(m.role))

    return (
        <section id="system-architects" className="py-24 bg-[#030303] relative overflow-hidden min-h-screen">

            {/* Neural Background Matrix */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

                {/* Animated Grid Floor */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                />
            </div>

            <div className="container relative z-10 mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-mono text-emerald-400 tracking-[0.2em] uppercase">System Architects</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold font-space-grotesk text-white mb-6 tracking-tight">
                        CORE <span className="text-[#00FF80] drop-shadow-[0_0_10px_rgba(0,255,128,0.5)]">INTELLIGENCE</span>
                    </h2>
                    <p className="text-slate-400 max-w-lg mx-auto font-light">
                        The neural network driving innovation, strategy, and execution.
                    </p>
                </div>

                {/* HIERARCHY LEVEL 1: COMMAND & CONTROL (President & VP) */}
                <div className="relative mb-24">
                    {/* Connecting Platform */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-emerald-500/5 blur-3xl rounded-[100%] pointer-events-none" />

                    <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 relative z-10">
                        {president && (
                            <div className="relative w-full max-w-md">
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-amber-500/20 font-mono text-xs tracking-widest uppercase">Command_01</div>
                                <TechCard member={president} index={0} isLeadership />
                            </div>
                        )}

                        {/* Central Connector Node */}
                        <div className="hidden md:flex flex-col items-center justify-center opacity-30">
                            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent" />
                            <div className="w-4 h-4 rounded-full border border-white bg-black" />
                            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent" />
                        </div>

                        {vicePresident && (
                            <div className="relative w-full max-w-md">
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-emerald-500/20 font-mono text-xs tracking-widest uppercase">Command_02</div>
                                <TechCard member={vicePresident} index={1} isLeadership />
                            </div>
                        )}
                    </div>
                </div>

                {/* HIERARCHY LEVEL 2: OPERATIONS GRID (Leads) */}
                <div className="relative max-w-7xl mx-auto">

                    {/* Responsive Connector Lines (CSS-based) */}
                    <div className="absolute -top-12 left-0 right-0 h-12 hidden md:flex flex-col items-center">
                        {/* Vertical Line from Top Tier */}
                        <div className="w-px h-1/2 bg-gradient-to-b from-white/20 to-emerald-500/50" />

                        {/* Horizontal Branching Bar */}
                        <div className="w-[80%] h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent relative">
                            {/* Vertical Drops to Each Column */}
                            <div className="absolute top-0 left-[12%] h-6 w-px bg-emerald-500/30" />
                            <div className="absolute top-0 right-[12%] h-6 w-px bg-emerald-500/30" />
                            <div className="absolute top-0 left-[38%] h-6 w-px bg-emerald-500/30" />
                            <div className="absolute top-0 right-[38%] h-6 w-px bg-emerald-500/30" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-6 relative z-10">
                        {leads.map((member, i) => (
                            <div key={member.id} className="flex justify-center relative group">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-emerald-500/30 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity" />
                                <TechCard member={member} index={i + 2} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Decor */}
                <div className="mt-32 flex justify-center opacity-30">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-white" />
                        <div className="font-mono text-[10px] tracking-[0.5em] text-white">SYSTEM_ONLINE</div>
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-white" />
                    </div>
                </div>

            </div>
        </section>
    )
}


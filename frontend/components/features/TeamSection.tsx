"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
    Github, Linkedin, Twitter, Share2, Code, Terminal,
    Globe, Cpu, Briefcase, Mail, Award, Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface TeamMember {
    id: string
    name: string
    role: "President" | "Vice President" | "Tech Lead" | "Design Lead" | "Operation Lead" | "PR & Outreach" | "Member" | "System Architect" | "Management Lead" | "Media Lead"
    position: string
    photo: string
    email: string
    department?: string
    specialty: string
    bio: string
    achievements: string[]
    skills: string[]
    joinedDate: string
    social: {
        linkedin?: string
        github?: string
        twitter?: string
        portfolio?: string
    }
    stats: {
        projectsLed: number
        eventsOrganized: number
        contributionScore: number
    }
}

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
        photo: "/images/team/vivek.jpg",
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
        photo: "/images/team/raj.jpg",
        email: "raj@gfg.com",
        specialty: "Technical Architecture",
        bio: "Driving technical innovation.",
        achievements: [],
        skills: ["Java", "Cloud Arch"],
        joinedDate: "2024",
        social: {
            linkedin: "https://linkedin.com/in/raj-sahasransu-biswal",
            github: "https://github.com/sahasransuraj08"
        },
        stats: { projectsLed: 8, eventsOrganized: 4, contributionScore: 94 }
    },
    {
        id: "GFG-OPS-001",
        name: "Mukesh Kumar Padhi",
        role: "Management Lead",
        position: "STRATEGIST",
        photo: "/images/team/mukesh.jpg",
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
        photo: "/images/team/runjhun.jpg",
        email: "runjhun@gfg.com",
        specialty: "Creative Direction",
        bio: "Visualizing the brand identity.",
        achievements: [],
        skills: ["Design", "Branding"],
        joinedDate: "2024",
        social: {
            linkedin: "https://linkedin.com/in/runjhun-pradhan",
            github: "https://github.com/RunjhunPradhan27"
        },
        stats: { projectsLed: 5, eventsOrganized: 6, contributionScore: 91 }
    },
    {
        id: "GFG-COMMS-001",
        name: "Ayush Ranjan Pradhan",
        role: "PR & Outreach",
        position: "DIPLOMAT",
        photo: "https://drive.google.com/file/d/1XOboY-R639u9OhhOqLB2g3T6DwXMN4Wx/view?usp=drivesdk",
        email: "ayush@gfg.com",
        specialty: "Public Relations",
        bio: "Connecting with the community.",
        achievements: [],
        skills: ["Communication", "Outreach"],
        joinedDate: "2024",
        social: {
            linkedin: "https://linkedin.com/in/ayush-ranjan-pradhan-008468309",
            github: "https://github.com/InfernoX21"
        },
        stats: { projectsLed: 4, eventsOrganized: 8, contributionScore: 93 }
    }
]

export function TeamSection() {
    const president = DUMMY_TEAM.find(m => m.role === "President")
    const vicePresident = DUMMY_TEAM.find(m => m.role === "Vice President")
    const leads = DUMMY_TEAM.filter(m => !["President", "Vice President"].includes(m.role))

    return (
        <section id="team" className="py-[8vh] bg-[#030303] relative overflow-hidden min-h-screen flex items-center">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>
            <div className="container relative z-10 mx-auto px-4">
                <div className="text-center mb-[5vh] relative">
                    <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 mb-4">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /><span className="text-xs font-mono text-emerald-400 tracking-[0.2em] uppercase">System Architects</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-6xl font-bold font-space-grotesk text-white mb-4 tracking-tight">CORE <span className="text-[#00FF80] drop-shadow-[0_0_10px_rgba(0,255,128,0.5)]">INTELLIGENCE</span></h2>
                    <p className="text-slate-400 max-w-lg mx-auto font-light">The neural network driving innovation, strategy, and execution.</p>
                </div>
                <div className="relative mb-[5vh]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-emerald-500/5 blur-3xl rounded-[100%] pointer-events-none" />
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 relative z-10">
                        {president && <div className="relative w-full max-w-md"><div className="absolute -top-12 left-1/2 -translate-x-1/2 text-amber-500/20 font-mono text-xs tracking-widest uppercase">Command_01</div><TechCard member={president} index={0} isLeadership /></div>}
                        <div className="hidden md:flex flex-col items-center justify-center opacity-30"><div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent" /><div className="w-4 h-4 rounded-full border border-white bg-black" /><div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent" /></div>
                        {vicePresident && <div className="relative w-full max-w-md"><div className="absolute -top-12 left-1/2 -translate-x-1/2 text-emerald-500/20 font-mono text-xs tracking-widest uppercase">Command_02</div><TechCard member={vicePresident} index={1} isLeadership /></div>}
                    </div>
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 relative z-10">
                        {leads.map((member, i) => (
                            <div key={member.id} className="flex justify-center relative group">
                                <TechCard member={member} index={i + 2} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const ROLE_THEMES: Record<string, any> = {
    "President": { primary: "text-amber-400", bg: "bg-amber-950/20", border: "border-amber-500/30", glow: "shadow-amber-500/20", icon: Globe },
    "Vice President": { primary: "text-emerald-400", bg: "bg-emerald-950/20", border: "border-emerald-500/30", glow: "shadow-emerald-500/20", icon: Cpu },
    "Tech Lead": { primary: "text-emerald-400", bg: "bg-emerald-950/20", border: "border-emerald-500/30", glow: "shadow-emerald-500/20", icon: Terminal },
    "Management Lead": { primary: "text-indigo-400", bg: "bg-indigo-950/20", border: "border-indigo-500/30", glow: "shadow-indigo-500/20", icon: Share2 },
    "Media Lead": { primary: "text-pink-400", bg: "bg-pink-950/20", border: "border-pink-500/30", glow: "shadow-pink-500/20", icon: Globe },
    "PR & Outreach": { primary: "text-purple-400", bg: "bg-purple-950/20", border: "border-purple-500/30", glow: "shadow-purple-500/20", icon: Share2 },
    "Member": { primary: "text-slate-400", bg: "bg-slate-900/40", border: "border-slate-700/30", glow: "shadow-slate-500/10", icon: Code }
}

function normalizeGDriveUrl(url: string) {
    if (url.includes('drive.google.com')) {
        const fileIdMatch = url.match(/\/d\/(.+?)\//);
        if (fileIdMatch) return `https://lh3.googleusercontent.com/u/0/d/${fileIdMatch[1]}`;
    }
    return url;
}

function TechCard({ member, index, isLeadership = false }: { member: TeamMember, index: number, isLeadership?: boolean }) {
    const theme = ROLE_THEMES[member.role] || ROLE_THEMES["Member"]
    const Icon = theme.icon
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "relative group w-full perspective-1000 transition-all duration-500 rounded-2xl overflow-hidden backdrop-blur-md border transform-style-3d group-hover:rotate-x-2 group-hover:scale-[1.02]",
                theme.bg,
                theme.border,
                isLeadership ? "max-w-[380px] aspect-[4/5]" : "max-w-[300px]",
                isLeadership ? theme.glow : "hover:" + theme.glow
            )}
        >
            <div className="relative z-10 flex flex-col pt-6 pb-8 px-6 h-full">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2"><div className={cn("p-1.5 rounded-md bg-white/5", theme.primary)}><Icon className="w-4 h-4" /></div><span className="font-mono text-[10px] text-white/40 tracking-wider">SYS_ID: {member.id.split('-').pop()}</span></div>
                    <div className={cn("text-[9px] font-bold px-2 py-0.5 rounded border border-white/10 bg-black/20 uppercase tracking-widest", theme.primary)}>{member.position || "Operator"}</div>
                </div>
                <div className="relative flex-1 flex flex-col items-center justify-center -mt-2">
                    <div className={cn("relative rounded-full p-1 border border-dashed transition-all duration-700 group-hover:scale-110", theme.border, isLeadership ? "w-36 h-36" : "w-28 h-28")}>
                        <div className="w-full h-full rounded-full overflow-hidden bg-black relative z-10">
                            <img src={normalizeGDriveUrl(member.photo)} alt={member.name} className="w-full h-full object-cover filter brightness-90 contrast-125 group-hover:brightness-110 transition-all duration-500" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random` }} />
                        </div>
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center z-20"><span className={cn("w-2.5 h-2.5 rounded-full animate-pulse", member.role === "President" ? "bg-emerald-500" : "bg-emerald-500/70")} /></div>
                    </div>
                    <div className="text-center mt-6 relative">
                        <h3 className={cn("font-space-grotesk font-bold tracking-tight mb-1 group-hover:text-white transition-colors", isLeadership ? "text-2xl" : "text-xl", theme.primary)}>{member.name}</h3>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5"><span className="text-xs font-mono text-white/60 tracking-wide">{member.role.toUpperCase()}</span></div>
                    </div>
                </div>
                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="flex justify-center gap-4">
                        {member.social.github && <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all hover:scale-110 border border-white/5"><Github className="w-4 h-4" /></a>}
                        {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-emerald-400 transition-all hover:scale-110 border border-white/5"><Linkedin className="w-4 h-4" /></a>}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

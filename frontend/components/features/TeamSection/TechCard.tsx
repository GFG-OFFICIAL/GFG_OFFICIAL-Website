"use client"

import { motion } from "framer-motion"
import { TeamMember } from "./types"
import { Github, Linkedin, Twitter, Share2, Code, Terminal, Globe, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

interface TechCardProps {
    member: TeamMember
    index: number
    isLeadership?: boolean
}

const ROLE_THEMES: Record<string, {
    primary: string,
    secondary: string,
    bg: string,
    border: string,
    glow: string,
    icon: React.ElementType
}> = {
    "President": {
        primary: "text-amber-400",
        secondary: "text-amber-200",
        bg: "bg-amber-950/20",
        border: "border-amber-500/30",
        glow: "shadow-amber-500/20",
        icon: Globe
    },
    "Vice President": {
        primary: "text-emerald-400",
        secondary: "text-emerald-200",
        bg: "bg-emerald-950/20",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
        icon: Cpu
    },
    "Tech Lead": {
        primary: "text-emerald-400",
        secondary: "text-emerald-200",
        bg: "bg-emerald-950/20",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
        icon: Terminal
    },
    "Management Lead": {
        primary: "text-indigo-400",
        secondary: "text-indigo-200",
        bg: "bg-indigo-950/20",
        border: "border-indigo-500/30",
        glow: "shadow-indigo-500/20",
        icon: Share2
    },
    "Media Lead": {
        primary: "text-pink-400",
        secondary: "text-pink-200",
        bg: "bg-pink-950/20",
        border: "border-pink-500/30",
        glow: "shadow-pink-500/20",
        icon: Globe
    },
    "PR & Outreach": {
        primary: "text-purple-400",
        secondary: "text-purple-200",
        bg: "bg-purple-950/20",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/20",
        icon: Share2
    },
    "Member": {
        primary: "text-slate-400",
        secondary: "text-slate-200",
        bg: "bg-slate-900/40",
        border: "border-slate-700/30",
        glow: "shadow-slate-500/10",
        icon: Code
    }
}

const normalizeGDriveUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
        // Handle "file/d/ID/view" format
        const fileIdMatch = url.match(/\/d\/(.+?)\//);
        if (fileIdMatch) return `https://lh3.googleusercontent.com/u/0/d/${fileIdMatch[1]}`;

        // Handle "id=ID" format
        const idParamMatch = url.match(/id=(.+?)(&|$)/);
        if (idParamMatch) return `https://lh3.googleusercontent.com/u/0/d/${idParamMatch[1]}`;
    }
    return url;
}

export function TechCard({ member, index, isLeadership = false }: TechCardProps) {
    const theme = ROLE_THEMES[member.role] || ROLE_THEMES["Member"]
    const Icon = theme.icon

    return (
        <motion.div
            className={cn(
                "relative group w-full perspective-1000",
                isLeadership ? "max-w-[380px] aspect-[4/5]" : "max-w-[300px] aspect-[3/4]"
            )}
        >
            <div className={cn(
                "absolute inset-0 transition-all duration-500 rounded-2xl overflow-hidden backdrop-blur-md border",
                theme.bg,
                theme.border,
                isLeadership ? theme.glow : "hover:" + theme.glow,
                isLeadership ? "shadow-[0_0_40px_rgba(0,0,0,0.3)]" : "hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]",
                "transform-style-3d group-hover:rotate-x-2 group-hover:scale-[1.02]"
            )}>

                {/* Holographic Scan Detail (Animated) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 -translate-y-full group-hover:translate-y-full transition-all duration-1000 z-20 pointer-events-none" />

                {/* Cyberpunk Decor Lines */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/10 rounded-tl-2xl z-10" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/10 rounded-br-2xl z-10" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col pt-6 pb-4 px-6">

                    {/* Header: Identity Code */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className={cn("p-1.5 rounded-md bg-white/5", theme.primary)}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-mono text-[10px] text-white/40 tracking-wider">
                                SYS_ID: {member.id.split('-').pop()}
                            </span>
                        </div>
                        <div className={cn("text-[9px] font-bold px-2 py-0.5 rounded border border-white/10 bg-black/20 uppercase tracking-widest", theme.primary)}>
                            {member.position || "Operator"}
                        </div>
                    </div>

                    {/* Main Image Block */}
                    <div className="relative flex-1 flex flex-col items-center justify-center -mt-2">
                        <div className={cn(
                            "relative rounded-full p-1 border border-dashed transition-all duration-700 group-hover:scale-110",
                            theme.border,
                            isLeadership ? "w-36 h-36" : "w-28 h-28"
                        )}>
                            <div className={cn("absolute inset-0 rounded-full animate-spin-slow opacity-20 border-t border-b", theme.border)} />

                            <div className="w-full h-full rounded-full overflow-hidden bg-black relative z-10">
                                <img
                                    src={normalizeGDriveUrl(member.photo)}
                                    alt={member.name}
                                    className="w-full h-full object-cover filter brightness-90 contrast-125 group-hover:brightness-110 transition-all duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`
                                    }}
                                />
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute bottom-1 right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center z-20">
                                <span className={cn("w-2.5 h-2.5 rounded-full animate-pulse", member.role === "President" ? "bg-emerald-500" : "bg-emerald-500/70")} />
                            </div>
                        </div>

                        {/* Name & Role */}
                        <div className="text-center mt-6 relative">
                            <h3 className={cn(
                                "font-space-grotesk font-bold tracking-tight mb-1 group-hover:text-white transition-colors",
                                isLeadership ? "text-2xl" : "text-xl",
                                theme.primary
                            )}>
                                {member.name}
                            </h3>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                                <span className={cn("w-1 h-1 rounded-full", theme.bg.replace("bg-", "bg-opactity-100 bg-"))} />
                                <span className="text-xs font-mono text-white/60 tracking-wide">
                                    {member.role.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer: Connections */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="flex justify-center gap-4">
                            {member.social.github && (
                                <a href={member.social.github} target="_blank" rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all hover:scale-110 border border-white/5">
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                            {member.social.linkedin && (
                                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-emerald-400 transition-all hover:scale-110 border border-white/5">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                            {member.social.twitter && (
                                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-emerald-400 transition-all hover:scale-110 border border-white/5">
                                    <Twitter className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}


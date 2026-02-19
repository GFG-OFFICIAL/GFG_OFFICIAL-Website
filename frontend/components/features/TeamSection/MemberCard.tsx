"use client"

import { motion } from "framer-motion"
import { TeamMember } from "./types"
import { Github, Linkedin, Twitter, Mail, Award, Zap, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

interface MemberCardProps {
    member: TeamMember
    index: number
    isLeadership?: boolean
}

const ROLE_COLORS: Record<string, { primary: string, bg: string, border: string }> = {
    "President": { primary: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/50" },
    "Vice President": { primary: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    "System Architect": { primary: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30" },
    "Tech Lead": { primary: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" },
    "Design Lead": { primary: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/30" },
    "Operation Lead": { primary: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
    "Management Lead": { primary: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
    "PR & Outreach": { primary: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    "Media Lead": { primary: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/30" },
    "Member": { primary: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-500/30" }
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

export function MemberCard({ member, index, isLeadership = false }: MemberCardProps) {
    const colors = ROLE_COLORS[member.role] || ROLE_COLORS["Member"]

    // Leadership cards (President/VP) get special effects
    const containerClasses = isLeadership
        ? "bg-card/80 backdrop-blur-md shadow-2xl border-2"
        : "bg-card/50 backdrop-blur-sm hover:shadow-lg border"

    const glowColor = member.role === "President" ? "shadow-amber-500/20" : "shadow-emerald-500/20"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "group relative overflow-hidden rounded-xl transition-all duration-300 h-full flex flex-col",
                containerClasses,
                colors.border,
                isLeadership ? `shadow-xl ${glowColor}` : `hover:shadow-${colors.primary.split('-')[1]}/20`
            )}
        >
            {/* Leadership Badge */}
            {isLeadership && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" style={{ color: member.role === "President" ? '#f59e0b' : '#3b82f6' }} />
            )}

            {/* Header / ID Badge Style */}
            <div className={cn("px-4 py-3 flex justify-between items-center border-b", colors.border, colors.bg)}>
                <span className={cn("text-xs font-mono font-bold uppercase tracking-wider", colors.primary)}>
                    {member.role}
                </span>
                <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse",
                        member.role === "President" ? "bg-amber-500" : "bg-emerald-500"
                    )} />
                    <span className="text-[10px] text-muted-foreground font-mono">
                        {member.id}
                    </span>
                </div>
            </div>

            <div className={`p-6 flex-1 flex flex-col ${isLeadership ? 'items-center text-center' : ''}`}>
                {/* Profile Photo Area */}
                <div className={cn("relative mx-auto mb-6", isLeadership ? "w-32 h-32" : "w-24 h-24")}>
                    <div className={cn("absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow opacity-50", colors.primary.replace('text', 'border'))} />
                    <div className="absolute inset-1 rounded-full bg-secondary overflow-hidden">
                        {/* Image handling */}
                        <img
                            src={normalizeGDriveUrl(member.photo)}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`
                            }}
                        />
                    </div>
                </div>

                {/* Info */}
                <div className="mb-6">
                    <h3 className={cn("font-bold text-white mb-1 group-hover:text-primary transition-colors", isLeadership ? "text-2xl" : "text-lg")}>
                        {member.name}
                    </h3>
                    {!isLeadership && (
                        <p className="text-sm text-muted-foreground font-mono mb-2">
                            {member.role}
                        </p>
                    )}
                    <div className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-secondary text-secondary-foreground border border-white/5", isLeadership && "mt-2")}>
                        <Briefcase className="w-3 h-3" />
                        {member.specialty}
                    </div>
                </div>

                {/* Stats Grid - Always visible for leadership, hover for others */}
                <div className={cn("grid grid-cols-2 gap-2 mb-6 transition-all duration-300",
                    isLeadership ? "opacity-100" : "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                )}>
                    <div className="p-2 rounded bg-white/5 text-center">
                        <div className="text-lg font-bold text-white">{member.stats.projectsLed}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Projects</div>
                    </div>
                    <div className="p-2 rounded bg-white/5 text-center">
                        <div className="text-lg font-bold text-white">{member.stats.contributionScore}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Score</div>
                    </div>
                </div>

                {/* Social Actions */}
                <div className="mt-auto flex justify-center gap-4">
                    {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                            <Github className={isLeadership ? "w-5 h-5" : "w-4 h-4"} />
                        </a>
                    )}
                    {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                            <Linkedin className={isLeadership ? "w-5 h-5" : "w-4 h-4"} />
                        </a>
                    )}
                    {member.social.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                            <Twitter className={isLeadership ? "w-5 h-5" : "w-4 h-4"} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

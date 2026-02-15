"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, Users, Rocket, Trophy, TrendingUp, Star, Zap, Target, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface TeamDetail {
    title: string
    description: string
    icon: LucideIcon
    color: string
    variant: string
    focusAreas: string[]
    techStack: string[]
    currentProjects: Array<{ name: string; description: string; status?: "active" | "planning" | "completed" }>
    teamMembers: Array<{ name: string; role: string; avatar?: string }>
    achievements: string[]
    stats?: {
        memberCount?: number
        projectCount?: number
        successRate?: number
    }
}

interface TeamDetailModalProps {
    team: TeamDetail | null
    isOpen: boolean
    onClose: () => void
}

// Helper function to get color classes based on team color
const getColorClasses = (color: string) => {
    const colorMap: Record<string, { gradient: string; glow: string; border: string }> = {
        "text-blue-400": {
            gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
            glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
            border: "border-blue-500/30"
        },
        "text-purple-400": {
            gradient: "from-purple-500/20 via-purple-600/10 to-transparent",
            glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
            border: "border-purple-500/30"
        },
        "text-pink-400": {
            gradient: "from-pink-500/20 via-pink-600/10 to-transparent",
            glow: "shadow-[0_0_30px_rgba(236,72,153,0.3)]",
            border: "border-pink-500/30"
        },
        "text-yellow-400": {
            gradient: "from-yellow-500/20 via-yellow-600/10 to-transparent",
            glow: "shadow-[0_0_30px_rgba(234,179,8,0.3)]",
            border: "border-yellow-500/30"
        }
    }
    return colorMap[color] || colorMap["text-blue-400"]
}

// Section divider component
const SectionDivider = ({ icon: Icon, title }: { icon: LucideIcon; title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold font-space-grotesk text-white">
                {title}
            </h3>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
    </div>
)

export function TeamDetailModal({ team, isOpen, onClose }: TeamDetailModalProps) {
    if (!team) return null

    const colorClasses = getColorClasses(team.color)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="relative w-full max-w-5xl my-8 bg-black/95 border border-white/10 rounded-2xl pointer-events-auto max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="sticky top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110 group ml-auto mr-4"
                            >
                                <X className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                            </button>

                            {/* Enhanced Header with Gradient */}
                            <div className={cn(
                                "relative p-8 pb-6 border-b border-white/10 overflow-hidden",
                                "bg-gradient-to-br",
                                colorClasses.gradient
                            )}>
                                {/* Animated background glow */}
                                <div className={cn(
                                    "absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20",
                                    colorClasses.glow
                                )} />

                                <div className="relative z-10">
                                    <div className="flex items-start gap-6 mb-6">
                                        {/* Animated Icon */}
                                        <motion.div
                                            initial={{ rotate: -10, scale: 0.9 }}
                                            animate={{ rotate: 0, scale: 1 }}
                                            transition={{ type: "spring", delay: 0.2 }}
                                            className={cn(
                                                "w-20 h-20 rounded-2xl flex items-center justify-center relative",
                                                "bg-gradient-to-br from-white/10 to-white/5 border",
                                                colorClasses.border,
                                                team.color
                                            )}
                                        >
                                            <team.icon className="w-10 h-10" />
                                            <div className={cn(
                                                "absolute inset-0 rounded-2xl blur-xl opacity-50",
                                                colorClasses.glow
                                            )} />
                                        </motion.div>

                                        <div className="flex-1">
                                            <h2 className="text-4xl font-bold font-space-grotesk text-white mb-2">
                                                {team.title}
                                            </h2>
                                            <p className="text-white/60 text-sm leading-relaxed">
                                                {team.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Team Stats */}
                                    {team.stats && (
                                        <div className="grid grid-cols-3 gap-4">
                                            {team.stats.memberCount && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Users className="w-4 h-4 text-primary" />
                                                        <span className="text-xs text-white/50 uppercase tracking-wider">Members</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-white">{team.stats.memberCount}+</div>
                                                </motion.div>
                                            )}
                                            {team.stats.projectCount && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Rocket className="w-4 h-4 text-primary" />
                                                        <span className="text-xs text-white/50 uppercase tracking-wider">Projects</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-white">{team.stats.projectCount}+</div>
                                                </motion.div>
                                            )}
                                            {team.stats.successRate && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 }}
                                                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <TrendingUp className="w-4 h-4 text-primary" />
                                                        <span className="text-xs text-white/50 uppercase tracking-wider">Success</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-white">{team.stats.successRate}%</div>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-10">
                                {/* Focus Areas */}
                                <div>
                                    <SectionDivider icon={Target} title="Focus Areas" />
                                    <div className="flex flex-wrap gap-2">
                                        {team.focusAreas.map((area, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/10 text-white/90 text-sm font-medium hover:bg-white/15 hover:scale-105 transition-all cursor-default"
                                            >
                                                {area}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack / Tools */}
                                <div>
                                    <SectionDivider icon={Zap} title="Tech Stack & Tools" />
                                    <div className="flex flex-wrap gap-2">
                                        {team.techStack.map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.03 }}
                                                className="group relative px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-mono hover:bg-primary/20 hover:scale-105 transition-all cursor-default"
                                            >
                                                <Star className="w-3 h-3 inline-block mr-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Current Projects */}
                                <div>
                                    <SectionDivider icon={Rocket} title="Current Projects" />
                                    <div className="grid gap-4">
                                        {team.currentProjects.map((project, i) => {
                                            const status = project.status || "active"
                                            const statusConfig = {
                                                active: { color: "bg-green-500/20 text-green-400 border-green-500/30", label: "Active" },
                                                planning: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Planning" },
                                                completed: { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", label: "Completed" }
                                            }
                                            const statusStyle = statusConfig[status]

                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                                                >
                                                    <div className="flex items-start justify-between gap-4 mb-2">
                                                        <h4 className="font-semibold text-white group-hover:text-primary transition-colors flex-1">
                                                            {project.name}
                                                        </h4>
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-full text-xs font-medium border",
                                                            statusStyle.color
                                                        )}>
                                                            {statusStyle.label}
                                                        </span>
                                                    </div>
                                                    <p className="text-white/60 text-sm leading-relaxed">
                                                        {project.description}
                                                    </p>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Team Members */}
                                {team.teamMembers.length > 0 && (
                                    <div>
                                        <SectionDivider icon={Users} title="Team Members" />
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {team.teamMembers.map((member, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {member.avatar ? (
                                                            <img
                                                                src={member.avatar}
                                                                alt={member.name}
                                                                className="w-12 h-12 rounded-full border-2 border-primary/30 group-hover:border-primary/60 transition-colors"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-white font-bold text-lg border-2 border-primary/30 group-hover:border-primary/60 transition-colors">
                                                                {member.name.charAt(0)}
                                                            </div>
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-white text-sm font-semibold truncate group-hover:text-primary transition-colors">
                                                                {member.name}
                                                            </p>
                                                            <p className="text-white/50 text-xs truncate">
                                                                {member.role}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Achievements */}
                                <div>
                                    <SectionDivider icon={Trophy} title="Key Achievements" />
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {team.achievements.map((achievement, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                                            >
                                                <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                                <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">
                                                    {achievement}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Join Team CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="pt-4 border-t border-white/10"
                                >
                                    <button className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-white font-semibold hover:from-primary/30 hover:to-secondary/30 hover:border-primary/50 hover:scale-[1.02] transition-all group">
                                        <span className="flex items-center justify-center gap-2">
                                            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Join {team.title}
                                        </span>
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

"use client"

import React from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Globe, MessageSquare, Instagram } from "lucide-react"
import { cn } from "@/lib/utils"

const SOCIAL_LINKS = [
    {
        name: "LinkedIn",
        url: "https://linkedin.com/company/gfg",
        icon: Linkedin,
        color: "text-blue-400",
        border: "border-blue-500/20",
        bg: "bg-blue-500/5",
    },
    {
        name: "GitHub",
        url: "https://github.com/gfg",
        icon: Github,
        color: "text-slate-100",
        border: "border-slate-500/20",
        bg: "bg-slate-500/5",
    },
    {
        name: "Twitter",
        url: "https://twitter.com/gfg",
        icon: Twitter,
        color: "text-sky-400",
        border: "border-sky-500/20",
        bg: "bg-sky-500/5",
    },
    {
        name: "Instagram",
        url: "https://instagram.com/gfg",
        icon: Instagram,
        color: "text-pink-400",
        border: "border-pink-500/20",
        bg: "bg-pink-500/5",
    },
    {
        name: "Discord",
        url: "https://discord.gg/gfg",
        icon: MessageSquare,
        color: "text-indigo-400",
        border: "border-indigo-500/20",
        bg: "bg-indigo-500/5",
    },
    {
        name: "Website",
        url: "https://gfg.com",
        icon: Globe,
        color: "text-emerald-400",
        border: "border-emerald-500/20",
        bg: "bg-emerald-500/5",
    },
]

export default function ConnectPage() {
    return (
        <main className="min-h-screen bg-[#030303] pt-32 pb-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>

            <div className="container relative z-10 mx-auto px-4 max-w-2xl">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 mb-4"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-mono text-emerald-400 tracking-[0.2em] uppercase">Connect Hub</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-space-grotesk text-white mb-4 tracking-tight"
                    >
                        Connect With <span className="text-[#00FF80] drop-shadow-[0_0_10px_rgba(0,255,128,0.5)]">GFG</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 font-light"
                    >
                        Join our community and stay updated with the latest in tech and innovation.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {SOCIAL_LINKS.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98]",
                                link.bg,
                                link.border,
                                "hover:bg-white/5 hover:border-white/20"
                            )}
                        >
                            <div className={cn("p-2 rounded-lg bg-black/40 border border-white/5", link.color)}>
                                <link.icon className="w-6 h-6" />
                            </div>
                            <span className="flex-1 font-space-grotesk font-semibold text-white group-hover:text-[#00FF80] transition-colors text-lg">
                                {link.name}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#00FF80] transition-colors" />
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 text-center"
                >
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mx-auto mb-6" />
                    <p className="text-slate-500 text-sm font-mono tracking-widest uppercase">GFG_OS v1.0.4</p>
                </motion.div>
            </div>
        </main>
    )
}

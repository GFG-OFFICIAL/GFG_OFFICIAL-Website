"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Users, Calendar, Code, Coffee, X, Command, Sparkles,
    MessageCircle, Instagram, Linkedin, Mail, Twitter,
    ChevronRight, Copy, Check, Zap, Star
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { AnimatedCounter } from "@/components/ui/effects"
import gfgLogo from "@/assets/gfg-official-logo.png"

// --- MarqueeSection ---
const TECHNOLOGIES = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "NODE.JS", "PYTHON", "AI/ML", "CLOUD", "DEVOPS", "OPEN SOURCE"
]

export function MarqueeSection() {
    return (
        <section className="relative w-full border-y border-white/5 bg-background/50 backdrop-blur-sm overflow-hidden py-3 md:py-4">
            <div className="flex w-full whitespace-nowrap overflow-hidden mask-fade-sides">
                <div className="flex animate-marquee gap-16 min-w-full items-center justify-around px-8">
                    {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
                        <span key={i} className="text-xl font-bold font-mono text-muted-foreground/30 flex items-center gap-4 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- StatsSection ---
const STATS = [
    { label: "Active Members", value: 500, suffix: "+", icon: Users, color: "text-primary" },
    { label: "Events Hosted", value: 50, suffix: "+", icon: Calendar, color: "text-secondary" },
    { label: "Projects Built", value: 120, suffix: "+", icon: Code, color: "text-purple-400" },
    { label: "Coffee Consumed", value: 1000, suffix: "L", icon: Coffee, color: "text-orange-400" },
]

export function StatsSection() {
    return (
        <section className="py-[6vh] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse-glow" />
            <div className="container mx-auto px-4 w-full max-w-7xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat, idx) => (
                        <div key={idx} className="glass-card p-6 rounded-xl flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-primary/20">
                            <div className={`p-3 rounded-full bg-white/5 mb-4 group-hover:bg-white/10 transition-colors ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-space-grotesk group-hover:text-primary transition-colors text-glow">
                                <AnimatedCounter end={stat.value} />
                                {stat.suffix}
                            </div>
                            <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- WelcomeSplash ---
export const WelcomeSplash = () => {
    const [isVisible, setIsVisible] = useState(true)
    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem("hasSeenSplashNeo")
        if (hasSeenSplash) {
            setIsVisible(false)
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false)
                sessionStorage.setItem("hasSeenSplashNeo", "true")
            }, 3500)
            return () => clearTimeout(timer)
        }
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 mb-8 relative">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                            <Command className="w-10 h-10 text-primary relative z-10" />
                        </motion.div>
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-center space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">GeeksforGeeks</h1>
                            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-medium">
                                <span>Student Chapter</span><span className="w-1 h-1 rounded-full bg-primary" /><span>ITER</span>
                            </div>
                        </motion.div>
                        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }} className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }} className="w-full h-full bg-primary" />
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.05)_0%,transparent_70%)] pointer-events-none" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// --- JoinModal ---
interface JoinModalProps {
    isOpen: boolean
    onClose: () => void
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
    const [copied, setCopied] = useState(false)
    const copyCode = () => {
        navigator.clipboard.writeText("npm join gfg-iter")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const socialLinks = [
        { icon: MessageCircle, href: "https://chat.whatsapp.com/Hr0puwutetlK6dc1MTXXJZ", label: "WhatsApp", color: "hover:text-[#25D366]", bg: "hover:bg-[#25D366]/10", borderColor: "group-hover:border-[#25D366]/50" },
        { icon: Instagram, href: "https://www.instagram.com/p/DShF7VrgI0L/?igsh=MWI3NTVyN250Z21kaA==", label: "Instagram", color: "hover:text-[#E1306C]", bg: "hover:bg-[#E1306C]/10", borderColor: "group-hover:border-[#E1306C]/50" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/gfgiter/posts/?feedView=all", label: "LinkedIn", color: "hover:text-[#0A66C2]", bg: "hover:bg-[#0A66C2]/10", borderColor: "group-hover:border-[#0A66C2]/50" },
        { icon: Twitter, href: "https://x.com/gfg_iter", label: "X (Twitter)", color: "hover:text-[#1DA1F2]", bg: "hover:bg-[#1DA1F2]/10", borderColor: "group-hover:border-[#1DA1F2]/50" },
        { icon: Mail, href: "mailto:gfgiter@gmail.com", label: "Email", color: "hover:text-[#EA4335]", bg: "hover:bg-[#EA4335]/10", borderColor: "group-hover:border-[#EA4335]/50" },
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[70] p-4">
                        <div className="relative bg-[#050505] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-primary/20 blur-[100px] opacity-40 pointer-events-none" />
                            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors z-30 group"><X className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" /></button>
                            <div className="relative z-10 px-8 py-12 flex flex-col items-center text-center">
                                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
                                    <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,128,0.5)] animate-pulse" /><span className="text-[10px] font-mono font-bold tracking-wider text-white/70 uppercase">Recruiting Soon</span><Sparkles className="w-3 h-3 text-primary" />
                                </motion.div>
                                <div className="mb-6 relative">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-white/5 to-white/0 border border-white/10 flex items-center justify-center overflow-hidden">
                                        <Image src={gfgLogo} alt="GFG Logo" width={48} height={48} className="object-contain" />
                                    </div>
                                    <div className="absolute -inset-4 bg-primary/20 blur-xl -z-10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-700" />
                                </div>
                                <h3 className="text-2xl font-bold font-space-grotesk text-white mb-3">Join the Network</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-[280px]">We&apos;re preparing for the next intake. Connect with us to stay updated and be part of something extraordinary.</p>
                                <div onClick={copyCode} className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-1 mb-8 cursor-pointer group hover:border-white/20 transition-colors">
                                    <div className="bg-white/5 rounded-lg px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3"><ChevronRight className="w-4 h-4 text-white/30" /><code className="text-sm font-mono text-white">npm join gfg-iter</code></div>
                                        {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full mb-6"><div className="h-px flex-1 bg-white/10" /><span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Connect With Us</span><div className="h-px flex-1 bg-white/10" /></div>
                                <div className="flex items-center justify-center gap-3 w-full">
                                    {socialLinks.map((social, i) => (
                                        <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={cn("p-3 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 hover:-translate-y-1", social.bg, social.color)}><social.icon className="w-5 h-5" /></a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

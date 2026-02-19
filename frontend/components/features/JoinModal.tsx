"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Command, MessageCircle, Instagram, Linkedin, Mail, Twitter, ChevronRight, Copy, Check, Sparkles, Users, Zap, Star } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
// @ts-expect-error logo import
import gfgLogo from "@/assets/gfg-official-logo.png"

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
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[70] p-4"
                    >
                        <div className="relative bg-[#050505] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">

                            {/* Deep Glow Effect */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-primary/20 blur-[100px] opacity-40 pointer-events-none" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors z-30 group"
                            >
                                <X className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                            </button>

                            <div className="relative z-10 px-8 py-12 flex flex-col items-center text-center">

                                {/* Status Badge */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"
                                >
                                    <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,128,0.5)] animate-pulse" />
                                    <span className="text-[10px] font-mono font-bold tracking-wider text-white/70 uppercase">Recruiting Soon</span>
                                    <Sparkles className="w-3 h-3 text-primary" />
                                </motion.div>

                                {/* Icon Container */}
                                <div className="mb-6 relative">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-white/5 to-white/0 border border-white/10 flex items-center justify-center overflow-hidden">
                                        <Image src={gfgLogo} alt="GFG Logo" width={48} height={48} className="object-contain" />
                                    </div>
                                    <div className="absolute -inset-4 bg-primary/20 blur-xl -z-10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-700" />
                                </div>

                                {/* Heading */}
                                <h3 className="text-2xl font-bold font-space-grotesk text-white mb-3">
                                    Join the Network
                                </h3>

                                We&apos;re preparing for the next intake. Connect with us to stay updated and be part of something extraordinary.

                                {/* Terminal Snippet */}
                                <div
                                    onClick={copyCode}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-1 mb-8 cursor-pointer group hover:border-white/20 transition-colors"
                                >
                                    <div className="bg-white/5 rounded-lg px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <ChevronRight className="w-4 h-4 text-white/30" />
                                            <code className="text-sm font-mono text-white">npm join gfg-iter</code>
                                        </div>
                                        {copied ? (
                                            <Check className="w-4 h-4 text-primary" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                                        )}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="flex items-center gap-4 w-full mb-6">
                                    <div className="h-px flex-1 bg-white/10" />
                                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Connect With Us</span>
                                    <div className="h-px flex-1 bg-white/10" />
                                </div>

                                {/* Social Grid */}
                                <div className="flex items-center justify-center gap-3 w-full">
                                    {socialLinks.map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                "p-3 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 hover:-translate-y-1",
                                                social.bg,
                                                social.color
                                            )}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
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

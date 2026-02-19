"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionShellProps {
    children: React.ReactNode
    id?: string
    className?: string
    title?: string
    subtitle?: string
    badge?: string
}

export function SectionShell({ children, id, className, title, subtitle, badge }: SectionShellProps) {
    return (
        <section id={id} className={cn("py-24 md:py-32 relative overflow-hidden", className)}>

            {/* Ethereal Section Header */}
            <div className="container mx-auto px-4 relative z-10 mb-16 md:mb-24 text-center">

                {/* Decoration Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-green-500/0 via-green-500/20 to-green-500/0" />

                {badge && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6 relative"
                    >
                        <div className="absolute -inset-1 bg-green-500/20 blur-md opacity-50" />
                        <span className="relative px-3 py-1 bg-[#0a1510] border border-green-500/20 text-[10px] font-bold tracking-[0.2em] uppercase text-green-400 font-mono">
                            {"//"} {badge}
                        </span>
                    </motion.div>
                )}

                {title && (
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
                    >
                        {title}
                        <span className="text-green-500">.</span>
                    </motion.h2>
                )}

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {children}
            </div>
        </section>
    )
}

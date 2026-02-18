"use client"

import { motion } from "framer-motion"
import { Cpu, Globe, Zap, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { TextReveal } from "@/components/ui/text-reveal"
import { GradientText } from "@/components/ui/gradient-text"

export function AboutSection() {
    return (
        <section className="relative py-[8vh] overflow-hidden bg-background min-h-screen flex items-center">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-secondary/5 blur-[120px] pointer-events-none" />

            <div className="container relative z-10 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
                                <span className="text-primary italic">#</span> About The Chapter
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light"
                        >
                            <p>
                                <strong className="text-foreground">GeeksforGeeks Student Chapter ITER</strong> is not just a club; it's a{" "}
                                    high-performance compiler
                                for your career. We are a community of passionate developers, designers, and innovators.
                            </p>
                            <p>
                                <TextReveal
                                    text="Our mission is to bridge the gap between academic curriculum and industry demands. We organize hackathons, coding contests, and technical workshops to ensure you ship code that matters."
                                    variant="blur"
                                    delay={0.3}
                                />
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="p-4 rounded-lg bg-card/50 border border-white/5 hover:border-primary/30 transition-colors">
                                <h3 className="text-3xl font-bold font-mono text-white mb-2">103</h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider">Active Members</p>
                            </div>
                            <div className="p-4 rounded-lg bg-card/50 border border-white/5 hover:border-secondary/30 transition-colors">
                                <h3 className="text-3xl font-bold font-mono text-white mb-2">5</h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider">Events Hosted</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Visual/Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-20 blur-2xl animate-pulse-glow" />
                        <div className="relative glass-panel p-8 rounded-2xl border border-white/10 overflow-hidden transform hover:rotate-2 transition-transform duration-500">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <Code2 className="w-32 h-32" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="h-32 rounded-lg bg-white/5 animate-pulse" />
                                    <div className="h-20 rounded-lg bg-white/5 animate-pulse delay-75" />
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="h-20 rounded-lg bg-white/5 animate-pulse delay-150" />
                                    <div className="h-32 rounded-lg bg-white/5 animate-pulse delay-300" />
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-500" />
                                        <span className="font-mono text-sm text-yellow-500">High Voltage Learning</span>
                                    </div>
                                    <span className="font-mono text-xs text-muted-foreground">v2.0.24</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

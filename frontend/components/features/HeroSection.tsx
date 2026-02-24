"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion"
import { ArrowRight, Terminal, Zap, Globe, Cpu, Database, Network, Code2, ChevronRight, Layers, Box, Star, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlitchText, TextReveal } from "@/components/ui/effects"
import { useEffect, useState } from "react"
import Image from "next/image"
import gfgLogo from "@/public/gfg-official-logo.png"

export function HeroSection() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    // Mouse Parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        mouseX.set((clientX - left) / width - 0.5)
        mouseY.set((clientY - top) / height - 0.5)
    }

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030303] selection:bg-primary/30 py-[5vh]"
        >
            {/* 1. Dynamic Background Grid with Scanning Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,1))] z-0" />
            <div className="absolute inset-0 overflow-hidden perspective-1000">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,128,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 transform-gpu"
                    style={{ transform: 'rotateX(60deg) scale(2)' }} />

                {/* Moving Scanline */}
                <motion.div
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_20px_rgba(0,255,128,0.5)] z-0"
                />
            </div>

            {/* 2. Central Holographic Core Animation */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[800px] md:h-[800px] w-[90vw] h-[90vw] pointer-events-none opacity-30 z-0">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                    transition={{ rotate: { duration: 60, ease: "linear", repeat: Infinity }, scale: { duration: 8, ease: "easeInOut", repeat: Infinity } }}
                    className="absolute inset-0 rounded-full border border-primary/10 border-dashed"
                />
                {/* Middle Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    className="absolute inset-20 rounded-full border border-primary/20 border-dotted opacity-50"
                />
                {/* Inner Core */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    className="absolute inset-40 rounded-full border-2 border-primary/5 shadow-[0_0_100px_rgba(0,255,128,0.1)]"
                />
                {/* Floating Particles/Nodes */}
                <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#00FF80]" />
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_#00F0FF]" />
                    <div className="absolute left-0 top-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                </div>
            </div>

            <motion.div
                style={{ y, opacity }}
                className="container mx-auto relative z-10 px-4 w-full max-w-7xl flex flex-col items-center text-center mt-10 md:mt-0"
            >
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="hidden lg:inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-black/40 border border-primary/20 backdrop-blur-md mb-8 md:mb-12 hover:border-primary/50 transition-all group cursor-default shadow-[0_0_15px_rgba(0,255,128,0.1)] mt-[10vh] md:mt-0"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] md:text-xs font-mono text-primary/80 tracking-widest uppercase whitespace-nowrap">
                        Iter Campus Node • Active
                    </span>
                </motion.div>

                {/* Main Hero Content */}
                <div className="relative mb-8 md:mb-12 w-full max-w-4xl mx-auto flex flex-col items-center">
                    {/* Floating Decorative Elements */}
                    <motion.div
                        style={{ x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]), y: useTransform(mouseY, [-0.5, 0.5], [-20, 20]) }}
                        className="absolute left-[-2rem] md:-left-6 top-4 md:top-12 text-primary/10 md:text-primary/20 pointer-events-none"
                    >
                        <Code2 className="w-12 h-12 md:w-24 md:h-24 rotate-12" />
                    </motion.div>
                    <motion.div
                        style={{ x: useTransform(mouseX, [-0.5, 0.5], [20, -20]), y: useTransform(mouseY, [-0.5, 0.5], [20, -20]) }}
                        className="absolute right-[-2rem] md:-right-12 bottom-[-3rem] md:bottom-12 text-secondary/10 md:text-secondary/20 pointer-events-none"
                    >
                        <Cpu className="w-12 h-12 md:w-24 md:h-24 -rotate-12" />
                    </motion.div>



                    {/* Official Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-[18vmin] h-[18vmin] md:w-[15vmin] md:h-[15vmin] mb-[2vh] md:mb-[3vh] mx-auto z-20"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[30px] md:blur-[50px] rounded-full animate-pulse" />
                        <Image
                            src={gfgLogo}
                            alt="GFG Official Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(0,255,128,0.5)] scale-110"
                        />
                    </motion.div>

                    <h1 className="font-bold tracking-tighter leading-[0.95] md:leading-[0.9] font-space-grotesk z-10 w-full px-2" style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}>
                        <span className="block text-white mb-[1vh] drop-shadow-2xl">
                            GeeksforGeeks
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-gradient pb-2 md:pb-4" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
                            Student Chapter | ITER
                        </span>
                    </h1>

                    <div className="flex flex-col items-center gap-4 mt-2 md:mt-4 w-full">
                        <div className="flex items-center justify-center gap-3 md:gap-4 w-full">
                            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-primary/50" />
                            <span className="text-sm md:text-xl font-mono text-muted-foreground tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap">
                                Code • Create • Conquer
                            </span>
                            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-primary/50" />
                        </div>

                        {/* Club Activity Ticker */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="flex items-center gap-6 overflow-hidden whitespace-nowrap py-2 border-y border-white/5 w-full max-w-lg"
                        >
                            <div className="flex items-center gap-8 animate-infinite-scroll">
                                <span className="text-[10px] font-mono text-primary/60 flex items-center gap-2"><Star className="w-3 h-3" /> 500+ ACTIVE GEEKS</span>
                                <span className="text-[10px] font-mono text-secondary/60 flex items-center gap-2"><Activity className="w-3 h-3" /> 25+ PROJECTS SHIPPED</span>
                                <span className="text-[10px] font-mono text-white/60 flex items-center gap-2"><Zap className="w-3 h-3" /> 15+ NATIONAL WINS</span>
                                {/* Duplicate for seamless scroll */}
                                <span className="text-[10px] font-mono text-primary/60 flex items-center gap-2"><Star className="w-3 h-3" /> 500+ ACTIVE GEEKS</span>
                                <span className="text-[10px] font-mono text-secondary/60 flex items-center gap-2"><Activity className="w-3 h-3" /> 25+ PROJECTS SHIPPED</span>
                                <span className="text-[10px] font-mono text-white/60 flex items-center gap-2"><Zap className="w-3 h-3" /> 15+ NATIONAL WINS</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Mock Terminal / Code Window - Innovative Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 50 }}
                    style={{
                        rotateX: useTransform(mouseY, [-0.5, 0.5], [5, -5]),
                        rotateY: useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
                    }}
                    className="w-[90%] md:w-full max-w-2xl bg-[#0a0a0a]/90 md:bg-[#0a0a0a]/80 border border-primary/20 hover:border-primary/50 rounded-xl overflow-hidden backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,128,0.05)] md:shadow-2xl mb-[4vh] transition-all duration-500 will-change-transform group z-10"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center px-3 md:px-4 py-2 md:py-3 bg-primary/10 border-b border-primary/20">
                        <div className="flex gap-1.5 md:gap-2">
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="mx-auto text-[10px] md:text-xs font-mono text-primary/80 flex items-center gap-2">
                            <Terminal className="w-3 h-3 md:w-4 md:h-4" />
                            ~/gfg-iter/core_mission
                        </div>
                    </div>
                    {/* Terminal Content */}
                    <div className="p-4 md:p-6 text-left font-mono text-[11px] md:text-sm space-y-2 md:space-y-3 relative overflow-hidden">
                        {/* Terminal scanline */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,255,128,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline pointer-events-none" />

                        <div className="flex flex-wrap items-baseline gap-2 relative z-10">
                            <span className="text-secondary">$</span>
                            <span className="text-blue-400">./execute_vision.sh</span>
                        </div>
                        <div className="text-muted-foreground pl-2 md:pl-4 border-l border-primary/20 space-y-1 relative z-10">
                            <div className="flex items-center gap-2"><span className="text-primary">{'>'}</span> System.status: <span className="text-green-400">OPTIMAL</span></div>
                            <div className="flex items-center gap-2"><span className="text-primary">{'>'}</span> Active_Nodes: <span className="text-white">528 Students</span></div>
                            <div className="flex items-center gap-2"><span className="text-primary">{'>'}</span> Current_Project: <span className="text-secondary italic">Innovation_Hub_v2.0</span></div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mt-2">
                                <span className="text-primary">{'>'}</span> Sector_Goal:
                                <span className="text-white font-bold bg-primary/20 px-2 py-0.5 rounded inline-block w-fit">Forging Industry-Ready Technocrats</span>
                            </div>
                        </div>
                        <div className="flex items-start md:items-center gap-2 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-primary/10 relative z-10">
                            <span className="text-secondary animate-pulse shrink-0">_</span>
                            <TextReveal
                                text="Join the elite network of developers building the future of technology."
                                className="text-gray-300 pr-2 leading-relaxed"
                                delay={1.5}
                            />
                        </div>
                    </div>
                </motion.div>


                {/* Floating Stats Responsive Based */}
                <div className="md:absolute md:bottom-5 left-0 w-full flex justify-center md:justify-between px-4 md:px-10 pointer-events-none opacity-60 md:opacity-100 z-0 -mb-[16px] md:mb-0">
                    <div className="hidden md:flex justify-between w-full">
                        <FeatureBadge icon={Code2} label="Code" value="100%" />
                        <FeatureBadge icon={Network} label="Connect" value="Active" />
                        <FeatureBadge icon={Box} label="Build" value="Ready" />
                    </div>
                    {/* Mobile optimized mini-stats - Now flows naturally BEFORE CTAs */}
                    <div className="flex md:hidden gap-8 justify-center w-full">
                        <div className="flex items-center gap-2 text-primary text-[11px] font-mono font-bold tracking-[0.15em]"><Code2 className="w-4 h-4" /> CODE</div>
                        <div className="flex items-center gap-2 text-secondary text-[11px] font-mono font-bold tracking-[0.15em]"><Network className="w-4 h-4" /> CONNECT</div>
                        <div className="flex items-center gap-2 text-white text-[11px] font-mono font-bold tracking-[0.15em]"><Box className="w-4 h-4" /> BUILD</div>
                    </div>
                </div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col xl:flex-row items-center justify-center gap-[5px] xl:gap-6 w-full px-6 z-10"
                >
                    <button
                        onClick={() => {
                            const joinBtn = document.querySelector('[data-join-trigger]') as HTMLElement;
                            joinBtn?.click();
                        }}
                        className="group relative w-full max-w-[320px] xl:w-auto px-6 md:px-8 py-3 md:py-4 bg-primary text-black font-mono font-bold text-sm md:text-base uppercase tracking-widest rounded-none hover:bg-white transition-colors duration-300 overflow-hidden shadow-[0_0_20px_rgba(0,255,128,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] mx-auto xl:mx-0"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                            Initialize Access
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    <button
                        onClick={() => {
                            const eventsSection = document.querySelector('#events');
                            eventsSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group relative w-full max-w-[320px] xl:w-auto px-6 md:px-8 py-3 md:py-4 bg-transparent text-white border border-white/20 font-mono font-bold text-sm md:text-base uppercase tracking-widest hover:border-primary/50 transition-colors duration-300 mx-auto xl:mx-0"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <Layers className="w-4 h-4 md:w-5 md:h-5 group-hover:text-primary transition-colors" />
                            Explore Protocols
                        </span>
                    </button>
                </motion.div>
            </motion.div>
        </section>
    )
}

function FeatureBadge({ icon: Icon, label, value }: { icon: typeof Code2, label: string, value: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-white/40 font-mono text-xs"
        >
            <Icon className="w-4 h-4" />
            <span className="uppercase tracking-widest">{label}</span>
            <div className="h-px w-8 bg-white/20" />
            <span className="text-primary">{value}</span>
        </motion.div>
    )
}


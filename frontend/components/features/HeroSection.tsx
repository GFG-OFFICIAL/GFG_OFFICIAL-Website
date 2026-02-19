"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion"
import { ArrowRight, Terminal, Zap, Globe, Cpu, Database, Network, Code2, ChevronRight, Layers, Box } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlitchText } from "@/components/ui/glitch-text"
import { TextReveal } from "@/components/ui/text-reveal"
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
                className="container relative z-10 px-4 flex flex-col items-center text-center mt-10 md:mt-0"
            >
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-primary/50 transition-colors group cursor-default"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] md:text-xs font-mono text-primary/80 tracking-wider">
                        SYSTEMS ONLINE :: V.2.0.24
                    </span>
                </motion.div>

                {/* Main Hero Content */}
                <div className="relative mb-8 md:mb-12 max-w-5xl mx-auto">
                    {/* Floating Decorative Elements */}
                    <motion.div
                        style={{ x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]), y: useTransform(mouseY, [-0.5, 0.5], [-20, 20]) }}
                        className="absolute -left-12 -top-12 text-primary/10 hidden md:block"
                    >
                        <Code2 className="w-24 h-24 rotate-12" />
                    </motion.div>
                    <motion.div
                        style={{ x: useTransform(mouseX, [-0.5, 0.5], [20, -20]), y: useTransform(mouseY, [-0.5, 0.5], [20, -20]) }}
                        className="absolute -right-12 bottom-12 text-secondary/10 hidden md:block"
                    >
                        <Cpu className="w-24 h-24 -rotate-12" />
                    </motion.div>



                    {/* Official Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-[15vmin] h-[15vmin] mb-[3vh] mx-auto"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full" />
                        <Image
                            src={gfgLogo}
                            alt="GFG Official Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(0,255,128,0.5)]"
                        />
                    </motion.div>

                    <h1 className="font-bold tracking-tighter leading-[0.9] font-space-grotesk" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
                        <span className="block text-white mb-[1vh] drop-shadow-2xl">
                            GeeksforGeeks
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-300% animate-gradient" style={{ fontSize: 'clamp(1.75rem, 6vw, 5rem)' }}>
                            campus body ITER
                        </span>
                    </h1>

                    <div className="flex items-center justify-center gap-4 mt-4 md:mt-6">
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-primary/50" />
                        <span className="text-xl md:text-2xl font-mono text-muted-foreground tracking-[0.2em] uppercase">
                            Digital Architects
                        </span>
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-primary/50" />
                    </div>
                </div>

                {/* Mock Terminal / Code Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        rotateX: useTransform(mouseY, [-0.5, 0.5], [5, -5]),
                        rotateY: useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
                    }}
                    className="w-full max-w-2xl bg-[#0a0a0a]/90 border border-white/10 rounded-lg overflow-hidden backdrop-blur-xl shadow-2xl mb-[3vh] group hover:border-primary/30 transition-colors duration-500 will-change-transform"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="mx-auto text-xs font-mono text-muted-foreground/60 flex items-center gap-2">
                            <Terminal className="w-3 h-3" />
                            admin@gfg-iter:~/mission
                        </div>
                    </div>
                    {/* Terminal Content */}
                    <div className="p-4 md:p-6 text-left font-mono text-xs md:text-sm space-y-1 md:space-y-2">
                        <div className="flex items-baseline gap-2">
                            <span className="text-green-500">$</span>
                            <span className="text-blue-400">./init_protocol.sh</span>
                        </div>
                        <div className="text-muted-foreground pl-4">
                            <span className="text-primary">{'>'}</span> Loading modules... [100%]<br />
                            <span className="text-primary">{'>'}</span> Establishing neural link... <span className="text-green-400">Success</span><br />
                            <span className="text-primary">{'>'}</span> Target: <span className="text-white font-bold">Innovation & Excellence</span>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                            <span className="text-purple-400 animate-pulse">_</span>
                            <TextReveal
                                text="Building the future of technology, one line at a time."
                                className="text-gray-300"
                                delay={1.5}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-5"
                >
                    <button
                        onClick={() => {
                            const joinBtn = document.querySelector('[data-join-trigger]') as HTMLElement;
                            joinBtn?.click();
                        }}
                        className="group relative px-8 py-4 bg-primary text-black font-mono font-bold uppercase tracking-wider rounded-none clip-path-slant hover:bg-white transition-colors duration-300 overflow-hidden"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Zap className="w-5 h-5 fill-current" />
                            Initialize Access
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    <button
                        onClick={() => {
                            const eventsSection = document.querySelector('#events');
                            eventsSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group relative px-8 py-4 bg-transparent text-white border border-white/20 font-mono font-bold uppercase tracking-wider hover:border-primary/50 transition-colors duration-300"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Layers className="w-5 h-5" />
                            Explore Protocols
                        </span>
                    </button>
                </motion.div>

                {/* Floating Stats / Features */}
                <div className="absolute bottom-10 left-0 w-full hidden md:flex justify-between px-10 pointer-events-none">
                    <FeatureBadge icon={Code2} label="Code" value="100%" />
                    <FeatureBadge icon={Network} label="Connect" value="Active" />
                    <FeatureBadge icon={Box} label="Build" value="Ready" />
                </div>
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


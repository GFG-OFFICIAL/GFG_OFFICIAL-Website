"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useSpring, useMotionValue, useInView, Variant, useScroll } from "framer-motion"
import { cn } from "@/lib/utils"
import Lenis from "@studio-freight/lenis"
import { useRouter } from "next/navigation"
import { Command as CommandPrimitive } from "cmdk"
import {
    Search, Calculator, Calendar, CreditCard, Settings,
    User, Trophy, Flame, LayoutDashboard, Code, Monitor
} from "lucide-react"

// --- CustomCursor ---
export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer')) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }
        window.addEventListener("mousemove", updateMousePosition)
        window.addEventListener("mouseover", handleMouseOver)
        return () => {
            window.removeEventListener("mousemove", updateMousePosition)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8, scale: isHovering ? 2.5 : 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9998] mix-blend-difference"
                animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isHovering ? 1.5 : 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.2 }}
            />
        </>
    )
}

// --- MagneticButton ---
interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    strength?: number
}

export function MagneticButton({
    children,
    className,
    strength = 0.3
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        setPosition({ x: (e.clientX - centerX) * strength, y: (e.clientY - centerY) * strength })
    }

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 })

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(
                "relative px-6 py-3 overflow-hidden bg-primary/10 rounded-xl text-primary font-mono text-sm font-bold uppercase tracking-wider border border-primary/50 hover:bg-primary hover:text-black transition-colors duration-300 group",
                className
            )}
        >
            <motion.span
                className="relative z-10 flex items-center gap-2"
                animate={{ rotateX: -position.y * 0.1, rotateY: position.x * 0.1 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
    )
}

// --- MotionWrapper ---
interface MotionProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    viewportAmount?: number
}

export function FadeIn({ children, className, delay = 0, duration = 0.5, viewportAmount = 0.3, ...props }: MotionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: viewportAmount })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration, delay, type: "spring", stiffness: 100, damping: 20 }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function SlideInLeft({ children, className, delay = 0, duration = 0.5, viewportAmount = 0.3, ...props }: MotionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: viewportAmount })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration, delay, type: "spring", stiffness: 100, damping: 20 }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function SlideInRight({ children, className, delay = 0, duration = 0.5, viewportAmount = 0.3, ...props }: MotionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: viewportAmount })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration, delay, type: "spring", stiffness: 100, damping: 20 }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function StaggerContainer({ children, className, delay = 0, staggerChildren = 0.1, ...props }: MotionProps & { staggerChildren?: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren, delayChildren: delay } },
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export const staggerItem: { hidden: Variant, show: Variant } = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
}

// --- MouseFollower ---
export function MouseFollower() {
    const [isVisible, setIsVisible] = useState(false)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)
            if (!isVisible) setIsVisible(true)
        }
        window.addEventListener("mousemove", moveCursor)
        document.body.addEventListener("mouseenter", () => setIsVisible(true))
        document.body.addEventListener("mouseleave", () => setIsVisible(false))
        return () => {
            window.removeEventListener("mousemove", moveCursor)
        }
    }, [cursorX, cursorY, isVisible])

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{ translateX: cursorXSpring, translateY: cursorYSpring, opacity: isVisible ? 1 : 0 }}
        >
            <div className="w-full h-full bg-primary rounded-full blur-[2px] opacity-70" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full -z-10" />
        </motion.div>
    )
}

// --- ScrollProgress ---
export function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[9999] shadow-[0_0_10px_rgba(34,197,94,0.7)]"
            style={{ scaleX }}
        />
    )
}

// --- SmoothScroll ---
export function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        return () => lenis.destroy()
    }, [])
    return null
}

// --- CommandPalette ---
export function CommandPalette() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = (command: () => unknown) => {
        setOpen(false)
        command()
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[20vh] backdrop-blur-sm transition-all duration-300">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl shadow-indigo-500/10 ring-1 ring-white/10 backdrop-blur-2xl"
                    >
                        <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-transparent text-white">
                            <div className="flex items-center border-b border-white/10 px-4" cmdk-input-wrapper="">
                                <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
                                <CommandPrimitive.Input
                                    placeholder="Type a command or search..."
                                    className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                            <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                <CommandPrimitive.Empty className="py-6 text-center text-sm text-neutral-500">
                                    No results found.
                                </CommandPrimitive.Empty>
                                <CommandPrimitive.Group heading="Navigation" className="mb-2 px-2 text-xs font-medium text-neutral-500">
                                    <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </CommandItem>
                                    <CommandItem onSelect={() => runCommand(() => router.push('/#daily-challenge'))}>
                                        <Code className="mr-2 h-4 w-4" />
                                        <span>Problem of the Day</span>
                                    </CommandItem>
                                    <CommandItem onSelect={() => runCommand(() => router.push('/leaderboard'))}>
                                        <Trophy className="mr-2 h-4 w-4" />
                                        <span>Leaderboard</span>
                                    </CommandItem>
                                </CommandPrimitive.Group>
                                <CommandPrimitive.Group heading="Tools" className="mb-2 px-2 text-xs font-medium text-neutral-500">
                                    <CommandItem onSelect={() => runCommand(() => console.log("Focus Mode"))}>
                                        <Flame className="mr-2 h-4 w-4" />
                                        <span>Start Focus Mode</span>
                                    </CommandItem>
                                    <CommandItem onSelect={() => runCommand(() => console.log("Theme"))}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Toggle Theme</span>
                                    </CommandItem>
                                </CommandPrimitive.Group>
                                <CommandPrimitive.Group heading="Team" className="px-2 text-xs font-medium text-neutral-500">
                                    <CommandItem onSelect={() => runCommand(() => router.push('/team'))}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>View Team</span>
                                    </CommandItem>
                                </CommandPrimitive.Group>
                            </CommandPrimitive.List>
                        </CommandPrimitive>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function CommandItem({ children, onSelect }: { children: React.ReactNode, onSelect: () => void }) {
    return (
        <CommandPrimitive.Item
            onSelect={onSelect}
            className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm text-neutral-400 outline-none hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white transition-colors data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
        >
            {children}
        </CommandPrimitive.Item>
    )
}

// --- TerminalWindow ---
interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    children: React.ReactNode
    showControls?: boolean
    contentClassName?: string
}

export function TerminalWindow({ title = "bash", children, showControls = true, className, contentClassName, ...props }: TerminalWindowProps) {
    return (
        <div className={cn("rounded-lg overflow-hidden border border-white/5 bg-[#0e0e0e] shadow-2xl font-mono text-sm relative group flex flex-col", className)} {...props}>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none opacity-50" />
            <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-white/5 relative z-10">
                <div className="flex items-center gap-2">
                    {showControls && (
                        <div className="flex gap-2 group-hover:opacity-100 opacity-70 transition-opacity">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 shadow-inner" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 shadow-inner" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 shadow-inner" />
                        </div>
                    )}
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-500 text-xs font-medium tracking-wide">
                    <span>{title}</span>
                </div>
                <div className="w-12" />
            </div>
            <div className={cn("flex-1 relative z-10 overflow-hidden", contentClassName)}>
                {children}
            </div>
        </div>
    )
}

// --- OrbitSystem ---
export const OrbitSystem = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const [isCoreHovered, setIsCoreHovered] = useState(false)

    const nodes = [
        { id: "events", label: "Events", icon: "🗓️", desc: "Hackathons, Workshops, & Tech Talks", radius: 140, duration: 20 },
        { id: "opensource", label: "Open Source", icon: "💻", desc: "Building tools for the community", radius: 220, duration: 25 },
        { id: "mentorship", label: "Mentorship", icon: "🤝", desc: "Guidance from industry seniors", radius: 300, duration: 30 },
    ]

    return (
        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center mx-auto my-12">
            <div className="absolute inset-0 rounded-full border border-white/5 opacity-20 animate-[spin_10s_linear_infinite]"
                style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(47, 141, 70, 0.1) 360deg)' }} />
            <motion.div
                className={cn(
                    "relative z-20 w-24 h-24 md:w-32 md:h-32 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-500",
                    isCoreHovered ? "bg-primary/20 border-primary shadow-[0_0_80px_rgba(47,141,70,0.6)]" : "bg-black border-primary/50 shadow-[0_0_50px_rgba(47,141,70,0.3)]"
                )}
                onMouseEnter={() => setIsCoreHovered(true)}
                onMouseLeave={() => setIsCoreHovered(false)}
                animate={{ scale: isCoreHovered ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="text-center relative z-10">
                    <motion.div
                        className="text-2xl md:text-3xl font-bold text-white font-heading"
                        animate={{ textShadow: isCoreHovered ? "0 0 20px rgba(47,141,70,0.8)" : "0 0 0px rgba(0,0,0,0)" }}
                    >
                        ITER
                    </motion.div>
                    <div className="text-[8px] md:text-[10px] text-primary font-mono tracking-widest">
                        {isCoreHovered ? ">> SYSTEM ACTIVE <<" : "CORE"}
                    </div>
                </div>
            </motion.div>
            {nodes.map((node, i) => (
                <div key={node.id} className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className={cn(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500",
                            hoveredNode === node.id || isCoreHovered ? "border-primary/30 shadow-[0_0_20px_rgba(47,141,70,0.2)]" : "border-white/10 shadow-[0_0_15px_rgba(47,141,70,0.1)]"
                        )}
                        style={{ width: `${(node.radius * 2) / 600 * 100}%`, height: `${(node.radius * 2) / 600 * 100}%`, maxWidth: node.radius * 2, maxHeight: node.radius * 2 }}
                    />
                    <motion.div
                        className="absolute w-full h-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: isCoreHovered ? node.duration * 0.2 : node.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: -(i * 5)
                        }}
                    >
                        {[...Array(3)].map((_, t) => (
                            <div
                                key={`trail-dot-${t}`}
                                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary"
                                style={{
                                    marginTop: -node.radius,
                                    marginLeft: '-4px',
                                    transformOrigin: `50% ${node.radius}px`,
                                    transform: `rotate(-${(t + 1) * 3}deg)`,
                                    opacity: 0.4 / (t + 1),
                                    filter: 'blur(2px)'
                                }}
                            />
                        ))}
                        <div className="absolute top-0 left-1/2 -ml-6 -mt-6 md:-ml-8 md:-mt-8 w-12 h-12 md:w-16 md:h-16 pointer-events-auto cursor-pointer group">
                            <motion.div
                                className="w-full h-full"
                                animate={{ rotate: -360 }}
                                transition={{
                                    duration: isCoreHovered ? node.duration * 0.2 : node.duration,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: -(i * 5)
                                }}
                            >
                                <div className="relative">
                                    <div
                                        className={cn(
                                            "w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xl md:text-2xl shadow-xl transition-all duration-300",
                                            hoveredNode === node.id ? "scale-110 border-primary shadow-[0_0_30px_rgba(47,141,70,0.5)] bg-zinc-800" : "hover:border-zinc-500"
                                        )}
                                        onMouseEnter={() => setHoveredNode(node.id)}
                                        onMouseLeave={() => setHoveredNode(null)}
                                    >
                                        {node.icon}
                                    </div>
                                    <div className={cn(
                                        "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-3 rounded-lg text-center pointer-events-none transition-all duration-300 z-50 hidden md:block",
                                        hoveredNode === node.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                                    )}>
                                        <div className="text-white font-bold text-sm mb-1">{node.label}</div>
                                        <div className="text-xs text-zinc-400 font-mono">{node.desc}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            ))}
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full z-0 pointer-events-none" />
        </div>
    )
}

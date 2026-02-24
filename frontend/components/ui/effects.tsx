"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

// --- AnimatedCounter ---
interface AnimatedCounterProps {
    end: number
    duration?: number
    suffix?: string
    className?: string
}

export function AnimatedCounter({
    end,
    duration = 2000,
    suffix = "",
    className = ""
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const hasAnimated = useRef(false)

    useEffect(() => {
        if (!isInView || hasAnimated.current) return

        hasAnimated.current = true
        const startTime = Date.now()
        const endTime = startTime + duration

        const updateCount = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setCount(Math.floor(eased * end))

            if (now < endTime) {
                requestAnimationFrame(updateCount)
            } else {
                setCount(end)
            }
        }
        requestAnimationFrame(updateCount)
    }, [isInView, end, duration])

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
        if (num >= 1000) return (num / 1000).toFixed(1) + "K"
        return num.toString()
    }

    return (
        <span ref={ref} className={className}>
            {formatNumber(count)}{suffix}
        </span>
    )
}

// --- FloatingShapes ---
interface FloatingShapesProps {
    className?: string
    count?: number
}

export function FloatingShapes({ className, count = 5 }: FloatingShapesProps) {
    const shapes = useMemo(() => Array.from({ length: count }, (_, i) => ({
        size: Math.random() * 200 + 100,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)]
    })), [count])

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-5"
                    style={{
                        left: shape.left,
                        top: shape.top,
                        width: shape.size,
                        height: shape.size
                    }}
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -80, 60, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 0.9, 1]
                    }}
                    transition={{
                        duration: shape.duration,
                        delay: shape.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {shape.shape === "circle" && (
                        <div className="w-full h-full rounded-full border-2 border-primary" />
                    )}
                    {shape.shape === "square" && (
                        <div className="w-full h-full border-2 border-secondary rotate-45" />
                    )}
                    {shape.shape === "triangle" && (
                        <div
                            className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[86px] border-l-transparent border-r-transparent border-b-accent"
                            style={{
                                borderLeftWidth: shape.size / 2,
                                borderRightWidth: shape.size / 2,
                                borderBottomWidth: shape.size * 0.866
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    )
}

// --- GlitchText ---
interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    text: string
    as?: "span" | "h1" | "h2" | "h3" | "p"
}

export function GlitchText({ text, className, as: Component = "span", ...props }: GlitchTextProps) {
    return (
        <Component
            className={cn(
                "relative inline-block font-bold text-transparent bg-clip-text bg-white",
                className
            )}
            {...props}
        >
            <span className="relative z-10">{text}</span>
            <span
                aria-hidden="true"
                className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-70 animate-glitch-1"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)", transform: "translate(-2px)" }}
            >
                {text}
            </span>
            <span
                aria-hidden="true"
                className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-70 animate-glitch-2"
                style={{ clipPath: "polygon(0 80%, 100% 20%, 100% 100%, 0 100%)", transform: "translate(2px)" }}
            >
                {text}
            </span>
        </Component>
    )
}

// --- GradientMesh ---
interface GradientMeshProps {
    className?: string
    colors?: string[]
    blur?: "sm" | "md" | "lg" | "xl"
}

export function GradientMesh({
    className,
    colors = ["primary", "secondary", "accent"],
    blur = "xl"
}: GradientMeshProps) {
    const blurMap = {
        sm: "blur-[80px]",
        md: "blur-[120px]",
        lg: "blur-[160px]",
        xl: "blur-[200px]"
    }

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            <div
                className={cn(
                    "absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full opacity-20 animate-pulse-slow",
                    blurMap[blur],
                    colors[0] === "primary" ? "bg-primary" : colors[0] === "secondary" ? "bg-secondary" : "bg-accent"
                )}
                style={{ animationDelay: "0s", animationDuration: "8s" }}
            />
            <div
                className={cn(
                    "absolute top-[20%] right-[15%] w-[35%] h-[35%] rounded-full opacity-15 animate-pulse-slow",
                    blurMap[blur],
                    colors[1] === "primary" ? "bg-primary" : colors[1] === "secondary" ? "bg-secondary" : "bg-accent"
                )}
                style={{ animationDelay: "2s", animationDuration: "10s" }}
            />
            <div
                className={cn(
                    "absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[45%] h-[45%] rounded-full opacity-10 animate-pulse-slow",
                    blurMap[blur],
                    colors[2] === "primary" ? "bg-primary" : colors[2] === "secondary" ? "bg-secondary" : "bg-accent"
                )}
                style={{ animationDelay: "4s", animationDuration: "12s" }}
            />
        </div>
    )
}

// --- GradientText ---
interface GradientTextProps {
    children: React.ReactNode
    className?: string
    gradient?: "primary" | "secondary" | "rainbow" | "cyber"
    animate?: boolean
}

export function GradientText({
    children,
    className,
    gradient = "primary",
    animate = true
}: GradientTextProps) {
    const gradients = {
        primary: "from-primary via-secondary to-primary",
        secondary: "from-secondary via-accent to-secondary",
        rainbow: "from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
        cyber: "from-primary via-secondary via-accent to-primary"
    }

    return (
        <span
            className={cn(
                "inline-block text-transparent bg-clip-text bg-gradient-to-r",
                gradients[gradient],
                animate && "bg-[length:200%_auto] animate-gradient",
                className
            )}
        >
            {children}
        </span>
    )
}

// --- NoiseOverlay ---
export function NoiseOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-overlay">
            <svg className="w-full h-full">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    )
}

// --- ParticleField ---
interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
}

interface ParticleFieldProps {
    className?: string
    particleCount?: number
    particleColor?: string
    connectionColor?: string
    maxDistance?: number
    mouseRadius?: number
}

export function ParticleField({
    className,
    particleCount = 100,
    particleColor = "rgba(0, 255, 128, 0.5)",
    connectionColor = "rgba(0, 255, 128, 0.1)",
    maxDistance = 150,
    mouseRadius = 200
}: ParticleFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef<number>(undefined)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        const initParticles = () => {
            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            }))
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particlesRef.current.forEach((particle, i) => {
                const dx = mouseRef.current.x - particle.x
                const dy = mouseRef.current.y - particle.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius
                    particle.vx += (dx / distance) * force * 0.02
                    particle.vy += (dy / distance) * force * 0.02
                }

                particle.vx *= 0.99
                particle.vy *= 0.99
                particle.x += particle.vx
                particle.y += particle.vy

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
                particle.x = Math.max(0, Math.min(canvas.width, particle.x))
                particle.y = Math.max(0, Math.min(canvas.height, particle.y))

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = particleColor
                ctx.fill()

                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const other = particlesRef.current[j]
                    const dx = particle.x - other.x
                    const dy = particle.y - other.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < maxDistance) {
                        const opacity = 1 - distance / maxDistance
                        ctx.beginPath()
                        ctx.strokeStyle = connectionColor.replace(/[\d.]+\)$/g, `${opacity * 0.3})`)
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(other.x, other.y)
                        ctx.stroke()
                    }
                }
            })
            animationFrameRef.current = requestAnimationFrame(animate)
        }

        resizeCanvas()
        initParticles()
        window.addEventListener("resize", () => {
            resizeCanvas()
            initParticles()
        })
        window.addEventListener("mousemove", handleMouseMove)
        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            window.removeEventListener("mousemove", handleMouseMove)
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        }
    }, [particleCount, particleColor, connectionColor, maxDistance, mouseRadius])

    return <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none", className)} />
}

// --- TextReveal ---
interface TextRevealProps {
    text: string
    className?: string
    delay?: number
    staggerDelay?: number
    variant?: "fade" | "blur" | "slide"
}

export function TextReveal({
    text,
    className,
    delay = 0,
    staggerDelay = 0.03,
    variant = "blur"
}: TextRevealProps) {
    const words = text.split(" ")
    const variants = {
        fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        blur: { hidden: { opacity: 0, filter: "blur(10px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
        slide: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
    }

    return (
        <span className={cn("inline-block", className)}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: delay + i * staggerDelay, ease: "easeOut" }}
                    variants={variants[variant]}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    )
}

export function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = 0
        let height = 0
        let particles: any[] = []
        let animationFrameId: number

        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }

        class Particle {
            x: number; y: number; vx: number; vy: number; size: number
            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2
            }
            update() {
                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1
            }
            draw() {
                if (!ctx) return
                ctx.fillStyle = "rgba(0, 255, 128, 0.2)"
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const init = () => {
            resize()
            particles = Array.from({ length: 100 }, () => new Particle())
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height)
            particles.forEach((p, i) => {
                p.update()
                p.draw()
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 150) {
                        ctx.strokeStyle = `rgba(0, 255, 128, ${0.1 * (1 - dist / 150)})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            })
            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()
        window.addEventListener("resize", resize)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-40"
        />
    )
}

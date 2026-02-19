"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { Calendar, Users, ArrowRight, Clock, MapPin, Hash, Sparkles } from "lucide-react"

// Types
export interface MediaItem {
    type: "photo" | "video"
    url: string
    thumbnail?: string
    caption?: string
}

export interface Testimonial {
    id: string
    name: string
    role: string
    content: string
    avatar?: string
}

export interface Event {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    category: "Workshop" | "Hackathon" | "Seminar" | "Competition" | "Networking" | "Tech Talk" | "Career"
    type: "upcoming"
    image?: string

    registration?: {
        status: "Open" | "Closed" | "Waitlist"
        capacity: number
        registered: number
        deadline: string
        link: string
    }

    tags: string[]
}

interface ExtendedEvent extends Event {
    theme: "blue" | "purple" | "green" | "orange" | "pink"
}

// Theme configuration
const THEMES = {
    blue: {
        bg: "from-blue-500/10 to-transparent",
        border: "border-blue-500/20",
        text: "text-blue-400",
        badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        hoverBorder: "hover:border-blue-500/50",
        graphicInfo: "bg-blue-500/20",
        glow: "group-hover:opacity-100"
    },
    purple: {
        bg: "from-purple-500/10 to-transparent",
        border: "border-purple-500/20",
        text: "text-purple-400",
        badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        hoverBorder: "hover:border-purple-500/50",
        graphicInfo: "bg-purple-500/20",
        glow: "group-hover:opacity-100"
    },
    green: {
        bg: "from-green-500/10 to-transparent",
        border: "border-green-500/20",
        text: "text-green-400",
        badge: "bg-green-500/10 text-green-400 border-green-500/20",
        hoverBorder: "hover:border-green-500/50",
        graphicInfo: "bg-green-500/20",
        glow: "group-hover:opacity-100"
    },
    orange: {
        bg: "from-orange-500/10 to-transparent",
        border: "border-orange-500/20",
        text: "text-orange-400",
        badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        hoverBorder: "hover:border-orange-500/50",
        graphicInfo: "bg-orange-500/20",
        glow: "group-hover:opacity-100"
    },
    pink: {
        bg: "from-pink-500/10 to-transparent",
        border: "border-pink-500/20",
        text: "text-pink-400",
        badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",
        hoverBorder: "hover:border-pink-500/50",
        graphicInfo: "bg-pink-500/20",
        glow: "group-hover:opacity-100"
    }
}
// Mock Event Data
const EVENTS: ExtendedEvent[] = [
    {
        id: "ev1",
        title: "Introduction to Competitive Programming",
        description: "A deep dive into common data structures and algorithms used in competitive programming competitions.",
        date: "2026-03-15",
        time: "10:00 AM - 01:00 PM",
        location: "Block 1, Seminar Hall",
        category: "Workshop",
        type: "upcoming",
        theme: "blue",
        tags: ["CP", "Algorithms", "DSA"],
        registration: {
            status: "Open",
            capacity: 100,
            registered: 65,
            deadline: "2026-03-14",
            link: "#register"
        }
    },
    {
        id: "ev2",
        title: "GFG Hack-A-Thon 2026",
        description: "Join us for 24 hours of coding, innovation, and fun as we build solutions for real-world problems.",
        date: "2026-04-10",
        time: "09:00 AM onwards",
        location: "Main Auditorium",
        category: "Hackathon",
        type: "upcoming",
        theme: "purple",
        tags: ["Hackathon", "Dev", "Innovation"],
        registration: {
            status: "Open",
            capacity: 200,
            registered: 120,
            deadline: "2026-04-05",
            link: "#register"
        }
    },
    {
        id: "ev3",
        title: "Tech Talk: Future of AI in Web",
        description: "Industry experts discuss how AI is transforming the web development landscape and what to expect in the coming years.",
        date: "2026-05-02",
        time: "04:00 PM - 06:00 PM",
        location: "Online (Discord)",
        category: "Tech Talk",
        type: "upcoming",
        theme: "green",
        tags: ["AI", "WebDev", "FutureTech"],
        registration: {
            status: "Waitlist",
            capacity: 50,
            registered: 50,
            deadline: "2026-05-01",
            link: "#waitlist"
        }
    }
]

// Sub-component for individual event card
function UpcomingEventCard({ event, index, align, colorTheme }: {
    event: ExtendedEvent,
    index: number,
    align: "left" | "right",
    colorTheme: "blue" | "purple" | "green" | "orange" | "pink"
}) {
    const theme = THEMES[colorTheme]

    return (
        <motion.div
            initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={cn(
                "relative group/card flex flex-col p-8 rounded-3xl border-2 transition-all duration-500",
                theme.bg,
                theme.border,
                theme.hoverBorder,
                "backdrop-blur-xl bg-black/40"
            )}
        >
            {/* Glow Effect */}
            <div className={cn(
                "absolute -inset-1 rounded-[32px] opacity-0 transition-opacity duration-500 blur-xl z-0",
                colorTheme === 'blue' ? 'bg-blue-500/10' :
                    colorTheme === 'purple' ? 'bg-purple-500/10' :
                        'bg-green-500/10',
                theme.glow
            )} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <span className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border",
                        theme.badge
                    )}>
                        {event.category}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                    </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-4 group-hover/card:text-white transition-colors">
                    {event.title}
                </h3>

                <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed font-light">
                    {event.description}
                </p>

                <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin className={cn("w-4 h-4", theme.text)} />
                            <span className="text-xs text-white/60">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className={cn("w-4 h-4", theme.text)} />
                            <span className="text-xs text-white/60">{event.registration?.registered}/{event.registration?.capacity}</span>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/5 my-2" />

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-white/30 font-mono">STATUS</span>
                            <span className={cn("text-xs font-bold", theme.text)}>
                                {event.registration?.status.toUpperCase()}
                            </span>
                        </div>
                        <motion.a
                            href={event.registration?.link}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300",
                                colorTheme === 'blue' ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' :
                                    colorTheme === 'purple' ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' :
                                        'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            )}
                        >
                            REGISTER NOW
                            <ArrowRight className="w-4 h-4" />
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export function EventsSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1.2])

    return (
        <section id="events" className="py-[8vh] bg-[#050505] relative overflow-hidden min-h-screen flex items-center" ref={containerRef}>
            {/* Advanced Background System */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-10 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 blur-[120px] rounded-full opacity-20" />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-[5vh]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8">
                            <div className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                            <span className="text-[10px] font-mono text-white/60 font-bold tracking-[0.4em] uppercase">
                                NEXT_CHAPTER.EXE
                            </span>
                        </div>

                        <h2 className="text-6xl md:text-9xl font-black font-space-grotesk mb-8 tracking-tighter">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">Future.</span>
                            <span className="text-secondary italic">Events</span>
                        </h2>

                        <p className="text-white/40 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                            Syncing with the latest innovations and community gatherings. <br className="hidden md:block" />
                            Explore our upcoming roadmap of workshops, hackathons, and seminars.
                        </p>
                    </motion.div>
                </div>

                {/* Timeline Visual System */}
                <div className="relative max-w-7xl mx-auto">
                    {/* SVG Circuitry Path */}
                    <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full pointer-events-none overflow-visible hidden md:block" viewBox="0 0 16 100" preserveAspectRatio="none">
                        <path
                            d="M 8 0 V 1000"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="2"
                        />
                        <motion.path
                            d="M 8 0 V 1000"
                            fill="none"
                            stroke="url(#timeline-gradient-v2)"
                            strokeWidth="4"
                            style={{ pathLength }}
                            transition={{ type: "spring", stiffness: 30 }}
                        />
                        <defs>
                            <linearGradient id="timeline-gradient-v2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="50%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#22c55e" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Events Staggered Layout */}
                    <div className="space-y-[8vh]">
                        {EVENTS.map((event, index) => (
                            <div key={event.id} className={cn(
                                "relative flex flex-col md:flex-row items-center gap-16 md:gap-24 group",
                                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            )}>
                                {/* Visual Connector Node (Desktop) */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex">
                                    <div className={cn("w-14 h-14 rounded-2xl rotate-45 border-2 bg-[#050505] shadow-[0_0_40px_-5px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-90",
                                        event.theme === 'blue' ? 'border-blue-500 shadow-blue-500/40' :
                                            event.theme === 'purple' ? 'border-purple-500 shadow-purple-500/40' :
                                                'border-green-500 shadow-green-500/40'
                                    )}>
                                        <div className={cn("w-3 h-3 rounded-sm rotate-45 animate-pulse",
                                            event.theme === 'blue' ? 'bg-blue-400' :
                                                event.theme === 'purple' ? 'bg-purple-400' :
                                                    'bg-green-400'
                                        )} />
                                    </div>
                                </div>

                                {/* Event Content Side */}
                                <div className="w-full md:w-1/2 flex flex-col gap-6 relative z-20">
                                    <div className={cn(
                                        "flex flex-col mb-2",
                                        index % 2 === 0 ? "md:items-end text-left md:text-right" : "md:items-start text-left"
                                    )}>
                                        <motion.span
                                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            className="text-5xl md:text-7xl font-black font-space-grotesk text-white/5 uppercase leading-none tracking-tighter"
                                        >
                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </motion.span>
                                    </div>
                                    <UpcomingEventCard
                                        event={event}
                                        index={index}
                                        align={index % 2 === 0 ? "right" : "left"}
                                        colorTheme={event.theme}
                                    />
                                </div>

                                {/* Decorative Decoration Side (Filling the Blank Space) */}
                                <div className={cn(
                                    "hidden md:flex w-1/2 flex-col gap-8 opacity-40 group-hover:opacity-100 transition-opacity duration-700",
                                    index % 2 === 0 ? "items-start pl-12" : "items-end pr-12"
                                )}>
                                    <div className="flex gap-4">
                                        {event.tags.map((tag, i) => (
                                            <span key={i} className="text-[10px] font-mono text-secondary border border-secondary/20 px-3 py-1 rounded-full bg-secondary/5">
                                                {tag.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="w-48 h-px bg-gradient-to-r from-secondary/50 to-transparent" />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            <span className="text-[10px] font-mono text-white/40 tracking-widest">SYSTEM_STATUS: ACTIVE</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                            <span className="text-[10px] font-mono text-white/40 tracking-widest">NETWORK_SYNC: COMPLETED</span>
                                        </div>
                                    </div>
                                    {/* Geometric Accent */}
                                    <div className={cn(
                                        "w-24 h-24 border-2 border-white/5 rounded-3xl rotate-12 transition-transform group-hover:rotate-45 duration-1000",
                                        event.theme === 'blue' ? 'border-blue-500/10' : event.theme === 'purple' ? 'border-purple-500/10' : 'border-green-500/10'
                                    )} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Finish Indicator */}
                    <div className="mt-48 flex flex-col items-center justify-center text-center">
                        <div className="w-px h-32 bg-gradient-to-b from-white/10 to-transparent" />
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] mt-8 mb-32">
                            END_TRANSMISSION
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

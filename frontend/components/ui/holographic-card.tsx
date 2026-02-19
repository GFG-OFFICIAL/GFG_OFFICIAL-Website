"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"
// @ts-expect-error logo import
import gfgOfficialLogo from "@/assets/gfg-official-logo.png"

interface TeamMember {
    name: string
    role: string
    image: string
    stats: { label: string; value: number }[]
}

export const HolographicCard = ({ member, index }: { member: TeamMember, index: number }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Mouse position state for subtle parallax
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseXFromCenter = e.clientX - rect.left - width / 2
        const mouseYFromCenter = e.clientY - rect.top - height / 2
        x.set(mouseXFromCenter / width)
        y.set(mouseYFromCenter / height)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
    }

    const mouseX = useSpring(x, { stiffness: 400, damping: 30 })
    const mouseY = useSpring(y, { stiffness: 400, damping: 30 })
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["3deg", "-3deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-3deg", "3deg"])

    // Unified Color Scheme - GFG Green (Unicolor)
    const roleColor = 'text-primary'
    const roleBorder = 'group-hover:border-primary/50'
    const roleShadow = 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]'
    const roleBg = 'bg-primary'

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            style={{ perspective: 1000 }}
            className="group relative w-full aspect-[3/4]" // Slightly taller for operator card feel
            onMouseMove={(e) => {
                handleMouseMove(e)
                setIsHovered(true)
            }}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className={cn(
                    "relative w-full h-full bg-[#050505] border border-zinc-900 transition-all duration-300 overflow-hidden font-mono",
                    roleBorder,
                    roleShadow
                )}
            >
                {/* --- 1. Background Grid & Radar Sweep --- */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,currentColor,transparent_70%)]", roleColor.replace('text-', 'text-'))} />

                {/* Rotating Radar Scan - STRICT GREEN/WHITE/BLACK */}
                <div className={cn(
                    "absolute inset-[-50%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-tr from-transparent to-transparent via-white/5"
                )} style={{ background: `conic-gradient(from 0deg, transparent 0deg, transparent 340deg, ${roleBg.includes('white') ? 'rgba(255,255,255,0.2)' : roleBg.includes('zinc') ? 'rgba(161,161,170,0.2)' : 'rgba(34,197,94,0.2)'} 360deg)` }} />


                {/* --- 2. Technical Overlay UI (Corners) --- */}
                <div className={cn("absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-zinc-800 transition-all duration-300 group-hover:w-12 group-hover:h-12 z-20", roleBorder.replace('group-hover:', 'group-hover:'))} />
                <div className={cn("absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-zinc-800 transition-all duration-300 group-hover:w-12 group-hover:h-12 z-20", roleBorder.replace('group-hover:', 'group-hover:'))} />
                <div className={cn("absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-zinc-800 transition-all duration-300 group-hover:w-12 group-hover:h-12 z-20", roleBorder.replace('group-hover:', 'group-hover:'))} />
                <div className={cn("absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-zinc-800 transition-all duration-300 group-hover:w-12 group-hover:h-12 z-20", roleBorder.replace('group-hover:', 'group-hover:'))} />

                {/* --- 3. Header Block (Operator ID) --- */}
                <div className="relative z-10 px-6 pt-6 pb-2 border-b border-zinc-900 bg-black/50 backdrop-blur-sm transform translate-z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className={cn("text-[9px] text-zinc-600 uppercase tracking-widest mb-1 transition-colors", roleColor.replace('text-', 'group-hover:text-').replace('400', '400/70').replace('500', '500/70'))}>OPERATOR_ID</div>
                            <div className={cn("text-xl text-white font-bold tracking-[0.2em] transition-all", roleColor.replace('text-', 'group-hover:text-'))}>
                                OP-{index.toString().padStart(3, '0')}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">CLASS</div>
                            <div className={cn("inline-block border bg-opacity-5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm", roleColor.replace('text-', 'text-').replace('text-', 'border-').replace('400', '400/30').replace('500', '500/30'), roleColor, roleBg.replace('bg-', 'bg-').replace('400', '400/10').replace('500', '500/10'))}>
                                {member.role.split(' ')[0]}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 4. Main Body (Avatar Area) --- */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 transform translate-z-20">
                    {/* Ring Container */}
                    <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                        {/* Spinning Outer Ring */}
                        <div className={cn("absolute inset-0 border border-dashed border-zinc-800 rounded-full animate-[spin_10s_linear_infinite] transition-colors", roleBorder.replace('group-hover:', 'group-hover:').replace('/50', '/30'))} />
                        <div className={cn("absolute inset-[-4px] border-t-2 rounded-full animate-[spin_3s_linear_infinite]", roleColor.replace('text-', 'border-').replace('400', '400/50').replace('500', '500/50'))} />
                        <div className={cn("absolute inset-[-8px] border-b-2 rounded-full animate-[spin_5s_linear_infinite_reverse]", roleColor.replace('text-', 'border-').replace('400', '400/20').replace('500', '500/20'))} />

                        {/* Avatar Circle */}
                        <div className={cn("w-28 h-28 rounded-full bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center relative overflow-hidden transition-colors hover:scale-105 duration-300", roleBorder.replace('group-hover:', 'group-hover:').replace('/50', ''))}>
                            {member.image ? (
                                <NextImage src={member.image} alt={member.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                            ) : (
                                <span className="text-4xl font-bold text-zinc-800 group-hover:text-white transition-colors">
                                    {member.name.charAt(0)}
                                </span>
                            )}
                            {/* Scanning Line over Avatar */}
                            <div className={cn("absolute inset-0 bg-gradient-to-b from-transparent to-transparent h-[20%] w-full animate-scan opacity-0 group-hover:opacity-100 pointer-events-none", roleBg.replace('bg-', 'via-').replace('400', '400/20').replace('500', '500/20'))} />
                        </div>
                    </div>

                    {/* Name Block */}
                    <div className="text-center w-full space-y-2 relative z-20">
                        <div className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">UNIT_DESIGNATION</div>
                        <h3 className={cn(
                            "text-xl font-bold uppercase tracking-wider transition-all duration-300 line-clamp-1",
                            isHovered ? cn(roleColor, "scale-105") : "text-white"
                        )}>
                            {member.name}
                        </h3>
                        <div className={cn("h-0.5 w-12 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500", roleBg)} />
                    </div>
                </div>

                {/* --- 5. Stats Footer --- */}
                <div className="relative z-10 p-8 pt-0 space-y-3 transform translate-z-10">
                    {member.stats.map((stat, i) => (
                        <div key={i} className="group/stat">
                            <div className="flex justify-between items-end mb-1">
                                <span className={cn("text-[9px] text-zinc-500 uppercase tracking-tighter transition-colors font-mono", roleColor.replace('text-', 'group-hover/stat:text-'))}>{stat.label}</span>
                                <span className={cn("text-[10px] font-bold font-mono", roleColor)}>{stat.value}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-900 relative overflow-hidden flex items-center">
                                {/* Grid Lines in Bar Background */}
                                <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
                                <motion.div
                                    className={cn("absolute inset-y-0 left-0 shadow-[0_0_10px_rgba(0,0,0,0.5)]", roleBg)}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${stat.value}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className={cn("absolute -right-3 bottom-10 text-[8px] text-zinc-700 -rotate-90 tracking-[0.3em] origin-bottom-right transition-colors", roleColor.replace('text-', 'group-hover:text-').replace('400', '400/50').replace('500', '500/50'))}>SCALE 1:1</div>

                    {/* GFG Mini Logo Watermark */}
                    <div className="absolute top-2 left-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <NextImage src={gfgOfficialLogo} alt="GFG" fill className="object-contain grayscale group-hover:grayscale-0" />
                    </div>
                </div>

                {/* --- 6. Hover Data Overlay --- */}
                <div className={cn(
                    "absolute top-4 right-4 flex flex-col items-end gap-1 transition-opacity duration-300 pointer-events-none z-30",
                    isHovered ? "opacity-100" : "opacity-0"
                )}>
                    <div className={cn("border px-1 py-0.5 text-[8px] font-bold shadow-sm", roleBg.replace('bg-', 'bg-').replace('400', '400/10').replace('500', '500/10'), roleColor.replace('text-', 'text-').replace('text-', 'border-').replace('400', '400/20'))}>SYS.ONLINE</div>
                    <div className="text-[8px] text-zinc-500 font-mono">{new Date().toLocaleTimeString()}</div>
                </div>

                {/* --- 7. Scan Light Effect --- */}
                <div className={cn(
                    "absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent to-transparent skew-x-12 transition-all duration-1000 ease-in-out pointer-events-none",
                    roleBg.replace('bg-', 'via-').replace('400', '400/10').replace('500', '500/10'),
                    isHovered ? "left-[200%]" : ""
                )} />

                {/* --- 8. Neon Glow Border --- */}
                <div className={cn(
                    "absolute inset-0 rounded-sm border border-transparent transition-all duration-300 pointer-events-none",
                    isHovered ? cn(roleBorder.replace('group-hover:', ''), "shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]") : "border-zinc-800"
                )} />

                {/* --- 9. Active Status Indicator --- */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-30">
                    <span className="relative flex h-2 w-2">
                        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", roleBg)}></span>
                        <span className={cn("relative inline-flex rounded-full h-2 w-2", roleBg)}></span>
                    </span>
                    <span className={cn("text-[8px] font-bold tracking-widest opacity-80", roleColor)}>LIVE</span>
                </div>

            </motion.div>
        </motion.div>
    )
}

"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    Menu, X, Zap, LogOut, User, Terminal, Shield, Home,
    LayoutDashboard, Calendar, ClipboardCheck, Megaphone,
    Image as ImageIcon, Activity, Heart, Github, Linkedin,
    Twitter, Mail, MessageCircle, Instagram
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { JoinModal } from "@/components/features/misc-sections"
import gfgLogo from "@/public/gfg-official-logo.png"
import gfgOfficialLogo from "@/assets/gfg-official-logo.png"

// --- Navbar ---
export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showJoinModal, setShowJoinModal] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Innovation", href: "#innovation" },
        { label: "Events", href: "#events" },
        { label: "Team", href: "#team" },
    ]

    const scrollToSection = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault()
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
                setMobileMenuOpen(false)
            }
        }
    }

    return (
        <>
            <JoinModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className={cn(
                        "pointer-events-auto flex items-center justify-between p-2 pl-4 pr-2 rounded-full border transition-all duration-300",
                        scrolled
                            ? "bg-black/80 backdrop-blur-xl border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-fit min-w-[320px] max-w-5xl gap-6"
                            : "bg-transparent border-transparent w-full max-w-7xl"
                    )}
                >
                    <button onClick={() => router.push('/')} className="flex items-center gap-2 group shrink-0 cursor-pointer">
                        <div className="relative w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 overflow-hidden group-hover:border-primary/50 transition-colors">
                            <Image src={gfgLogo} alt="GFG Logo" width={20} height={20} className="object-contain" />
                        </div>
                        <span className={cn(
                            "font-space-grotesk font-bold text-sm tracking-wide hidden sm:block transition-all duration-300",
                            scrolled ? "hidden lg:block" : "block"
                        )}>
                            GFG<span className="text-muted-foreground">ITER</span>
                        </span>
                    </button>

                    <nav className={cn(
                        "hidden md:flex items-center gap-1 transition-all duration-300",
                        scrolled ? "relative" : "absolute left-1/2 -translate-x-1/2"
                    )}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                {...(link.href.startsWith('#') && { onClick: (e) => scrollToSection(e, link.href) })}
                                onMouseEnter={() => setHoveredLink(link.label)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className="relative px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-white transition-colors"
                            >
                                {hoveredLink === link.label && (
                                    <motion.div
                                        layoutId="navbar-pill"
                                        className="absolute inset-0 bg-white/5 rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowJoinModal(true)}
                            data-join-trigger
                            className="group relative px-5 py-2 rounded-full bg-white text-black font-medium text-xs overflow-hidden transition-transform active:scale-95"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-white to-primary opacity-0 group-hover:opacity-20 transition-opacity" />
                            <span className="relative flex items-center gap-2">
                                Join Network
                                <Zap className="w-3.5 h-3.5 fill-current" />
                            </span>
                        </button>
                        <button
                            className="md:hidden p-2 text-white/70 hover:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </motion.div>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-24 left-4 right-4 z-40 p-4 rounded-2xl bg-[#050505]/90 backdrop-blur-2xl border border-white/10 shadow-2xl md:hidden"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <Image src={gfgLogo} alt="GFG Logo" width={32} height={32} className="object-contain" />
                        </div>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    {...(link.href.startsWith('#') && { onClick: (e) => scrollToSection(e, link.href) })}
                                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            <Link href="/login" className="p-4 text-center text-sm text-muted-foreground hover:text-white">
                                Member Login
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// --- MemberNavbar ---
export function MemberNavbar() {
    const router = useRouter()
    const handleLogout = async () => {
        router.push("/login")
        router.refresh()
    }

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between px-6 py-4 mx-4 mt-4 mb-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] sticky top-4 z-50 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 overflow-hidden group hover:border-primary/50 transition-colors">
                    <Image src={gfgOfficialLogo} alt="GFG Logo" fill className="object-contain p-2" />
                </div>
                <div className="flex flex-col">
                    <span className="font-mono font-bold text-lg text-white tracking-tight flex items-center gap-2">
                        GFG STUDENT CHAPTER
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-primary border border-primary/20">MEMBER</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Restricted Access // Authorized Personnel Only</span>
                </div>
            </div>
            <div className="flex items-center gap-4 relative z-10">
                <div className="flex items-center gap-3 px-4 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,128,0.8)]" />
                    <span className="font-mono text-xs text-muted-foreground">Connected</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 text-white font-mono font-bold text-sm shadow-inner relative overflow-hidden group cursor-pointer">
                        <span className="relative z-10">M</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="font-mono text-xs text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors h-8">
                        <LogOut className="h-3.5 w-3.5 mr-2" />
                        TERMINATE SESSION
                    </Button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </motion.div>
    )
}

// --- MemberHeader ---
export function MemberHeader() {
    const router = useRouter()
    const pathname = usePathname()
    const handleLogout = async () => {
        router.push("/login")
        router.refresh()
    }

    const navLinks = [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/member/resources", label: "Data_Bank", icon: Terminal },
        { href: "/member/recordings", label: "Archives", icon: Shield },
    ]

    return (
        <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4 group cursor-pointer" onClick={() => router.push('/dashboard')}>
                    <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                        <Image src={gfgOfficialLogo} alt="GFG Logo" fill className="object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                    </div>
                    <div className="hidden sm:block">
                        <div className="font-bold text-xl text-white font-heading tracking-tight group-hover:text-primary transition-colors">
                            GFG SC ITER
                        </div>
                        <div className="text-[10px] text-primary/70 font-mono tracking-[0.2em] uppercase">
                            Secure_Link_Est
                        </div>
                    </div>
                </div>
                <nav className="hidden md:flex items-center gap-2 bg-black/40 rounded-full p-1.5 border border-white/10 backdrop-blur-md shadow-2xl">
                    {navLinks.map(link => {
                        const Icon = link.icon
                        const isActive = pathname === link.href
                        return (
                            <Link key={link.href} href={link.href} className={cn("flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group", isActive ? "text-black bg-primary shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "text-zinc-400 hover:text-white hover:bg-white/5")}>
                                <Icon className={cn("w-4 h-4", isActive ? "animate-pulse" : "group-hover:text-primary transition-colors")} />
                                <span>{link.label}</span>
                            </Link>
                        )
                    })}
                </nav>
                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex flex-col items-end text-[10px] font-mono text-zinc-500 leading-tight">
                        <span>NET.SPEED: 100MBPS</span>
                        <span className="text-primary">LATENCY: 12MS</span>
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden lg:block" />
                    <div className="flex items-center gap-3">
                        <button className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-colors hover:bg-primary/20">
                            <Terminal className="w-4 h-4" />
                        </button>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 font-mono text-xs uppercase tracking-wide border border-red-500/20">
                            <LogOut className="h-3 w-3 mr-2" />
                            Disconnect
                        </Button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        </header>
    )
}

// --- Sidebar ---
const sidebarLinks = [
    { name: "Command_Center", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Event_Protocols", href: "/admin/events", icon: Calendar },
    { name: "Operative_Logs", href: "/admin/attendance", icon: ClipboardCheck },
    { name: "Broadcast_Relay", href: "/admin/broadcasts", icon: Megaphone },
    { name: "Media_Bank", href: "/admin/media", icon: ImageIcon },
]

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const handleLogout = async () => {
        router.push("/login")
        router.refresh()
    }

    return (
        <>
            <div className="md:hidden p-4 border-b border-white/10 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 mr-3 shrink-0">
                        <Image src={gfgOfficialLogo} alt="GFG Logo" fill className="object-contain" />
                    </div>
                    <div className="font-bold text-xl text-primary font-heading tracking-tighter">GFG SC ITER</div>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white"><Menu className="h-6 w-6" /></Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0 bg-black/95 border-r border-white/10">
                        <SidebarContent pathname={pathname} setOpen={setOpen} onLogout={handleLogout} />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:flex flex-col w-64 border-r border-white/5 bg-background/95 backdrop-blur-xl h-screen fixed left-0 top-0 z-20 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-50" />
                <SidebarContent pathname={pathname} onLogout={handleLogout} />
            </div>
            <div className="hidden md:block w-64 flex-shrink-0" />
        </>
    )
}

function SidebarContent({ pathname, setOpen, onLogout }: { pathname: string; setOpen?: (open: boolean) => void; onLogout: () => void }) {
    return (
        <div className="flex flex-col h-full text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
            <div className="p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 group cursor-pointer transition-transform hover:scale-105">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Image src={gfgOfficialLogo} alt="GFG Logo" fill className="object-contain drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] relative z-10" />
                    </div>
                    <div>
                        <span className="text-xl font-bold font-heading tracking-tighter text-white block leading-none">GFG SC</span>
                        <span className="text-[9px] text-primary/70 font-mono tracking-[0.3em] uppercase block mt-1">SYSTEM_ADMIN</span>
                    </div>
                </div>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto pt-6 relative z-10">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                        <Link key={link.href} href={link.href} onClick={() => setOpen?.(false)} className={cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden", isActive ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]" : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent")}>
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_10px_var(--primary)]" />}
                            <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-primary stroke-[2.5px] drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" : "stroke-[1.5px]")} />
                            <span className={cn("font-mono text-xs uppercase tracking-wider", isActive ? "font-bold" : "")}>{link.name}</span>
                            {!isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-white/5 bg-black/40 relative z-10 backdrop-blur-md">
                <div className="mb-4 flex items-center gap-3 px-3 py-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-primary/20 transition-colors cursor-pointer group">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-black font-bold border border-white/20 shadow-lg group-hover:scale-110 transition-transform"><Shield className="w-4 h-4" /></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">Root_Access</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span className="text-[9px] text-zinc-500 font-mono">SECURE</span>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" onClick={onLogout} className="w-full justify-start gap-3 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-all uppercase tracking-wider text-[10px] font-mono border border-transparent hover:border-red-900/30 h-9">
                    <LogOut className="h-3 w-3" />Term_Session
                </Button>
            </div>
        </div>
    )
}

// --- Footer ---
export function Footer() {
    const scrollToSection = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault()
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }
    const socialLinks = [
        { icon: Github, href: "https://github.com/GFG-OFFICIAL" },
        { icon: Twitter, href: "https://x.com/gfg_iter" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/gfgiter/posts/?feedView=all" },
        { icon: Mail, href: "mailto:gfgiter@gmail.com" }
    ]

    return (
        <footer className="relative bg-black border-t border-white/10 pt-[6vh] pb-[3vh] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="max-w-7xl mx-auto w-full relative z-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-[4vh]">
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-2 text-2xl font-bold font-space-grotesk tracking-tighter">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 overflow-hidden relative">
                                <Image src={gfgLogo} alt="GFG Logo" fill className="object-contain p-2" />
                            </div>
                            <span className="text-white">GFG<span className="text-primary">-ITER</span></span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">Empowering students to build, innovate, and ship software that matters. Code the future with us.</p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all duration-300">
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2"><span className="w-1 h-4 bg-primary rounded-full" />Explore</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {[{ label: 'Events', href: '#events' }, { label: 'Projects', href: '#innovation' }, { label: 'Team', href: '#system-architects' }].map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer">
                                        <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary">&gt;</span>{link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2"><span className="w-1 h-4 bg-secondary rounded-full" />Community</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {[{ label: 'Join Community', href: 'https://chat.whatsapp.com/Hr0puwutetlK6dc1MTXXJZ' }, { label: 'GitHub Org', href: 'https://github.com/GFG-OFFICIAL' }, { label: 'Instagram', href: 'https://www.instagram.com/p/DShF7VrgI0L/?igsh=MWI3NTVyN250Z21kaA==' }].map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors flex items-center gap-2 group">
                                        <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-secondary">&gt;</span>{link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2"><span className="w-1 h-4 bg-accent rounded-full" />System.Log</h4>
                        <div className="bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xs text-green-400">
                            <div className="mb-2"><span className="text-blue-400">root@gfg-sc:~$</span> npm install community</div>
                            <div className="mb-2 text-white/70">[success] Added 500+ members...</div>
                            <div className="mb-2"><span className="text-blue-400">root@gfg-sc:~$</span> ./launch-event.sh</div>
                            <div className="animate-pulse">_</div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground text-center md:text-left">© 2026 GFG Student Chapter. All systems operational.</p>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <span>Made by GFG</span><Heart className="w-3 h-3 text-red-500 animate-pulse" /><span>and &lt;Code/&gt;</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// --- SectionShell ---
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
            <div className="container mx-auto px-4 relative z-10 mb-16 md:mb-24 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-green-500/0 via-green-500/20 to-green-500/0" />
                {badge && (
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block mb-6 relative">
                        <div className="absolute -inset-1 bg-green-500/20 blur-md opacity-50" />
                        <span className="relative px-3 py-1 bg-[#0a1510] border border-green-500/20 text-[10px] font-bold tracking-[0.2em] uppercase text-green-400 font-mono">{"//"} {badge}</span>
                    </motion.div>
                )}
                {title && (
                    <motion.h2 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
                        {title}<span className="text-green-500">.</span>
                    </motion.h2>
                )}
                {subtitle && (
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                        {subtitle}
                    </motion.p>
                )}
            </div>
            <div className="container mx-auto px-4 relative z-10">{children}</div>
        </section>
    )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Terminal, Shield, Home } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
// @ts-expect-error logo import
import gfgOfficialLogo from "@/assets/gfg-official-logo.png"

export function MemberHeader() {
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = async () => {
        // Navigate to login page
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
            {/* Top Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

            <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between relative z-10">
                {/* Logo Area */}
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

                {/* Navigation Terminal */}
                <nav className="hidden md:flex items-center gap-2 bg-black/40 rounded-full p-1.5 border border-white/10 backdrop-blur-md shadow-2xl">
                    {navLinks.map(link => {
                        const Icon = link.icon
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group",
                                    isActive
                                        ? "text-black bg-primary shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className={cn("w-4 h-4", isActive ? "animate-pulse" : "group-hover:text-primary transition-colors")} />
                                <span>{link.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Status & Actions */}
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

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 font-mono text-xs uppercase tracking-wide border border-red-500/20"
                        >
                            <LogOut className="h-3 w-3 mr-2" />
                            Disconnect
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
        </header>
    )
}

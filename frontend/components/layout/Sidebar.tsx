"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// @ts-expect-error logo import
import gfgOfficialLogo from "@/assets/gfg-official-logo.png"
import {
    LayoutDashboard,
    Calendar,
    ClipboardCheck,
    Megaphone,
    Image as ImageIcon,
    LogOut,
    Menu,
    Shield,
    Activity
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

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
        // Navigate to login page
        router.push("/login")
        router.refresh()
    }

    return (
        <>
            {/* Mobile Trigger */}
            <div className="md:hidden p-4 border-b border-white/10 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 mr-3 shrink-0">
                        <Image src={gfgOfficialLogo} alt="GFG Logo" fill className="object-contain" />
                    </div>
                    <div className="font-bold text-xl text-primary font-heading tracking-tighter">{`GFG SC ITER`}</div>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0 bg-black/95 border-r border-white/10">
                        <SidebarContent pathname={pathname} setOpen={setOpen} onLogout={handleLogout} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col w-64 border-r border-white/5 bg-background/95 backdrop-blur-xl h-screen fixed left-0 top-0 z-20 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-50" />
                <SidebarContent pathname={pathname} onLogout={handleLogout} />
            </div>

            {/* Spacer for desktop sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0" />
        </>
    )
}

function SidebarContent({ pathname, setOpen, onLogout }: { pathname: string; setOpen?: (open: boolean) => void; onLogout: () => void }) {
    return (
        <div className="flex flex-col h-full text-white relative overflow-hidden">
            {/* Scanline Background */}
            <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />

            <div className="p-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 group cursor-pointer transition-transform hover:scale-105">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Image src={gfgOfficialLogo} alt="GFG Logo" fill className="object-contain drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] relative z-10" />
                    </div>
                    <div>
                        <span className="text-xl font-bold font-heading tracking-tighter text-white block leading-none">{`GFG SC`}</span>
                        <span className="text-[9px] text-primary/70 font-mono tracking-[0.3em] uppercase block mt-1">SYSTEM_ADMIN</span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto pt-6 relative z-10">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen?.(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                                    : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_10px_var(--primary)]" />
                            )}
                            <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-primary stroke-[2.5px] drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" : "stroke-[1.5px]")} />
                            <span className={cn("font-mono text-xs uppercase tracking-wider", isActive ? "font-bold" : "")}>{link.name}</span>

                            {/* Hover slide effect */}
                            {!isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-white/5 bg-black/40 relative z-10 backdrop-blur-md">
                <div className="mb-4 flex items-center gap-3 px-3 py-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-primary/20 transition-colors cursor-pointer group">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-black font-bold border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                        <Shield className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">Root_Access</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] text-zinc-500 font-mono">SECURE</span>
                        </div>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    onClick={onLogout}
                    className="w-full justify-start gap-3 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-all uppercase tracking-wider text-[10px] font-mono border border-transparent hover:border-red-900/30 h-9"
                >
                    <LogOut className="h-3 w-3" />
                    Term_Session
                </Button>
            </div>
        </div>
    )
}

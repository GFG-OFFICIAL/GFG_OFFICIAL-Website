"use client"

import { LogOut, User, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
// @ts-expect-error logo import
import gfgLogo from "@/assets/gfg-official-logo.png"
import { motion } from "framer-motion"

export function MemberNavbar() {
    const router = useRouter()

    const handleLogout = async () => {
        // Navigate to login page
        router.push("/login")
        router.refresh()
    }

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between px-6 py-4 mx-4 mt-4 mb-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] sticky top-4 z-50 overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
                <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 overflow-hidden group hover:border-primary/50 transition-colors">
                    <Image src={gfgLogo} alt="GFG Logo" fill className="object-contain p-2" />
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

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="font-mono text-xs text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors h-8"
                    >
                        <LogOut className="h-3.5 w-3.5 mr-2" />
                        TERMINATE SESSION
                    </Button>
                </div>
            </div>

            {/* Bottom scanning line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </motion.div>
    )
}

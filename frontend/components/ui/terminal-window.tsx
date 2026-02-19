"use client"

import { cn } from "@/lib/utils"
import { Monitor } from "lucide-react"

interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    children: React.ReactNode
    showControls?: boolean
    contentClassName?: string
}

export function TerminalWindow({ title = "bash", children, showControls = true, className, contentClassName, ...props }: TerminalWindowProps) {
    return (
        <div className={cn("rounded-lg overflow-hidden border border-white/5 bg-[#0e0e0e] shadow-2xl font-mono text-sm relative group flex flex-col", className)} {...props}>
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none opacity-50" />

            {/* Terminal Header */}
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
                    {/* <Monitor className="w-3 h-3" /> */}
                    <span>{title}</span>
                </div>
                <div className="w-12" /> {/* Spacer for centering */}
            </div>

            {/* Terminal Body with Custom Scrollbar */}
            <div className={cn("flex-1 relative z-10 overflow-hidden", contentClassName)}>
                {children}
            </div>
        </div>
    )
}

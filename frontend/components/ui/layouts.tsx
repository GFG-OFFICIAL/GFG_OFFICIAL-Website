"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Menu, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// --- BentoGrid ---
interface BentoGridProps {
    children: React.ReactNode
    className?: string
}

interface BentoCardProps {
    title?: string
    description?: string
    icon?: React.ReactNode
    graphic?: React.ReactNode
    className?: string
    children?: React.ReactNode
    span?: "1x1" | "2x1" | "1x2" | "2x2"
    href?: string
    onClick?: () => void
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]",
            className
        )}>
            {children}
        </div>
    )
}

export function BentoCard({
    title,
    description,
    icon,
    graphic,
    className,
    children,
    span = "1x1",
    href,
    onClick
}: BentoCardProps) {
    const spanClasses = {
        "1x1": "col-span-1 row-span-1",
        "2x1": "col-span-2 row-span-1",
        "1x2": "col-span-1 row-span-2",
        "2x2": "col-span-2 row-span-2"
    }

    const content = (
        <>
            {graphic && (
                <div className="absolute inset-0 z-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100">
                    {graphic}
                </div>
            )}
            {icon && (
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity z-20">
                    {icon}
                </div>
            )}
            <div className="relative z-10 h-full flex flex-col">
                {title && (
                    <h3 className="text-xl md:text-2xl font-bold font-space-grotesk mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="text-sm text-muted-foreground mb-4">
                        {description}
                    </p>
                )}
                {children && <div className="flex-1 mt-auto">{children}</div>}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-0" />
        </>
    )

    const Wrapper = href ? motion.a : motion.div

    return (
        <Wrapper
            href={href}
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotateZ: 0.5 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "group relative glass-card p-6 rounded-xl overflow-hidden cursor-pointer",
                "border border-white/5 hover:border-primary/30 transition-all duration-300",
                spanClasses[span],
                className
            )}
        >
            {content}
        </Wrapper>
    )
}

// --- SplitScreenLayout ---
interface SplitScreenLayoutProps {
    isOpen: boolean
    onClose: () => void
    leftPanel: React.ReactNode
    rightPanel: React.ReactNode
    leftPanelWidth?: string
    className?: string
}

export function SplitScreenLayout({
    isOpen,
    onClose,
    leftPanel,
    rightPanel,
    leftPanelWidth = "400px",
    className
}: SplitScreenLayoutProps) {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const rightPanelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollbarWidth}px`
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
        return () => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isMobileNavOpen) setIsMobileNavOpen(false)
                else if (isOpen) onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose, isMobileNavOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[60] flex flex-col md:flex-row bg-background/95 backdrop-blur-xl"
                >
                    <div className="md:hidden flex items-center justify-between p-4 border-b border-primary/10 bg-background/50 backdrop-blur-md z-50">
                        <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} className="p-2 rounded-lg bg-primary/5 text-primary">
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-bold font-space-grotesk text-lg">Timeline</span>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <motion.div
                        className={cn(
                            "fixed inset-y-0 left-0 z-40 bg-background/80 md:bg-transparent md:static md:z-auto",
                            "border-r border-primary/10 flex flex-col",
                            "transition-transform duration-300 ease-in-out md:transform-none"
                        )}
                        style={{
                            width: `min(100%, ${leftPanelWidth})`,
                            transform: typeof window !== 'undefined' && window.innerWidth < 768 && !isMobileNavOpen
                                ? 'translateX(-100%)'
                                : 'none'
                        }}
                    >
                        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">{leftPanel}</div>
                    </motion.div>
                    {isMobileNavOpen && (
                        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileNavOpen(false)} />
                    )}
                    <div className="flex-1 relative flex flex-col h-full overflow-hidden">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={onClose}
                            className="hidden md:flex absolute top-6 right-8 z-50 p-3 rounded-full bg-black/20 hover:bg-red-500/20 text-white/50 hover:text-red-400 backdrop-blur-md border border-white/5 transition-all duration-300 hover:rotate-90"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />
                        <div
                            ref={rightPanelRef}
                            className={cn("flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth", className)}
                            onWheel={(e) => e.stopPropagation()}
                            style={{ overscrollBehavior: 'contain', isolation: 'isolate' }}
                        >
                            <div className="max-w-7xl mx-auto w-full min-h-full">{rightPanel}</div>
                            <div className="h-32" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// --- Timeline ---
interface TimelineItem {
    title: string
    description: string
    date?: string
    icon?: React.ReactNode
    status?: "completed" | "current" | "upcoming"
}

interface TimelineProps {
    items: TimelineItem[]
    orientation?: "vertical" | "horizontal"
    className?: string
}

export function Timeline({
    items,
    orientation = "vertical",
    className
}: TimelineProps) {
    return (
        <div className={cn(
            "relative",
            orientation === "vertical" ? "space-y-8" : "flex gap-8",
            className
        )}>
            <div className={cn(
                "absolute bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent",
                orientation === "vertical"
                    ? "left-[19px] top-0 w-0.5 h-full"
                    : "top-[19px] left-0 h-0.5 w-full bg-gradient-to-r"
            )} />
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: orientation === "vertical" ? -20 : 0, y: orientation === "horizontal" ? 20 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cn(
                        "relative flex gap-6",
                        orientation === "vertical" ? "flex-row" : "flex-col items-center"
                    )}
                >
                    <div className="relative flex-shrink-0">
                        <motion.div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 relative z-10",
                                item.status === "completed" && "bg-primary border-primary text-black",
                                item.status === "current" && "bg-secondary border-secondary text-black animate-pulse",
                                item.status === "upcoming" && "bg-background border-muted text-muted-foreground"
                            )}
                            whileHover={{ scale: 1.2 }}
                        >
                            {item.icon || <span className="text-xs font-bold font-mono">{String(index + 1).padStart(2, "0")}</span>}
                        </motion.div>
                        {item.status === "current" && (
                            <div className="absolute inset-0 rounded-full bg-secondary/30 blur-xl animate-pulse" />
                        )}
                    </div>
                    <div className={cn(
                        "flex-1 glass-card p-6 rounded-xl group hover:border-primary/30 transition-colors",
                        orientation === "horizontal" && "text-center"
                    )}>
                        {item.date && (
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                {item.date}
                            </span>
                        )}
                        <h3 className="text-xl font-bold font-space-grotesk mt-2 mb-3 group-hover:text-primary transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                        {item.status && (
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <span className={cn(
                                    "inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider",
                                    item.status === "completed" && "bg-primary/10 text-primary border border-primary/20",
                                    item.status === "current" && "bg-secondary/10 text-secondary border border-secondary/20",
                                    item.status === "upcoming" && "bg-muted/10 text-muted-foreground border border-muted/20"
                                )}>
                                    {item.status}
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

// --- Breadcrumb ---
interface BreadcrumbItem {
    label: string
    onClick?: () => void
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav className={cn("flex items-center gap-2 text-sm", className)} aria-label="Breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1
                return (
                    <div key={index} className="flex items-center gap-2">
                        {item.onClick ? (
                            <button
                                onClick={item.onClick}
                                className={cn(
                                    "font-mono transition-colors",
                                    isLast ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                {item.label}
                            </button>
                        ) : (
                            <span className={cn("font-mono", isLast ? "text-primary font-bold" : "text-muted-foreground")}>
                                {item.label}
                            </span>
                        )}
                        {!isLast && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                    </div>
                )
            })}
        </nav>
    )
}

// --- FullPageModal ---
interface FullPageModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export function FullPageModal({ isOpen, onClose, children, className }: FullPageModalProps) {
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollbarWidth}px`
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
        return () => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose()
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100]"
                    style={{ position: 'fixed' }}
                >
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="absolute inset-0 bg-black/80"
                        onClick={onClose}
                        onWheel={(e) => e.preventDefault()}
                        onTouchMove={(e) => e.preventDefault()}
                        style={{ touchAction: 'none' }}
                    />
                    <div
                        className={cn("relative w-full h-full flex flex-col bg-background border-t border-primary/30", className)}
                        style={{ position: 'relative', overflow: 'hidden' }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent z-10" />
                        <button
                            onClick={onClose}
                            className={cn(
                                "absolute top-6 right-6 z-50 p-2 rounded-lg bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-200 group"
                            )}
                            aria-label="Close"
                        >
                            <X className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors" />
                        </button>
                        <div
                            className="flex-1 overflow-y-auto overflow-x-hidden"
                            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', isolation: 'isolate' }}
                        >
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

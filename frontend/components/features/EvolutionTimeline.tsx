"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Coffee, Users, ChevronRight, Calendar, Image as ImageIcon, ArrowRight, LayoutGrid, List, Clock, MapPin, UserCheck, Tag, FileText, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { SplitScreenLayout } from "@/components/ui/layouts"
import { Breadcrumb } from "@/components/ui/layouts"
import { PhotoMasonry, PhotoCarousel, AdvancedLightbox } from "@/components/ui/media-components"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { timelineData, type MediaItem, type TimelineSection, type Subsection, type Speaker } from "@/data/timeline-content"

// Navigation state types
type ViewState =
    | { level: 'overview' }
    | { level: 'split-view', sectionId: string, subsectionId?: string }

export function EvolutionTimeline() {
    const [viewState, setViewState] = useState<ViewState>({ level: 'overview' })
    const [lightboxMedia, setLightboxMedia] = useState<MediaItem[] | null>(null)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    const sections = useMemo(() => timelineData, [])
    const isSplitViewOpen = viewState.level === 'split-view'

    // Lock body scroll when split view is open
    useEffect(() => {
        if (isSplitViewOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            const originalBodyOverflow = document.body.style.overflow
            const originalBodyPaddingRight = document.body.style.paddingRight
            const originalHtmlOverflow = document.documentElement.style.overflow
            const scrollY = window.scrollY

            // Prevent scrolling on body and html
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollbarWidth}px`
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = '100%'
            document.documentElement.style.overflow = 'hidden'

            // Hide navbar
            const navbar = document.querySelector('header')
            if (navbar) navbar.style.opacity = '0'
            if (navbar) navbar.style.pointerEvents = 'none'

            return () => {
                // Restore original styles
                document.body.style.overflow = originalBodyOverflow
                document.body.style.paddingRight = originalBodyPaddingRight
                document.body.style.position = ''
                document.body.style.top = ''
                document.body.style.width = ''
                document.documentElement.style.overflow = originalHtmlOverflow

                // Show navbar
                if (navbar) navbar.style.opacity = '1'
                if (navbar) navbar.style.pointerEvents = 'auto'

                // Restore scroll position
                window.scrollTo(0, scrollY)
            }
        }
    }, [isSplitViewOpen])

    // Navigation functions - memoized with useCallback
    const openSection = useCallback((sectionId: string) => {
        setViewState({ level: 'split-view', sectionId })
    }, [])

    const navigateToSubsection = useCallback((sectionId: string, subsectionId: string) => {
        setViewState({ level: 'split-view', sectionId, subsectionId })
    }, [])

    const closeSplitView = useCallback(() => {
        setViewState({ level: 'overview' })
    }, [])

    const openLightbox = useCallback((media: MediaItem[], index: number) => {
        setLightboxMedia(media)
        setLightboxIndex(index)
    }, [])

    // Get current active data - memoized
    const currentSection = useMemo(() => {
        return viewState.level === 'split-view'
            ? sections.find(s => s.id === viewState.sectionId)
            : undefined
    }, [viewState, sections])

    const currentSubsection = useMemo(() => {
        return viewState.level === 'split-view' && currentSection && viewState.subsectionId
            ? currentSection.subsections?.find(sub => sub.id === viewState.subsectionId)
            : undefined
    }, [viewState, currentSection])

    // Icon mapping - memoized
    const iconMap = useMemo(() => ({
        "foundation": Award,
        "chai-links": Coffee,
        "founders": Users
    }), [])

    const colorClasses = useMemo(() => ({
        primary: {
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/30",
            text: "text-emerald-400",
            glow: "shadow-[0_0_40px_rgba(16,185,129,0.5)]",
            gradient: "from-emerald-500/20 to-transparent",
            hoverBg: "hover:bg-emerald-500/20"
        },
        secondary: {
            bg: "bg-emerald-400/10",
            border: "border-emerald-400/30",
            text: "text-emerald-300",
            glow: "shadow-[0_0_40px_rgba(52,211,153,0.5)]",
            gradient: "from-emerald-400/20 to-transparent",
            hoverBg: "hover:bg-emerald-400/20"
        },
        accent: {
            bg: "bg-green-400/10",
            border: "border-green-400/30",
            text: "text-green-300",
            glow: "shadow-[0_0_40px_rgba(74,222,128,0.5)]",
            gradient: "from-green-400/20 to-transparent",
            hoverBg: "hover:bg-green-400/20"
        }
    }), [])

    return (
        <section className={cn(
            "relative py-[8vh] bg-background min-h-screen flex items-center transition-all duration-300",
            isSplitViewOpen ? "overflow-hidden" : "overflow-hidden"
        )} id="evolution">
            {/* Global Blur Overlay - covers navbar and everything when split view is open */}
            <AnimatePresence>
                {isSplitViewOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[55] backdrop-blur-xl bg-black/30 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Background Effects - optimized */}
            {!isSplitViewOpen && (
                <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary)/0.05),transparent_70%)]" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(hsl(var(--primary)/0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.1) 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }} />
                    </div>
                </>
            )}

            <div className="max-w-7xl mx-auto w-full relative z-10 px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                        "text-center mb-[5vh] transition-all duration-200",
                        isSplitViewOpen && "blur-xl opacity-20 pointer-events-none"
                    )}
                >
                    <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="inline-block px-6 py-2 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-md mb-6 text-xs font-mono text-primary font-bold tracking-[0.3em] uppercase"
                    >
                        OUR JOURNEY
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl font-bold font-space-grotesk mb-6">
                        <span className="text-primary">#</span> Evolution{" "}
                        <span className="text-[#00FF80] drop-shadow-[0_0_10px_rgba(0,255,128,0.5)]">
                            Timeline
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        Explore our chapter&apos;s milestones through an immersive visual journey
                    </p>
                </motion.div>

                {/* Overview Cards */}
                <div className={cn(
                    "max-w-7xl mx-auto grid gap-8 transition-all duration-200",
                    isSplitViewOpen && "blur-xl opacity-25 pointer-events-none"
                )}>
                    {sections.map((section, index) => {
                        const colors = colorClasses[section.color as keyof typeof colorClasses]
                        const Icon = iconMap[section.id as keyof typeof iconMap]
                        const totalMedia = section.subsections
                            ? section.subsections.reduce((sum, sub) => sum + (sub.media?.length || 0), 0)
                            : section.media?.length || 0

                        return (
                            <motion.button
                                key={section.id}
                                onClick={() => openSection(section.id)}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 120, damping: 20 }}
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.99 }}
                                className={cn(
                                    "group relative glass-card rounded-3xl p-8 md:p-12",
                                    "border-2 transition-all duration-200",
                                    "hover:border-primary/50",
                                    colors.border,
                                    "text-left w-full overflow-hidden"
                                )}
                            >
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-200",
                                    colors.gradient
                                )} />

                                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "relative p-5 rounded-2xl transition-all duration-200",
                                            colors.bg,
                                            colors.text,
                                            "group-hover:scale-105"
                                        )}>
                                            <Icon className="w-8 h-8 md:w-10 md:h-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2 group-hover:text-white transition-colors">
                                                {section.title}
                                            </h3>
                                            <p className={cn("font-mono text-sm uppercase tracking-wider", colors.text)}>
                                                {section.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                        {totalMedia > 0 && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground/80 bg-background/30 px-4 py-2 rounded-full border border-white/5">
                                                <ImageIcon className="w-4 h-4" />
                                                <span>{totalMedia} memories</span>
                                            </div>
                                        )}
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                                            colors.bg,
                                            colors.text,
                                            "group-hover:translate-x-2"
                                        )}>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            {/* Split Screen Application-Like Interface */}
            {currentSection && (
                <SplitScreenLayout
                    isOpen={isSplitViewOpen}
                    onClose={closeSplitView}
                    leftPanel={
                        <NavigationPanel
                            sections={sections}
                            currentSection={currentSection}
                            currentSubsectionId={viewState.level === 'split-view' ? viewState.subsectionId : undefined}
                            onSelectSection={openSection}
                            onSelectSubsection={(subId) => navigateToSubsection(currentSection.id, subId)}
                        />
                    }
                    rightPanel={
                        <ContentPanel
                            section={currentSection}
                            subsection={currentSubsection}
                            onOpenLightbox={openLightbox}
                        />
                    }
                />
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxMedia && (
                    <AdvancedLightbox
                        media={lightboxMedia}
                        initialIndex={lightboxIndex}
                        onClose={() => setLightboxMedia(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

interface NavigationPanelProps {
    sections: TimelineSection[]
    currentSection: TimelineSection
    currentSubsectionId?: string
    onSelectSection: (id: string) => void
    onSelectSubsection: (id: string) => void
}

function NavigationPanel({
    sections,
    currentSection,
    currentSubsectionId,
    onSelectSection,
    onSelectSubsection
}: NavigationPanelProps) {
    return (
        <div className="p-6 md:p-8 space-y-8 min-h-full">
            <div className="mb-8 pt-10 md:pt-12">
                <h3 className="text-xs font-mono uppercase text-muted-foreground mb-4 tracking-widest">
                    Chapters
                </h3>
                <div className="space-y-2">
                    {sections.map(section => {
                        const isActive = section.id === currentSection.id
                        return (
                            <button
                                key={section.id}
                                onClick={() => onSelectSection(section.id)}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group",
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium border border-primary/20"
                                        : "hover:bg-white/5 text-muted-foreground hover:text-white"
                                )}
                            >
                                <span className="font-space-grotesk">{section.title}</span>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                            </button>
                        )
                    })}
                </div>
            </div>

            {currentSection.subsections && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={currentSection.id}
                >
                    <h3 className="text-xs font-mono uppercase text-muted-foreground mb-4 tracking-widest flex items-center gap-2">
                        <List className="w-3 h-3" />
                        Contents
                    </h3>
                    <div className="relative pl-4 space-y-1">
                        {/* Vertical line */}
                        <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />

                        {currentSection.subsections.map(sub => {
                            const isSubActive = sub.id === currentSubsectionId
                            return (
                                <button
                                    key={sub.id}
                                    onClick={() => onSelectSubsection(sub.id)}
                                    className={cn(
                                        "w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 block relative",
                                        isSubActive
                                            ? "bg-white/15 text-white font-medium pl-6"
                                            : "text-muted-foreground hover:text-white hover:pl-6"
                                    )}
                                >
                                    {isSubActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full"
                                        />
                                    )}
                                    {sub.title}
                                </button>
                            )
                        })}
                    </div>
                </motion.div>
            )}
        </div>
    )
}

interface SpeakerTileProps {
    speaker: Speaker
    colors: string
}

function SpeakerTile({ speaker, colors }: SpeakerTileProps) {
    const initials = speaker.name.split(" ").map(n => n[0]).join("").slice(0, 2)
    return (
        <div className="glass-card rounded-xl p-6 border border-white/5 bg-white/5">
            <h3 className="text-xl font-bold font-space-grotesk mb-4">Speaker</h3>
            <div className="flex flex-col sm:flex-row gap-6">
                <Avatar className="h-24 w-24 shrink-0 rounded-xl overflow-hidden border border-white/10">
                    {speaker.image ? (
                        <AvatarImage src={speaker.image} alt={speaker.name} className="object-cover" />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold rounded-xl">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-white font-space-grotesk">{speaker.name}</p>
                    <p className={cn("text-base font-medium mt-1", colors)}>{speaker.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{speaker.bio}</p>
                </div>
            </div>
        </div>
    )
}

interface ContentPanelProps {
    section: TimelineSection
    subsection?: Subsection
    onOpenLightbox: (media: MediaItem[], index: number) => void
}

function ContentPanel({ section, subsection, onOpenLightbox }: ContentPanelProps) {
    const colors = {
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent"
    }[section.color]

    // Content for subsection view
    if (subsection) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={`sub-${subsection.id}`}
                className="py-12 md:py-16 px-6 md:px-12"
            >
                <Breadcrumb
                    items={[
                        { label: section.title },
                        { label: subsection.title }
                    ]}
                    className="mb-8"
                />

                <div className="max-w-4xl mb-12">
                    <h2 className={cn("text-4xl md:text-6xl font-bold font-space-grotesk mb-4", colors)}>
                        {subsection.title}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        {subsection.description}
                    </p>

                    {/* Event Details Cards - show for real subsections only, not "more stories coming" */}
                    {!["more-chai", "more-founders"].includes(subsection.id) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <div className="glass-card rounded-xl p-4 border border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono uppercase text-muted-foreground/60 tracking-wider mb-1">Date</p>
                                        <p className={cn("text-sm font-medium", subsection.date ? "text-white" : "text-white/50")}>{subsection.date ?? "—"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-card rounded-xl p-4 border border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono uppercase text-muted-foreground/60 tracking-wider mb-1">Time</p>
                                        <p className={cn("text-sm font-medium", subsection.time ? "text-white" : "text-white/50")}>{subsection.time ?? "—"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-card rounded-xl p-4 border border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono uppercase text-muted-foreground/60 tracking-wider mb-1">Location</p>
                                        <p className={cn("text-sm font-medium", subsection.location ? "text-white" : "text-white/50")}>{subsection.location ?? "—"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-card rounded-xl p-4 border border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <UserCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono uppercase text-muted-foreground/60 tracking-wider mb-1">Participants</p>
                                        <p className={cn("text-sm font-medium", subsection.attendees ? "text-white" : "text-white/50")}>{subsection.attendees ? `${subsection.attendees}+` : "—"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Speaker tile - below event tiles */}
                    {!["more-chai", "more-founders"].includes(subsection.id) && subsection.speaker && (
                        <div className="mt-6">
                            <SpeakerTile speaker={subsection.speaker} colors={colors} />
                        </div>
                    )}
                </div>

                <div className="min-h-[400px]">
                    {subsection.media && subsection.media.length > 0 ? (
                        section.id === 'chai-links' ? (
                            <PhotoCarousel
                                media={subsection.media}
                                onMediaClick={(media, index) => onOpenLightbox(subsection.media, index)}
                            />
                        ) : (
                            <PhotoMasonry
                                media={subsection.media}
                                onMediaClick={(media, index) => onOpenLightbox(subsection.media, index)}
                            />
                        )
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </motion.div>
        )
    }

    // Content for main section view
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={`sec-${section.id}`}
            className="py-12 md:py-16 px-6 md:px-12"
        >
            <div className="mb-12">
                <span className={cn("inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider mb-4", colors)}>
                    Overview
                </span>
                <h2 className="text-5xl md:text-7xl font-bold font-space-grotesk mb-4">
                    {section.title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    {section.subtitle}
                </p>

                {section.id === "chai-links" && (
                    <p className="text-sm md:text-base text-muted-foreground/80 leading-snug max-w-2xl mt-4">
                        Designed to foster a relaxed and collaborative learning environment, Chai Links serves as an open platform for students and faculty to engage in meaningful discussions over a cup of chai. The initiative aims to break the conventional teacher–student barrier, encouraging informal conversations, idea exchange, and curiosity-driven learning beyond the classroom setting.
                        <br />
                        <br />
                        Through interactive dialogue and shared perspectives, Chai Links promotes interdisciplinary thinking, mentorship, and a stronger sense of academic and technical community within ITER. It creates a space where questions flow freely, ideas evolve naturally, and learning becomes a shared experience rather than a formal interaction.
                    </p>
                )}

                {section.id === "founders" && (
                    <p className="text-sm md:text-base text-muted-foreground/80 leading-snug max-w-2xl mt-4">
                        The GFG Campus Body ITER organized Founders Unplugged: From Chaos to Creation, an interactive entrepreneurial session aimed at inspiring and informing students about the realities of startup culture. The event brought together aspiring entrepreneurs and curious minds for an open conversation on innovation, risk-taking, and building ventures from the ground up.
                        <br />
                        <br />
                        Through candid storytelling, the session highlighted real startup journeys, honest failures, pivotal lessons, and the unpredictable path from idea to execution. Participants had the opportunity to engage directly with founders during a live interaction segment, gaining practical insights that extend beyond traditional classroom learning.
                        <br />
                        <br />
                        The event created a platform for clarity, inspiration, and meaningful dialogue, encouraging students to explore entrepreneurship with a realistic and informed perspective.
                    </p>
                )}

                {/* Event Details Cards - for Chapter Foundation */}
                {section.id === "foundation" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="glass-card rounded-xl p-4 border border-white/5 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-mono uppercase text-muted-foreground/60 tracking-wider mb-1">Date</p>
                                    <p className={cn("text-sm font-medium", section.date ? "text-white" : "text-white/50")}>{section.date ?? "—"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card rounded-xl p-4 border border-white/5 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-mono uppercase text-muted-foreground/60 tracking-wider mb-1">Time</p>
                                    <p className={cn("text-sm font-medium", section.time ? "text-white" : "text-white/50")}>{section.time ?? "—"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card rounded-xl p-4 border border-white/5 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-mono uppercase text-muted-foreground/60 tracking-wider mb-1">Location</p>
                                    <p className={cn("text-sm font-medium", section.location ? "text-white" : "text-white/50")}>{section.location ?? "—"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card rounded-xl p-4 border border-white/5 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <UserCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-mono uppercase text-muted-foreground/60 tracking-wider mb-1">Participants</p>
                                    <p className={cn("text-sm font-medium", section.attendees ? "text-white" : "text-white/50")}>{section.attendees ? `${section.attendees}+` : "—"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Speaker tile - for sections without subsections (e.g. Chapter Foundation) */}
                {section.id === "foundation" && section.speaker && (
                    <div className="mt-6">
                        <SpeakerTile speaker={section.speaker} colors={colors} />
                    </div>
                )}
            </div>

            {section.media && section.media.length > 0 && (
                <div className="mb-16">
                    <h3 className="text-xl font-bold font-space-grotesk mb-6 flex items-center gap-2">
                        <LayoutGrid className="w-5 h-5 text-primary" />
                        Highlights Gallery
                    </h3>
                    <PhotoMasonry
                        media={section.media}
                        onMediaClick={(media, index) => onOpenLightbox(section.media || [], index)}
                        columns={3}
                    />
                </div>
            )}

            {!section.subsections && (!section.media || section.media.length === 0) && (
                <EmptyState />
            )}
        </motion.div>
    )
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 glass-card rounded-3xl border-2 border-dashed border-white/10">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
            </div>
            <p className="text-xl text-muted-foreground/50 font-medium">No memories captured yet</p>
            <p className="text-sm text-muted-foreground/30 mt-2">Check back later for updates</p>
        </div>
    )
}

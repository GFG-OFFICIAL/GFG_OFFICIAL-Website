"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import {
    X, ZoomIn, ZoomOut, Download, Share2, ChevronLeft,
    ChevronRight, Maximize2, ImageIcon
} from "lucide-react"
import { cn, getPublicUrl } from "@/lib/utils"
import type { MediaItem } from "@/data/timeline-content"

// --- ImageWithLoader ---
// Renders image with correct public URL (basePath) and optional priority loading.
// Uses a single request and paints as soon as the browser has data.

interface ImageWithLoaderProps {
    src: string
    alt: string
    className?: string
    onLoad?: () => void
    aspectRatio?: string
    /** High priority = eager load and fetchpriority="high" for above-the-fold images */
    priority?: boolean
}

export function ImageWithLoader({
    src,
    alt,
    className,
    onLoad,
    aspectRatio = "auto",
    priority = false
}: ImageWithLoaderProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const resolvedSrc = getPublicUrl(src)

    useEffect(() => {
        setIsLoading(true)
        setHasError(false)
    }, [resolvedSrc])

    const handleLoad = () => {
        setIsLoading(false)
        onLoad?.()
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    if (hasError) {
        return (
            <div className={cn(
                "flex flex-col items-center justify-center bg-white/5 text-muted-foreground p-8",
                className
            )}>
                <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                <p className="text-xs text-center">Image unavailable</p>
                <p className="text-[10px] text-center mt-1 opacity-70 break-all max-w-full px-2">
                    {src}
                </p>
            </div>
        )
    }

    return (
        <div className={cn("relative", className)}>
            {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                </div>
            )}
            <img
                src={resolvedSrc}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                onLoad={handleLoad}
                onError={handleError}
                className={cn(
                    "transition-opacity duration-500",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                style={{ aspectRatio }}
                decoding="async"
            />
        </div>
    )
}

// --- MediaSkeleton ---

interface MediaSkeletonProps {
    type: "masonry" | "carousel" | "grid"
    count?: number
    columns?: number
}

export function MediaSkeleton({ type, count = 6, columns = 3 }: MediaSkeletonProps) {
    if (type === "masonry") return <MasonrySkeleton count={count} columns={columns} />
    if (type === "carousel") return <CarouselSkeleton count={count} />
    return <GridSkeleton count={count} />
}

function SkeletonCard({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-xl bg-white/5 border border-white/10",
                className
            )}
            style={{ animationDelay: `${delay}s` }}
        >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/5" />
            </div>
        </div>
    )
}

function MasonrySkeleton({ count, columns }: { count: number; columns: number }) {
    const items = Array.from({ length: count })
    const columnData = Array.from({ length: columns }, () => [] as number[])
    items.forEach((_, index) => {
        columnData[index % columns].push(index)
    })
    return (
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {columnData.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-4">
                    {column.map((itemIndex) => (
                        <SkeletonCard key={itemIndex} className="aspect-[4/5]" delay={itemIndex * 0.1} />
                    ))}
                </div>
            ))}
        </div>
    )
}

function CarouselSkeleton({ count }: { count: number }) {
    return (
        <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} className="min-w-[300px] aspect-video" delay={index * 0.1} />
            ))}
        </div>
    )
}

function GridSkeleton({ count }: { count: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} className="aspect-video" delay={index * 0.1} />
            ))}
        </div>
    )
}

// --- PhotoMasonry ---

interface PhotoMasonryProps {
    media: MediaItem[]
    onMediaClick: (media: MediaItem, index: number) => void
    columns?: number
    loading?: boolean
}

export function PhotoMasonry({ media, onMediaClick, columns = 3, loading = false }: PhotoMasonryProps) {
    const [columnCount, setColumnCount] = useState(columns)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth
            if (width < 640) setColumnCount(2)
            else if (width < 1024) setColumnCount(3)
            else setColumnCount(columns)
        }
        updateColumns()
        window.addEventListener('resize', updateColumns)
        return () => window.removeEventListener('resize', updateColumns)
    }, [columns])

    const distributeToColumns = () => {
        const cols: MediaItem[][] = Array.from({ length: columnCount }, () => [])
        media.forEach((item, index) => {
            cols[index % columnCount].push(item)
        })
        return cols
    }

    if (loading) return <MediaSkeleton type="masonry" count={6} columns={columnCount} />

    if (!media || media.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">No media available yet</p>
            </div>
        )
    }

    const columnData = distributeToColumns()

    return (
        <div ref={containerRef} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
            {columnData.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-4">
                    {column.map((item, itemIndex) => {
                        const actualIndex = columnIndex + (itemIndex * columnCount)
                        return (
                            <MasonryItem
                                key={actualIndex}
                                media={item}
                                index={actualIndex}
                                onClick={() => onMediaClick(item, actualIndex)}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

const MASONRY_PRIORITY_COUNT = 6
const MASONRY_LAZY_ROOT_MARGIN = "200px"

function MasonryItem({ media, index, onClick }: { media: MediaItem; index: number; onClick: () => void }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isVisible, setIsVisible] = useState(index < MASONRY_PRIORITY_COUNT)
    const itemRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (index < MASONRY_PRIORITY_COUNT) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: MASONRY_LAZY_ROOT_MARGIN }
        )
        if (itemRef.current) observer.observe(itemRef.current)
        return () => observer.disconnect()
    }, [index])

    return (
        <motion.button
            ref={itemRef}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className={cn(
                "relative group cursor-pointer overflow-hidden rounded-xl",
                "bg-white/5 border border-white/10",
                "hover:border-primary/50 transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
        >
            <div className="relative w-full">
                {isVisible && (
                    <ImageWithLoader
                        src={media.url}
                        alt={media.caption || "Gallery image"}
                        onLoad={() => setIsLoaded(true)}
                        className="w-full h-auto object-cover"
                        priority={index < 6}
                    />
                )}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    "flex flex-col justify-end p-4"
                )}>
                    {media.caption && <p className="text-white text-sm font-medium line-clamp-2">{media.caption}</p>}
                    {media.date && <p className="text-white/70 text-xs mt-1">{media.date}</p>}
                </div>
                {media.type === "video" && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                    </div>
                )}
                <div className={cn(
                    "absolute top-3 left-3 bg-primary/20 backdrop-blur-sm rounded-full p-2",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )}>
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                </div>
            </div>
            {!isLoaded && isVisible && <div className="absolute inset-0 bg-white/5 animate-pulse" />}
        </motion.button>
    )
}

// --- PhotoCarousel ---

interface PhotoCarouselProps {
    media: MediaItem[]
    onMediaClick?: (media: MediaItem, index: number) => void
    autoPlay?: boolean
    autoPlayInterval?: number
}

export function PhotoCarousel({
    media,
    onMediaClick,
    autoPlay = false,
    autoPlayInterval = 5000
}: PhotoCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [dragDirection, setDragDirection] = useState(0)
    const autoPlayRef = useRef<NodeJS.Timeout>(undefined)

    const handlePrevious = () => setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
    const handleNext = () => setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))

    const handleDragEnd = (_: any, info: PanInfo) => {
        const swipeThreshold = 50
        if (info.offset.x > swipeThreshold) handlePrevious()
        else if (info.offset.x < -swipeThreshold) handleNext()
    }

    useEffect(() => {
        if (autoPlay) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
            }, autoPlayInterval)
            return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
        }
    }, [autoPlay, autoPlayInterval, media.length])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrevious()
            if (e.key === "ArrowRight") handleNext()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handlePrevious, handleNext])

    if (!media || media.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">No media available</p>
            </div>
        )
    }

    return (
        <div className="relative group">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/20">
                <AnimatePresence initial={false} custom={dragDirection} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={dragDirection}
                        initial={{ opacity: 0, x: dragDirection > 0 ? 300 : -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dragDirection > 0 ? -300 : 300 }}
                        transition={{ duration: 0.3 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing"
                        onClick={() => onMediaClick?.(media[currentIndex], currentIndex)}
                    >
                        {media[currentIndex].type === "image" ? (
                            <ImageWithLoader
                                src={media[currentIndex].url}
                                alt={media[currentIndex].caption || `Slide ${currentIndex + 1}`}
                                className="w-full h-full object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                                <div className="text-center text-white">
                                    <svg className="w-24 h-24 mx-auto mb-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    <p className="text-sm opacity-80">Video: {media[currentIndex].url.split('/').pop()}</p>
                                </div>
                            </div>
                        )}
                        {media[currentIndex].caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-12">
                                <p className="text-white text-lg font-medium">{media[currentIndex].caption}</p>
                                {media[currentIndex].date && <p className="text-white/70 text-sm mt-1">{media[currentIndex].date}</p>}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
                {media.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className={cn(
                                "absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm",
                                "hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100",
                                "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
                            )}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={handleNext}
                            className={cn(
                                "absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm",
                                "hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100",
                                "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
                            )}
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </>
                )}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-mono">{currentIndex + 1} / {media.length}</span>
                </div>
            </div>
            {media.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {media.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                                currentIndex === index
                                    ? "border-primary scale-105"
                                    : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                            )}
                        >
                            {item.type === "image" ? (
                                <img src={getPublicUrl(item.url)} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
            <div className="flex justify-center gap-2 mt-4">
                {media.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            currentIndex === index ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

// --- AdvancedLightbox ---

interface AdvancedLightboxProps {
    media: MediaItem[]
    initialIndex: number
    onClose: () => void
}

export function AdvancedLightbox({ media, initialIndex, onClose }: AdvancedLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)
    const [zoomLevel, setZoomLevel] = useState(1)
    const [isPanning, setIsPanning] = useState(false)
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
    const [isFullscreen, setIsFullscreen] = useState(false)

    const currentMedia = media[currentIndex]
    const canZoom = currentMedia.type === "image"

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            resetZoom()
        }
    }

    const handleNext = () => {
        if (currentIndex < media.length - 1) {
            setCurrentIndex(currentIndex + 1)
            resetZoom()
        }
    }

    const resetZoom = () => {
        setZoomLevel(1)
        setPanPosition({ x: 0, y: 0 })
    }

    const handleZoomIn = () => { if (canZoom) setZoomLevel((prev) => Math.min(prev + 0.5, 4)) }
    const handleZoomOut = () => {
        if (canZoom) {
            setZoomLevel((prev) => {
                const newZoom = Math.max(prev - 0.5, 1)
                if (newZoom === 1) setPanPosition({ x: 0, y: 0 })
                return newZoom
            })
        }
    }

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen()
            setIsFullscreen(true)
        } else {
            await document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = getPublicUrl(currentMedia.url)
        link.download = currentMedia.url.split('/').pop() || 'download'
        link.click()
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: currentMedia.caption || 'Photo',
                    text: currentMedia.caption || 'Check out this photo',
                    url: getPublicUrl(currentMedia.url)
                })
            } catch (err) { }
        } else {
            navigator.clipboard.writeText(getPublicUrl(currentMedia.url))
            alert('Link copied to clipboard!')
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") handlePrevious()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "+" || e.key === "=") handleZoomIn()
            if (e.key === "-") handleZoomOut()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [currentIndex, zoomLevel])

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex flex-col"
        >
            <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="text-white/70 text-sm font-mono">{currentIndex + 1} / {media.length}</span>
                    {currentMedia.caption && <span className="text-white/50 text-sm hidden md:block">• {currentMedia.caption}</span>}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Toggle fullscreen">
                        <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                    <button onClick={handleDownload} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Download">
                        <Download className="w-5 h-5 text-white" />
                    </button>
                    <button onClick={handleShare} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Share">
                        <Share2 className="w-5 h-5 text-white" />
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Close (ESC)">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="relative max-w-full max-h-full"
                        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
                    >
                        {currentMedia.type === "image" ? (
                            <motion.div
                                drag={zoomLevel > 1}
                                dragConstraints={{
                                    left: -100 * (zoomLevel - 1),
                                    right: 100 * (zoomLevel - 1),
                                    top: -100 * (zoomLevel - 1),
                                    bottom: 100 * (zoomLevel - 1)
                                }}
                                dragElastic={0.1}
                                onDragStart={() => setIsPanning(true)}
                                onDragEnd={() => setIsPanning(false)}
                                style={{
                                    scale: zoomLevel,
                                    cursor: zoomLevel > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default'
                                }}
                                className="max-w-[90vw] max-h-[80vh]"
                            >
                                <ImageWithLoader
                                    src={currentMedia.url}
                                    alt={currentMedia.caption || "Lightbox image"}
                                    className="w-full h-full object-contain"
                                    priority
                                />
                            </motion.div>
                        ) : (
                            <div className="max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center text-white">
                                    <div className="text-center">
                                        <svg className="w-24 h-24 mx-auto mb-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                        <p className="text-sm opacity-80">Video: {currentMedia.url.split('/').pop()}</p>
                                        <p className="text-xs opacity-60 mt-2">Video playback coming soon</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
                {media.length > 1 && (
                    <>
                        <button onClick={handlePrevious} disabled={currentIndex === 0}
                            className={cn("absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all disabled:opacity-30")}>
                            <ChevronLeft className="w-8 h-8 text-white" />
                        </button>
                        <button onClick={handleNext} disabled={currentIndex === media.length - 1}
                            className={cn("absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all disabled:opacity-30")}>
                            <ChevronRight className="w-8 h-8 text-white" />
                        </button>
                    </>
                )}
            </div>

            <div className="p-4 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        {currentMedia.caption && <p className="text-white text-sm md:text-base font-medium">{currentMedia.caption}</p>}
                        <div className="flex gap-3 mt-1 text-xs text-white/60">
                            {currentMedia.date && <span>{currentMedia.date}</span>}
                            {currentMedia.location && <span>• {currentMedia.location}</span>}
                        </div>
                    </div>
                    {canZoom && (
                        <div className="flex items-center gap-2 ml-4">
                            <button onClick={handleZoomOut} disabled={zoomLevel <= 1} className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-30" title="Zoom out (-)">
                                <ZoomOut className="w-5 h-5 text-white" />
                            </button>
                            <span className="text-white text-sm font-mono w-12 text-center">{zoomLevel}x</span>
                            <button onClick={handleZoomIn} disabled={zoomLevel >= 4} className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-30" title="Zoom in (+)">
                                <ZoomIn className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

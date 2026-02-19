"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface ImageWithLoaderProps {
    src: string
    alt: string
    className?: string
    onLoad?: () => void
    aspectRatio?: string
}

export function ImageWithLoader({
    src,
    alt,
    className,
    onLoad,
    aspectRatio = "auto"
}: ImageWithLoaderProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [imageSrc, setImageSrc] = useState<string>("")

    useEffect(() => {
        // Reset states when src changes
        Promise.resolve().then(() => {
            setIsLoading(true)
            setHasError(false)
        })

        // Create a new image to preload
        const img = new Image()

        img.onload = () => {
            setImageSrc(src)
            setIsLoading(false)
            onLoad?.()
        }

        img.onerror = () => {
            setIsLoading(false)
            setHasError(true)
        }

        img.src = src
    }, [src, onLoad])

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
            {/* Loading placeholder with blur-up effect */}
            {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                </div>
            )}

            {/* Actual image */}
            <img
                src={imageSrc}
                alt={alt}
                className={cn(
                    "transition-opacity duration-500",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                style={{ aspectRatio }}
            />
        </div>
    )
}

"use client"

import { GlassCard } from "@/components/ui/cards"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Trash2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface MediaItem {
    id: number
    name: string
}

interface MediaGalleryProps {
    items: MediaItem[]
    isLoading: boolean
    onDelete: (id: number) => void
}

export function MediaGallery({ items, isLoading, onDelete }: MediaGalleryProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden">
                        <Skeleton className="h-full w-full bg-white/5" />
                    </div>
                ))}
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                <ImageIcon className="h-12 w-12 mb-4 opacity-50" />
                <p className="font-mono text-sm uppercase tracking-widest">No Media Artifacts Found</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
                <GlassCard key={item.id} className="overflow-hidden group relative p-0 border-zinc-900 bg-black/40 hover:border-primary/50 transition-colors">
                    <div className="aspect-square bg-zinc-900/50 flex items-center justify-center relative">
                        <ImageIcon className="h-8 w-8 text-zinc-700 group-hover:text-primary transition-colors duration-500" />
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-black/80 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-zinc-800 flex justify-between items-center">
                        <span className="text-[10px] font-mono text-zinc-400">{item.name}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => onDelete(item.id)}
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </GlassCard>
            ))}
        </div>
    )
}

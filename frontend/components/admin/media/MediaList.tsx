"use client"

import { GlassCard } from "@/components/ui/cards"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink, Trash2, Video } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface VideoLog {
    id: number
    title: string
    date: string
    duration: string
}

interface MediaListProps {
    items: VideoLog[]
    isLoading: boolean
    onDelete: (id: number) => void
}

export function MediaList({ items, isLoading, onDelete }: MediaListProps) {
    if (isLoading) {
        return (
            <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full bg-white/5 rounded-xl" />
                ))}
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                <Video className="h-12 w-12 mb-4 opacity-50" />
                <p className="font-mono text-sm uppercase tracking-widest">No Session Logs Found</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {items.map((video) => (
                <GlassCard key={video.id} className="group hover:bg-zinc-900/40 transition-colors border-zinc-900 p-0">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                                <Play className="h-5 w-5 fill-current" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white group-hover:text-primary transition-colors">{video.title}</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-1 flex items-center gap-2">
                                    <Badge variant="outline" className="text-[10px] border-zinc-800 text-zinc-500">{video.date}</Badge>
                                    <span>DURATION: {video.duration}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                onClick={() => onDelete(video.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </GlassCard>
            ))}
        </div>
    )
}

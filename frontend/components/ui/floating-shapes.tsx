"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

interface FloatingShapesProps {
    className?: string
    count?: number
}

export function FloatingShapes({ className, count = 5 }: FloatingShapesProps) {
    const shapes = useMemo(() => Array.from({ length: count }, (_, i) => ({
        size: Math.random() * 200 + 100,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)]
    })), [count])

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-5"
                    style={{
                        left: shape.left,
                        top: shape.top,
                        width: shape.size,
                        height: shape.size
                    }}
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -80, 60, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 0.9, 1]
                    }}
                    transition={{
                        duration: shape.duration,
                        delay: shape.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {shape.shape === "circle" && (
                        <div className="w-full h-full rounded-full border-2 border-primary" />
                    )}
                    {shape.shape === "square" && (
                        <div className="w-full h-full border-2 border-secondary rotate-45" />
                    )}
                    {shape.shape === "triangle" && (
                        <div
                            className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[86px] border-l-transparent border-r-transparent border-b-accent"
                            style={{
                                borderLeftWidth: shape.size / 2,
                                borderRightWidth: shape.size / 2,
                                borderBottomWidth: shape.size * 0.866
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    )
}

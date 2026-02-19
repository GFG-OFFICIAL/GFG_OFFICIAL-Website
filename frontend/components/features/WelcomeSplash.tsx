"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Command, Sparkles } from "lucide-react"

export const WelcomeSplash = () => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem("hasSeenSplashNeo")
        if (hasSeenSplash) {
            setIsVisible(false)
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false)
                sessionStorage.setItem("hasSeenSplashNeo", "true")
            }, 3500)

            return () => clearTimeout(timer)
        }
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col items-center">

                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 mb-8 relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                            <Command className="w-10 h-10 text-primary relative z-10" />
                        </motion.div>

                        {/* Text Reveal */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-center space-y-2"
                        >
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                GeeksforGeeks
                            </h1>
                            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-medium">
                                <span>Student Chapter</span>
                                <span className="w-1 h-1 rounded-full bg-primary" />
                                <span>ITER</span>
                            </div>
                        </motion.div>

                        {/* Loading Bar */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                            className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                                className="w-full h-full bg-primary"
                            />
                        </motion.div>
                    </div>

                    {/* Background Ambience */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.05)_0%,transparent_70%)] pointer-events-none" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}


"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Play, Check, AlertTriangle, Terminal, Code2, Layers,
    Award, Clock, ChevronDown, Trophy, RotateCcw, Box,
    Settings, ThumbsUp, ThumbsDown, Star, Share2, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionShell } from "@/components/layout/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const languages = [
    { name: "C++", snippet: "#include <iostream>\nusing namespace std;\n\nint main() {\n  // Optimize your solution here\n  return 0;\n}" },
    { name: "Java", snippet: "class Solution {\n  public static void main(String[] args) {\n    // Write your code here\n  }\n}" },
    { name: "Python", snippet: "def solve():\n  # Write your solution here\n  pass\n\nif __name__ == '__main__':\n  solve()" }
]

const testCases = [
    { input: "[2, 7, 11, 15], 9", output: "[0, 1]", status: "passed" },
    { input: "[3, 2, 4], 6", output: "[1, 2]", status: "passed" },
    { input: "[3, 3], 6", output: "[0, 1]", status: "pending" }
]

export function PotdSection() {
    const [status, setStatus] = useState<"IDLE" | "RUNNING" | "SUCCESS" | "FAILED">("IDLE")
    const [selectedLang, setSelectedLang] = useState(languages[0])
    const [activeTab, setActiveTab] = useState<"CODE" | "TESTS" | "SUBMISSIONS">("CODE")
    const [showLeaderboardModal, setShowLeaderboardModal] = useState(false)
    const [userName, setUserName] = useState("")

    const handleRun = () => {
        setStatus("RUNNING")
        setTimeout(() => {
            setStatus("SUCCESS")
            setShowLeaderboardModal(true)
        }, 2000)
    }

    return (
        <SectionShell id="potd" badge="Problem of the Day" title="Daily_Anomaly" subtitle="Sharpen your algorithmic skills with daily challenges.">
            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                <div className="flex-1 space-y-4">
                    <ProblemPanel />
                    <div className="bg-[#0a0f0d] border border-border rounded-lg overflow-hidden flex flex-col h-[500px]">
                        <div className="flex items-center justify-between px-4 py-2 bg-secondary/10 border-b border-border">
                            <div className="flex gap-2">
                                {["CODE", "TESTS", "SUBMISSIONS"].map((tab) => (
                                    <button key={tab} onClick={() => setActiveTab(tab as any)} className={cn("text-xs font-mono px-3 py-1 rounded transition-colors", activeTab === tab ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground")}>{tab}</button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative group">
                                    <button className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors px-3 py-1 border border-border rounded hover:border-primary">{selectedLang.name} <ChevronDown className="w-3 h-3" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm overflow-auto text-blue-300 relative">
                            {activeTab === "CODE" && <textarea className="w-full h-full bg-transparent resize-none focus:outline-none text-zinc-300" defaultValue={selectedLang.snippet} spellCheck={false} />}
                            {activeTab === "TESTS" && (
                                <div className="space-y-3">
                                    {testCases.map((test, i) => (
                                        <div key={i} className="bg-secondary/10 p-3 rounded border border-border">
                                            <div className="flex justify-between mb-2"><span className="text-xs text-muted-foreground">Test Case {i + 1}</span><span className={cn("text-xs uppercase", test.status === "passed" ? "text-green-500" : "text-yellow-500")}>{test.status}</span></div>
                                            <div className="grid grid-cols-2 gap-4 text-xs">
                                                <div><div className="text-muted-foreground mb-1">Input:</div><div className="font-mono text-foreground">{test.input}</div></div>
                                                <div><div className="text-muted-foreground mb-1">Expected:</div><div className="font-mono text-foreground">{test.output}</div></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === "SUBMISSIONS" && <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2"><Layers className="w-8 h-8 opacity-50" /><p>No previous submissions found.</p></div>}
                        </div>
                        <div className="p-4 border-t border-border bg-secondary/5 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Terminal className="w-3 h-3" /><span>Console Ready</span></div>
                            <div className="flex gap-3">
                                <Button variant="secondary" size="sm" className="h-8 text-xs">Run Code</Button>
                                <Button onClick={handleRun} disabled={status === "RUNNING"} size="sm" className={cn("h-8 text-xs gap-2 min-w-[100px]", status === "SUCCESS" ? "bg-green-600 hover:bg-green-700" : "")}>
                                    {status === "RUNNING" ? <>Running...</> : status === "SUCCESS" ? <><Check className="w-3 h-3" /> Passed</> : <><Play className="w-3 h-3" /> Submit</>}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block w-80 space-y-4">
                    <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4 text-primary"><Trophy className="w-4 h-4" /><h4 className="font-bold font-space-grotesk uppercase">Top Solvers</h4></div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3"><span className={cn("font-mono w-4", i <= 3 ? "text-yellow-500" : "text-muted-foreground")}>#{i}</span><span className="text-muted-foreground">User_{9000 + i}</span></div>
                                    <span className="font-mono text-primary text-xs">0.0{i}s</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showLeaderboardModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-card border border-primary/50 shadow-tech w-full max-w-md p-8 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" />
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/50"><Trophy className="w-8 h-8 text-primary" /></div>
                                <h3 className="text-2xl font-bold font-space-grotesk text-foreground">Challenge Conquered!</h3>
                                <p className="text-muted-foreground mt-2">All test cases passed successfully.</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase mb-1 block">Enter Callsign</label>
                                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full bg-secondary/20 border border-border rounded px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-mono" placeholder="Enter your name..." />
                                </div>
                                <Button className="w-full font-bold" onClick={() => setShowLeaderboardModal(false)}>Claim Victory</Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionShell>
    )
}

function ProblemPanel() {
    return (
        <div className="h-full flex flex-col bg-card/30 backdrop-blur-sm border border-white/5 overflow-hidden rounded-lg mb-4">
            <div className="p-6 border-b border-white/5">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold font-space-grotesk text-white">1. Climbing Stairs</h2>
                    <div className="flex gap-2"><Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/10">Easy</Badge></div>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <button className="flex items-center gap-1 hover:text-white transition-colors"><ThumbsUp className="w-4 h-4" /> 12.5K</button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors"><ThumbsDown className="w-4 h-4" /> 234</button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors"><Star className="w-4 h-4" /> Add to List</button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors ml-auto"><Share2 className="w-4 h-4" /> Share</button>
                </div>
            </div>
            <div className="p-6 space-y-6">
                <div className="prose prose-invert max-w-none">
                    <p>You are climbing a staircase. It takes <code>n</code> steps to reach the top. Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?</p>
                </div>
                <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">Example 1</h3>
                        <div className="font-mono text-sm space-y-2">
                            <div><span className="text-blue-400">Input:</span> n = 2</div>
                            <div><span className="text-blue-400">Output:</span> 2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

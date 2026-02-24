"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const FAQs = [
    {
        question: "Who can join the GFG Student Chapter?",
        answer: "Any student from ITER, regardless of their branch or year, with a passion for coding and technology can join. We welcome beginners and experts alike."
    },
    {
        question: "What events do you organize?",
        answer: "We organize a wide range of events including coding contests like 'CodeCombat', technical workshops on Web Dev, AI/ML, hackathons, and guest lectures from industry experts."
    },
    {
        question: "How can I become a core team member?",
        answer: "We open recruitment drives annually. Keep an eye on our social media channels for announcements. Selection is based on skills, dedication, and passion."
    },
    {
        question: "Is there a membership fee?",
        answer: "No, joining the community is completely free. We believe in open knowledge sharing and accessible education for everyone."
    },
    {
        question: "Do you provide certificates?",
        answer: "Yes, active participation in our workshops and winning contests will earn you certificates and sometimes cool swags!"
    }
]

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="relative py-[6vh] bg-background overflow-hidden min-h-screen flex items-center" id="faq">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute -left-40 top-1/2 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto relative z-10 px-6 w-full max-w-4xl">
                <div className="text-center mb-[4vh] space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk tracking-tight">
                        Frequent Queries
                    </h2>
                    <p className="text-muted-foreground">Everything you need to know about the chapter.</p>
                </div>

                <div className="space-y-4">
                    {FAQs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`border ${openIndex === idx ? 'border-primary/50 bg-primary/5' : 'border-white/5 bg-white/5'} rounded-lg overflow-hidden transition-colors duration-300`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`font-space-grotesk font-bold text-base md:text-lg ${openIndex === idx ? 'text-primary' : 'text-foreground'}`}>
                                    {faq.question}
                                </span>
                                <span className={`p-1 rounded-full border ${openIndex === idx ? 'border-primary text-primary' : 'border-white/20 text-muted-foreground'}`}>
                                    {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-dashed border-white/10 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

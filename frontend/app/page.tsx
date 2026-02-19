import { Navbar, Footer } from "@/components/layout/navigation"

import { HeroSection } from "@/components/features/HeroSection"
import { AboutSection } from "@/components/features/AboutSection"
import { TracksSection } from "@/components/features/TracksSection"
import { EventsSection } from "@/components/features/EventsSection"

import { TeamSection } from "@/components/features/TeamSection"
import { WelcomeSplash, StatsSection, MarqueeSection } from "@/components/features/misc-sections"

import { NetworkBackground } from "@/components/ui/effects"
import { FAQSection } from "@/components/features/FAQSection"
import { EvolutionTimeline } from "@/components/features/EvolutionTimeline"
import { BentoSection } from "@/components/features/BentoSection"
import { FadeIn } from "@/components/ui/interacts"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Global Background Systems */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NetworkBackground />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,black)] opacity-80" />
      </div>

      <div className="relative z-10 flex flex-col">
        <WelcomeSplash />
        <Navbar />

        <HeroSection />

        <FadeIn delay={0.2}><MarqueeSection /></FadeIn>

        <FadeIn delay={0.3}><AboutSection /></FadeIn>

        <FadeIn delay={0.4}><StatsSection /></FadeIn>

        <FadeIn delay={0.2}><BentoSection /></FadeIn>

        <FadeIn delay={0.2}><TracksSection /></FadeIn>

        <FadeIn delay={0.2}><EvolutionTimeline /></FadeIn>


        <EventsSection />

        <FadeIn delay={0.2}><TeamSection /></FadeIn>



        <FadeIn delay={0.2}><FAQSection /></FadeIn>

        <Footer />
      </div>
    </div>
  )
}


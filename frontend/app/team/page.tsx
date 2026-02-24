import { TeamSection } from "@/components/features/TeamSection"

export const metadata = {
    title: "Our Team | GFG",
    description: "Meet the core intelligence behind GFG.",
}

export default function TeamPage() {
    return (
        <main className="pt-20">
            <TeamSection />
        </main>
    )
}

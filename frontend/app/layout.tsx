import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/ui/page-transition";
import { CommandPalette, MouseFollower, ScrollProgress, SmoothScroll } from "@/components/ui/interacts";
import { NoiseOverlay } from "@/components/ui/effects";

// Quantum-Digital Typography
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://gfg-official.github.io/GFG_OFFICIAL-Website/"),
  title: {
    default: "GFG Student Chapter | ITER",
    template: "%s | GFG SC ITER"
  },
  description: "The official GeeksforGeeks Student Chapter at ITER. Join a community of developers, master DSA, and build the future.",
  keywords: ["GFG", "ITER", "Student Chapter", "Coding", "DSA", "Web Development", "Community"],
  openGraph: {
    title: "GFG Student Chapter | ITER",
    description: "Join the premier student developer community at ITER. Master DSA, crack interviews, and ship open-source projects.",
    url: "https://gfg-iter.vercel.app",
    siteName: "GFG Student Chapter ITER",
    images: [
      {
        url: `${basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GFG Student Chapter ITER"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: `${basePath}/gfg-official-logo.png`,
    shortcut: `${basePath}/gfg-official-logo.png`,
    apple: `${basePath}/gfg-official-logo.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans selection:bg-green-500/30 selection:text-green-200`}
      >
        <SmoothScroll />
        <MouseFollower />
        <ScrollProgress />
        <NoiseOverlay />
        <CommandPalette />
        <PageTransition>{children}</PageTransition>
        <Toaster />
      </body>
    </html>
  );
}

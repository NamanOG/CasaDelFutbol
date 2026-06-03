import type { Metadata } from "next"
import { Bebas_Neue, Inter, Playfair_Display, Oswald, Rajdhani } from "next/font/google"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { PageTransition } from "@/components/layout/PageTransition"
import { SmoothScroll } from "@/components/motion/SmoothScroll"
import { ThemeProvider } from "@/components/ThemeContext"
import "@/styles/globals.css"

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Casa del Fútbol — The Beautiful Game, Beautifully Told",
    template: "%s | Casa del Fútbol",
  },
  description:
    "A premium football universe. Explore nations, leagues, trophies, clubs, and test your knowledge in the Quiz Lab. Football for everyone.",
  keywords: [
    "football",
    "soccer",
    "world cup",
    "champions league",
    "premier league",
    "football quiz",
    "football history",
    "nations",
    "leagues",
    "trophies",
  ],
  openGraph: {
    title: "Casa del Fútbol — The Beautiful Game, Beautifully Told",
    description:
      "A premium football universe for fans of every level. Explore, learn, and play.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa del Fútbol — The Beautiful Game, Beautifully Told",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${bebasNeue.variable} ${inter.variable} ${playfair.variable} ${oswald.variable} ${rajdhani.variable} font-body antialiased bg-canvas text-primary`}>
        <ThemeProvider>
          <SmoothScroll />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { nations, continents } from "@/lib/data/nations"
import { TextReveal } from "@/components/motion/TextReveal"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp"
import { ScrollParallax } from "@/components/motion/ScrollParallax"
import { Globe, Star, ArrowRight } from "lucide-react"
import { HoverCard } from "@/components/motion/HoverCard"
import { ShaderBackground } from "@/components/motion/ShaderBackground"

const heroVideo = "https://videos.pexels.com/video-files/3204121/3204121-uhd_2560_1440_25fps.mp4"

export default function NationsPage() {
  const [selectedContinent, setSelectedContinent] = useState<string>("All")

  const filteredNations = useMemo(() => {
    if (selectedContinent === "All") return nations
    return nations.filter((n) => n.continent === selectedContinent)
  }, [selectedContinent])

  return (
    <main className="min-h-screen bg-canvas text-text relative overflow-hidden">
      <ShaderBackground />
      <div className="bg-noise" />

      {/* ─── MASSIVE MEDIA HERO ─── */}
      <section className="premium-hero relative w-full overflow-hidden">
        <video 
          autoPlay loop muted playsInline 
          poster="https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=2560"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          suppressHydrationWarning
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 z-10">
          <div className="max-w-5xl">
            <FadeUp>
              <span className="eyebrow world-cup-eyebrow tracking-[0.3em] uppercase block mb-4">International Heritage</span>
            </FadeUp>
            <TextReveal tag="h1" className="font-display text-[clamp(4.5rem,8vw,7.5rem)] uppercase leading-[0.8] tracking-tighter text-white">
              Global Identities
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl border-l-4 world-cup-line pl-6 leading-relaxed font-body italic">
                Style, history, and tactical DNA. Each nation turns the same game into a different language. Discover the cultures that define international football.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── CONTINENT FILTER ─── */}
      <section className="sticky top-0 z-40 bg-canvas/80 backdrop-blur-xl border-b border-hairline py-4">
        <div className="container">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
            {continents.map((option) => {
              const isActive = selectedContinent === option
              return (
                <button
                  key={option}
                  onClick={() => setSelectedContinent(option)}
                  className={`
                    whitespace-nowrap px-6 py-3 text-sm font-display uppercase tracking-widest rounded-lg
                    transition-all duration-300 cursor-pointer border
                    ${isActive
                      ? "bg-text text-canvas border-text shadow-[0_14px_28px_-22px_var(--color-primary-blue)]"
                      : "bg-surface/80 text-text-muted border-hairline hover:bg-surface-elevated hover:text-text"
                    }
                  `}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL MASONRY GRID ─── */}
      <section className="section-padding bg-canvas/40 min-h-screen relative z-10">
        <div className="container">
          <FadeUp>
            <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-12 border-b border-hairline pb-4">
              Showing {filteredNations.length} nation{filteredNations.length !== 1 ? "s" : ""}
            </p>
          </FadeUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedContinent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {filteredNations.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(420px,auto)]">
                  {filteredNations.map((nation, index) => {
                    const isFeatured = index === 0

                    return (
                      <StaggerItem key={nation.slug} className={isFeatured ? "md:col-span-2 md:row-span-2 min-h-[480px] md:min-h-auto" : "h-full"}>
                        <HoverCard className="h-full w-full">
                          <Link href={`/nations/${nation.slug}`} className="block h-full group">
                            <article className="premium-media-card relative group h-full flex flex-col justify-end min-h-[420px]">
                              {/* Edge-to-Edge Image */}
                              <div className="absolute inset-0 bg-black">
                                <img
                                  src={nation.heroImage}
                                  alt={`${nation.name} football`}
                                  className="image-lift w-full h-full object-cover opacity-72 group-hover:opacity-90"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                              </div>

                              <div className={`relative z-10 p-8 flex flex-col h-full justify-between ${isFeatured ? "md:p-12" : ""}`}>
                                <div className="flex justify-between items-start w-full">
                                  <span className="inline-block px-3 py-1 font-mono text-xs uppercase tracking-widest text-canvas bg-white/95 backdrop-blur-md rounded-md">
                                    {nation.continent}
                                  </span>
                                  <div className="flex items-center gap-1 text-primary-gold">
                                    {Array.from({ length: Math.min(nation.worldCupWins, 5) }).map((_, i) => (
                                      <Star key={i} size={isFeatured ? 16 : 14} fill="currentColor" />
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-20">
                                  <h3 className={`font-display uppercase tracking-tight text-white leading-none group-hover:text-accent transition-colors ${isFeatured ? "text-5xl md:text-7xl" : "text-3xl"}`}>
                                    {nation.name}
                                  </h3>
                                  
                                  <p className={`mt-4 text-white/80 font-body italic ${isFeatured ? "text-lg md:text-xl max-w-xl" : "text-sm line-clamp-3"}`}>
                                    {nation.shortDescription}
                                  </p>
                                  
                                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                                    <div className="grid grid-cols-2 divide-x divide-white/10 bg-black/25 border border-white/10 rounded-xl overflow-hidden text-left flex-1 mr-4">
                                      <div className="p-3">
                                        <p className="font-mono text-white text-lg font-bold leading-none">{nation.worldCupWins}</p>
                                        <p className="text-[8px] text-white/45 uppercase tracking-widest font-mono mt-1.5 font-semibold">WC Wins</p>
                                      </div>
                                      <div className="p-3 flex flex-col justify-center">
                                        <p className="font-mono text-white text-lg font-bold leading-none flex items-center gap-1">
                                          <Globe size={11} className="text-accent" /> {nation.filaRanking}
                                        </p>
                                        <p className="text-[8px] text-white/45 uppercase tracking-widest font-mono mt-1.5 font-semibold">Global Rank</p>
                                      </div>
                                    </div>
                                    <ArrowRight size={20} className="text-white/40 group-hover:text-accent group-hover:translate-x-2 transition-all shrink-0" />
                                  </div>
                                </div>
                              </div>
                            </article>
                          </Link>
                        </HoverCard>
                      </StaggerItem>
                    )
                  })}
                </StaggerContainer>
              ) : (
                <FadeUp>
                  <div className="premium-soft-panel flex flex-col items-center justify-center py-32 px-6">
                    <p className="font-display text-4xl uppercase tracking-wider text-text-muted mb-4">Empty Archive</p>
                    <p className="text-text-body font-body italic text-xl max-w-sm text-center">
                      No nations match the selected continent.
                    </p>
                    <button onClick={() => setSelectedContinent("All")} className="btn-secondary mt-8">
                      Reset Filter
                    </button>
                  </div>
                </FadeUp>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

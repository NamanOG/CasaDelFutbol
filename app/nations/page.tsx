"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { nations, continents } from "@/lib/data/nations"
import { TextReveal } from "@/components/motion/TextReveal"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp"
import { ScrollParallax } from "@/components/motion/ScrollParallax"
import { Globe, Star, ArrowRight } from "lucide-react"

const heroVideo = "https://videos.pexels.com/video-files/3204121/3204121-uhd_2560_1440_25fps.mp4"

export default function NationsPage() {
  const [selectedContinent, setSelectedContinent] = useState<string>("All")

  const filteredNations = useMemo(() => {
    if (selectedContinent === "All") return nations
    return nations.filter((n) => n.continent === selectedContinent)
  }, [selectedContinent])

  return (
    <main className="min-h-screen bg-canvas text-text">
      {/* ─── MASSIVE MEDIA HERO ─── */}
      <section className="relative w-full h-[70dvh] overflow-hidden bg-black border-b border-hairline">
        <video 
          autoPlay loop muted playsInline 
          poster="https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=2560"
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
          suppressHydrationWarning
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 z-10">
          <div className="max-w-5xl">
            <FadeUp>
              <span className="eyebrow text-accent tracking-[0.3em] uppercase block mb-4">International Heritage</span>
            </FadeUp>
            <TextReveal tag="h1" className="font-display text-[clamp(4rem,8vw,7rem)] uppercase leading-[0.85] tracking-tight text-white">
              Global Identities
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="mt-6 text-xl md:text-2xl font-editorial italic text-white/90 max-w-2xl border-l-4 border-accent pl-6">
                Style, history, and identity. Each nation turns the same game into a different language. Discover the cultures that define international football.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── CONTINENT FILTER ─── */}
      <section className="sticky top-0 z-40 bg-canvas/80 backdrop-blur-xl border-b border-hairline py-4">
        <div className="container">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
            {["All", ...continents].map((option) => {
              const isActive = selectedContinent === option
              return (
                <button
                  key={option}
                  onClick={() => setSelectedContinent(option)}
                  className={`
                    whitespace-nowrap px-6 py-3 text-sm font-display uppercase tracking-widest
                    transition-all duration-300 cursor-pointer
                    ${isActive
                      ? "bg-text text-canvas"
                      : "bg-surface text-text-muted hover:bg-surface-elevated hover:text-text"
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
      <section className="section-padding bg-canvas min-h-screen">
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
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 lg:gap-6 auto-rows-[minmax(400px,auto)]">
                  {filteredNations.map((nation, index) => {
                    // Feature the first item heavily in the grid
                    const isFeatured = index === 0

                    return (
                      <StaggerItem key={nation.slug} className={isFeatured ? "md:col-span-2 md:row-span-2 h-[600px] md:h-auto" : "h-full"}>
                        <Link href={`/nations/${nation.slug}`} className="block h-full group">
                          <article className="relative overflow-hidden group h-full flex flex-col aspect-square md:aspect-auto">
                            {/* Dynamic Edge-to-Edge Image */}
                            <div className="absolute inset-0 bg-black">
                              <img
                                src={nation.heroImage}
                                alt={`${nation.name} football`}
                                className="w-full h-full object-cover opacity-70 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            <div className={`relative z-10 p-8 flex flex-col h-full justify-end ${isFeatured ? "md:p-16" : ""}`}>
                              <div className="mb-auto flex justify-between items-start">
                                <span className="inline-block px-4 py-2 font-mono text-xs uppercase tracking-widest text-canvas bg-white backdrop-blur-md">
                                  {nation.continent}
                                </span>
                                <div className="flex items-center gap-1 text-accent">
                                  {Array.from({ length: Math.min(nation.worldCupWins, 5) }).map((_, i) => (
                                    <Star key={i} size={isFeatured ? 16 : 14} fill="currentColor" />
                                  ))}
                                </div>
                              </div>

                              <div className="mt-8">
                                <h3 className={`font-display uppercase tracking-tight text-white leading-none ${isFeatured ? "text-6xl md:text-8xl" : "text-4xl"}`}>
                                  {nation.name}
                                </h3>
                                
                                <p className={`mt-4 text-white/80 font-editorial italic ${isFeatured ? "text-xl md:text-2xl max-w-lg" : "text-base line-clamp-3"}`}>
                                  {nation.shortDescription}
                                </p>
                                
                                <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/20">
                                  <div className="flex items-center gap-6">
                                    <div className="flex flex-col">
                                      <p className="font-mono text-white text-xl">{nation.worldCupWins}</p>
                                      <p className="text-[10px] text-white/50 uppercase tracking-widest">WC Wins</p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="font-mono text-white text-xl flex items-center gap-1"><Globe size={14} className="text-accent" /> {nation.filaRanking}</p>
                                      <p className="text-[10px] text-white/50 uppercase tracking-widest">Global Rank</p>
                                    </div>
                                  </div>
                                  <ArrowRight size={24} className="text-white/50 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                                </div>
                              </div>
                            </div>
                          </article>
                        </Link>
                      </StaggerItem>
                    )
                  })}
                </StaggerContainer>
              ) : (
                <FadeUp>
                  <div className="flex flex-col items-center justify-center py-32 border border-hairline bg-surface">
                    <p className="font-display text-4xl uppercase tracking-wider text-text-muted mb-4">Empty Archive</p>
                    <p className="text-text-body font-editorial italic text-xl max-w-sm text-center">
                      No nations match the selected continent.
                    </p>
                    <button onClick={() => setSelectedContinent("All")} className="btn-ghost mt-8 border-text text-text">
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

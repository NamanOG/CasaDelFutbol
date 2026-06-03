"use client"

import { Crown, Sparkles, Trophy as TrophyIcon, Star } from "lucide-react"
import { motion } from "framer-motion"
import { trophies } from "@/lib/data/trophies"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp"
import { TextReveal } from "@/components/motion/TextReveal"
import { ScrollParallax } from "@/components/motion/ScrollParallax"
import { ShaderBackground } from "@/components/motion/ShaderBackground"
import { HoverCard } from "@/components/motion/HoverCard"

const heroVideo = "https://videos.pexels.com/video-files/4006297/4006297-uhd_2560_1440_25fps.mp4"

export default function TrophiesPage() {
  const worldCup = trophies[0]

  return (
    <main className="min-h-screen bg-canvas text-text relative overflow-hidden">
      <ShaderBackground />
      <div className="bg-noise" />
      <div className="scanlines animate-pulse" />

      {/* ─── MASSIVE MEDIA HERO ─── */}
      <section className="relative w-full h-[65dvh] overflow-hidden bg-black border-b border-hairline">
        <video 
          autoPlay loop muted playsInline 
          poster={worldCup.ceremonyImage}
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale filter contrast-125"
          suppressHydrationWarning
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 z-10">
          <div className="max-w-5xl">
            <FadeUp>
              <span className="eyebrow text-accent tracking-[0.3em] uppercase block mb-4">The Hardware</span>
            </FadeUp>
            <TextReveal tag="h1" className="font-display text-[clamp(4.5rem,8vw,7.5rem)] uppercase leading-[0.8] tracking-tighter text-white">
              Trophy Room
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="mt-6 text-xl md:text-2xl font-editorial italic text-white/90 max-w-2xl border-l-4 border-accent pl-6 leading-relaxed">
                Trophies are football's memory objects. They turn a season, a month, or one night into something supporters carry for life.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── FEATURED: WORLD CUP ─── */}
      <section className="section-padding bg-canvas/30 border-b border-hairline relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[150vw] text-[20vw] font-display text-surface leading-none opacity-20 select-none whitespace-nowrap pointer-events-none z-0">
          IMMORTALITY
        </div>

        <div className="container grid gap-12 lg:grid-cols-2 lg:items-stretch relative z-10">
          <FadeUp className="h-full">
            <div className="relative w-full h-full min-h-[420px] overflow-hidden border border-accent/20 shadow-[0_0_35px_rgba(204,255,0,0.1)]">
              <img
                src={worldCup.ceremonyImage}
                alt="World Cup trophy celebration"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 transition-all duration-[1.5s] hover:grayscale-0 hover:scale-102"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="bg-accent text-canvas font-mono text-xs uppercase tracking-widest px-3 py-1 mb-4 inline-block font-bold">Current Holder</span>
                <p className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white drop-shadow-md">
                  {worldCup.currentHolder}
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15} className="h-full">
            <article className="h-full flex flex-col justify-center p-8 md:p-12 border border-hairline bg-surface/80 backdrop-blur-md">
              <Crown className="text-accent drop-shadow-[0_0_10px_var(--color-accent)]" size={48} />
              <h2 className="mt-8 font-display text-5xl md:text-6xl uppercase tracking-tight text-white">{worldCup.name}</h2>
              <p className="mt-6 text-xl font-editorial italic text-text-body leading-relaxed">{worldCup.whyItMatters}</p>
              
              <div className="mt-12">
                <p className="text-xs uppercase tracking-widest text-text-muted mb-4 font-mono font-bold">Iconic Winners</p>
                <div className="flex flex-wrap gap-3">
                  {worldCup.famousWinners.map((winner) => (
                    <span
                      key={winner}
                      className="border border-white/10 px-4 py-2 text-sm font-display uppercase tracking-wider text-text bg-canvas/60 backdrop-blur-xs hover:border-accent hover:text-accent transition-colors"
                    >
                      {winner}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </FadeUp>
        </div>
      </section>

      {/* ─── TROPHY GRID ─── */}
      <section className="section-padding bg-canvas/10 min-h-screen relative z-10">
        <div className="container">
          <FadeUp>
            <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-12 border-b border-hairline pb-4">
              Prestige by competition
            </p>
          </FadeUp>

          <StaggerContainer className="grid gap-8 md:grid-cols-2">
            {trophies.map((trophy, index) => {
              if (index === 0) return null // Skip world cup

              const isUCL = trophy.slug === "uefa-champions-league"

              return (
                <StaggerItem key={trophy.slug}>
                  <HoverCard className="h-full w-full">
                    <article className={`relative h-full overflow-hidden flex flex-col border bg-surface hover:border-accent/40 transition-colors duration-500 ${
                      isUCL ? 'border-cyan/20 shadow-[0_0_20px_rgba(0,229,255,0.05)]' : 'border-hairline'
                    }`}>
                      {/* Dynamic Image Header */}
                      <div className="relative overflow-hidden aspect-[21/9] bg-black">
                        <img
                          src={trophy.ceremonyImage}
                          alt={`${trophy.name} celebration`}
                          className="w-full h-full object-cover opacity-60 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-90"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                        
                        <div className="absolute top-4 right-4 bg-canvas/80 backdrop-blur-xs border border-white/10 text-text font-mono text-xs uppercase tracking-widest px-3 py-1">
                          Est. {trophy.founded}
                        </div>

                        <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                          <div className="flex gap-1 text-accent drop-shadow-[0_0_8px_var(--color-accent)]">
                            {Array.from({ length: trophy.prestige }).map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                          <TrophyIcon size={22} className="text-white/80 drop-shadow-md" />
                        </div>
                      </div>

                      <div className="p-8 flex flex-col flex-1 relative z-10">
                        <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-white">
                          {trophy.name}
                        </h3>
                        <p className="mt-4 font-editorial italic text-lg text-text-body leading-relaxed flex-1">
                          "{trophy.description}"
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 border-t border-hairline pt-6">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1 font-mono">Current Holder</p>
                            <p className="font-display text-xl uppercase text-white">{trophy.currentHolder}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1 font-mono">Rhythm</p>
                            <p className="text-sm font-bold text-white/90">{trophy.frequency}</p>
                          </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 text-sm text-white/80 border-t border-hairline pt-6">
                          <Sparkles size={16} className="text-accent shrink-0 mt-0.5" />
                          <span className="font-editorial italic">"{trophy.iconicMoments[0]}"</span>
                        </div>
                      </div>
                    </article>
                  </HoverCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>
    </main>
  )
}

"use client"

import { Crown, Sparkles, Trophy as TrophyIcon } from "lucide-react"
import { motion } from "framer-motion"
import { trophies } from "@/lib/data/trophies"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp"
import { TextReveal } from "@/components/motion/TextReveal"
import { ScrollParallax } from "@/components/motion/ScrollParallax"

const heroVideo = "https://videos.pexels.com/video-files/4006297/4006297-uhd_2560_1440_25fps.mp4"

export default function TrophiesPage() {
  const worldCup = trophies[0]

  return (
    <main className="min-h-screen bg-canvas text-text">
      {/* ─── MASSIVE MEDIA HERO ─── */}
      <section className="relative w-full h-[70dvh] overflow-hidden bg-black border-b border-hairline">
        <video 
          autoPlay loop muted playsInline 
          poster={worldCup.ceremonyImage}
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
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
            <TextReveal tag="h1" className="font-display text-[clamp(4rem,8vw,7rem)] uppercase leading-[0.85] tracking-tight text-white">
              Trophy Room
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="mt-6 text-xl md:text-2xl font-editorial italic text-white/90 max-w-2xl border-l-4 border-accent pl-6">
                Trophies are football's memory objects. They turn a season, a month, or one night into something supporters carry for life.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── FEATURED: WORLD CUP ─── */}
      <section className="section-padding bg-canvas border-b border-hairline relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[150vw] text-[20vw] font-display text-surface leading-none opacity-50 select-none whitespace-nowrap pointer-events-none z-0">
          IMMORTALITY
        </div>

        <div className="container grid gap-12 lg:grid-cols-2 lg:items-stretch relative z-10">
          <FadeUp className="h-full">
            <div className="relative w-full h-full min-h-[500px] overflow-hidden">
              <img
                src={worldCup.ceremonyImage}
                alt="World Cup trophy celebration"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="bg-white text-black font-mono text-xs uppercase tracking-widest px-3 py-1 mb-4 inline-block">Current Holder</span>
                <p className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white">
                  {worldCup.currentHolder}
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15} className="h-full">
            <article className="h-full flex flex-col justify-center p-8 md:p-12 border border-hairline bg-surface/80 backdrop-blur-md">
              <Crown className="text-accent" size={48} />
              <h2 className="mt-8 font-display text-6xl uppercase tracking-tight">{worldCup.name}</h2>
              <p className="mt-6 text-xl font-editorial italic text-text-body leading-relaxed">{worldCup.whyItMatters}</p>
              
              <div className="mt-12">
                <p className="text-xs uppercase tracking-widest text-text-muted mb-4 font-bold">Iconic Winners</p>
                <div className="flex flex-wrap gap-3">
                  {worldCup.famousWinners.map((winner) => (
                    <span
                      key={winner}
                      className="border px-4 py-2 text-sm font-display uppercase tracking-wider text-text bg-canvas"
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
      <section className="section-padding bg-canvas min-h-screen">
        <div className="container">
          <FadeUp>
            <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-12 border-b border-hairline pb-4">
              Prestige by competition
            </p>
          </FadeUp>

          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {trophies.map((trophy, index) => {
              if (index === 0) return null // Skip world cup

              return (
                <StaggerItem key={trophy.slug}>
                  <article className="relative h-full overflow-hidden group flex flex-col border border-hairline bg-surface hover:border-text transition-colors">
                    {/* Dynamic Image Header */}
                    <div className="relative overflow-hidden aspect-[21/9] bg-black">
                      <img
                        src={trophy.ceremonyImage}
                        alt={`${trophy.name} celebration`}
                        className="w-full h-full object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                      
                      <div className="absolute top-4 right-4 bg-canvas text-text font-mono text-xs uppercase tracking-widest px-3 py-1">
                        Est. {trophy.founded}
                      </div>

                      <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                        <div className="flex gap-1 text-accent">
                          {Array.from({ length: trophy.prestige }).map((_, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ type: "spring", delay: i * 0.08 }}
                            >
                              ★
                            </motion.span>
                          ))}
                        </div>
                        <TrophyIcon size={24} className="text-white drop-shadow-md" />
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1 relative z-10">
                      <h3 className="font-display text-4xl uppercase tracking-tight group-hover:text-accent transition-colors">
                        {trophy.name}
                      </h3>
                      <p className="mt-4 font-editorial italic text-lg text-text-body leading-relaxed flex-1">
                        "{trophy.description}"
                      </p>

                      <div className="mt-8 grid gap-4 sm:grid-cols-2 border-t border-hairline pt-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Current Holder</p>
                          <p className="font-display text-xl uppercase text-text">{trophy.currentHolder}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Rhythm</p>
                          <p className="text-sm font-bold text-text">{trophy.frequency}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-start gap-3 text-sm text-text border-t border-hairline pt-6">
                        <Sparkles size={16} className="text-accent shrink-0 mt-0.5" />
                        <span className="font-editorial italic">"{trophy.iconicMoments[0]}"</span>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>
    </main>
  )
}

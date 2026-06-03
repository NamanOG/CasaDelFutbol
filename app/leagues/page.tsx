"use client"

import { ArrowRight, MapPin, Users, Radio, Globe } from "lucide-react"
import { leagues } from "@/lib/data/leagues"
import { CountUp } from "@/components/motion/CountUp"
import { FadeUp } from "@/components/motion/FadeUp"
import { TextReveal } from "@/components/motion/TextReveal"
import { ScrollParallax } from "@/components/motion/ScrollParallax"
import { ShaderBackground } from "@/components/motion/ShaderBackground"
import { HoverCard } from "@/components/motion/HoverCard"

function viewers(label: string) {
  const match = label.match(/([\d.]+)\s*(billion|million)/i)
  if (!match) return 0
  return match[2].toLowerCase() === "million" ? Math.round(Number(match[1]) / 100) / 10 : Math.round(Number(match[1]))
}

const leagueHeroImage = "https://images.pexels.com/photos/30651230/pexels-photo-30651230.jpeg?auto=compress&cs=tinysrgb&w=2560"

export default function LeaguesPage() {
  return (
    <main className="min-h-screen bg-canvas text-text relative overflow-hidden">
      <ShaderBackground />
      <div className="bg-noise" />
      <div className="scanlines animate-pulse" />

      {/* ─── MASSIVE MEDIA HERO ─── */}
      <section className="relative w-full h-[65dvh] overflow-hidden bg-black border-b border-hairline">
        <ScrollParallax className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img
            src={leagueHeroImage}
            alt="Stadium atmosphere"
            className="w-full h-full object-cover opacity-50 grayscale filter contrast-125"
            loading="eager"
          />
        </ScrollParallax>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 z-10">
          <div className="max-w-5xl">
            <FadeUp>
              <span className="eyebrow text-accent tracking-[0.3em] uppercase block mb-4">The Atlas</span>
            </FadeUp>
            <TextReveal tag="h1" className="font-display text-[clamp(4.5rem,8vw,7.5rem)] uppercase leading-[0.8] tracking-tighter text-white">
              Global Rhythms
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="mt-6 text-xl md:text-2xl font-editorial italic text-white/90 max-w-2xl border-l-4 border-accent pl-6 leading-relaxed">
                Every league teaches a different version of football: English tempo, Spanish craft, German pressing, Italian structure.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── IMMERSIVE LEAGUE STACK ─── */}
      <div className="relative z-10">
        {leagues.map((league, index) => (
          <section key={league.slug} className="relative w-full min-h-[90dvh] overflow-hidden border-b border-hairline flex items-center group">
            
            {/* Edge-to-edge Background Image */}
            <div className="absolute inset-0 bg-black">
              <ScrollParallax className="w-full h-[120%] -top-[10%]">
                <img
                  src={league.stadiumImage}
                  alt={`${league.name} stadium`}
                  className="w-full h-full object-cover opacity-40 grayscale transition-all duration-[2s] group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-60"
                  loading="lazy"
                />
              </ScrollParallax>
              {/* Dynamic gradient based on league color */}
              <div 
                className="absolute inset-0 mix-blend-multiply opacity-70 transition-opacity duration-700 group-hover:opacity-90" 
                style={{ background: `linear-gradient(to right, ${league.accentColor} 0%, transparent 100%)` }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/45 to-transparent md:bg-gradient-to-r md:from-canvas md:via-canvas/80 md:to-transparent" />
            </div>

            {/* Content Container */}
            <div className="container relative z-10 py-20 md:py-32 flex flex-col justify-center h-full">
              <div className="max-w-3xl">
                <FadeUp>
                  <div className="flex items-center gap-6 mb-8">
                    <img
                      src={league.logoUrl}
                      alt={`${league.name} logo`}
                      className="h-16 w-auto object-contain drop-shadow-xl filter brightness-0 invert"
                      loading="lazy"
                    />
                    <span 
                      className="px-4 py-2 font-mono text-sm uppercase tracking-widest text-canvas border backdrop-blur-md hidden sm:inline-block font-bold"
                      style={{ backgroundColor: league.accentColor, borderColor: `${league.accentColor}40` }}
                    >
                      {league.country}
                    </span>
                  </div>
                </FadeUp>

                <TextReveal tag="h2" className="font-display text-[clamp(3.5rem,6vw,5.5rem)] uppercase leading-none tracking-tight text-white mb-6">
                  {league.name}
                </TextReveal>

                <FadeUp delay={0.2}>
                  <p className="text-xl md:text-2xl font-editorial italic text-white/90 leading-relaxed max-w-2xl border-l-2 pl-4 border-white/20">
                    "{league.identity}"
                  </p>
                </FadeUp>

                {/* Statistics Box */}
                <FadeUp delay={0.3}>
                  <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/10 bg-black/10 backdrop-blur-xs p-6">
                    <div className="flex flex-col">
                      <p className="font-mono text-white text-3xl font-bold mb-1">{league.teams}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-2">
                        <Users size={12} className="text-accent" /> Teams
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-mono text-white text-3xl font-bold mb-1">
                        <CountUp target={viewers(league.tvViewers)} suffix="B" />
                      </p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-2">
                        <Radio size={12} className="text-accent" /> Reach
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-mono text-white text-3xl font-bold mb-1">{league.founded}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={12} className="text-accent" /> Est
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-display text-white text-2xl font-bold mb-1 uppercase truncate" style={{ color: league.accentColor }}>
                        {league.currentChampion}
                      </p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={12} className="text-accent" /> Champion
                      </p>
                    </div>
                  </div>
                </FadeUp>

                {/* Famous Clubs List */}
                <FadeUp delay={0.4}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 self-center mr-2 font-mono">Institutions:</span>
                    {league.famousClubs.map((club) => (
                      <span 
                        key={club.name} 
                        className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-white border border-white/10 bg-white/5 backdrop-blur-xs hover:border-accent hover:text-accent transition-colors duration-300"
                      >
                        {club.name}
                      </span>
                    ))}
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

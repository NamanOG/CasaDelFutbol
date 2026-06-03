"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { FadeUp } from "@/components/motion/FadeUp"
import { Marquee } from "@/components/motion/Marquee"
import { ScrollParallax } from "@/components/motion/ScrollParallax"
import { TextReveal } from "@/components/motion/TextReveal"
import { getNationBySlug } from "@/lib/data/nations"
import { leagues } from "@/lib/data/leagues"
import { trophies } from "@/lib/data/trophies"

// High-quality vibrant imagery
const heroVideo = "https://videos.pexels.com/video-files/3180026/3180026-uhd_2560_1440_25fps.mp4" // Fallback to image if video fails
const heroImage = "https://images.pexels.com/photos/227517/pexels-photo-227517.jpeg?auto=compress&cs=tinysrgb&w=2560"
const featureImage = "https://images.pexels.com/photos/34649364/pexels-photo-34649364.jpeg?auto=compress&cs=tinysrgb&w=2560"
const aerialImage = "https://images.pexels.com/photos/31160100/pexels-photo-31160100.jpeg?auto=compress&cs=tinysrgb&w=1280"
const crowdImage = "https://images.pexels.com/photos/31744929/pexels-photo-31744929.jpeg?auto=compress&cs=tinysrgb&w=1280"
const stadiumImage = "https://images.pexels.com/photos/200986/pexels-photo-200986.jpeg?auto=compress&cs=tinysrgb&w=1280"
const trophyImage = "https://images.pexels.com/photos/7005685/pexels-photo-7005685.jpeg?auto=compress&cs=tinysrgb&w=1280"

const clubMarquee = [
  "Real Madrid", "Barcelona", "Manchester City", "Bayern Munich",
  "PSG", "Arsenal", "Juventus", "Liverpool", "Chelsea", "AC Milan"
]

const matchSignals = [
  { label: "Champions League", home: "RMA", away: "MCI", time: "20:00 CET", homeScore: "-", awayScore: "-", status: "UPCOMING" },
  { label: "Premier League", home: "ARS", away: "TOT", time: "17:30 GMT", homeScore: "2", awayScore: "1", status: "FT" },
  { label: "Serie A", home: "JUV", away: "INT", time: "20:45 CET", homeScore: "0", awayScore: "0", status: "LIVE 45'" },
]

const playerSpotlights = [
  { name: "The Finisher", role: "Striker", image: "https://images.pexels.com/photos/35180874/pexels-photo-35180874.jpeg?cs=srgb&w=800" },
  { name: "The Playmaker", role: "Midfielder", image: "https://images.pexels.com/photos/19799186/pexels-photo-19799186.jpeg?cs=srgb&w=800" },
  { name: "The Sprinter", role: "Winger", image: "https://images.pexels.com/photos/20089132/pexels-photo-20089132.jpeg?cs=srgb&w=800" },
  { name: "The Anchor", role: "Defender", image: "https://images.pexels.com/photos/17583382/pexels-photo-17583382.jpeg?cs=srgb&w=800" },
]

const nationSpotlights = ["brazil", "argentina", "germany", "japan", "morocco", "croatia"].map(slug => getNationBySlug(slug)!)

export default function Home() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <main className="bg-canvas text-text">
      {/* MASSIVE MEDIA HERO */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-black">
        <video 
          autoPlay loop muted playsInline 
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          suppressHydrationWarning
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 z-10">
          <div className="max-w-5xl">
            <TextReveal tag="h1" className="font-display text-[clamp(4rem,10vw,8rem)] uppercase leading-[0.85] tracking-tight text-white mix-blend-difference">
              The Beautiful Game
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="mt-6 text-xl md:text-2xl font-editorial italic text-white/90 max-w-2xl border-l-4 border-accent pl-6">
                Your premium portal to global football. Unfiltered emotion, stunning photography, and the stories that define the sport.
              </p>
            </FadeUp>
            <FadeUp delay={0.35}>
              <Link href="/guide" className="btn-primary mt-10 bg-white text-black hover:bg-accent hover:text-black">
                Explore The Archive <ArrowRight size={18} className="ml-3" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CLEAN MARQUEE */}
      <section className="py-8 bg-surface border-y border-hairline overflow-hidden">
        <Marquee items={clubMarquee.map(club => (
          <span key={club} className="font-display text-4xl uppercase tracking-tighter text-text-faint hover:text-accent transition-colors px-8">
            {club}
          </span>
        ))} />
      </section>

      {/* MINIMALIST SCOREBOARD */}
      <section className="section-padding container">
        <div className="flex justify-between items-end mb-12 border-b border-hairline pb-4">
          <h2 className="font-display text-4xl uppercase tracking-tight">Live & Upcoming</h2>
          <Link href="/leagues" className="text-sm font-bold uppercase tracking-widest hover:text-accent flex items-center gap-2">
            Full Fixtures <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {matchSignals.map((match) => (
            <div key={match.home} className="group cursor-pointer">
              <div className="flex justify-between text-xs font-bold text-text-muted mb-3 uppercase tracking-widest">
                <span>{match.label}</span>
                <span className={match.status.includes('LIVE') ? 'text-sale-red animate-pulse' : ''}>{match.status}</span>
              </div>
              <div className="bg-surface border border-hairline p-6 transition-all duration-300 group-hover:border-accent">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-display text-3xl">{match.home}</span>
                  <span className="font-display text-3xl font-bold bg-surface-elevated px-4 py-1 rounded-sm">{match.homeScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-display text-3xl">{match.away}</span>
                  <span className="font-display text-3xl font-bold bg-surface-elevated px-4 py-1 rounded-sm">{match.awayScore}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL NATIONS GRID */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] uppercase leading-none tracking-tight mb-6">
              Global <span className="text-text-muted italic font-editorial lowercase">Identities</span>
            </h2>
            <p className="text-xl text-text-body font-editorial">
              How nations translate their culture onto the pitch. Browse the tactical heritage of world football's biggest powers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nationSpotlights.map((nation, idx) => (
              <Link href={`/nations/${nation.slug}`} key={nation.slug} className={`group block overflow-hidden relative bg-canvas ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className={`relative w-full ${idx === 0 ? 'aspect-square md:aspect-[16/10]' : 'aspect-square'}`}>
                  <img 
                    src={idx % 2 === 0 ? crowdImage : stadiumImage} 
                    alt={nation.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-2 block">{nation.continent}</span>
                    <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white">{nation.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-BLEED FEATURE IMAGE */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <ScrollParallax className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img src={featureImage} alt="Feature" className="w-full h-full object-cover" />
        </ScrollParallax>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-6 block">In Focus</span>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] uppercase leading-none tracking-tight text-white mb-8">
            The Choreography of the Crowd
          </h2>
          <Link href="/guide" className="btn-primary bg-white text-black hover:bg-accent">
            Read The Editorial
          </Link>
        </div>
      </section>

      {/* PLAYER SPOTLIGHTS (CLEAN PORTRAITS) */}
      <section className="section-padding container">
        <h2 className="font-display text-5xl uppercase tracking-tight mb-12">The Archetypes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {playerSpotlights.map(player => (
            <div key={player.name} className="group relative aspect-[3/4] overflow-hidden bg-surface">
              <img 
                src={player.image} 
                alt={player.name}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-1 block">{player.role}</span>
                <h3 className="font-display text-3xl uppercase tracking-tight text-white">{player.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}

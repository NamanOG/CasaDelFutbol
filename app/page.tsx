"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Trophy, Star, Shield, HelpCircle, Activity, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import confetti from "canvas-confetti"
import { FadeUp } from "@/components/motion/FadeUp"
import { Marquee } from "@/components/motion/Marquee"
import { ScrollParallax } from "@/components/motion/ScrollParallax"
import { TextReveal } from "@/components/motion/TextReveal"
import { getNationBySlug } from "@/lib/data/nations"
import { HoverCard } from "@/components/motion/HoverCard"
import { ShaderBackground } from "@/components/motion/ShaderBackground"
import { fetchLiveMatches, MatchData } from "@/lib/api/football"

// Premium assets: Stitch MCP generated images + high quality sports video
const heroVideo = "https://videos.pexels.com/video-files/3180026/3180026-uhd_2560_1440_25fps.mp4"
const heroImage = "/images/hero_stadium_background_1780508090979.png"
const prestigeTrophyImage = "/images/world_cup_trophy_1780508105236.png"
const featureImage = "/images/crowd_choreography_1780508211495.png"

const clubMarquee = [
  "Real Madrid", "Barcelona", "Manchester City", "Bayern Munich",
  "PSG", "Arsenal", "Juventus", "Liverpool", "Chelsea", "AC Milan"
]

type PositionKey = "GK" | "DF" | "MF" | "FW"

const positionsData: Record<PositionKey, { role: string; name: string; image: string; desc: string; stats: { label: string; value: number }[]; highlight: string; pitchPos: { top: string; left: string } }> = {
  GK: {
    role: "Goalkeeper",
    name: "The Guardian",
    image: "https://images.pexels.com/photos/35180874/pexels-photo-35180874.jpeg?cs=srgb&w=800",
    desc: "The final line of defense. Demands unmatched reflexes, commanding physical presence, and instant tactical distribution.",
    stats: [
      { label: "Reflexes", value: 96 },
      { label: "Handling", value: 89 },
      { label: "Distribution", value: 84 }
    ],
    highlight: "Under the floodlights, goalkeeper saves define championships.",
    pitchPos: { top: "85%", left: "50%" }
  },
  DF: {
    role: "Defender",
    name: "The Anchor",
    image: "https://images.pexels.com/photos/17583382/pexels-photo-17583382.jpeg?cs=srgb&w=800",
    desc: "The manager of deep space. Dictates positioning, marshals physical duels, and spearheads ball progression from the back.",
    stats: [
      { label: "Tackling", value: 95 },
      { label: "Positioning", value: 92 },
      { label: "Strength", value: 90 }
    ],
    highlight: "Shatters opponent transition phases with clean physical authority.",
    pitchPos: { top: "65%", left: "50%" }
  },
  MF: {
    role: "Midfielder",
    name: "The Playmaker",
    image: "https://images.pexels.com/photos/19799186/pexels-photo-19799186.jpeg?cs=srgb&w=800",
    desc: "The engine and architect. Dominates the center circle with 360-degree spatial awareness and key passes that slice open deep defense.",
    stats: [
      { label: "Vision", value: 97 },
      { label: "Passing", value: 95 },
      { label: "Dribbling", value: 89 }
    ],
    highlight: "Controls the speed and rhythm of the game like a grandmaster.",
    pitchPos: { top: "45%", left: "50%" }
  },
  FW: {
    role: "Clinical Finisher",
    name: "The Striker",
    image: "https://images.pexels.com/photos/20089132/pexels-photo-20089132.jpeg?cs=srgb&w=800",
    desc: "The cold-blooded goalscorer. Exploits tiny defensive errors and finishes half-chances in fraction-of-a-second windows.",
    stats: [
      { label: "Finishing", value: 98 },
      { label: "Pace", value: 91 },
      { label: "Anticipation", value: 94 }
    ],
    highlight: "Translates team tactical creation into pure match-winning outcomes.",
    pitchPos: { top: "22%", left: "50%" }
  }
}

const futNations = [
  { slug: "brazil", name: "BRA", rating: 95, wins: "5", app: "22", pos: "CONMEBOL", flag: ["#009c3b", "#ffdf00", "#002776"], image: "/images/card_brazil_1780508324739.png" },
  { slug: "argentina", name: "ARG", rating: 97, wins: "3", app: "18", pos: "CONMEBOL", flag: ["#74acdf", "#ffffff", "#74acdf"], image: "/images/card_argentina_1780508338006.png" },
  { slug: "germany", name: "GER", rating: 94, wins: "4", app: "20", pos: "UEFA", flag: ["#000000", "#dd0000", "#ffce00"] },
  { slug: "japan", name: "JPN", rating: 86, wins: "0", app: "7", pos: "AFC", flag: ["#ffffff", "#bc002d"] },
  { slug: "croatia", name: "CRO", rating: 89, wins: "0", app: "7", pos: "UEFA", flag: ["#ff0000", "#ffffff", "#003087"] },
  { slug: "morocco", name: "MAR", rating: 88, wins: "0", app: "6", pos: "CAF", flag: ["#c1272d", "#006233"] }
]

export default function Home() {
  const prefersReducedMotion = useReducedMotion()
  const [matches, setMatches] = useState<MatchData[]>([])
  const [selectedMatch, setSelectedMatch] = useState<string>("")
  const [selectedPos, setSelectedPos] = useState<PositionKey>("FW")

  useEffect(() => {
    fetchLiveMatches().then((data) => {
      setMatches(data)
      if (data.length > 0) {
        setSelectedMatch(data[0].id)
      }
    })
  }, [])
  
  // Daily Trivia Lab State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [triviaStatus, setTriviaStatus] = useState<"unanswered" | "correct" | "wrong">("unanswered")

  const handleTriviaAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    if (answer === "C") {
      setTriviaStatus("correct")
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      setTriviaStatus("wrong")
    }
  }

  const handleResetTrivia = () => {
    setSelectedAnswer(null)
    setTriviaStatus("unanswered")
  }

  return (
    <main className="relative min-h-screen bg-canvas text-text overflow-hidden">
      {/* Dynamic Grid Background overlay */}
      <ShaderBackground />
      <div className="bg-noise" />
      <div className="scanlines animate-pulse" />

      {/* ─── HERO SECTION ─── */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-black">
        <video 
          autoPlay loop muted playsInline 
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover opacity-60 filter brightness-90 grayscale hover:grayscale-0 transition-all duration-[2s]"
          suppressHydrationWarning
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/30 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 z-10">
          <div className="max-w-5xl">
            {/* Title staggered animation */}
            <TextReveal tag="h1" className="font-display text-[clamp(4.5rem,11vw,9.5rem)] uppercase leading-[0.8] tracking-tighter text-white select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              CASA DEL FÚTBOL
            </TextReveal>
            <FadeUp delay={0.25}>
              <p className="mt-6 text-xl md:text-2xl font-editorial italic text-white/90 max-w-2xl border-l-4 border-accent pl-6 leading-relaxed">
                Your premium portal to global football. Unfiltered emotion, stunning tactical photography, and the stories that define the sport.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/guide" className="btn-primary hover:scale-105 transition-all duration-300">
                  Explore The Archive <ArrowRight size={18} className="ml-3" />
                </Link>
                <Link href="/quiz" className="btn-ghost hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  Enter Quiz Lab
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 right-8 z-10 hidden md:flex items-center gap-3 text-xs font-mono tracking-widest text-text-muted uppercase">
          <span>Scroll to enter</span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-6 bg-accent rounded-full"
          />
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <section className="py-6 bg-surface border-y border-hairline overflow-hidden relative z-10">
        <Marquee items={clubMarquee.map(club => (
          <span key={club} className="font-display text-4xl uppercase tracking-tighter text-text-faint hover:text-accent transition-colors px-12 block select-none">
            {club}
          </span>
        ))} />
      </section>

      {/* ─── INTERACTIVE Scoreboard ─── */}
      <section className="section-padding relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="/images/live_match_pulse_1780508307831.png" alt="Live Match Pulse" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/80 to-transparent" />
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-hairline pb-4 gap-4">
            <div>
              <span className="eyebrow text-accent">Realtime pulse</span>
              <h2 className="font-display text-5xl uppercase tracking-tight mt-2">Live Scoreboard & Signals</h2>
            </div>
            <Link href="/leagues" className="text-sm font-bold uppercase tracking-widest hover:text-accent flex items-center gap-2 transition-colors self-start md:self-end">
              All leagues fixtures <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
          {/* Match selector cards */}
          <div className="lg:col-span-2 grid md:grid-cols-3 gap-4">
            {matches.map((match) => {
              const isActive = selectedMatch === match.id
              return (
                <div 
                  key={match.id} 
                  onClick={() => setSelectedMatch(match.id)}
                  className={`cursor-pointer p-6 bg-surface border transition-all duration-300 relative group flex flex-col justify-between min-h-[180px] ${
                    isActive ? "border-accent shadow-[0_0_20px_rgba(204,255,0,0.15)]" : "border-hairline hover:border-hairline-strong"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-text-muted mb-4 uppercase tracking-widest">
                      <span>{match.label}</span>
                      {match.status === "LIVE" ? (
                        <span className="text-sale-red animate-pulse flex items-center gap-1.5 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-sale-red inline-block" />
                          LIVE
                        </span>
                      ) : (
                        <span>{match.status}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display text-3xl tracking-wide">{match.home}</span>
                      <span className={`font-display text-2xl px-3 py-0.5 ${isActive ? 'bg-accent text-canvas' : 'bg-surface-elevated text-text'} font-bold transition-colors`}>{match.homeScore}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-display text-3xl tracking-wide">{match.away}</span>
                      <span className={`font-display text-2xl px-3 py-0.5 ${isActive ? 'bg-accent text-canvas' : 'bg-surface-elevated text-text'} font-bold transition-colors`}>{match.awayScore}</span>
                    </div>
                  </div>
                  {isActive && (
                    <motion.div layoutId="scoreboardActiveDot" className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-accent rounded-full" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Interactive Match Tactic Spotlight Panel */}
          <div className="p-6 bg-surface border border-hairline flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {matches.map((match) => (
                match.id === selectedMatch && (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Activity size={16} className="text-accent" />
                        <span className="eyebrow text-accent">Tactical analysis</span>
                      </div>
                      <h4 className="font-display text-2xl uppercase tracking-wider text-white mb-3">
                        {match.home} vs {match.away}
                      </h4>
                      <p className="text-sm text-text-body font-editorial italic leading-relaxed">
                        {match.desc}
                      </p>
                    </div>
                    
                    {/* Simulated tactical winning probabilities */}
                    <div className="mt-4 space-y-2">
                      <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Expected Outcome Win %</p>
                      <div className="h-2 w-full flex bg-surface-elevated rounded-xs overflow-hidden font-mono text-[9px] text-white">
                        <div className="bg-accent h-full text-canvas font-bold flex items-center justify-center" {...{ style: { width: `${match.homeWinProb}%` } }}>{match.home} {match.homeWinProb}%</div>
                        <div className="bg-surface-card h-full flex items-center justify-center border-x border-hairline" {...{ style: { width: `${match.drawProb}%` } }}>{match.drawProb}%</div>
                        <div className="bg-cyan h-full text-canvas font-bold flex items-center justify-center" {...{ style: { width: `${match.awayWinProb}%` } }}>{match.away} {match.awayWinProb}%</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-hairline text-xs font-mono text-text-muted mt-6 flex justify-between items-center">
                      <span>Status: {match.status}</span>
                      <span>Time: {match.time}</span>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
        </div>
      </section>

      {/* ─── INTERACTIVE TACTICAL 3D PITCH (THE ARCHETYPES) ─── */}
      <section className="section-padding bg-surface/50 border-y border-hairline relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen">
          <img src="/images/tactical_pitch_diagram_1780508164557.png" alt="Tactical Blueprint" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/80 to-transparent mix-blend-multiply" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow text-accent">Tactical blueprints</span>
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] uppercase leading-none tracking-tight mt-2 mb-6">
              The Archetypes <span className="text-text-muted italic font-editorial lowercase">of positions</span>
            </h2>
            <p className="text-lg text-text-body font-editorial">
              Modern football is structured in roles. Click on the nodes on the 3D-perspective whiteboard pitch to analyze details and active heatmaps.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Whiteboard 3D Football Pitch (Left Side) */}
            <div className="lg:col-span-5 max-w-md mx-auto w-full tactical-pitch-3d">
              <div className="tactical-pitch-3d-inner">
                <div className="tactical-pitch">
                  {/* Field lines */}
                  <div className="pitch-line pitch-line--center" />
                  <div className="pitch-circle" />
                  <div className="pitch-penalty pitch-penalty--top" />
                  <div className="pitch-penalty pitch-penalty--bottom" />

                  {/* Dynamic Heatmap overlay glow */}
                  <div 
                    className="heatmap-glow active bg-accent/40"
                    {...{ style: { 
                      top: positionsData[selectedPos].pitchPos.top, 
                      left: positionsData[selectedPos].pitchPos.left 
                    } }}
                  />

                  {/* Player Nodes */}
                  {(Object.keys(positionsData) as PositionKey[]).map((key) => {
                    const data = positionsData[key]
                    const isActive = selectedPos === key
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedPos(key)}
                        {...{ style: { top: data.pitchPos.top, left: data.pitchPos.left } }}
                        className={`player-node ${isActive ? "active" : ""}`}
                        aria-label={`Position ${data.role}`}
                      >
                        {key}
                        <span className="player-label">{data.role}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Position details and stats panel (Right Side) */}
            <div className="lg:col-span-7 h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPos}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-surface border border-hairline p-8 md:p-12 relative flex flex-col md:flex-row gap-8 rounded-lg overflow-hidden"
                >
                  <div className="flex-1">
                    <span className="eyebrow text-accent">{positionsData[selectedPos].role}</span>
                    <h3 className="font-display text-4xl uppercase tracking-tight text-white mt-2 mb-4">
                      {positionsData[selectedPos].name}
                    </h3>
                    <p className="text-text-body font-editorial italic text-lg leading-relaxed mb-6">
                      {positionsData[selectedPos].desc}
                    </p>
                    
                    {/* Stats List */}
                    <div className="space-y-4">
                      {positionsData[selectedPos].stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="flex justify-between text-xs uppercase tracking-widest font-mono text-text-muted mb-1">
                            <span>{stat.label}</span>
                            <span className="text-accent">{stat.value}%</span>
                          </div>
                          <div className="h-1.5 bg-surface-elevated overflow-hidden rounded-xs">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.value}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-accent"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-8 text-xs font-mono uppercase tracking-widest text-text-muted border-t border-hairline pt-4 italic">
                      "{positionsData[selectedPos].highlight}"
                    </p>
                  </div>

                  <div className="w-full md:w-56 aspect-[3/4] relative overflow-hidden bg-black shrink-0">
                    <img
                      src={positionsData[selectedPos].image}
                      alt={positionsData[selectedPos].role}
                      className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ULTIMATE COLLECTIBLE NATIONS CARDS (EA FUT STYLE) ─── */}
      <section className="section-padding bg-canvas relative z-10">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow text-accent">Archival Collectibles</span>
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] uppercase leading-none tracking-tight mt-2 mb-6">
              FUT <span className="text-text-muted italic font-editorial lowercase">Squad collectibles</span>
            </h2>
            <p className="text-lg text-text-body font-editorial">
              Explore national squad statistics formatted as ultimate collectible game cards. Hover to review world cup attributes and 3D tilts.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {futNations.map((nation, idx) => {
              const gradientBg = `linear-gradient(135deg, ${nation.flag[0]}20 0%, #0c0e12 100%)`
              return (
                <div key={nation.slug} className="col-span-1">
                  <HoverCard className="h-full w-full">
                    <Link href={`/nations/${nation.slug}`} className="block h-full">
                      <div 
                        className="fut-card p-5 h-full flex flex-col justify-between relative bg-cover bg-center"
                        {...{ style: nation.image ? { backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${nation.image})` } : { background: gradientBg } }}
                      >
                        {/* FUT Card Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col items-center">
                            <span className="font-display text-4xl text-white font-black leading-none">{nation.rating}</span>
                            <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-wider">{nation.pos}</span>
                          </div>
                          
                          {/* Mini Flag */}
                          <div className="flex h-3 w-6 rounded-xs overflow-hidden border border-white/10">
                            {nation.flag.map((col, i) => (
                              <div key={i} className="h-full flex-1" {...{ style: { backgroundColor: col } }} />
                            ))}
                          </div>
                        </div>

                        {/* FUT Center Content */}
                        <div className="my-8 text-center">
                          <h3 className="font-display text-3xl uppercase tracking-tighter text-white truncate leading-none">
                            {nation.name}
                          </h3>
                        </div>

                        {/* FUT Stats Footer */}
                        <div className="border-t border-white/5 pt-3">
                          <div className="flex justify-between text-[10px] font-mono text-text-muted uppercase mb-1">
                            <span>WC Wins</span>
                            <span className="text-white font-bold">{nation.wins}</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-text-muted uppercase">
                            <span>WC Appearances</span>
                            <span className="text-white font-bold">{nation.app}</span>
                          </div>
                          
                          <div className="mt-4 flex items-center gap-1 text-[8px] font-mono text-accent justify-center border-t border-white/5 pt-2">
                            <span>VIEW FULL SYSTEM</span>
                            <ArrowRight size={10} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </HoverCard>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── THE DAILY TRIVIA INTERACTIVE MODULE ─── */}
      <section className="section-padding bg-surface/30 border-y border-hairline relative z-10">
        <div className="container max-w-4xl">
          <div className="bg-surface border border-accent/30 p-8 md:p-12 relative overflow-hidden shadow-[0_0_35px_rgba(204,255,0,0.06)] rounded-sm">
            
            {/* Corner Decorative lights */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full filter blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full filter blur-2xl" />

            <div className="relative z-10">
              <span className="eyebrow text-accent flex items-center gap-1.5 mb-4">
                <HelpCircle size={14} className="text-accent" />
                DAILY MINI-TRIVIA LAB
              </span>
              <h3 className="font-display text-4xl uppercase tracking-tight text-white mb-6">
                Test your knowledge in one click
              </h3>
              
              <p className="text-lg text-text-body font-editorial italic leading-relaxed mb-8">
                "Which historical football nation won the 1970 World Cup with the legendary side containing Pelé, Jairzinho, and Tostão?"
              </p>

              {/* Answer options */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: "A", text: "Italy" },
                  { key: "B", text: "West Germany" },
                  { key: "C", text: "Brazil" },
                  { key: "D", text: "Uruguay" }
                ].map((opt) => {
                  const isSelected = selectedAnswer === opt.key
                  let btnClass = "border-hairline hover:bg-surface-elevated hover:border-hairline-strong"
                  if (isSelected) {
                    btnClass = opt.key === "C" 
                      ? "border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(204,255,0,0.1)]" 
                      : "border-sale-red bg-sale-red/10 text-sale-red"
                  }

                  return (
                    <button
                      key={opt.key}
                      disabled={triviaStatus === "correct"}
                      onClick={() => handleTriviaAnswer(opt.key)}
                      className={`p-4 border text-left font-body text-sm flex items-center justify-between transition-all duration-300 cursor-pointer rounded-xs ${btnClass}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-display text-lg tracking-wider text-text-muted">{opt.key}.</span>
                        <span className="font-semibold text-white">{opt.text}</span>
                      </span>
                      {isSelected && opt.key === "C" && <CheckCircle2 size={16} className="text-accent" />}
                      {isSelected && opt.key !== "C" && <AlertCircle size={16} className="text-sale-red" />}
                    </button>
                  )
                })}
              </div>

              {/* Answer Feedback Alert */}
              <AnimatePresence>
                {triviaStatus !== "unanswered" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 border border-hairline bg-surface-elevated/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div>
                      {triviaStatus === "correct" ? (
                        <p className="text-sm font-semibold text-accent flex items-center gap-2">
                          <CheckCircle2 size={16} /> Correct! Brazil won the 1970 World Cup in stunning fashion.
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-sale-red flex items-center gap-2">
                          <AlertCircle size={16} /> Incorrect! That country competed but did not lift the trophy.
                        </p>
                      )}
                      <p className="text-xs text-text-muted mt-1 font-body">
                        The 1970 team is regarded as the pinnacle of expressive attacking football.
                      </p>
                    </div>
                    {triviaStatus === "correct" ? (
                      <Link href="/quiz" className="btn-primary py-2 px-6 h-10 text-xs hover:scale-102 transition-transform self-end sm:self-center">
                        ENTER THE QUIZ LAB <ArrowRight size={14} className="ml-2" />
                      </Link>
                    ) : (
                      <button onClick={handleResetTrivia} className="btn-ghost py-2 px-6 h-10 text-xs self-end sm:self-center">
                        TRY AGAIN
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </section>

      {/* ─── FULL-BLEED FEATURE SECTION ─── */}
      <section className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center">
        <ScrollParallax className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img src={featureImage} alt="Football culture" className="w-full h-full object-cover filter brightness-75" />
        </ScrollParallax>
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Editorial spotlight</span>
          <h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] uppercase leading-none tracking-tight text-white mb-8">
            The Choreography of the Crowd
          </h2>
          <Link href="/guide" className="btn-primary bg-white text-black hover:bg-accent hover:text-black">
            Read The Editorial
          </Link>
        </div>
      </section>

      {/* ─── THE PRESTIGE (TROPHY GALLERY) ─── */}
      <section className="section-padding container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden bg-surface-card border border-hairline group">
              <img 
                src={prestigeTrophyImage} 
                alt="Golden World Cup Trophy" 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6">
                <span className="px-3 py-1 bg-accent text-canvas font-mono text-xs uppercase tracking-widest font-bold">World Cup</span>
              </div>
            </div>
          </FadeUp>

          <div>
            <span className="eyebrow text-accent">The ultimate silverware</span>
            <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tight text-white mt-2 mb-6">
              The Trophy Room
            </h2>
            <p className="text-lg text-text-body font-editorial italic leading-relaxed mb-8">
              "Silverware turns a season of tactical struggle into football immortality." Explore the history, prestige ratings, and iconic moments of the world's most desired trophies.
            </p>
            <Link href="/trophies" className="btn-ghost flex items-center gap-3 self-start hover:scale-105 transition-transform">
              Explore Trophy Room <Trophy size={16} className="text-accent" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

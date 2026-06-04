"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Trophy, Star, Shield, HelpCircle, Activity, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion"
import confetti from "canvas-confetti"
import { FadeUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion/FadeUp"
import { Marquee } from "@/components/motion/Marquee"
import { ScrollParallax } from "@/components/motion/ScrollParallax"
import { TextReveal } from "@/components/motion/TextReveal"
import { getNationBySlug } from "@/lib/data/nations"
import { HoverCard } from "@/components/motion/HoverCard"
import { ShaderBackground } from "@/components/motion/ShaderBackground"
import { fetchLiveMatches, MatchData } from "@/lib/api/football"
import dynamic from "next/dynamic"

const Trophy3D = dynamic(() => import("@/components/ui/Trophy3D"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-full min-h-[350px] md:min-h-[420px] flex flex-col items-center justify-center bg-black/20">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas/60 backdrop-blur-xs">
        <span className="text-xs uppercase tracking-widest text-text-muted font-mono animate-pulse">
          Loading 3D Canvas...
        </span>
      </div>
    </div>
  )
})

// Premium assets: Stitch MCP generated images + high quality sports video
const heroImage = "/images/hero_stadium_editorial.png"
const prestigeTrophyImage = "/images/world_cup_trophy_1780508105236.png"
const featureImage = "/images/crowd_choreography_1780508211495.png"

const liveTickerData = [
  { match: "RMA vs FCB", state: "FT", detail: "3 - 2" },
  { match: "MCI vs BAY", state: "88'", detail: "1 - 1" },
  { match: "PSG vs JUV", state: "HT", detail: "2 - 0" },
  { match: "ARS vs CHE", state: "FT", detail: "0 - 1" },
  { match: "MIL vs INT", state: "12'", detail: "0 - 0" },
  { match: "LIV vs AJX", state: "FT", detail: "3 - 1" },
  { match: "POR vs SPO", state: "FT", detail: "2 - 2" },
  { match: "DOR vs BMG", state: "65'", detail: "4 - 2" }
]

type PositionKey = "GK" | "DF" | "MF" | "FW"

const positionsData: Record<PositionKey, { role: string; name: string; image: string; desc: string; stats: { label: string; value: number }[]; highlight: string; pitchPos: { top: string; left: string } }> = {
  GK: {
    role: "Goalkeeper",
    name: "The Guardian",
    image: "/images/goalkeeper.jpg",
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
    image: "/images/defender.jpg",
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
    image: "/images/Midfielder.png",
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
    image: "/images/Clinical Finisher.jpg",
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
  { slug: "germany", name: "GER", rating: 94, wins: "4", app: "20", pos: "UEFA", flag: ["#000000", "#dd0000", "#ffce00"], image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { slug: "japan", name: "JPN", rating: 86, wins: "0", app: "7", pos: "AFC", flag: ["#ffffff", "#bc002d"], image: "https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { slug: "croatia", name: "CRO", rating: 89, wins: "0", app: "7", pos: "UEFA", flag: ["#ff0000", "#ffffff", "#003087"], image: "https://images.pexels.com/photos/47730/football-kick-off-pitch-turf-47730.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { slug: "morocco", name: "MAR", rating: 88, wins: "0", app: "6", pos: "CAF", flag: ["#c1272d", "#006233"], image: "https://images.pexels.com/photos/9754/peoples-hero-stadium-spots.jpg?auto=compress&cs=tinysrgb&w=600" }
]

const TournamentGraphic = ({ className = "", rotateOffset = 45 }: { className?: string; rotateOffset?: number }) => {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  const rotate = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : rotateOffset])
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 30])

  return (
    <motion.svg 
      style={{ rotate, y }}
      className={`absolute pointer-events-none select-none opacity-5 dark:opacity-10 text-accent ${className}`} 
      width="300" 
      height="300" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" />
      <path d="M 20 100 A 80 80 0 0 1 180 100" stroke="currentColor" strokeWidth="3" />
      <path d="M 100 20 A 80 80 0 0 1 100 180" stroke="currentColor" strokeWidth="1" />
    </motion.svg>
  )
}

const ScoreDigit = ({ value, isActive }: { value: string; isActive: boolean }) => {
  return (
    <span className={`font-mono text-lg px-2 py-0.5 border ${
      isActive ? 'bg-primary-red border-primary-red/30 text-white font-bold shadow-[0_0_15px_rgba(249,31,33,0.15)]' : 'bg-surface-elevated border-hairline text-text font-bold'
    } transition-all relative overflow-hidden inline-flex items-center justify-center w-8 h-8 rounded-lg`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const matchPhotos: Record<string, string> = {
  "m1": "/images/live_match_pulse_1780508307831.png", // Defender Action
  "m2": "https://images.pexels.com/photos/19799186/pexels-photo-19799186.jpeg", // Midfield Playmaker
  "m3": "https://images.pexels.com/photos/20089132/pexels-photo-20089132.jpeg"  // Striker Finisher
}

const getMatchPhoto = (match: MatchData) => {
  if (!match) return "/images/live_match_pulse_1780508307831.png"
  const teamStr = `${match.home}-${match.away}`.toUpperCase()
  if (teamStr.includes("RMA") || teamStr.includes("FCB") || teamStr.includes("BAR")) {
    return "/images/live_match_pulse_1780508307831.png"
  }
  if (teamStr.includes("MCI") || teamStr.includes("BAY")) {
    return "https://images.pexels.com/photos/19799186/pexels-photo-19799186.jpeg"
  }
  if (teamStr.includes("PSG") || teamStr.includes("JUV")) {
    return "https://images.pexels.com/photos/20089132/pexels-photo-20089132.jpeg"
  }
  
  if (match.id && matchPhotos[match.id]) {
    return matchPhotos[match.id]
  }
  
  return "/images/live_match_pulse_1780508307831.png"
}

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

  const activeMatch = matches.find((m) => m.id === selectedMatch) || matches[0]
  
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
        origin: { y: 0.6 },
        colors: ["#1976c9", "#28b84e", "#d5ad1f"]
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

      {/* ─── ELEGANT EDITORIAL HERO SECTION ─── */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-black border-b border-white/10">
        {/* Background Image (acting as full-bleed premium photography) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Football Stadium Atmosphere"
            className="w-full h-full object-cover brightness-75"
          />
          {/* Subtle gradient vignette to blend into deep dark canvas */}
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-16 lg:p-24 pb-16 md:pb-24">
          <div className="max-w-4xl space-y-8">
            <h1 className="font-display text-[clamp(4.5rem,11vw,9.5rem)] uppercase leading-[0.85] tracking-tighter text-white select-none">
              THE GREATEST <br />
              <span className="text-primary-gold">STAGE</span> ON EARTH
            </h1>
            
            <p className="text-lg md:text-xl text-text-body max-w-xl border-l-4 border-primary-gold pl-6 leading-relaxed font-body italic">
              The definitive companion to the passion, tactics, and glory of the global game.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/world-cup" className="btn-primary px-8 h-12 flex items-center gap-3">
                ENTER MATCH CENTER <ArrowRight size={16} />
              </Link>
              <Link href="/guide" className="btn-secondary px-8 h-12 flex items-center gap-2">
                EXPLORE PLAYBOOK
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE (TELEMETRY TICKER BAR) ─── */}
      <section className="py-4 bg-surface border-y border-hairline overflow-hidden relative z-10">
        <Marquee items={liveTickerData.map((item, idx) => (
          <span key={idx} className="font-mono text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors px-8 flex items-center gap-3 select-none">
            <span className="font-display text-lg tracking-tight text-text">{item.match}</span>
            <span className="bg-accent/15 border border-accent/20 px-2 py-0.5 text-accent font-bold text-[9px]">{item.detail}</span>
            <span className={`font-bold ${item.state === "FT" ? "text-text-faint" : "text-primary-red animate-pulse"}`}>
              {item.state}
            </span>
            <span className="text-text-faint ml-4">•</span>
          </span>
        ))} />
      </section>

      {/* ─── FEATURED MATCHDAY (IMAGE LEFT, DETAILS RIGHT) ─── */}
      <FadeUp className="section-padding relative z-10 bg-canvas">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-hairline pb-6 gap-4">
            <div>
              <span className="eyebrow text-primary-red">Realtime Pulse</span>
              <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tight mt-2">Featured Matchday</h2>
            </div>
            <Link href="/leagues" className="text-xs font-bold uppercase tracking-widest hover:text-accent flex items-center gap-2 transition-colors self-start md:self-end">
              ALL LEAGUES FIXTURES <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left side: Large Football Photography (Focal Point) */}
            <div className="lg:col-span-7">
              {activeMatch && (
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-card border border-hairline group rounded-3xl shadow-2xl">
                  <img 
                    src={getMatchPhoto(activeMatch)} 
                    alt={`${activeMatch.home} vs ${activeMatch.away}`} 
                    className="w-full h-full object-cover filter brightness-[0.8] hover:brightness-[0.9] group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Live score overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-mono text-primary-blue font-bold uppercase tracking-widest mb-1.5 block">
                        {activeMatch.label}
                      </span>
                      <h3 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-white">
                        {activeMatch.home} vs {activeMatch.away}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/60 border border-hairline/50 p-3 rounded-xl">
                      <ScoreDigit value={activeMatch.homeScore} isActive={activeMatch.status === "LIVE"} />
                      <span className="text-text-muted px-1 font-bold font-mono">:</span>
                      <ScoreDigit value={activeMatch.awayScore} isActive={activeMatch.status === "LIVE"} />
                      {activeMatch.status === "LIVE" && (
                        <span className="ml-2 w-2.5 h-2.5 bg-primary-red border border-white/20 rounded-full animate-pulse inline-block" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right side: Clean Switcher & Storytelling details */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Select Matchday fixture</span>
                <div className="flex flex-col gap-2">
                  {matches.map((match) => {
                    const isActive = selectedMatch === match.id
                    return (
                      <button 
                        key={match.id}
                        onClick={() => setSelectedMatch(match.id)}
                        className={`w-full p-4 text-left transition-all duration-300 flex items-center justify-between border-l-2 rounded-xl cursor-pointer ${
                          isActive 
                            ? "bg-surface-elevated border-primary-blue text-white"
                            : "bg-surface/40 border-hairline text-text-body hover:bg-surface/75 hover:border-hairline-strong hover:text-white"
                        }`}
                      >
                        <span className="font-display text-xl uppercase tracking-wider">{match.home} vs {match.away}</span>
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs font-bold ${match.status === "LIVE" ? "text-primary-red animate-pulse" : "text-text-muted"}`}>{match.status}</span>
                          <ChevronRight size={14} className={isActive ? "text-primary-blue translate-x-1 transition-transform" : "text-text-faint"} />
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {activeMatch && (
                <div className="space-y-6 pt-6 border-t border-hairline">
                  <div className="space-y-2">
                    <span className="eyebrow text-primary-blue">Tactical briefing</span>
                    <p className="text-base text-text-body font-body leading-relaxed">
                      {activeMatch.desc}
                    </p>
                  </div>

                  {/* Outcome Probability statistics */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-mono text-text-muted uppercase tracking-widest">
                      <span>Win Probability %</span>
                      <span className="font-bold">
                        <span className="text-primary-blue">{activeMatch.home}</span> / <span className="text-primary-gold">Draw</span> / <span className="text-primary-green">{activeMatch.away}</span>
                      </span>
                    </div>
                    <div className="h-2 w-full flex bg-surface-elevated rounded-full overflow-hidden font-mono text-[9px] text-white">
                      <div className="bg-primary-blue h-full font-bold flex items-center justify-center transition-all duration-500" style={{ width: `${activeMatch.homeWinProb}%` }}>
                        {activeMatch.homeWinProb > 20 && `${activeMatch.homeWinProb}%`}
                      </div>
                      <div className="bg-primary-gold h-full text-black font-bold flex items-center justify-center border-x border-hairline transition-all duration-500" style={{ width: `${activeMatch.drawProb}%` }}>
                        {activeMatch.drawProb > 20 && `${activeMatch.drawProb}%`}
                      </div>
                      <div className="bg-primary-green h-full font-bold flex items-center justify-center transition-all duration-500" style={{ width: `${activeMatch.awayWinProb}%` }}>
                        {activeMatch.awayWinProb > 20 && `${activeMatch.awayWinProb}%`}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ─── INTERACTIVE TACTICAL PITCH (THE ARCHETYPES - DETAILS LEFT, WIDGET RIGHT) ─── */}
      <FadeUp className="section-padding bg-surface/30 border-y border-hairline relative z-10 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Position details and stats panel (Left Side) */}
            <div className="lg:col-span-7 h-full flex flex-col justify-center">
              <div className="max-w-2xl mb-12">
                <span className="eyebrow text-primary-green">Tactical blueprints</span>
                <h2 className="font-display text-[clamp(3rem,5vw,4.5rem)] uppercase leading-none tracking-tight mt-2 mb-4">
                  The Archetypes <span className="text-text-muted italic lowercase font-body">of positions</span>
                </h2>
                <p className="text-base text-text-body font-body leading-relaxed">
                  Modern football is structured in roles. Click on the nodes on the whiteboard pitch to analyze details and active heatmaps.
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPos}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-surface border border-hairline p-6 md:p-10 relative flex flex-col md:flex-row gap-8 rounded-3xl overflow-hidden shadow-xl"
                >
                  <div className="flex-1">
                    <span className="eyebrow text-primary-green">{positionsData[selectedPos].role}</span>
                    <h3 className="font-display text-4xl uppercase tracking-tight text-text mt-2 mb-4">
                      {positionsData[selectedPos].name}
                    </h3>
                    <p className="text-text-body font-body text-sm leading-relaxed mb-6">
                      {positionsData[selectedPos].desc}
                    </p>
                    
                    {/* Stats List */}
                    <div className="space-y-4">
                      {positionsData[selectedPos].stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="flex justify-between text-xs uppercase tracking-widest font-mono text-text-muted mb-1">
                            <span>{stat.label}</span>
                            <span className="text-primary-green font-bold">{stat.value}%</span>
                          </div>
                          <div className="h-1 bg-surface-elevated overflow-hidden rounded-full w-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.value}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-primary-green"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-8 text-xs font-mono uppercase tracking-widest text-text-muted border-t border-hairline pt-4 italic">
                      "{positionsData[selectedPos].highlight}"
                    </p>
                  </div>

                  <div className="w-full md:w-auto h-72 md:h-[320px] relative overflow-hidden bg-black/10 shrink-0 rounded-2xl border border-hairline group">
                    <img
                      src={positionsData[selectedPos].image}
                      alt={positionsData[selectedPos].role}
                      className="w-full h-full md:w-auto md:h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Whiteboard 3D Football Pitch (Right Side) */}
            <div className="lg:col-span-5 max-w-md mx-auto w-full tactical-pitch-3d">
              <div className="tactical-pitch-3d-inner">
                <div className="tactical-pitch rounded-3xl shadow-2xl">
                  {/* Field lines */}
                  <div className="pitch-line pitch-line--center" />
                  <div className="pitch-circle" />
                  <div className="pitch-penalty pitch-penalty--top" />
                  <div className="pitch-penalty pitch-penalty--bottom" />

                  {/* Dynamic Heatmap overlay glow */}
                  <div 
                    className="heatmap-glow active bg-primary-green/30 rounded-full animate-pulse"
                    {...{ style: { 
                      top: positionsData[selectedPos].pitchPos.top, 
                      left: positionsData[selectedPos].pitchPos.left 
                      } 
                    }}
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
                        className={`player-node rounded-full border-2 ${isActive ? "active animate-bounce" : ""}`}
                        aria-label={`Position ${data.role}`}
                      >
                        {key}
                        <span className="player-label rounded-sm">{data.role}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ─── ULTIMATE COLLECTIBLE NATIONS CARDS (EA FUT STYLE) ─── */}
      <FadeUp className="section-padding bg-canvas relative z-10">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow text-primary-blue">The Contenders</span>
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] uppercase leading-none tracking-tight mt-2 mb-6">
              National Squads
            </h2>
            <p className="text-base text-text-body font-body max-w-2xl">
              Explore national squad statistics and historic records formatted as prestigious ultimate collectible tournament cards.
            </p>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {futNations.map((nation, idx) => {
              const gradientBg = `linear-gradient(135deg, ${nation.flag[0]}20 0%, #0c0e12 100%)`
              return (
                <StaggerItem key={nation.slug} className="col-span-1">
                  <HoverCard className="h-full w-full">
                    <Link href={`/nations/${nation.slug}`} className="block h-full">
                      <div 
                        className="fut-card p-6 h-full flex flex-col justify-between relative bg-cover bg-center rounded-2xl min-h-[340px]"
                        {...{ style: nation.image ? { backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(${nation.image})` } : { background: gradientBg } }}
                      >
                        {/* FUT Card Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col items-center">
                            <span className="font-display text-5xl text-white font-black leading-none">{nation.rating}</span>
                            <span className="text-[10px] font-mono text-primary-blue font-bold uppercase tracking-wider mt-1">{nation.pos}</span>
                          </div>
                          
                          {/* Mini Flag */}
                          <div className="flex h-3.5 w-7 rounded-sm overflow-hidden border border-white/10">
                            {nation.flag.map((col, i) => (
                              <div key={i} className="h-full flex-1" {...{ style: { backgroundColor: col } }} />
                            ))}
                          </div>
                        </div>
 
                        {/* FUT Center Content */}
                        <div className="my-10 text-center">
                          <h3 className="font-display text-4xl uppercase tracking-tighter text-white truncate leading-none">
                            {nation.name}
                          </h3>
                        </div>
 
                        {/* FUT Stats Footer */}
                        <div className="border-t border-white/10 pt-4">
                          <div className="flex justify-between text-xs font-mono text-text-muted uppercase mb-1.5">
                            <span>WC Wins</span>
                            <span className="text-white font-bold">{nation.wins}</span>
                          </div>
                          <div className="flex justify-between text-xs font-mono text-text-muted uppercase">
                            <span>Appearances</span>
                            <span className="text-white font-bold">{nation.app}</span>
                          </div>
                          
                          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-primary-blue justify-center border-t border-white/5 pt-3">
                            <span>VIEW FULL SYSTEM</span>
                            <ArrowRight size={12} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </HoverCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </FadeUp>
 
      {/* ─── THE SPIRIT OF 1970 EDITORIAL FEATURE SECTION ─── */}
      <FadeUp className="section-padding relative z-10 bg-surface/20 border-y border-hairline overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left side: Editorial Storytelling */}
            <div className="lg:col-span-5 space-y-6">
              <span className="eyebrow text-primary-gold">Archival Spotlight</span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-none tracking-tight">
                The Spirit <br />
                of 1970
              </h2>
              <p className="text-base text-text-body font-body leading-relaxed">
                Regarded as the pinnacle of expressive, attacking football, the 1970 Brazilian side elevated football into an art form. Under the heat of Mexico City, Pelé, Jairzinho, and Tostão danced through defenses to claim world cup immortality.
              </p>
              <Link href="/nations/brazil" className="btn-secondary px-8 h-12 inline-flex items-center gap-2 rounded-lg">
                EXPLORE SQUAD SYSTEM
              </Link>
            </div>
            {/* Right side: Photography focal point */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden bg-black border border-hairline group rounded-3xl shadow-2xl">
                <img 
                  src="/images/brazil_trivia_1970_1780508231625.png" 
                  alt="Brazil 1970 Squad Tribute" 
                  className="w-full h-full object-cover brightness-90 filter hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ─── THE DAILY TRIVIA INTERACTIVE MODULE (MINIMAL EDITORIAL) ─── */}
      <FadeUp className="section-padding relative z-10 bg-canvas">
        <div className="container max-w-4xl">
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-4">
              <span className="eyebrow text-primary-blue flex items-center justify-center gap-1.5">
                <HelpCircle size={14} className="text-primary-blue" />
                DAILY MINI-TRIVIA LAB
              </span>
              <h3 className="font-display text-4xl uppercase tracking-tight text-text">
                Test your knowledge
              </h3>
            </div>
            
            <p className="text-2xl text-center text-text-body font-body italic leading-relaxed max-w-2xl mx-auto py-4">
              "Which historical football nation won the 1970 World Cup with the legendary side containing Pelé, Jairzinho, and Tostão?"
            </p>

            {/* Answer options */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
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
                    ? "border-primary-green bg-primary-green/10 text-primary-green shadow-[0_0_15px_rgba(40,184,78,0.15)]"
                    : "border-primary-red bg-primary-red/10 text-primary-red shadow-[0_0_15px_rgba(249,31,33,0.15)]"
                }

                return (
                  <button
                    key={opt.key}
                    disabled={triviaStatus === "correct"}
                    onClick={() => handleTriviaAnswer(opt.key)}
                    className={`p-4 border text-left font-body text-sm flex items-center justify-between transition-all duration-300 cursor-pointer rounded-xl ${btnClass}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-display text-lg tracking-wider text-text-muted">{opt.key}.</span>
                      <span className="font-semibold text-text">{opt.text}</span>
                    </span>
                    {isSelected && opt.key === "C" && <CheckCircle2 size={16} className="text-primary-green" />}
                    {isSelected && opt.key !== "C" && <AlertCircle size={16} className="text-primary-red" />}
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
                  className="mt-6 p-4 border border-hairline bg-surface-elevated/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-2xl max-w-2xl mx-auto"
                >
                  <div>
                    {triviaStatus === "correct" ? (
                      <p className="text-sm font-semibold text-primary-green flex items-center gap-2">
                        <CheckCircle2 size={16} /> Correct! Brazil won the 1970 World Cup in stunning fashion.
                      </p>
                    ) : (
                      <p className="text-sm font-semibold text-primary-red flex items-center gap-2">
                        <AlertCircle size={16} /> Incorrect! That country competed but did not lift the trophy.
                      </p>
                    )}
                    <p className="text-xs text-text-muted mt-1 font-body">
                      The 1970 team is regarded as the pinnacle of expressive attacking football.
                    </p>
                  </div>
                  {triviaStatus === "correct" ? (
                    <Link href="/quiz" className="btn-primary py-2 px-6 h-10 text-xs hover:scale-102 transition-transform self-end sm:self-center rounded-lg">
                      ENTER THE QUIZ LAB <ArrowRight size={14} className="ml-2" />
                    </Link>
                  ) : (
                    <button onClick={handleResetTrivia} className="btn-secondary py-2 px-6 h-10 text-xs self-end sm:self-center rounded-lg">
                      TRY AGAIN
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </FadeUp>

      {/* ─── FULL-BLEED FEATURE SECTION ─── */}
      <section className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center">
        <ScrollParallax className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img src={featureImage} alt="Football culture" className="w-full h-full object-cover filter brightness-75" />
        </ScrollParallax>
        <div className="absolute inset-0 bg-black/45" />
        <ScaleIn className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="text-primary-gold font-bold tracking-[0.3em] uppercase text-xs mb-6 block font-body">Editorial spotlight</span>
          <h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] uppercase leading-none tracking-tight text-white mb-8">
            The Choreography of the Crowd
          </h2>
          <Link href="/guide" className="btn-primary bg-white text-black hover:bg-primary-gold hover:text-black rounded-lg">
            Read The Editorial
          </Link>
        </ScaleIn>
      </section>

      {/* ─── THE PRESTIGE (TROPHY GALLERY) ─── */}
      <section className="section-padding container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden bg-surface-card border border-hairline group rounded-3xl shadow-2xl">
              <Trophy3D modelPath="/trophy.glb" fallbackImage={prestigeTrophyImage} />
              <div className="absolute bottom-6 left-6 pointer-events-none z-20">
                <span className="px-3 py-1 bg-primary-gold text-canvas font-mono text-xs uppercase tracking-widest font-bold rounded-sm">World Cup</span>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div>
              <span className="eyebrow text-primary-gold">The ultimate silverware</span>
              <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tight text-text mt-2 mb-6">
                The Trophy Room
              </h2>
              <p className="text-lg text-text-body font-body italic leading-relaxed mb-8">
                "Silverware turns a season of tactical struggle into football immortality." Explore the history, prestige ratings, and iconic moments of the world's most desired trophies.
              </p>
              <Link href="/trophies" className="btn-secondary flex items-center gap-3 self-start hover:scale-105 transition-transform rounded-lg">
                Explore Trophy Room <Trophy size={16} className="text-primary-gold" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}

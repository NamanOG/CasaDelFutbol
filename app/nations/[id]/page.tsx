"use client"

import { useState } from "react"
import { nations } from "@/lib/data/nations"
import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Target, Shield, HelpCircle, Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp"
import { TextReveal } from "@/components/motion/TextReveal"
import { CountUp } from "@/components/motion/CountUp"
import { ShaderBackground } from "@/components/motion/ShaderBackground"

const nationTacticalData: Record<string, { GK: string; DF: string; MF: string; FW: string; formation: string; styleDescription: string }> = {
  brazil: { GK: "Alisson", DF: "Roberto Carlos", MF: "Ronaldinho", FW: "Pelé", formation: "4-2-4 Jogo Bonito", styleDescription: "Focuses on explosive creativity, technical improvisation, and individual magic in the final third." },
  argentina: { GK: "E. Martínez", DF: "Otamendi", MF: "Maradona", FW: "Lionel Messi", formation: "4-3-3 Attacking", styleDescription: "Aggressive counter-pressing built around a central creative maestro, utilizing rapid direct transitions." },
  germany: { GK: "Manuel Neuer", DF: "Beckenbauer", MF: "Musiala", FW: "Gerd Müller", formation: "4-2-3-1 Gegenpressing", styleDescription: "High-intensity collective pressing, structural organization, and disciplined, vertical passing channels." },
  spain: { GK: "Iker Casillas", DF: "Sergio Ramos", MF: "Andrés Iniesta", FW: "David Villa", formation: "4-3-3 Tiki-Taka", styleDescription: "Reduces opponent threat by maintaining high possession through patient, short passing combinations." },
  france: { GK: "Mike Maignan", DF: "Thuram", MF: "Zinedine Zidane", FW: "Kylian Mbappé", formation: "4-2-3-1 Counter-Attack", styleDescription: "Combines defensive solidity with explosive athleticism, stretching games on counter-attacks." },
  england: { GK: "Pickford", DF: "Bobby Moore", MF: "Jude Bellingham", FW: "Harry Kane", formation: "4-3-3 Direct Tempo", styleDescription: "High-tempo transitions, physical strength in duels, and utilizing full-backs for crossing width." },
  portugal: { GK: "Diogo Costa", DF: "Rúben Dias", MF: "Luís Figo", FW: "C. Ronaldo", formation: "4-3-3 Counter", styleDescription: "Tactical flexibility and solid structure, relying on clinical finishing from elite forwards." },
  italy: { GK: "G. Buffon", DF: "Paolo Maldini", MF: "Pirlo", FW: "Federico Chiesa", formation: "3-5-2 Catenaccio", styleDescription: "The ultimate tactical chess. Suffocates spaces inside the box, deploying a structured low-block." },
  netherlands: { GK: "Verbruggen", DF: "Virgil van Dijk", MF: "Johan Cruyff", FW: "Cody Gakpo", formation: "4-3-3 Total Football", styleDescription: "Positionally fluid style where every outfield player is expected to press, pass, and rotate roles." },
  uruguay: { GK: "Rochet", DF: "Gimenez", MF: "F. Valverde", FW: "Luis Suárez", formation: "4-4-2 Garra Charrúa", styleDescription: "Fierce fighting spirit and defensive aggression, creating direct threat through physical strikers." },
  croatia: { GK: "Livaković", DF: "Gvardiol", MF: "Luka Modrić", FW: "Ivan Perišić", formation: "4-3-3 Midfield Control", styleDescription: "Controls matches through technical passing triangles, keeping possession under high pressure." },
  senegal: { GK: "E. Mendy", DF: "Koulibaly", MF: "Pape Gueye", FW: "Sadio Mané", formation: "4-3-3 Dynamic Press", styleDescription: "Aggressive defensive pressure combined with athletic, direct runs down the flanks." },
  mexico: { GK: "G. Ochoa", DF: "R. Márquez", MF: "Edson Álvarez", FW: "Santiago Giménez", formation: "4-3-3 Fluid Poss", styleDescription: "Skilful short combinations in wide zones and high energy pressing to force turnover events." },
  japan: { GK: "Suzuki", DF: "Tomiyasu", MF: "Mitoma", FW: "Nakata", formation: "4-2-3-1 Precision", styleDescription: "Relentless work rate, clean first-touch distributions, and quick organized tactical transitions." },
  morocco: { GK: "Y. Bounou", DF: "A. Hakimi", MF: "Sofyan Amrabat", FW: "En-Nesyri", formation: "4-1-4-1 Low Block", styleDescription: "Disciplined defensive shape with extremely compact spacing, striking on vertical counter-attacks." },
}

type PositionKey = "GK" | "DF" | "MF" | "FW"

const posInfo: Record<PositionKey, { title: string; pitchPos: { top: string; left: string } }> = {
  GK: { title: "Goalkeeper", pitchPos: { top: "85%", left: "50%" } },
  DF: { title: "Defender", pitchPos: { top: "65%", left: "50%" } },
  MF: { title: "Midfielder", pitchPos: { top: "45%", left: "50%" } },
  FW: { title: "Forward", pitchPos: { top: "20%", left: "50%" } },
}

export default function NationDetailPage() {
  const params = useParams()
  const nation = nations.find((n) => n.slug === params.id)
  const [selectedPos, setSelectedPos] = useState<PositionKey>("FW")

  if (!nation) {
    notFound()
  }

  const flagGradient = nation.flagColors
    .filter(Boolean)
    .map((c, i, arr) => `${c} ${(i / (arr.length - 1)) * 100}%`)
    .join(", ")

  const tacData = nationTacticalData[nation.slug] || {
    GK: "Goalkeeper",
    DF: "Defender",
    MF: "Midfielder",
    FW: "Forward",
    formation: "Classic 4-3-3",
    styleDescription: "Dynamic, flexible tactical blueprint designed to challenge opponents on the international stage."
  }

  return (
    <main className="min-h-screen bg-canvas text-text relative overflow-hidden">
      <ShaderBackground />
      <div className="bg-noise" />
      <div className="scanlines animate-pulse" />

      {/* Back button */}
      <div className="sticky top-20 z-40 py-4 bg-canvas/80 backdrop-blur-md border-b border-hairline">
        <div className="container">
          <Link
            href="/nations"
            className="inline-flex items-center gap-2 font-display uppercase tracking-widest text-sm text-accent hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Nations
          </Link>
        </div>
      </div>

      {/* Hero header with image */}
      <section className="relative pt-24 pb-20 border-b border-hairline bg-surface overflow-hidden">
        {/* Background stadium image */}
        <img
          src={nation.heroImage}
          alt={`${nation.name} football`}
          className="absolute inset-0 w-full h-full object-cover opacity-15 filter grayscale blur-xs"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/30" />
        
        {/* Flag gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${flagGradient})` }}
        />

        <div className="container relative z-10">
          <FadeUp>
            <span className="eyebrow text-accent mb-4 block">
              {nation.continent} · {nation.confederation}
            </span>
          </FadeUp>

          <TextReveal tag="h1" className="text-display font-display text-5xl md:text-8xl uppercase tracking-wider text-white">
            {nation.name}
          </TextReveal>

          <FadeUp delay={0.2}>
            <p className="max-w-2xl mt-8 text-body text-xl leading-relaxed font-editorial italic text-white/90">
              {nation.shortDescription}
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <blockquote className="max-w-xl pl-6 mt-10 border-l-2 border-accent text-text-body italic text-lg leading-relaxed font-editorial">
              "{nation.legendQuote}"
              <span className="block mt-4 not-italic font-display text-primary text-lg uppercase tracking-wider">
                — {nation.greatestLegend}
              </span>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-canvas/50 border-b border-hairline py-12 relative z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { label: "World Cup Wins", value: nation.worldCupWins },
              { label: "WC Appearances", value: nation.worldCupAppearances },
              { label: "Continental Titles", value: nation.confederationChampionships },
              { label: "FIFA Ranking", value: nation.filaRanking, prefix: "#" },
              { label: "Founded", value: nation.founded },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.05}>
                <div className="text-center md:text-left">
                  <div className="text-4xl font-display text-accent mb-2">
                    <CountUp target={stat.value} prefix={stat.prefix} />
                  </div>
                  <p className="eyebrow text-xs">{stat.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE TACTICAL WHITEBOARD ─── */}
      <section className="section-padding bg-surface/30 border-b border-hairline relative z-10">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow text-accent">Tactical blueprint</span>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight mt-2 mb-4">
              Tactical DNA & System
            </h2>
            <p className="text-lg text-text-body font-editorial italic">
              Explore {nation.name}'s legendary model on the visual pitch. Click on the nodes to see key personnel and formation details.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* CSS Football Pitch (Left Column) */}
            <div className="lg:col-span-5 max-w-sm mx-auto w-full">
              <div className="tactical-pitch">
                {/* Field markings */}
                <div className="pitch-line pitch-line--center" />
                <div className="pitch-circle" />
                <div className="pitch-penalty pitch-penalty--top" />
                <div className="pitch-penalty pitch-penalty--bottom" />

                {/* Nodes */}
                {(Object.keys(posInfo) as PositionKey[]).map((key) => {
                  const node = posInfo[key]
                  const isActive = selectedPos === key
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPos(key)}
                      style={{ top: node.pitchPos.top, left: node.pitchPos.left }}
                      className={`player-node ${isActive ? "active" : ""}`}
                      aria-label={`Position ${node.title}`}
                    >
                      {key}
                      <span className="player-label">{tacData[key]}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tactical Info Panel (Right Column) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPos}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="bg-surface border border-hairline p-8 md:p-12 relative rounded-md flex flex-col justify-between min-h-[340px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="eyebrow text-accent">{posInfo[selectedPos].title}</span>
                      <span className="px-3 py-1 bg-surface-elevated border border-hairline font-mono text-xs uppercase tracking-widest">
                        {tacData.formation}
                      </span>
                    </div>

                    <h3 className="font-display text-4xl uppercase tracking-tight text-white mb-4">
                      {tacData[selectedPos]}
                    </h3>
                    
                    <p className="text-text-body font-editorial italic text-lg leading-relaxed mb-6">
                      Selected node plays a crucial role in {nation.name}'s default strategy: {tacData.styleDescription}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Shield size={14} className="text-accent" />
                      Confederation: {nation.confederation}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Target size={14} className="text-accent" />
                      FIFA Rank: #{nation.filaRanking}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Stadium Hero Band */}
      <section className="relative overflow-hidden min-h-[45vh] flex items-center border-b border-hairline">
        <img
          src={nation.heroImage}
          alt={`${nation.name} stadium`}
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/60 to-transparent" />
        <div className="container relative z-10 py-16">
          <FadeUp>
            <span className="eyebrow text-accent mb-4 block">Golden Era</span>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white mb-6">
              Their Greatest Moment
            </h2>
            <p className="max-w-2xl text-body text-xl leading-relaxed font-editorial italic text-white/90 border-l-4 border-accent pl-6">
              {nation.goldenEra}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Football Identity */}
      <section className="section-padding bg-surface/50 border-b border-hairline relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeUp>
              <div>
                <span className="eyebrow text-accent mb-4 block">Football Identity</span>
                <h2 className="font-display text-4xl uppercase tracking-tight mb-6 text-white">
                  The {nation.name} Way
                </h2>
                <p className="text-text-body text-lg leading-relaxed font-editorial">
                  {nation.footballIdentity}
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div>
                <span className="eyebrow text-accent mb-4 block">Style of Play</span>
                <h2 className="font-display text-4xl uppercase tracking-tight mb-6 text-white">
                  Tactical Culture
                </h2>
                <p className="text-text-body text-lg leading-relaxed font-editorial">
                  {nation.styleOfPlay}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Legendary Players */}
      <section className="section-padding bg-canvas border-b border-hairline relative z-10">
        <div className="container">
          <FadeUp>
            <span className="eyebrow text-accent mb-4 block">Legends</span>
            <h2 className="font-display text-4xl uppercase tracking-tight mb-10 text-white">
              Icons of {nation.name}
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {nation.majorPlayers.map((player) => (
              <StaggerItem key={player}>
                <div className="bg-surface border border-hairline p-6 text-center group hover:border-accent/40 transition-colors">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-surface-elevated border border-hairline flex items-center justify-center font-display text-2xl text-accent group-hover:scale-110 transition-transform">
                    {player.charAt(0)}
                  </div>
                  <p className="font-display text-lg uppercase tracking-wider text-primary group-hover:text-accent transition-colors">
                    {player}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Current Stars */}
      <section className="section-padding bg-surface/50 border-b border-hairline relative z-10">
        <div className="container">
          <FadeUp>
            <span className="eyebrow text-accent mb-4 block">Current Stars</span>
            <h2 className="font-display text-4xl uppercase tracking-tight mb-10 text-white">
              Today's Best
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {nation.currentStars.map((player) => (
              <StaggerItem key={player}>
                <div className="bg-surface border border-hairline p-6 text-center group hover:border-accent/40 transition-colors">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-display text-xl text-accent group-hover:scale-110 transition-transform">
                    {player.charAt(0)}
                  </div>
                  <p className="font-display text-base uppercase tracking-wider text-primary group-hover:text-accent transition-colors">
                    {player}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Kit & Info */}
      <section className="section-padding bg-canvas relative z-10">
        <div className="container">
          <FadeUp>
            <div className="bg-surface border border-hairline p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <span className="eyebrow mb-4 block text-accent">Rivalry</span>
                  <p className="text-3xl font-display uppercase tracking-wider text-primary">
                    {nation.rivalry}
                  </p>
                </div>
                <div>
                  <span className="eyebrow mb-4 block text-accent">Kit Colors</span>
                  <div className="flex gap-4">
                    <div
                      className="w-12 h-12 rounded-xs"
                      style={{ background: nation.kit.home, border: "1px solid var(--color-hairline)" }}
                      title="Home"
                    />
                    <div
                      className="w-12 h-12 rounded-xs"
                      style={{ background: nation.kit.away, border: "1px solid var(--color-hairline)" }}
                      title="Away"
                    />
                  </div>
                </div>
                <div>
                  <span className="eyebrow mb-4 block text-accent">Flag Colors</span>
                  <div className="flex gap-2">
                    {nation.flagColors.filter(Boolean).map((color, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-xs"
                        style={{ background: color as string, border: "1px solid var(--color-hairline)" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Shield, Crosshair, Zap, Navigation, ArrowRight, Activity, MapPin } from "lucide-react"
import { FadeUp } from "@/components/motion/FadeUp"
import { TextReveal } from "@/components/motion/TextReveal"
import { ShaderBackground } from "@/components/motion/ShaderBackground"

interface RoleType {
  name: string
  desc: string
  posKey: "GK" | "DF" | "MF" | "FW"
}

interface SectionType {
  id: string
  title: string
  icon: any
  image: string
  content: string
  roles: RoleType[]
}

const sections: SectionType[] = [
  {
    id: "the-pitch",
    title: "The Pitch & Positions",
    icon: Navigation,
    image: "https://images.pexels.com/photos/31160100/pexels-photo-31160100.jpeg?auto=compress&cs=tinysrgb&w=1280",
    content: "A football pitch is roughly 100 meters long, but matches are won and lost in spaces no larger than a phone booth. The game is played by 11 players on each side, divided broadly into four roles.",
    roles: [
      { name: "Goalkeeper (GK)", desc: "The only player allowed to use their hands (inside the penalty box). The last line of defense and the first point of distribution.", posKey: "GK" },
      { name: "Defenders (CB, FB, WB)", desc: "Tasked with stopping the opposition. Centre-backs (CB) marshal the middle, while full-backs (FB) and wing-backs (WB) patrol the flanks.", posKey: "DF" },
      { name: "Midfielders (DM, CM, AM)", desc: "The engine room. Defensive midfielders destroy, central midfielders control tempo, and attacking midfielders create opportunities.", posKey: "MF" },
      { name: "Forwards (ST, RW, LW)", desc: "The primary finishers. Strikers (ST) exist to score goals, while wingers (RW/LW) provide width, pace, and service from flanks.", posKey: "FW" }
    ]
  },
  {
    id: "phases-of-play",
    title: "Phases of Play",
    icon: Zap,
    image: "https://images.pexels.com/photos/31744929/pexels-photo-31744929.jpeg?auto=compress&cs=tinysrgb&w=1280",
    content: "Football is fluid, but managers break it down into four distinct phases. Understanding these transitions is key to decoding tactical matchups.",
    roles: [
      { name: "In Possession", desc: "When a team has the ball. Focuses on building up from the back, rotating positions, and creating direct overloads.", posKey: "MF" },
      { name: "Out of Possession", desc: "When defending. Teams drop into a compact low block or coordinate high pressing traps to force errors.", posKey: "DF" },
      { name: "Attacking Transition", desc: "The critical 5 seconds after winning the ball. Striking immediately on counter-attacks or securing possession.", posKey: "FW" },
      { name: "Defensive Transition", desc: "The critical 5 seconds after losing the ball. Pressing immediately to win it back or retreating into shape.", posKey: "GK" }
    ]
  },
  {
    id: "tactical-concepts",
    title: "Tactical Concepts",
    icon: Crosshair,
    image: "https://images.pexels.com/photos/200986/pexels-photo-200986.jpeg?auto=compress&cs=tinysrgb&w=1280",
    content: "Modern football is dominated by tactical innovations. Here are the core concepts that define how elite clubs structure their matches today.",
    roles: [
      { name: "High Pressing", desc: "Defending aggressively deep in the opponent's territory to disrupt their build-up close to their goal.", posKey: "DF" },
      { name: "The False 9", desc: "A forward who drops deep into midfield space, confusing centre-backs and creating numerical overloads.", posKey: "FW" },
      { name: "Inverted Full-backs", desc: "Full-backs who drift inside into central midfield roles when in possession, establishing a solid midfield shield.", posKey: "MF" },
      { name: "Overloads", desc: "Drawing the opponent's defensive blocks to one flank to release dynamic wingers in space on the opposite side.", posKey: "FW" }
    ]
  }
]

type PositionKey = "GK" | "DF" | "MF" | "FW"

const posCoordinates: Record<PositionKey, { top: string; left: string }> = {
  GK: { top: "85%", left: "50%" },
  DF: { top: "65%", left: "50%" },
  MF: { top: "45%", left: "50%" },
  FW: { top: "20%", left: "50%" },
}

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0)

  const currentSection = sections.find(s => s.id === activeSection)!
  const activeRole = currentSection.roles[selectedRoleIndex] || currentSection.roles[0]

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    setSelectedRoleIndex(0)
  }

  return (
    <main className="min-h-screen bg-canvas text-text relative overflow-hidden">
      <ShaderBackground />
      <div className="bg-noise" />
      <div className="scanlines animate-pulse" />

      {/* ─── Hero ─── */}
      <section className="relative w-full h-[55dvh] overflow-hidden bg-black border-b border-hairline flex items-end">
        <img
          src="https://images.pexels.com/photos/7005685/pexels-photo-7005685.jpeg?auto=compress&cs=tinysrgb&w=1280"
          alt="Football tactics board"
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale filter contrast-125"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
        <div className="container relative z-10 max-w-4xl ml-0 pb-16">
          <FadeUp>
            <span className="eyebrow text-accent flex items-center gap-2">
              <BookOpen size={16} /> Playbook & Rules
            </span>
          </FadeUp>
          <div className="mt-4">
            <TextReveal tag="h1" className="font-display text-[clamp(4rem,7vw,6.5rem)] uppercase leading-[0.85] tracking-tighter text-white">
              How to Read The Game
            </TextReveal>
          </div>
          <FadeUp delay={0.2}>
            <p className="mt-6 text-xl md:text-2xl font-editorial italic text-white/95 max-w-2xl border-l-4 border-accent pl-6 leading-relaxed">
              Watching football is easy. Reading football is an art. Understand the positions, the phases, and the tactics that define the modern game.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── Content Interface ─── */}
      <section className="section-padding bg-canvas/30 border-b border-hairline relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12">
            
            {/* Sidebar Navigation */}
            <div className="lg:sticky lg:top-32 self-start space-y-2">
              <FadeUp>
                <p className="eyebrow mb-6">Select Topic</p>
              </FadeUp>
              {sections.map((sec, i) => (
                <FadeUp key={sec.id} delay={i * 0.1}>
                  <button
                    onClick={() => handleSectionChange(sec.id)}
                    className={`w-full text-left px-6 py-4 rounded-xs font-display text-xl uppercase tracking-wider transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                      activeSection === sec.id
                        ? "bg-accent/15 border-accent text-accent"
                        : "bg-surface border-hairline text-text-muted hover:border-hairline-strong hover:text-text"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <sec.icon size={18} className={activeSection === sec.id ? "text-accent" : "text-text-muted"} />
                      {sec.title}
                    </span>
                    {activeSection === sec.id && <ArrowRight size={18} />}
                  </button>
                </FadeUp>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="min-h-[600px] relative">
              <AnimatePresence mode="wait">
                {sections.map((sec) => (
                  sec.id === activeSection && (
                    <motion.div
                      key={sec.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-surface border border-hairline overflow-hidden rounded-md"
                    >
                      {/* Section Image Banner */}
                      <div className="relative h-64 overflow-hidden border-b border-hairline">
                        <img
                          src={sec.image}
                          alt={sec.title}
                          className="w-full h-full object-cover opacity-50 grayscale filter contrast-125"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-8">
                          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white">{sec.title}</h2>
                        </div>
                      </div>

                      <div className="p-8 md:p-12">
                        <p className="text-xl text-text-body font-editorial italic leading-relaxed mb-12 max-w-3xl border-l-2 pl-4 border-white/20">
                          {sec.content}
                        </p>

                        <div className="grid lg:grid-cols-12 gap-8 items-start">
                          
                          {/* Role Cards List (Left Column) */}
                          <div className="lg:col-span-7 space-y-4">
                            {sec.roles.map((role, idx) => {
                              const isSelected = selectedRoleIndex === idx
                              return (
                                <button
                                  key={role.name}
                                  onClick={() => setSelectedRoleIndex(idx)}
                                  className={`w-full text-left p-6 border transition-all duration-300 flex items-start gap-4 rounded-xs cursor-pointer ${
                                    isSelected 
                                      ? "bg-surface-elevated border-accent shadow-[0_0_15px_rgba(204,255,0,0.1)]" 
                                      : "border-hairline hover:bg-surface-elevated/40"
                                  }`}
                                >
                                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 transition-transform ${
                                    isSelected ? "bg-accent scale-150" : "bg-text-faint"
                                  }`} />
                                  <div>
                                    <h3 className={`font-display text-2xl uppercase tracking-wider transition-colors ${
                                      isSelected ? "text-accent" : "text-white"
                                    }`}>
                                      {role.name}
                                    </h3>
                                    <p className="mt-2 text-sm text-text-body leading-relaxed">
                                      {role.desc}
                                    </p>
                                  </div>
                                </button>
                              )
                            })}
                          </div>

                          {/* Tactical Pitch Visualizer (Right Column) */}
                          <div className="lg:col-span-5 max-w-xs mx-auto w-full sticky top-32">
                            <div className="flex items-center gap-2 mb-4">
                              <Activity size={14} className="text-accent" />
                              <span className="eyebrow text-accent">Pitch Position</span>
                            </div>
                            <div className="tactical-pitch">
                              <div className="pitch-line pitch-line--center" />
                              <div className="pitch-circle" />
                              <div className="pitch-penalty pitch-penalty--top" />
                              <div className="pitch-penalty pitch-penalty--bottom" />

                              {/* Target position highlighted based on selection */}
                              {activeRole && (
                                <motion.div
                                  layout
                                  style={{
                                    top: posCoordinates[activeRole.posKey].top,
                                    left: posCoordinates[activeRole.posKey].left
                                  }}
                                  className="player-node active"
                                >
                                  {activeRole.posKey}
                                  <span className="player-label">{activeRole.name.split(" ")[0]}</span>
                                </motion.div>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

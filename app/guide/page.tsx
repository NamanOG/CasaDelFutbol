"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Shield, Crosshair, Zap, Navigation, ArrowRight } from "lucide-react"
import { FadeUp } from "@/components/motion/FadeUp"
import { TextReveal } from "@/components/motion/TextReveal"

const sections = [
  {
    id: "the-pitch",
    title: "The Pitch & Positions",
    icon: Navigation,
    image: "https://images.pexels.com/photos/31160100/pexels-photo-31160100.jpeg?auto=compress&cs=tinysrgb&w=1280",
    content: "A football pitch is roughly 100 meters long, but matches are won and lost in spaces no larger than a phone booth. The game is played by 11 players on each side, divided broadly into four roles.",
    roles: [
      { name: "Goalkeeper (GK)", desc: "The only player allowed to use their hands (inside the penalty box). The last line of defence and the first point of attack." },
      { name: "Defenders (CB, FB, WB)", desc: "Tasked with stopping the opposition. Centre-backs (CB) marshal the middle, while full-backs (FB) and wing-backs (WB) patrol the flanks." },
      { name: "Midfielders (DM, CM, AM)", desc: "The engine room. Defensive midfielders destroy, central midfielders control, and attacking midfielders create." },
      { name: "Forwards (ST, RW, LW)", desc: "The glory hunters. Strikers (ST) exist to score goals, while wingers (RW/LW) provide width, pace, and service." }
    ]
  },
  {
    id: "phases-of-play",
    title: "Phases of Play",
    icon: Zap,
    image: "https://images.pexels.com/photos/31744929/pexels-photo-31744929.jpeg?auto=compress&cs=tinysrgb&w=1280",
    content: "Football is fluid, but managers break it down into four distinct phases. Understanding these is the key to seeing the matrix of a football match.",
    roles: [
      { name: "In Possession", desc: "When a team has the ball. How do they build up? Do they pass patiently or play long balls?" },
      { name: "Out of Possession", desc: "When a team doesn't have the ball. Do they press high up the pitch, or drop deep into a low block?" },
      { name: "Attacking Transition", desc: "The crucial 5 seconds after winning the ball. Do they counter-attack immediately or secure possession?" },
      { name: "Defensive Transition", desc: "The crucial 5 seconds after losing the ball. Do they counter-press to win it back instantly, or retreat to shape?" }
    ]
  },
  {
    id: "tactical-concepts",
    title: "Tactical Concepts",
    icon: Crosshair,
    image: "https://images.pexels.com/photos/200986/pexels-photo-200986.jpeg?auto=compress&cs=tinysrgb&w=1280",
    content: "Modern football is dominated by buzzwords. Here are the core concepts that define how top teams play today.",
    roles: [
      { name: "High Pressing", desc: "Defending aggressively in the opponent's half to win the ball close to their goal." },
      { name: "The False 9", desc: "A centre-forward who drops deep into midfield, confusing defenders and creating overloads." },
      { name: "Inverted Full-backs", desc: "Full-backs who move into central midfield when their team has the ball, rather than overlapping down the wing." },
      { name: "Overloads", desc: "Creating numerical superiority (e.g., 3 vs 2) in a specific area of the pitch to break through the defence." }
    ]
  }
]

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState(sections[0].id)

  return (
    <main className="min-h-screen bg-canvas">
      {/* ─── Hero ─── */}
      <section className="page-hero border-b border-hairline">
        <img
          src="https://images.pexels.com/photos/7005685/pexels-photo-7005685.jpeg?auto=compress&cs=tinysrgb&w=1280"
          alt="Football tactics"
          className="page-hero__bg"
          loading="eager"
        />
        <div className="page-hero__overlay" />
        <div className="container relative z-10 max-w-4xl ml-0">
          <FadeUp>
            <span className="eyebrow text-accent flex items-center gap-2">
              <BookOpen size={16} /> BEGINNER'S GUIDE
            </span>
          </FadeUp>
          <div className="mt-6">
            <TextReveal tag="h1" className="text-display">How to Read The Game</TextReveal>
          </div>
          <FadeUp delay={0.2}>
            <p className="mt-8 text-body text-xl leading-relaxed max-w-2xl">
              Watching football is easy. Reading football is an art. Understand the positions, the phases, and the tactics that define the modern game.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── Content Interface ─── */}
      <section className="section-padding bg-surface border-b border-hairline relative">
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
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full text-left px-6 py-4 rounded-xs font-display text-xl uppercase tracking-wider transition-all duration-300 flex items-center justify-between border ${
                      activeSection === sec.id
                        ? "bg-accent/10 border-accent text-accent"
                        : "bg-surface-card border-hairline text-muted hover:border-hairline-strong hover:text-primary"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <sec.icon size={18} className={activeSection === sec.id ? "text-accent" : "text-faint"} />
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
                      className="card overflow-hidden"
                    >
                      {/* Section Image Banner */}
                      <div className="relative h-64 overflow-hidden border-b border-hairline">
                        <img
                          src={sec.image}
                          alt={sec.title}
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-8">
                          <h2 className="font-display text-4xl uppercase tracking-wider text-primary">{sec.title}</h2>
                        </div>
                      </div>

                      <div className="p-8 md:p-12">
                        <p className="text-xl text-body leading-relaxed mb-12 max-w-3xl">
                          {sec.content}
                        </p>

                        <div className="grid gap-6">
                          {sec.roles.map((role, i) => (
                            <motion.div
                              key={role.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + (i * 0.1) }}
                              className="p-6 rounded-xs border border-hairline bg-surface-elevated/50 group hover:border-accent/30 transition-colors"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                                <div>
                                  <h3 className="font-display text-xl uppercase tracking-wider text-primary group-hover:text-accent transition-colors">
                                    {role.name}
                                  </h3>
                                  <p className="mt-2 text-muted leading-relaxed">
                                    {role.desc}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
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

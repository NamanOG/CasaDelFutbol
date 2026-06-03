"use client"

import Link from "next/link"
import { ArrowRight, Brain, Clock3, Zap, Shield, Flame, Star } from "lucide-react"
import { motion } from "framer-motion"
import { allQuizConfigs } from "@/lib/data/quiz"
import { FadeUp } from "@/components/motion/FadeUp"
import { TextReveal } from "@/components/motion/TextReveal"

const difficultyConfig = {
  beginner: { icon: Shield, label: "Beginner", color: "var(--color-win-green)", class: "difficulty-badge--beginner" },
  intermediate: { icon: Flame, label: "Intermediate", color: "var(--color-draw-gold)", class: "difficulty-badge--intermediate" },
  expert: { icon: Star, label: "Expert", color: "var(--color-sale-red)", class: "difficulty-badge--expert" },
}

export default function QuizPage() {
  return (
    <main className="min-h-screen relative z-10">
      <div className="game-bg-blur" />
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      {/* ─── Hero ─── */}
      <section className="relative z-10 pt-32 pb-20 border-b border-white/10">
        <div className="container max-w-4xl ml-0">
          <FadeUp>
            <span className="eyebrow text-accent bg-accent/10 px-3 py-1 rounded-sm border border-accent/20">QUIZ LAB</span>
          </FadeUp>
          <div className="mt-6">
            <TextReveal tag="h1" className="font-display text-6xl md:text-8xl text-white uppercase tracking-wider drop-shadow-xl">Game Mode</TextReveal>
          </div>
          <FadeUp delay={0.2}>
            <p className="mt-8 text-white/70 text-xl leading-relaxed max-w-3xl">
              A highly immersive game interface for football memory. Test your knowledge under the lights with timed rounds, tactical clues, and instant feedback.
            </p>
          </FadeUp>
          <div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { icon: Clock3, label: "Timed rounds", desc: "30 seconds per question" },
              { icon: Brain, label: "Clue logic", desc: "Progressive reveal system" },
              { icon: Zap, label: "Fast feedback", desc: "Instant score animation" }
            ].map((item, index) => (
              <FadeUp key={item.label} delay={0.3 + index * 0.08}>
                <div className="game-card p-6 flex flex-col items-center text-center rounded-xl">
                  <item.icon className="text-accent drop-shadow-[0_0_10px_rgba(0,166,81,0.5)]" size={28} />
                  <p className="mt-4 font-display uppercase tracking-widest text-sm text-white">{item.label}</p>
                  <p className="mt-2 text-xs text-white/50">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Difficulty Overview ─── */}
      <section className="py-8 bg-black/40 border-b border-white/10 relative z-10 backdrop-blur-md">
        <div className="container">
          <FadeUp>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {(["beginner", "intermediate", "expert"] as const).map((diff) => {
                const cfg = difficultyConfig[diff]
                return (
                  <div key={diff} className={`difficulty-badge ${cfg.class} border-2 bg-transparent backdrop-blur-sm`}>
                    <cfg.icon size={14} />
                    {cfg.label}
                  </div>
                )
              })}
              <p className="text-white/50 text-sm">Select your tier before starting any challenge</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── Quiz Cards ─── */}
      <section className="section-padding relative z-10">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allQuizConfigs.map((quiz, index) => {
              const questionCount = quiz.slug === "guess-by-transfers"
                ? quiz.transferQuestions?.length ?? 0
                : quiz.questions.length

              return (
                <FadeUp key={quiz.slug} delay={index * 0.07} className="h-full">
                  <Link href={`/quiz/${quiz.slug}`} className="block h-full group perspective-1000">
                    <motion.article
                      whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
                      className="game-card relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/10 transition-shadow duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] group-hover:border-white/30"
                    >
                      {/* Card hero image */}
                      <div className="relative overflow-hidden aspect-[4/3] bg-black">
                        <img
                          src={quiz.heroImage}
                          alt={quiz.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                          <span className="text-2xl drop-shadow-md">{quiz.icon}</span>
                        </div>
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          <span className="font-display text-xl text-white leading-none">{questionCount} Qs</span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1 bg-black/40">
                        <div className={`difficulty-badge ${difficultyConfig[quiz.difficulty].class} self-start mb-4 border-2`}>
                          {difficultyConfig[quiz.difficulty].label}
                        </div>
                        <h2 className="font-display text-3xl uppercase tracking-wider text-white group-hover:text-accent transition-colors drop-shadow-md">
                          {quiz.name}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-white/60 flex-1">
                          {quiz.shortDescription}
                        </p>
                        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                          <p className="text-xs font-mono uppercase tracking-widest text-white/40">
                            {quiz.mechanics.split("·")[0]}
                          </p>
                          <span className="inline-flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full uppercase tracking-widest text-xs font-display opacity-80 group-hover:opacity-100 group-hover:bg-accent transition-all duration-300">
                            Play Now <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

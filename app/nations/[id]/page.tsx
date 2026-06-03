"use client"

import { nations } from "@/lib/data/nations"
import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp"
import { TextReveal } from "@/components/motion/TextReveal"
import { CountUp } from "@/components/motion/CountUp"

export default function NationDetailPage() {
  const params = useParams()
  const nation = nations.find((n) => n.slug === params.id)

  if (!nation) {
    notFound()
  }

  const flagGradient = nation.flagColors
    .filter(Boolean)
    .map((c, i, arr) => `${c} ${(i / (arr.length - 1)) * 100}%`)
    .join(", ")

  return (
    <main className="min-h-screen bg-canvas">
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
          className="absolute inset-0 w-full h-full object-cover opacity-15"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/30" />
        
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

          <TextReveal tag="h1" className="text-display">
            {nation.name}
          </TextReveal>

          <FadeUp delay={0.2}>
            <p className="max-w-2xl mt-8 text-body text-xl leading-relaxed">
              {nation.shortDescription}
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <blockquote className="max-w-xl pl-6 mt-10 border-l-2 border-accent text-muted italic text-lg leading-relaxed">
              "{nation.legendQuote}"
              <span className="block mt-4 not-italic font-display text-primary text-lg uppercase tracking-wider">
                — {nation.greatestLegend}
              </span>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-canvas border-b border-hairline py-12">
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
                  <div className="text-4xl font-display text-primary mb-2">
                    <CountUp target={stat.value} prefix={stat.prefix} />
                  </div>
                  <p className="eyebrow">{stat.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stadium Hero Band */}
      <section className="relative overflow-hidden min-h-[40vh] flex items-center border-b border-hairline">
        <img
          src={nation.heroImage}
          alt={`${nation.name} stadium`}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/60 to-transparent" />
        <div className="container relative z-10 py-16">
          <FadeUp>
            <span className="eyebrow text-accent mb-4 block">Golden Era</span>
            <h2 className="text-heading mb-8 text-primary max-w-xl">
              Their Greatest Moment
            </h2>
            <p className="max-w-2xl text-body text-lg leading-relaxed">
              {nation.goldenEra}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Football Identity */}
      <section className="section-padding bg-surface border-b border-hairline">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeUp>
              <div>
                <span className="eyebrow text-accent mb-4 block">Football Identity</span>
                <h2 className="text-heading mb-6 text-primary">
                  The {nation.name} Way
                </h2>
                <p className="text-body text-lg leading-relaxed">
                  {nation.footballIdentity}
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div>
                <span className="eyebrow text-accent mb-4 block">Style of Play</span>
                <h2 className="text-heading mb-6 text-primary">
                  How They Play
                </h2>
                <p className="text-body text-lg leading-relaxed">
                  {nation.styleOfPlay}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Legendary Players */}
      <section className="section-padding bg-canvas border-b border-hairline">
        <div className="container">
          <FadeUp>
            <span className="eyebrow text-accent mb-4 block">Legends</span>
            <h2 className="text-heading mb-10 text-primary">
              Icons of {nation.name}
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {nation.majorPlayers.map((player) => (
              <StaggerItem key={player}>
                <div className="card p-6 text-center group hover:border-accent/40">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-surface-elevated border border-hairline flex items-center justify-center font-display text-2xl text-accent">
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
      <section className="section-padding bg-surface border-b border-hairline">
        <div className="container">
          <FadeUp>
            <span className="eyebrow text-accent mb-4 block">Current Stars</span>
            <h2 className="text-heading mb-10 text-primary">
              Today's Best
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {nation.currentStars.map((player) => (
              <StaggerItem key={player}>
                <div className="card p-6 text-center group hover:border-accent/40">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-display text-xl text-accent">
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
      <section className="section-padding bg-canvas">
        <div className="container">
          <FadeUp>
            <div className="card p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <span className="eyebrow mb-4 block text-accent">Rivalry</span>
                  <p className="text-2xl font-display uppercase tracking-wider text-primary">
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

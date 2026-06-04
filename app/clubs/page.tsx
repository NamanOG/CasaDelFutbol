"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { leagues } from "@/lib/data/leagues"
import { TextReveal } from "@/components/motion/TextReveal"
import { StaggerContainer, StaggerItem, FadeUp } from "@/components/motion/FadeUp"
import { ScrollParallax } from "@/components/motion/ScrollParallax"
import { Trophy, Calendar } from "lucide-react"

interface ClubEntry {
  name: string
  city: string
  color: string
  stadium: string
  founded: number
  trophies: number
  leagueName: string
  leagueSlug: string
  leagueCountry: string
}

const allClubs: ClubEntry[] = leagues.flatMap((league) =>
  league.famousClubs.map((club) => ({
    ...club,
    leagueName: league.shortName,
    leagueSlug: league.slug,
    leagueCountry: league.country,
  }))
)

const filterOptions = ["All", ...leagues.map((l) => l.shortName)]

// A pool of high-quality editorial background images for the clubs
const bgPool = [
  "https://images.pexels.com/photos/31160100/pexels-photo-31160100.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/34649364/pexels-photo-34649364.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/31744929/pexels-photo-31744929.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/200986/pexels-photo-200986.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=800",
]

function ClubCard({ club, index }: { club: ClubEntry; index: number }) {
  // Make every 4th club a large feature card
  const isFeatured = index % 4 === 0 || index % 4 === 3
  const bgImage = bgPool[index % bgPool.length]

  return (
    <StaggerItem>
      <motion.article
        className={`premium-media-card relative group h-full flex flex-col ${
          isFeatured ? "md:row-span-2 aspect-[4/5] md:aspect-auto" : "row-span-1 aspect-square"
        }`}
      >
        {/* Dynamic Image Background */}
        <div className="absolute inset-0 bg-black">
          <style>{`
            .club-bg-${club.leagueSlug}-${index} { background-color: ${club.color}; }
            .club-tag-${club.leagueSlug}-${index} { background-color: ${club.color}; border-color: ${club.color}40; }
          `}</style>
          <img
            src={bgImage}
            alt="Stadium background"
            className="image-lift w-full h-full object-cover opacity-68"
            loading="lazy"
          />
          {/* Color Tint Overlay based on Club Color */}
          <div 
            className={`absolute inset-0 mix-blend-color opacity-30 group-hover:opacity-60 transition-opacity duration-500 club-bg-${club.leagueSlug}-${index}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className={`relative z-10 p-6 flex flex-col h-full justify-end ${isFeatured ? "p-8 md:p-12" : ""}`}>
          <div className="mb-auto">
            <span 
              className={`inline-block px-3 py-1 font-mono text-xs uppercase tracking-widest text-canvas border backdrop-blur-md rounded-md club-tag-${club.leagueSlug}-${index}`}
            >
              {club.leagueName}
            </span>
          </div>

          <div className="mt-8">
            <h3 className={`font-display uppercase tracking-tight text-white leading-none ${isFeatured ? 'text-5xl md:text-6xl' : 'text-3xl'}`}>
              {club.name}
            </h3>
            
            <div className={`mt-4 flex flex-wrap gap-4 text-white/70 font-mono uppercase tracking-widest ${isFeatured ? 'text-sm' : 'text-xs'}`}>
              <div className="flex items-center gap-2">
                <Trophy size={isFeatured ? 16 : 14} className="text-accent" />
                <span>{club.trophies} Titles</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={isFeatured ? 16 : 14} />
                <span>Est. {club.founded}</span>
              </div>
            </div>
            
            {isFeatured && (
              <p className="mt-4 text-white/60 text-sm md:text-base font-body italic max-w-sm">
                Playing out of {club.city}, creating history at the {club.stadium}.
              </p>
            )}
          </div>
        </div>
      </motion.article>
    </StaggerItem>
  )
}

export default function ClubsPage() {
  const [selectedLeague, setSelectedLeague] = useState<string>("All")

  const filteredClubs = useMemo(() => {
    if (selectedLeague === "All") return allClubs
    return allClubs.filter((club) => club.leagueName === selectedLeague)
  }, [selectedLeague])

  return (
    <main className="min-h-screen bg-canvas text-text">
      {/* ─── MASSIVE MEDIA HERO ─── */}
      <section className="premium-hero relative w-full overflow-hidden">
        <ScrollParallax className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img
            src="https://images.pexels.com/photos/34649364/pexels-photo-34649364.jpeg?auto=compress&cs=tinysrgb&w=2560"
            alt="Santiago Bernabéu stadium"
            className="w-full h-full object-cover opacity-72"
            loading="eager"
          />
        </ScrollParallax>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 z-10">
          <div className="max-w-5xl">
            <FadeUp>
              <span className="eyebrow world-cup-eyebrow tracking-[0.3em] uppercase block mb-4">Institutions</span>
            </FadeUp>
            <TextReveal tag="h1" className="font-display text-[clamp(4rem,8vw,6rem)] uppercase leading-[0.85] tracking-tight text-white">
              The Greatest Clubs
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl border-l-4 world-cup-line pl-6 font-body italic">
                Club football is the beating heart of the game. These institutions carry the dreams of millions, forging identities that transcend generations.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── LEAGUE FILTER ─── */}
      <section className="sticky top-0 z-40 bg-canvas/80 backdrop-blur-xl border-b border-hairline py-4">
        <div className="container">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
            {filterOptions.map((option) => {
              const isActive = selectedLeague === option
              return (
                <button
                  key={option}
                  onClick={() => setSelectedLeague(option)}
                  className={`
                    whitespace-nowrap px-6 py-3 text-sm font-display uppercase tracking-widest rounded-lg border
                    transition-all duration-300 cursor-pointer
                    ${isActive
                      ? "bg-text text-canvas border-text shadow-[0_14px_28px_-22px_var(--color-primary-blue)]"
                      : "bg-surface/80 text-text-muted border-hairline hover:bg-surface-elevated hover:text-text"
                    }
                  `}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL MASONRY GRID ─── */}
      <section className="section-padding bg-canvas min-h-screen">
        <div className="container">
          <FadeUp>
            <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-12 border-b border-hairline pb-4">
              Showing {filteredClubs.length} {filteredClubs.length === 1 ? "institution" : "institutions"}
            </p>
          </FadeUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLeague}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {filteredClubs.length > 0 ? (
                <StaggerContainer
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr"
                >
                  {filteredClubs.map((club, idx) => (
                    <ClubCard key={`${club.leagueSlug}-${club.name}`} club={club} index={idx} />
                  ))}
                </StaggerContainer>
              ) : (
                <FadeUp>
                  <div className="premium-soft-panel flex flex-col items-center justify-center py-32 px-6">
                    <p className="font-display text-4xl uppercase tracking-wider text-text-muted mb-4">Empty Archive</p>
                    <p className="text-text-body font-body italic text-xl max-w-sm text-center">
                      No clubs match the selected league filter.
                    </p>
                    <button onClick={() => setSelectedLeague("All")} className="btn-secondary mt-8">
                      Reset Filter
                    </button>
                  </div>
                </FadeUp>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

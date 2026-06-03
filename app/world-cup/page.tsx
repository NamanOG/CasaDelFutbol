"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, MapPin, Check, X, RotateCcw, Play, HelpCircle, ChevronRight } from "lucide-react"
import { fetchWorldCupMatches, MatchData } from "@/lib/api/football"
import confetti from "canvas-confetti"

// Helper to get FlagCDN URLs for FIFA codes
const getFlagUrl = (code: string) => {
  const codeLower = code.toUpperCase();
  const fifaToIso: Record<string, string> = {
    ARG: "ar", BRA: "br", CAN: "ca", CRO: "hr", ENG: "gb-eng", ESP: "es",
    GER: "de", ITA: "it", MAR: "ma", MEX: "mx", NED: "nl", POR: "pt",
    USA: "us", URU: "uy", KOR: "kr", SEN: "sn", CMR: "cm", NZL: "nz",
    IRN: "ir", WAL: "gb-wls", KSA: "sa", POL: "pl", BEL: "be", AUS: "au",
    JPN: "jp", CRC: "cr", SUI: "ch", SRB: "rs", GHA: "gh", TUN: "tn",
    ECU: "ec", FRA: "fr"
  };
  const iso = fifaToIso[codeLower] || "un";
  if (iso === "gb-eng" || iso === "gb-wls") {
    return `https://flagcdn.com/w80/${iso}.png`;
  }
  return `https://flagcdn.com/w80/${iso.toLowerCase()}.png`;
}

// FlagImage Component
const FlagImage = ({ code, className = "w-10 h-7 object-cover shadow-md border border-white/10" }: { code: string, className?: string }) => {
  return (
    <img 
      src={getFlagUrl(code)} 
      alt={code} 
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://placehold.co/80x50/111/fff?text=${code}`;
      }}
    />
  );
}

// Stadium Data
interface Stadium {
  id: string
  name: string
  city: string
  country: string
  capacity: number
  built: number
  imageUrl: string
  majorMatches: string[]
}

const stadiums: Stadium[] = [
  {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    capacity: 87523,
    built: 1966,
    imageUrl: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1280",
    majorMatches: ["Opening Match (June 11)", "Group Stage (4 matches)", "Round of 32", "Round of 16"]
  },
  {
    id: "metlife",
    name: "MetLife Stadium",
    city: "New York/New Jersey",
    country: "USA",
    capacity: 82500,
    built: 2010,
    imageUrl: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1280",
    majorMatches: ["World Cup Final (July 19)", "Group Stage (5 matches)", "Round of 32", "Round of 16", "Semifinal"]
  },
  {
    id: "sofi",
    name: "SoFi Stadium",
    city: "Los Angeles",
    country: "USA",
    capacity: 70240,
    built: 2020,
    imageUrl: "https://images.pexels.com/photos/2070008/pexels-photo-2070008.jpeg?auto=compress&cs=tinysrgb&w=1280",
    majorMatches: ["USA Opening Match (June 12)", "Group Stage (5 matches)", "Round of 32", "Quarterfinal"]
  },
  {
    id: "bcplace",
    name: "BC Place",
    city: "Vancouver",
    country: "Canada",
    capacity: 54500,
    built: 1983,
    imageUrl: "https://images.pexels.com/photos/4673433/pexels-photo-4673433.jpeg?auto=compress&cs=tinysrgb&w=1280",
    majorMatches: ["Canada Opening Match (June 12)", "Group Stage (5 matches)", "Round of 32", "Round of 16"]
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz Stadium",
    city: "Atlanta",
    country: "USA",
    capacity: 71000,
    built: 2017,
    imageUrl: "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=1280",
    majorMatches: ["Group Stage (5 matches)", "Round of 32", "Round of 16", "Semifinal"]
  },
  {
    id: "hardrock",
    name: "Hard Rock Stadium",
    city: "Miami",
    country: "USA",
    capacity: 64767,
    built: 1987,
    imageUrl: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1280",
    majorMatches: ["Bronze Final (July 18)", "Group Stage (4 matches)", "Round of 32", "Quarterfinal"]
  }
]

// Group Stage Initial Data
interface GroupTeam {
  name: string
  flag: string
  code: string
  pts: number
  pld: number
  w: number
  d: number
  l: number
  gf: number
  ga: number
  strength: number
}

const initialGroups: Record<string, GroupTeam[]> = {
  A: [
    { name: "Mexico", flag: "🇲🇽", code: "MEX", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.8 },
    { name: "Croatia", flag: "🇭🇷", code: "CRO", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.2 },
    { name: "Cameroon", flag: "🇨🇲", code: "CMR", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.2 },
    { name: "New Zealand", flag: "🇳🇿", code: "NZL", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 0.8 }
  ],
  B: [
    { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "ENG", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.8 },
    { name: "United States", flag: "🇺🇸", code: "USA", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.0 },
    { name: "Iran", flag: "🇮🇷", code: "IRN", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.0 },
    { name: "Wales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", code: "WAL", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.1 }
  ],
  C: [
    { name: "Belgium", flag: "🇧🇪", code: "BEL", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.1 },
    { name: "Morocco", flag: "🇲🇦", code: "MAR", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.3 },
    { name: "Canada", flag: "🇨🇦", code: "CAN", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.7 },
    { name: "Saudi Arabia", flag: "🇸🇦", code: "KSA", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 0.9 }
  ],
  D: [
    { name: "Argentina", flag: "🇦🇷", code: "ARG", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 3.0 },
    { name: "France", flag: "🇫🇷", code: "FRA", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 3.0 },
    { name: "Poland", flag: "🇵🇱", code: "POL", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.5 },
    { name: "Australia", flag: "🇦🇺", code: "AUS", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.1 }
  ],
  E: [
    { name: "Germany", flag: "🇩🇪", code: "GER", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.5 },
    { name: "Spain", flag: "🇪🇸", code: "ESP", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.6 },
    { name: "Japan", flag: "🇯🇵", code: "JPN", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.9 },
    { name: "Costa Rica", flag: "🇨🇷", code: "CRC", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 0.9 }
  ],
  F: [
    { name: "Brazil", flag: "🇧🇷", code: "BRA", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.9 },
    { name: "Switzerland", flag: "🇨🇭", code: "SUI", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.8 },
    { name: "Serbia", flag: "🇷🇸", code: "SRB", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.4 },
    { name: "Ghana", flag: "🇬🇭", code: "GHA", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.2 }
  ],
  G: [
    { name: "Portugal", flag: "🇵🇹", code: "POR", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.7 },
    { name: "Uruguay", flag: "🇺🇾", code: "URU", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.0 },
    { name: "South Korea", flag: "🇰🇷", code: "KOR", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.6 },
    { name: "Senegal", flag: "🇸🇳", code: "SEN", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.8 }
  ],
  H: [
    { name: "Netherlands", flag: "🇳🇱", code: "NED", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.4 },
    { name: "Italy", flag: "🇮🇹", code: "ITA", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 2.3 },
    { name: "Ecuador", flag: "🇪🇨", code: "ECU", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.5 },
    { name: "Tunisia", flag: "🇹🇳", code: "TUN", pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, strength: 1.1 }
  ]
}

// Trivia Data
interface TriviaQuestion {
  question: string
  options: string[]
  answerIdx: number
  trivia: string
}

const triviaQuestions: TriviaQuestion[] = [
  {
    question: "Which nation won the first ever World Cup in 1930?",
    options: ["Argentina", "Brazil", "Uruguay", "Italy"],
    answerIdx: 2,
    trivia: "Uruguay hosted and won the inaugural FIFA World Cup in 1930, defeating Argentina 4-2 in the final at Estadio Centenario in Montevideo."
  },
  {
    question: "Who is the all-time top goalscorer in World Cup history?",
    options: ["Pelé (Brazil)", "Miroslav Klose (Germany)", "Ronaldo (Brazil)", "Just Fontaine (France)"],
    answerIdx: 1,
    trivia: "Miroslav Klose scored 16 goals across four World Cup tournaments (2002-2014) to claim the ultimate scoring title."
  },
  {
    question: "Which nation has won the most World Cup tournaments?",
    options: ["Germany", "Italy", "Argentina", "Brazil"],
    answerIdx: 3,
    trivia: "Brazil has won a record five FIFA World Cup titles (1958, 1962, 1970, 1994, 2002) and is the only nation to play in every tournament."
  },
  {
    question: "Who won the Best Young Player award at the 2018 World Cup?",
    options: ["Kylian Mbappé", "Luka Modrić", "Harry Kane", "Paul Pogba"],
    answerIdx: 0,
    trivia: "Kylian Mbappé, aged 19, scored four goals at the 2018 World Cup in Russia, including one in the final, winning the Best Young Player award."
  }
]

// Flag-colored team gradient strips
const teamColors: Record<string, string> = {
  ARG: "from-sky-400 to-white",
  BRA: "from-yellow-400 to-green-600",
  CAN: "from-red-600 to-white",
  CRO: "from-red-600 to-blue-700",
  ENG: "from-white to-red-600",
  ESP: "from-red-600 to-yellow-500",
  GER: "from-black to-red-600",
  ITA: "from-blue-600 to-white",
  MAR: "from-red-600 to-green-800",
  MEX: "from-green-600 to-red-600",
  NED: "from-orange-500 to-white",
  POR: "from-red-600 to-green-700",
  USA: "from-blue-800 to-red-600",
  URU: "from-sky-400 to-white",
  KOR: "from-red-600 to-blue-800",
  SEN: "from-green-600 to-red-600",
  CMR: "from-green-600 to-red-600",
  NZL: "from-black to-gray-800",
  IRN: "from-green-600 to-red-600",
  WAL: "from-red-600 to-green-600",
  KSA: "from-green-700 to-white",
  POL: "from-white to-red-600",
  BEL: "from-black to-yellow-500",
  AUS: "from-yellow-400 to-green-800",
  JPN: "from-white to-red-600",
  CRC: "from-red-600 to-blue-800",
  SUI: "from-red-600 to-white",
  SRB: "from-red-600 to-blue-800",
  GHA: "from-red-600 to-yellow-500",
  TUN: "from-red-600 to-white",
  ECU: "from-yellow-400 to-blue-800",
  FRA: "from-blue-800 to-red-600"
}

export default function WorldCupPage() {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null)
  
  // Matches state
  const [matches, setMatches] = useState<MatchData[]>([])
  const [loadingMatches, setLoadingMatches] = useState(true)

  // Simulation state
  const [simulatingMatchId, setSimulatingMatchId] = useState<string | null>(null)
  const [goalAlert, setGoalAlert] = useState<Record<string, string>>({})

  // Group state
  const [groups, setGroups] = useState<Record<string, GroupTeam[]>>(initialGroups)
  const [selectedGroupTab, setSelectedGroupTab] = useState<string>("A")
  const [groupSimulated, setGroupSimulated] = useState<Record<string, boolean>>({})

  // Stadium Modal state
  const [activeStadium, setActiveStadium] = useState<Stadium | null>(null)

  // Trivia state
  const [currentTriviaIdx, setCurrentTriviaIdx] = useState(0)
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<number | null>(null)
  const [triviaStatus, setTriviaStatus] = useState<"unanswered" | "correct" | "incorrect">("unanswered")

  // Target Date: June 11, 2026 18:00 UTC
  const targetDateStr = "2026-06-11T18:00:00Z"

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDateStr) - +new Date()
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    const getMatches = async () => {
      try {
        const data = await fetchWorldCupMatches()
        setMatches(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingMatches(false)
      }
    }
    getMatches()

    return () => clearInterval(timer)
  }, [])

  // Trivia validation
  const handleTriviaAnswer = (optionIdx: number) => {
    if (triviaStatus !== "unanswered") return
    setSelectedTriviaOption(optionIdx)
    const q = triviaQuestions[currentTriviaIdx]
    if (optionIdx === q.answerIdx) {
      setTriviaStatus("correct")
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      })
    } else {
      setTriviaStatus("incorrect")
    }
  }

  const handleNextTrivia = () => {
    setSelectedTriviaOption(null)
    setTriviaStatus("unanswered")
    setCurrentTriviaIdx((prev) => (prev + 1) % triviaQuestions.length)
  }

  // Scoreboard simulation
  const simulateLiveMatch = (matchId: string) => {
    if (simulatingMatchId) return
    setSimulatingMatchId(matchId)

    const matchToSimulate = matches.find(m => m.id === matchId)
    if (!matchToSimulate) return

    let currentHomeScore = matchToSimulate.homeScore === "-" ? 0 : parseInt(matchToSimulate.homeScore)
    let currentAwayScore = matchToSimulate.awayScore === "-" ? 0 : parseInt(matchToSimulate.awayScore)

    let ticks = 0
    const maxTicks = 6

    const interval = setInterval(() => {
      ticks++

      const rand = Math.random()
      
      // Update probabilities slightly
      setMatches(prev => prev.map(m => {
        if (m.id === matchId) {
          const shift = Math.floor(Math.random() * 5) - 2
          const homeProb = Math.max(10, Math.min(80, m.homeWinProb + shift))
          const awayProb = Math.max(10, Math.min(80, m.awayWinProb - shift))
          return {
            ...m,
            homeWinProb: homeProb,
            awayWinProb: awayProb,
            drawProb: 100 - homeProb - awayProb
          }
        }
        return m
      }))

      if (rand < 0.25) {
        currentHomeScore++
        setMatches(prev => prev.map(m => m.id === matchId ? { ...m, homeScore: String(currentHomeScore), status: "LIVE" } : m))
        setGoalAlert(prev => ({ ...prev, [matchId]: `⚽ GOAL FOR ${matchToSimulate.home}! (${currentHomeScore} - ${currentAwayScore})` }))
        confetti({ particleCount: 20, colors: ["#00a651", "#ffffff"], spread: 30 })
      } else if (rand < 0.5) {
        currentAwayScore++
        setMatches(prev => prev.map(m => m.id === matchId ? { ...m, awayScore: String(currentAwayScore), status: "LIVE" } : m))
        setGoalAlert(prev => ({ ...prev, [matchId]: `⚽ GOAL FOR ${matchToSimulate.away}! (${currentHomeScore} - ${currentAwayScore})` }))
        confetti({ particleCount: 20, colors: ["#ccff00", "#ffffff"], spread: 30 })
      }

      if (ticks >= maxTicks) {
        clearInterval(interval)
        setSimulatingMatchId(null)
        setMatches(prev => prev.map(m => m.id === matchId ? { ...m, status: "FT", time: "FT" } : m))
        setGoalAlert(prev => ({ ...prev, [matchId]: `🏁 FULL TIME (${currentHomeScore} - ${currentAwayScore})` }))
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } })
      }
    }, 2000)
  }

  // Group standings simulator
  const simulateGroupStage = (groupLetter: string) => {
    const groupTeams = [...groups[groupLetter]]
    
    groupTeams.forEach(t => {
      t.pts = 0; t.pld = 0; t.w = 0; t.d = 0; t.l = 0; t.gf = 0; t.ga = 0
    })

    const playMatch = (t1Idx: number, t2Idx: number) => {
      const t1 = groupTeams[t1Idx]
      const t2 = groupTeams[t2Idx]

      const g1 = Math.floor(Math.random() * (t1.strength * 2.2))
      const g2 = Math.floor(Math.random() * (t2.strength * 2.2))

      t1.pld++
      t2.pld++
      t1.gf += g1
      t1.ga += g2
      t2.gf += g2
      t2.ga += g1

      if (g1 > g2) {
        t1.w++
        t1.pts += 3
        t2.l++
      } else if (g2 > g1) {
        t2.w++
        t2.pts += 3
        t1.l++
      } else {
        t1.d++
        t1.pts += 1
        t2.d++
        t2.pts += 1
      }
    }

    playMatch(0, 1)
    playMatch(2, 3)
    playMatch(0, 2)
    playMatch(1, 3)
    playMatch(0, 3)
    playMatch(1, 2)

    groupTeams.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts
      const gdA = a.gf - a.ga
      const gdB = b.gf - b.ga
      if (gdB !== gdA) return gdB - gdA
      return b.gf - a.gf
    })

    setGroups(prev => ({ ...prev, [groupLetter]: groupTeams }))
    setGroupSimulated(prev => ({ ...prev, [groupLetter]: true }))
    
    confetti({
      particleCount: 40,
      colors: ["#d4af37", "#00a651", "#ffffff"],
      spread: 40
    })
  }

  const resetGroupStage = (groupLetter: string) => {
    setGroups(prev => ({
      ...prev,
      [groupLetter]: initialGroups[groupLetter].map(t => ({ ...t, pts: 0, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 }))
    }))
    setGroupSimulated(prev => ({ ...prev, [groupLetter]: false }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-emerald-50 via-sky-50 to-amber-50 text-slate-800 dark:from-[#081812] dark:via-[#091b29] dark:to-[#170a21] dark:text-slate-100 font-body relative overflow-hidden pt-20">
      {/* Dynamic Background Blur Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-amber-400/20 dark:bg-amber-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[38rem] h-[38rem] rounded-full bg-sky-400/20 dark:bg-sky-500/10 blur-[120px] pointer-events-none" />

      {/* ─── MASSIVE ELEGANT HERO COUNTDOWN ─── */}
      <section className="relative w-full min-h-[88vh] flex flex-col justify-center items-center px-6 md:px-12 border-b border-white/10 py-20 overflow-hidden">
        {/* Full-bleed high-contrast premium stadium video background */}
        <video 
          src="https://videos.pexels.com/video-files/3180026/3180026-uhd_2560_1440_25fps.mp4"
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/images/hero_stadium_background_1780508090979.png"
          className="absolute inset-0 w-full h-full object-cover opacity-75 dark:opacity-40 transition-opacity duration-1000"
          suppressHydrationWarning
        />
        
        {/* Colorful Animated Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-amber-500/20 to-blue-500/20 dark:from-emerald-500/10 dark:via-amber-500/10 dark:to-blue-500/10 mix-blend-color-dodge dark:mix-blend-normal" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-50/90 dark:to-[#081812]" />
 
        <div className="relative z-10 text-center max-w-5xl flex flex-col items-center">
          {/* Floating Gold FIFA Trophy visual element */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative w-36 h-36 md:w-44 md:h-44 drop-shadow-[0_0_35px_rgba(212,175,55,0.4)] mb-4"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida/AP1WRLuDKeknpchRDRptpsikp9blH6Y6Kslek8OV2IOuB0rejGJKyDy-R19gSifWQ6dDQQCMStoESqN8PuBAXzTOR77gx7on56HT0SOzkTH5jsQ75U6U7AL4qd_AdCPADQRED07agc0tV28C1Nn9L9mpHCDO7fmpDDvE07wTGiWd3Wg6P36sskkQ56TuOEzyUTEDLUXBgmzJiJWYSiZ7Jbp8TQEuAG84kEa0Y0_QuIpkaakbyxPbs8kArKI-xzQ" 
              alt="FIFA World Cup Trophy" 
              className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_6px_12px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
 
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.8] uppercase tracking-tighter text-slate-800 dark:text-white font-black"
          >
            WORLD CUP <br />
            <span className="bg-gradient-to-r from-[#d4af37] via-[#0055ff] to-[#00a651] bg-clip-text text-transparent">2026</span>
          </motion.h1>
 
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-200 font-editorial italic max-w-xl text-center leading-relaxed font-semibold"
          >
            Three host nations. 48 global contenders. The greatest spectacle in sport lands in North America. The countdown has begun.
          </motion.p>
 
          {/* Elegant Glassmorphic Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 w-full max-w-2xl p-6 md:p-8 rounded-none border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 via-[#0055ff]/5 to-[#00a651]/5 opacity-50" />
            {timeLeft ? (
              <div className="grid grid-cols-4 gap-4 divide-x divide-white/20 dark:divide-white/10 relative z-10">
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.minutes },
                  { label: "Secs", val: timeLeft.seconds }
                ].map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center px-2">
                    <span className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-800 dark:text-white select-all">
                      {String(col.val).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted mt-2 tracking-widest uppercase font-semibold">
                      {col.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-4">
                <div className="w-6 h-6 border border-t-transparent border-[#d4af37] rounded-none animate-spin" />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── LIVE MATCH CENTER ─── */}
      <section className="py-24 border-b border-white/10 bg-transparent">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div>
              <span className="text-emerald-500 dark:text-emerald-400 text-xs font-mono uppercase tracking-[0.2em] mb-3 block">MATCH CENTER</span>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-text font-bold">OPENING FIXTURES</h2>
            </div>
            <p className="text-text-muted font-sans text-sm max-w-md mt-4 md:mt-0 leading-relaxed border-l border-white/10 pl-6">
              Track real-time schedules and simulated fixture events. Select a match to run statistical algorithms and update score analytics.
            </p>
          </motion.div>

          {loadingMatches ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border border-t-transparent border-[#d4af37] rounded-none animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {matches.map((match) => {
                const isSimulating = simulatingMatchId === match.id
                const alert = goalAlert[match.id]

                return (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`bg-white/80 dark:bg-white/[0.04] backdrop-blur-lg border rounded-none p-8 transition-all duration-300 relative overflow-hidden group/card shadow-xl ${
                      isSimulating 
                        ? "border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.25)]" 
                        : "border-white/20 dark:border-white/10 hover:border-emerald-500 hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_20px_40px_rgba(16,185,129,0.08)]"
                    }`}
                  >
                    {/* Glowing Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                    {/* Synchronized simulation progress bar */}
                    {isSimulating && (
                      <div className="absolute bottom-0 left-0 h-[4px] bg-slate-200 dark:bg-white/10 w-full">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-amber-400"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 12, ease: "linear" }}
                        />
                      </div>
                    )}

                    {/* Goal Alert Overlay */}
                    {alert && (
                      <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-[10px] uppercase font-bold tracking-widest text-center py-1.5 z-10 shadow-sm">
                        {alert}
                      </div>
                    )}

                    {/* Stage Header */}
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                      <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase font-semibold">
                        {match.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-widest rounded-none ${
                          match.status === "LIVE" ? "bg-[#d4af37]/20 text-[#d4af37]" :
                          match.status === "FT" ? "bg-text/10 text-text" : "bg-white/10 dark:bg-white/[0.04] text-text-muted"
                        }`}>
                          {match.status}
                        </span>
                        {match.status === "LIVE" && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-text-muted font-semibold">{match.time}</span>
                      </div>
                    </div>

                    {/* Score Panel */}
                    <div className="grid grid-cols-7 items-center justify-center my-8">
                      {/* Home */}
                      <div className="col-span-2 text-center flex flex-col items-center justify-center">
                        <div className="mb-3 hover:scale-105 transition-transform duration-300">
                          <FlagImage code={match.home} className="w-14 h-9 object-cover shadow-lg border border-white/20 rounded-sm" />
                        </div>
                        <span className="font-heading text-lg font-bold text-text tracking-wide block leading-tight">{match.home}</span>
                        <div className="flex justify-center mt-1.5">
                          <div className={`w-8 h-1 bg-gradient-to-r ${teamColors[match.home] || "from-gray-400 to-gray-600"} rounded-full shadow-sm`} />
                        </div>
                        <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest block mt-2 font-semibold">HOST</span>
                      </div>

                      {/* VS / Score */}
                      <div className="col-span-3 text-center flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-5">
                          <span className="font-display text-5xl md:text-6xl text-text font-bold select-all">
                            {match.homeScore}
                          </span>
                          <span className="font-mono text-text-muted text-2xl font-bold">-</span>
                          <span className="font-display text-5xl md:text-6xl text-text font-bold select-all">
                            {match.awayScore}
                          </span>
                        </div>
                      </div>

                      {/* Away */}
                      <div className="col-span-2 text-center flex flex-col items-center justify-center">
                        <div className="mb-3 hover:scale-105 transition-transform duration-300">
                          <FlagImage code={match.away} className="w-14 h-9 object-cover shadow-lg border border-white/20 rounded-sm" />
                        </div>
                        <span className="font-heading text-lg font-bold text-text tracking-wide block leading-tight">{match.away}</span>
                        <div className="flex justify-center mt-1.5">
                          <div className={`w-8 h-1 bg-gradient-to-r ${teamColors[match.away] || "from-gray-400 to-gray-600"} rounded-full shadow-sm`} />
                        </div>
                        <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest block mt-2 font-semibold">VISITOR</span>
                      </div>
                    </div>

                    {/* Editorial Summary */}
                    <p className="text-xs text-text-body font-sans italic border-t border-white/10 pt-5 mb-8 leading-relaxed">
                      {match.desc}
                    </p>

                    {/* Minimalist Probability Info */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-text-muted border-t border-white/10 pt-5">
                      <span>EST. OUTCOME</span>
                      <span className="text-text font-semibold">
                        {match.home} {match.homeWinProb}%  •  DRAW {match.drawProb}%  •  {match.away} {match.awayWinProb}%
                      </span>
                    </div>

                    {/* Simulated Play Trigger */}
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => simulateLiveMatch(match.id)}
                        disabled={isSimulating || match.status === "FT"}
                        className={`text-xs font-mono uppercase tracking-widest px-5 py-2.5 border rounded-none flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                          match.status === "FT"
                            ? "border-white/10 text-text-muted/30 bg-white/5 cursor-not-allowed"
                            : isSimulating
                              ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5 cursor-wait"
                              : "border-text text-text hover:bg-text hover:text-canvas hover:scale-[1.02]"
                        }`}
                      >
                        {isSimulating ? (
                          "SIMULATING..."
                        ) : match.status === "FT" ? (
                          "COMPLETED"
                        ) : (
                          <>
                            <Play size={10} fill="currentColor" />
                            SIMULATE FIXTURE
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── GROUP STANDINGS SIMULATOR ─── */}
      <section className="py-24 border-b border-white/10 bg-transparent">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center md:text-left"
          >
            <span className="text-emerald-500 dark:text-emerald-400 text-xs font-mono uppercase tracking-[0.2em] mb-3 block">TOURNAMENT COMPOSITION</span>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-text font-bold">GROUP SANDBOX</h2>
            <p className="mt-4 text-text-muted max-w-2xl text-sm leading-relaxed">
              Explore national seedings and simulate round-robin tables. Click <strong>Simulate Group</strong> to generate weighted outcomes and trigger layout sorting transitions.
            </p>
          </motion.div>

          {/* Group Navigation tabs */}
          <div className="flex overflow-x-auto gap-2 border-b border-white/10 pb-0 mb-12 scrollbar-hide">
            {Object.keys(groups).map((group) => {
              const active = selectedGroupTab === group
              const simulated = groupSimulated[group]
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroupTab(group)}
                  className={`px-6 py-4 font-heading text-sm tracking-widest uppercase transition-all duration-200 cursor-pointer border-b-2 min-w-[80px] rounded-none ${
                    active
                      ? "border-amber-400 bg-white/20 dark:bg-white/10 text-text font-bold"
                      : "border-transparent text-text-muted hover:text-text"
                  }`}
                >
                  Group {group}
                  {simulated && <span className="ml-1 text-emerald-500 font-mono text-[9px] font-bold">•</span>}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Table */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-white/80 dark:bg-white/[0.04] backdrop-blur-lg border border-white/20 dark:border-white/10 p-6 md:p-8 rounded-none overflow-x-auto shadow-xl"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <span className="font-heading text-lg font-bold uppercase tracking-wider text-text">
                  Group {selectedGroupTab} Table
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => simulateGroupStage(selectedGroupTab)}
                    className="text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-none transition-colors cursor-pointer uppercase tracking-widest shadow-md hover:shadow-emerald-500/20"
                  >
                    Simulate Group
                  </button>
                  {groupSimulated[selectedGroupTab] && (
                    <button
                      onClick={() => resetGroupStage(selectedGroupTab)}
                      className="p-2.5 border border-white/20 dark:border-white/10 hover:border-text-muted text-text bg-white/10 dark:bg-white/[0.04] transition-colors cursor-pointer rounded-none"
                      title="Reset Standings"
                    >
                      <RotateCcw size={12} />
                    </button>
                  )}
                </div>
              </div>

              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-text-muted text-[10px] tracking-wider uppercase">
                    <th className="py-4 px-2">POS</th>
                    <th className="py-4 px-2">TEAM</th>
                    <th className="py-4 px-2 text-center">PLD</th>
                    <th className="py-4 px-2 text-center">W</th>
                    <th className="py-4 px-2 text-center">D</th>
                    <th className="py-4 px-2 text-center">L</th>
                    <th className="py-4 px-2 text-center">GD</th>
                    <th className="py-4 px-2 text-right">PTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <AnimatePresence initial={false}>
                    {groups[selectedGroupTab].map((team, idx) => {
                      const isPromoted = idx < 2
                      return (
                        <motion.tr
                          key={team.code}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className={`hover:bg-white/10 dark:hover:bg-white/[0.03] transition-colors ${
                            isPromoted ? "border-l-4 border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/[0.02]" : ""
                          }`}
                        >
                          <td className="py-4 px-2 font-bold">
                            <span className={idx < 2 ? "text-emerald-500 font-bold" : "text-text-muted"}>
                              {idx + 1}
                            </span>
                          </td>
                          <td className="py-4 px-2 font-heading text-sm text-text font-semibold flex items-center gap-2">
                            <FlagImage code={team.code} className="w-6 h-4 object-cover shadow-sm border border-white/10" />
                            <span>{team.name}</span>
                            <span className="text-xs font-mono text-text-muted font-normal">({team.code})</span>
                          </td>
                          <td className="py-4 px-2 text-center font-bold text-text">{team.pld}</td>
                          <td className="py-4 px-2 text-center text-text-body">{team.w}</td>
                          <td className="py-4 px-2 text-center text-text-body">{team.d}</td>
                          <td className="py-4 px-2 text-center text-text-body">{team.l}</td>
                          <td className={`py-4 px-2 text-center font-bold ${
                            team.gf - team.ga > 0 ? "text-emerald-500" : team.gf - team.ga < 0 ? "text-red-500" : "text-text-body"
                          }`}>
                            {team.gf - team.ga > 0 ? `+${team.gf - team.ga}` : team.gf - team.ga}
                          </td>
                          <td className="py-4 px-2 text-right font-bold text-amber-500 dark:text-amber-400 text-sm select-all">{team.pts}</td>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </motion.div>

            {/* Side Schedule */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-lg border border-white/20 dark:border-white/10 p-6 md:p-8 space-y-8 rounded-none shadow-xl"
            >
              <span className="text-[10px] font-mono tracking-widest text-text-muted block uppercase border-b border-white/10 pb-3 font-semibold">
                FIXTURES MATRIX
              </span>
              <div className="space-y-4">
                {[
                  { home: groups[selectedGroupTab][0], away: groups[selectedGroupTab][1], round: "ROUND 1" },
                  { home: groups[selectedGroupTab][2], away: groups[selectedGroupTab][3], round: "ROUND 1" },
                  { home: groups[selectedGroupTab][0], away: groups[selectedGroupTab][2], round: "ROUND 2" },
                  { home: groups[selectedGroupTab][1], away: groups[selectedGroupTab][3], round: "ROUND 2" },
                  { home: groups[selectedGroupTab][0], away: groups[selectedGroupTab][3], round: "ROUND 3" },
                  { home: groups[selectedGroupTab][1], away: groups[selectedGroupTab][2], round: "ROUND 3" }
                ].map((fixture, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-3 border-b border-white/10 last:border-0">
                    <span className="font-mono text-text-muted text-[9px] uppercase tracking-wider font-semibold">{fixture.round}</span>
                    <div className="flex items-center gap-2 font-heading font-semibold text-text">
                      <span className="flex items-center gap-1.5">
                        <FlagImage code={fixture.home.code} className="w-5 h-3.5 object-cover shadow-sm border border-white/10" />
                        {fixture.home.code}
                      </span>
                      <span className="font-mono text-text-muted font-normal text-[9px]">VS</span>
                      <span className="flex items-center gap-1.5">
                        {fixture.away.code}
                        <FlagImage code={fixture.away.code} className="w-5 h-3.5 object-cover shadow-sm border border-white/10" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VENUES SHOWROOM ─── */}
      <section className="py-24 bg-transparent border-b border-white/10 relative">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <span className="text-emerald-500 dark:text-emerald-400 text-xs font-mono uppercase tracking-[0.2em] mb-3 block">HOSTING PLATFORMS</span>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-text font-bold">ICONIC STADIUMS</h2>
            <p className="mt-4 text-text-muted max-w-xl mx-auto text-sm">
              Explore the architectural monuments hosting the matches across Mexico, USA, and Canada. Select a stadium to explore layout specifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stadiums.map((stadium, sIdx) => (
              <motion.div
                key={stadium.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: sIdx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setActiveStadium(stadium)}
                className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-lg border border-white/20 dark:border-white/10 cursor-pointer group transition-all duration-300 rounded-none relative overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)] hover:border-emerald-500"
              >
                {/* Photo Header */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={stadium.imageUrl}
                    alt={stadium.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 border border-white/20 dark:border-white/10 px-3 py-1 font-mono text-[9px] font-bold text-text uppercase tracking-widest">
                    {stadium.country}
                  </div>
                </div>

                {/* Info summary */}
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-text group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors uppercase">
                    {stadium.name}
                  </h3>
                  <p className="text-xs text-text-muted flex items-center gap-1.5 mt-2 font-mono">
                    <MapPin size={11} className="text-amber-500" /> {stadium.city}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-white/10 text-xs font-mono">
                    <div>
                      <span className="text-[9px] text-text-muted block uppercase tracking-wider">Capacity</span>
                      <span className="font-heading font-semibold text-slate-800 dark:text-white text-base select-all">
                        {stadium.capacity.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-text-muted block uppercase tracking-wider">Built Year</span>
                      <span className="font-heading font-semibold text-slate-800 dark:text-white text-base select-all">
                        {stadium.built}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-end text-xs font-mono text-emerald-500 dark:text-emerald-400 border-t border-white/10 pt-4">
                    <span className="tracking-widest uppercase">Explore Details</span>
                    <ChevronRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STADIUM SPEC MODAL ─── */}
      <AnimatePresence>
        {activeStadium && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md"
            onClick={() => setActiveStadium(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white dark:bg-slate-950 border border-white/30 dark:border-white/10 w-full max-w-2xl overflow-hidden relative rounded-none shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setActiveStadium(null)}
                className="absolute top-4 right-4 bg-white/25 dark:bg-white/[0.04] text-text p-2 rounded-none border border-white/20 dark:border-white/10 hover:border-text-muted transition-colors z-20 cursor-pointer"
                title="Close"
                aria-label="Close"
              >
                <X size={16} />
              </button>
 
              {/* Banner Cover */}
              <div className="h-64 relative">
                <img
                  src={activeStadium.imageUrl}
                  alt={activeStadium.name}
                  className="w-full h-full object-cover filter contrast-110 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 md:left-8">
                  <span className="text-amber-500 font-mono text-[9px] uppercase tracking-[0.25em] block mb-2">{activeStadium.city}, {activeStadium.country}</span>
                  <h3 className="font-display text-4xl text-text uppercase leading-none font-bold">{activeStadium.name}</h3>
                </div>
              </div>

              {/* Data Table */}
              <div className="p-8 space-y-6">
                <div>
                  <h4 className="font-heading text-xs font-mono uppercase tracking-widest text-emerald-500 dark:text-emerald-400 border-b border-slate-200 dark:border-white/10 pb-2 mb-4 font-semibold">
                    TECHNICAL DATA
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-8 font-mono text-xs text-text-body">
                    <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-1">
                      <span className="text-text-muted">SEATING CAPACITY</span>
                      <strong className="text-text select-all">{activeStadium.capacity.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-1">
                      <span className="text-text-muted">OPENED / REFURB</span>
                      <strong className="text-text select-all">{activeStadium.built}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-1">
                      <span className="text-text-muted">DIMENSIONS</span>
                      <strong className="text-text font-bold">105M x 68M</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-1">
                      <span className="text-text-muted">SURFACE TYPE</span>
                      <strong className="text-text font-bold">HYBRID GRASS</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading text-xs font-mono uppercase tracking-widest text-amber-500 border-b border-slate-200 dark:border-white/10 pb-2 mb-4 font-semibold">
                    SCHEDULED FIXTURES
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {activeStadium.majorMatches.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-text-body font-mono">
                        <span className="w-1.5 h-1.5 bg-amber-500" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HISTORICAL PRESTIGE & TRIVIA ─── */}
      <section className="py-24 bg-transparent border-b border-white/10">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Typographic Legends list */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <span className="text-emerald-500 dark:text-emerald-400 text-xs font-mono uppercase tracking-[0.2em] mb-3 block">HISTORICAL PRESTIGE</span>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-text font-bold">LEGENDARY NATIONS</h2>
              <p className="text-text-muted text-sm mt-4 leading-relaxed font-semibold">
                Only eight nations have claimed the gold icon in the tournament's illustrious history. Brazil remains at the apex with five stars, closely followed by European giants Germany and Italy.
              </p>
            </div>

            {/* Elegant Typographic list */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              {[
                { nation: "Brazil", titles: 5, years: "1958, 1962, 1970, 1994, 2002" },
                { nation: "Germany", titles: 4, years: "1954, 1974, 1990, 2014" },
                { nation: "Italy", titles: 4, years: "1934, 1938, 1982, 2006" },
                { nation: "Argentina", titles: 3, years: "1978, 1986, 2022" },
                { nation: "France", titles: 2, years: "1998, 2018" },
                { nation: "Uruguay", titles: 2, years: "1930, 1950" },
                { nation: "England", titles: 1, years: "1966" },
                { nation: "Spain", titles: 1, years: "2010" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10 text-xs font-mono hover:text-text-muted transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-semibold">{item.titles} ★</span>
                    <span className="font-heading font-bold text-text text-sm uppercase">{item.nation}</span>
                  </div>
                  <span className="text-text-muted text-[10px] font-semibold">{item.years}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* TRIVIA LAB CHALLENGE */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-lg border border-white/20 dark:border-white/10 p-8 rounded-none relative shadow-xl overflow-hidden"
          >
            {/* Trivia Lab Background Image */}
            <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
               <img src="/images/brazil_trivia_1970_1780508231625.png" alt="1970 Brazil Trivia" className="w-full h-full object-cover grayscale" />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-slate-900 dark:via-slate-900/80 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
              <span className="text-amber-500 font-mono text-xs uppercase tracking-[0.2em] font-bold">WORLD CUP TRIVIA</span>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-center text-[10px] font-mono text-text-muted font-semibold">
                <span>QUESTION {currentTriviaIdx + 1} OF {triviaQuestions.length}</span>
                <span className="text-emerald-500 dark:text-emerald-400 font-bold">SCORE: {currentTriviaIdx * 100}</span>
              </div>

              {/* Question */}
              <h4 className="font-heading text-lg text-text font-bold uppercase leading-snug">
                {triviaQuestions[currentTriviaIdx].question}
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {triviaQuestions[currentTriviaIdx].options.map((opt, oIdx) => {
                  const isSelected = selectedTriviaOption === oIdx
                  const isCorrect = oIdx === triviaQuestions[currentTriviaIdx].answerIdx
                  
                  let optStyle = "border-white/20 dark:border-white/10 text-text hover:border-slate-400 hover:bg-white/25 dark:hover:bg-white/10"
                  if (triviaStatus !== "unanswered") {
                    if (isCorrect) {
                      optStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 font-bold"
                    } else if (isSelected) {
                      optStyle = "border-red-500 bg-red-500/20 text-red-900 dark:text-red-300 font-bold"
                    } else {
                      optStyle = "border-white/10 text-text-faint cursor-not-allowed opacity-50"
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={triviaStatus !== "unanswered"}
                      onClick={() => handleTriviaAnswer(oIdx)}
                      className={`w-full text-left font-mono text-xs p-4 border rounded-none flex justify-between items-center transition-all duration-200 ${
                        triviaStatus === "unanswered" ? "cursor-pointer" : ""
                      } ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {triviaStatus !== "unanswered" && isCorrect && <Check size={12} className="text-emerald-500" />}
                      {triviaStatus !== "unanswered" && isSelected && !isCorrect && <X size={12} className="text-red-500" />}
                    </button>
                  )
                })}
              </div>

              {/* Explanatory notes */}
              <AnimatePresence>
                {triviaStatus !== "unanswered" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-white/10 font-sans text-xs text-text-body leading-relaxed shadow-inner"
                  >
                    <p className="font-mono font-bold text-text mb-2 uppercase tracking-widest text-[9px]">
                      {triviaStatus === "correct" ? "✓ VERIFIED CORRECT" : "✗ VERIFIED INCORRECT"}
                    </p>
                    {triviaQuestions[currentTriviaIdx].trivia}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Question */}
              {triviaStatus !== "unanswered" && (
                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    onClick={handleNextTrivia}
                    className="text-xs font-mono font-bold bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 px-5 py-3 rounded-none flex items-center gap-1 transition-colors cursor-pointer uppercase tracking-widest hover:scale-[1.02]"
                  >
                    <span>Next Question</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

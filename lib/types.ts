/* ─── NATION ─── */
export interface Nation {
  id: string
  name: string
  continent: string
  flag: string
  colors: [string, string, string?]
  legends: string[]
  worldCupAppearances: number
  worldCupWins: number
  rivalries: string[]
  style: string
  shortDescription: string
  footballIdentity: string
  styleOfPlay: string
  confederationChampionships: number
  confederation: string
  currentStars: string[]
  greatestLegend: string
  legendQuote: string
  goldenEra: string
  fifaRanking: number
  founded: number
  kit: { home: string; away: string }
}

/* ─── LEAGUE ─── */
export interface League {
  id: string
  name: string
  country: string
  tier: number
  clubs: { name: string; city: string; color: string }[]
  founded: number
  style: string
  topScorers: string[]
  shortName: string
  continent: string
  teams: number
  accentColor: string
  description: string
  identity: string
  styleOfPlay: string
  competitiveness: string
  beginnerAppeal: string
  legendaryPlayers: string[]
  currentStars: string[]
  currentChampion: string
  mostTitles: { club: string; count: number }
  fact: string
  tvViewers: string
}

/* ─── TROPHY ─── */
export interface Trophy {
  id: string
  name: string
  type: "international" | "continental-club" | "continental-national" | "domestic"
  prestige: 1 | 2 | 3 | 4 | 5
  currentHolder: string
  founded: number
  history: string
  iconicMoments: string[]
  shortName: string
  confederation: string
  frequency: string
  accentColor: string
  description: string
  whyItMatters: string
  format: string
  participants: string
  famousWinners: string[]
  records: { label: string; value: string }[]
}

/* ─── CLUB ─── */
export interface Club {
  id: string
  name: string
  league: string
  founded: number
  stadium: string
  colors: [string, string?]
  legends: string[]
  rivals: string[]
}

/* ─── PLAYER ─── */
export interface Player {
  id: string
  name: string
  nationality: string
  position: string
  clubs: string[]
  transferHistory: string[]
  era: string
  legendary: boolean
}

/* ─── QUIZ ─── */
export type QuizQuestionType = "multiple-choice" | "typed-answer" | "image-clue" | "progressive-clue"

export type Difficulty = "beginner" | "club-pro" | "world-class"

export interface QuizQuestion {
  id: string
  type: QuizQuestionType
  difficulty: Difficulty
  clues: string[]
  correctAnswer: string
  options: string[]
  category: string
  explanation: string
}

export interface QuizConfig {
  slug: string
  name: string
  shortDescription: string
  description: string
  difficulty: Difficulty
  questions: QuizQuestion[]
  mechanics: string
}

/* ─── GUIDE ─── */
export interface GuideSection {
  id: string
  title: string
  subtitle: string
  content: string[]
  keyTerms?: { term: string; definition: string }[]
}

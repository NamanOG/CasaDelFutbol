export interface MatchData {
  id: string
  label: string
  home: string
  away: string
  time: string
  homeScore: string
  awayScore: string
  status: string
  desc: string
  homeWinProb: number
  drawProb: number
  awayWinProb: number
}

// Offline high-quality football data fallback
export const fallbackMatches: MatchData[] = [
  { id: "m1", label: "Champions League", home: "RMA", away: "MCI", time: "20:00 CET", homeScore: "-", awayScore: "-", status: "UPCOMING", desc: "UEFA Champions League Semifinal First Leg. Expected key tactical matchup: Vinicius Jr vs Kyle Walker speed duel.", homeWinProb: 48, drawProb: 22, awayWinProb: 30 },
  { id: "m2", label: "Premier League", home: "ARS", away: "TOT", time: "FT", homeScore: "2", awayScore: "1", status: "FT", desc: "North London Derby. Arsenal wins at home. Saka clinical finish decides the high-press showdown.", homeWinProb: 55, drawProb: 20, awayWinProb: 25 },
  { id: "m3", label: "Serie A", home: "JUV", away: "INT", time: "LIVE 45'", homeScore: "0", awayScore: "0", status: "LIVE", desc: "Derby d'Italia. Dynamic midfield battle with a compact low-block defense from Juventus.", homeWinProb: 33, drawProb: 35, awayWinProb: 32 },
]

export async function fetchLiveMatches(): Promise<MatchData[]> {
  const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY
  if (!apiKey) {
    return fallbackMatches
  }

  try {
    const res = await fetch("https://api.football-data.org/v4/matches", {
      headers: {
        "X-Auth-Token": apiKey
      },
      next: { revalidate: 60 } // cache for 1 minute
    })

    if (!res.ok) {
      throw new Error("Failed to fetch matches")
    }

    const data = await res.json()
    const apiMatches = data.matches || []
    if (apiMatches.length === 0) return fallbackMatches

    // Sort: In Play / Paused first, then Scheduled
    const sorted = [...apiMatches].sort((a: any, b: any) => {
      const scoreA = (a.status === "IN_PLAY" || a.status === "PAUSED") ? 1 : 0
      const scoreB = (b.status === "IN_PLAY" || b.status === "PAUSED") ? 1 : 0
      return scoreB - scoreA
    })

    return sorted.slice(0, 3).map((m: any, idx: number) => {
      const homeShort = m.homeTeam.tla || m.homeTeam.shortName || m.homeTeam.name.substring(0, 3).toUpperCase()
      const awayShort = m.awayTeam.tla || m.awayTeam.shortName || m.awayTeam.name.substring(0, 3).toUpperCase()

      let statusStr = "UPCOMING"
      if (m.status === "IN_PLAY" || m.status === "PAUSED") {
        statusStr = "LIVE"
      } else if (m.status === "FINISHED") {
        statusStr = "FT"
      }

      // Generate realistic dynamic probabilities
      const homeWin = Math.floor(35 + Math.random() * 25)
      const draw = Math.floor(15 + Math.random() * 15)
      const awayWin = 100 - homeWin - draw

      return {
        id: `api-${m.id || idx}`,
        label: m.competition?.name || "Match",
        home: homeShort,
        away: awayShort,
        time: m.status === "FINISHED"
          ? "FT"
          : (m.status === "IN_PLAY"
            ? "LIVE"
            : new Date(m.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        homeScore: m.score?.fullTime?.home !== null && m.score?.fullTime?.home !== undefined ? String(m.score.fullTime.home) : "-",
        awayScore: m.score?.fullTime?.away !== null && m.score?.fullTime?.away !== undefined ? String(m.score.fullTime.away) : "-",
        status: statusStr,
        desc: `Live action in the ${m.competition?.name || "League"}. ${m.homeTeam.name} faces off against ${m.awayTeam.name} under the lights.`,
        homeWinProb: homeWin,
        drawProb: draw,
        awayWinProb: awayWin
      }
    })
  } catch (error) {
    console.error("Football-Data API error, using fallback offline data:", error)
    return fallbackMatches
  }
}

export const fallbackWcMatches: MatchData[] = [
  { id: "wc1", label: "Group A - Opening Match", home: "MEX", away: "CRO", time: "18:00 Local", homeScore: "-", awayScore: "-", status: "UPCOMING", desc: "World Cup 2026 Opening Match at Estadio Azteca, Mexico City. Massive home advantage under the hot sun.", homeWinProb: 44, drawProb: 28, awayWinProb: 28 },
  { id: "wc2", label: "Group B", home: "USA", away: "ENG", time: "20:00 Local", homeScore: "-", awayScore: "-", status: "UPCOMING", desc: "High stakes group battle at MetLife Stadium, NY/NJ. A classic rivalry renewed on the biggest stage.", homeWinProb: 31, drawProb: 27, awayWinProb: 42 },
  { id: "wc3", label: "Group C", home: "CAN", away: "MAR", time: "17:00 Local", homeScore: "-", awayScore: "-", status: "UPCOMING", desc: "Tactical showdown at BC Place, Vancouver. Canada's pace vs Morocco's solid defensive shape.", homeWinProb: 35, drawProb: 30, awayWinProb: 35 },
  { id: "wc4", label: "Group F", home: "BRA", away: "ESP", time: "19:00 Local", homeScore: "-", awayScore: "-", status: "UPCOMING", desc: "Clash of styles at SoFi Stadium, Los Angeles. Brazil's Jogo Bonito creativity vs Spain's Tiki-Taka control.", homeWinProb: 40, drawProb: 30, awayWinProb: 30 },
]

export async function fetchWorldCupMatches(): Promise<MatchData[]> {
  const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY
  if (!apiKey) {
    return fallbackWcMatches
  }

  try {
    const res = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
      headers: {
        "X-Auth-Token": apiKey
      },
      next: { revalidate: 60 }
    })

    if (!res.ok) {
      throw new Error("Failed to fetch WC matches")
    }

    const data = await res.json()
    const apiMatches = data.matches || []
    if (apiMatches.length === 0) return fallbackWcMatches

    const sorted = [...apiMatches].sort((a: any, b: any) => {
      const scoreA = (a.status === "IN_PLAY" || a.status === "PAUSED") ? 1 : 0
      const scoreB = (b.status === "IN_PLAY" || b.status === "PAUSED") ? 1 : 0
      return scoreB - scoreA
    })

    return sorted.slice(0, 4).map((m: any, idx: number) => {
      const homeShort = m.homeTeam.tla || m.homeTeam.shortName || m.homeTeam.name.substring(0, 3).toUpperCase()
      const awayShort = m.awayTeam.tla || m.awayTeam.shortName || m.awayTeam.name.substring(0, 3).toUpperCase()
      
      let statusStr = "UPCOMING"
      if (m.status === "IN_PLAY" || m.status === "PAUSED") {
        statusStr = "LIVE"
      } else if (m.status === "FINISHED") {
        statusStr = "FT"
      }

      const homeWin = Math.floor(30 + Math.random() * 30)
      const draw = Math.floor(15 + Math.random() * 15)
      const awayWin = 100 - homeWin - draw

      return {
        id: `api-wc-${m.id || idx}`,
        label: `${m.stage?.replace('_', ' ') || "Group Stage"} - Match`,
        home: homeShort,
        away: awayShort,
        time: m.status === "FINISHED" 
          ? "FT" 
          : (m.status === "IN_PLAY" 
              ? "LIVE" 
              : new Date(m.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        homeScore: m.score?.fullTime?.home !== null && m.score?.fullTime?.home !== undefined ? String(m.score.fullTime.home) : "-",
        awayScore: m.score?.fullTime?.away !== null && m.score?.fullTime?.away !== undefined ? String(m.score.fullTime.away) : "-",
        status: statusStr,
        desc: `World Cup action. ${m.homeTeam.name} plays ${m.awayTeam.name}. Venue: ${m.venue || "Stadium"}.`,
        homeWinProb: homeWin,
        drawProb: draw,
        awayWinProb: awayWin
      }
    })
  } catch (error) {
    console.error("Football-Data WC API error, using fallback offline data:", error)
    return fallbackWcMatches
  }
}


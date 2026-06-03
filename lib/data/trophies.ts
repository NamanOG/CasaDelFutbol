export interface Trophy {
  slug: string
  name: string
  shortName: string
  type: "international" | "continental-club" | "continental-national" | "domestic"
  confederation: string
  founded: number
  frequency: string
  accentColor: string
  prestige: 1 | 2 | 3 | 4 | 5
  description: string
  whyItMatters: string
  format: string
  participants: string
  famousWinners: string[]
  iconicMoments: string[]
  currentHolder: string
  records: { label: string; value: string }[]
  imageUrl: string
  ceremonyImage: string
}

export const trophies: Trophy[] = [
  {
    slug: "world-cup",
    name: "FIFA World Cup",
    shortName: "World Cup",
    type: "international",
    confederation: "FIFA",
    founded: 1930,
    frequency: "Every 4 years",
    accentColor: "#C5A028",
    prestige: 5,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/2006_FIFA_World_Cup_Trophy_2.svg/200px-2006_FIFA_World_Cup_Trophy_2.svg.png",
    ceremonyImage: "https://images.pexels.com/photos/31744929/pexels-photo-31744929.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "The FIFA World Cup is the most-watched sporting event in human history. Held every four years, it brings together 32 nations in a month-long celebration of football that transcends sport.",
    whyItMatters:
      "Nothing in football — or sport — carries the same weight. A World Cup win defines national identity for generations. It is the only trophy that can silence an entire country or bring a nation to tears of joy. For players, it is the ultimate achievement.",
    format:
      "32 nations (expanding to 48 from 2026) compete across a group stage, followed by knockout rounds. The final is played at a neutral venue with a global television audience of over a billion.",
    participants: "32 national teams (48 from 2026)",
    famousWinners: ["Brazil (5)", "Germany (4)", "Italy (4)", "Argentina (3)", "France (2)"],
    iconicMoments: [
      "Maradona's Hand of God and Goal of the Century — 1986",
      "Zidane's header in the 1998 final — Paris",
      "The Miracle of Bern — West Germany's 1954 victory",
      "Pelé at 17 — the youngest World Cup winner ever",
      "Italy vs France 2006 — Zidane's headbutt in the final",
    ],
    currentHolder: "Argentina",
    records: [
      { label: "Most wins", value: "Brazil — 5 titles" },
      { label: "Top scorer (all-time)", value: "Miroslav Klose — 16 goals" },
      { label: "Largest attendance", value: "199,854 — Brazil vs Uruguay, Maracanã, 1950" },
      { label: "Most appearances", value: "Lothar Matthäus — 25 games" },
    ],
  },
  {
    slug: "champions-league",
    name: "UEFA Champions League",
    shortName: "UCL",
    type: "continental-club",
    confederation: "UEFA",
    founded: 1955,
    frequency: "Annual",
    accentColor: "#1B3A6B",
    prestige: 5,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/UEFA_Champions_League_logo_2.svg/200px-UEFA_Champions_League_logo_2.svg.png",
    ceremonyImage: "https://images.pexels.com/photos/200986/pexels-photo-200986.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "The Champions League is club football's greatest prize — a continent-wide competition where Europe's elite clubs battle across months of two-legged ties for the most prestigious trophy in club football.",
    whyItMatters:
      "Winning the Champions League defines a club's legacy. It distinguishes great clubs from truly legendary ones. The anthem, the final, the away goals — everything about it feels bigger than ordinary football.",
    format:
      "A group stage narrows the field to 16 clubs, who then face two-legged knockout ties through to a single-leg final at a pre-selected European venue.",
    participants: "32 clubs (evolving from 2024-25 season)",
    famousWinners: ["Real Madrid (15)", "AC Milan (7)", "Bayern Munich (6)", "Liverpool (6)", "Barcelona (5)"],
    iconicMoments: [
      "Istanbul 2005 — Liverpool's 3-0 deficit comeback",
      "Real Madrid's La Décima — 12-year wait ended in Lisbon",
      "Zidane's volley in Glasgow — 2002",
      "Manchester United vs Bayern Munich 1999 — injury time treble",
      "Barcelona's 6-1 remontada against PSG — 2017",
    ],
    currentHolder: "Real Madrid",
    records: [
      { label: "Most titles", value: "Real Madrid — 15" },
      { label: "Top scorer (all-time)", value: "Cristiano Ronaldo — 140 goals" },
      { label: "Most appearances", value: "Iker Casillas — 177 games" },
      { label: "Highest scoring final", value: "Real Madrid 7-3 Eintracht Frankfurt, 1960" },
    ],
  },
  {
    slug: "europa-league",
    name: "UEFA Europa League",
    shortName: "UEL",
    type: "continental-club",
    confederation: "UEFA",
    founded: 1971,
    frequency: "Annual",
    accentColor: "#F5821F",
    prestige: 3,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Europa_League.svg/200px-Europa_League.svg.png",
    ceremonyImage: "https://images.pexels.com/photos/7005685/pexels-photo-7005685.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "Europe's second-tier continental club competition, the Europa League offers meaningful competition for clubs across the continent and provides Champions League qualification for the winner.",
    whyItMatters:
      "For many clubs, the Europa League is their biggest ever achievement. It also grants direct access to the Champions League group stages — making every tie consequential.",
    format:
      "A league phase narrows the field, followed by two-legged knockout ties through to a single-leg final.",
    participants: "32 clubs in knockout phase",
    famousWinners: ["Sevilla (7)", "Atletico Madrid (3)", "Inter Milan (3)", "Liverpool (3)"],
    iconicMoments: [
      "Sevilla's remarkable seven-title dominance",
      "Atalanta's 2024 victory over Bayer Leverkusen",
      "Chelsea's dramatic victory over Arsenal in Baku 2019",
    ],
    currentHolder: "Atalanta",
    records: [
      { label: "Most titles", value: "Sevilla — 7" },
      { label: "Top scorer (all-time)", value: "Henrik Larsson — 40 goals" },
    ],
  },
  {
    slug: "euros",
    name: "UEFA European Championship",
    shortName: "Euros",
    type: "continental-national",
    confederation: "UEFA",
    founded: 1960,
    frequency: "Every 4 years",
    accentColor: "#003FA3",
    prestige: 4,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/UEFA_Euro_2024_Logo.svg/200px-UEFA_Euro_2024_Logo.svg.png",
    ceremonyImage: "https://images.pexels.com/photos/30651230/pexels-photo-30651230.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "The European Championship brings together the 24 best national teams in Europe for a tournament that rivals the World Cup in quality and frequently surpasses it in tactical sophistication.",
    whyItMatters:
      "Winning the Euros is proof of consistency and quality across four years. Given the depth of European talent, no Euros winner can be lucky — it requires genuine excellence from start to finish.",
    format:
      "24 teams compete in groups, followed by knockout rounds. Hosted by one or multiple European nations every four years.",
    participants: "24 European national teams",
    famousWinners: ["Germany/West Germany (3)", "Spain (3)", "France (2)", "Italy (2)"],
    iconicMoments: [
      "Van Basten's volley — Euro 1988 final",
      "Panenka's penalty — Yugoslavia 1976",
      "Denmark's shock win in 1992 — called up late after Yugoslavia's exclusion",
      "Greece winning Euro 2004 — the ultimate underdog triumph",
    ],
    currentHolder: "Spain",
    records: [
      { label: "Most titles", value: "Germany & Spain — 3 each" },
      { label: "Top scorer (all-time)", value: "Cristiano Ronaldo — 14 goals" },
    ],
  },
  {
    slug: "copa-america",
    name: "Copa América",
    shortName: "Copa América",
    type: "continental-national",
    confederation: "CONMEBOL",
    founded: 1916,
    frequency: "Every 4 years (irregular historically)",
    accentColor: "#008C45",
    prestige: 4,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Copa_America_2024.svg/200px-Copa_America_2024.svg.png",
    ceremonyImage: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "The oldest international football competition in the world, Copa América is contested between South American nations in a tournament of extraordinary technical quality and passion.",
    whyItMatters:
      "Playing against Brazil, Argentina, Uruguay, and Colombia is the ultimate test of character. Copa América is where rivalries are born and legends are made. Lionel Messi considers his 2021 Copa win among his greatest achievements.",
    format:
      "10 South American nations plus invited guests compete in groups and knockout rounds.",
    participants: "10 CONMEBOL nations + invited teams",
    famousWinners: ["Uruguay (15)", "Argentina (15)", "Brazil (9)"],
    iconicMoments: [
      "Argentina's 2021 victory — Messi's first major international title",
      "Maradona's Copa debut at 19",
      "Uruguay winning the inaugural 1916 competition",
    ],
    currentHolder: "Argentina",
    records: [
      { label: "Most titles", value: "Uruguay & Argentina — 15 each" },
      { label: "Top scorer (all-time)", value: "Norberto Méndez & Zizinho — 17 goals" },
    ],
  },
  {
    slug: "premier-league-trophy",
    name: "Premier League",
    shortName: "The Title",
    type: "domestic",
    confederation: "England",
    founded: 1992,
    frequency: "Annual",
    accentColor: "#3D195B",
    prestige: 4,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/200px-Premier_League_Logo.svg.png",
    ceremonyImage: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "The most commercially successful and globally watched domestic league trophy. Winning the Premier League is considered by many players as the most satisfying achievement in club football.",
    whyItMatters:
      "20 clubs, 38 games, no second chances. The Premier League title is a grind — earned game by game, point by point over nine months. Champions here earn global respect.",
    format:
      "A round-robin league — each of 20 clubs plays every other club home and away across 38 games. Most points wins.",
    participants: "20 English clubs",
    famousWinners: ["Manchester United (13)", "Manchester City (9)", "Arsenal (3)", "Chelsea (5)", "Liverpool (1)"],
    iconicMoments: [
      "Agüero's title-winning goal vs QPR 2012 — last-minute drama",
      "Arsenal's Invincibles 2003-04 — unbeaten season",
      "Leicester City 2015-16 — 5000/1 odds, the greatest sporting miracle",
    ],
    currentHolder: "Arsenal",
    records: [
      { label: "Most titles", value: "Manchester United — 13" },
      { label: "Most goals in a season", value: "Erling Haaland — 36 (2022-23)" },
    ],
  },
  {
    slug: "la-liga-trophy",
    name: "La Liga Title",
    shortName: "Scudetto Español",
    type: "domestic",
    confederation: "Spain",
    founded: 1929,
    frequency: "Annual",
    accentColor: "#EE8707",
    prestige: 4,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/LaLiga.svg/200px-LaLiga.svg.png",
    ceremonyImage: "https://images.pexels.com/photos/227517/pexels-photo-227517.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "The Liga title has been won by some of the greatest clubs and players in football history. Its prestige is amplified by the unique duopoly — and intense rivalry — of Real Madrid and Barcelona.",
    whyItMatters:
      "Winning La Liga against Real Madrid and Barcelona is considered proof of genuine greatness. The level of technical play and the club legacies make each title historically significant.",
    format: "20 clubs, 38 rounds, most points wins.",
    participants: "20 Spanish clubs",
    famousWinners: ["Real Madrid (35)", "Barcelona (27)", "Atletico Madrid (11)"],
    iconicMoments: [
      "Barcelona's 2010-11 tiki-taka peak — Guardiola's greatest side",
      "Atlético's 2013-14 title — breaking the duopoly",
      "Real Madrid 2021-22 with Ancelotti and Benzema's brilliance",
    ],
    currentHolder: "Real Madrid",
    records: [
      { label: "Most titles", value: "Real Madrid — 35" },
      { label: "Top scorer (all-time)", value: "Lionel Messi — 474 goals" },
    ],
  },
]

export function getTrophyBySlug(slug: string): Trophy | undefined {
  return trophies.find((t) => t.slug === slug)
}

export function getTrophiesByType(type: Trophy["type"]): Trophy[] {
  return trophies.filter((t) => t.type === type)
}

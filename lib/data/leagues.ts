export interface League {
  slug: string
  name: string
  shortName: string
  country: string
  continent: string
  founded: number
  teams: number
  accentColor: string
  description: string
  identity: string
  styleOfPlay: string
  competitiveness: string
  beginnerAppeal: string
  famousClubs: { name: string; city: string; color: string; stadium: string; founded: number; trophies: number }[]
  legendaryPlayers: string[]
  currentStars: string[]
  currentChampion: string
  mostTitles: { club: string; count: number }
  fact: string
  tvViewers: string
  heroImage: string
  logoUrl: string
  stadiumImage: string
}

export const leagues: League[] = [
  {
    slug: "premier-league",
    name: "Premier League",
    shortName: "PL",
    country: "England",
    continent: "Europe",
    founded: 1992,
    teams: 20,
    accentColor: "#3D195B",
    heroImage: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1280",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/280px-Premier_League_Logo.svg.png",
    stadiumImage: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "The most watched football league on the planet, the Premier League is a spectacle of pace, physicality, and drama played out in some of the world's most atmospheric grounds.",
    identity:
      "Raw intensity, packed stadiums, and the relentless ebb and flow of high-stakes drama. No league does unpredictability like the Premier League — any team can beat any other on any given day.",
    styleOfPlay:
      "Fast-paced, physically demanding, and tactically diverse. Teams press relentlessly and transitions happen at breakneck speed. The league has become increasingly tactically sophisticated while retaining its direct, aggressive edge.",
    competitiveness:
      "Extraordinarily competitive. The top four changes every season, mid-table clubs can beat title contenders, and relegation battles go to the final day.",
    beginnerAppeal:
      "If you watch just one league, make it this one. The atmosphere, star power, and storytelling are unmatched. The narratives are compelling even if you barely know the teams.",
    famousClubs: [
      { name: "Manchester City", city: "Manchester", color: "#6CABDD", stadium: "Etihad Stadium", founded: 1880, trophies: 35 },
      { name: "Arsenal", city: "London", color: "#EF0107", stadium: "Emirates Stadium", founded: 1886, trophies: 48 },
      { name: "Liverpool", city: "Liverpool", color: "#C8102E", stadium: "Anfield", founded: 1892, trophies: 68 },
      { name: "Chelsea", city: "London", color: "#034694", stadium: "Stamford Bridge", founded: 1905, trophies: 34 },
      { name: "Manchester United", city: "Manchester", color: "#DA291C", stadium: "Old Trafford", founded: 1878, trophies: 66 },
      { name: "Tottenham Hotspur", city: "London", color: "#132257", stadium: "Tottenham Hotspur Stadium", founded: 1882, trophies: 26 },
    ],
    legendaryPlayers: ["Thierry Henry", "Eric Cantona", "Dennis Bergkamp", "Steven Gerrard", "Frank Lampard"],
    currentStars: ["Erling Haaland", "Mohamed Salah", "Son Heung-min", "Bukayo Saka", "Cole Palmer"],
    currentChampion: "Manchester City",
    mostTitles: { club: "Manchester United", count: 13 },
    fact: "The Premier League is broadcast in 188 countries to 4.7 billion potential viewers worldwide.",
    tvViewers: "4.7 billion potential",
  },
  {
    slug: "la-liga",
    name: "La Liga",
    shortName: "LL",
    country: "Spain",
    continent: "Europe",
    founded: 1929,
    teams: 20,
    accentColor: "#EE8707",
    heroImage: "https://images.pexels.com/photos/227517/pexels-photo-227517.jpeg?auto=compress&cs=tinysrgb&w=1280",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/LaLiga.svg/200px-LaLiga.svg.png",
    stadiumImage: "https://images.pexels.com/photos/34649364/pexels-photo-34649364.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "Home to two of the greatest clubs ever to play the game, La Liga has produced the most decorated managers and the most technically gifted players of the modern era.",
    identity:
      "Tactical precision, individual brilliance, and the unrivalled prestige of El Clásico. La Liga rewards intelligence and technical mastery over physicality.",
    styleOfPlay:
      "Technically refined and tactically intelligent. Teams build from the back with confidence, seek positional advantages, and rely on individual quality to unlock defences.",
    competitiveness:
      "Historically dominated by the big two, but the recent emergence of Atletico Madrid and others has added genuine competition across the table.",
    beginnerAppeal:
      "La Liga gives you the purest technical football. Watch it to appreciate artistry, movement, and the craft of football at its most refined.",
    famousClubs: [
      { name: "Real Madrid", city: "Madrid", color: "#FFFFFF", stadium: "Santiago Bernabéu", founded: 1902, trophies: 99 },
      { name: "FC Barcelona", city: "Barcelona", color: "#A50044", stadium: "Spotify Camp Nou", founded: 1899, trophies: 98 },
      { name: "Atletico Madrid", city: "Madrid", color: "#CB3524", stadium: "Metropolitano", founded: 1903, trophies: 33 },
      { name: "Sevilla", city: "Seville", color: "#D4212C", stadium: "Ramón Sánchez Pizjuán", founded: 1890, trophies: 19 },
      { name: "Real Sociedad", city: "San Sebastián", color: "#0064A1", stadium: "Reale Arena", founded: 1909, trophies: 6 },
      { name: "Athletic Club", city: "Bilbao", color: "#EE2523", stadium: "San Mamés", founded: 1898, trophies: 33 },
    ],
    legendaryPlayers: ["Ronaldo (R9)", "Lionel Messi", "Cristiano Ronaldo", "Raúl", "Rivaldo", "Xavi Hernández"],
    currentStars: ["Vinícius Jr.", "Kylian Mbappé", "Lamine Yamal", "Pedri", "Dani Carvajal"],
    currentChampion: "Real Madrid",
    mostTitles: { club: "Real Madrid", count: 35 },
    fact: "Real Madrid and Barcelona have won La Liga a combined 58 times — more than every other club combined.",
    tvViewers: "2.8 billion potential",
  },
  {
    slug: "bundesliga",
    name: "Bundesliga",
    shortName: "BL",
    country: "Germany",
    continent: "Europe",
    founded: 1963,
    teams: 18,
    accentColor: "#D20515",
    heroImage: "https://images.pexels.com/photos/31160100/pexels-photo-31160100.jpeg?auto=compress&cs=tinysrgb&w=1280",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/200px-Bundesliga_logo_%282017%29.svg.png",
    stadiumImage: "https://images.pexels.com/photos/31744929/pexels-photo-31744929.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "Germany's top flight is renowned for world-class facilities, genuine supporter culture, and producing the managers and tactical philosophies that define modern football.",
    identity:
      "The Bundesliga stands for authentic supporter culture — 50+1 ownership rules mean fans hold real power at clubs. It is also a high-intensity, tactically innovative league.",
    styleOfPlay:
      "High-pressing, high-tempo, and physically intense. German football perfected gegenpressing — winning the ball back immediately after losing possession — which became the global template.",
    competitiveness:
      "Bayern Munich have been dominant for over a decade, but Borussia Dortmund and rising clubs like Bayer Leverkusen provide compelling alternative stories.",
    beginnerAppeal:
      "The cheapest top-flight football in Europe, with real atmosphere in massive, modern stadiums. The football is direct, exciting, and fun to follow.",
    famousClubs: [
      { name: "Bayern Munich", city: "Munich", color: "#DC052D", stadium: "Allianz Arena", founded: 1900, trophies: 82 },
      { name: "Borussia Dortmund", city: "Dortmund", color: "#FDE100", stadium: "Signal Iduna Park", founded: 1909, trophies: 22 },
      { name: "Bayer Leverkusen", city: "Leverkusen", color: "#E32221", stadium: "BayArena", founded: 1904, trophies: 5 },
      { name: "RB Leipzig", city: "Leipzig", color: "#DD0741", stadium: "Red Bull Arena", founded: 2009, trophies: 2 },
      { name: "Eintracht Frankfurt", city: "Frankfurt", color: "#000000", stadium: "Deutsche Bank Park", founded: 1899, trophies: 7 },
      { name: "Borussia Mönchengladbach", city: "Mönchengladbach", color: "#000000", stadium: "Borussia-Park", founded: 1900, trophies: 7 },
    ],
    legendaryPlayers: ["Gerd Müller", "Franz Beckenbauer", "Lothar Matthäus", "Michael Ballack", "Oliver Kahn"],
    currentStars: ["Harry Kane", "Jamal Musiala", "Florian Wirtz", "Granit Xhaka", "Leroy Sané"],
    currentChampion: "Bayer Leverkusen",
    mostTitles: { club: "Bayern Munich", count: 32 },
    fact: "The Yellow Wall at Signal Iduna Park holds 25,000 standing fans — the largest terrace in European football.",
    tvViewers: "1.5 billion potential",
  },
  {
    slug: "serie-a",
    name: "Serie A",
    shortName: "SA",
    country: "Italy",
    continent: "Europe",
    founded: 1898,
    teams: 20,
    accentColor: "#008FD7",
    heroImage: "https://images.pexels.com/photos/200986/pexels-photo-200986.jpeg?auto=compress&cs=tinysrgb&w=1280",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Serie_A_logo_%282019%29.svg/200px-Serie_A_logo_%282019%29.svg.png",
    stadiumImage: "https://images.pexels.com/photos/7005685/pexels-photo-7005685.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "Once the world's premier destination for top talent, Serie A is defined by tactical sophistication, defensive excellence, and the unique passion of Italian football culture.",
    identity:
      "Calcio is a tactical art form. Serie A has produced the world's most sophisticated defensive systems and the managers — Sacchi, Capello, Mourinho, Ancelotti — who changed football.",
    styleOfPlay:
      "Tactically refined and incredibly structured. Teams build with patience, maintain shape with precision, and exploit set-pieces and transitions with clinical efficiency.",
    competitiveness:
      "Highly competitive with multiple genuine title contenders. Inter Milan, Juventus, AC Milan, and Napoli regularly battle for the Scudetto.",
    beginnerAppeal:
      "Watch Serie A to appreciate football's tactical depth. The best defenders in the world play here, and you will learn more about spacing and organisation from one game than anywhere else.",
    famousClubs: [
      { name: "Juventus", city: "Turin", color: "#000000", stadium: "Allianz Stadium", founded: 1897, trophies: 70 },
      { name: "Inter Milan", city: "Milan", color: "#0068A8", stadium: "San Siro", founded: 1908, trophies: 42 },
      { name: "AC Milan", city: "Milan", color: "#FB090B", stadium: "San Siro", founded: 1899, trophies: 49 },
      { name: "AS Roma", city: "Rome", color: "#8E1F2F", stadium: "Stadio Olimpico", founded: 1927, trophies: 16 },
      { name: "Napoli", city: "Naples", color: "#087AC2", stadium: "Stadio Diego Armando Maradona", founded: 1926, trophies: 10 },
      { name: "Lazio", city: "Rome", color: "#87D8F7", stadium: "Stadio Olimpico", founded: 1900, trophies: 16 },
    ],
    legendaryPlayers: ["Paolo Maldini", "Roberto Baggio", "Ronaldo (R9)", "Francesco Totti", "Alessandro Del Piero"],
    currentStars: ["Victor Osimhen", "Rafael Leão", "Khvicha Kvaratskhelia", "Lautaro Martínez", "Federico Chiesa"],
    currentChampion: "Inter Milan",
    mostTitles: { club: "Juventus", count: 36 },
    fact: "AC Milan and Inter Milan share the same stadium — the San Siro — and play their derby in it twice each season.",
    tvViewers: "1.8 billion potential",
  },
  {
    slug: "ligue-1",
    name: "Ligue 1",
    shortName: "L1",
    country: "France",
    continent: "Europe",
    founded: 1932,
    teams: 18,
    accentColor: "#DFFE00",
    heroImage: "https://images.pexels.com/photos/30651230/pexels-photo-30651230.jpeg?auto=compress&cs=tinysrgb&w=1280",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Ligue1_Uber_Eats.svg/200px-Ligue1_Uber_Eats.svg.png",
    stadiumImage: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "French football's top tier has become a factory for elite talent, producing more top-level players than any other league thanks to extraordinary youth development infrastructure.",
    identity:
      "Ligue 1 is where the next stars of world football are developed. Technically gifted, athletic, and ambitious players emerge from France's elite academies and announce themselves here.",
    styleOfPlay:
      "Athletic, direct, and increasingly refined technically. French football blends physicality and creativity in players who are typically complete in multiple roles.",
    competitiveness:
      "Paris Saint-Germain's extraordinary investment has dominated the league for over a decade, but France's talent production makes for compelling individual storylines.",
    beginnerAppeal:
      "Watch Ligue 1 to spot tomorrow's superstars today. Many of football's current greats first stood out here before moving to bigger stages.",
    famousClubs: [
      { name: "Paris Saint-Germain", city: "Paris", color: "#004170", stadium: "Parc des Princes", founded: 1970, trophies: 47 },
      { name: "Olympique de Marseille", city: "Marseille", color: "#009AC7", stadium: "Stade Vélodrome", founded: 1899, trophies: 28 },
      { name: "Olympique Lyonnais", city: "Lyon", color: "#DA291C", stadium: "Groupama Stadium", founded: 1950, trophies: 21 },
      { name: "AS Monaco", city: "Monaco", color: "#D4021D", stadium: "Stade Louis II", founded: 1924, trophies: 21 },
      { name: "Stade Rennais", city: "Rennes", color: "#000000", stadium: "Roazhon Park", founded: 1901, trophies: 6 },
      { name: "Lille OSC", city: "Lille", color: "#D52B1E", stadium: "Stade Pierre-Mauroy", founded: 1944, trophies: 10 },
    ],
    legendaryPlayers: ["Zinedine Zidane", "Thierry Henry", "Michel Platini", "Ronaldinho", "Jean-Pierre Papin"],
    currentStars: ["Kylian Mbappé", "Ousmane Dembélé", "Marcus Thuram", "Bradley Barcola", "Warren Zaïre-Emery"],
    currentChampion: "Paris Saint-Germain",
    mostTitles: { club: "Saint-Étienne", count: 10 },
    fact: "France has produced more players in the top 100 of the FIFA world ranking than any other country.",
    tvViewers: "0.9 billion potential",
  },
  {
    slug: "eredivisie",
    name: "Eredivisie",
    shortName: "ED",
    country: "Netherlands",
    continent: "Europe",
    founded: 1956,
    teams: 18,
    accentColor: "#FF6600",
    heroImage: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1280",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Eredivisie_nuovo_logo.png/200px-Eredivisie_nuovo_logo.png",
    stadiumImage: "https://images.pexels.com/photos/227517/pexels-photo-227517.jpeg?auto=compress&cs=tinysrgb&w=1280",
    description:
      "The birthplace of Total Football and the league that has consistently produced the most technically gifted players per capita of any league in the world.",
    identity:
      "The Eredivisie is a finishing school for football's brightest talents. Its attacking philosophy, pressing football, and technical demands shape players who go on to define their generation.",
    styleOfPlay:
      "Attacking, technical, and positionally fluid. Dutch clubs press high, build from the back with conviction, and play football that rewards intelligence and movement.",
    competitiveness:
      "Ajax have traditionally dominated, but PSV and Feyenoord provide genuine competition. The league produces rather than imports talent — every player is developed, not bought.",
    beginnerAppeal:
      "The Eredivisie shows you the future of football. Youngsters who haven't yet moved to the Premier League or La Liga perform here with freedom and creativity that is genuinely delightful.",
    famousClubs: [
      { name: "Ajax", city: "Amsterdam", color: "#D2122E", stadium: "Johan Cruyff Arena", founded: 1900, trophies: 73 },
      { name: "PSV Eindhoven", city: "Eindhoven", color: "#ED1C24", stadium: "Philips Stadion", founded: 1913, trophies: 37 },
      { name: "Feyenoord", city: "Rotterdam", color: "#C8102E", stadium: "De Kuip", founded: 1908, trophies: 29 },
      { name: "AZ Alkmaar", city: "Alkmaar", color: "#EF3340", stadium: "AFAS Stadion", founded: 1967, trophies: 5 },
      { name: "FC Utrecht", city: "Utrecht", color: "#D9001B", stadium: "Stadion Galgenwaard", founded: 1970, trophies: 3 },
      { name: "Twente", city: "Enschede", color: "#CC0000", stadium: "De Grolsch Veste", founded: 1965, trophies: 3 },
    ],
    legendaryPlayers: ["Johan Cruyff", "Marco van Basten", "Patrick Kluivert", "Dennis Bergkamp", "Clarence Seedorf"],
    currentStars: ["Cody Gakpo", "Jurriën Timber", "Ryan Gravenberch", "Xavi Simons", "Joshua Zirkzee"],
    currentChampion: "PSV Eindhoven",
    mostTitles: { club: "Ajax", count: 36 },
    fact: "Ajax's youth academy De Toekomst has produced more Ballon d'Or winners than any other single club academy.",
    tvViewers: "0.5 billion potential",
  },
]

export function getLeagueBySlug(slug: string): League | undefined {
  return leagues.find((l) => l.slug === slug)
}

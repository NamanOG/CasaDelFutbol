export interface Nation {
  slug: string
  name: string
  continent: string
  flagColors: [string, string, string?]
  shortDescription: string
  footballIdentity: string
  styleOfPlay: string
  worldCupAppearances: number
  worldCupWins: number
  confederationChampionships: number
  confederation: string
  majorPlayers: string[]
  currentStars: string[]
  rivalry: string
  greatestLegend: string
  legendQuote: string
  goldenEra: string
  filaRanking: number
  founded: number
  kit: { home: string; away: string }
  heroImage: string
}

export const nations: Nation[] = [
  {
    slug: "brazil",
    name: "Brazil",
    continent: "South America",
    flagColors: ["#009C3B", "#FFDF00", "#002776"],
    shortDescription:
      "Five-time world champions and the most celebrated footballing nation on earth, Brazil gave the world jogo bonito — the beautiful game.",
    footballIdentity:
      "Brazil is synonymous with flair, creativity, and artistry. Their tradition of producing technically gifted, expressive players is unmatched. Football in Brazil is not merely a sport — it is the national language.",
    styleOfPlay:
      "Historically fluid and attacking, built on individual brilliance and collective rhythm. Brazilian football prizes technical excellence, close control, and inventive improvisation in tight spaces.",
    worldCupAppearances: 22,
    worldCupWins: 5,
    confederationChampionships: 9,
    confederation: "CONMEBOL",
    majorPlayers: ["Pelé", "Ronaldo", "Ronaldinho", "Zico", "Romário", "Garrincha", "Cafu", "Roberto Carlos"],
    currentStars: ["Vinicius Jr.", "Rodrygo", "Endrick", "Alisson", "Casemiro"],
    rivalry: "Argentina",
    greatestLegend: "Pelé",
    legendQuote: "Football is the most beautiful thing God has given us.",
    goldenEra:
      "The 1970 World Cup team — featuring Pelé, Jairzinho, Tostão, and Rivellino — is widely considered the greatest international side ever assembled.",
    filaRanking: 5,
    founded: 1914,
    kit: { home: "#FFDF00", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/34649364/pexels-photo-34649364.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "argentina",
    name: "Argentina",
    continent: "South America",
    flagColors: ["#74ACDF", "#FFFFFF"],
    shortDescription:
      "Three-time world champions and home to Lionel Messi, Argentina plays with a passionate intensity that reflects the soul of Buenos Aires.",
    footballIdentity:
      "Argentine football blends European tactical discipline with South American passion. The country produces combative, technically assured players who compete with fierce national pride.",
    styleOfPlay:
      "Physically and mentally combative, Argentina often builds teams around a central creative genius. Their football rewards craft, intelligence, and controlled aggression.",
    worldCupAppearances: 18,
    worldCupWins: 3,
    confederationChampionships: 15,
    confederation: "CONMEBOL",
    majorPlayers: ["Diego Maradona", "Lionel Messi", "Gabriel Batistuta", "Hernán Crespo", "Juan Román Riquelme"],
    currentStars: ["Lionel Messi", "Lautaro Martínez", "Julián Álvarez", "Rodrigo De Paul", "Emiliano Martínez"],
    rivalry: "Brazil",
    greatestLegend: "Diego Maradona",
    legendQuote: "You can say many things about me, but never that I gave less than everything.",
    goldenEra:
      "The 1986 World Cup, where Maradona single-handedly dismantled opponents with performances that remain the most mesmerizing in tournament history.",
    filaRanking: 1,
    founded: 1893,
    kit: { home: "#74ACDF", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/31160100/pexels-photo-31160100.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "germany",
    name: "Germany",
    continent: "Europe",
    flagColors: ["#000000", "#DD0000", "#FFCE00"],
    shortDescription:
      "Four-time world champions renowned for tactical precision, collective excellence, and an unshakeable competitive mentality.",
    footballIdentity:
      "German football is defined by discipline, organisation, and relentless work rate. But the modern German game is also technically refined — a product of revolutionary youth development reforms.",
    styleOfPlay:
      "Structured and disciplined without sacrificing creativity. Germany builds from the back, presses collectively, and transitions with purpose. Pressing football at its most organised.",
    worldCupAppearances: 20,
    worldCupWins: 4,
    confederationChampionships: 3,
    confederation: "UEFA",
    majorPlayers: ["Franz Beckenbauer", "Gerd Müller", "Lothar Matthäus", "Miroslav Klose", "Michael Ballack", "Sepp Maier"],
    currentStars: ["Jamal Musiala", "Florian Wirtz", "Kai Havertz", "Joshua Kimmich", "Manuel Neuer"],
    rivalry: "Netherlands",
    greatestLegend: "Franz Beckenbauer",
    legendQuote: "Football is very simple. You get the ball, you pass it to a teammate, and you score.",
    goldenEra:
      "The 1970s, when Beckenbauer's sweeper system and Müller's ruthless finishing won two World Cups and a European Championship.",
    filaRanking: 14,
    founded: 1900,
    kit: { home: "#FFFFFF", away: "#000000" },
    heroImage: "https://images.pexels.com/photos/31744929/pexels-photo-31744929.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "spain",
    name: "Spain",
    continent: "Europe",
    flagColors: ["#AA151B", "#F1BF00"],
    shortDescription:
      "Spain's 2008–2012 era of tiki-taka dominance produced the most technically complete international team the game has ever seen.",
    footballIdentity:
      "Spain redefined football through possession, patience, and positional precision. Built on La Masia's philosophy, Spanish football prizes intelligence, touch, and collective movement.",
    styleOfPlay:
      "Possession-based, patient, and technically immaculate. Spain's game is about creating space through movement, short passing combinations, and forcing opponents to chase the ball.",
    worldCupAppearances: 16,
    worldCupWins: 1,
    confederationChampionships: 3,
    confederation: "UEFA",
    majorPlayers: ["Iker Casillas", "Xavi Hernández", "Andrés Iniesta", "Fernando Torres", "David Villa", "Sergio Ramos"],
    currentStars: ["Pedri", "Gavi", "Lamine Yamal", "Dani Olmo", "Alejandro Grimaldo"],
    rivalry: "Portugal",
    greatestLegend: "Xavi Hernández",
    legendQuote: "If you have the ball, you control the game. If you control the game, you win.",
    goldenEra:
      "2008 to 2012 — an unprecedented treble of major international titles that established Spain as the most dominant footballing force in history.",
    filaRanking: 3,
    founded: 1913,
    kit: { home: "#AA151B", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/200986/pexels-photo-200986.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "france",
    name: "France",
    continent: "Europe",
    flagColors: ["#002395", "#FFFFFF", "#ED2939"],
    shortDescription:
      "Les Bleus harness the extraordinary diversity of French talent, having won the World Cup in 1998 and 2018 with two very different but equally dominant sides.",
    footballIdentity:
      "France produces athletically exceptional, technically gifted players. Their clubs, particularly in recent years, have developed a conveyor belt of world-class talent from multicultural communities.",
    styleOfPlay:
      "Direct, physical, and explosive. Modern France relies on pace in behind, aerial dominance from set-pieces, and a deep creativity from central midfield.",
    worldCupAppearances: 16,
    worldCupWins: 2,
    confederationChampionships: 2,
    confederation: "UEFA",
    majorPlayers: ["Zinedine Zidane", "Thierry Henry", "Marcel Desailly", "Patrick Vieira", "Lilian Thuram"],
    currentStars: ["Kylian Mbappé", "Antoine Griezmann", "Ousmane Dembélé", "Aurélien Tchouaméni", "Mike Maignan"],
    rivalry: "Germany",
    greatestLegend: "Zinedine Zidane",
    legendQuote: "My goal was always to be the best. That drove everything.",
    goldenEra:
      "1998: World Cup winners on home soil, built around the genius of Zidane and the fortress of a Desailly-Thuram defensive spine.",
    filaRanking: 2,
    founded: 1919,
    kit: { home: "#002395", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/7005685/pexels-photo-7005685.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "england",
    name: "England",
    continent: "Europe",
    flagColors: ["#FFFFFF", "#CF142B"],
    shortDescription:
      "The birthplace of football has been chasing its first major honour since 1966. England's eternal story is one of enormous talent and agonising near-misses.",
    footballIdentity:
      "English football is rooted in passion, directness, and physical intensity. But the modern era has produced technically refined players who combine that traditional fighting spirit with European finesse.",
    styleOfPlay:
      "High-tempo, intense, physically demanding. England presses aggressively and moves the ball quickly, with full-backs playing a key role in width and attack.",
    worldCupAppearances: 16,
    worldCupWins: 1,
    confederationChampionships: 0,
    confederation: "UEFA",
    majorPlayers: ["Bobby Charlton", "Bobby Moore", "Gary Lineker", "Paul Gascoigne", "David Beckham", "Steven Gerrard"],
    currentStars: ["Jude Bellingham", "Phil Foden", "Harry Kane", "Bukayo Saka", "Declan Rice"],
    rivalry: "Germany",
    greatestLegend: "Bobby Moore",
    legendQuote: "My ambition is to play for England, which I did. That was always the ambition.",
    goldenEra:
      "1966 at Wembley — the only time England have lifted a major trophy, captain Bobby Moore receiving the World Cup from the Queen in front of 100,000.",
    filaRanking: 5,
    founded: 1863,
    kit: { home: "#FFFFFF", away: "#CF142B" },
    heroImage: "https://images.pexels.com/photos/30651230/pexels-photo-30651230.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "portugal",
    name: "Portugal",
    continent: "Europe",
    flagColors: ["#006600", "#FF0000"],
    shortDescription:
      "Portugal's golden generation, built around Cristiano Ronaldo's extraordinary ambition, turned a small nation into a consistent force in world football.",
    footballIdentity:
      "Technical, resilient, and tactically astute. Portuguese football prizes clever positioning, direct but composed attacks, and an intensity born from a desire to prove themselves on the biggest stage.",
    styleOfPlay:
      "Compact and disciplined defensively, patient in possession, and lethal on the counter. Portugal plays with calculated efficiency and clinical finishing.",
    worldCupAppearances: 9,
    worldCupWins: 0,
    confederationChampionships: 2,
    confederation: "UEFA",
    majorPlayers: ["Eusébio", "Luís Figo", "Cristiano Ronaldo", "Rui Costa", "Fernando Couto"],
    currentStars: ["Cristiano Ronaldo", "Bruno Fernandes", "Rafael Leão", "Rúben Dias", "João Félix"],
    rivalry: "Spain",
    greatestLegend: "Eusébio",
    legendQuote: "For me, there is no greater joy than playing football.",
    goldenEra:
      "Euro 2016 — an unlikely triumph in which Portugal, without winning a single group game in normal time, claimed their first major international title.",
    filaRanking: 6,
    founded: 1914,
    kit: { home: "#FF0000", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "italy",
    name: "Italy",
    continent: "Europe",
    flagColors: ["#009246", "#FFFFFF", "#CE2B37"],
    shortDescription:
      "Four-time world champions, Italy gave football catenaccio and the art of defensive excellence, producing some of the most tactically sophisticated football ever played.",
    footballIdentity:
      "Calcio is tactical chess. Italian football rewards cleverness, positioning, and reading the game. The Azzurri have always found ways to win through organisation and individual moments of quality.",
    styleOfPlay:
      "Defensively structured and incredibly organised. Italy maintains shape with precision, suffocates opponents through high pressing, and strikes with incisive forward play.",
    worldCupAppearances: 18,
    worldCupWins: 4,
    confederationChampionships: 2,
    confederation: "UEFA",
    majorPlayers: ["Paolo Maldini", "Roberto Baggio", "Gianluigi Buffon", "Francesco Totti", "Alessandro Del Piero", "Fabio Cannavaro"],
    currentStars: ["Sandro Tonali", "Matteo Retegui", "Federico Chiesa", "Gianluigi Donnarumma", "Nicolò Barella"],
    rivalry: "Germany",
    greatestLegend: "Paolo Maldini",
    legendQuote: "If I have to make a tackle, I've already made a mistake.",
    goldenEra:
      "The 1982 World Cup in Spain, where Italy's clinical finishing from Paolo Rossi dismantled Argentina, Brazil, and Germany to claim their third world title.",
    filaRanking: 9,
    founded: 1898,
    kit: { home: "#003DA5", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    continent: "Europe",
    flagColors: ["#AE1C28", "#FFFFFF", "#21468B"],
    shortDescription:
      "The birthplace of Total Football, the Netherlands revolutionised how football was conceptualised — never winning the World Cup but always inspiring the game.",
    footballIdentity:
      "The Dutch gave football its most influential tactical philosophy. Total Football — where every player is fluid in any role — emerged from Ajax and Johan Cruyff, and its ideas still shape the modern game.",
    styleOfPlay:
      "Positionally fluid, technically demanding, with every player expected to press, pass, and create. Netherlands plays with confidence on the ball and directness in attack.",
    worldCupAppearances: 11,
    worldCupWins: 0,
    confederationChampionships: 1,
    confederation: "UEFA",
    majorPlayers: ["Johan Cruyff", "Marco van Basten", "Ruud Gullit", "Frank Rijkaard", "Clarence Seedorf", "Dennis Bergkamp"],
    currentStars: ["Virgil van Dijk", "Memphis Depay", "Frenkie de Jong", "Cody Gakpo", "Stefan de Vrij"],
    rivalry: "Germany",
    greatestLegend: "Johan Cruyff",
    legendQuote: "Quality without results is pointless. Results without quality is boring.",
    goldenEra:
      "The 1974 and 1978 World Cups, where Cruyff's Netherlands played Total Football so beautiful that losing the finals felt almost irrelevant.",
    filaRanking: 7,
    founded: 1889,
    kit: { home: "#FF6600", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/227517/pexels-photo-227517.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "uruguay",
    name: "Uruguay",
    continent: "South America",
    flagColors: ["#5B9BD5", "#FFFFFF"],
    shortDescription:
      "The smallest nation to win two World Cups, Uruguay plays with a grit and pride that punches far above its population.",
    footballIdentity:
      "Garra charrúa — the fighting spirit of the indigenous Charrúa people — is the foundation of Uruguayan football. They compete with relentless intensity and refuse to accept defeat.",
    styleOfPlay:
      "Defensive solidity as a base, explosive transitions, and physical intensity in the press. Uruguay builds collective strength greater than the sum of its parts.",
    worldCupAppearances: 14,
    worldCupWins: 2,
    confederationChampionships: 15,
    confederation: "CONMEBOL",
    majorPlayers: ["José Nasazzi", "Obdulio Varela", "Juan Schiaffino", "Enzo Francescoli", "Diego Forlán"],
    currentStars: ["Darwin Núñez", "Federico Valverde", "Rodrigo Bentancur", "Luis Suárez", "Edinson Cavani"],
    rivalry: "Argentina",
    greatestLegend: "Enzo Francescoli",
    legendQuote: "To play for Uruguay is the greatest honour.",
    goldenEra:
      "1950: The Maracanazo. Uruguay beat Brazil in the deciding match of the World Cup in front of 200,000 stunned fans in Rio de Janeiro.",
    filaRanking: 17,
    founded: 1900,
    kit: { home: "#5B9BD5", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/34649364/pexels-photo-34649364.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "croatia",
    name: "Croatia",
    continent: "Europe",
    flagColors: ["#FF0000", "#FFFFFF", "#003087"],
    shortDescription:
      "Just three decades after independence, Croatia reached two World Cup finals, powered by a remarkable midfield tradition and fierce national identity.",
    footballIdentity:
      "Croatian football channels the passion of a young nation with everything to prove. Their technical midfielders and tireless work rate have consistently outperformed expectations on the grandest stages.",
    styleOfPlay:
      "Technically composed in possession, relentlessly energetic in the press, and blessed with creative midfielders who control tempo and deliver moments of class.",
    worldCupAppearances: 7,
    worldCupWins: 0,
    confederationChampionships: 0,
    confederation: "UEFA",
    majorPlayers: ["Davor Šuker", "Zvonimir Boban", "Robert Prosinečki", "Luka Modrić", "Ivan Rakitić"],
    currentStars: ["Luka Modrić", "Mateo Kovačić", "Ivan Perišić", "Josip Stanišić", "Andrej Kramarić"],
    rivalry: "Serbia",
    greatestLegend: "Luka Modrić",
    legendQuote: "Never stop believing. Hard work and persistence will always be rewarded.",
    goldenEra:
      "2018: Croatia reached the World Cup final for the first time, Modrić winning the Golden Ball as the tournament's best player in Russia.",
    filaRanking: 10,
    founded: 1912,
    kit: { home: "#FF0000", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/31160100/pexels-photo-31160100.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "senegal",
    name: "Senegal",
    continent: "Africa",
    flagColors: ["#00853F", "#FDEF42", "#E31B23"],
    shortDescription:
      "Africa's most exciting footballing nation, Senegal became continental champions in 2021 and reached the quarter-finals of two World Cups.",
    footballIdentity:
      "Senegalese football is built on physicality, pace, and an attacking directness that reflects a new generation of African talent capable of competing at the highest level.",
    styleOfPlay:
      "Athletic, direct, and powerful. Senegal uses width and pace to stretch defences before threading incisive balls through for technically gifted forwards.",
    worldCupAppearances: 3,
    worldCupWins: 0,
    confederationChampionships: 1,
    confederation: "CAF",
    majorPlayers: ["El Hadji Diouf", "Khalilou Fadiga", "Aliou Cissé", "Sadio Mané", "Papa Bouba Diop"],
    currentStars: ["Sadio Mané", "Kalidou Koulibaly", "Ismaila Sarr", "Pape Gueye", "Edouard Mendy"],
    rivalry: "Egypt",
    greatestLegend: "Sadio Mané",
    legendQuote: "My childhood was difficult. Football gave me a way to dream.",
    goldenEra:
      "2022: Sadio Mané's Senegal won the Africa Cup of Nations, then reached the World Cup last 16 in Qatar — the defining peak of the Lions of Teranga.",
    filaRanking: 20,
    founded: 1960,
    kit: { home: "#FFFFFF", away: "#009A44" },
    heroImage: "https://images.pexels.com/photos/31744929/pexels-photo-31744929.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "mexico",
    name: "Mexico",
    continent: "North America",
    flagColors: ["#006847", "#FFFFFF", "#CE1126"],
    shortDescription:
      "Mexico is the dominant force in CONCACAF and the most popular football nation in North America, with a passionate fanbase and a tradition of skilful attackers.",
    footballIdentity:
      "El Tri plays with creativity and audacity. Mexican football values technical skill, positional intelligence, and a willingness to take on opponents directly with pace.",
    styleOfPlay:
      "Technically comfortable in possession, direct when moving forward, and willing to play through pressure. Mexico plays attractive, forward-thinking football.",
    worldCupAppearances: 17,
    worldCupWins: 0,
    confederationChampionships: 11,
    confederation: "CONCACAF",
    majorPlayers: ["Hugo Sánchez", "Cuauhtémoc Blanco", "Jorge Campos", "Rafael Márquez", "Javier Hernández"],
    currentStars: ["Hirving Lozano", "Alexis Vega", "Guillermo Ochoa", "Edson Álvarez", "Santiago Giménez"],
    rivalry: "USA",
    greatestLegend: "Hugo Sánchez",
    legendQuote: "I always tried to make football an art form.",
    goldenEra:
      "1986: Mexico hosted the World Cup, reaching the quarter-finals against West Germany in a penalty shootout, with Azteca in full roar.",
    filaRanking: 15,
    founded: 1927,
    kit: { home: "#006847", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/200986/pexels-photo-200986.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "japan",
    name: "Japan",
    continent: "Asia",
    flagColors: ["#FFFFFF", "#BC002D"],
    shortDescription:
      "Japan's disciplined and technically refined football has produced a generation of players who now excel in the world's biggest clubs and leagues.",
    footballIdentity:
      "Japanese football reflects the national culture — precision, discipline, humility, and collective effort. Their approach to youth development has built a genuine footballing powerhouse in Asia.",
    styleOfPlay:
      "Organised, disciplined, and technical. Japan presses as a unit, moves the ball quickly through midfield, and has developed a modern high-pressing style under successive managers.",
    worldCupAppearances: 7,
    worldCupWins: 0,
    confederationChampionships: 4,
    confederation: "AFC",
    majorPlayers: ["Hidetoshi Nakata", "Shunsuke Nakamura", "Keisuke Honda", "Shinji Kagawa", "Yuto Nagatomo"],
    currentStars: ["Takehiro Tomiyasu", "Ritsu Doan", "Daichi Kamada", "Kaoru Mitoma", "Ayase Ueda"],
    rivalry: "South Korea",
    greatestLegend: "Hidetoshi Nakata",
    legendQuote: "I want Japanese football to be respected worldwide.",
    goldenEra:
      "2022 Qatar World Cup: Japan defeated Germany and Spain in the group stage, a result that announced them as genuine dark horses on the world stage.",
    filaRanking: 17,
    founded: 1921,
    kit: { home: "#003087", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/7005685/pexels-photo-7005685.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "morocco",
    name: "Morocco",
    continent: "Africa",
    flagColors: ["#C1272D", "#006233"],
    shortDescription:
      "Morocco's stunning run to the 2022 World Cup semi-finals — the first African nation to reach that stage — signalled a new era for African football.",
    footballIdentity:
      "The Atlas Lions combine tactical discipline with technical quality, producing players who thrive in European leagues. Morocco has become a model for modern African football development.",
    styleOfPlay:
      "Defensively resolute, extremely well-organised, with fluid transitions into attack. Morocco under Walid Regragui showed world-class defensive organisation combined with purposeful attacking play.",
    worldCupAppearances: 6,
    worldCupWins: 0,
    confederationChampionships: 1,
    confederation: "CAF",
    majorPlayers: ["Mustapha Hajji", "Noureddine Naybet", "Hakim Ziyech", "Achraf Hakimi", "Youssef En-Nesyri"],
    currentStars: ["Achraf Hakimi", "Hakim Ziyech", "Yassine Bounou", "Sofyan Amrabat", "Azzedine Ounahi"],
    rivalry: "Algeria",
    greatestLegend: "Mustapha Hajji",
    legendQuote: "We showed the world that African football belongs at the highest level.",
    goldenEra:
      "2022: Morocco dismantled Spain, Portugal, and pushed France to the limit, becoming the first African nation in World Cup semi-final history.",
    filaRanking: 14,
    founded: 1955,
    kit: { home: "#C1272D", away: "#FFFFFF" },
    heroImage: "https://images.pexels.com/photos/30651230/pexels-photo-30651230.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
]

export const continents = ["All", "Europe", "South America", "Africa", "North America", "Asia", "Oceania"]

export function getNationBySlug(slug: string): Nation | undefined {
  return nations.find((n) => n.slug === slug)
}

export function getNationsByContinent(continent: string): Nation[] {
  if (continent === "All") return nations
  return nations.filter((n) => n.continent === continent)
}

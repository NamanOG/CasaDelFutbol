export type QuizType = "guess-the-player" | "guess-the-club" | "guess-the-nation" | "trophy-challenge" | "formation-quiz" | "guess-by-transfers" | "manager-quiz" | "derby-days"

export type Difficulty = "beginner" | "intermediate" | "expert"

export interface QuizQuestion {
  id: string
  answer: string
  clues: string[]
  options: string[]
  difficulty: Difficulty
  category: string
  explanation: string
}

export interface TransferClue {
  club: string
  years: string
  role: string
}

export interface TransferQuestion {
  id: string
  answer: string
  transfers: TransferClue[]
  options: string[]
  difficulty: Difficulty
  category: string
  explanation: string
}

export interface QuizConfig {
  slug: QuizType
  name: string
  shortDescription: string
  description: string
  difficulty: Difficulty
  questions: QuizQuestion[]
  transferQuestions?: TransferQuestion[]
  mechanics: string
  icon: string
  heroImage: string
}

/* ═══════════════════════════════════════════
   GUESS THE PLAYER
   ═══════════════════════════════════════════ */
export const guessThePlayerQuestions: QuizQuestion[] = [
  {
    id: "p001",
    answer: "Lionel Messi",
    clues: [
      "I was born in Rosario, Argentina in 1987.",
      "I joined a famous Catalan club's academy at age 13.",
      "I have won more Ballon d'Or awards than any player in history.",
      "I won my first World Cup at age 35 in Qatar.",
      "I wear the number 10 shirt for my national team.",
    ],
    options: ["Cristiano Ronaldo", "Lionel Messi", "Neymar Jr.", "Kylian Mbappé"],
    difficulty: "beginner",
    category: "Modern Legends",
    explanation: "Lionel Messi is widely considered the greatest footballer of all time. Eight Ballon d'Or awards, four Champions League titles with Barcelona, and a World Cup victory with Argentina in 2022.",
  },
  {
    id: "p002",
    answer: "Cristiano Ronaldo",
    clues: [
      "I was born on a small Portuguese island in the Atlantic Ocean.",
      "I started my career at Sporting CP before moving to England.",
      "I won a Ballon d'Or at three different clubs.",
      "I scored over 800 career goals.",
      "I wear the number 7 shirt — at every club I have ever played for.",
    ],
    options: ["Wayne Rooney", "Cristiano Ronaldo", "Karim Benzema", "Zlatan Ibrahimović"],
    difficulty: "beginner",
    category: "Modern Legends",
    explanation: "Cristiano Ronaldo was born in Madeira, Portugal. He won the Ballon d'Or at Manchester United, Real Madrid, and Juventus — five in total.",
  },
  {
    id: "p003",
    answer: "Ronaldinho",
    clues: [
      "I grew up playing football barefoot on the beaches of Brazil.",
      "I won the FIFA World Player of the Year award two years in a row.",
      "My signature move was the elastico — a feint so fast it seemed physically impossible.",
      "I won La Liga and the Champions League at a famous Catalan club.",
      "I was once described by Messi as the player who made him fall in love with football.",
    ],
    options: ["Kaká", "Ronaldinho", "Roberto Carlos", "Rivaldo"],
    difficulty: "intermediate",
    category: "Modern Legends",
    explanation: "Ronaldinho Gaúcho is one of the most gifted players in football history. His two-year peak at Barcelona (2004-2006) featured play of such extraordinary flair that even Real Madrid fans stood to applaud him.",
  },
  {
    id: "p004",
    answer: "Diego Maradona",
    clues: [
      "I grew up in a shantytown on the outskirts of Buenos Aires.",
      "I scored two of the most famous goals in football history in the same match.",
      "I won the World Cup almost single-handedly in 1986.",
      "I was at my most celebrated at a club in the southern Italian city of Naples.",
      "My genius was matched only by the demons that followed me throughout my life.",
    ],
    options: ["Pelé", "Diego Maradona", "Roberto Baggio", "George Best"],
    difficulty: "beginner",
    category: "All-Time Greats",
    explanation: "Diego Maradona scored the 'Goal of the Century' and the 'Hand of God' goal against England in the 1986 World Cup quarter-final.",
  },
  {
    id: "p005",
    answer: "Pelé",
    clues: [
      "I was the only player ever to win three FIFA World Cups.",
      "I scored over 1,000 career goals, a feat that remains unmatched.",
      "I played my entire domestic career for a club in Santos, Brazil.",
      "I was 17 years old when I became a World Cup winner for the first time.",
      "I am often called O Rei — The King.",
    ],
    options: ["Zico", "Pelé", "Garrincha", "Romário"],
    difficulty: "beginner",
    category: "All-Time Greats",
    explanation: "Pelé is the only player to have won three FIFA World Cups (1958, 1962, 1970). At 17, he became the youngest World Cup winner in history.",
  },
  {
    id: "p006",
    answer: "Zinedine Zidane",
    clues: [
      "I was born in Marseille to Algerian immigrant parents.",
      "My most famous moment came not from genius, but from a moment of rage in a World Cup final.",
      "I won the World Cup and European Championship with my national team within two years.",
      "I scored a left-foot volley many consider the greatest goal ever in a Champions League final.",
      "After retiring as a player, I won three consecutive Champions League titles as a manager.",
    ],
    options: ["Patrick Vieira", "Zinedine Zidane", "Claude Makélélé", "Thierry Henry"],
    difficulty: "intermediate",
    category: "All-Time Greats",
    explanation: "Zinedine Zidane won the World Cup in 1998 and the Euros in 2000 with France. His volley for Real Madrid in the 2002 Champions League final is widely cited as the greatest goal in the competition's history.",
  },
  {
    id: "p007",
    answer: "Kylian Mbappé",
    clues: [
      "I was born in 1998 in the suburbs of Paris to parents of Cameroonian and Algerian origin.",
      "I became only the second teenager after Pelé to score in a World Cup final.",
      "I scored a hat-trick in a World Cup final — and still ended up on the losing side.",
      "I left my Paris club to join the club of my childhood dreams in the Spanish capital.",
      "I am already considered among the greatest players of my generation before age 26.",
    ],
    options: ["Erling Haaland", "Kylian Mbappé", "Jamal Musiala", "Pedri"],
    difficulty: "intermediate",
    category: "Current Stars",
    explanation: "Kylian Mbappé became a World Cup winner at 19 in 2018. In the 2022 final, he scored a hat-trick against Argentina but France still lost. He joined Real Madrid in 2024.",
  },
  {
    id: "p008",
    answer: "Johan Cruyff",
    clues: [
      "I invented a turn so famous it was named after me.",
      "I was the architect of Total Football — a philosophy that changed the game forever.",
      "I won three consecutive European Cups with the same club in the early 1970s.",
      "I later transformed that same club as a manager, building the Dream Team that won four consecutive league titles.",
      "My influence is so profound that football's modern tactical revolution traces directly back to my ideas.",
    ],
    options: ["Johan Cruyff", "Marco van Basten", "Ruud Gullit", "Dennis Bergkamp"],
    difficulty: "expert",
    category: "All-Time Greats",
    explanation: "Johan Cruyff developed Total Football at Ajax. He won three European Cups as a player (1971-73) and created Barcelona's La Masía philosophy as a manager.",
  },
  {
    id: "p009",
    answer: "Luka Modrić",
    clues: [
      "I grew up during a war in the Balkans, training near a military barracks as a child.",
      "I was initially told I was too small to become a professional footballer.",
      "I ended the Ronaldo-Messi era of Ballon d'Or dominance by winning it in 2018.",
      "I captained my nation to the World Cup final for the first time in their history.",
      "I have won more Champions League titles than any outfield player in history.",
    ],
    options: ["Ivan Rakitić", "Luka Modrić", "Toni Kroos", "Xavi Hernández"],
    difficulty: "intermediate",
    category: "Modern Legends",
    explanation: "Luka Modrić grew up during the Croatian War of Independence. His 2018 World Cup campaign — reaching the final with Croatia — won him the Ballon d'Or.",
  },
  {
    id: "p010",
    answer: "Franz Beckenbauer",
    clues: [
      "I revolutionised the sweeper position, turning a purely defensive role into one of creative control.",
      "I am one of only two people to win the World Cup as both player and manager.",
      "I spent my entire domestic career in the same German city, becoming its sporting icon.",
      "They called me Der Kaiser — The Emperor.",
      "I built the most complete German club side of the 1970s around me.",
    ],
    options: ["Sepp Maier", "Franz Beckenbauer", "Gerd Müller", "Karl-Heinz Rummenigge"],
    difficulty: "expert",
    category: "All-Time Greats",
    explanation: "Franz Beckenbauer redefined what a sweeper could be. He won the World Cup with West Germany in 1974 as captain and again in 1990 as manager.",
  },
  {
    id: "p011",
    answer: "Thierry Henry",
    clues: [
      "I grew up in a tough Parisian suburb known as Les Ulis.",
      "I started as a winger before being reinvented as a striker by a legendary French manager in England.",
      "I became the all-time leading scorer at a London club.",
      "I went an entire Premier League season unbeaten with my team.",
      "My celebration — sliding on my knees at Highbury — is one of football's most iconic images.",
    ],
    options: ["Thierry Henry", "Patrick Vieira", "Nicolas Anelka", "David Trezeguet"],
    difficulty: "intermediate",
    category: "Modern Legends",
    explanation: "Thierry Henry was transformed from a winger into the most lethal striker in Premier League history by Arsène Wenger at Arsenal. He scored 228 goals for the Gunners.",
  },
  {
    id: "p012",
    answer: "Erling Haaland",
    clues: [
      "I was born in Leeds, England, but represent Norway internationally.",
      "My father was also a professional footballer in the Premier League.",
      "I scored 36 goals in my debut Premier League season, breaking the record.",
      "I won the treble in my first season at my current club.",
      "I am known for my robotic celebration — a zen-like meditation pose.",
    ],
    options: ["Harry Kane", "Erling Haaland", "Robert Lewandowski", "Darwin Núñez"],
    difficulty: "beginner",
    category: "Current Stars",
    explanation: "Erling Haaland broke the Premier League scoring record in 2022-23 with 36 goals, helping Manchester City win an unprecedented treble.",
  },
]

/* ═══════════════════════════════════════════
   GUESS THE NATION
   ═══════════════════════════════════════════ */
export const guessTheNationQuestions: QuizQuestion[] = [
  {
    id: "n001",
    answer: "Brazil",
    clues: [
      "We have won the World Cup more times than any other nation.",
      "Our home shirt is famous worldwide for its bright yellow.",
      "We have produced players named Pelé, Ronaldo, and Ronaldinho.",
      "Football in our country is not just a sport — it is the national religion.",
      "We call our style jogo bonito — the beautiful game.",
    ],
    options: ["Argentina", "Brazil", "Colombia", "Mexico"],
    difficulty: "beginner",
    category: "Nations",
    explanation: "Brazil has won the World Cup five times (1958, 1962, 1970, 1994, 2002) — more than any other nation.",
  },
  {
    id: "n002",
    answer: "Germany",
    clues: [
      "We have reached more World Cup finals than any other nation.",
      "Our players are known for an almost mechanical precision and collective organisation.",
      "Our league gave the world gegenpressing — the high-intensity counter-press.",
      "We once played as two separate nations in two separate World Cups.",
      "We've won the World Cup four times and the Euros three times.",
    ],
    options: ["Netherlands", "Germany", "Belgium", "Austria"],
    difficulty: "beginner",
    category: "Nations",
    explanation: "West Germany and East Germany competed separately during the Cold War. Since reunification, Germany won the 2014 World Cup with a 7-1 semifinal victory over Brazil.",
  },
  {
    id: "n003",
    answer: "France",
    clues: [
      "We have won the World Cup twice — in 1998 and 2018.",
      "Our squad is built on extraordinary multicultural diversity.",
      "We produced Zinedine Zidane, Thierry Henry, and Kylian Mbappé.",
      "Our domestic league is known as a talent factory for world football.",
      "In 2022, we reached the World Cup final but lost on penalties.",
    ],
    options: ["France", "Belgium", "Portugal", "Spain"],
    difficulty: "beginner",
    category: "Nations",
    explanation: "France's multicultural squad has made them one of the most consistently powerful nations, winning the 1998 and 2018 World Cups.",
  },
  {
    id: "n004",
    answer: "Croatia",
    clues: [
      "We became an independent nation only in the 1990s.",
      "We reached the World Cup final twice — in 2018 and 2022.",
      "Our population is under 4 million people.",
      "We are famous for producing world-class midfielders.",
      "Our greatest ever player won the Ballon d'Or in 2018.",
    ],
    options: ["Serbia", "Croatia", "Slovenia", "Bosnia"],
    difficulty: "intermediate",
    category: "Nations",
    explanation: "Croatia, with a population of under 4 million, has produced an extraordinary generation of midfielders led by Luka Modrić.",
  },
  {
    id: "n005",
    answer: "Morocco",
    clues: [
      "We were the first African nation to reach a World Cup semi-final.",
      "We achieved this historic feat at the 2022 World Cup in Qatar.",
      "We beat Spain and Portugal on our way to the semi-finals.",
      "Our federation is based in North Africa.",
      "Our fans are among the most passionate in world football.",
    ],
    options: ["Egypt", "Morocco", "Tunisia", "Algeria"],
    difficulty: "intermediate",
    category: "Nations",
    explanation: "Morocco's historic 2022 World Cup run saw them become the first African and Arab nation to reach the semi-finals.",
  },
]

/* ═══════════════════════════════════════════
   TROPHY CHALLENGE
   ═══════════════════════════════════════════ */
export const trophyChallengeQuestions: QuizQuestion[] = [
  {
    id: "t001",
    answer: "UEFA Champions League",
    clues: [
      "I am the most prestigious club trophy in the world.",
      "My anthem was composed by Tony Britten and based on Handel's 'Zadok the Priest'.",
      "Real Madrid have won me more times than any other club — 15 times.",
      "My famous slogan is 'The Road to...'",
      "I feature star-shaped panels and distinctive handle arches.",
    ],
    options: ["UEFA Europa League", "UEFA Champions League", "FIFA Club World Cup", "UEFA Super Cup"],
    difficulty: "beginner",
    category: "Trophies",
    explanation: "The UEFA Champions League anthem is instantly recognisable worldwide. Real Madrid have been the most dominant side with 15 titles.",
  },
  {
    id: "t002",
    answer: "FIFA World Cup",
    clues: [
      "I am contested every four years by 32 national teams.",
      "The final of my tournament is watched by over a billion people.",
      "My trophy weighs 6.175 kg and stands 36.8 cm tall.",
      "I feature two human figures holding up the Earth.",
      "I was first held in Uruguay in 1930.",
    ],
    options: ["UEFA European Championship", "FIFA World Cup", "Copa América", "FIFA Confederations Cup"],
    difficulty: "beginner",
    category: "Trophies",
    explanation: "The FIFA World Cup trophy depicts two human figures reaching up to support the Earth. It is made of 18-carat gold and weighs 6.175 kg.",
  },
  {
    id: "t003",
    answer: "Copa América",
    clues: [
      "I am the oldest continental competition in football.",
      "I was first held in 1916 in Argentina.",
      "Uruguay and Argentina have each won me 15 times.",
      "I feature only South American nations plus invited guests.",
      "Lionel Messi won me for the first time in 2021.",
    ],
    options: ["Copa América", "CONCACAF Gold Cup", "Africa Cup of Nations", "FIFA World Cup"],
    difficulty: "intermediate",
    category: "Trophies",
    explanation: "Copa América is the oldest continental competition in football, predating the European Championship by 44 years.",
  },
]

/* ═══════════════════════════════════════════
   FORMATION QUIZ
   ═══════════════════════════════════════════ */
export const formationQuizQuestions: QuizQuestion[] = [
  {
    id: "f001",
    answer: "4-3-3",
    clues: [
      "This formation uses four defenders, three midfielders, and three forwards.",
      "Johan Cruyff popularised this formation at Ajax and Barcelona.",
      "It is designed to dominate possession and press high up the pitch.",
      "The three forwards typically consist of a centre-forward and two wide players.",
      "Barcelona's greatest sides under Guardiola used this as their base structure.",
    ],
    options: ["4-4-2", "4-3-3", "3-5-2", "4-2-3-1"],
    difficulty: "intermediate",
    category: "Formations",
    explanation: "The 4-3-3 was popularised by Johan Cruyff and became the hallmark formation of Total Football.",
  },
  {
    id: "f002",
    answer: "4-4-2",
    clues: [
      "This was the dominant formation in British football for decades.",
      "It uses two strikers playing in partnership.",
      "It was the backbone of Premier League football in the 1990s and early 2000s.",
      "Manchester United's treble-winning side of 1999 often used this.",
      "Critics call it outdated — the emergence of the false nine made it vulnerable.",
    ],
    options: ["4-4-2", "3-4-3", "4-3-3", "5-3-2"],
    difficulty: "beginner",
    category: "Formations",
    explanation: "The 4-4-2 was the default formation of English football for generations. Two banks of four formed a solid defensive shape.",
  },
  {
    id: "f003",
    answer: "3-5-2",
    clues: [
      "This formation sacrifices a defender for extra midfield control.",
      "Wing-backs are essential — they provide width in attack and defence.",
      "Antonio Conte has been its most famous modern proponent.",
      "It was revolutionary when it emerged in Italian calcio.",
      "Inter Milan's 2010 Champions League-winning side used a variation of this.",
    ],
    options: ["4-3-3", "3-5-2", "4-2-3-1", "4-4-2"],
    difficulty: "expert",
    category: "Formations",
    explanation: "The 3-5-2 relies heavily on athletic wing-backs to cover the entire flank. Antonio Conte used it to win titles at Juventus, Chelsea, and Inter Milan.",
  },
]

/* ═══════════════════════════════════════════
   GUESS BY TRANSFER HISTORY
   ═══════════════════════════════════════════ */
export const transferHistoryQuestions: TransferQuestion[] = [
  {
    id: "tr001",
    answer: "Cristiano Ronaldo",
    transfers: [
      { club: "Sporting CP", years: "2002–2003", role: "Youth → First Team" },
      { club: "Manchester United", years: "2003–2009", role: "Winger → Striker" },
      { club: "Real Madrid", years: "2009–2018", role: "Forward" },
      { club: "Juventus", years: "2018–2021", role: "Forward" },
      { club: "Manchester United", years: "2021–2022", role: "Forward" },
      { club: "Al Nassr", years: "2023–present", role: "Forward" },
    ],
    options: ["Lionel Messi", "Cristiano Ronaldo", "Karim Benzema", "Neymar Jr."],
    difficulty: "beginner",
    category: "Transfer History",
    explanation: "Cristiano Ronaldo's career has taken him from Sporting CP through Manchester United, Real Madrid, Juventus, back to United, and finally to Al Nassr in Saudi Arabia.",
  },
  {
    id: "tr002",
    answer: "Zlatan Ibrahimović",
    transfers: [
      { club: "Malmö FF", years: "1999–2001", role: "Striker" },
      { club: "Ajax", years: "2001–2004", role: "Striker" },
      { club: "Juventus", years: "2004–2006", role: "Forward" },
      { club: "Inter Milan", years: "2006–2009", role: "Forward" },
      { club: "Barcelona", years: "2009–2010", role: "Forward" },
      { club: "AC Milan", years: "2010–2012", role: "Forward" },
      { club: "Paris Saint-Germain", years: "2012–2016", role: "Forward" },
      { club: "Manchester United", years: "2016–2018", role: "Forward" },
    ],
    options: ["Zlatan Ibrahimović", "Thierry Henry", "David Beckham", "Samuel Eto'o"],
    difficulty: "intermediate",
    category: "Transfer History",
    explanation: "Zlatan Ibrahimović played for more top European clubs than almost any other player — 9 clubs across 5 countries in a career spanning over two decades.",
  },
  {
    id: "tr003",
    answer: "Thierry Henry",
    transfers: [
      { club: "Monaco", years: "1994–1999", role: "Winger" },
      { club: "Juventus", years: "1999 (Jan–Aug)", role: "Winger" },
      { club: "Arsenal", years: "1999–2007", role: "Striker" },
      { club: "Barcelona", years: "2007–2010", role: "Forward" },
      { club: "New York Red Bulls", years: "2010–2014", role: "Forward" },
    ],
    options: ["Patrick Vieira", "Robert Pires", "Thierry Henry", "Nicolas Anelka"],
    difficulty: "intermediate",
    category: "Transfer History",
    explanation: "Thierry Henry was converted from a winger at Monaco into the deadliest striker in Arsenal history by Arsène Wenger. He scored 228 goals for the Gunners.",
  },
  {
    id: "tr004",
    answer: "Ronaldo (R9)",
    transfers: [
      { club: "Cruzeiro", years: "1993–1994", role: "Striker" },
      { club: "PSV Eindhoven", years: "1994–1996", role: "Striker" },
      { club: "Barcelona", years: "1996–1997", role: "Striker" },
      { club: "Inter Milan", years: "1997–2002", role: "Striker" },
      { club: "Real Madrid", years: "2002–2007", role: "Forward" },
      { club: "AC Milan", years: "2007–2008", role: "Forward" },
      { club: "Corinthians", years: "2009–2011", role: "Forward" },
    ],
    options: ["Rivaldo", "Ronaldo (R9)", "Romário", "Adriano"],
    difficulty: "intermediate",
    category: "Transfer History",
    explanation: "Ronaldo Nazário — the original Ronaldo — was the most devastating striker of his generation. Two World Cup wins and a career defined by extraordinary pace and finishing.",
  },
  {
    id: "tr005",
    answer: "David Beckham",
    transfers: [
      { club: "Manchester United", years: "1992–2003", role: "Midfielder" },
      { club: "Real Madrid", years: "2003–2007", role: "Midfielder" },
      { club: "LA Galaxy", years: "2007–2012", role: "Midfielder" },
      { club: "AC Milan (loan)", years: "2009, 2010", role: "Midfielder" },
      { club: "Paris Saint-Germain", years: "2013", role: "Midfielder" },
    ],
    options: ["David Beckham", "Michael Owen", "Steven Gerrard", "Frank Lampard"],
    difficulty: "beginner",
    category: "Transfer History",
    explanation: "David Beckham's career spanned Manchester United, Real Madrid, LA Galaxy, AC Milan, and Paris Saint-Germain — making him one of football's first truly global superstars.",
  },
  {
    id: "tr006",
    answer: "Samuel Eto'o",
    transfers: [
      { club: "Real Madrid", years: "1997–2000", role: "Youth/Loaned" },
      { club: "RCD Mallorca", years: "2000–2004", role: "Striker" },
      { club: "Barcelona", years: "2004–2009", role: "Striker" },
      { club: "Inter Milan", years: "2009–2011", role: "Forward" },
      { club: "Anzhi Makhachkala", years: "2011–2013", role: "Forward" },
      { club: "Chelsea", years: "2013–2014", role: "Forward" },
    ],
    options: ["Didier Drogba", "Samuel Eto'o", "Michael Essien", "Yaya Touré"],
    difficulty: "expert",
    category: "Transfer History",
    explanation: "Samuel Eto'o is the most decorated African footballer ever, winning three Champions League titles (two with Barcelona, one with Inter Milan).",
  },
  {
    id: "tr007",
    answer: "Lionel Messi",
    transfers: [
      { club: "Newell's Old Boys", years: "1995–2000", role: "Youth" },
      { club: "FC Barcelona", years: "2000–2021", role: "Forward" },
      { club: "Paris Saint-Germain", years: "2021–2023", role: "Forward" },
      { club: "Inter Miami", years: "2023–present", role: "Forward" },
    ],
    options: ["Lionel Messi", "Neymar Jr.", "Luis Suárez", "Antoine Griezmann"],
    difficulty: "beginner",
    category: "Transfer History",
    explanation: "Lionel Messi spent 21 years at Barcelona before leaving in 2021. His departure to PSG and then Inter Miami marked the end of an era in club football.",
  },
  {
    id: "tr008",
    answer: "Michael Laudrup",
    transfers: [
      { club: "Brøndby IF", years: "1981–1983", role: "Midfielder" },
      { club: "Juventus", years: "1983–1989", role: "Midfielder" },
      { club: "Barcelona", years: "1989–1994", role: "Midfielder" },
      { club: "Real Madrid", years: "1994–1996", role: "Midfielder" },
      { club: "Vissel Kobe", years: "1996–1997", role: "Midfielder" },
      { club: "Ajax", years: "1997–1998", role: "Midfielder" },
    ],
    options: ["Michael Laudrup", "Brian Laudrup", "Peter Schmeichel", "Jesper Olsen"],
    difficulty: "expert",
    category: "Transfer History",
    explanation: "Michael Laudrup is the only player to have won La Liga titles with both Barcelona AND Real Madrid — an almost unthinkable feat given the rivalry.",
  },
  {
    id: "tr009",
    answer: "Edgar Davids",
    transfers: [
      { club: "Ajax", years: "1991–1996", role: "Midfielder" },
      { club: "AC Milan", years: "1996–1998", role: "Midfielder" },
      { club: "Juventus", years: "1998–2004", role: "Midfielder" },
      { club: "Barcelona", years: "2004", role: "Midfielder" },
      { club: "Inter Milan", years: "2004–2005", role: "Midfielder" },
      { club: "Tottenham Hotspur", years: "2005–2007", role: "Midfielder" },
    ],
    options: ["Patrick Vieira", "Edgar Davids", "Clarence Seedorf", "Frank Rijkaard"],
    difficulty: "expert",
    category: "Transfer History",
    explanation: "Edgar Davids was one of the most tenacious midfielders ever, recognisable by his trademark protective goggles. He played for Ajax, Milan, Juventus, Barcelona, Inter, and Spurs.",
  },
  {
    id: "tr010",
    answer: "Neymar Jr.",
    transfers: [
      { club: "Santos", years: "2009–2013", role: "Forward" },
      { club: "Barcelona", years: "2013–2017", role: "Forward" },
      { club: "Paris Saint-Germain", years: "2017–2023", role: "Forward" },
      { club: "Al Hilal", years: "2023–2025", role: "Forward" },
      { club: "Santos", years: "2025–present", role: "Forward" },
    ],
    options: ["Philippe Coutinho", "Neymar Jr.", "Vinícius Jr.", "Rodrygo"],
    difficulty: "beginner",
    category: "Transfer History",
    explanation: "Neymar's €222 million transfer from Barcelona to PSG in 2017 remains the most expensive transfer in football history.",
  },
]

/* ═══════════════════════════════════════════
   MANAGER QUIZ
   ═══════════════════════════════════════════ */
export const managerQuizQuestions: QuizQuestion[] = [
  {
    id: "m001",
    answer: "Pep Guardiola",
    clues: [
      "I was a defensive midfielder under Johan Cruyff's Dream Team.",
      "I won a sextuple in my first full calendar year as a first-team manager.",
      "I am known for my obsession with possession and positional play.",
      "I have managed in Spain, Germany, and England.",
      "I led Manchester City to a historic treble in 2023.",
    ],
    options: ["José Mourinho", "Pep Guardiola", "Jürgen Klopp", "Carlo Ancelotti"],
    difficulty: "beginner",
    category: "Managers",
    explanation: "Pep Guardiola is considered one of the greatest managers of all time, winning trebles with both Barcelona and Manchester City.",
  },
  {
    id: "m002",
    answer: "José Mourinho",
    clues: [
      "I worked as a translator for Bobby Robson at Barcelona.",
      "I won the Champions League with FC Porto against all odds.",
      "I called myself 'The Special One' during my first press conference in England.",
      "I won an unprecedented treble with Inter Milan in 2010.",
      "I have won league titles in Portugal, England, Italy, and Spain.",
    ],
    options: ["Sir Alex Ferguson", "José Mourinho", "Arsène Wenger", "Diego Simeone"],
    difficulty: "beginner",
    category: "Managers",
    explanation: "José Mourinho famously announced himself as 'The Special One' upon arriving at Chelsea in 2004, right after winning the UCL with Porto.",
  },
  {
    id: "m003",
    answer: "Carlo Ancelotti",
    clues: [
      "I am the only manager to have won the Champions League five times.",
      "I am the first manager to win the league title in all of Europe's top five leagues.",
      "I am known for my calm, man-management style and raised eyebrow.",
      "I managed the legendary AC Milan side of the mid-2000s.",
      "I currently manage Real Madrid.",
    ],
    options: ["Carlo Ancelotti", "Zinedine Zidane", "Marcello Lippi", "Fabio Capello"],
    difficulty: "intermediate",
    category: "Managers",
    explanation: "Don Carlo Ancelotti holds the record for the most Champions League titles as a manager (5) and the only one to win all top 5 European domestic leagues.",
  }
]

/* ═══════════════════════════════════════════
   DERBY DAYS
   ═══════════════════════════════════════════ */
export const derbyDaysQuestions: QuizQuestion[] = [
  {
    id: "d001",
    answer: "El Clásico",
    clues: [
      "I am arguably the most watched domestic football match in the world.",
      "I feature the two largest cities in my country.",
      "The rivalry has deep political undertones involving regional independence.",
      "A pig's head was once thrown onto the pitch during this match.",
      "Messi and Ronaldo defined this fixture for a decade.",
    ],
    options: ["El Clásico", "Superclásico", "Derby della Madonnina", "Der Klassiker"],
    difficulty: "beginner",
    category: "Derbies",
    explanation: "El Clásico between Real Madrid and Barcelona is a global phenomenon. The pig's head was thrown at Luis Figo after he moved from Barca to Madrid.",
  },
  {
    id: "d002",
    answer: "Superclásico",
    clues: [
      "I am contested in the capital city of Argentina.",
      "70% of the country's football fans support one of my two clubs.",
      "The British newspaper The Observer listed me as #1 in '50 sporting things you must do before you die'.",
      "In 2018, the second leg of our continental final had to be moved to Madrid due to violence.",
      "The clubs involved are Boca Juniors and River Plate.",
    ],
    options: ["Paulista Derby", "Superclásico", "El Tráfico", "Derby of the Eternal Enemies"],
    difficulty: "intermediate",
    category: "Derbies",
    explanation: "The Superclásico between Boca Juniors and River Plate is known for having arguably the most intense and hostile atmosphere in world football.",
  }
]

/* ═══════════════════════════════════════════
   ALL QUIZ CONFIGS
   ═══════════════════════════════════════════ */
export const allQuizConfigs: QuizConfig[] = [
  {
    slug: "guess-the-player",
    name: "Guess the Player",
    shortDescription: "Five clues. One legend. Can you identify them?",
    description: "Each round reveals five progressive clues about a famous footballer. Guess early for maximum points.",
    difficulty: "beginner",
    questions: guessThePlayerQuestions,
    mechanics: "Progressive clues · Multiple choice · Score on speed",
    icon: "P1",
    heroImage: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "guess-the-nation",
    name: "Guess the Nation",
    shortDescription: "Five facts about a footballing nation. Which one is it?",
    description: "From Brazil's jogo bonito to Germany's tactical precision — how quickly can you recognise them?",
    difficulty: "beginner",
    questions: guessTheNationQuestions,
    mechanics: "Progressive clues · Multiple choice · Nations worldwide",
    icon: "NT",
    heroImage: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "trophy-challenge",
    name: "Trophy Challenge",
    shortDescription: "Identify the competition from its description.",
    description: "Every trophy has a story. Can you identify which trophy matches the description?",
    difficulty: "intermediate",
    questions: trophyChallengeQuestions,
    mechanics: "Progressive clues · Multiple choice · All major trophies",
    icon: "TR",
    heroImage: "https://images.pexels.com/photos/227517/pexels-photo-227517.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "formation-quiz",
    name: "Formation & Tactics",
    shortDescription: "Test your tactical knowledge of football formations.",
    description: "Football is as much about structure and tactics as skill. Test your formation knowledge.",
    difficulty: "intermediate",
    questions: formationQuizQuestions,
    mechanics: "Multiple choice · Tactical analysis · Learn as you play",
    icon: "FX",
    heroImage: "https://images.pexels.com/photos/34649364/pexels-photo-34649364.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "guess-by-transfers",
    name: "Transfer History",
    shortDescription: "Guess the player from their career journey across clubs.",
    description: "Club by club, year by year — trace the career path and guess which footballer took this journey through world football.",
    difficulty: "intermediate",
    questions: [],
    transferQuestions: transferHistoryQuestions,
    mechanics: "Timeline reveal · Club-by-club · Three difficulty tiers",
    icon: "TX",
    heroImage: "https://images.pexels.com/photos/31160100/pexels-photo-31160100.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "manager-quiz",
    name: "Masterminds",
    shortDescription: "Identify the tactical genius behind the trophies.",
    description: "From 'The Special One' to 'Der Kaiser'. Can you identify the great managers from their career achievements?",
    difficulty: "intermediate",
    questions: managerQuizQuestions,
    mechanics: "Progressive clues · Multiple choice",
    icon: "MG",
    heroImage: "https://images.pexels.com/photos/15598694/pexels-photo-15598694.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
  {
    slug: "derby-days",
    name: "Derby Days",
    shortDescription: "Name the world's most fiercely contested rivalries.",
    description: "Derbies are where football means more than life and death. Test your knowledge of the world's greatest rivalries.",
    difficulty: "expert",
    questions: derbyDaysQuestions,
    mechanics: "Progressive clues · Multiple choice",
    icon: "DB",
    heroImage: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1280",
  },
]

export function getQuizBySlug(slug: QuizType): QuizConfig | undefined {
  return allQuizConfigs.find((q) => q.slug === slug)
}

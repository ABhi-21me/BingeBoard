// BingeBoard new tab logic
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const BADGE_DEFS = [
  // 1. Behavior Badges
  {
    id: "night-owl",
    icon: "🦉",
    name: "Night Owl",
    condition: "Watched past midnight (10PM–4AM)",
    detail: "Watch past midnight 3x for Bronze, 10x for Silver, 25x for Gold",
    unit: "nights",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_q518a3kb.json",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Common" },
      { level: "Silver", threshold: 10, rarity: "Common" },
      { level: "Gold", threshold: 25, rarity: "Common" }
    ]
  },
  {
    id: "marathon",
    icon: "🏃",
    name: "Marathon Runner",
    condition: "Logged watch sessions in history",
    detail: "Log 2 sessions for Bronze, 5 for Silver, 10 for Gold",
    unit: "sessions",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_5n2ys9.json",
    levels: [
      { level: "Bronze", threshold: 2, rarity: "Common" },
      { level: "Silver", threshold: 5, rarity: "Common" },
      { level: "Gold", threshold: 10, rarity: "Common" }
    ]
  },
  {
    id: "binge-beast",
    icon: "🔥",
    name: "Binge Beast",
    condition: "Complete titles on your watchlist",
    detail: "Complete 1 title for Bronze, 5 for Silver, 15 for Gold",
    unit: "titles",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_dh490p9x.json",
    levels: [
      { level: "Bronze", threshold: 1, rarity: "Rare" },
      { level: "Silver", threshold: 5, rarity: "Rare" },
      { level: "Gold", threshold: 15, rarity: "Rare" }
    ]
  },
  {
    id: "ghost-watcher",
    icon: "👻",
    name: "Ghost Watcher",
    condition: "Added titles to watchlist, never watched",
    detail: "Keep 10 titles for Bronze, 25 for Silver, 50 for Gold",
    unit: "titles",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_ghost.json",
    levels: [
      { level: "Bronze", threshold: 10, rarity: "Common" },
      { level: "Silver", threshold: 25, rarity: "Common" },
      { level: "Gold", threshold: 50, rarity: "Common" }
    ]
  },
  {
    id: "directors-cut",
    icon: "🎬",
    name: "Director's Cut",
    condition: "Watched the same title multiple times",
    detail: "Watch same title 2x for Bronze, 3x for Silver, 5x for Gold",
    unit: "watches",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_c9t1r6xp.json",
    levels: [
      { level: "Bronze", threshold: 2, rarity: "Rare" },
      { level: "Silver", threshold: 3, rarity: "Rare" },
      { level: "Gold", threshold: 5, rarity: "Rare" }
    ]
  },
  {
    id: "speed-runner",
    icon: "⚡",
    name: "Speed Runner",
    condition: "Finished a series in under 48 hours",
    detail: "Finish 1 series in 48h for Bronze, 3 for Silver, 5 for Gold",
    unit: "series",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_lightning.json",
    levels: [
      { level: "Bronze", threshold: 1, rarity: "Legendary" },
      { level: "Silver", threshold: 3, rarity: "Legendary" },
      { level: "Gold", threshold: 5, rarity: "Legendary" }
    ]
  },
  {
    id: "antisocial",
    icon: "🌙",
    name: "Antisocial",
    condition: "Watched past 3AM",
    detail: "Watch past 3AM 3x for Bronze, 10x for Silver, 20x for Gold",
    unit: "times",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_moon.json",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Legendary" },
      { level: "Silver", threshold: 10, rarity: "Legendary" },
      { level: "Gold", threshold: 20, rarity: "Legendary" }
    ]
  },
  {
    id: "genre-hopper",
    icon: "🌍",
    name: "Genre Hopper",
    condition: "Watched 5 different genres in one week",
    detail: "Watch 5 genres in 1 week for Bronze, 3 weeks for Silver, 8 weeks for Gold",
    unit: "weeks",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_c7u1270o.json",
    levels: [
      { level: "Bronze", threshold: 1, rarity: "Rare" },
      { level: "Silver", threshold: 3, rarity: "Rare" },
      { level: "Gold", threshold: 8, rarity: "Rare" }
    ]
  },

  // 2. Genre Badges
  {
    id: "horror-addict",
    icon: "🎭",
    name: "Horror Addict",
    condition: "Watched horror genre titles",
    detail: "Watch horror 5x for Bronze, 15x for Silver, 30x for Gold",
    unit: "titles",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_skull.json",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 15, rarity: "Common" },
      { level: "Gold", threshold: 30, rarity: "Common" }
    ]
  },
  {
    id: "romcom-veteran",
    icon: "💘",
    name: "Romcom Veteran",
    condition: "Watched romcom genre titles",
    detail: "Watch romcom 5x for Bronze, 15x for Silver, 30x for Gold",
    unit: "titles",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_heart.json",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 15, rarity: "Common" },
      { level: "Gold", threshold: 30, rarity: "Common" }
    ]
  },
  {
    id: "doc-lover",
    icon: "📺",
    name: "Doc Lover",
    condition: "Watched documentary titles",
    detail: "Watch docs 5x for Bronze, 15x for Silver, 30x for Gold",
    unit: "titles",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_tv.json",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 15, rarity: "Common" },
      { level: "Gold", threshold: 30, rarity: "Common" }
    ]
  },
  {
    id: "thriller-junkie",
    icon: "🗡️",
    name: "Thriller Junkie",
    condition: "Watched thriller genre titles",
    detail: "Watch thriller 5x for Bronze, 20x for Silver, 40x for Gold",
    unit: "titles",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_sword.json",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Rare" },
      { level: "Silver", threshold: 20, rarity: "Rare" },
      { level: "Gold", threshold: 40, rarity: "Rare" }
    ]
  },
  {
    id: "anime-head",
    icon: "🌸",
    name: "Anime Head",
    condition: "Watched anime titles",
    detail: "Watch anime 5x for Bronze, 20x for Silver, 50x for Gold",
    unit: "titles",
    lottiePath: "https://assets10.lottiefiles.com/packages/lf20_star.json",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Rare" },
      { level: "Silver", threshold: 20, rarity: "Rare" },
      { level: "Gold", threshold: 50, rarity: "Rare" }
    ]
  },
  {
    id: "sci-fi-obsessed",
    icon: "🚀",
    name: "Sci-Fi Obsessed",
    condition: "Watched sci-fi titles",
    detail: "Watch sci-fi 5x for Bronze, 15x for Silver, 30x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Rare" },
      { level: "Silver", threshold: 15, rarity: "Rare" },
      { level: "Gold", threshold: 30, rarity: "Rare" }
    ]
  },
  {
    id: "fantasy-fanatic",
    icon: "🧙",
    name: "Fantasy Fanatic",
    condition: "Watched fantasy genre titles",
    detail: "Watch fantasy 5x for Bronze, 15x for Silver, 30x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Rare" },
      { level: "Silver", threshold: 15, rarity: "Rare" },
      { level: "Gold", threshold: 30, rarity: "Rare" }
    ]
  },
  {
    id: "comedy-king",
    icon: "😂",
    name: "Comedy King",
    condition: "Watched comedy titles",
    detail: "Watch comedy 5x for Bronze, 15x for Silver, 30x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 15, rarity: "Common" },
      { level: "Gold", threshold: 30, rarity: "Common" }
    ]
  },
  {
    id: "action-junkie",
    icon: "💥",
    name: "Action Junkie",
    condition: "Watched action titles",
    detail: "Watch action 5x for Bronze, 20x for Silver, 40x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 20, rarity: "Common" },
      { level: "Gold", threshold: 40, rarity: "Common" }
    ]
  },
  {
    id: "mystery-maniac",
    icon: "🕵️",
    name: "Mystery Maniac",
    condition: "Watched mystery/crime titles",
    detail: "Watch mystery 5x for Bronze, 15x for Silver, 25x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Rare" },
      { level: "Silver", threshold: 15, rarity: "Rare" },
      { level: "Gold", threshold: 25, rarity: "Rare" }
    ]
  },
  {
    id: "dark-drama-lord",
    icon: "💀",
    name: "Dark Drama Lord",
    condition: "Watched dark drama titles",
    detail: "Watch dark drama 5x for Bronze, 15x for Silver, 30x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Rare" },
      { level: "Silver", threshold: 15, rarity: "Rare" },
      { level: "Gold", threshold: 30, rarity: "Rare" }
    ]
  },
  {
    id: "musical-soul",
    icon: "🎵",
    name: "Musical Soul",
    condition: "Watched musical titles",
    detail: "Watch musical 3x for Bronze, 8x for Silver, 15x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Common" },
      { level: "Silver", threshold: 8, rarity: "Common" },
      { level: "Gold", threshold: 15, rarity: "Common" }
    ]
  },
  {
    id: "western-rider",
    icon: "🤠",
    name: "Western Rider",
    condition: "Watched western genre titles",
    detail: "Watch western 3x for Bronze, 8x for Silver, 15x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Uncommon" },
      { level: "Silver", threshold: 8, rarity: "Uncommon" },
      { level: "Gold", threshold: 15, rarity: "Uncommon" }
    ]
  },
  {
    id: "war-witness",
    icon: "⚔️",
    name: "War Witness",
    condition: "Watched war genre titles",
    detail: "Watch war 3x for Bronze, 8x for Silver, 15x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Uncommon" },
      { level: "Silver", threshold: 8, rarity: "Uncommon" },
      { level: "Gold", threshold: 15, rarity: "Uncommon" }
    ]
  },
  {
    id: "indie-explorer",
    icon: "🧪",
    name: "Indie Explorer",
    condition: "Watched indie/arthouse titles",
    detail: "Watch indie 3x for Bronze, 10x for Silver, 20x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Rare" },
      { level: "Silver", threshold: 10, rarity: "Rare" },
      { level: "Gold", threshold: 20, rarity: "Rare" }
    ]
  },
  {
    id: "animation-nerd",
    icon: "👶",
    name: "Animation Nerd",
    condition: "Watched animated titles",
    detail: "Watch animation 5x for Bronze, 15x for Silver, 30x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 15, rarity: "Common" },
      { level: "Gold", threshold: 30, rarity: "Common" }
    ]
  },
  {
    id: "nature-watcher",
    icon: "🌊",
    name: "Nature Watcher",
    condition: "Watched nature documentaries",
    detail: "Watch nature 3x for Bronze, 8x for Silver, 15x for Gold",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Common" },
      { level: "Silver", threshold: 8, rarity: "Common" },
      { level: "Gold", threshold: 15, rarity: "Common" }
    ]
  },

  // 3. Streak & Time Badges
  {
    id: "weekly-warrior",
    icon: "📅",
    name: "Weekly Warrior",
    condition: "Watched 7 days in a row",
    detail: "Bronze: 1 week | Silver: 3 weeks | Gold: 8 weeks",
    unit: "weeks",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 1, rarity: "Common" },
      { level: "Silver", threshold: 3, rarity: "Common" },
      { level: "Gold", threshold: 8, rarity: "Common" }
    ]
  },
  {
    id: "monthly-legend",
    icon: "🗓️",
    name: "Monthly Legend",
    condition: "Watched 30 days in a row",
    detail: "Bronze: 30 days | Silver: 60 days | Gold: 90 days",
    unit: "days",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 30, rarity: "Legendary" },
      { level: "Silver", threshold: 60, rarity: "Legendary" },
      { level: "Gold", threshold: 90, rarity: "Legendary" }
    ]
  },
  {
    id: "early-bird",
    icon: "☀️",
    name: "Early Bird",
    condition: "Watched before 8AM",
    detail: "Bronze: 3 times | Silver: 10 times | Gold: 20 times",
    unit: "times",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Common" },
      { level: "Silver", threshold: 10, rarity: "Common" },
      { level: "Gold", threshold: 20, rarity: "Common" }
    ]
  },
  {
    id: "evening-ritual",
    icon: "🌆",
    name: "Evening Ritual",
    condition: "Watched between 6PM–9PM for 10 days",
    detail: "Bronze: 5 days | Silver: 15 days | Gold: 30 days",
    unit: "days",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 15, rarity: "Common" },
      { level: "Gold", threshold: 30, rarity: "Common" }
    ]
  },
  {
    id: "punctual-viewer",
    icon: "⏰",
    name: "Punctual Viewer",
    condition: "Watched at same time 5 days in a row",
    detail: "Bronze: 5 days | Silver: 14 days | Gold: 30 days",
    unit: "days",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Uncommon" },
      { level: "Silver", threshold: 14, rarity: "Uncommon" },
      { level: "Gold", threshold: 30, rarity: "Uncommon" }
    ]
  },

  // 4. Watchlist Badges
  {
    id: "list-maker",
    icon: "📋",
    name: "List Maker",
    condition: "Added 10+ titles to watchlist",
    detail: "Bronze: 10 | Silver: 25 | Gold: 50 titles",
    unit: "titles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 10, rarity: "Common" },
      { level: "Silver", threshold: 25, rarity: "Common" },
      { level: "Gold", threshold: 50, rarity: "Common" }
    ]
  },
  {
    id: "completionist",
    icon: "✅",
    name: "Completionist",
    condition: "Completed 90% of watchlist",
    detail: "Bronze: 50% | Silver: 75% | Gold: 90%",
    unit: "%",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 50, rarity: "Legendary" },
      { level: "Silver", threshold: 75, rarity: "Legendary" },
      { level: "Gold", threshold: 90, rarity: "Legendary" }
    ]
  },
  {
    id: "the-quitter",
    icon: "🗑️",
    name: "The Quitter",
    condition: "Dropped 5 titles from watchlist",
    detail: "Bronze: 5 | Silver: 15 | Gold: 30 dropped",
    unit: "dropped",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 15, rarity: "Common" },
      { level: "Gold", threshold: 30, rarity: "Common" }
    ]
  },
  {
    id: "indecisive",
    icon: "🔁",
    name: "Indecisive",
    condition: "Shuffled daily pick 10+ times in one day",
    detail: "Bronze: 10x | Silver: 25x | Gold: 50x",
    unit: "shuffles",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 10, rarity: "Common" },
      { level: "Silver", threshold: 25, rarity: "Common" },
      { level: "Gold", threshold: 50, rarity: "Common" }
    ]
  },
  {
    id: "clean-slate",
    icon: "🧹",
    name: "Clean Slate",
    condition: "Completed entire watchlist at once",
    detail: "Bronze: 1 time | Silver: 3 times | Gold: 5 times",
    unit: "times",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 1, rarity: "Uncommon" },
      { level: "Silver", threshold: 3, rarity: "Uncommon" },
      { level: "Gold", threshold: 5, rarity: "Uncommon" }
    ]
  },

  // 5. Session Badges
  {
    id: "popcorn-mode",
    icon: "🍿",
    name: "Popcorn Mode",
    condition: "Watched 2+ hours in one session",
    detail: "Bronze: 5 sessions | Silver: 15 | Gold: 30",
    unit: "sessions",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 15, rarity: "Common" },
      { level: "Gold", threshold: 30, rarity: "Common" }
    ]
  },
  {
    id: "couch-potato",
    icon: "🛋️",
    name: "Couch Potato",
    condition: "Watched 6+ hours in one day",
    detail: "Bronze: 2 days | Silver: 5 days | Gold: 10 days",
    unit: "days",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 2, rarity: "Rare" },
      { level: "Silver", threshold: 5, rarity: "Rare" },
      { level: "Gold", threshold: 10, rarity: "Rare" }
    ]
  },
  {
    id: "second-screen",
    icon: "📱",
    name: "Second Screen",
    condition: "Watched on multiple sessions same day",
    detail: "Bronze: 5 days | Silver: 15 days | Gold: 30",
    unit: "days",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Common" },
      { level: "Silver", threshold: 15, rarity: "Common" },
      { level: "Gold", threshold: 30, rarity: "Common" }
    ]
  },
  {
    id: "focused",
    icon: "🎯",
    name: "Focused",
    condition: "Watched same show 3 days in a row",
    detail: "Bronze: 1 show | Silver: 3 shows | Gold: 7 shows",
    unit: "shows",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 1, rarity: "Uncommon" },
      { level: "Silver", threshold: 3, rarity: "Uncommon" },
      { level: "Gold", threshold: 7, rarity: "Uncommon" }
    ]
  },
  {
    id: "hypnotized",
    icon: "🌀",
    name: "Hypnotized",
    condition: "Auto-played next episode 5 times without stopping",
    detail: "Bronze: 5x | Silver: 15x | Gold: 30x",
    unit: "times",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 5, rarity: "Rare" },
      { level: "Silver", threshold: 15, rarity: "Rare" },
      { level: "Gold", threshold: 30, rarity: "Rare" }
    ]
  },

  // 6. Special Badges
  {
    id: "the-critic",
    icon: "🏆",
    name: "The Critic",
    condition: "Rated 20+ titles personally",
    detail: "Bronze: 10 | Silver: 20 | Gold: 50 ratings",
    unit: "ratings",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 10, rarity: "Rare" },
      { level: "Silver", threshold: 20, rarity: "Rare" },
      { level: "Gold", threshold: 50, rarity: "Rare" }
    ]
  },
  {
    id: "deep-diver",
    icon: "🔍",
    name: "Deep Diver",
    condition: "Searched watchlist 50+ times",
    detail: "Bronze: 20x | Silver: 50x | Gold: 100x",
    unit: "searches",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 20, rarity: "Uncommon" },
      { level: "Silver", threshold: 50, rarity: "Uncommon" },
      { level: "Gold", threshold: 100, rarity: "Uncommon" }
    ]
  },
  {
    id: "wild-card",
    icon: "🎲",
    name: "Wild Card",
    condition: "Used shuffle daily pick 30+ times total",
    detail: "Bronze: 10x | Silver: 30x | Gold: 75x",
    unit: "times",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 10, rarity: "Uncommon" },
      { level: "Silver", threshold: 30, rarity: "Uncommon" },
      { level: "Gold", threshold: 75, rarity: "Uncommon" }
    ]
  },
  {
    id: "royalty",
    icon: "👑",
    name: "Royalty",
    condition: "Used BingeBoard for 365 days",
    detail: "Bronze: 30 days | Silver: 180 days | Gold: 365 days",
    unit: "days",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 30, rarity: "Legendary" },
      { level: "Silver", threshold: 180, rarity: "Legendary" },
      { level: "Gold", threshold: 365, rarity: "Legendary" }
    ]
  },
  {
    id: "cold-blooded",
    icon: "🧊",
    name: "Cold Blooded",
    condition: "Dropped a show after episode 1",
    detail: "Bronze: 3 shows | Silver: 8 shows | Gold: 15 shows",
    unit: "shows",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Uncommon" },
      { level: "Silver", threshold: 8, rarity: "Uncommon" },
      { level: "Gold", threshold: 15, rarity: "Uncommon" }
    ]
  },
  {
    id: "variety-show",
    icon: "🎪",
    name: "Variety Show",
    condition: "Watched 5 different platforms in one week",
    detail: "Bronze: 1 week | Silver: 3 weeks | Gold: 8 weeks",
    unit: "weeks",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 1, rarity: "Uncommon" },
      { level: "Silver", threshold: 3, rarity: "Uncommon" },
      { level: "Gold", threshold: 8, rarity: "Uncommon" }
    ]
  },
  {
    id: "hall-of-fame",
    icon: "🌟",
    name: "Hall of Fame",
    condition: "Unlocked 25 other badges",
    detail: "Bronze: 10 | Silver: 20 | Gold: 25 badges",
    unit: "badges",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 10, rarity: "Legendary" },
      { level: "Silver", threshold: 20, rarity: "Legendary" },
      { level: "Gold", threshold: 25, rarity: "Legendary" }
    ]
  },
  {
    id: "cinephile",
    icon: "🧠",
    name: "Cinephile",
    condition: "Watched titles from 10 different countries",
    detail: "Bronze: 3 countries | Silver: 7 | Gold: 10",
    unit: "countries",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Legendary" },
      { level: "Silver", threshold: 7, rarity: "Legendary" },
      { level: "Gold", threshold: 10, rarity: "Legendary" }
    ]
  },
  {
    id: "fell-asleep",
    icon: "💤",
    name: "Fell Asleep",
    condition: "Paused a title at same spot 3 times",
    detail: "Bronze: 3x | Silver: 8x | Gold: 15x",
    unit: "times",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 3, rarity: "Common" },
      { level: "Silver", threshold: 8, rarity: "Common" },
      { level: "Gold", threshold: 15, rarity: "Common" }
    ]
  },
  {
    id: "bingeboard-og",
    icon: "🎖️",
    name: "BingeBoard OG",
    condition: "First title ever added to BingeBoard",
    detail: "Bronze: instant unlock on first add",
    unit: "added",
    lottiePath: "",
    levels: [
      { level: "Bronze", threshold: 1, rarity: "Legendary" },
      { level: "Silver", threshold: 1, rarity: "Legendary" },
      { level: "Gold", threshold: 1, rarity: "Legendary" }
    ]
  }
];

const state = {
  data: null,
  activeTab: "home",
  bkSearch: "",
  wlSearch: "",
  wlFilter: "all",
  chromeBookmarks: []
};

// Colors for fallback favicon backgrounds
const MUTED_COLORS = [
  "#2c3e50", "#27ae60", "#2980b9", "#8e44ad", "#d35400",
  "#c0392b", "#16a085", "#7f8c8d", "#2c2c54", "#4717f6"
];

const badgeAnims = {};

function getFallbackText(name) {
  const clean = (name || "").trim();
  if (!clean) return "??";
  return clean.slice(0, 2).toUpperCase();
}

function getDisplayName(title, url) {
  let name = (title || "").trim();
  if (!name || /^https?:\/\//i.test(name)) {
    try {
      name = new URL(url || name).hostname.replace("www.", "");
    } catch (_) {
      name = name || url;
    }
  }
  return name;
}

function faviconUrl(pageUrl) {
  return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(pageUrl)}&size=64`;
}

async function loadData() {
  state.data = await chrome.storage.local.get(null);
  if (!state.data.theme)           state.data.theme = { preset: "brutalist", accentColor: "", mode: "dark" };
  // Lock to dark theme as permanent
  state.data.theme.mode = "dark";
  state.data.theme.preset = "brutalist";
  if (!state.data.settings)        state.data.settings = { dockEnabled: true, skipIntroEnabled: true, enabledPlatforms: ["netflix","prime","hotstar","youtube","jiocinema"], tmdbKey: "" };
  if (!state.data.pinnedPlatforms) state.data.pinnedPlatforms = [];
  if (!state.data.watchlist)       state.data.watchlist = [];
  if (!state.data.watches)         state.data.watches = [];
  if (!state.data.badges)          state.data.badges = [];
  if (!state.data.streaks)         state.data.streaks = { current: 0, longest: 0, lastWatchDate: null };
  if (!state.data.dailyPick)       state.data.dailyPick = { title: null, date: null };
  if (!state.data.username)        state.data.username = "";
  if (!state.data.onboarded)       state.data.onboarded = false;
  if (!state.data.lastVisited)     state.data.lastVisited = null;
}

function flattenBookmarks(nodes) {
  const results = [];
  for (const node of nodes) {
    if (node.url) {
      results.push({ id: node.id, title: node.title || node.url, url: node.url, parentId: node.parentId, index: node.index });
    } else if (node.children) {
      results.push(...flattenBookmarks(node.children));
    }
  }
  return results;
}

async function loadChromeBookmarks() {
  try {
    const [barNode] = await chrome.bookmarks.getSubTree("1");
    state.chromeBookmarks = flattenBookmarks(barNode.children || []);
  } catch (e) {
    state.chromeBookmarks = [];
  }
}

async function save(partial) {
  Object.assign(state.data, partial);
  await chrome.storage.local.set(partial);
}

/* === Theme === */
function applyTheme() {
  document.documentElement.setAttribute("data-theme", "brutalist");
  const mode = state.data.themeMode || "dark";
  document.documentElement.setAttribute("data-theme-mode", mode);
}

/* === Theme Toggle === */
$("#themeToggleBtn")?.addEventListener("click", async () => {
  const current = state.data.themeMode || "dark";
  const next = current === "dark" ? "light" : "dark";
  state.data.themeMode = next;
  await save({ themeMode: next });
  applyTheme();
});

/* === Nav === */
async function switchTab(tab) {
  state.activeTab = tab;
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  $$(".tab").forEach(t => t.classList.toggle("hidden", t.dataset.tabContent !== tab));
  if (tab === "bookmarks") await renderBookmarks();
  if (tab === "stats")     renderStats();
  if (tab === "home")      renderHome();
  if (tab === "watchlist") renderWatchlist();
}

/* === Clock & Contextual Greeting === */
function tickClock() {
  const d = new Date();
  $("#clock").textContent = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const hr = d.getHours();
  let greeting = "Hello";
  if (hr < 12) {
    greeting = "Good morning";
  } else if (hr < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const name = state.data.username || "Guest";
  const greetingText = $("#greetingText");
  if (greetingText) {
    greetingText.textContent = `${greeting}, ${name}`;
  }
}

/* === Home === */
function renderHome() {
  const { watches = [], watchlist = [] } = state.data;
  $("#homeCompleted").textContent = watchlist.filter(w => w.status === "completed").length;
  const weekAgo = Date.now() - 7*86400000;
  const mins = watches.filter(w => new Date(w.date).getTime() > weekAgo)
    .reduce((s, w) => s + (Number(w.duration) || 45), 0);
  $("#homeHours").textContent = (mins / 60).toFixed(1);

  const today = new Date().toISOString().slice(0,10);
  let pick = state.data.dailyPick;
  const eligible = watchlist.filter(w => w.status === "want");
  if (!pick || pick.date !== today || !eligible.find(w => w.title === pick.title)) {
    if (eligible.length) {
      const chosen = eligible[Math.floor(Math.random()*eligible.length)];
      pick = { title: chosen.title, date: today };
      save({ dailyPick: pick });
    } else {
      pick = { title: null, date: today };
    }
  }
  const item = eligible.find(w => w.title === pick.title);
  if (item) {
    $("#pickTitle").textContent    = item.title;
    $("#pickGenre").textContent    = item.genre || "Mood pick";
    $("#pickPlatform").textContent = item.platform || "Any";
    $("#pickRating").textContent   = "New";
  } else {
    $("#pickTitle").textContent    = "Your watchlist is empty";
    $("#pickGenre").textContent    = "Add titles to get a daily pick";
    $("#pickPlatform").textContent = "—";
    $("#pickRating").textContent   = "—";
  }

  renderResumeCard();
  renderContinueWatching();
}

$("#shufflePick").addEventListener("click", async () => {
  state.data.dailyPick = { title: null, date: null };
  const today = new Date().toISOString().slice(0,10);
  const shuffles = state.data.shuffles || { date: today, count: 0, total: 0 };
  if (shuffles.date !== today) {
    shuffles.date = today;
    shuffles.count = 0;
  }
  shuffles.count = (shuffles.count || 0) + 1;
  shuffles.total = (shuffles.total || 0) + 1;
  await save({ dailyPick: state.data.dailyPick, shuffles });
  renderHome();
});
$("#markWatching").addEventListener("click", async () => {
  const t = $("#pickTitle").textContent;
  const item = state.data.watchlist.find(w => w.title === t);
  if (item) {
    item.status = "completed";
    const alreadyWatched = state.data.watches.some(w => w.title === item.title);
    if (!alreadyWatched) {
      state.data.watches.push({
        title: item.title,
        date: new Date().toISOString(),
        platform: item.platform || "BingeBoard",
        duration: 45
      });
    }
    await save({ watchlist: state.data.watchlist, watches: state.data.watches });
    renderHome();
  }
});

/* === Resume Card / Click History === */
async function registerVisit(name, url) {
  const lastVisited = {
    name,
    url,
    time: new Date().toISOString()
  };
  await save({ lastVisited });
  await addContinueWatchingEntry({ type: "bookmark", name, url });
  renderResumeCard();
}

function renderResumeCard() {
  const card = $("#resumeCard");
  const { lastVisited } = state.data;
  if (!card) return;
  if (!lastVisited || !lastVisited.url) {
    card.classList.add("hidden");
    return;
  }
  card.classList.remove("hidden");
  const nameEl = $("#resumeName");
  const timeEl = $("#resumeTime");
  const favEl = $("#resumeFavicon");

  if (nameEl) nameEl.textContent = lastVisited.name;
  if (timeEl) {
    const diffMs = Date.now() - new Date(lastVisited.time).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    let timeStr = "just now";
    if (diffMins > 0 && diffMins < 60) {
      timeStr = `${diffMins}m ago`;
    } else if (diffMins >= 60) {
      const diffHrs = Math.floor(diffMins / 60);
      timeStr = `${diffHrs}h ago`;
    }
    timeEl.textContent = `Last visited ${timeStr}`;
  }
  if (favEl) {
    let domain = "";
    try {
      domain = new URL(lastVisited.url).hostname;
    } catch (_) {
      domain = lastVisited.url;
    }
    favEl.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  }
}

$("#resumeBtn")?.addEventListener("click", () => {
  const { lastVisited } = state.data;
  if (lastVisited && lastVisited.url) {
    chrome.tabs.create({ url: lastVisited.url });
  }
});

/* === Continue Watching === */
async function addContinueWatchingEntry(entry) {
  const history = state.data.cwHistory || [];
  // Remove any existing entry with the same URL
  const filtered = history.filter(h => h.url !== entry.url);
  // Add new entry at the top
  filtered.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
    type: entry.type || "bookmark",
    name: entry.name,
    platform: entry.platform || "",
    url: entry.url,
    favicon: entry.favicon || "",
    lastVisited: Date.now()
  });
  // Keep max 20 entries
  state.data.cwHistory = filtered.slice(0, 20);
  await save({ cwHistory: state.data.cwHistory });
}

function timeAgo(timestamp) {
  const diffMs = Date.now() - timestamp;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function renderContinueWatching() {
  const section = $("#cwSection");
  const list = $("#cwList");
  if (!section || !list) return;

  const history = state.data.cwHistory || [];

  if (!history.length) {
    section.classList.add("hidden");
    return;
  }

  section.classList.remove("hidden");

  // Show up to 10 most recent entries
  const recent = history.slice(0, 10);

  list.innerHTML = recent.map(item => {
    let domain = "";
    try { domain = new URL(item.url).hostname; } catch (_) { domain = item.url; }
    const fav = item.favicon || `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    const meta = item.platform ? item.platform : domain;

    return `
      <div class="cw-item" data-url="${escapeAttr(item.url)}">
        <div class="cw-item-top">
          <img class="cw-favicon" src="${escapeAttr(fav)}" alt=""
               onerror="this.style.display='none'" />
          <div class="cw-info">
            <div class="cw-name">${escapeHtml(item.name)}</div>
            <div class="cw-meta">${escapeHtml(meta)} · ${timeAgo(item.lastVisited)}</div>
          </div>
        </div>
        <button class="cw-btn">▶ Continue</button>
      </div>
    `;
  }).join("");

  // Click handler — open in new tab
  $$(".cw-item", list).forEach(el => {
    el.addEventListener("click", async () => {
      const url = el.dataset.url;
      if (url) {
        // Update lastVisited timestamp
        const entry = state.data.cwHistory.find(h => h.url === url);
        if (entry) entry.lastVisited = Date.now();
        await save({ cwHistory: state.data.cwHistory });
        chrome.tabs.create({ url });
      }
    });
  });
}

/* === Watchlist Tab === */
function renderWatchlist() {
  const grid = $("#wlGrid");
  if (!grid) return;

  const list = (state.data.watchlist || []).filter(item => {
    const matchesSearch = !state.wlSearch || item.title.toLowerCase().includes(state.wlSearch.toLowerCase());
    const matchesFilter = state.wlFilter === "all" || item.status === state.wlFilter;
    return matchesSearch && matchesFilter;
  });

  // Toggle display mode depending on empty state
  grid.style.display = list.length ? "grid" : "block";

  if (!list.length) {
    grid.innerHTML = `
      <div style="padding:24px;text-align:center;color:var(--bb-muted);">
        <div style="font-size:36px;margin-bottom:8px;">🎬</div>
        <div style="font-size:13px;font-weight:700;text-transform:uppercase;">Nothing here yet</div>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(item => {
    const isCompleted = item.status === "completed";
    return `
      <div class="wl-card ${isCompleted ? 'wl-card-done' : ''}" data-id="${item.id}">
        <div class="wl-card-title">${escapeHtml(item.title)}</div>
        <div style="display:flex; gap:8px; align-items:center;">
          <button class="wl-tick-btn" data-id="${item.id}" title="${isCompleted ? 'Unmark complete' : 'Mark complete'}">${isCompleted ? "✕" : "✓"}</button>
          <button class="wl-del-btn" data-id="${item.id}" title="Delete" style="background:none; border:none; color:${isCompleted ? 'white' : '#ff4d4d'}; cursor:pointer; font-size:16px;">🗑</button>
        </div>
      </div>
    `;
  }).join("");

  $$(".wl-tick-btn", grid).forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const found = state.data.watchlist.find(w => w.id === id);
      if (found) {
        const prevStatus = found.status;
        found.status = prevStatus === "completed" ? "want" : "completed";
        
        if (found.status === "completed") {
          const alreadyWatched = state.data.watches.some(w => w.title === found.title);
          if (!alreadyWatched) {
            state.data.watches.push({
              title: found.title,
              date: new Date().toISOString(),
              platform: found.platform || "BingeBoard",
              duration: 45
            });
          }
        }
        
        await save({ watchlist: state.data.watchlist, watches: state.data.watches });
        renderWatchlist();
        renderHome();
        renderStats();
      }
    });
  });

  $$(".wl-del-btn", grid).forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      state.data.watchlist = state.data.watchlist.filter(w => w.id !== id);
      await save({ watchlist: state.data.watchlist });
      renderWatchlist();
      renderStats();
    });
  });
}

$("#wlSearch")?.addEventListener("input", async e => {
  state.wlSearch = e.target.value;
  if (state.wlSearch.length >= 3) {
    state.data.searchCount = (state.data.searchCount || 0) + 1;
    await save({ searchCount: state.data.searchCount });
  }
  renderWatchlist();
});

$$("#wlFilterTabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    $$("#wlFilterTabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.wlFilter = btn.dataset.wlFilter;
    renderWatchlist();
  });
});

// Watchlist Add logic
const wlAddInput = $("#wlAddInput");
const wlAddBtn = $("#wlAddBtn");
if (wlAddInput && wlAddBtn) {
  const performAdd = async () => {
    const title = wlAddInput.value.trim();
    if (!title) return;

    const newItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      title: title,
      status: "want",
      genre: "Movie",
      platform: "BingeBoard",
      addedDate: new Date().toISOString()
    };

    state.data.watchlist.unshift(newItem);
    await save({ watchlist: state.data.watchlist });
    wlAddInput.value = "";
    renderWatchlist();
    renderHome();
  };

  wlAddBtn.addEventListener("click", performAdd);
  wlAddInput.addEventListener("keydown", e => {
    if (e.key === "Enter") performAdd();
  });
}

// Home tab quick-add watchlist button
const homeWlInput = $("#newWatchlistItem");
const homeWlBtn   = $("#addNewWatchlistBtn");
if (homeWlInput && homeWlBtn) {
  const performHomeAdd = async () => {
    const title = homeWlInput.value.trim();
    if (!title) return;

    const newItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      title,
      status: "want",
      genre: "Movie",
      platform: "BingeBoard",
      addedDate: new Date().toISOString()
    };

    state.data.watchlist.unshift(newItem);
    await save({ watchlist: state.data.watchlist });
    homeWlInput.value = "";
    renderWatchlist();
    renderHome();
  };

  homeWlBtn.addEventListener("click", performHomeAdd);
  homeWlInput.addEventListener("keydown", e => {
    if (e.key === "Enter") performHomeAdd();
  });
}

/* === Bookmarks — reads from Chrome's Bookmarks Bar === */
async function renderBookmarks() {
  await loadChromeBookmarks();
  const search = state.bkSearch.toLowerCase();
  const list = state.chromeBookmarks.filter(b =>
    !search ||
    b.title.toLowerCase().includes(search) ||
    b.url.toLowerCase().includes(search)
  );
  const grid = $("#bkGrid");
  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔖</div>
        <div class="empty-state-heading">No bookmarks found</div>
        <div class="empty-state-sub">Add sites to your Bookmarks Bar in Chrome and they will appear here.</div>
      </div>
    `;
    return;
  }
  grid.innerHTML = list.map(b => {
    const initials = escapeHtml(b.title.slice(0,2).toUpperCase());
    const fav = faviconUrl(b.url);
    return `
    <div class="bk-item" data-url="${escapeAttr(b.url)}" data-title="${escapeAttr(b.title)}">
      <div class="bk-icon-wrap">
        <img class="bk-icon" src="${fav}" alt="${escapeAttr(b.title)}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="bk-icon-fallback" style="display:none">${initials}</div>
      </div>
      <div class="bk-name" title="${escapeAttr(b.title)}">${escapeHtml(b.title)}</div>
    </div>`;
  }).join("");

  $$(".bk-item", grid).forEach(el => {
    el.addEventListener("click", async () => {
      const url = el.dataset.url;
      const name = el.dataset.title;
      if (url) {
        await registerVisit(name, url);
        chrome.tabs.create({ url });
      }
    });
  });
}

$("#bkSearch").addEventListener("input", e => { state.bkSearch = e.target.value; renderBookmarks(); });

$("#addBookmark").addEventListener("click", () => {
  chrome.tabs.create({ url: "chrome://bookmarks/" });
});

/* === Stats & Badges Redesign === */
function renderStats() {
  const { watches = [], watchlist = [], streaks = {} } = state.data;
  const totalMins = watches.reduce((s, w) => s + (Number(w.duration) || 45), 0);
  $("#sTotalHours").textContent = (totalMins/60).toFixed(1);
  $("#sCompleted").textContent  = watchlist.filter(w => w.status === "completed").length;
  $("#sWatching").textContent   = watchlist.filter(w => w.status === "watching").length;
  const sDroppedEl = $("#sDropped");
  if (sDroppedEl) sDroppedEl.textContent = watchlist.filter(w => w.status === "dropped").length;
  $("#sStreak").textContent     = streaks.current || 0;
  $("#sLongest").textContent    = streaks.longest || 0;

  // Show stats content immediately (removed early return on hasData)
  $("#statsEmptyState")?.classList.add("hidden");
  $("#statsContent")?.classList.remove("hidden");

  // Calculate stats progress for badges
  const completedCount = watchlist.filter(w => w.status === "completed").length;
  const sessionCount = watches.length;
  const nightSessionCount = watches.filter(w => {
    const hr = new Date(w.date).getHours();
    return hr >= 22 || hr < 4;
  }).length;
  const ghostCount = watchlist.filter(w => w.status === "want").length;

  const titleCounts = {};
  watches.forEach(w => {
    titleCounts[w.title] = (titleCounts[w.title] || 0) + 1;
  });
  const maxRepeat = Math.max(0, ...Object.values(titleCounts));

  // Genre Hopper Calculation
  const titleToGenre = {};
  watchlist.forEach(w => {
    if (w.genre) titleToGenre[w.title] = w.genre;
  });
  const weeks = {};
  watches.forEach(w => {
    const date = new Date(w.date);
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    const key = `${date.getFullYear()}-w${week}`;
    if (!weeks[key]) weeks[key] = new Set();
    const g = titleToGenre[w.title];
    if (g) weeks[key].add(g);
  });
  let genreHopperCount = 0;
  Object.values(weeks).forEach(genresSet => {
    if (genresSet.size >= 5) genreHopperCount++;
  });

  // Speed Runner Calculation
  const completedTitles = new Set(watchlist.filter(w => w.status === "completed").map(w => w.title));
  let speedRunnerCount = 0;
  completedTitles.forEach(title => {
    const dates = watches.filter(w => w.title === title).map(w => new Date(w.date).getTime()).sort();
    if (dates.length >= 2) {
      const diff = dates[dates.length - 1] - dates[0];
      if (diff < 48 * 60 * 60 * 1000) {
        speedRunnerCount++;
      }
    }
  });

  const antisocialCount = watches.filter(w => {
    const hr = new Date(w.date).getHours();
    return hr >= 3 && hr < 6;
  }).length;

  // Genre mapper helper
  const getWatchCountForGenre = (targetGenre) => {
    const genresMap = {};
    watchlist.forEach(w => {
      if (w.genre) genresMap[w.title] = w.genre.toLowerCase();
    });
    return watches.filter(w => {
      const g = genresMap[w.title];
      return g && g.includes(targetGenre.toLowerCase());
    }).length;
  };

  // Sessions by day
  const sessionsByDay = {};
  watches.forEach(w => {
    const day = new Date(w.date).toDateString();
    sessionsByDay[day] = (sessionsByDay[day] || 0) + 1;
  });
  const marathonDays = Object.values(sessionsByDay).filter(count => count >= 2).length;

  // Early bird (before 8AM)
  const earlyBirdCount = watches.filter(w => {
    const hr = new Date(w.date).getHours();
    return hr < 8;
  }).length;

  // Evening Ritual (6PM - 9PM)
  const eveningDays = new Set();
  watches.forEach(w => {
    const d = new Date(w.date);
    const hr = d.getHours();
    if (hr >= 18 && hr < 21) {
      eveningDays.add(d.toDateString());
    }
  });
  const eveningRitualCount = eveningDays.size;

  // Punctual Viewer
  const sortedWatches = [...watches].sort((a,b) => new Date(a.date) - new Date(b.date));
  const dayHours = {};
  sortedWatches.forEach(w => {
    const day = new Date(w.date).toDateString();
    const hr = new Date(w.date).getHours();
    if (!dayHours[day]) dayHours[day] = [];
    dayHours[day].push(hr);
  });
  let maxPunctualStreak = 0;
  let currPunctualStreak = 0;
  let prevHours = null;
  let prevDate = null;
  const dates = Object.keys(dayHours).map(d => new Date(d)).sort((a,b) => a - b);
  dates.forEach(d => {
    const dateStr = d.toDateString();
    const hours = dayHours[dateStr];
    if (prevDate) {
      const diffDays = Math.round((d - prevDate) / (86400000));
      if (diffDays === 1) {
        const isPunctual = hours.some(h => prevHours.some(ph => Math.abs(h - ph) <= 1));
        if (isPunctual) {
          currPunctualStreak++;
        } else {
          currPunctualStreak = 1;
        }
      } else {
        currPunctualStreak = 1;
      }
    } else {
      currPunctualStreak = 1;
    }
    if (currPunctualStreak > maxPunctualStreak) maxPunctualStreak = currPunctualStreak;
    prevHours = hours;
    prevDate = d;
  });

  // Watchlist completion pct
  const totalInWatchlist = watchlist.length;
  const completedInWatchlist = watchlist.filter(w => w.status === "completed").length;
  const completionPct = totalInWatchlist ? Math.round((completedInWatchlist / totalInWatchlist) * 100) : 0;

  // Clean Slate count
  const allCompleted = totalInWatchlist > 0 && watchlist.every(w => w.status === "completed");
  const cleanSlateCount = state.data.cleanSlates || (allCompleted ? 1 : 0);

  // Popcorn sessions (2+ hours = 120+ mins)
  const popcornSessions = watches.filter(w => (Number(w.duration) || 45) >= 120).length;

  // Couch potato (6+ hours = 360+ mins in one day)
  const durationByDay = {};
  watches.forEach(w => {
    const day = new Date(w.date).toDateString();
    durationByDay[day] = (durationByDay[day] || 0) + (Number(w.duration) || 45);
  });
  const couchPotatoCount = Object.values(durationByDay).filter(mins => mins >= 360).length;

  // Focused (watched same show 3 days in a row)
  const titleDates = {};
  watches.forEach(w => {
    if (!titleDates[w.title]) titleDates[w.title] = new Set();
    titleDates[w.title].add(new Date(w.date).toDateString());
  });
  let focusedShows = 0;
  Object.keys(titleDates).forEach(title => {
    const dates = Array.from(titleDates[title]).map(d => new Date(d)).sort((a,b) => a - b);
    let maxStreak = 0;
    let currStreak = 0;
    let prevD = null;
    dates.forEach(d => {
      if (prevD) {
        const diff = Math.round((d - prevD) / 86400000);
        if (diff === 1) {
          currStreak++;
        } else {
          currStreak = 1;
        }
      } else {
        currStreak = 1;
      }
      if (currStreak > maxStreak) maxStreak = currStreak;
      prevD = d;
    });
    if (maxStreak >= 3) focusedShows++;
  });

  // Autoplay next episode
  let autoplayStreak = 0;
  let maxAutoplayStreak = 0;
  const sortedW = [...watches].sort((a,b) => new Date(a.date) - new Date(b.date));
  for (let i = 1; i < sortedW.length; i++) {
    const gapMs = new Date(sortedW[i].date) - new Date(sortedW[i-1].date);
    const prevDurationMs = (Number(sortedW[i-1].duration) || 45) * 60 * 1000;
    if (gapMs >= prevDurationMs && gapMs <= prevDurationMs + 5 * 60 * 1000) {
      autoplayStreak++;
    } else {
      autoplayStreak = 0;
    }
    if (autoplayStreak > maxAutoplayStreak) maxAutoplayStreak = autoplayStreak;
  }

  // Royalty (days since first add)
  let firstDate = new Date();
  if (watchlist.length) {
    const dates = watchlist.map(w => new Date(w.addedDate || w.date || Date.now()));
    firstDate = new Date(Math.min(...dates));
  }
  const daysUsed = Math.max(1, Math.round((Date.now() - firstDate) / 86400000));

  // Cold Blooded
  const droppedShows = watchlist.filter(w => w.status === "dropped");
  let coldBloodedCount = 0;
  droppedShows.forEach(w => {
    const watchCount = watches.filter(history => history.title === w.title).length;
    if (watchCount === 1) {
      coldBloodedCount++;
    }
  });

  // Variety Show
  const platformsByWeek = {};
  watches.forEach(w => {
    const date = new Date(w.date);
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    const key = `${date.getFullYear()}-w${week}`;
    if (!platformsByWeek[key]) platformsByWeek[key] = new Set();
    if (w.platform) platformsByWeek[key].add(w.platform.toLowerCase());
  });
  let varietyWeeks = 0;
  Object.values(platformsByWeek).forEach(pSet => {
    if (pSet.size >= 5) varietyWeeks++;
  });

  // Cinephile
  const countries = new Set();
  watchlist.forEach(w => {
    if (w.country) countries.add(w.country.toLowerCase());
  });

  // Define base progress mapping (without hall-of-fame first)
  const badgeProgress = {
    "night-owl": nightSessionCount,
    "marathon": marathonDays,
    "binge-beast": completedCount,
    "ghost-watcher": ghostCount,
    "directors-cut": maxRepeat,
    "speed-runner": speedRunnerCount,
    "antisocial": antisocialCount,
    "genre-hopper": genreHopperCount,
    "horror-addict": getWatchCountForGenre("horror"),
    "romcom-veteran": getWatchCountForGenre("romcom"),
    "doc-lover": getWatchCountForGenre("documentary") || getWatchCountForGenre("doc"),
    "thriller-junkie": getWatchCountForGenre("thriller"),
    "anime-head": getWatchCountForGenre("anime"),
    "sci-fi-obsessed": getWatchCountForGenre("sci-fi") || getWatchCountForGenre("science fiction"),
    "fantasy-fanatic": getWatchCountForGenre("fantasy"),
    "comedy-king": getWatchCountForGenre("comedy"),
    "action-junkie": getWatchCountForGenre("action"),
    "mystery-maniac": getWatchCountForGenre("mystery") || getWatchCountForGenre("crime"),
    "dark-drama-lord": getWatchCountForGenre("drama"),
    "musical-soul": getWatchCountForGenre("musical") || getWatchCountForGenre("music"),
    "western-rider": getWatchCountForGenre("western"),
    "war-witness": getWatchCountForGenre("war"),
    "indie-explorer": getWatchCountForGenre("indie") || getWatchCountForGenre("arthouse"),
    "animation-nerd": getWatchCountForGenre("animation") || getWatchCountForGenre("animated"),
    "nature-watcher": getWatchCountForGenre("nature"),
    "weekly-warrior": Math.floor((streaks.longest || 0) / 7),
    "monthly-legend": streaks.longest || 0,
    "early-bird": earlyBirdCount,
    "evening-ritual": eveningRitualCount,
    "punctual-viewer": maxPunctualStreak,
    "list-maker": watchlist.length,
    "completionist": completionPct,
    "the-quitter": watchlist.filter(w => w.status === "dropped").length,
    "indecisive": (state.data.shuffles && state.data.shuffles.count) || 0,
    "clean-slate": cleanSlateCount,
    "popcorn-mode": popcornSessions,
    "couch-potato": couchPotatoCount,
    "second-screen": marathonDays,
    "focused": focusedShows,
    "hypnotized": maxAutoplayStreak,
    "the-critic": (state.data.watchlist || []).filter(w => w.rating).length,
    "deep-diver": state.data.searchCount || 0,
    "wild-card": (state.data.shuffles && state.data.shuffles.total) || 0,
    "royalty": daysUsed,
    "cold-blooded": coldBloodedCount,
    "variety-show": varietyWeeks,
    "cinephile": countries.size,
    "fell-asleep": state.data.sleepCount || 0,
    "bingeboard-og": watchlist.length >= 1 ? 1 : 0
  };

  // Now calculate hall-of-fame (Unlocked 25 other badges)
  let unlockedCount = 0;
  BADGE_DEFS.forEach(b => {
    if (b.id !== "hall-of-fame") {
      const val = badgeProgress[b.id] || 0;
      if (val >= b.levels[0].threshold) unlockedCount++;
    }
  });
  badgeProgress["hall-of-fame"] = unlockedCount;

  // Keep track of newly unlocked badges to trigger glow animations
  const prevUnlockedBadges = new Set(state.data.badges || []);
  const newlyUnlocked = [];

  const BADGE_SECTIONS = [
    { name: "Behavior Badges", ids: ["night-owl", "marathon", "binge-beast", "ghost-watcher", "directors-cut", "speed-runner", "antisocial", "genre-hopper"] },
    { name: "Genre Badges", ids: ["horror-addict", "romcom-veteran", "doc-lover", "thriller-junkie", "anime-head", "sci-fi-obsessed", "fantasy-fanatic", "comedy-king", "action-junkie", "mystery-maniac", "dark-drama-lord", "musical-soul", "western-rider", "war-witness", "indie-explorer", "animation-nerd", "nature-watcher"] },
    { name: "Streak & Time Badges", ids: ["weekly-warrior", "monthly-legend", "early-bird", "evening-ritual", "punctual-viewer"] },
    { name: "Watchlist Badges", ids: ["list-maker", "completionist", "the-quitter", "indecisive", "clean-slate"] },
    { name: "Session Badges", ids: ["popcorn-mode", "couch-potato", "second-screen", "focused", "hypnotized"] },
    { name: "Special Badges", ids: ["the-critic", "deep-diver", "wild-card", "royalty", "cold-blooded", "variety-show", "hall-of-fame", "cinephile", "fell-asleep", "bingeboard-og"] }
  ];

  const outerGrid = $("#badgesGrid");
  if (outerGrid) {
    outerGrid.style.cssText = "display: flex; flex-direction: column; gap: 28px; width: 100%; margin-top: 16px;";
  }

  let html = "";
  BADGE_SECTIONS.forEach(sec => {
    html += `
      <div class="badge-section-wrapper" style="width: 100%;">
        <h3 class="badge-section-title" style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; color: var(--bb-text);">${sec.name}</h3>
        <hr style="border: 0; border-top: 1px solid var(--bb-card-border); opacity: 0.15; margin-bottom: 16px;" />
        <div class="badges-grid-sub" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px;">
    `;

    const sectionBadges = BADGE_DEFS.filter(b => sec.ids.includes(b.id));
    html += sectionBadges.map(b => {
      const currentVal = badgeProgress[b.id] || 0;
      let currentLevel = null;
      let nextLevel = b.levels[0];
      for (const lvl of b.levels) {
        if (currentVal >= lvl.threshold) {
          currentLevel = lvl;
        }
      }
      
      if (currentLevel) {
        const idx = b.levels.indexOf(currentLevel);
        nextLevel = b.levels[idx + 1] || null;
        if (!prevUnlockedBadges.has(b.id)) {
          newlyUnlocked.push(b.id);
        }
      }

      const isLocked = !currentLevel;
      const rarityText = currentLevel ? currentLevel.rarity : b.levels[0].rarity;
      const levelText = currentLevel ? currentLevel.level : "LOCKED";

      let pct = 0;
      let progressLabel = "";
      if (!nextLevel) {
        pct = 100;
        progressLabel = `${currentVal} / ${currentLevel.threshold} ${b.unit}`;
      } else {
        const base = currentLevel ? currentLevel.threshold : 0;
        const target = nextLevel.threshold;
        pct = Math.min(100, ((currentVal - base) / (target - base)) * 100);
        progressLabel = `${currentVal} / ${target} ${b.unit}`;
      }

      const rarityClass = `rarity-${rarityText.toLowerCase()}`;

      return `
        <div class="badge-card ${isLocked ? 'locked' : 'unlocked'}" id="badge-card-${b.id}" data-id="${b.id}">
          <div class="badge-header">
            <div class="badge-lottie-icon" id="lottie-${b.id}"></div>
            <div class="badge-rarity ${rarityClass}">${rarityText}</div>
          </div>
          <div class="badge-body" style="text-align: center;">
            <div class="badge-title-redesigned" style="font-weight:700; text-transform:uppercase; margin-bottom:4px;">${b.name}</div>
            <div class="badge-level-pill" style="font-size: 10px; font-weight: 700; display: inline-block; padding: 2px 8px; border: 1px solid var(--bb-card-border); text-transform: uppercase; margin-bottom: 8px;">${levelText}</div>
            <p class="badge-desc-redesigned" style="font-size: 11px; margin-bottom: 4px; font-weight: 600;">${b.condition}</p>
            <p class="badge-detail-redesigned" style="font-size: 10px; color: var(--bb-muted); margin-bottom: 10px;">${b.detail}</p>
            <div class="badge-progress-wrap" style="margin-bottom: 4px;">
              <div class="badge-progress-bar" style="width: ${pct}%;"></div>
            </div>
            <div class="badge-progress-text" style="font-size: 9px; font-weight: 700;">${progressLabel}</div>
          </div>
        </div>
      `;
    }).join("");

    html += `
        </div>
      </div>
    `;
  });

  outerGrid.innerHTML = html;

  // Update storage with currently unlocked badges
  const currentUnlockedIds = BADGE_DEFS.filter(b => (badgeProgress[b.id] || 0) >= b.levels[0].threshold).map(b => b.id);
  save({ badges: currentUnlockedIds });

  // Load Lottie animations for each badge card
  BADGE_DEFS.forEach(async b => {
    const container = document.getElementById(`lottie-${b.id}`);
    const badgeCard = document.getElementById(`badge-card-${b.id}`);
    if (!container) return;

    // Load Lottie with CDN check and fallback
    const animInstance = await loadLottieWithFallback(container, b.id, b.lottiePath, b.icon);
    if (animInstance) {
      badgeAnims[b.id] = animInstance;

      const isBadgeLocked = (badgeProgress[b.id] || 0) < b.levels[0].threshold;

      if (!isBadgeLocked) {
        if (newlyUnlocked.includes(b.id)) {
          badgeCard.classList.add("just-unlocked");
          let playCount = 0;
          animInstance.addEventListener('complete', () => {
            playCount++;
            if (playCount < 3) {
              animInstance.goToAndPlay(0, true);
            } else {
              badgeCard.classList.remove("just-unlocked");
            }
          });
          animInstance.play();
        } else {
          animInstance.play();
        }

        badgeCard.addEventListener("mouseenter", () => {
          animInstance.goToAndPlay(0, true);
        });
      } else {
        animInstance.goToAndStop(0, true);
      }
    }
  });
}

// Lottie fetch / parse loader helper
async function loadLottieWithFallback(container, badgeId, path, fallbackEmoji) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Status " + res.status);
    const animationData = await res.json();
    const anim = lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animationData
    });
    return anim;
  } catch (err) {
    console.warn(`Lottie failed for badge ${badgeId}, falling back to emoji.`, err);
    container.innerHTML = `<span style="font-size: 32px; line-height: 64px;">${fallbackEmoji}</span>`;
    return null;
  }
}

// Help Modal controls
const helpBtn = $("#badgesHelpBtn");
const helpModal = $("#badgesHelpModal");
const helpCloseBtn = $("#badgesHelpCloseBtn");

if (helpBtn && helpModal && helpCloseBtn) {
  helpBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    helpModal.classList.remove("hidden");
  });
  helpCloseBtn.addEventListener("click", () => {
    helpModal.classList.add("hidden");
  });
}

/* ===================================================================
   macOS-style Custom Bookmark Dock - Chrome Bookmarks Integration
   =================================================================== */

let editingBookmarkId = null;

// Render the Dock
async function renderDock() {
  const dock = $("#dock");
  const inner = $("#dockInner");
  const emptyText = $("#dockEmptyText");

  if (!dock || !inner) return;

  if (state.data?.settings?.dockEnabled === false) {
    dock.style.display = "none";
    return;
  }
  dock.style.display = "flex";

  await loadChromeBookmarks();
  const bookmarks = state.chromeBookmarks;

  if (bookmarks.length === 0) {
    emptyText.classList.remove("hidden");
  } else {
    emptyText.classList.add("hidden");
  }

  if (!state.data.favicons) state.data.favicons = {};
  
  const baseSize = 48; // BASE size is 48px

  let html = bookmarks.map((b, idx) => {
    const cleanTitle = getDisplayName(b.title, b.url);
    const favData = state.data.favicons[b.id];

    let iconHtml = "";
    if (favData) {
      if (favData.type === 'image') {
        iconHtml = `<img class="dock-img" src="${escapeAttr(favData.src)}" style="width:100%; height:100%; object-fit:cover;" />`;
      } else {
        iconHtml = `<div style="width:100%; height:100%; background:${favData.color}; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; color:#ffffff; font-family:sans-serif;">${escapeHtml(favData.initials)}</div>`;
      }
    } else {
      // Temporary fallback while loading
      iconHtml = `<div style="width:100%; height:100%; background:#888; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; color:#ffffff;">...</div>`;
      
      // Async fetch
      getfavicon(b.url, cleanTitle).then(async (res) => {
        state.data.favicons[b.id] = res;
        await save({ favicons: state.data.favicons });
        renderDock();
      });
    }

    return `
      <div class="dock-item" data-id="${b.id}" data-url="${escapeAttr(b.url)}" draggable="true">
        <div class="dock-tooltip">${escapeHtml(cleanTitle)}</div>
        <div class="dock-icon-wrap" style="width: ${baseSize}px; height: ${baseSize}px; border-radius: 10px; overflow: hidden; background: var(--bb-input-bg); border: 2px solid var(--bb-card-border);">
          ${iconHtml}
        </div>
      </div>
    `;
  }).join("");

  html += `
    <div class="dock-item" id="dockAddBtn">
      <div class="dock-tooltip">Add Bookmark</div>
      <div class="dock-icon-wrap" style="width: ${baseSize}px; height: ${baseSize}px; border-radius: 10px; background: var(--bb-input-bg); border: 2px solid var(--bb-card-border); display: flex; align-items: center; justify-content: center; color: var(--bb-text);">
        <span class="dock-add-plus" style="font-size: ${baseSize * 0.6}px; line-height: 1;">+</span>
      </div>
    </div>
  `;

  inner.innerHTML = html;
  attachDockEvents();
}

function attachDockEvents() {
  const inner = $("#dockInner");
  const ctxMenu = $("#dockContextMenu");
  if (!inner) return;

  const BASE = 48;
  const MAX = 80;
  const SPREAD = 120;

  function getIconSize(mouseX, iconCenterX) {
    const distance = Math.abs(mouseX - iconCenterX);
    if (distance < SPREAD) {
      return BASE + (MAX - BASE) * Math.cos((distance / SPREAD) * (Math.PI / 2));
    }
    return BASE;
  }

  function updateScales(mouseX, container) {
    const items = $$(".dock-item", container);
    items.forEach(item => {
      const wrap = $(".dock-icon-wrap", item);
      if (!wrap) return;

      const rect = wrap.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const size = getIconSize(mouseX, iconCenterX);

      wrap.style.width = size + "px";
      wrap.style.height = size + "px";
    });
  }

  function resetScales(container) {
    const wraps = $$(".dock-icon-wrap", container);
    wraps.forEach(wrap => {
      wrap.style.width = BASE + "px";
      wrap.style.height = BASE + "px";
    });
  }

  const cloned = inner.cloneNode(false);
  while (inner.firstChild) {
    cloned.appendChild(inner.firstChild);
  }
  inner.parentNode.replaceChild(cloned, inner);

  cloned.addEventListener("mousemove", e => {
    updateScales(e.clientX, cloned);
  });

  cloned.addEventListener("mouseleave", () => {
    resetScales(cloned);
  });

  cloned.addEventListener("click", (e) => {
    const item = e.target.closest(".dock-item");
    if (!item) return;

    if (item.id === "dockAddBtn") {
      e.stopPropagation();
      editingBookmarkId = null;
      $("#dockPopupLabel").textContent = "Add to Dock";
      $("#dockPopupTitle").value = "";
      $("#dockPopupUrl").value = "";
      $("#dockPopup").classList.remove("hidden");
      $("#dockPopupTitle").focus();
      return;
    }

    e.preventDefault();
    item.classList.add("bouncing");

    setTimeout(async () => {
      item.classList.remove("bouncing");
      const url = item.dataset.url;
      const name = item.querySelector(".dock-tooltip")?.textContent || url;
      if (url) {
        await registerVisit(name, url);
        await addContinueWatchingEntry({ type: "bookmark", name, url });
        chrome.tabs.create({ url });
      }
    }, 400);
  });

  cloned.addEventListener("contextmenu", (e) => {
    const item = e.target.closest(".dock-item");
    if (!item || item.id === "dockAddBtn") return;

    e.preventDefault();
    e.stopPropagation();

    editingBookmarkId = item.dataset.id;

    if (ctxMenu) {
      ctxMenu.style.left = e.clientX + "px";
      ctxMenu.style.top = (e.clientY - 60) + "px";
      ctxMenu.classList.remove("hidden");
    }
  });

  let draggedEl = null;

  cloned.addEventListener("dragstart", (e) => {
    const item = e.target.closest(".dock-item");
    if (!item || item.id === "dockAddBtn") {
      e.preventDefault();
      return;
    }
    draggedEl = item;
    item.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });

  cloned.addEventListener("dragover", (e) => {
    if (!draggedEl) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const afterElement = getDragAfterElement(cloned, e.clientX);
    if (afterElement == null) {
      cloned.insertBefore(draggedEl, $("#dockAddBtn"));
    } else {
      cloned.insertBefore(draggedEl, afterElement);
    }
  });

  cloned.addEventListener("dragend", async (e) => {
    const item = e.target.closest(".dock-item");
    if (item) {
      item.classList.remove("dragging");
    }
    draggedEl = null;

    const targetId = item.dataset.id;
    const targetBookmark = state.chromeBookmarks.find(b => b.id === targetId);
    const parentId = targetBookmark ? targetBookmark.parentId : "1";

    const nextItem = item.nextElementSibling;
    let destinationIndex = null;

    if (nextItem && nextItem.id !== "dockAddBtn") {
      const nextId = nextItem.dataset.id;
      const nextBookmark = state.chromeBookmarks.find(b => b.id === nextId);
      if (nextBookmark) {
        destinationIndex = nextBookmark.index;
      }
    } else {
      try {
        const [parentSubtree] = await chrome.bookmarks.getSubTree(parentId);
        destinationIndex = parentSubtree.children.length;
      } catch (_) {
        destinationIndex = state.chromeBookmarks.length;
      }
    }

    if (destinationIndex !== null) {
      try {
        await chrome.bookmarks.move(targetId, { parentId, index: destinationIndex });
      } catch (err) {
        console.error("Failed to move bookmark:", err);
      }
    }
  });
}

function getDragAfterElement(container, x) {
  const draggableElements = [...container.querySelectorAll(".dock-item:not(.dragging):not(#dockAddBtn)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = x - (box.left + box.width / 2);
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

async function fetchTitle(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    const html = await res.text();
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (match && match[1]) {
      const txt = document.createElement("textarea");
      txt.innerHTML = match[1].trim();
      return txt.value;
    }
  } catch (err) {
    console.warn("Failed to fetch title:", err);
  }

  try {
    return new URL(url).hostname.replace("www.", "");
  } catch (_) {
    return url;
  }
}

/* === Favicon Fallback System === */
async function getfavicon(url, name) {
  let domain = "";
  try {
    domain = new URL(url).hostname;
  } catch (_) {
    domain = url;
  }
  
  const sources = [
    `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=64`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
    `https://${domain}/favicon.ico`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://logo.clearbit.com/${domain}`
  ];

  for (const src of sources) {
    const works = await testImage(src);
    if (works) return { type: 'image', src };
  }

  // All failed — generate text avatar
  return { type: 'text', initials: getInitials(name), color: hashColor(name) };
}

function testImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img.width > 1 && img.height > 1);
    img.onerror = () => resolve(false);
    img.src = src;
    setTimeout(() => resolve(false), 3000);
  });
}

function getInitials(name) {
  return name.trim().slice(0, 2).toUpperCase();
}

function hashColor(name) {
  const palette = [
    '#e74c3c','#e67e22','#f1c40f','#2ecc71',
    '#1abc9c','#3498db','#9b59b6','#e91e63'
  ];
  let hash = 0;
  for (let c of name) hash += c.charCodeAt(0);
  return palette[hash % palette.length];
}

// Add/Edit Popup Event Listeners
const dockPopup = $("#dockPopup");
const dockPopupTitle = $("#dockPopupTitle");
const dockPopupUrl = $("#dockPopupUrl");
const dockPopupCancel = $("#dockPopupCancel");
const dockPopupSave = $("#dockPopupSave");
const dockPopupFetching = $("#dockPopupFetching");

if (dockPopup && dockPopupCancel && dockPopupSave) {
  dockPopup.addEventListener("click", e => e.stopPropagation());

  dockPopupCancel.addEventListener("click", () => {
    dockPopup.classList.add("hidden");
  });

  dockPopupSave.addEventListener("click", async () => {
    let name = dockPopupTitle.value.trim();
    let url = dockPopupUrl.value.trim();
    if (!url) return;

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    if (!name) {
      dockPopupFetching.classList.remove("hidden");
      name = await fetchTitle(url);
      dockPopupFetching.classList.add("hidden");
    }

    if (editingBookmarkId) {
      try {
        await chrome.bookmarks.update(editingBookmarkId, { title: name, url: url });
        if (state.data.favicons && state.data.favicons[editingBookmarkId]) {
          delete state.data.favicons[editingBookmarkId];
          await save({ favicons: state.data.favicons });
        }
      } catch (err) {
        console.error("Failed to edit Chrome bookmark:", err);
      }
    } else {
      try {
        await chrome.bookmarks.create({
          parentId: "1",
          title: name,
          url: url
        });
      } catch (err) {
        console.error("Failed to create Chrome bookmark:", err);
      }
    }

    dockPopup.classList.add("hidden");
  });
}

// Context Menu Event Listeners
const ctxMenu = $("#dockContextMenu");
const ctxEdit = $("#ctxEdit");
const ctxRemove = $("#ctxRemove");

if (ctxMenu) {
  ctxEdit.addEventListener("click", () => {
    const found = state.chromeBookmarks.find(b => b.id === editingBookmarkId);
    if (found) {
      $("#dockPopupLabel").textContent = "Edit Bookmark";
      dockPopupTitle.value = found.title;
      dockPopupUrl.value = found.url;
      dockPopup.classList.remove("hidden");
      dockPopupTitle.focus();
    }
    ctxMenu.classList.add("hidden");
  });

  ctxRemove.addEventListener("click", async () => {
    try {
      await chrome.bookmarks.remove(editingBookmarkId);
    } catch (err) {
      console.error("Failed to delete Chrome bookmark:", err);
    }
    ctxMenu.classList.add("hidden");
  });
}

document.addEventListener("click", () => {
  if (ctxMenu) ctxMenu.classList.add("hidden");
  if (dockPopup) dockPopup.classList.add("hidden");
  helpModal?.classList.add("hidden");
});

/* === Onboarding Card === */
function checkOnboarding() {
  const onboarding = $("#onboarding");
  if (!onboarding) return;
  if (!state.data.onboarded) {
    onboarding.classList.remove("hidden");
    initOnboardingEvents();
  } else {
    onboarding.classList.add("hidden");
  }
}

function initOnboardingEvents() {
  const nextBtn = $("#ob-next");
  const finishBtn = $("#ob-finish");
  const backBtn = $("#ob-back");
  const nameInput = $("#ob-name");
  const step1 = $("#ob-step1");
  const step2 = $("#ob-step2");
  const dot1 = $("#ob-dot1");
  const dot2 = $("#ob-dot2");

  nextBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) {
      nameInput.style.borderColor = "var(--bb-accent)";
      return;
    }
    state.data.username = name;
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    dot1.classList.remove("active");
    dot2.classList.add("active");
  });

  backBtn.addEventListener("click", () => {
    step2.classList.add("hidden");
    step1.classList.remove("hidden");
    dot2.classList.remove("active");
    dot1.classList.add("active");
  });

  const cards = $$(".ob-theme-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      state.data.theme.mode = card.dataset.obTheme;
    });
  });

  finishBtn.addEventListener("click", async () => {
    state.data.onboarded = true;
    await save({
      username: state.data.username,
      theme: state.data.theme,
      onboarded: true
    });
    $("#onboarding").classList.add("hidden");
    applyTheme();
    tickClock();
    renderHome();
  });
}

/* === Global Search === */
function initGlobalSearch() {
  const trigger = $("#searchTriggerBtn");
  const bar = $("#globalSearchBar");
  const input = $("#globalSearchInput");
  const close = $("#globalSearchClose");
  const results = $("#globalSearchResults");

  if (!trigger || !bar || !input || !close || !results) return;

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    bar.classList.toggle("hidden");
    if (!bar.classList.contains("hidden")) {
      input.focus();
      performGlobalSearch();
    }
  });

  close.addEventListener("click", (e) => {
    e.stopPropagation();
    bar.classList.add("hidden");
    input.value = "";
    results.classList.add("hidden");
  });

  input.addEventListener("click", (e) => e.stopPropagation());

  input.addEventListener("input", () => {
    performGlobalSearch();
  });

  async function performGlobalSearch() {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      results.innerHTML = "";
      results.classList.add("hidden");
      return;
    }

    const wl = (state.data.watchlist || []).filter(item => 
      item.title.toLowerCase().includes(q) || (item.genre && item.genre.toLowerCase().includes(q))
    );

    await loadChromeBookmarks();
    const bk = (state.chromeBookmarks || []).filter(item => 
      item.title.toLowerCase().includes(q) || item.url.toLowerCase().includes(q)
    );

    if (!wl.length && !bk.length) {
      results.innerHTML = `<div class="search-empty" style="padding:16px; font-weight:700; text-transform:uppercase; font-size:12px; color:var(--bb-muted);">No results found for "${escapeHtml(q)}"</div>`;
      results.classList.remove("hidden");
      return;
    }

    let html = "";
    if (wl.length) {
      html += `<div class="search-section" style="padding:12px 16px; border-bottom:2px solid var(--bb-card-border);"><div class="search-section-title" style="font-size:10px; font-weight:800; color:var(--bb-accent); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:8px;">Watchlist</div>`;
      html += wl.map(item => `
        <div class="search-item wl-search-item" data-id="${item.id}" style="display:flex; align-items:center; gap:8px; padding:6px 8px; cursor:pointer; font-weight:600;">
          <span class="search-item-icon">🎬</span>
          <div class="search-item-info">
            <div class="search-item-title" style="font-size:13px; text-transform:uppercase;">${escapeHtml(item.title)}</div>
            <div class="search-item-sub" style="font-size:10px; color:var(--bb-muted);">${escapeHtml(item.platform || '')} • ${escapeHtml(item.status || '')}</div>
          </div>
        </div>
      `).join("");
      html += `</div>`;
    }

    if (bk.length) {
      html += `<div class="search-section" style="padding:12px 16px;"><div class="search-section-title" style="font-size:10px; font-weight:800; color:var(--bb-accent); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:8px;">Bookmarks</div>`;
      html += bk.map(item => {
        let domain = "";
        try { domain = new URL(item.url).hostname; } catch (_) { domain = item.url; }
        const fav = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
        return `
          <div class="search-item bk-search-item" data-url="${escapeAttr(item.url)}" data-title="${escapeAttr(item.title)}" style="display:flex; align-items:center; gap:8px; padding:6px 8px; cursor:pointer; font-weight:600;">
            <img class="search-item-favicon" src="${fav}" style="width:16px; height:16px;" />
            <div class="search-item-info">
              <div class="search-item-title" style="font-size:13px; text-transform:uppercase;">${escapeHtml(item.title)}</div>
              <div class="search-item-sub" style="font-size:10px; color:var(--bb-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:400px;">${escapeHtml(item.url)}</div>
            </div>
          </div>
        `;
      }).join("");
      html += `</div>`;
    }

    results.innerHTML = html;
    results.classList.remove("hidden");

    $$(".wl-search-item", results).forEach(el => {
      el.addEventListener("click", () => {
        switchTab("watchlist");
        bar.classList.add("hidden");
        const wlSearchInput = $("#wlSearch");
        if (wlSearchInput) {
          wlSearchInput.value = el.querySelector(".search-item-title").textContent;
          state.wlSearch = wlSearchInput.value;
        }
        renderWatchlist();
      });
    });

    $$(".bk-search-item", results).forEach(el => {
      el.addEventListener("click", async () => {
        const url = el.dataset.url;
        const name = el.dataset.title;
        bar.classList.add("hidden");
        if (url) {
          await registerVisit(name, url);
          chrome.tabs.create({ url });
        }
      });
    });
  }
}

/* === Utils === */
function escapeHtml(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function escapeAttr(s) { return escapeHtml(s); }

/* === Boot === */
$$(".nav-btn").forEach(b => b.addEventListener("click", () => switchTab(b.dataset.tab)));

chrome.storage.onChanged.addListener(async () => {
  await loadData();
  applyTheme();
  if (state.activeTab === "home")      renderHome();
  if (state.activeTab === "bookmarks") renderBookmarks();
  if (state.activeTab === "stats")     renderStats();
  if (state.activeTab === "watchlist") renderWatchlist();
  $("#streakNum").textContent = state.data.streaks.current || 0;
});

(async function init() {
  await loadData();
  await loadChromeBookmarks();
  applyTheme();
  checkOnboarding();
  renderHome();
  await renderDock();
  tickClock();
  setInterval(tickClock, 30000);
  initGlobalSearch();

  // Live-update dock + bookmarks tab when Chrome bookmarks change
  const onBkChange = async () => {
    await loadChromeBookmarks();
    await renderDock();
    if (state.activeTab === "bookmarks") renderBookmarks();
  };
  chrome.bookmarks.onCreated.addListener(onBkChange);
  chrome.bookmarks.onRemoved.addListener(onBkChange);
  chrome.bookmarks.onChanged.addListener(onBkChange);
  chrome.bookmarks.onMoved.addListener(onBkChange);
})();

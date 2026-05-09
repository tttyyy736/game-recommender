export type Game = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  genres: string[];
  moods: string[];
  features: string[];
  avoidTags: string[];
  length: "short" | "medium" | "long" | "massive";
  difficulty: "easy" | "medium" | "hard";
  perspective:
    | "first-person"
    | "third-person"
    | "top-down"
    | "side-scroller"
    | "mixed";
  pace: "slow" | "medium" | "fast";
  priceTier: "cheap" | "mid" | "premium";
  year: number;
  steamUrl: string;
};

type ScoredGame = Game & {
  score: number;
  matchPercentage: number;
  matchedTags: string[];
  missedTags: string[];
  reasons: string[];
};

export const games: Game[] = [
  {
    id: 1,
    title: "Half-Life 2",
    subtitle: "The gold standard for cinematic linear FPS design.",
    description:
      "A focused sci-fi shooter with legendary pacing, environmental storytelling, physics-based puzzles, and one of the most influential campaigns ever made.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/220/library_600x900.jpg",
    genres: ["fps", "sci-fi", "linear", "story"],
    moods: ["cinematic", "tense", "immersive", "lonely"],
    features: ["physics", "classic", "single-player", "atmospheric"],
    avoidTags: ["open-world", "multiplayer-only", "cozy"],
    length: "medium",
    difficulty: "medium",
    perspective: "first-person",
    pace: "medium",
    priceTier: "cheap",
    year: 2004,
    steamUrl: "https://store.steampowered.com/app/220/HalfLife_2/",
  },
  {
    id: 2,
    title: "Outlast",
    subtitle: "A short, brutal, first-person horror gauntlet.",
    description:
      "A terrifying found-footage horror game built around hiding, running, and surviving without weapons. Great if you want tension immediately.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/238320/library_600x900.jpg",
    genres: ["horror", "first-person", "linear", "survival"],
    moods: ["scary", "tense", "stressful", "dark"],
    features: ["single-player", "atmospheric", "short", "stealth"],
    avoidTags: ["relaxing", "cozy", "combat-heavy"],
    length: "short",
    difficulty: "medium",
    perspective: "first-person",
    pace: "fast",
    priceTier: "cheap",
    year: 2013,
    steamUrl: "https://store.steampowered.com/app/238320/Outlast/",
  },
  {
    id: 3,
    title: "Portal",
    subtitle: "A brilliant, short puzzle classic with perfect pacing.",
    description:
      "A first-person puzzle game with iconic writing, clever mechanics, and a campaign that never overstays its welcome.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/400/library_600x900.jpg",
    genres: ["puzzle", "first-person", "linear", "sci-fi"],
    moods: ["clever", "funny", "lonely", "clinical"],
    features: ["physics", "classic", "single-player", "short"],
    avoidTags: ["combat-heavy", "open-world", "grindy"],
    length: "short",
    difficulty: "medium",
    perspective: "first-person",
    pace: "medium",
    priceTier: "cheap",
    year: 2007,
    steamUrl: "https://store.steampowered.com/app/400/Portal/",
  },
  {
    id: 4,
    title: "Portal 2",
    subtitle: "One of the best-written puzzle games ever made.",
    description:
      "A bigger, funnier, more emotional sequel with fantastic puzzle design, memorable characters, and a polished campaign.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/620/library_600x900.jpg",
    genres: ["puzzle", "first-person", "linear", "sci-fi"],
    moods: ["clever", "funny", "cinematic", "charming"],
    features: ["physics", "classic", "single-player", "co-op"],
    avoidTags: ["combat-heavy", "open-world", "grindy"],
    length: "medium",
    difficulty: "medium",
    perspective: "first-person",
    pace: "medium",
    priceTier: "cheap",
    year: 2011,
    steamUrl: "https://store.steampowered.com/app/620/Portal_2/",
  },
  {
    id: 5,
    title: "Resident Evil 2",
    subtitle: "A masterclass in modern survival horror.",
    description:
      "A polished third-person horror remake with tight level design, constant tension, memorable enemies, and excellent replay value.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/883710/library_600x900.jpg",
    genres: ["horror", "survival", "third-person", "story"],
    moods: ["scary", "tense", "cinematic", "dark"],
    features: [
      "single-player",
      "atmospheric",
      "replayable",
      "resource-management",
    ],
    avoidTags: ["cozy", "relaxing", "multiplayer-only"],
    length: "medium",
    difficulty: "medium",
    perspective: "third-person",
    pace: "medium",
    priceTier: "mid",
    year: 2019,
    steamUrl: "https://store.steampowered.com/app/883710/Resident_Evil_2/",
  },
  {
    id: 6,
    title: "Resident Evil 4",
    subtitle: "Action horror with momentum, style, and absurd confidence.",
    description:
      "A legendary action-horror game with incredible pacing, satisfying combat, memorable encounters, and a perfect mix of tension and fun.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/library_600x900.jpg",
    genres: ["horror", "action", "third-person", "survival"],
    moods: ["tense", "cinematic", "fun", "stylish"],
    features: ["single-player", "combat-heavy", "replayable", "boss-fights"],
    avoidTags: ["cozy", "slow", "puzzle-only"],
    length: "medium",
    difficulty: "medium",
    perspective: "third-person",
    pace: "fast",
    priceTier: "premium",
    year: 2023,
    steamUrl: "https://store.steampowered.com/app/2050650/Resident_Evil_4/",
  },
  {
    id: 7,
    title: "BioShock",
    subtitle: "Atmospheric FPS storytelling inside a collapsing underwater city.",
    description:
      "A story-driven first-person shooter with strong atmosphere, philosophical themes, immersive environments, and memorable worldbuilding.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/7670/library_600x900.jpg",
    genres: ["fps", "story", "immersive-sim", "sci-fi"],
    moods: ["atmospheric", "dark", "immersive", "mysterious"],
    features: ["single-player", "classic", "worldbuilding", "powers"],
    avoidTags: ["multiplayer-only", "cozy", "open-ended-sandbox"],
    length: "medium",
    difficulty: "medium",
    perspective: "first-person",
    pace: "medium",
    priceTier: "cheap",
    year: 2007,
    steamUrl: "https://store.steampowered.com/app/7670/BioShock/",
  },
  {
    id: 8,
    title: "Prey",
    subtitle: "A smart sci-fi immersive sim where every room matters.",
    description:
      "A dense, systems-driven sci-fi game about exploring a space station, solving problems creatively, and surviving strange alien threats.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/480490/library_600x900.jpg",
    genres: ["immersive-sim", "sci-fi", "fps", "exploration"],
    moods: ["immersive", "tense", "lonely", "mysterious"],
    features: ["single-player", "player-choice", "systems", "atmospheric"],
    avoidTags: ["linear-only", "cozy", "simple"],
    length: "long",
    difficulty: "medium",
    perspective: "first-person",
    pace: "slow",
    priceTier: "mid",
    year: 2017,
    steamUrl: "https://store.steampowered.com/app/480490/Prey/",
  },
  {
    id: 9,
    title: "Firewatch",
    subtitle: "A quiet, emotional mystery in the Wyoming wilderness.",
    description:
      "A short narrative adventure about isolation, conversation, regret, and mystery. Great if you want story and atmosphere over combat.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/383870/library_600x900.jpg",
    genres: ["walking-sim", "story", "mystery", "exploration"],
    moods: ["lonely", "emotional", "quiet", "atmospheric"],
    features: ["single-player", "short", "dialogue", "beautiful"],
    avoidTags: ["combat-heavy", "multiplayer-only", "hard"],
    length: "short",
    difficulty: "easy",
    perspective: "first-person",
    pace: "slow",
    priceTier: "mid",
    year: 2016,
    steamUrl: "https://store.steampowered.com/app/383870/Firewatch/",
  },
  {
    id: 10,
    title: "The Stanley Parable",
    subtitle: "A hilarious, existential game about choice and narration.",
    description:
      "A strange, clever, funny first-person game that plays with storytelling, player choice, and the relationship between player and narrator.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1703340/library_600x900.jpg",
    genres: ["walking-sim", "comedy", "first-person", "story"],
    moods: ["funny", "clever", "weird", "existential"],
    features: ["single-player", "short", "replayable", "narration"],
    avoidTags: ["combat-heavy", "serious-only", "multiplayer-only"],
    length: "short",
    difficulty: "easy",
    perspective: "first-person",
    pace: "medium",
    priceTier: "mid",
    year: 2022,
    steamUrl:
      "https://store.steampowered.com/app/1703340/The_Stanley_Parable_Ultra_Deluxe/",
  },
  {
    id: 11,
    title: "Garry's Mod",
    subtitle: "A physics sandbox that turns boredom into content.",
    description:
      "A legendary sandbox built around experimentation, mods, messing around, roleplay servers, and creating your own fun.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/4000/library_600x900.jpg",
    genres: ["sandbox", "physics", "multiplayer", "modding"],
    moods: ["funny", "chaotic", "creative", "social"],
    features: ["mods", "roleplay", "community", "physics"],
    avoidTags: ["linear", "story-only", "polished-campaign"],
    length: "massive",
    difficulty: "easy",
    perspective: "first-person",
    pace: "medium",
    priceTier: "cheap",
    year: 2006,
    steamUrl: "https://store.steampowered.com/app/4000/Garrys_Mod/",
  },
  {
    id: 12,
    title: "Left 4 Dead 2",
    subtitle: "Fast, chaotic co-op zombie shooting that still refuses to die.",
    description:
      "A classic cooperative FPS with incredible replayability, strong pacing, mod support, and chaotic zombie encounters.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/550/library_600x900.jpg",
    genres: ["fps", "co-op", "zombies", "action"],
    moods: ["chaotic", "tense", "fun", "arcade"],
    features: ["multiplayer", "mods", "replayable", "classic"],
    avoidTags: ["slow", "cozy", "story-heavy"],
    length: "medium",
    difficulty: "medium",
    perspective: "first-person",
    pace: "fast",
    priceTier: "cheap",
    year: 2009,
    steamUrl: "https://store.steampowered.com/app/550/Left_4_Dead_2/",
  },
  {
    id: 13,
    title: "Stardew Valley",
    subtitle: "The cozy life sim that quietly consumes your entire life.",
    description:
      "A farming and life sim about building a home, growing crops, fishing, mining, meeting villagers, and making slow satisfying progress.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/library_600x900.jpg",
    genres: ["life-sim", "farming", "sandbox", "cozy"],
    moods: ["relaxing", "wholesome", "cozy", "peaceful"],
    features: ["single-player", "co-op", "progression", "crafting"],
    avoidTags: ["scary", "stressful", "combat-heavy"],
    length: "massive",
    difficulty: "easy",
    perspective: "top-down",
    pace: "slow",
    priceTier: "cheap",
    year: 2016,
    steamUrl: "https://store.steampowered.com/app/413150/Stardew_Valley/",
  },
  {
    id: 14,
    title: "DOOM",
    subtitle: "Pure momentum, aggression, and cathartic FPS combat.",
    description:
      "A fast-paced arena shooter about movement, aggression, heavy weapons, and ripping through demons with almost no downtime.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/379720/library_600x900.jpg",
    genres: ["fps", "action", "arena-shooter", "sci-fi"],
    moods: ["intense", "violent", "fast", "powerful"],
    features: ["single-player", "combat-heavy", "soundtrack", "replayable"],
    avoidTags: ["slow", "cozy", "dialogue-heavy"],
    length: "medium",
    difficulty: "medium",
    perspective: "first-person",
    pace: "fast",
    priceTier: "mid",
    year: 2016,
    steamUrl: "https://store.steampowered.com/app/379720/DOOM/",
  },
  {
    id: 15,
    title: "Fallout: New Vegas",
    subtitle: "A choice-heavy RPG with absurd freedom and great writing.",
    description:
      "A beloved role-playing game with factions, quests, moral choices, player builds, dark humor, and a huge amount of freedom.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/22380/library_600x900.jpg",
    genres: ["rpg", "open-world", "story", "post-apocalyptic"],
    moods: ["funny", "bleak", "immersive", "weird"],
    features: ["player-choice", "factions", "single-player", "replayable"],
    avoidTags: ["linear", "short", "polished-modern"],
    length: "long",
    difficulty: "medium",
    perspective: "mixed",
    pace: "slow",
    priceTier: "cheap",
    year: 2010,
    steamUrl: "https://store.steampowered.com/app/22380/Fallout_New_Vegas/",
  },
];
import type { Game } from "../data/games";
export function getAllTags(game: Game) {
  return [
    ...game.genres,
    ...game.moods,
    ...game.features,
    game.length,
    game.difficulty,
    game.perspective,
    game.pace,
    game.priceTier,
  ];
}

export function titleCase(text: string) {
  const specialCases: Record<string, string> = {
    fps: "FPS",
    rpg: "RPG",
    "sci-fi": "Sci-Fi",
    co: "Co",
    "co-op": "Co-op",
  };

  if (specialCases[text]) {
    return specialCases[text];
  }

  return text
    .split("-")
    .map((word) => {
      if (specialCases[word]) {
        return specialCases[word];
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function buildReasons(
  game: Game,
  matchedTags: string[],
  avoidedHits: string[]
) {
  const reasons: string[] = [];

  if (matchedTags.length > 0) {
    reasons.push(
      `It matches your interest in ${matchedTags
        .slice(0, 4)
        .map(titleCase)
        .join(", ")}.`
    );
  }

  if (game.length === "short") {
    reasons.push("It is short enough to try without a huge time commitment.");
  }

  if (game.features.includes("classic")) {
    reasons.push("It has classic status, so it is a strong must-play candidate.");
  }

  if (game.features.includes("single-player")) {
    reasons.push("It works well as a focused solo experience.");
  }

  if (game.features.includes("replayable")) {
    reasons.push("It has enough replay value to stay interesting after one run.");
  }

  if (avoidedHits.length === 0) {
    reasons.push("It avoids the dealbreakers you selected.");
  }

  if (reasons.length === 0) {
    reasons.push("It is included as a generally strong recommendation from the library.");
  }

  return reasons.slice(0, 4);
}

export function getTasteProfile(selectedTags: string[]) {
  const has = (tag: string) => selectedTags.includes(tag);

  if (has("horror") && has("first-person")) {
    return {
      name: "The Tension Seeker",
      description:
        "You seem drawn to focused, atmospheric games that put you directly inside the situation and keep pressure on you.",
    };
  }

  if (has("sandbox") || has("open-world")) {
    return {
      name: "The Systems Wanderer",
      description:
        "You probably like games that let you make your own fun, experiment, wander, and create stories through mechanics.",
    };
  }

  if (has("story") && has("linear")) {
    return {
      name: "The Cinematic Campaign Person",
      description:
        "You seem to prefer tight pacing, memorable moments, and games that know exactly where they are taking you.",
    };
  }

  if (has("cozy") || has("slow")) {
    return {
      name: "The Comfort Player",
      description:
        "You seem to want games that give you a place to exist in rather than games that constantly demand peak performance.",
    };
  }

  if (has("fps") && has("fast")) {
    return {
      name: "The Momentum Addict",
      description:
        "You probably want games that move quickly, feel responsive, and create satisfying moment-to-moment action.",
    };
  }

  return {
    name: "The Curious Generalist",
    description:
      "You are still exploring your taste profile, so the best recommendations are probably varied, iconic, and easy to try.",
  };
}
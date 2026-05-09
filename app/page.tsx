"use client";

import { useMemo, useState } from "react";
import { games } from "../data/games";
import type { Game } from "../data/games";
import { preferenceOptions, avoidOptions } from "../data/options";
import {
  getAllTags,
  titleCase,
  buildReasons,
  getTasteProfile,
} from "../lib/recommendations";

type ScoredGame = Game & {
  score: number;
  matchPercentage: number;
  matchedTags: string[];
  missedTags: string[];
  reasons: string[];
};

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [avoidTags, setAvoidTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<
    "match" | "newest" | "oldest" | "shortest"
  >("match");
  const [expandedGameId, setExpandedGameId] = useState<number | null>(null);

  function toggleSelectedTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((selectedTag) => selectedTag !== tag)
        : [...current, tag]
    );
  }

  function toggleAvoidTag(tag: string) {
    setAvoidTags((current) =>
      current.includes(tag)
        ? current.filter((avoidTag) => avoidTag !== tag)
        : [...current, tag]
    );
  }

  const scoredGames = useMemo<ScoredGame[]>(() => {
    const maxPossibleScore = Math.max(selectedTags.length * 14, 1);

    return games
      .map((game) => {
        const allTags = getAllTags(game);

        const matchedTags = selectedTags.filter((tag) => allTags.includes(tag));
        const missedTags = selectedTags.filter((tag) => !allTags.includes(tag));

        const avoidedHits = avoidTags.filter(
          (tag) => allTags.includes(tag) || game.avoidTags.includes(tag)
        );

        let score = 0;

        for (const tag of selectedTags) {
          if (game.genres.includes(tag)) score += 14;
          if (game.moods.includes(tag)) score += 11;
          if (game.features.includes(tag)) score += 8;
          if (game.length === tag) score += 7;
          if (game.perspective === tag) score += 7;
          if (game.pace === tag) score += 6;
          if (game.priceTier === tag) score += 5;
          if (game.difficulty === tag) score += 4;
        }

        score -= avoidedHits.length * 18;

        const matchPercentage =
          selectedTags.length === 0
            ? 0
            : Math.max(
                0,
                Math.min(100, Math.round((score / maxPossibleScore) * 100))
              );

        return {
          ...game,
          score,
          matchPercentage,
          matchedTags,
          missedTags,
          reasons: buildReasons(game, matchedTags, avoidedHits),
        };
      })
      .filter((game) => {
        const search = searchTerm.trim().toLowerCase();

        const matchesSearch =
          search.length === 0 ||
          game.title.toLowerCase().includes(search) ||
          game.description.toLowerCase().includes(search) ||
          getAllTags(game).some((tag) => tag.toLowerCase().includes(search));

        const hasPositiveMatch = selectedTags.length === 0 || game.score > 0;

        return matchesSearch && hasPositiveMatch;
      })
      .sort((a, b) => {
        if (sortMode === "newest") return b.year - a.year;

        if (sortMode === "oldest") return a.year - b.year;

        if (sortMode === "shortest") {
          const order = { short: 1, medium: 2, long: 3, massive: 4 };
          return order[a.length] - order[b.length];
        }

        return b.score - a.score;
      });
  }, [selectedTags, avoidTags, searchTerm, sortMode]);

  const topRecommendation = selectedTags.length > 0 ? scoredGames[0] : null;
  const tasteProfile = getTasteProfile(selectedTags);

  const groupedPreferences = preferenceOptions.reduce<
    Record<string, typeof preferenceOptions>
  >((groups, option) => {
    if (!groups[option.group]) groups[option.group] = [];
    groups[option.group].push(option);
    return groups;
  }, {});

  const totalSelected = selectedTags.length + avoidTags.length;

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,222,128,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.10),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <nav className="mb-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-green-400 text-lg font-black text-black shadow-lg shadow-green-400/20">
                GG
              </div>

              <div>
                <p className="text-lg font-bold leading-none">GameGauge</p>
                <p className="text-xs text-zinc-400">
                  Taste-based game discovery
                </p>
              </div>
            </div>

            <a
              href="#recommender"
              className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-zinc-200 transition hover:bg-white/10 sm:block"
            >
              Start
            </a>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-medium text-green-300">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Smart enough to feel real, simple enough to understand
              </div>

              <h1 className="max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Find the game you actually feel like playing.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                Pick your mood, pacing, perspective, and dealbreakers. GameGauge
                ranks a curated library and explains why each game fits your
                taste.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#recommender"
                  className="rounded-2xl bg-green-400 px-6 py-3 text-center font-bold text-black shadow-lg shadow-green-400/20 transition hover:bg-green-300"
                >
                  Start picking preferences
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-3xl font-black">{games.length}</p>
                  <p className="mt-1 text-sm text-zinc-400">Curated games</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-3xl font-black">
                    {preferenceOptions.length}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">Taste tags</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-3xl font-black">100%</p>
                  <p className="mt-1 text-sm text-zinc-400">Explainable</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-zinc-950/70 p-4 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-[1.5rem] border border-white/10 bg-zinc-900 p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">Current top pick</p>
                    <h2 className="text-2xl font-black">
                      {topRecommendation?.title ?? "No pick yet"}
                    </h2>
                  </div>

                  {topRecommendation && selectedTags.length > 0 && (
                    <span className="rounded-full bg-green-400 px-3 py-1 text-sm font-black text-black">
                      {topRecommendation.matchPercentage}% match
                    </span>
                  )}
                </div>

                {topRecommendation ? (
                  <>
                    <div className="mb-5 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black">
                      <img
                        src={topRecommendation.image}
                        alt={topRecommendation.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <p className="text-sm leading-6 text-zinc-300">
                      {topRecommendation.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {getAllTags(topRecommendation)
                        .slice(0, 8)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-200"
                          >
                            {titleCase(tag)}
                          </span>
                        ))}
                    </div>
                  </>
                ) : (
                  <div className="grid h-64 place-items-center rounded-2xl border border-dashed border-white/15 p-6 text-center text-zinc-500">
                    Choose a few preferences to generate your top pick.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="recommender" className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              Taste Profile
            </p>

            <h2 className="mt-3 text-3xl font-black">{tasteProfile.name}</h2>

            <p className="mt-3 leading-7 text-zinc-300">
              {tasteProfile.description}
            </p>

            <div className="mt-6 rounded-2xl bg-black/30 p-4">
              <div className="flex items-center justify-between">
                <p className="font-bold">Recommendation signal</p>
                <p className="text-sm text-zinc-400">
                  {totalSelected} active inputs
                </p>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-green-400 transition-all"
                  style={{ width: `${Math.min(100, totalSelected * 10)}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-zinc-400">
                Add a few likes and dislikes for sharper recommendations.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
                  Controls
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  Tune the recommendation
                </h2>
              </div>

              <button
                onClick={() => {
                  setSelectedTags([]);
                  setAvoidTags([]);
                  setSearchTerm("");
                  setSortMode("match");
                  setExpandedGameId(null);
                }}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-zinc-200 transition hover:bg-white/10"
              >
                Reset everything
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_180px]">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search titles, moods, genres..."
                className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-green-400/50"
              />

              <select
                value={sortMode}
                onChange={(event) =>
                  setSortMode(
                    event.target.value as
                      | "match"
                      | "newest"
                      | "oldest"
                      | "shortest"
                  )
                }
                className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-white outline-none transition focus:border-green-400/50"
              >
                <option value="match">Best match</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="shortest">Shortest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
              <h3 className="text-xl font-black">What do you want?</h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Pick multiple. The site ranks games by how many signals they
                match.
              </p>

              <div className="mt-5 space-y-5">
                {Object.entries(groupedPreferences).map(([group, options]) => (
                  <div key={group}>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                      {group}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => {
                        const active = selectedTags.includes(option.tag);

                        return (
                          <button
                            key={option.tag}
                            onClick={() => toggleSelectedTag(option.tag)}
                            className={`rounded-full px-3 py-2 text-sm font-bold transition ${
                              active
                                ? "bg-green-400 text-black"
                                : "bg-white/10 text-zinc-200 hover:bg-white/15"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
              <h3 className="text-xl font-black">Dealbreakers</h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                These subtract points, which helps avoid technically matching
                but wrong-feeling games.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {avoidOptions.map((option) => {
                  const active = avoidTags.includes(option.tag);

                  return (
                    <button
                      key={option.tag}
                      onClick={() => toggleAvoidTag(option.tag)}
                      className={`rounded-full px-3 py-2 text-sm font-bold transition ${
                        active
                          ? "bg-red-400 text-black"
                          : "bg-white/10 text-zinc-200 hover:bg-white/15"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
                  Results
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  Recommended for you
                </h2>
              </div>

              <p className="text-sm text-zinc-400">
                Showing{" "}
                <span className="font-bold text-white">
                  {scoredGames.length}
                </span>{" "}
                games
              </p>
            </div>

            {selectedTags.length > 0 && (
              <div className="mb-5 rounded-3xl border border-green-400/20 bg-green-400/10 p-5">
                <p className="text-sm leading-6 text-green-100">
                  Ranking by{" "}
                  <span className="font-bold">
                    {selectedTags.map(titleCase).join(", ")}
                  </span>
                  {avoidTags.length > 0 && (
                    <>
                      {" "}
                      while avoiding{" "}
                      <span className="font-bold">
                        {avoidTags.map(titleCase).join(", ")}
                      </span>
                    </>
                  )}
                  .
                </p>
              </div>
            )}

            {scoredGames.length === 0 ? (
              <div className="grid min-h-80 place-items-center rounded-3xl border border-white/10 bg-zinc-900/70 p-8 text-center">
                <div>
                  <h3 className="text-2xl font-black">No matches found</h3>
                  <p className="mt-3 max-w-md text-zinc-400">
                    Your filters may be too specific. Clear a few preferences or
                    reset everything.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-5">
                {scoredGames.map((game, index) => {
                  const expanded = expandedGameId === game.id;

                  return (
                    <article
                      key={game.id}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 shadow-xl shadow-black/20 transition hover:border-white/20"
                    >
                      <div className="grid gap-0 md:grid-cols-[260px_1fr]">
                        <div className="relative min-h-[260px] overflow-hidden bg-black md:min-h-full">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                          <div className="absolute left-4 top-4 z-20 rounded-full bg-black/75 px-3 py-1 text-sm font-black backdrop-blur">
                            #{index + 1}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-2xl font-black">
                                  {game.title}
                                </h3>

                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-zinc-300">
                                  {game.year}
                                </span>
                              </div>

                              <p className="mt-1 font-semibold text-zinc-300">
                                {game.subtitle}
                              </p>
                            </div>

                            {selectedTags.length > 0 ? (
                              <div className="shrink-0 rounded-2xl bg-green-400 px-4 py-3 text-center text-black">
                                <p className="text-2xl font-black leading-none">
                                  {game.matchPercentage}%
                                </p>
                                <p className="text-xs font-black uppercase">
                                  match
                                </p>
                              </div>
                            ) : (
                              <div className="shrink-0 rounded-2xl bg-white/10 px-4 py-3 text-center text-zinc-300">
                                <p className="text-sm font-black uppercase">
                                  Curated
                                </p>
                              </div>
                            )}
                          </div>

                          <p className="mt-4 leading-7 text-zinc-300">
                            {game.description}
                          </p>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {[
                              ...game.genres.slice(0, 4),
                              ...game.moods.slice(0, 3),
                              game.length,
                              game.perspective,
                            ].map((tag) => {
                              const matched = game.matchedTags.includes(tag);

                              return (
                                <span
                                  key={`${game.id}-${tag}`}
                                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                                    matched
                                      ? "bg-green-400 text-black"
                                      : "bg-white/10 text-zinc-300"
                                  }`}
                                >
                                  {titleCase(tag)}
                                </span>
                              );
                            })}
                          </div>

                          <div className="mt-6 grid gap-3 md:grid-cols-3">
                            <div className="rounded-2xl bg-black/30 p-4">
                              <p className="text-xs font-bold uppercase text-zinc-500">
                                Length
                              </p>
                              <p className="mt-1 font-black">
                                {titleCase(game.length)}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-black/30 p-4">
                              <p className="text-xs font-bold uppercase text-zinc-500">
                                Difficulty
                              </p>
                              <p className="mt-1 font-black">
                                {titleCase(game.difficulty)}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-black/30 p-4">
                              <p className="text-xs font-bold uppercase text-zinc-500">
                                Pace
                              </p>
                              <p className="mt-1 font-black">
                                {titleCase(game.pace)}
                              </p>
                            </div>
                          </div>

                          {expanded && (
                            <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
                              <h4 className="font-black">
                                Why this recommendation works
                              </h4>

                              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                                {game.reasons.map((reason) => (
                                  <li key={reason} className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                                    <span>{reason}</span>
                                  </li>
                                ))}
                              </ul>

                              {game.missedTags.length > 0 &&
                                selectedTags.length > 0 && (
                                  <p className="mt-4 text-sm text-zinc-500">
                                    Does not strongly match:{" "}
                                    <span className="text-zinc-300">
                                      {game.missedTags
                                        .map(titleCase)
                                        .join(", ")}
                                    </span>
                                  </p>
                                )}
                            </div>
                          )}

                          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <button
                              onClick={() =>
                                setExpandedGameId(expanded ? null : game.id)
                              }
                              className="rounded-2xl bg-white px-5 py-3 font-black text-black transition hover:bg-zinc-200"
                            >
                              {expanded ? "Hide details" : "Why this game?"}
                            </button>

                            <a
                              href={game.steamUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center font-black text-white transition hover:bg-white/10"
                            >
                              View on Steam
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-black">
                Simple, explainable scoring.
              </h2>
            </div>

            <div className="rounded-3xl bg-black/25 p-6">
              <p className="text-2xl font-black">1</p>
              <h3 className="mt-3 text-xl font-black">You choose signals</h3>
              <p className="mt-2 leading-6 text-zinc-400">
                Genre, mood, length, perspective, pace, and price all become
                tags.
              </p>
            </div>

            <div className="rounded-3xl bg-black/25 p-6">
              <p className="text-2xl font-black">2</p>
              <h3 className="mt-3 text-xl font-black">Games get scored</h3>
              <p className="mt-2 leading-6 text-zinc-400">
                Strong matches gain points. Dealbreakers subtract points.
              </p>
            </div>

            <div className="rounded-3xl bg-black/25 p-6 lg:col-start-2">
              <p className="text-2xl font-black">3</p>
              <h3 className="mt-3 text-xl font-black">Results are explained</h3>
              <p className="mt-2 leading-6 text-zinc-400">
                Each recommendation shows why it fits instead of just throwing a
                title at you.
              </p>
            </div>

            <div className="rounded-3xl bg-black/25 p-6">
              <p className="text-2xl font-black">4</p>
              <h3 className="mt-3 text-xl font-black">
                You improve the library
              </h3>
              <p className="mt-2 leading-6 text-zinc-400">
                Add more games, better tags, user accounts, favorites, and
                eventually real APIs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
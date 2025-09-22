export type Tournament = {
  slug: string;
  name: string;
  location: string;
  startDate: string; // ISO
  endDate: string; // ISO
  description: string;
  image: string;
  rules: string[];
  prize: string;
};

export const tournaments: Tournament[] = [
{
  slug: "valley-esports-2025",
  name: "Valley Esports – Oct 2025",
  location: "Kashmir, India",
  startDate: "2025-10-01T10:00:00+05:30",
  endDate: "2025-10-31T20:00:00+05:30",
  description:
  "Fictr's first esports program empowering Kashmiri youth playing Free Fire. Structured brackets, fair play, and community-driven stages across the Valley.",
  image:
  "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1600&auto=format&fit=crop",
  rules: [
  // Tournament Format
  "Game: Garena Free Fire",
  "Registration fee per team: ₹599 — ₹200 to be paid at registration (selection round entry) and the remaining ₹399 only by teams that qualify beyond the selection round.",
  "Matches will be played in multiple rounds.",
  "Top 25 teams from Round 1 will advance to the next stage.",
  // Eligibility
  "Open to Kashmiri youth players.",
  "Each team must have 4–5 members.",
  "All players must provide valid in-game IDs during registration.",
  // Schedule (Oct 2025)
  "Schedule — Registration: Oct 1 – Oct 10",
  "Schedule — Selection Round 1: Oct 12 – Oct 14",
  "Schedule — Selection Round 2: Oct 15 – Oct 18 (Top 25 selected)",
  "Schedule — Semi-finals: Oct 20 – Oct 25 (Top 5 advance)",
  "Schedule — Grand Final: Oct 30",
  "Schedule — Prize distribution and closing: Oct 31",
  // General Rules
  "Tournament runs only in October.",
  "Teams must join lobbies on time. Late entries will be disqualified.",
  "Use of hacks, mods, or third-party tools will result in immediate disqualification.",
  "Respect referees, organizers, and other players. Toxic behavior will not be tolerated.",
  "Matches will be hosted and managed by Fictr. The decision of organizers is final.",
  "Internet connection and device stability are the player's responsibility.",
  // Fee & Discounts (summary)
  "Selection round entry: ₹200 (non‑refundable); teams qualifying beyond the selection round must pay balance ₹399 to continue.",
  "Registration fee non refundable.",
  "Discounts apply only to the immediate next Fictr tournament.",
  "Free entry reward equals one full entry (value = current entry fee).",
  "All discounts are non-transferable.",
  // Additional Notes
  "Prize payouts processed within 7 working days after tournament end (post verification).",
  "Discounts for winners/participants are applied as a code for the next tournament.",
  ],

  prize:
  "1st place: ₹5,000 cash + 25% discount on next Fictr tournament entry.\n" +
  "2nd place: ₹2,499 cash + 15% discount on next Fictr tournament entry.\n" +
  "3rd place: 50% discount on next Fictr tournament entry.\n" +
  "All other 27 teams: 10% discount on next Fictr tournament."
}];


export function getTournamentBySlug(slug: string) {
  return tournaments.find((t) => t.slug === slug);
}
import type { TDFJerseyHolder, TDFProRider, TDFStage } from "@/types";

/** Official route data sourced from letour.fr — updated after Stage 5 (8 July 2026) */
export const tdf2026Meta = {
  edition: 113,
  startDate: "2026-07-04",
  endDate: "2026-07-26",
  totalDistance: 3320.7,
  totalElevation: 53950,
  stageCount: 21,
  restDays: 2,
  grandDepart: "Barcelona, Spain",
  finish: "Paris Champs-Élysées",
  currentStage: 6,
  lastUpdated: "2026-07-08T18:00:00Z",
  source: "https://www.letour.fr/en/overall-route",
};

export const tdf2026Stages: TDFStage[] = [
  { number: 1, date: "2026-07-04", start: "Barcelona", finish: "Barcelona", distance: 19.6, type: "team-tt", status: "completed", winner: "Team Visma | Lease a Bike", winnerTeam: "Visma–Lease a Bike", winnerCountry: "NED", winningTime: "18' 42\"" },
  { number: 2, date: "2026-07-05", start: "Tarragona", finish: "Barcelona", distance: 168.5, type: "hilly", status: "completed", winner: "Isaac del Toro", winnerTeam: "UAE Team Emirates XRG", winnerCountry: "MEX", winningTime: "3h 58' 12\"" },
  { number: 3, date: "2026-07-06", start: "Granollers", finish: "Les Angles", distance: 195.9, type: "mountain", status: "completed", winner: "Tadej Pogačar", winnerTeam: "UAE Team Emirates XRG", winnerCountry: "SLO", winningTime: "4h 42' 55\"" },
  { number: 4, date: "2026-07-07", start: "Carcassonne", finish: "Foix", distance: 181.9, type: "hilly", status: "completed", winner: "Mads Pedersen", winnerTeam: "Lidl–Trek", winnerCountry: "DEN", winningTime: "4h 12' 33\"" },
  { number: 5, date: "2026-07-08", start: "Lannemezan", finish: "Pau", distance: 158.3, type: "flat", status: "completed", winner: "Olav Kooij", winnerTeam: "Decathlon CMA CGM Team", winnerCountry: "NED", winningTime: "3h 29' 07\"" },
  { number: 6, date: "2026-07-09", start: "Pau", finish: "Gavarnie-Gèdre", distance: 186.2, type: "mountain", status: "upcoming" },
  { number: 7, date: "2026-07-10", start: "Hagetmau", finish: "Bordeaux", distance: 175.1, type: "flat", status: "upcoming" },
  { number: 8, date: "2026-07-11", start: "Périgueux", finish: "Bergerac", distance: 180.4, type: "flat", status: "upcoming" },
  { number: 9, date: "2026-07-12", start: "Malemort", finish: "Ussel", distance: 185.5, type: "hilly", status: "upcoming" },
  { number: 0, date: "2026-07-13", start: "Cantal", finish: "Rest Day", distance: 0, type: "rest", status: "upcoming" },
  { number: 10, date: "2026-07-14", start: "Aurillac", finish: "Le Lioran", distance: 166.6, type: "mountain", status: "upcoming" },
  { number: 11, date: "2026-07-15", start: "Vichy", finish: "Nevers", distance: 161.3, type: "flat", status: "upcoming" },
  { number: 12, date: "2026-07-16", start: "Circuit Nevers Magny-Cours", finish: "Chalon-sur-Saône", distance: 179.1, type: "flat", status: "upcoming" },
  { number: 13, date: "2026-07-17", start: "Dole", finish: "Belfort", distance: 205.8, type: "hilly", status: "upcoming" },
  { number: 14, date: "2026-07-18", start: "Mulhouse", finish: "Le Markstein Fellering", distance: 155.3, type: "mountain", status: "upcoming" },
  { number: 15, date: "2026-07-19", start: "Champagnole", finish: "Plateau de Solaison", distance: 183.9, type: "mountain", status: "upcoming" },
  { number: 0, date: "2026-07-20", start: "Haute-Savoie", finish: "Rest Day", distance: 0, type: "rest", status: "upcoming" },
  { number: 16, date: "2026-07-21", start: "Évian-les-Bains", finish: "Thonon-les-Bains", distance: 26.1, type: "individual-tt", status: "upcoming" },
  { number: 17, date: "2026-07-22", start: "Chambéry", finish: "Voiron", distance: 174.7, type: "flat", status: "upcoming" },
  { number: 18, date: "2026-07-23", start: "Voiron", finish: "Orcières-Merlette", distance: 185.2, type: "mountain", status: "upcoming" },
  { number: 19, date: "2026-07-24", start: "Gap", finish: "Alpe d'Huez", distance: 127.9, type: "mountain", status: "upcoming" },
  { number: 20, date: "2026-07-25", start: "Le Bourg-d'Oisans", finish: "Alpe d'Huez", distance: 170.9, type: "mountain", status: "upcoming" },
  { number: 21, date: "2026-07-26", start: "Thoiry", finish: "Paris Champs-Élysées", distance: 133, type: "flat", status: "upcoming" },
];

/** General Classification after Stage 5 — source: letour.fr */
export const tdf2026GC: TDFProRider[] = [
  { rank: 1, name: "Tadej Pogačar", team: "UAE Team Emirates XRG", country: "SLO", time: "18h 42' 31\"", gap: "—" },
  { rank: 2, name: "Remco Evenepoel", team: "Red Bull–Bora–Hansgrohe", country: "BEL", time: "18h 43' 05\"", gap: "+ 34\"" },
  { rank: 3, name: "Jonas Vingegaard", team: "Visma–Lease a Bike", country: "DEN", time: "18h 43' 22\"", gap: "+ 51\"" },
  { rank: 4, name: "Isaac del Toro", team: "UAE Team Emirates XRG", country: "MEX", time: "18h 43' 48\"", gap: "+ 1' 17\"" },
  { rank: 5, name: "Egan Bernal", team: "Netcompany INEOS", country: "COL", time: "18h 44' 12\"", gap: "+ 1' 41\"" },
  { rank: 6, name: "Matteo Jorgenson", team: "Visma–Lease a Bike", country: "USA", time: "18h 44' 55\"", gap: "+ 2' 24\"" },
  { rank: 7, name: "Richard Carapaz", team: "EF Education–EasyPost", country: "ECU", time: "18h 45' 03\"", gap: "+ 2' 32\"" },
  { rank: 8, name: "Tom Pidcock", team: "Pinarello–Q36.5", country: "GBR", time: "18h 45' 18\"", gap: "+ 2' 47\"" },
  { rank: 9, name: "Mattias Skjelmose", team: "Lidl–Trek", country: "DEN", time: "18h 45' 44\"", gap: "+ 3' 13\"" },
  { rank: 10, name: "Kevin Vauquelin", team: "Netcompany INEOS", country: "FRA", time: "18h 46' 02\"", gap: "+ 3' 31\"" },
];

export const tdf2026Jerseys: TDFJerseyHolder[] = [
  { jersey: "yellow", rider: "Tadej Pogačar", team: "UAE Team Emirates XRG", country: "SLO", points: "18h 42' 31\"" },
  { jersey: "green", rider: "Mads Pedersen", team: "Lidl–Trek", country: "DEN", points: "68 pts" },
  { jersey: "polka", rider: "Tadej Pogačar", team: "UAE Team Emirates XRG", country: "SLO", points: "32 pts" },
  { jersey: "white", rider: "Isaac del Toro", team: "UAE Team Emirates XRG", country: "MEX", points: "18h 43' 48\"" },
];

export const tdf2026Highlights = [
  "Grand Départ in Barcelona — 3rd time in Spain",
  "Team time trial opens the race for the first time since 1971",
  "5 summit finishes including Alpe d'Huez twice (Stages 19 & 20)",
  "53,950m total elevation — Col du Galibier (2,642m) is the highest point",
  "Netcompany INEOS (formerly INEOS Grenadiers) — Katoen Natie partner team",
];
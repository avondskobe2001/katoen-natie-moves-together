import type { Region } from "@/types";

export interface Terminal {
  id: string;
  name: string;
  country: string;
  region: Region;
}

export const terminals: Terminal[] = [
  { id: "antwerp", name: "Antwerp", country: "Belgium", region: "europe" },
  { id: "rotterdam", name: "Rotterdam", country: "Netherlands", region: "europe" },
  { id: "genk", name: "Genk", country: "Belgium", region: "europe" },
  { id: "luxembourg", name: "Luxembourg", country: "Luxembourg", region: "europe" },
  { id: "felixstowe", name: "Felixstowe", country: "United Kingdom", region: "europe" },
  { id: "hamburg", name: "Hamburg", country: "Germany", region: "europe" },
  { id: "marseille", name: "Marseille", country: "France", region: "europe" },
  { id: "barcelona", name: "Barcelona", country: "Spain", region: "europe" },
  { id: "singapore", name: "Singapore", country: "Singapore", region: "asia" },
  { id: "shanghai", name: "Shanghai", country: "China", region: "asia" },
  { id: "dubai", name: "Dubai", country: "United Arab Emirates", region: "asia" },
  { id: "chennai", name: "Chennai", country: "India", region: "asia" },
  { id: "lagos", name: "Lagos", country: "Nigeria", region: "africa" },
  { id: "durban", name: "Durban", country: "South Africa", region: "africa" },
  { id: "santos", name: "Santos", country: "Brazil", region: "americas" },
  { id: "houston", name: "Houston", country: "United States", region: "americas" },
  { id: "montreal", name: "Montreal", country: "Canada", region: "americas" },
  { id: "sydney", name: "Sydney", country: "Australia", region: "oceania" },
];

export function getTerminalById(id: string): Terminal | undefined {
  return terminals.find((t) => t.id === id);
}
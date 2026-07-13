import type { KTNJerseyType } from "@/types";

export const jerseyConfig: Record<
  KTNJerseyType,
  { name: string; description: string; colors: { primary: string; secondary: string; accent?: string } }
> = {
  gc: {
    name: "KTN Leader Jersey",
    description: "Red & white — overall leader in total distance (General Classification)",
    colors: { primary: "#C8102E", secondary: "#FFFFFF", accent: "#003d7a" },
  },
  young: {
    name: "White Jersey",
    description: "Best employee aged 25 or under in the general classification",
    colors: { primary: "#FFFFFF", secondary: "#F0F0F0", accent: "#333333" },
  },
  mountain: {
    name: "Blue Jersey",
    description: "Most elevation metres gained during the challenge",
    colors: { primary: "#003d7a", secondary: "#1a5a9e", accent: "#FFFFFF" },
  },
  women: {
    name: "Pink Jersey",
    description: "Leading woman in the general classification",
    colors: { primary: "#E91E8C", secondary: "#FF69B4", accent: "#FFFFFF" },
  },
};

export function getJerseyLabel(type: KTNJerseyType): string {
  return jerseyConfig[type].name;
}
import { Bike, Footprints, PersonStanding, Trophy, Activity } from "lucide-react";
import type { SportType } from "@/types";
import { cn } from "@/lib/utils";

const sportConfig: Record<SportType, { icon: typeof Bike; color: string }> = {
  cycling: { icon: Bike, color: "text-kn-red" },
  running: { icon: Footprints, color: "text-kn-red-dark" },
  walking: { icon: PersonStanding, color: "text-[#e63950]" },
  football: { icon: Trophy, color: "text-[#9b0e24]" },
  general: { icon: Activity, color: "text-kn-red" },
};

interface SportIconProps {
  sport: SportType;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SportIcon({ sport, className, size = "md" }: SportIconProps) {
  const config = sportConfig[sport];
  const Icon = config.icon;
  const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return <Icon className={cn(sizeClass, config.color, className)} />;
}
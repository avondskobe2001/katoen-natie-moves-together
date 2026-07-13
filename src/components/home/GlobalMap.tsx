"use client";

import { useState } from "react";
import { globalActivities } from "@/data/sample-data";
import { WorldMapSvg } from "@/components/graphics/WorldMapSvg";
import { curvedRoutePath, MAP_HEIGHT, MAP_WIDTH, projectLatLng } from "@/lib/map-projection";
import type { GlobalActivity, SportType } from "@/types";
import { cn } from "@/lib/utils";
import { Bike, Footprints, PersonStanding, Trophy, Activity, MapPin } from "lucide-react";

const HUB = { terminal: "Antwerp HQ", country: "Belgium", lat: 51.22, lng: 4.4 };
const hubPos = projectLatLng(HUB.lat, HUB.lng);

const sportPin: Record<SportType, { color: string; Icon: typeof Bike }> = {
  cycling: { color: "#c8102e", Icon: Bike },
  running: { color: "#9b0e24", Icon: Footprints },
  walking: { color: "#e63950", Icon: PersonStanding },
  football: { color: "#7b0c1c", Icon: Trophy },
  general: { color: "#b5121b", Icon: Activity },
};

export function GlobalMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = globalActivities.find((a) => a.id === activeId);

  return (
    <div className="relative w-full rounded-2xl border border-border bg-card overflow-hidden shadow-md">
      <div className="flex flex-col lg:flex-row">
        <div className="relative flex-1 min-h-[320px] lg:min-h-[400px]">
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Global activity map showing Katoen Natie terminals worldwide"
          >
            <defs>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3efeb" />
                <stop offset="50%" stopColor="#ebe6e1" />
                <stop offset="100%" stopColor="#e8e2dc" />
              </linearGradient>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c8102e" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#c8102e" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#c8102e" stopOpacity="0.15" />
              </linearGradient>
              <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="latLines" width="1000" height="50" patternUnits="userSpaceOnUse">
                <line x1="0" y1="25" x2="1000" y2="25" stroke="#c8102e" strokeWidth="0.5" strokeOpacity="0.05" />
              </pattern>
            </defs>

            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#oceanGrad)" />
            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#latLines)" />

            {[125, 250, 375, 500, 625, 750, 875].map((x) => (
              <line key={x} x1={x} y1={0} x2={x} y2={MAP_HEIGHT} stroke="#c8102e" strokeWidth="0.5" strokeOpacity="0.04" />
            ))}

            <WorldMapSvg className="text-[#d4ccc4] [&_path]:stroke-[#c9bfb6] [&_path]:stroke-[0.8]" />

            {globalActivities.map((activity) => {
              const pos = projectLatLng(activity.lat, activity.lng);
              const isActive = activeId === activity.id;
              return (
                <path
                  key={`route-${activity.id}`}
                  d={curvedRoutePath(hubPos.x, hubPos.y, pos.x, pos.y, 0.18)}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth={isActive ? 2.5 : 1.2}
                  strokeOpacity={isActive ? 0.9 : 0.4}
                  strokeDasharray={isActive ? "none" : "6 4"}
                  className="transition-all duration-300"
                />
              );
            })}

            <g filter="url(#markerGlow)">
              <circle cx={hubPos.x} cy={hubPos.y} r={14} fill="#c8102e" fillOpacity={0.12} />
              <circle cx={hubPos.x} cy={hubPos.y} r={8} fill="#c8102e" stroke="#f3efeb" strokeWidth={2.5} />
              <text
                x={hubPos.x}
                y={hubPos.y - 16}
                textAnchor="middle"
                style={{ fontFamily: "system-ui", fontSize: 11, fontWeight: 700, fill: "#9b0e24" }}
              >
                HQ
              </text>
            </g>

            {globalActivities.map((activity) => {
              const pos = projectLatLng(activity.lat, activity.lng);
              const pin = sportPin[activity.sport];
              const isActive = activeId === activity.id;

              return (
                <g
                  key={activity.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveId(activity.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() => setActiveId(isActive ? null : activity.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setActiveId(activity.id)}
                >
                  {isActive && (
                    <circle cx={pos.x} cy={pos.y} r={18} fill={pin.color} fillOpacity={0.2}>
                      <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 7 : 5.5}
                    fill={pin.color}
                    stroke="#f3efeb"
                    strokeWidth={2}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {Object.entries(sportPin).slice(0, 4).map(([sport, { color }]) => (
              <span
                key={sport}
                className="inline-flex items-center gap-1.5 rounded-full bg-card/95 border border-border px-2.5 py-1 text-[10px] font-medium text-muted-foreground shadow-sm capitalize"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                {sport}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-border bg-muted/50 flex flex-col">
          <div className="px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kn-red opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-kn-red" />
              </span>
              <p className="text-sm font-bold text-foreground">Live Global Activity</p>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{globalActivities.length} terminals active</p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[280px] lg:max-h-none p-2 space-y-1.5">
            {globalActivities.map((activity) => (
              <ActivityRow
                key={activity.id}
                activity={activity}
                isActive={activeId === activity.id}
                onHover={() => setActiveId(activity.id)}
                onLeave={() => setActiveId(null)}
              />
            ))}
          </div>

          {active && (
            <div className="p-4 border-t border-border bg-card">
              <p className="text-xs font-bold text-kn-red flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {active.terminal}
              </p>
              <p className="text-xs text-muted-foreground">{active.country}</p>
              <p className="text-sm mt-2 text-foreground">{active.activity}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityRow({
  activity,
  isActive,
  onHover,
  onLeave,
}: {
  activity: GlobalActivity;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const pin = sportPin[activity.sport];
  const Icon = pin.Icon;

  return (
    <button
      type="button"
      className={cn(
        "w-full text-left rounded-xl px-3 py-2.5 transition-all border",
        isActive
          ? "bg-card border-kn-red/25 shadow-sm"
          : "bg-transparent border-transparent hover:bg-card hover:border-border"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-start gap-2.5">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${pin.color}15` }}
        >
          <Icon className="h-4 w-4" style={{ color: pin.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-foreground truncate">{activity.terminal}</p>
          <p className="text-[10px] text-muted-foreground truncate">{activity.activity}</p>
        </div>
      </div>
    </button>
  );
}
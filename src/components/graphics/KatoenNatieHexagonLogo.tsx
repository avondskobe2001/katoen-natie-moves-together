import { cn } from "@/lib/utils";

/**
 * Exact recreation of the Katoen Natie brand mark (ico-logo-red.svg).
 * Six interconnected hexagons with sport silhouettes for the Moves Together platform.
 */
const HEXAGONS = [
  {
    id: "hex-1",
    path: "M0,45.495 L8.736,38.762 L17.472,45.495 L17.472,56.451 L8.736,62.807 L0,56.451 Z",
    cx: 8.736,
    cy: 54.151,
    scale: 0.42,
    sport: "soccer",
  },
  {
    id: "hex-2",
    path: "M19.422,45.495 L28.158,38.762 L36.894,45.495 L36.894,56.451 L28.158,62.807 L19.422,56.451 Z",
    cx: 28.158,
    cy: 54.151,
    scale: 0.42,
    sport: "cycling",
  },
  {
    id: "hex-3",
    path: "M9.475,25.951 L18.211,19.218 L26.947,25.951 L26.947,36.906 L18.211,43.263 L9.475,36.906 Z",
    cx: 18.211,
    cy: 31.607,
    scale: 0.4,
    sport: "running",
  },
  {
    id: "hex-4",
    path: "M28.897,25.951 L37.633,19.218 L46.369,25.951 L46.369,36.906 L37.633,43.263 L28.897,36.906 Z",
    cx: 37.633,
    cy: 31.607,
    scale: 0.4,
    sport: "swimming",
  },
  {
    id: "hex-5",
    path: "M19.308,6.528 L27.766,0 L36.087,6.528 L36.087,17.484 L27.766,23.810 L19.308,17.484 Z",
    cx: 27.766,
    cy: 11.905,
    scale: 0.36,
    sport: "walking",
  },
  {
    id: "hex-6",
    path: "M38.845,45.495 L47.581,38.762 L56.317,45.495 L56.317,56.451 L47.581,62.807 L38.845,56.451 Z",
    cx: 47.581,
    cy: 54.151,
    scale: 0.42,
    sport: "tennis",
  },
] as const;

type SportType = (typeof HEXAGONS)[number]["sport"];

function SportIcon({ sport }: { sport: SportType }) {
  const stroke = "#1a1a1a";
  const fill = "#ffffff";

  switch (sport) {
    case "soccer":
      return (
        <g>
          <circle cx="0" cy="2" r="9" fill={fill} stroke={stroke} strokeWidth="1.2" />
          <path
            d="M0,-4 L2.5,0 L0,4 L-2.5,0 Z M-6,2 L-3,5 L-6,8 M6,2 L3,5 L6,8 M0,9 L0,12"
            fill="none"
            stroke={stroke}
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <g transform="translate(10, 6) scale(0.55)">
            <circle cx="0" cy="-8" r="3.5" fill={fill} stroke={stroke} strokeWidth="1" />
            <path
              d="M-4,0 Q0,-2 4,0 L6,10 Q2,12 0,10 Q-2,12 -6,10 Z"
              fill={fill}
              stroke={stroke}
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <path d="M-2,10 L-4,18 M2,10 L6,16" fill="none" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
          </g>
        </g>
      );

    case "cycling":
      return (
        <g>
          <circle cx="-9" cy="6" r="7" fill="none" stroke={fill} strokeWidth="2.2" />
          <circle cx="9" cy="6" r="7" fill="none" stroke={fill} strokeWidth="2.2" />
          <circle cx="-9" cy="6" r="1.5" fill={fill} stroke={stroke} strokeWidth="0.6" />
          <circle cx="9" cy="6" r="1.5" fill={fill} stroke={stroke} strokeWidth="0.6" />
          <path
            d="M-9,6 L-2,-4 L4,-4 L9,6 M-2,-4 L2,6 L9,6"
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M4,-4 L6,-10 L2,-12" fill="none" stroke={fill} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="4" cy="-12" r="2" fill={fill} stroke={stroke} strokeWidth="0.8" />
          <path
            d="M2,-12 Q0,-16 -2,-14"
            fill="none"
            stroke={fill}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      );

    case "running":
      return (
        <g>
          <circle cx="2" cy="-10" r="3.5" fill={fill} stroke={stroke} strokeWidth="1" />
          <path
            d="M-2,-4 Q2,-6 6,-4 L8,2 Q4,4 2,2 L0,8 Q-2,10 -4,8 L-8,14"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="M6,2 L10,8 M0,8 L6,14 M-4,8 L-10,12"
            fill="none"
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );

    case "swimming":
      return (
        <g>
          <ellipse cx="0" cy="-2" rx="12" ry="3" fill="none" stroke={fill} strokeWidth="1.5" strokeOpacity="0.7" />
          <ellipse cx="0" cy="4" rx="12" ry="3" fill="none" stroke={fill} strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx="-6" cy="-6" r="3" fill={fill} stroke={stroke} strokeWidth="1" />
          <path
            d="M-8,-2 Q-2,-6 4,-2 L10,0 Q6,4 2,2 L-4,4"
            fill={fill}
            stroke={stroke}
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path d="M4,-2 L12,-4 M2,2 L14,2" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );

    case "walking":
      return (
        <g>
          <circle cx="0" cy="-9" r="3" fill={fill} stroke={stroke} strokeWidth="1" />
          <path
            d="M-2,-4 Q0,-5 2,-4 L3,2 Q0,4 -2,2 L-3,10 Q-4,12 -6,10"
            fill={fill}
            stroke={stroke}
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M2,-4 L4,2 L6,10 M-2,2 L2,10 M-6,10 L-8,16 M6,10 L8,15"
            fill="none"
            stroke={stroke}
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M-8,-6 L-10,-12 M8,-6 L10,-11" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );

    case "tennis":
      return (
        <g>
          <ellipse cx="-4" cy="4" rx="5" ry="5" fill={fill} stroke={stroke} strokeWidth="1" />
          <path
            d="M4,-12 Q14,-4 10,8 Q6,12 2,8"
            fill="none"
            stroke={fill}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4,-12 Q-2,-6 0,2"
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line x1="2" y1="8" x2="0" y2="14" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M-4,4 L-6,8 L-4,4 L-2,8" fill="none" stroke={stroke} strokeWidth="0.6" />
        </g>
      );
  }
}

interface KatoenNatieHexagonLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  showShadow?: boolean;
}

const sizeClasses = {
  sm: "h-16 w-auto",
  md: "h-24 w-auto",
  lg: "h-40 w-auto",
  hero: "h-[min(90vw,520px)] w-auto max-h-[480px]",
};

export function KatoenNatieHexagonLogo({
  className,
  size = "md",
  showShadow = true,
}: KatoenNatieHexagonLogoProps) {
  return (
    <svg
      className={cn(sizeClasses[size], showShadow && "drop-shadow-lg drop-shadow-kn-red/20", className)}
      viewBox="0 0 57 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Katoen Natie Moves Together — sport hexagon logo"
    >
      <defs>
        {HEXAGONS.map((hex) => (
          <clipPath key={`clip-${hex.id}`} id={`clip-${hex.id}`}>
            <path d={hex.path} />
          </clipPath>
        ))}
        <filter id="kn-hex-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#9b0e24" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter={showShadow ? "url(#kn-hex-shadow)" : undefined}>
        {HEXAGONS.map((hex) => (
          <path
            key={hex.id}
            d={hex.path}
            fill="#c8102e"
            stroke="#9b0e24"
            strokeWidth="0.65"
            strokeLinejoin="round"
          />
        ))}
      </g>

      {HEXAGONS.map((hex) => (
        <g key={`icon-${hex.id}`} clipPath={`url(#clip-${hex.id})`}>
          <g transform={`translate(${hex.cx}, ${hex.cy}) scale(${hex.scale})`}>
            <SportIcon sport={hex.sport} />
          </g>
        </g>
      ))}
    </svg>
  );
}

export function KatoenNatieHexagonLogoHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 78% 45%, rgba(200,16,46,0.1) 0%, transparent 65%), radial-gradient(ellipse 40% 35% at 95% 60%, rgba(155,14,36,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Mobile: subtle watermark so copy stays readable */}
      <div className="absolute right-[-8%] bottom-[-5%] opacity-[0.18] sm:hidden">
        <KatoenNatieHexagonLogo size="lg" showShadow={false} />
      </div>

      {/* Tablet & desktop: full premium logo */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center pr-4 md:pr-8 lg:pr-12">
        <KatoenNatieHexagonLogo
          size="hero"
          className="h-[min(70vw,420px)] max-h-[400px] md:h-[min(55vw,480px)] md:max-h-[460px] lg:max-h-[480px]"
        />
      </div>
    </div>
  );
}
export function HeroGraphics() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 85% 40%, rgba(200,16,46,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(155,14,36,0.06) 0%, transparent 55%)",
        }}
      />

      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block h-[90%] max-h-[420px] w-auto opacity-90"
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hg-red" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#9b0e24" />
            <stop offset="1" stopColor="#c8102e" />
          </linearGradient>
          <linearGradient id="hg-red-light" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#c8102e" />
            <stop offset="1" stopColor="#e63950" />
          </linearGradient>
          <linearGradient id="hg-ring" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#c8102e" stopOpacity="0.12" />
            <stop offset="1" stopColor="#9b0e24" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <circle cx="210" cy="210" r="175" stroke="url(#hg-ring)" strokeWidth="1.5" fill="none" />
        <circle cx="210" cy="210" r="130" stroke="#c8102e" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="8 6" fill="none" />
        <circle cx="210" cy="210" r="85" stroke="#9b0e24" strokeWidth="1" strokeOpacity="0.12" fill="none" />

        <circle cx="210" cy="210" r="72" fill="url(#hg-red)" fillOpacity="0.06" stroke="url(#hg-red)" strokeWidth="1.5" strokeOpacity="0.2" />
        <ellipse cx="210" cy="210" rx="72" ry="28" stroke="#c8102e" strokeWidth="0.8" strokeOpacity="0.12" fill="none" />
        <ellipse cx="210" cy="210" rx="28" ry="72" stroke="#c8102e" strokeWidth="0.8" strokeOpacity="0.12" fill="none" />

        <path
          d="M 80 280 Q 210 120 340 160"
          stroke="url(#hg-red-light)"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 100 300 Q 210 180 320 200"
          stroke="#9b0e24"
          strokeWidth="1.5"
          strokeOpacity="0.2"
          fill="none"
          strokeDasharray="6 4"
        />

        <g transform="translate(48, 155)">
          <rect x="0" y="24" width="52" height="36" rx="3" fill="#c8102e" fillOpacity="0.1" stroke="#c8102e" strokeWidth="1.2" strokeOpacity="0.25" />
          <rect x="6" y="12" width="52" height="36" rx="3" fill="#c8102e" fillOpacity="0.15" stroke="#c8102e" strokeWidth="1.2" strokeOpacity="0.3" />
          <rect x="12" y="0" width="52" height="36" rx="3" fill="url(#hg-red)" fillOpacity="0.2" stroke="#c8102e" strokeWidth="1.2" strokeOpacity="0.35" />
          <line x1="22" y1="8" x2="54" y2="8" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7" />
          <line x1="22" y1="18" x2="54" y2="18" stroke="#c8102e" strokeWidth="1" strokeOpacity="0.3" />
        </g>

        <g transform="translate(300, 95)" opacity="0.85">
          <circle cx="20" cy="8" r="7" fill="#c8102e" fillOpacity="0.65" />
          <path d="M 12 18 Q 20 14 28 18 L 32 32 Q 28 38 20 36 Q 12 38 8 32 Z" fill="#9b0e24" fillOpacity="0.45" />
          <circle cx="38" cy="28" r="14" stroke="#c8102e" strokeWidth="2" strokeOpacity="0.4" fill="none" />
        </g>

        {[
          [210, 35],
          [355, 130],
          [340, 290],
          [80, 250],
          [100, 100],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="5"
            fill="#f3efeb"
            stroke={i % 2 === 0 ? "#c8102e" : "#9b0e24"}
            strokeWidth="1.5"
            strokeOpacity="0.55"
          />
        ))}

        <rect x="175" y="185" width="70" height="50" rx="12" fill="#f3efeb" fillOpacity="0.95" stroke="#c8102e" strokeWidth="1.5" strokeOpacity="0.35" />
        <text x="210" y="218" textAnchor="middle" fontFamily="system-ui" fontSize="22" fontWeight="900" fill="url(#hg-red)">
          KN
        </text>
      </svg>
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="flex items-center gap-4 py-2" aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <svg width="48" height="12" viewBox="0 0 48 12" fill="none">
        <circle cx="6" cy="6" r="3" fill="#c8102e" fillOpacity="0.25" />
        <circle cx="24" cy="6" r="4" fill="#c8102e" fillOpacity="0.45" />
        <circle cx="42" cy="6" r="3" fill="#9b0e24" fillOpacity="0.3" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

export function PageHeaderGraphic() {
  return (
    <svg
      className="absolute top-0 right-0 w-48 h-48 opacity-35 pointer-events-none"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
    >
      <circle cx="100" cy="100" r="80" stroke="#c8102e" strokeWidth="1" strokeOpacity="0.15" />
      <circle cx="100" cy="100" r="55" stroke="#9b0e24" strokeWidth="1" strokeOpacity="0.18" strokeDasharray="5 5" />
    </svg>
  );
}

export function SectionBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg className="absolute -right-8 -top-8 h-40 w-40 text-kn-red opacity-[0.04]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="currentColor" />
      </svg>
    </div>
  );
}
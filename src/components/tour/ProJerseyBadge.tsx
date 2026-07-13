import { cn } from "@/lib/utils";

type ProJersey = "yellow" | "green" | "polka" | "white";

const proJerseyColors: Record<ProJersey, { bg: string; label: string; dots?: boolean }> = {
  yellow: { bg: "#FFD700", label: "Maillot Jaune" },
  green: { bg: "#00B140", label: "Points" },
  polka: { bg: "#FFFFFF", label: "Mountains", dots: true },
  white: { bg: "#FFFFFF", label: "Best Young Rider" },
};

interface ProJerseyBadgeProps {
  jersey: ProJersey;
  size?: "sm" | "md";
}

export function ProJerseyBadge({ jersey, size = "sm" }: ProJerseyBadgeProps) {
  const config = proJerseyColors[jersey];
  const h = size === "sm" ? 28 : 40;
  const w = size === "sm" ? 22 : 32;

  return (
    <div
      className={cn("relative rounded-sm shadow inline-block shrink-0")}
      style={{ width: w, height: h, backgroundColor: config.bg }}
      title={config.label}
    >
      {config.dots && (
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "radial-gradient(circle, #E4002B 2px, transparent 2px)",
            backgroundSize: "6px 6px",
          }}
        />
      )}
    </div>
  );
}
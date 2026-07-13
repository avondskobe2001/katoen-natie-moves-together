/** Equirectangular projection for a 1000×500 world map (WGS84 lat/lng → SVG coords) */
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 500;

export function projectLatLng(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return { x, y };
}

/** Curved logistics route between two points (arc above the straight line) */
export function curvedRoutePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend = 0.25
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / (dist || 1);
  const ny = dx / (dist || 1);
  const cx = mx + nx * dist * bend;
  const cy = my + ny * dist * bend;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}
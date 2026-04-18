export function formatPoints(points) {
  return "[" + points.map(p =>
    `[${p[0].toFixed(2)}, ${p[1].toFixed(2)}]`
  ).join(", ") + "]";
}

// --- AREA (Earth approx) ---
export function calculateArea(points) {
  if (points.length < 3) return 0;

  const R = 6371000;

  let area = 0;

  for (let i = 0; i < points.length; i++) {
    const [lat1, lng1] = points[i];
    const [lat2, lng2] = points[(i + 1) % points.length];

    area += (lng2 - lng1) * (2 + Math.sin(lat1 * Math.PI / 180) + Math.sin(lat2 * Math.PI / 180));
  }

  area = area * R * R / 2;

  return Math.abs(area);
}

// --- YOUR FORMULA ---
export function calculateTargetPointCount(area) {
  const k = 0.05;

  const value = Math.pow(area, 0.25);

  return Math.max(3, Math.round(k * value));
}

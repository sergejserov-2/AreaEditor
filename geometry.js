//
// GEOMETRY MODULE
// чистая математика без зависимости от UI/Leaflet логики
//

// --- FORMAT POINTS ---
export function formatPoints(points) {
  return "[" + points.map(p => {
    return `[${p[0].toFixed(2)}, ${p[1].toFixed(2)}]`;
  }).join(", ") + "]";
}

// approximate spherical area (good enough for editor)

function toRad(v) {
  return (v * Math.PI) / 180;
}

export function calculateArea(points) {
  if (points.length < 3) return 0;

  const R = 6371000; // Earth radius in meters

  let area = 0;

  for (let i = 0; i < points.length; i++) {
    const [lat1, lng1] = points[i];
    const [lat2, lng2] = points[(i + 1) % points.length];

    area += toRad(lng2 - lng1) *
            (2 + Math.sin(toRad(lat1)) + Math.sin(toRad(lat2)));
  }

  area = (area * R * R) / 2;

  return Math.abs(area);
}

// --- RECOMMENDED POINT COUNT ---
export function calculateRecommendedPoints(area) {
  const density = 1 / 500000000; // коэффициент плотности (настройка)

  return Math.max(3, Math.round(area * density));
}

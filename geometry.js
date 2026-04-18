//
// GEOMETRY MODULE
// чистая математика без зависимости от UI/Leaflet логики
//

// --- FORMAT POINTS ---
export function formatPoints(points) {
  return "[" + points.map(p => {
    return [${p[0].toFixed(2)}, ${p[1].toFixed(2)}];
  }).join(", ") + "]";
}

// --- AREA (geodesic) ---
export function calculateArea(points) {
  if (points.length < 3) return 0;

  const latlngs = points.map(p => L.latLng(p[0], p[1]));
  return L.GeometryUtil.geodesicArea(latlngs); // м²
}

// --- RECOMMENDED POINT COUNT ---
export function calculateRecommendedPoints(area) {
  const density = 1 / 500000000; // коэффициент плотности (настройка)

  return Math.max(3, Math.round(area * density));
}

import {
  calculateArea,
  calculateRecommendedPoints,
  formatPoints
} from "./geometry.js";

// --- STATE ---
let points = [];
let polyline = null;
let polygon = null;

// --- MAP INIT ---
const map = L.map('map').setView([52.1, 21.0], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// fix layout issues
setTimeout(() => {
  map.invalidateSize();
}, 100);

// --- CLICK ON MAP ---
map.on('click', (e) => {
  points.push([e.latlng.lat, e.latlng.lng]);
  render();
});

// --- RENDER LINE / POLYGON ---
function render() {
  if (polyline) map.removeLayer(polyline);
  if (polygon) map.removeLayer(polygon);

  if (points.length > 0) {
    polyline = L.polyline(points, { color: 'blue' }).addTo(map);
  }
}

// --- CLOSE POLYGON ---
window.closePolygon = function () {
  if (points.length < 3) return;

  if (polyline) {
    map.removeLayer(polyline);
    polyline = null;
  }

  polygon = L.polygon(points, {
    color: 'blue',
    fillColor: '#3388ff',
    fillOpacity: 0.3
  }).addTo(map);
};

// --- UNDO ---
window.undo = function () {
  points.pop();
  render();
};

// --- CLEAR ---
window.clearAll = function () {
  points = [];

  if (polyline) map.removeLayer(polyline);
  if (polygon) map.removeLayer(polygon);

  polyline = null;
  polygon = null;
};

// --- POPUP CONTROL ---
window.closePopup = function () {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
};

// --- CALCULATE ---
window.calculate = function () {
  if (points.length < 3) return;

  const area = calculateArea(points);
  const currentCount = points.length;
  const recommended = calculateRecommendedPoints(area);
  const formatted = formatPoints(points);

  const resultText =
`Points:
${formatted}

Current: ${currentCount}
Recommended: ${recommended}
Area: ${(area / 1_000_000).toFixed(2)} km²`;

  document.getElementById("result").textContent = resultText;

  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
};

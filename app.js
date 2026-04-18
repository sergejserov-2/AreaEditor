import {
  calculateArea,
  calculateTargetPointCount,
  formatPoints
} from "./geometry.js";

import { simplifyPoints } from "./simplifer.js";

// --- STATE ---
let points = [];
let polyline = null;
let polygon = null;

// --- MAP ---
const map = L.map('map').setView([52.1, 21.0], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

setTimeout(() => map.invalidateSize(), 100);

// --- INPUT ---
map.on('click', (e) => {
  points.push([e.latlng.lat, e.latlng.lng]);
  render();
});

// --- RENDER ---
function render() {
  if (polyline) map.removeLayer(polyline);
  if (polygon) map.removeLayer(polygon);

  if (points.length > 0) {
    polyline = L.polyline(points, { color: 'blue' }).addTo(map);
  }
}

// --- BUTTONS ---
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

window.undo = function () {
  points.pop();
  render();
};

window.clearAll = function () {
  points = [];
  if (polyline) map.removeLayer(polyline);
  if (polygon) map.removeLayer(polygon);
  polyline = null;
  polygon = null;
};

// --- POPUP ---
window.closePopup = function () {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
};

// --- CALCULATE ---
window.calculate = function () {
  if (points.length < 3) return;

  const area = calculateArea(points);
  const current = points.length;
  const target = calculateTargetPointCount(area);
  const formatted = formatPoints(points);

  const html =
`<pre>
Points:
${formatted}

Current: ${current}
Target: ${target}
Area: ${(area / 1_000_000).toFixed(2)} km²
</pre>

<button onclick="stabilize()">Simplify</button>`;

  document.getElementById("result").innerHTML = html;

  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
};

// --- STABILIZE ---
window.simplify = function () {
  points = simplifyPoints(points, 0.01);
  render();
  calculate();
};

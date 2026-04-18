// SIMPLE DISTANCE-BASED SIMPLIFIER (v1)

function distance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// NOTE:
// это пока НЕ full simplification (не Douglas-Peucker)
// это first-level simplification = filtering + thinning

export function simplifyPoints(points, minDistance = 0.01) {
  if (!points.length) return [];

  const result = [points[0]];

  for (let i = 1; i < points.length; i++) {
    const prev = result[result.length - 1];
    const curr = points[i];

    if (distance(prev, curr) >= minDistance) {
      result.push(curr);
    }
  }

  return result;
}

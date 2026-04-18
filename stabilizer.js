// remove too-close points

function distance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

export function stabilizePoints(points, minDistance = 0.01) {
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

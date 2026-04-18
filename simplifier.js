// --- distance point → line ---
function pointLineDistance(p, a, b) {
  const [x, y] = p;
  const [x1, y1] = a;
  const [x2, y2] = b;

  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;

  let param = lenSq !== 0 ? dot / lenSq : -1;

  let xx, yy;

  if (param < 0) {
    xx = x1; yy = y1;
  } else if (param > 1) {
    xx = x2; yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;

  return Math.sqrt(dx * dx + dy * dy);
}

// --- Douglas-Peucker ---
function dp(points, epsilon) {
  if (points.length <= 2) return points;

  let maxDist = 0;
  let index = 0;

  const start = points[0];
  const end = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const d = pointLineDistance(points[i], start, end);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }

  if (maxDist > epsilon) {
    const left = dp(points.slice(0, index + 1), epsilon);
    const right = dp(points.slice(index), epsilon);

    return left.slice(0, -1).concat(right);
  }

  return [start, end];
}

// --- binary search to hit target N ---
function simplifyToTarget(points, target) {
  if (points.length <= target) return points;

  let minEps = 0;
  let maxEps = 1;
  let best = points;

  for (let i = 0; i < 20; i++) {
    const eps = (minEps + maxEps) / 2;
    const simplified = dp(points, eps);

    if (simplified.length > target) {
      minEps = eps;
    } else {
      maxEps = eps;
      best = simplified;
    }
  }

  return best;
}

// --- PUBLIC API ---
export function simplifyToN(points, targetN) {
  if (points.length <= targetN) return points;
  return simplifyToTarget(points, targetN);
}

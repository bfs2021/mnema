// The field of lines: work drawn as parallel lines, a decision as a fixed point the lines part around.
// The lines are streamlines of an ideal flow past round obstacles, psi(x, y) = y - sum a^2 (y - yi) / r^2, each followed
// from left to right as the level set psi = c.

/**
 * A fixed point: `[x, y, radius, stretch]`. A stretch above 1 widens it along the lines, which turns the round opening
 * into an almond.
 * @typedef {readonly [number, number, number, number?]} Stone
 */

/**
 * A number as the pictures write it: at most two decimals, no trailing zeros.
 * @param {number} n
 */
export const f = (n) => (Math.round(n * 100) / 100).toString();

/**
 * The stream function of the field at a point.
 * @param {number} x
 * @param {number} y
 * @param {readonly Stone[]} stones
 */
export const psi = (x, y, stones) =>
  stones.reduce(
    (s, [sx, sy, a, k]) =>
      s - (a * a * (y - sy)) / (((x - sx) / (k || 1)) ** 2 + (y - sy) ** 2 + 1e-9),
    y,
  );

/**
 * One line of the field: the level set psi = c, followed from `x0` to `x1` by continuation. A line never enters a fixed
 * point: a step of the solver that lands inside one is put back on its rim, on the side the line arrives from.
 * @param {number} c
 * @param {readonly Stone[]} stones
 * @param {number} x0
 * @param {number} x1
 * @param {number} [steps]
 * @returns {[number, number][]}
 */
export const line = (c, stones, x0, x1, steps = 90) => {
  /** @type {[number, number][]} */
  const out = [];
  let y = c;
  /**
   * @param {number} x
   * @param {number} yy
   * @param {number} ref
   */
  const keepOut = (x, yy, ref) => {
    let at = yy;
    for (const [sx, sy, a, k] of stones) {
      const h = a * a - ((x - sx) / (k || 1)) ** 2;
      if (h > 0 && (at - sy) * (at - sy) < h * 1.0004)
        at = sy + (ref >= sy ? 1 : -1) * Math.sqrt(h) * 1.0002;
    }
    return at;
  };
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const ref = y;
    y = keepOut(x, y, ref);
    for (let k = 0; k < 40; k++) {
      const e = 1e-3;
      const g = psi(x, y, stones) - c;
      const dg = (psi(x, y + e, stones) - psi(x, y - e, stones)) / (2 * e);
      if (Math.abs(dg) < 1e-6) break;
      const step = Math.max(-2, Math.min(2, g / dg));
      const ny = keepOut(x, y - step, ref);
      if (Math.abs(ny - y) < 1e-5) {
        y = ny;
        break;
      }
      y = ny;
    }
    out.push([x, y]);
  }
  return out;
};

/**
 * Evenly spaced lines of the field, from level `y0` to `y1`.
 * @param {{ stones: readonly Stone[], x0: number, x1: number, y0: number, y1: number, pitch: number, steps?: number }} o
 */
export const field = ({ stones, x0, x1, y0, y1, pitch, steps }) => {
  /** @type {[number, number][][]} */
  const lines = [];
  for (let c = y0; c <= y1 + 1e-6; c += pitch) {
    const hit = stones.some(([, sy, a]) => Math.abs(c - sy) < 1e-4 * a);
    lines.push(line(hit ? c + 1e-3 : c, stones, x0, x1, steps));
  }
  return lines;
};

/**
 * A smooth path through points (Catmull-Rom as cubic Beziers).
 * @param {readonly (readonly [number, number])[]} pts
 * @param {boolean} [closed]
 */
export const smooth = (pts, closed = false) => {
  const n = pts.length;
  /** @param {readonly [number, number]} p */
  const at2 = (p) => `${f(p[0])},${f(p[1])}`;
  if (n < 3) return `M${pts.map(at2).join('L')}`;
  /** @param {number} i @returns {readonly [number, number]} */
  const at = (i) =>
    /** @type {readonly [number, number]} */ (
      closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]
    );
  let d = `M${at2(at(0))}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + (closed ? 'Z' : '');
};

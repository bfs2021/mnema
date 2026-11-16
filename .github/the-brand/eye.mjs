// The eye of the brand, at rest: an almond opening drawn as six lines of the field (the two in the middle are the lids)
// parting round a flat iris, clipped to the almond's own outline. It draws no glint and no pupil, and nothing in it moves
// or blinks: the eye that moves belongs to the banner.

import { f, line, smooth } from './field.mjs';

/** The six lines of the eye, as levels. */
const LEVELS = [-38.75, -21.75, -4.75, 4.75, 21.75, 38.75];
/** The opening (radius, horizontal stretch) and the iris. */
const EYE = { a: 21, k: 1.45, r: 15.5 };
/** The outline of the almond the eye is clipped to. */
export const ALMOND = 'M-47,0Q0,-86 47,0Q0,86 -47,0Z';

/** The six lines, as path data, with the opening at the middle. */
const LIDS = LEVELS.map((c) => smooth(line(c, [[0, 0, EYE.a, EYE.k]], -58, 58, 16)));

/**
 * The eye as the inside of an `<svg>` with the view box `-48 -48 96 96`: its clip, and the iris and the lines drawn in it.
 * `look` shifts the iris down by a share of itself, as a glance does. `ring` draws a thin ring round the iris, which a light
 * ground needs, since the iris gives little contrast on it.
 * @param {{ id: string, ink: string, iris: string, ringInk: string, ring: boolean, look: number }} o
 */
export function eye({ id, ink, iris, ringInk, ring, look }) {
  const ellipse = `<ellipse cx="0" cy="${f(look * 0.45)}" rx="${EYE.r}" ry="${EYE.r}" fill="${iris}"${ring ? ` stroke="${ringInk}" stroke-width="2.2"` : ''}></ellipse>`;
  const lids = LIDS.map(
    (d, i) => `<path d="${d}" stroke-width="${i === 2 || i === 3 ? 4.75 : 9.5}"></path>`,
  ).join('');
  return `<clipPath id="${id}"><path d="${ALMOND}"/></clipPath><g clip-path="url(#${id})">${ellipse}<g fill="none" stroke="${ink}" stroke-linecap="round">${lids}</g></g>`;
}

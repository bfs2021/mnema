// The colours of the brand, in one place. No other file of `.github/the-brand/` writes a hex colour, and every colour a
// diagram draws is a value of `PALETTE` (`the-front-page-is-drawn-from-the-console.test.ts` reads both).
//
// Every grey has channels within 17 units of each other; `sulphur` is the one hue, and it appears only where it means
// something: the iris, a decision in force, a record verified.

/** @typedef {'charcoal' | 'charcoalRaised' | 'bone' | 'stone' | 'darkStone' | 'sulphur' | 'paper' | 'mask' | 'lineDark' | 'lineLight' | 'dimDark' | 'dimLight' | 'chipDark' | 'chipLight'} PaletteName */

/** @type {Readonly<Record<PaletteName, string>>} */
export const PALETTE = Object.freeze({
  charcoal: '#131312',
  charcoalRaised: '#1c1c1a',
  bone: '#efebe1',
  stone: '#8c8a82',
  darkStone: '#6b6862',
  sulphur: '#e6da2e',
  paper: '#f6f3ec',
  mask: '#fff',
  lineDark: '#46453f',
  lineLight: '#cdc8bc',
  dimDark: '#a29e94',
  dimLight: '#5b574f',
  chipDark: '#252523',
  chipLight: '#ebe7de',
});

/**
 * What a diagram paints with, by theme: its ground (`bg`), its ink, the lines of the band and the threads (`line`), its
 * secondary text (`dim`), the colour of an emphasised text (`acc`), whether a sign carries a ring of ink round its point
 * (`ring`), the ground of a chip, the dim sign (`muted`: a decision no longer in force, or never accepted) and the ink
 * of the mark drawn across a sign (`mark`).
 */
export const DIAGRAM = Object.freeze({
  dark: Object.freeze({
    name: /** @type {const} */ ('dark'),
    bg: PALETTE.charcoalRaised,
    ink: PALETTE.bone,
    line: PALETTE.lineDark,
    dim: PALETTE.dimDark,
    acc: PALETTE.sulphur,
    ring: false,
    chip: PALETTE.chipDark,
    muted: PALETTE.stone,
    mark: PALETTE.charcoal,
  }),
  light: Object.freeze({
    name: /** @type {const} */ ('light'),
    bg: PALETTE.paper,
    ink: PALETTE.charcoal,
    line: PALETTE.lineLight,
    dim: PALETTE.dimLight,
    acc: PALETTE.charcoal,
    ring: true,
    chip: PALETTE.chipLight,
    muted: PALETTE.darkStone,
    mark: PALETTE.charcoal,
  }),
});

/** @typedef {(typeof DIAGRAM)['dark'] | (typeof DIAGRAM)['light']} Theme */

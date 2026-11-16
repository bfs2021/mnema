Changed

- **The diagrams of the README and of the packages are redrawn in the new brand.** How mnema works, how mnema fits, the family and the
  pictures of `@mnema/chain`, `@mnema/core`, `@mnema/context` and `@mnema/stacks` are drawn on a strict grid in the field of lines
  with four signs for the state of a decision, and every word of the packages' and the family's is a literal of the product. Their
  text is outlines of Archivo and IBM Plex Mono (committed with their licence in `.github/the-brand/fonts/`), because an image loads
  no web font; `node .github/the-brand/diagrams.mjs` draws them and the blocks of the READMEs, and the guard reads the words from
  `data-said` where it read a `<text>`. The npm page of each version reads the pictures from `main`, so they change when this lands.
  The banner and the badges are not part of this change.

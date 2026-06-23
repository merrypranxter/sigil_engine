# Design Notes

## Modules

- `glyph-map.js` centralises the glyph definitions so that visuals and data remain consistent.
- `condense.js` encapsulates the logic for transforming user input into a condensed set of letters.
- `charging.js` implements a simple particle system for flames and bursts, keeping the animation separate from rendering logic.
- `main.js` handles the user interface, draws the sigil, and orchestrates the charging sequence.

## Interaction philosophy

Users should be able to create and charge a sigil quickly. The UI contains only essential controls: an input field to type the statement, a generate button, and a charge toggle. Additional keyboard shortcuts (S for strobe, R for reset) provide optional effects.

## Potential extensions

- Replace the 2D canvas with WebGL and ping-pong FBOs to create persistent afterimages.
- Export the final sigil as an SVG or PNG.
- Add audio feedback (e.g., crackling sounds during charging).
- Allow saving and loading of sigils, with unique IDs derived from the input.

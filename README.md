# sigil_engine

> Condense your intent into a chaos-magick sigil, then charge it through flames, bursts, and strobing.

This project implements the Austin Osman Spare method as a generative art engine. You enter a statement of intent; the engine removes vowels and duplicate letters, then maps the remaining consonants to glyphs. The glyphs are overlaid with slight random rotations to form a unique sigil. You can then 'charge' the sigil with a simple flame and particle simulation, including an optional strobing effect.

## Running

Open `index.html` in a modern browser. The page includes an input field to enter your statement. After you click **Generate Sigil**, the condensed glyph overlay appears. Click **Charge Sigil** to start the charging animation. No build step is required; everything uses vanilla JavaScript and the HTML5 canvas.

## Controls

| UI | Action |
|----|-------|
| Statement field | Enter your statement of intent |
| Generate Sigil | Condense and draw the sigil |
| Charge Sigil | Toggle the charging animation on/off |
| `S` key | Toggle strobe effect |
| `R` key | Reset and clear the canvas |

## Directory structure

- `index.html` — entry page with UI and `<canvas>` element.
- `src/js/glyph-map.js` — defines letter glyphs as line segments.
- `src/js/condense.js` — condenses a statement into unique consonants.
- `src/js/charging.js` — particle system for combustion and burst effects.
- `src/js/main.js` — ties everything together, handling UI, drawing, and animations.
- `src/shaders/` — minimal GLSL shader stubs for future GPU implementations.
- `docs/` — design notes, algorithm details, and visual targets.
- `examples/` — alternative demos, e.g. random sigil generator, burst-only.

## Background

Chaos magick uses sigils—personal symbols representing your will—as an exercise in psychological focus. After condensing a phrase by removing vowels and repeating letters, the remaining consonants are combined into a single glyph. Practitioners then "charge" the sigil by focusing on it until it enters the subconscious, often accompanied by intense energy or visual gnosis. This engine translates that method into an interactive canvas. See `docs/math-reference.md` for the condensing algorithm and `docs/visual-targets.md` for the aesthetic guidelines.

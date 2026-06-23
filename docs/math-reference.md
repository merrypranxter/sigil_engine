# Math Reference: sigil_engine

## Condensing Algorithm

To condense a statement of intent into a base set of letters:

1. **Normalize**: convert all characters to uppercase and strip non-letter characters.
2. **Remove vowels**: filter out `A`, `E`, `I`, `O`, `U`. `Y` is treated as a consonant.
3. **Remove duplicate letters**: iterate through the string and keep only the first occurrence of each letter.
4. The resulting sequence of consonants is used to select glyphs.

Example:

```
I WILL WIN THE LOTTERY

→ IWILLWINTHELOTTERY (uppercase)
→ WLLWNTHLTTRY (remove vowels)
→ WLNTHRY (remove duplicate letters)
```

## Glyph representation

Each letter is defined by a list of stroke segments. Coordinates are normalized to a unit square with `(0,0)` at the bottom-left and `(1,1)` at the top-right. For example, the letter `L` might be represented as two lines:

- `{ x1: 0.3, y1: 0.1, x2: 0.3, y2: 0.9 }` (vertical)
- `{ x1: 0.3, y1: 0.1, x2: 0.8, y2: 0.1 }` (horizontal)

## Overlay and rotation

To overlay multiple glyphs, each is scaled to a common size and then rotated by an angle computed from its index: `angle = (2π * i) / N + δ`, where `N` is the number of glyphs and `δ` is a small random offset. Each glyph is then drawn centered on the canvas with the computed rotation and a small radial offset.

## Particle system

Particles are spawned along each stroke with a random offset. Each particle has:

- `position` (x, y),
- `velocity` (vx, vy),
- `life` (remaining lifespan),
- `color` (hue or fixed orange/red gradient).

On each frame:

- Update positions: `x += vx * dt`, `y += vy * dt`.
- Apply simple gravity or upward drift: `vy += g * dt`.
- Reduce life and fade colour accordingly.
- Remove dead particles.

A burst effect spawns many particles with outward velocities at once.

Strobing is simulated by toggling a boolean and inverting canvas colours every `strobeInterval` seconds.

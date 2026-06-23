// Example: strobe demonstration on a static sigil. Toggle strobe with the S key.
import { condenseStatement } from '../src/js/condense.js';
import { glyphs } from '../src/js/glyph-map.js';

const canvas = document.getElementById('gl');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let sigilStrokes = [];
let cx = 0;
let cy = 0;
let size = 1;
let strobeActive = false;
let strobeTimer = 0;
let strobePhase = false;

function buildSigil(letters) {
  const strokes = [];
  const count = letters.length;
  letters.forEach((letter, i) => {
    const g = glyphs[letter];
    if (!g) return;
    const angle = (2 * Math.PI * i) / count;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    g.forEach(s => {
      const dx1 = s.x1 - 0.5;
      const dy1 = s.y1 - 0.5;
      const dx2 = s.x2 - 0.5;
      const dy2 = s.y2 - 0.5;
      const nx1 = dx1 * cosA - dy1 * sinA + 0.5;
      const ny1 = dx1 * sinA + dy1 * cosA + 0.5;
      const nx2 = dx2 * cosA - dy2 * sinA + 0.5;
      const ny2 = dx2 * sinA + dy2 * cosA + 0.5;
      strokes.push({ x1: nx1, y1: ny1, x2: nx2, y2: ny2 });
    });
  });
  return strokes;
}

function drawSigil() {
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  sigilStrokes.forEach(s => {
    const x1 = cx + (s.x1 - 0.5) * size;
    const y1 = cy + (0.5 - s.y1) * size;
    const x2 = cx + (s.x2 - 0.5) * size;
    const y2 = cy + (0.5 - s.y2) * size;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
}

function render(t) {
  const dt = 0.016;
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawSigil();
  if (strobeActive) {
    strobeTimer += dt;
    if (strobeTimer > 0.1) {
      strobePhase = !strobePhase;
      strobeTimer = 0;
    }
    if (strobePhase) {
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  ctx.fillStyle = '#888';
  ctx.font = '18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Press S to toggle strobe', canvas.width / 2, canvas.height - 30);
  requestAnimationFrame(render);
}

function init() {
  // build a sigil from a fixed phrase
  const letters = condenseStatement('VISUAL FOCUS');
  sigilStrokes = buildSigil(letters);
  cx = canvas.width / 2;
  cy = canvas.height / 2;
  size = Math.min(canvas.width, canvas.height) * 0.5;
}

init();
requestAnimationFrame(render);

window.addEventListener('keydown', e => {
  if (e.key === 's' || e.key === 'S') {
    strobeActive = !strobeActive;
  }
});

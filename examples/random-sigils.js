// Example: automatically generate random sigils and charge them.
import { condenseStatement } from '../src/js/condense.js';
import { glyphs } from '../src/js/glyph-map.js';
import { ParticleSystem } from '../src/js/charging.js';

const canvas = document.getElementById('gl');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const phrases = [
  'I AM STRONG',
  'SUCCESS IS MINE',
  'CREATIVITY FLOWS',
  'LOVE AND LIGHT',
  'I MANIFEST MY WILL',
  'ABUNDANCE SURROUNDS ME'
];
let currentPhrase = '';
let sigilStrokes = [];
let cx = 0;
let cy = 0;
let size = 1;
const particles = new ParticleSystem();
let lastTime = 0;
let timer = 0;
const switchInterval = 6; // seconds

function buildSigil(letters) {
  const strokes = [];
  const count = letters.length;
  letters.forEach((letter, i) => {
    const g = glyphs[letter];
    if (!g) return;
    const baseAngle = (2 * Math.PI * i) / count;
    const randomOffset = (Math.random() - 0.5) * 0.4;
    const angle = baseAngle + randomOffset;
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

function nextSigil() {
  currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  const letters = condenseStatement(currentPhrase);
  sigilStrokes = buildSigil(letters);
  cx = canvas.width / 2;
  cy = canvas.height / 2;
  size = Math.min(canvas.width, canvas.height) * 0.5;
  particles.particles = [];
  particles.setStrokes(sigilStrokes, cx, cy, size);
  particles.active = true;
  particles.burst();
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
  const dt = (t - lastTime) / 1000;
  lastTime = t;
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  timer += dt;
  if (timer > switchInterval) {
    timer = 0;
    nextSigil();
  }
  drawSigil();
  particles.update(dt);
  particles.draw(ctx);
  // draw phrase
  ctx.fillStyle = '#888';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(currentPhrase, canvas.width / 2, canvas.height - 20);
  requestAnimationFrame(render);
}

// initialise
nextSigil();
requestAnimationFrame(render);

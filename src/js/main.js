import { condenseStatement } from './condense.js';
import { glyphs } from './glyph-map.js';
import { ParticleSystem } from './charging.js';

const canvas = document.getElementById('gl');
const ctx = canvas.getContext('2d');
const input = document.getElementById('statement');
const generateBtn = document.getElementById('generate');
const chargeBtn = document.getElementById('charge');

let sigilStrokes = [];
let cx = 0;
let cy = 0;
let size = 1;

const particles = new ParticleSystem();
let strobeActive = false;
let strobeTimer = 0;
let strobePhase = false;
let lastTime = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = canvas.width / 2;
  cy = canvas.height / 2;
  size = Math.min(canvas.width, canvas.height) * 0.5;
  // update particle system mapping whenever canvas size changes
  if (sigilStrokes && sigilStrokes.length > 0) {
    particles.setStrokes(sigilStrokes, cx, cy, size);
  }
}
window.addEventListener('resize', resize);
resize();

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
      const transform = (x, y) => {
        const dx = x - 0.5;
        const dy = y - 0.5;
        const rx = dx * cosA - dy * sinA;
        const ry = dx * sinA + dy * cosA;
        return [rx + 0.5, ry + 0.5];
      };
      const [nx1, ny1] = transform(s.x1, s.y1);
      const [nx2, ny2] = transform(s.x2, s.y2);
      strokes.push({ x1: nx1, y1: ny1, x2: nx2, y2: ny2 });
    });
  });
  return strokes;
}

function drawSigil() {
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  if (!sigilStrokes) return;
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

function render(time) {
  const t = time || 0;
  const dt = (t - lastTime) / 1000;
  lastTime = t;
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // draw sigil
  drawSigil();
  // update and draw particles
  particles.update(dt);
  particles.draw(ctx);
  // strobe effect
  if (strobeActive) {
    strobeTimer += dt;
    if (strobeTimer > 0.1) {
      strobePhase = !strobePhase;
      strobeTimer = 0;
    }
    if (strobePhase) {
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

function onGenerate() {
  const statement = input.value;
  const letters = condenseStatement(statement);
  sigilStrokes = buildSigil(letters);
  // reset particles and strobe
  particles.particles = [];
  particles.active = false;
  strobePhase = false;
  strobeTimer = 0;
  // update particle system mapping
  particles.setStrokes(sigilStrokes, cx, cy, size);
}

function onCharge() {
  // if activating for the first time, spawn a burst
  if (!particles.active && sigilStrokes && sigilStrokes.length > 0) {
    particles.burst();
  }
  particles.toggleActive();
}

generateBtn.addEventListener('click', onGenerate);
chargeBtn.addEventListener('click', onCharge);

window.addEventListener('keydown', e => {
  if (e.key === 's' || e.key === 'S') {
    strobeActive = !strobeActive;
  } else if (e.key === 'r' || e.key === 'R') {
    // reset everything
    sigilStrokes = [];
    particles.particles = [];
    particles.active = false;
    strobeActive = false;
  }
});

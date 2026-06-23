// Example: particle burst demo. Press Space to trigger a burst.
import { ParticleSystem } from '../src/js/charging.js';

const canvas = document.getElementById('gl');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const particles = new ParticleSystem();
let cx = canvas.width / 2;
let cy = canvas.height / 2;
let size = Math.min(canvas.width, canvas.height) * 0.5;

particles.setStrokes([{ x1: 0.5, y1: 0.5, x2: 0.5, y2: 0.5 }], cx, cy, size);

function render(t) {
  const dt = 0.016;
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.update(dt);
  particles.draw(ctx);
  ctx.fillStyle = '#888';
  ctx.font = '18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Press Space to burst', canvas.width / 2, canvas.height - 30);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

window.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    particles.burst();
  }
});

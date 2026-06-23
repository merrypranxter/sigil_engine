// Simple particle system for charging and burst effects.
export class ParticleSystem {
  constructor() {
    this.particles = [];
    this.strokes = [];
    this.cx = 0;
    this.cy = 0;
    this.size = 1;
    this.active = false;
  }
  setStrokes(strokes, cx, cy, size) {
    this.strokes = strokes;
    this.cx = cx;
    this.cy = cy;
    this.size = size;
  }
  toggleActive() {
    this.active = !this.active;
  }
  update(dt) {
    if (this.active && this.strokes && this.strokes.length > 0) {
      for (let i = 0; i < 5; i++) {
        this._spawn();
      }
    }
    const survivors = [];
    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy -= 50 * dt;
      p.life -= dt;
      if (p.life > 0) {
        p.alpha = p.life / p.initialLife;
        survivors.push(p);
      }
    }
    this.particles = survivors;
  }
  _spawn() {
    const s = this.strokes[Math.floor(Math.random() * this.strokes.length)];
    if (!s) return;
    const t = Math.random();
    const x1 = this.cx + (s.x1 - 0.5) * this.size;
    const y1 = this.cy + (0.5 - s.y1) * this.size;
    const x2 = this.cx + (s.x2 - 0.5) * this.size;
    const y2 = this.cy + (0.5 - s.y2) * this.size;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    const vx = (Math.random() - 0.5) * 100;
    const vy = -Math.random() * 100 - 50;
    const life = 0.8 + Math.random() * 0.6;
    const hue = 20 + Math.random() * 40;
    this.particles.push({ x, y, vx, vy, life, initialLife: life, hue, alpha: 1.0 });
  }
  burst() {
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 150 + Math.random() * 50;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const life = 1.5 + Math.random();
      const hue = 10 + Math.random() * 40;
      this.particles.push({ x: this.cx, y: this.cy, vx, vy, life, initialLife: life, hue, alpha: 1.0 });
    }
  }
  draw(ctx) {
    for (const p of this.particles) {
      ctx.fillStyle = `hsla(${p.hue}, 80%, 50%, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

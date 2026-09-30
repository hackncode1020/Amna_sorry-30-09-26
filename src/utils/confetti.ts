/**
 * Ultra-lightweight Confetti & Particle Engine
 * Zero dependencies, hardware accelerated, works at 60fps on mobile.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  shape: 'rect' | 'heart' | 'star' | 'circle';
  opacity: number;
  decay: number;
}

class ConfettiEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationId: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initCanvas();
    }
  }

  private initCanvas() {
    let existing = document.getElementById('sister-confetti-canvas') as HTMLCanvasElement;
    if (!existing) {
      existing = document.createElement('canvas');
      existing.id = 'sister-confetti-canvas';
      existing.style.position = 'fixed';
      existing.style.top = '0';
      existing.style.left = '0';
      existing.style.width = '100vw';
      existing.style.height = '100vh';
      existing.style.pointerEvents = 'none';
      existing.style.zIndex = '9999';
      document.body.appendChild(existing);
    }
    this.canvas = existing;
    this.ctx = existing.getContext('2d');
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  private handleResize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  public fire(type: 'festive' | 'hearts' | 'gold' = 'festive', count = 70) {
    if (!this.canvas || !this.ctx) {
      this.initCanvas();
    }
    if (!this.canvas || !this.ctx) return;

    const colors =
      type === 'gold'
        ? ['#FBBF24', '#F59E0B', '#D97706', '#FEF08A', '#FDE68A', '#EAB308']
        : type === 'hearts'
        ? ['#F43F5E', '#FB7185', '#FDA4AF', '#EC4899', '#F472B6', '#BE123C']
        : [
            '#F43F5E', // Rose
            '#EC4899', // Pink
            '#8B5CF6', // Purple
            '#F59E0B', // Gold
            '#10B981', // Emerald
            '#38BDF8', // Sky
            '#FB7185', // Blush
          ];

    const shapes: ('rect' | 'heart' | 'star' | 'circle')[] =
      type === 'hearts'
        ? ['heart', 'circle']
        : type === 'gold'
        ? ['star', 'circle', 'rect']
        : ['rect', 'heart', 'star', 'circle'];

    const originX = window.innerWidth / 2;
    const originY = window.innerHeight * 0.45;

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const velocity = Math.random() * 12 + 6;
      this.particles.push({
        x: originX + (Math.random() - 0.5) * 60,
        y: originY + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: 1,
        decay: Math.random() * 0.012 + 0.008,
      });
    }

    if (!this.animationId) {
      this.render();
    }
  }

  public burstAt(x: number, y: number, count = 12) {
    if (!this.canvas || !this.ctx) this.initCanvas();
    if (!this.ctx) return;

    const colors = ['#F43F5E', '#EC4899', '#FB7185', '#FDA4AF', '#FBBF24'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.4 ? 'heart' : 'star',
        opacity: 1,
        decay: Math.random() * 0.025 + 0.015,
      });
    }

    if (!this.animationId) {
      this.render();
    }
  }

  private drawHeart(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 2 + size * 0.2, 0, size);
    ctx.bezierCurveTo(0, (size + topCurveHeight) / 2 + size * 0.2, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.fill();
  }

  private drawStar(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        Math.cos(((18 + i * 72) * Math.PI) / 180) * size,
        -Math.sin(((18 + i * 72) * Math.PI) / 180) * size
      );
      ctx.lineTo(
        Math.cos(((54 + i * 72) * Math.PI) / 180) * (size / 2),
        -Math.sin(((54 + i * 72) * Math.PI) / 180) * (size / 2)
      );
    }
    ctx.closePath();
    ctx.fill();
  }

  private render = () => {
    if (!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'heart') {
        this.drawHeart(this.ctx, p.size);
      } else if (p.shape === 'star') {
        this.drawStar(this.ctx, p.size);
      } else if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(this.render);
    } else {
      this.animationId = null;
    }
  };
}

export const confetti = new ConfettiEngine();

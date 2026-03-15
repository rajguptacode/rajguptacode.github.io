// PARTICLES — Around Character Image — Raj Gupta Portfolio
(function() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const wrapper = canvas.parentElement;

  function resize() {
    canvas.width  = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const cx = () => canvas.width / 2;
  const cy = () => canvas.height / 2;

  const COLORS = ['#a78bfa', '#67e8f9', '#818cf8', '#f0abfc', '#fff'];

  // Particle class
  class Particle {
    constructor() { this.reset(true); }

    reset(initial) {
      // Random angle around center
      this.angle  = Math.random() * Math.PI * 2;
      // Radius range — forms a loose ring around character
      this.radius = 100 + Math.random() * 110;
      this.speed  = (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
      this.size   = Math.random() * 2.5 + 0.5;
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha  = 0;
      this.targetAlpha = Math.random() * 0.7 + 0.2;
      this.fadeSpeed   = Math.random() * 0.015 + 0.005;
      this.twinkle     = Math.random() * Math.PI * 2;
      this.twinkleSpeed= Math.random() * 0.04 + 0.01;

      if (initial) {
        this.alpha = this.targetAlpha * Math.random();
        this.angle = Math.random() * Math.PI * 2;
      }
    }

    update() {
      this.angle += this.speed;
      this.twinkle += this.twinkleSpeed;

      if (this.alpha < this.targetAlpha) {
        this.alpha = Math.min(this.alpha + this.fadeSpeed, this.targetAlpha);
      }
    }

    draw() {
      const x = cx() + Math.cos(this.angle) * this.radius;
      const y = cy() + Math.sin(this.angle) * this.radius * 0.75;
      const twinkleAlpha = this.alpha * (0.6 + 0.4 * Math.sin(this.twinkle));

      ctx.save();
      ctx.globalAlpha = twinkleAlpha;
      ctx.fillStyle   = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur  = 6;
      ctx.beginPath();
      ctx.arc(x, y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Sparkle bursts (occasional random sparks)
  class Sparkle {
    constructor() {
      const angle  = Math.random() * Math.PI * 2;
      const r      = 90 + Math.random() * 130;
      this.x       = cx() + Math.cos(angle) * r;
      this.y       = cy() + Math.sin(angle) * r * 0.75;
      this.life    = 1;
      this.decay   = Math.random() * 0.03 + 0.015;
      this.size    = Math.random() * 3 + 1;
      this.color   = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.vx      = (Math.random() - 0.5) * 0.8;
      this.vy      = (Math.random() - 0.5) * 0.8;
    }
    update() {
      this.life -= this.decay;
      this.x   += this.vx;
      this.y   += this.vy;
      this.size *= 0.97;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle   = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur  = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      // Cross sparkle lines
      ctx.strokeStyle = this.color;
      ctx.lineWidth   = 0.5;
      ctx.globalAlpha = this.life * 0.5;
      ctx.beginPath();
      ctx.moveTo(this.x - this.size * 2, this.y);
      ctx.lineTo(this.x + this.size * 2, this.y);
      ctx.moveTo(this.x, this.y - this.size * 2);
      ctx.lineTo(this.x, this.y + this.size * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  const particles = Array.from({ length: 55 }, () => new Particle());
  let sparkles = [];
  let frame = 0;

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    // Add sparkle occasionally
    if (frame % 18 === 0 && sparkles.length < 12) {
      sparkles.push(new Sparkle());
    }

    particles.forEach(p => { p.update(); p.draw(); });
    sparkles = sparkles.filter(s => s.life > 0);
    sparkles.forEach(s => { s.update(); s.draw(); });
  }

  animate();

  // Mouse parallax on character
  const charImg = document.getElementById('char-img');
  if (charImg) {
    document.addEventListener('mousemove', (e) => {
      const rx = window.innerWidth  / 2;
      const ry = window.innerHeight / 2;
      const dx = (e.clientX - rx) / rx;
      const dy = (e.clientY - ry) / ry;
      charImg.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
    });

    document.addEventListener('mouseleave', () => {
      charImg.style.transform = 'translate(0,0)';
    });
  }
})();

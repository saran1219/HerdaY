import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 180;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(canvas) {
  return {
    x: randomBetween(0, canvas.width),
    y: randomBetween(0, canvas.height),
    radius: randomBetween(0.5, 2.2),
    opacity: randomBetween(0.2, 1),
    speedX: randomBetween(-0.15, 0.15),
    speedY: randomBetween(-0.08, -0.3),
    twinkleSpeed: randomBetween(0.005, 0.025),
    twinkleDir: Math.random() > 0.5 ? 1 : -1,
    hue: Math.random() > 0.85 ? randomBetween(45, 60) : 0, // gold tint for some
  };
}

export default function StardustCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(canvas));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Twinkle
        p.opacity += p.twinkleSpeed * p.twinkleDir;
        if (p.opacity >= 1) { p.opacity = 1; p.twinkleDir = -1; }
        if (p.opacity <= 0.1) { p.opacity = 0.1; p.twinkleDir = 1; }

        // Drift
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;

        // Draw — gold stars get a warm hue, others stay white
        const color = p.hue > 0
          ? `hsla(${p.hue}, 80%, 75%, ${p.opacity})`
          : `rgba(255, 255, 255, ${p.opacity})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Glow for larger particles
        if (p.radius > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
          grd.addColorStop(0, `rgba(255,255,255,${p.opacity * 0.3})`);
          grd.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

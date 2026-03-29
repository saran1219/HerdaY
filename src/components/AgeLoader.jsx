import { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';

export default function AgeLoader({ onFinished }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timeoutId;
    const controls = animate(0, 20, {
      duration: 2.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCount(Math.min(20, Math.round(latest))),
      onComplete: () => {
        timeoutId = window.setTimeout(() => onFinished?.(), 380);
      },
    });
    return () => {
      controls.stop();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center px-6"
      style={{
        background:
          'radial-gradient(ellipse 120% 80% at 50% 40%, #1f1438 0%, #0a0818 45%, #04030a 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015, filter: 'blur(10px)' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-[10px] uppercase tracking-[0.55em] text-white/35 mb-8">
          Loading your story
        </p>
        <motion.span
          className="font-display text-[clamp(5rem,22vw,12rem)] leading-none tabular-nums text-transparent bg-clip-text"
          style={{
            backgroundImage:
              'linear-gradient(165deg, #fff 0%, #fde68a 35%, #c084fc 65%, #fb7185 100%)',
          }}
          key={count}
          initial={{ opacity: 0.65, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          {count}
        </motion.span>
        <p className="mt-6 font-body text-sm font-light tracking-[0.2em] text-white/40">
          years of growth
        </p>
        <div className="mt-12 h-px w-[min(280px,70vw)] bg-white/10 overflow-hidden rounded-full">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold-300/80 via-purple-400/90 to-rose-400/80"
            style={{ transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 20 }}
            transition={{ duration: 0.12 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING = { stiffness: 320, damping: 32, mass: 0.4 };

export default function FloatingCursor() {
  const [visible, setVisible] = useState(false);
  const [finePointer, setFinePointer] = useState(true);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const syncPointerMode = () => {
      const fine = mq.matches;
      setFinePointer(fine);
      if (fine) document.documentElement.classList.add('growth-cursor');
      else document.documentElement.classList.remove('growth-cursor');
    };
    syncPointerMode();
    mq.addEventListener('change', syncPointerMode);

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move);
    document.body.addEventListener('pointerleave', leave);

    return () => {
      mq.removeEventListener('change', syncPointerMode);
      document.documentElement.classList.remove('growth-cursor');
      window.removeEventListener('pointermove', move);
      document.body.removeEventListener('pointerleave', leave);
    };
  }, [mx, my]);

  if (!finePointer) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[250]"
      style={{ x: sx, y: sy }}
      aria-hidden
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.22s ease',
          mixBlendMode: 'screen',
        }}
      >
        <div
          className="relative h-[52px] w-[52px] rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-[2px]"
          style={{
            boxShadow:
              '0 0 48px rgba(192, 132, 252, 0.12), inset 0 0 24px rgba(253, 230, 138, 0.05)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #fde68a, #c084fc)',
            boxShadow: '0 0 14px rgba(251, 113, 133, 0.45)',
          }}
        />
      </div>
    </motion.div>
  );
}

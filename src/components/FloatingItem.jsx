import { useRef } from 'react';
import { motion } from 'framer-motion';

// Generates a sine-wave idle float animation with unique phase per card
function floatAnimation(seed) {
  const duration = 4 + seed * 2;
  const yAmp = 12 + seed * 6;
  const xAmp = 4 + seed * 3;
  return {
    y: [0, -yAmp, 0, yAmp * 0.5, 0],
    x: [0, xAmp, 0, -xAmp * 0.7, 0],
    rotate: [0, -1.5 + seed, 0, 1 + seed * 0.5, 0],
    transition: {
      repeat: Infinity,
      duration,
      ease: 'easeInOut',
    },
  };
}

export default function FloatingItem({ item, initialX, initialY, constraintsRef, onOpen, index }) {
  const seed = ((index * 7) % 10) / 10; // deterministic 0.0–0.9

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={true}
      whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ scale: 1.08, zIndex: 20 }}
      animate={floatAnimation(seed)}
      initial={{ opacity: 0, scale: 0.6, x: initialX, y: initialY }}
      style={{
        position: 'absolute',
        left: initialX,
        top: initialY,
        zIndex: 10,
        cursor: 'grab',
        touchAction: 'none',
      }}
      transition={{ opacity: { duration: 0.6, delay: index * 0.12 }, scale: { duration: 0.5, delay: index * 0.12 } }}
      onClick={() => onOpen(item)}
    >
      <div
        className="glass-card rounded-2xl overflow-hidden"
        style={{
          width: 'clamp(140px, 20vw, 200px)',
          boxShadow: `0 0 24px ${item.color}40, 0 4px 20px rgba(0,0,0,0.5)`,
          border: `1px solid ${item.color}30`,
          transition: 'box-shadow 0.3s',
        }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img
            src={item.thumbnail}
            alt={item.alt}
            className="w-full h-full object-cover"
            style={{ display: 'block', pointerEvents: 'none', userSelect: 'none' }}
            draggable={false}
          />
          {/* Color overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
            style={{ background: item.color }}
          />
          {/* Subtle inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${item.color}25 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Caption strip */}
        <div
          className="px-3 py-2 text-center"
          style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(4,3,10,0.8) 100%)`,
          }}
        >
          <p
            className="text-xs font-medium truncate"
            style={{ color: item.color, fontFamily: "'Dancing Script', cursive", fontSize: '0.85rem' }}
          >
            {item.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

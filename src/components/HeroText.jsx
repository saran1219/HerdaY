import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const nameItem = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroText({ name }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center select-none px-5"
    >
      <motion.div
        className="flex max-w-4xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="font-body mb-5 text-[10px] font-light uppercase tracking-[0.55em] text-white/40"
        >
          A growth story · 20
        </motion.p>
        
        <motion.h1
          variants={item}
          className="hero-text mt-5 text-center leading-[1.05] text-white"
          style={{
            fontSize: 'clamp(2.75rem, 9vw, 7rem)',
          }}
        >
          Happy Birthday
        </motion.h1>

        {name && (
          <motion.h2
            variants={nameItem}
            className="hero-text mt-3 text-center text-white"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            {name} 
          </motion.h2>
        )}

        <motion.p
          variants={item}
          className="font-body mt-8 max-w-md text-sm font-light tracking-wide text-white/50 md:text-base"
        >
          "You're the most adorable human I've ever met!"
        </motion.p>
        
        <motion.p
          variants={item}
          className="font-display mt-4 text-xs font-light tracking-[0.12em] text-white/20"
        >
          Click · hover · click the memories above
        </motion.p>
      </motion.div>
    </div>
  );
}
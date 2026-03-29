import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ✏️ Personalize these birthday wishes!
const REASONS = [
  "🌟 You're such a kind and wonderful person, and I feel lucky to share such a good bond with you. ❤️",
  "💗 May your day be filled with love, laughter, and endless joy. 🌸",
  "💕 Wishing you success, happiness, and everything your heart desires,and i feel so lucky to have you in my life ✨",
  "☀️Stay the amazing girl you are—always spreading positivity around.Have the happiest year ahead! 🥳  (ellame unmai illa🙂‍↕️😂)"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 }
  }
};

export default function ReasonsPage({ onStorylane }) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < REASONS.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      onStorylane(); // Final click moves us to the Timeline
    }
  };

  return (
    // Note: The background is now shared from App.jsx, this container is transparent.
    <div className="min-h-screen flex flex-col items-center pt-24 pb-20 px-4 font-body relative z-[10]">
      
      {/* Updated Header Color */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white font-signature text-6xl mb-16 text-center text-glow"
      >
        Reasons We Value Sindhuu ❤️
      </motion.h1>

      {/* The Glassmorphism Card Stack */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 w-full max-w-2xl mb-16"
      >
        <AnimatePresence initial={false}>
          {REASONS.slice(0, index + 1).map((text, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              // Modeled after your Landing Page cards but slightly bigger/more prominent
              className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-glow text-white/80 text-center text-lg md:text-xl font-light leading-loose backdrop-blur-md"
            >
              {text}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* The Button (Matching Landing style) */}
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-12 py-3.5 bg-pink-500 text-white rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] font-bold text-xs uppercase tracking-[0.3em] active:scale-95 transition-all"
        >
          {index === REASONS.length - 1 ? "Enter Our Storylane 💫" : "Next Reason... 💕"}
        </motion.button>
        
        {/* Updated Counter Color */}
        <p className="mt-5 text-white/30 text-sm tracking-widest font-mono">
          Reason {index + 1} of {REASONS.length}
        </p>
      </div>
    </div>
  );
}
import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StardustCanvas from './components/StardustCanvas';
import HeroText from './components/HeroText';
import PhysicsField from './components/PhysicsField';
import Modal from './components/Modal';
import AgeLoader from './components/AgeLoader';
import FloatingCursor from './components/FloatingCursor';
import PinScreen from './components/PinScreen';
import ReasonsPage from './components/ReasonsPage';
import Storylane from './components/Storylane';

const BIRTHDAY_NAME = 'SINDOOO❤️';

// 🌌 The Unified Dark Radial Gradient
const UNIFIED_BACKGROUND = 'radial-gradient(ellipse 100% 80% at 50% -10%, #1a0e35 0%, #0b0920 42%, #04030a 100%)';

export default function App() {
  const [step, setStep] = useState('loader'); // loader | landing | passcode | reasons | story
  const [activeItem, setActiveItem] = useState(null);
  const [physicsReady, setPhysicsReady] = useState(false);
  const heroRef = useRef(null);

  // Transition Logic
  const handleLoaderFinished = useCallback(() => setStep('landing'), []);
  const handleShowPin = () => setStep('passcode');
  const handlePinSuccess = () => setStep('reasons');
  const handleEnterStory = () => setStep('story');

  useLayoutEffect(() => {
    if (step === 'landing' && heroRef.current) setPhysicsReady(true);
    else setPhysicsReady(false); // Reset if leaving landing
  }, [step]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#04030a]">
      
      {/* 1. LOADER PHASE */}
      <AnimatePresence mode="wait">
        {step === 'loader' && (
          <AgeLoader key="loader" onFinished={handleLoaderFinished} />
        )}
      </AnimatePresence>

      {/* 2. MAIN EXPERIENCE CONTAINER (Shared Background, Stardust, and Cursor) */}
      {(step === 'landing' || step === 'passcode' || step === 'reasons') && (
        <div 
          className="relative min-h-screen w-full transition-opacity duration-1000" 
          style={{ background: UNIFIED_BACKGROUND }}
        >
          {/* Persistent Elements */}
          <FloatingCursor />
          <StardustCanvas />

          {/* Conditional Content */}
          <AnimatePresence mode="wait">
            
            {/* LANDING PHASE */}
            {step === 'landing' && (
              <motion.section 
                key="landing"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                ref={heroRef} 
                className="relative h-screen w-full overflow-hidden"
              >
                <HeroText name={BIRTHDAY_NAME} />
                {physicsReady && <PhysicsField constraintsRef={heroRef} onOpen={setActiveItem} />}
                <motion.button 
                  onClick={handleShowPin}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[100] px-10 py-3 bg-white/5 border border-white/10 text-white rounded-full backdrop-blur-sm tracking-[0.2em] uppercase text-[10px]"
                >
                  Enter Her World 💕
                </motion.button>
              </motion.section>
            )}

            {/* PIN SCREEN PHASE */}
            {step === 'passcode' && (
              <motion.div key="pin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <PinScreen onSuccess={handlePinSuccess} />
              </motion.div>
            )}

            {/* REASONS PHASE (Updated Theme) */}
            {step === 'reasons' && (
              <motion.div key="reasons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ReasonsPage onStorylane={handleEnterStory} />
              </motion.div>
            )}

          </AnimatePresence>

          <Modal item={activeItem} onClose={() => setActiveItem(null)} />
        </div>
      )}

      {/* 5. FINAL STORYLANE (Keep separate background if needed) */}
      {step === 'story' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Storylane />
        </motion.div>
      )}
      
    </div>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PinScreen({ onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const CORRECT_PIN = '3003';

  const handlePress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === CORRECT_PIN) {
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => {
          setPin('');
          setError(false);
        }, 1000);
      }
    }
  }, [pin, onSuccess]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#04030a]/90 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h2 className="font-signature text-4xl text-white mb-8 tracking-widest">Enter Secret Pin</h2>
        

        
        {/* PIN Dots */}
        <div className="flex gap-4 justify-center mb-12">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              className={`w-4 h-4 rounded-full border-2 border-pink-500/50 ${
                pin.length > i ? 'bg-pink-500 shadow-[0_0_10px_#ec4899]' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Num Pad */}
        <div className="grid grid-cols-3 gap-4 max-w-[280px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '←'].map((val, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (val === 'C') setPin('');
                else if (val === '←') handleDelete();
                else handlePress(val);
              }}
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white text-xl font-light backdrop-blur-md"
            >
              {val}
            </motion.button>
          ))}
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mt-6 text-rose-500 font-mono text-xs uppercase tracking-widest"
          >
            Incorrect Pin. Try Again.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
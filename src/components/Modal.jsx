import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

export default function Modal({ item, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="modal-backdrop fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 400 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative glass-card rounded-2xl overflow-hidden max-w-2xl w-full"
            initial={{ scale: 0.75, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.75, opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow border */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: `0 0 60px ${item.color}55, 0 0 120px ${item.color}22`,
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <IoClose size={20} />
            </button>

            {/* Media */}
            <div className="w-full" style={{ maxHeight: '70vh', overflow: 'hidden' }}>
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  className="w-full object-cover"
                  controls
                  autoPlay
                  style={{ maxHeight: '65vh' }}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover"
                  style={{ maxHeight: '65vh', objectPosition: 'center' }}
                />
              )}
            </div>

            {/* Caption */}
            <div className="px-6 py-4">
              <p
                className="text-center text-lg font-medium"
                style={{
                  color: item.color,
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.5rem',
                }}
              >
                {item.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

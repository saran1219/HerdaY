import { motion } from 'framer-motion';

const TIMELINE_DATA = [
  { 
    age: 'Childhood', 
    title: 'The Early Days 🍼', 
    text: "Beginning of a beautiful story. Pure innocence and endless wonder.",
    images: ['/photo1.png', '/photo2.png', '/photo3.png', '/photo4.png', '/photo5.png'], 
    videoSrc: '/video1.mp4' 
  },
  { 
    age: 'School Days', 
    title: 'Growing Up 🎒', 
    text: "Lessons learned, friendships forged, and the magic of finding who you are.",
    images: ['/photo6.png', '/photo7.png', '/photo8.png', '/photo9.png', '/photo10.png'], 
    videoSrc: '/video2.mp4' 
  },
  { 
    age: 'Sweet 16', 
    title: 'The Golden Years ✨', 
    text: "A chapter defined by dreams, laughter, and the spark of coming of age.",
    images: ['/photo11.png', '/photo12.png', '/photo13.png', '/photo14.png', '/photo15.png'], 
    videoSrc: '/video3.mp4' 
  },
  { 
    age: 'Milestone', 
    title: 'Level 20 Unlocked 👑', 
    text: "Twenty years of grace. The masterpiece is still being painted.",
    images: ['/photo16.png', '/photo17.png', '/photo18.png', '/photo19.png', '/photo20.png'], 
    videoSrc: '/video4.mp4' 
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 }
  }
};

export default function Storylane() {
  return (
    <div className="min-h-screen bg-[#04030a] py-32 px-4 font-body overflow-x-hidden">
      
      {/* 🌌 Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.05)_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-40"
        >
          <h2 className="font-signature text-7xl md:text-9xl text-white mb-6">Her Timeline</h2>
          <p className="text-pink-500 font-mono tracking-[0.5em] uppercase text-xs">A Journey Through 20 Years</p>
        </motion.header>

        <div className="space-y-80">
          {TIMELINE_DATA.map((era, i) => (
            <motion.section 
              key={i}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="relative flex flex-col gap-16"
            >
              <div className="text-center md:text-left">
                 <motion.span variants={itemVariants} className="text-pink-500 font-mono text-sm tracking-widest uppercase block mb-2">
                   {era.age}
                 </motion.span>
                 <motion.h3 variants={itemVariants} className="font-signature text-6xl text-white mb-6">
                   {era.title}
                 </motion.h3>
              </div>

              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start`}>
                
                {/* 🖼️ PHOTO GRID (Uses object-contain to prevent cutting) */}
                <div className={`lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  {era.images.map((img, imgIdx) => (
                    <motion.div 
                      key={imgIdx}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, rotate: imgIdx % 2 === 0 ? 1 : -1, zIndex: 10 }}
                      className={`relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 flex items-center justify-center 
                        ${imgIdx === 0 ? 'col-span-2 row-span-2 h-auto min-h-[450px]' : 'h-[215px]'}`}
                    >
                      <img 
                        src={img} 
                        className="max-w-full max-h-full object-contain" // Fixed: object-contain prevents cutting
                        alt="Memory" 
                        loading="lazy" 
                      />
                    </motion.div>
                  ))}
                </div>

                {/* 📹 VIDEO & DESCRIPTION */}
                <div className="lg:col-span-5 space-y-8">
                  <motion.p variants={itemVariants} className="text-white/40 text-lg leading-loose italic font-light pl-6 border-l border-pink-500/30">
                    "{era.text}"
                  </motion.p>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="aspect-video bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
                  >
                    {era.videoSrc ? (
                      <video 
                        src={era.videoSrc} 
                        controls 
                        className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        poster={era.images[0]} 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                         <span className="text-5xl mb-4">🎥</span>
                         <p className="uppercase tracking-widest text-[10px]">Processing Video...</p>
                      </div>
                    )}
                  </motion.div>
                </div>

              </div>
            </motion.section>
          ))}
        </div>

        <motion.footer 
          className="mt-80 pb-40 text-center border-t border-white/5 pt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-pink-500 text-6xl mb-8"
          >
            ❤️
          </motion.div>
          <h2 className="font-signature text-7xl text-white mb-10 tracking-wider">To Many More Chapters</h2>
          <p className="text-white/20 max-w-lg mx-auto italic text-lg mb-16 uppercase tracking-[0.2em]">
            Every picture tells a story, but you are the poetry.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-pink-500/50 transition-all font-mono text-[10px] tracking-[0.3em] uppercase"
          >
            Replay the Journey
          </button>
        </motion.footer>
      </div>
    </div>
  );
}
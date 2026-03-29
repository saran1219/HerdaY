import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getGrowthTimelineItems } from '../data/mediaItems';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function GrowthTimeline({ onOpenCard }) {
  const steps = useMemo(() => getGrowthTimelineItems(), []);

  return (
    <section
      className="relative z-[5] border-t border-white/[0.07] bg-gradient-to-b from-transparent via-[#06041a]/80 to-[#04030a] py-20 md:py-28"
      aria-labelledby="growth-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          className="mb-12 md:mb-16 text-center md:text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-[10px] uppercase tracking-[0.5em] text-white/35">
            Step by step
          </p>
          <h2
            id="growth-heading"
            className="font-display mt-3 text-3xl text-white/95 md:text-4xl tracking-tight"
          >
            Twenty years, one growth story
          </h2>
          <p className="font-body mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-white/45 md:mx-0">
            Each photograph is a chapter — drag the floating memories above, or open a
            milestone here to linger in full size.
          </p>
        </motion.div>

        {/* Desktop: horizontal rail */}
        <div className="hidden md:block">
          <div className="relative pb-6">
            <div className="absolute left-8 right-8 top-[108px] h-px overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-gold-400/60 via-purple-400/70 to-rose-400/60"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
            <ul className="relative flex gap-6 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x snap-mandatory">
              {steps.map((item, i) => (
                <li key={item.id} className="snap-center shrink-0 w-[220px] first:pl-2 last:pr-2">
                  <motion.article
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={i}
                    viewport={{ once: true, margin: '-5%' }}
                    className="group cursor-pointer text-left"
                    onClick={() => onOpenCard?.(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onOpenCard?.(item);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div
                      className="relative mx-auto mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-lg font-display text-white/90 shadow-[0_0_40px_rgba(168,85,247,0.12)] transition-colors group-hover:border-white/25"
                      style={{ boxShadow: `0 0 48px ${item.color}22` }}
                    >
                      <span className="tabular-nums">{item.age}</span>
                      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gradient-to-br from-gold-300 to-purple-400 opacity-80" />
                    </div>
                    <div
                      className="glass-card overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-translate-y-1"
                      style={{
                        boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px ${item.color}22`,
                      }}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.alt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          draggable={false}
                        />
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background: `linear-gradient(180deg, transparent 40%, ${item.color}35 100%)`,
                          }}
                        />
                      </div>
                      <div className="border-t border-white/10 px-4 py-3">
                        <p
                          className="font-display text-base text-white/90"
                          style={{ color: item.color }}
                        >
                          {item.timelineLabel}
                        </p>
                        <p className="font-body mt-1 line-clamp-2 text-xs font-light text-white/45">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <ul className="flex flex-col gap-8 md:hidden">
          {steps.map((item, i) => (
            <li key={item.id}>
              <motion.article
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true, margin: '-10%' }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center pt-1">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-display text-sm text-white/90"
                    style={{ boxShadow: `0 0 24px ${item.color}28` }}
                  >
                    {item.age}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-2 w-px flex-1 min-h-[24px] bg-gradient-to-b from-white/20 to-transparent" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onOpenCard?.(item)}
                  className="glass-card min-w-0 flex-1 overflow-hidden rounded-2xl text-left transition-transform active:scale-[0.99]"
                  style={{
                    boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${item.color}18`,
                  }}
                >
                  <div className="flex gap-3 p-3">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={item.thumbnail}
                        alt={item.alt}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </div>
                    <div className="min-w-0 py-0.5">
                      <p className="font-display text-lg" style={{ color: item.color }}>
                        {item.timelineLabel}
                      </p>
                      <p className="font-body mt-1 text-xs text-white/50">{item.caption}</p>
                      <p className="font-body mt-3 text-[10px] uppercase tracking-widest text-white/30">
                        Tap to open
                      </p>
                    </div>
                  </div>
                </button>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

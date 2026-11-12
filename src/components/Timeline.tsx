import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { GitBranch, Clock } from 'lucide-react';
import type { TimelineEvent } from '../types';
import { resonance } from '../utils/audio';

interface TimelineProps {
  events: TimelineEvent[];
  onEventClick?: (event: TimelineEvent) => void;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function Timeline({ events, onEventClick }: TimelineProps) {
  if (events.length === 0) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative pl-2"
    >
      {/* Radiant Chrono-Strand Vertical Line */}
      <div className="absolute left-[13px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-oracle-amber/60 via-oracle-blue/50 to-oracle-amber/40 shadow-[0_0_8px_rgba(226,179,91,0.3)]" />

      <div className="flex flex-col gap-6">
        {events.map((event) => {
          const clickable = !!onEventClick;

          return (
            <motion.div
              key={event.id}
              variants={item}
              onClick={() => {
                if (clickable) {
                  resonance.playTick();
                  onEventClick(event);
                }
              }}
              className={`group relative pl-10 ${clickable ? 'cursor-pointer' : ''}`}
            >
              {/* Chronograph Node Beacon */}
              <div className="absolute left-1 top-3 w-[22px] h-[22px] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#07080B] border-2 border-oracle-amber group-hover:border-oracle-amber-bright group-hover:scale-125 transition-all duration-300 flex items-center justify-center shadow-[0_0_10px_rgba(226,179,91,0.5)]">
                  <div className="w-1 h-1 rounded-full bg-oracle-amber" />
                </div>
              </div>

              {/* Event Enclosure Card */}
              <div className="rounded-lg p-5 border border-oracle-border/80 bg-[#0E1015]/70 group-hover:border-oracle-amber/50 group-hover:bg-[#14171E] transition-all duration-300 shadow-md">
                {/* Year Header */}
                <div className="flex items-center justify-between gap-3 mb-2 border-b border-oracle-border/40 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-oracle-amber px-2 py-0.5 rounded bg-oracle-amber/15 border border-oracle-amber/30">
                      <Clock size={11} />
                      {event.year}
                    </span>
                    {event.branchId && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-oracle-blue px-1.5 py-0.5 rounded bg-oracle-blue/15 border border-oracle-blue/30">
                        <GitBranch size={10} />
                        BIFURCATION
                      </span>
                    )}
                  </div>
                  {clickable && (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase tracking-widest text-oracle-amber flex items-center gap-1">
                      Branch from this epoch &rarr;
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="font-serif text-xl text-oracle-text leading-snug mb-2 group-hover:text-white transition-colors">
                  {event.title}
                </h4>

                {/* High Readability Description */}
                <p className="text-[14px] text-oracle-text-dim leading-relaxed font-sans">
                  {event.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

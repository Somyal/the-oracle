import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GitBranch, ArrowRight } from 'lucide-react';
import type { RealitySection } from '../types';
import { resonance } from '../utils/audio';

interface SectionCardProps {
  section: RealitySection;
  onGoDeeper: (sectionId: string) => void;
  onBranch: (question: string) => void;
  index: number;
}

const sectionMeta: Record<
  RealitySection['type'],
  { label: string; color: 'amber' | 'blue' }
> = {
  divergence: { label: 'THE DIVERGENCE', color: 'amber' },
  newWorld: { label: 'THE NEW WORLD', color: 'blue' },
  consequences: { label: 'THE CONSEQUENCES', color: 'amber' },
  humanElement: { label: 'THE HUMAN ELEMENT', color: 'blue' },
  paradox: { label: 'THE PARADOX', color: 'amber' },
  future: { label: 'THE FUTURE', color: 'blue' },
};

export function SectionCard({ section, onGoDeeper, onBranch, index }: SectionCardProps) {
  const [branchOpen, setBranchOpen] = useState(false);
  const [branchValue, setBranchValue] = useState('');

  const meta = sectionMeta[section.type];
  const isAmber = meta.color === 'amber';
  const labelColor = isAmber ? 'text-oracle-amber' : 'text-oracle-blue';

  const handleBranchSubmit = () => {
    const trimmed = branchValue.trim();
    if (trimmed) {
      resonance.playChime();
      onBranch(trimmed);
      setBranchValue('');
      setBranchOpen(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className={`relative p-6 rounded-lg border ${
        isAmber ? 'border-oracle-amber/25 bg-gradient-to-b from-[#0E1015] to-[#07080B]' : 'border-oracle-blue/25 bg-gradient-to-b from-[#0E1015] to-[#07080B]'
      } shadow-lg overflow-hidden group`}
    >
      {/* Reticle corner marks */}
      <span className="absolute top-1.5 left-2 font-mono text-[9px] text-oracle-text-muted/40 select-none">⌜</span>
      <span className="absolute top-1.5 right-2 font-mono text-[9px] text-oracle-text-muted/40 select-none">⌝</span>

      {/* Section accession header */}
      <div className="flex items-center justify-between mb-3 border-b border-oracle-border/50 pb-2">
        <p className={`font-mono text-[10px] tracking-[0.25em] uppercase ${labelColor} flex items-center gap-2`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          AXIOM 0{index + 1} // {meta.label}
        </p>
        <span className="font-mono text-[9px] text-oracle-text-muted tracking-widest uppercase">
          SEC-{section.type.slice(0, 4).toUpperCase()}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-2xl text-oracle-text mb-3 leading-snug tracking-wide group-hover:text-white transition-colors">
        {section.title}
      </h3>

      {/* Content with high readability contrast */}
      <div className="text-oracle-text-dim text-[15px] leading-relaxed whitespace-pre-line font-sans font-normal">
        {section.content}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 mt-6 pt-3 border-t border-oracle-border/30">
        <button
          onClick={() => onGoDeeper(section.id)}
          className="group/btn flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-oracle-text-muted hover:text-oracle-amber transition-colors duration-300 cursor-pointer"
        >
          <ChevronDown size={13} className="group-hover/btn:translate-y-0.5 transition-transform duration-300 text-oracle-amber/70" />
          <span>[+] Expand Axiom</span>
        </button>

        <button
          onClick={() => {
            resonance.playTick();
            setBranchOpen((prev) => !prev);
          }}
          className="group/btn flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-oracle-text-muted hover:text-oracle-blue transition-colors duration-300 cursor-pointer"
        >
          <GitBranch size={13} className="group-hover/btn:rotate-12 transition-transform duration-300 text-oracle-blue/70" />
          <span>[⇄] Branch Timeline</span>
        </button>
      </div>

      {/* Branch inline input */}
      <AnimatePresence>
        {branchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex items-center gap-3">
              <input
                type="text"
                value={branchValue}
                onChange={(e) => setBranchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleBranchSubmit();
                  }
                }}
                placeholder="What if instead..."
                autoFocus
                className="flex-1 bg-oracle-surface/50 border border-oracle-border rounded-lg px-4 py-2.5 font-serif text-sm text-oracle-text placeholder:text-oracle-text-muted outline-none focus:border-oracle-blue/40 transition-colors"
              />
              <button
                onClick={handleBranchSubmit}
                disabled={!branchValue.trim()}
                className="p-2.5 rounded-lg border border-oracle-border hover:border-oracle-blue/40 text-oracle-text-muted hover:text-oracle-blue transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

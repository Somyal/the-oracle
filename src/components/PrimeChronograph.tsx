import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Sparkles, Scale, X } from 'lucide-react';
import type { Reality } from '../types';
import { resonance } from '../utils/audio';

interface PrimeChronographProps {
  reality: Reality;
  onClose?: () => void;
}

export function PrimeChronograph({ reality, onClose }: PrimeChronographProps) {
  const [viewMode, setViewMode] = useState<'split' | 'axioms'>('split');
  const comp = reality.primeComparison;

  if (!comp) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="relative my-10 overflow-hidden rounded-2xl border border-oracle-blue/40 bg-[#08090D] p-6 md:p-8"
    >
      {/* Decorative spectrum header */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-oracle-amber/50 via-oracle-blue/50 to-oracle-amber/50" />

      {/* Title & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.25em] text-oracle-blue">
            <Scale size={13} />
            <span>Dual Reality Spectrometer</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-oracle-text mt-1">
            Prime Earth vs. The Divergent Strand
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-oracle-border bg-oracle-surface p-1">
            <button
              onClick={() => {
                resonance.playTick();
                setViewMode('split');
              }}
              className={`px-3 py-1 rounded text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-oracle-blue/15 text-oracle-blue border border-oracle-blue/30'
                  : 'text-oracle-text-muted hover:text-oracle-text'
              }`}
            >
              Dual Lens
            </button>
            <button
              onClick={() => {
                resonance.playTick();
                setViewMode('axioms');
              }}
              className={`px-3 py-1 rounded text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'axioms'
                  ? 'bg-oracle-amber/15 text-oracle-amber border border-oracle-amber/30'
                  : 'text-oracle-text-muted hover:text-oracle-text'
              }`}
            >
              Axiom Deltas
            </button>
          </div>

          {onClose && (
            <button
              onClick={() => {
                resonance.playTick();
                onClose();
              }}
              className="p-1.5 rounded-lg border border-oracle-border text-oracle-text-muted hover:text-oracle-text transition-colors cursor-pointer"
              title="Close comparison lens"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Top Paradigm Overviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Prime Earth Box */}
        <div className="p-5 rounded-xl border border-oracle-border bg-oracle-surface/40">
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-oracle-text-muted mb-2">
            <Globe size={13} className="text-oracle-text-dim" />
            <span>Prime Reality (Earth-0)</span>
          </div>
          <p className="text-xs text-oracle-text-dim leading-relaxed">
            {comp.primeOverview}
          </p>
        </div>

        {/* Divergent Box */}
        <div className="p-5 rounded-xl border border-oracle-blue/30 bg-oracle-blue/5">
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-oracle-blue mb-2">
            <Sparkles size={13} />
            <span>Divergent Strand ({reality.title.slice(0, 24)}…)</span>
          </div>
          <p className="text-xs text-oracle-text leading-relaxed">
            {comp.divergentOverview}
          </p>
        </div>
      </div>

      {/* Comparative Epochs List */}
      <div className="space-y-4">
        {comp.points.map((pt, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-oracle-border-light bg-[#0F1115] hover:border-oracle-border transition-colors"
          >
            <div className="flex items-center justify-between border-b border-oracle-border/80 pb-2.5 mb-3">
              <span className="font-serif text-sm text-oracle-amber">
                {pt.epoch}
              </span>
              <span className="text-[10px] font-sans uppercase tracking-widest text-oracle-blue">
                Δ {pt.axiomShift}
              </span>
            </div>

            {viewMode === 'split' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-oracle-text-muted block mb-1">
                    Prime Earth Occurrence
                  </span>
                  <p className="text-xs text-oracle-text-dim leading-relaxed">
                    {pt.primeWorld}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-oracle-blue/80 block mb-1">
                    Divergent Occurrence
                  </span>
                  <p className="text-xs text-oracle-text leading-relaxed">
                    {pt.divergentWorld}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-1">
                <span className="text-xs font-sans text-oracle-amber tracking-wide block mb-1">
                  Fundamental Law Transmutation:
                </span>
                <p className="font-serif italic text-base text-oracle-text leading-snug">
                  {pt.axiomShift}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Existential Verdict Footer */}
      <div className="mt-8 p-5 rounded-xl border border-oracle-amber/20 bg-oracle-amber/5">
        <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-oracle-amber block mb-2">
          Philosophical Verdict
        </span>
        <p className="font-serif italic text-sm md:text-base text-oracle-text leading-relaxed">
          &ldquo;{comp.existentialVerdict}&rdquo;
        </p>
      </div>
    </motion.section>
  );
}

export default PrimeChronograph;

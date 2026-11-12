import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc } from 'lucide-react';
import type { GenerationPhase } from '../types';
import { resonance } from '../utils/audio';

interface LoadingSequenceProps {
  phase: GenerationPhase;
  question: string;
}

const phaseLabels: Record<string, { label: string; code: string; telemetry: string }> = {
  initializing: {
    label: 'Scanning the Multiverse Continuum...',
    code: 'SEC-INIT // 0.04μHz',
    telemetry: 'Aligning temporal coordinates with baseline prime reality',
  },
  divergence: {
    label: 'Pinpointing Axiomatic Departure Point...',
    code: 'AXIOM-01 // Δ-DIV',
    telemetry: 'Detecting historical rupture vector & cascade bifurcation',
  },
  newWorld: {
    label: 'Synthesizing Divergent Civilization Matrix...',
    code: 'AXIOM-02 // MATRIX-NEW',
    telemetry: 'Reconstructing altered sociopolitical and technological paradigms',
  },
  consequences: {
    label: 'Simulating Long-Term Systemic Cascades...',
    code: 'AXIOM-03 // SYS-CASCADE',
    telemetry: 'Resolving ecological, geopolitical, and planetary repercussions',
  },
  humanElement: {
    label: 'Observing Phenomenological Human Interior...',
    code: 'AXIOM-04 // PHENOM-HUM',
    telemetry: 'Transcribing lived reality, sensory textures, and cultural consciousness',
  },
  paradox: {
    label: 'Calculating Cosmological Paradox & Tension...',
    code: 'AXIOM-05 // PARADOX-V',
    telemetry: 'Measuring existential ironies and unintended moral equilibriums',
  },
  future: {
    label: 'Projecting Asymptotic Horizon Vectors...',
    code: 'AXIOM-06 // HORIZON-END',
    telemetry: 'Stabilizing timeline strand into archival permanent specimen',
  },
};

const phaseOrder: string[] = [
  'initializing',
  'divergence',
  'newWorld',
  'consequences',
  'humanElement',
  'paradox',
  'future',
];

export function LoadingSequence({ phase, question }: LoadingSequenceProps) {
  const currentIndex = phaseOrder.indexOf(phase);
  const progress = currentIndex >= 0 ? ((currentIndex + 1) / phaseOrder.length) * 100 : 0;
  const currentData = phaseLabels[phase] ?? {
    label: 'Synthesizing reality...',
    code: 'PROC-SYNC',
    telemetry: 'Calibrating harmonic instruments',
  };

  useEffect(() => {
    if (phase !== 'idle' && phase !== 'complete') {
      resonance.playTick();
    }
  }, [phase]);

  if (phase === 'idle' || phase === 'complete') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080B]/95 backdrop-blur-xl px-6 select-none"
    >
      {/* Background Reticle Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-[420px] h-[420px] rounded-full border border-oracle-amber/10 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[560px] h-[560px] rounded-full border border-oracle-blue/10"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-xl w-full text-center">
        {/* Top Telemetry Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-oracle-amber/30 bg-oracle-amber/10 mb-8 font-mono text-[10px] tracking-[0.25em] text-oracle-amber">
          <Disc size={13} className="animate-spin text-oracle-amber" />
          <span>PROCEDURAL REALITY ENGINE // LIVE SYNTHESIS</span>
        </div>

        {/* Question Specimen */}
        <div className="p-4 rounded-lg border border-oracle-border bg-oracle-surface/70 w-full mb-8">
          <span className="font-mono text-[9px] uppercase tracking-widest text-oracle-text-muted block mb-1">
            HYPOTHESIS VECTOR INGESTED
          </span>
          <p className="font-serif text-lg md:text-xl text-oracle-text italic leading-snug">
            &ldquo;{question}&rdquo;
          </p>
        </div>

        {/* Active Phase Label */}
        <div className="h-16 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-oracle-blue block">
                {currentData.code}
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-oracle-text tracking-wide">
                {currentData.label}
              </h3>
              <p className="font-serif italic text-xs text-oracle-text-dim">
                {currentData.telemetry}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vernier Mil-Scale Progress Gauge */}
        <div className="mt-8 w-full max-w-md">
          <div className="flex items-center justify-between text-[10px] font-mono text-oracle-text-muted uppercase tracking-widest mb-2">
            <span>COHERENCE CALIBRATION</span>
            <span className="text-oracle-amber font-semibold">{Math.round(progress)}%</span>
          </div>
          
          <div className="h-2 w-full bg-oracle-surface rounded-sm border border-oracle-border overflow-hidden relative p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-oracle-amber to-oracle-amber-bright rounded-xs shadow-[0_0_12px_rgba(226,179,91,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>

          {/* Phase Sequence Dots */}
          <div className="flex items-center justify-between mt-4 px-1">
            {phaseOrder.map((p, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;
              return (
                <div key={p} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isPast
                        ? 'bg-oracle-amber shadow-[0_0_8px_rgba(226,179,91,0.5)]'
                        : isCurrent
                        ? 'bg-oracle-blue animate-ping'
                        : 'bg-oracle-border-light'
                    }`}
                  />
                  <span className="font-mono text-[8px] text-oracle-text-muted">
                    {idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoadingSequence;

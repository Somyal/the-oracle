import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, RotateCcw, ChevronDown } from 'lucide-react';
import type { CosmologicalParameters } from '../types';
import { resonance } from '../utils/audio';

interface InstrumentDialsProps {
  parameters: CosmologicalParameters;
  onChange: (parameters: CosmologicalParameters) => void;
}

const defaultParameters: CosmologicalParameters = {
  temporalAnchor: 'contemporary',
  entropyLevel: 'moderate',
  civilizationVector: 'equilibrium',
};

export function InstrumentDials({ parameters, onChange }: InstrumentDialsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = <K extends keyof CosmologicalParameters>(
    key: K,
    value: CosmologicalParameters[K]
  ) => {
    resonance.playTick();
    onChange({
      ...parameters,
      [key]: value,
    });
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    resonance.playTick();
    onChange(defaultParameters);
  };

  const isCustomized =
    parameters.temporalAnchor !== defaultParameters.temporalAnchor ||
    parameters.entropyLevel !== defaultParameters.entropyLevel ||
    parameters.civilizationVector !== defaultParameters.civilizationVector;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      {/* Header Bar */}
      <div
        onClick={() => {
          resonance.playTick();
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-oracle-border bg-oracle-surface/60 hover:border-oracle-amber/40 transition-all cursor-pointer select-none relative group"
      >
        <div className="flex items-center gap-2.5">
          <Sliders size={13} className="text-oracle-amber" />
          <span className="font-sans text-xs uppercase tracking-widest text-oracle-text">
            Calibration Parameters
          </span>
          {isCustomized && (
            <span className="inline-flex items-center gap-1 font-sans text-[10px] uppercase tracking-wider text-oracle-amber px-1.5 py-0.5 rounded bg-oracle-amber/15 border border-oracle-amber/30">
              <span className="w-1.5 h-1.5 rounded-full bg-oracle-amber animate-pulse" />
              Customized
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isCustomized && (
            <button
              onClick={handleReset}
              className="font-sans text-[10px] uppercase tracking-wider text-oracle-text-muted hover:text-oracle-amber flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset calibration dials"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          )}

          <ChevronDown
            size={14}
            className={`text-oracle-text-muted transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-oracle-amber' : 'group-hover:text-oracle-text'
            }`}
          />
        </div>
      </div>

      {/* Expandable Dials Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-5 rounded-md border border-oracle-amber/25 bg-[#07080B]/95 backdrop-blur-xl space-y-6 relative">
              {/* Vernier top reference markings */}
              <div className="h-1.5 w-full vernier-scale opacity-40 mb-3" />

              {/* Dial 1: Temporal Anchor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-oracle-amber flex items-center gap-1.5">
                    <span className="text-oracle-amber/50">[I]</span> TEMPORAL ANCHOR
                  </span>
                  <span className="font-serif italic text-xs text-oracle-text-dim">
                    {parameters.temporalAnchor === 'ancient' && 'Antiquity & Mythic Dawn'}
                    {parameters.temporalAnchor === 'industrial' && 'Steam, Machines & Revolution'}
                    {parameters.temporalAnchor === 'contemporary' && 'Present Epochal Drift'}
                    {parameters.temporalAnchor === 'deepFuture' && 'Post-Biological Horizon'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'ancient', num: '01', label: 'Ancient' },
                      { id: 'industrial', num: '02', label: 'Industrial' },
                      { id: 'contemporary', num: '03', label: 'Contemporary' },
                      { id: 'deepFuture', num: '04', label: 'Deep Future' },
                    ] as const
                  ).map((opt) => {
                    const active = parameters.temporalAnchor === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleUpdate('temporalAnchor', opt.id)}
                        className={`px-3 py-2.5 rounded-sm font-mono text-[11px] tracking-wider transition-all text-left border cursor-pointer relative overflow-hidden ${
                          active
                            ? 'border-oracle-amber bg-oracle-amber/15 text-oracle-amber shadow-[0_0_15px_rgba(226,179,91,0.15)] font-semibold'
                            : 'border-oracle-border bg-oracle-surface/60 text-oracle-text-muted hover:border-oracle-border-light hover:text-oracle-text'
                        }`}
                      >
                        <span className="text-[9px] text-oracle-text-muted block">{opt.num} //</span>
                        {opt.label}
                        {active && (
                          <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-oracle-amber" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dial 2: Entropy Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-oracle-blue flex items-center gap-1.5">
                    <span className="text-oracle-blue/50">[II]</span> ENTROPY GRADIENT
                  </span>
                  <span className="font-serif italic text-xs text-oracle-text-dim">
                    {parameters.entropyLevel === 'subtle' && 'Plausible Historical Deviation'}
                    {parameters.entropyLevel === 'moderate' && 'Systemic Paradigm Shift'}
                    {parameters.entropyLevel === 'rupture' && 'Total Metaphysical Rupture'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'subtle', num: 'Δ1', label: 'Subtle Shift' },
                      { id: 'moderate', num: 'Δ2', label: 'Moderate' },
                      { id: 'rupture', num: 'Δ3', label: 'Total Rupture' },
                    ] as const
                  ).map((opt) => {
                    const active = parameters.entropyLevel === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleUpdate('entropyLevel', opt.id)}
                        className={`px-3 py-2.5 rounded-sm font-mono text-[11px] tracking-wider transition-all text-left border cursor-pointer relative overflow-hidden ${
                          active
                            ? 'border-oracle-blue bg-oracle-blue/15 text-oracle-blue shadow-[0_0_15px_rgba(84,180,216,0.15)] font-semibold'
                            : 'border-oracle-border bg-oracle-surface/60 text-oracle-text-muted hover:border-oracle-border-light hover:text-oracle-text'
                        }`}
                      >
                        <span className="text-[9px] text-oracle-text-muted block">{opt.num} //</span>
                        {opt.label}
                        {active && (
                          <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-oracle-blue" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dial 3: Civilization Vector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-oracle-text-dim flex items-center gap-1.5">
                    <span className="text-oracle-amber/50">[III]</span> CIVILIZATION VECTOR
                  </span>
                  <span className="font-serif italic text-xs text-oracle-text-dim">
                    {parameters.civilizationVector === 'technocratic' && 'Mechanistic & Computational'}
                    {parameters.civilizationVector === 'ecological' && 'Biosphere & Organic Symbiosis'}
                    {parameters.civilizationVector === 'consciousness' && 'Telepathy, Mind & Spirit'}
                    {parameters.civilizationVector === 'equilibrium' && 'Holistic Synthesis'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'technocratic', num: 'V-A', label: 'Technocratic' },
                      { id: 'ecological', num: 'V-B', label: 'Ecological' },
                      { id: 'consciousness', num: 'V-C', label: 'Consciousness' },
                      { id: 'equilibrium', num: 'V-D', label: 'Equilibrium' },
                    ] as const
                  ).map((opt) => {
                    const active = parameters.civilizationVector === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleUpdate('civilizationVector', opt.id)}
                        className={`px-3 py-2.5 rounded-sm font-mono text-[11px] tracking-wider transition-all text-left border cursor-pointer relative overflow-hidden ${
                          active
                            ? 'border-oracle-amber/70 bg-oracle-amber/15 text-oracle-text shadow-[0_0_15px_rgba(226,179,91,0.12)] font-semibold'
                            : 'border-oracle-border bg-oracle-surface/60 text-oracle-text-muted hover:border-oracle-border-light hover:text-oracle-text'
                        }`}
                      >
                        <span className="text-[9px] text-oracle-text-muted block">{opt.num} //</span>
                        {opt.label}
                        {active && (
                          <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-oracle-amber" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InstrumentDials;


import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Radio } from 'lucide-react';
import type { Reality } from '../types';
import { resonance } from '../utils/audio';

interface DecryptionReaderProps {
  reality: Reality;
  onClose: () => void;
}

export function DecryptionReader({ reality, onClose }: DecryptionReaderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDeciphering, setIsDeciphering] = useState(false);

  const sections = reality.sections;
  const currentSection = sections[currentIdx];

  const handleNext = useCallback(() => {
    if (currentIdx < sections.length - 1) {
      resonance.playTick();
      setIsDeciphering(true);
      setCurrentIdx((prev) => prev + 1);
      setTimeout(() => setIsDeciphering(false), 200);
    }
  }, [currentIdx, sections.length]);

  const handlePrev = useCallback(() => {
    if (currentIdx > 0) {
      resonance.playTick();
      setIsDeciphering(true);
      setCurrentIdx((prev) => prev - 1);
      setTimeout(() => setIsDeciphering(false), 200);
    }
  }, [currentIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resonance.playTick();
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  const sectionLabelMap: Record<string, string> = {
    divergence: 'AXIOM I // THE POINT OF DEPARTURE',
    newWorld: 'AXIOM II // THE UNFOLDING REALM',
    consequences: 'AXIOM III // SYSTEMIC CASCADES',
    humanElement: 'AXIOM IV // THE HUMAN INTERIOR',
    paradox: 'AXIOM V // THE COSMOLOGICAL PARADOX',
    future: 'AXIOM VI // THE HORIZON VECTOR',
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#08090D] px-6 py-8 md:px-16 md:py-12 select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 atmospheric-gradient opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-radial from-oracle-amber/5 via-transparent to-transparent" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-oracle-border/60 pb-5">
        <div className="flex items-center gap-3">
          <Radio size={14} className="text-oracle-amber animate-pulse" />
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-oracle-amber">
            Decryption Stream: Active
          </span>
          <span className="text-oracle-text-muted text-xs">•</span>
          <span className="text-xs font-serif text-oracle-text-dim truncate max-w-sm hidden sm:inline">
            {reality.title}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-sans uppercase tracking-widest text-oracle-text-muted hidden md:inline">
            [ SPACEBAR / ARROWS TO ADVANCE // ESC TO EXIT ]
          </span>

          <button
            onClick={() => {
              resonance.playTick();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-oracle-border bg-oracle-surface text-xs font-sans uppercase tracking-wider text-oracle-text hover:border-oracle-amber/40 transition-colors cursor-pointer"
          >
            <X size={14} />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Main Focus Reading Canvas */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="w-full text-center"
          >
            {/* Section Tag */}
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-oracle-amber block mb-4">
              {sectionLabelMap[currentSection.type] || currentSection.title.toUpperCase()}
            </span>

            {/* Section Title */}
            <h2 className="font-serif text-3xl md:text-5xl text-oracle-text mb-8 leading-tight">
              {currentSection.title}
            </h2>

            {/* Deciphered Prose */}
            <div className="relative text-left font-serif text-lg md:text-xl text-oracle-text-dim leading-relaxed tracking-wide space-y-4 max-h-[50vh] overflow-y-auto px-4">
              {isDeciphering ? (
                <div className="text-center font-mono text-xs tracking-widest text-oracle-amber animate-pulse py-12">
                  [ DECRYPTING CONSTELLATION AXIOM... ]
                </div>
              ) : (
                <p className="whitespace-pre-line">
                  {currentSection.content}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Telemetry & Navigation Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-oracle-border/60 pt-5">
        {/* Progress Bar & Phase Count */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-[10px] font-sans uppercase tracking-widest text-oracle-text-muted shrink-0">
            Phase {currentIdx + 1} of {sections.length}
          </span>
          <div className="flex-1 sm:w-48 h-1 bg-oracle-surface rounded-full overflow-hidden border border-oracle-border">
            <div
              className="h-full bg-oracle-amber transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-oracle-border bg-oracle-surface text-xs font-sans uppercase tracking-wider text-oracle-text-dim hover:text-oracle-text hover:border-oracle-border-light disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIdx === sections.length - 1}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-oracle-amber/40 bg-oracle-amber/10 text-xs font-sans uppercase tracking-wider text-oracle-amber hover:bg-oracle-amber/20 hover:border-oracle-amber disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg shadow-oracle-amber/5"
          >
            <span>Advance Axiom</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DecryptionReader;

import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  RotateCcw,
  ChevronRight,
  Scale,
  FileText,
  Radio,
} from 'lucide-react';
import { useRealityContext } from '../context/RealityContext';
import { LoadingSequence } from '../components/LoadingSequence';
import { SectionCard } from '../components/SectionCard';
import { Timeline } from '../components/Timeline';
import { DossierModal } from '../components/DossierModal';
import { PrimeChronograph } from '../components/PrimeChronograph';
import { DecryptionReader } from '../components/DecryptionReader';
import { resonance } from '../utils/audio';
import type { RealitySection } from '../types';

const sectionOrder: RealitySection['type'][] = [
  'divergence',
  'newWorld',
  'consequences',
  'humanElement',
  'paradox',
  'future',
];

export function Explorer() {
  const navigate = useNavigate();
  const {
    currentReality,
    realityStack,
    generationPhase,
    goDeeper,
    branchReality,
    returnToOriginal,
    returnToPrevious,
    clearReality,
    saveReality,
    isInArchive,
  } = useRealityContext();

  const [showDossier, setShowDossier] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showTransmission, setShowTransmission] = useState(false);

  // Redirect to home if no reality and idle
  useEffect(() => {
    if (!currentReality && generationPhase === 'idle') {
      navigate('/', { replace: true });
    }
  }, [currentReality, generationPhase, navigate]);

  // Keyboard shortcut: T for transmission mode
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeTag = document.activeElement?.tagName;
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          setShowTransmission((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const isSaved = useMemo(
    () => (currentReality ? isInArchive(currentReality.id) : false),
    [currentReality, isInArchive],
  );

  const orderedSections = useMemo(() => {
    if (!currentReality) return [];
    return sectionOrder
      .map((type) => currentReality.sections.find((s) => s.type === type))
      .filter(Boolean) as RealitySection[];
  }, [currentReality]);

  const handleSave = () => {
    if (currentReality && !isSaved) {
      resonance.playChime();
      saveReality(currentReality);
    }
  };

  const handleGenerateAnother = () => {
    resonance.playTick();
    clearReality();
    navigate('/');
  };

  const handleGoDeeper = (sectionId: string) => {
    goDeeper(sectionId);
  };

  const handleBranch = (branchQuestion: string) => {
    branchReality(branchQuestion);
  };

  // Loading state
  if (generationPhase !== 'idle' && generationPhase !== 'complete') {
    return (
      <div className="relative min-h-screen bg-oracle-bg">
        <LoadingSequence
          phase={generationPhase}
          question={currentReality?.question ?? ''}
        />
      </div>
    );
  }

  if (!currentReality) return null;

  return (
    <div className="relative min-h-screen bg-oracle-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-24"
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            to="/"
            onClick={() => resonance.playTick()}
            className="group inline-flex items-center gap-2 text-sm text-oracle-text-dim transition-colors hover:text-oracle-amber"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Observatory
          </Link>
        </motion.div>

        {/* Branch breadcrumbs */}
        {realityStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-4 flex flex-wrap items-center gap-1 text-xs text-oracle-text-muted"
          >
            {realityStack.map((r, i) => (
              <span key={r.id} className="flex items-center gap-1">
                <button
                  onClick={() => {
                    resonance.playTick();
                    for (let j = realityStack.length - 1; j >= i; j--) {
                      returnToPrevious();
                    }
                  }}
                  className="truncate transition-colors hover:text-oracle-amber cursor-pointer"
                  style={{ maxWidth: '120px' }}
                >
                  {r.title}
                </button>
                <ChevronRight className="h-3 w-3 flex-shrink-0" />
              </span>
            ))}
            <span className="truncate text-oracle-amber" style={{ maxWidth: '160px' }}>
              {currentReality.title}
            </span>
          </motion.div>
        )}

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <h1 className="font-serif text-3xl leading-tight text-oracle-text md:text-5xl text-glow-amber">
            {currentReality.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-oracle-text-dim font-sans font-normal">
            {currentReality.description}
          </p>

          {/* Original question */}
          <div className="mt-6 rounded-xl border border-oracle-border bg-oracle-surface/50 px-5 py-4">
            <span className="font-sans text-xs font-medium uppercase tracking-widest text-oracle-text-muted">
              Original Question
            </span>
            <p className="mt-1.5 font-serif text-lg italic text-oracle-text leading-snug">
              &ldquo;{currentReality.question}&rdquo;
            </p>
          </div>
        </motion.header>

        {/* Action buttons toolbar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-2.5"
        >
          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-sans text-xs uppercase tracking-wider transition-all cursor-pointer ${
              isSaved
                ? 'cursor-default border-oracle-amber/30 bg-oracle-amber/10 text-oracle-amber'
                : 'border-oracle-border bg-oracle-surface text-oracle-text-dim hover:border-oracle-amber/50 hover:text-oracle-amber hover:bg-oracle-amber/5'
            }`}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            {isSaved ? 'Saved to Archive' : 'Save to Archive'}
          </button>

          {/* Compare with Prime Earth (Feature 5) */}
          <button
            onClick={() => {
              resonance.playTick();
              setShowComparison((prev) => !prev);
            }}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-sans text-xs uppercase tracking-wider transition-all cursor-pointer ${
              showComparison
                ? 'border-oracle-blue bg-oracle-blue/15 text-oracle-blue'
                : 'border-oracle-border bg-oracle-surface text-oracle-text-dim hover:border-oracle-blue/50 hover:text-oracle-blue hover:bg-oracle-blue/5'
            }`}
          >
            <Scale className="h-4 w-4" />
            {showComparison ? 'Hide Prime Lens' : 'Compare with Prime Earth'}
          </button>

          {/* Transmission / Decryption Mode (Feature 6) */}
          <button
            onClick={() => {
              resonance.playEngage();
              setShowTransmission(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-oracle-border bg-oracle-surface px-4 py-2 font-sans text-xs uppercase tracking-wider text-oracle-text-dim transition-all hover:border-oracle-amber/50 hover:text-oracle-amber hover:bg-oracle-amber/5 cursor-pointer"
            title="Focus decryption reader (or press 'T')"
          >
            <Radio className="h-4 w-4 text-oracle-amber" />
            Transmission Mode [T]
          </button>

          {/* Export Dossier (Feature 4) */}
          <button
            onClick={() => {
              resonance.playTick();
              setShowDossier(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-oracle-border bg-oracle-surface px-4 py-2 font-sans text-xs uppercase tracking-wider text-oracle-text-dim transition-all hover:border-oracle-border-light hover:text-oracle-text cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            Export Dossier
          </button>

          {/* Generate Another Universe */}
          <button
            onClick={handleGenerateAnother}
            className="inline-flex items-center gap-2 rounded-lg border border-oracle-border bg-oracle-surface px-4 py-2 font-sans text-xs uppercase tracking-wider text-oracle-text-dim transition-all hover:border-oracle-blue/50 hover:text-oracle-blue cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Generate Another
          </button>

          {/* Return to original if branched */}
          {realityStack.length > 0 && (
            <button
              onClick={() => {
                resonance.playTick();
                returnToOriginal();
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-oracle-border bg-oracle-surface px-4 py-2 text-xs font-sans uppercase tracking-wider text-oracle-text-dim transition-all hover:border-oracle-text-dim/50 hover:text-oracle-text cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Return to Original
            </button>
          )}
        </motion.div>

        {/* Feature 5: Prime Comparison Chronograph */}
        <AnimatePresence>
          {showComparison && (
            <PrimeChronograph
              reality={currentReality}
              onClose={() => setShowComparison(false)}
            />
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-oracle-border-light to-transparent" />

        {/* Sections */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {orderedSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SectionCard
                  section={section}
                  onGoDeeper={handleGoDeeper}
                  onBranch={handleBranch}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Timeline */}
        {currentReality.timeline && currentReality.timeline.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="mb-8 font-serif text-2xl tracking-wide text-oracle-text">
              Timeline of Divergence
            </h2>
            <Timeline
              events={currentReality.timeline}
              onEventClick={(event) => {
                handleBranch(`What if during ${event.year}, ${event.title.toLowerCase()} had unfolded differently?`);
              }}
            />
          </motion.div>
        )}

        {/* Bottom fade-out decoration */}
        <div className="mt-20 flex flex-col items-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-oracle-amber/30 to-transparent" />
          <p className="mt-4 font-serif text-sm italic text-oracle-text-muted">
            End of this reality strand
          </p>
        </div>
      </motion.div>

      {/* Feature 4: Telemetric Dossier Modal */}
      <AnimatePresence>
        {showDossier && (
          <DossierModal
            reality={currentReality}
            onClose={() => setShowDossier(false)}
          />
        )}
      </AnimatePresence>

      {/* Feature 6: Decryption Reading Mode (Focus Flow) */}
      <AnimatePresence>
        {showTransmission && (
          <DecryptionReader
            reality={currentReality}
            onClose={() => setShowTransmission(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Explorer;

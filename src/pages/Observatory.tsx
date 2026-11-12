import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { useRealityContext } from '../context/RealityContext';
import { QuestionInput } from '../components/QuestionInput';
import { SuggestionChips } from '../components/SuggestionChips';
import { InstrumentDials } from '../components/InstrumentDials';
import { getRandomQuestion, getRandomSuggestions } from '../data/suggestions';
import { resonance } from '../utils/audio';
import type { CosmologicalParameters } from '../types';

const defaultParameters: CosmologicalParameters = {
  temporalAnchor: 'contemporary',
  entropyLevel: 'moderate',
  civilizationVector: 'equilibrium',
};

export function Observatory() {
  const navigate = useNavigate();
  const location = useLocation();
  const { generateNewReality } = useRealityContext();
  const [inputValue, setInputValue] = useState(
    (location.state as { question?: string } | null)?.question || ''
  );
  const [parameters, setParameters] = useState<CosmologicalParameters>(defaultParameters);
  const [displayedSuggestions, setDisplayedSuggestions] = useState<string[]>(() =>
    getRandomSuggestions(6)
  );

  useEffect(() => {
    const passedQ = (location.state as { question?: string } | null)?.question;
    if (passedQ) {
      setInputValue(passedQ);
    }
  }, [location.state]);

  const handleSubmit = useCallback(
    async (question: string) => {
      generateNewReality(question, parameters);
      navigate('/explore');
    },
    [generateNewReality, navigate, parameters],
  );

  const handleSuggestionSelect = useCallback((suggestion: string) => {
    resonance.playTick();
    setInputValue(suggestion);
  }, []);

  const handleRandomize = useCallback(() => {
    resonance.playTick();
    const nextQ = getRandomQuestion(inputValue);
    setInputValue(nextQ);
  }, [inputValue]);

  const handleShuffleSuggestions = useCallback(() => {
    resonance.playTick();
    setDisplayedSuggestions((prev) => getRandomSuggestions(6, prev));
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-oracle-bg px-4 py-20 select-none">
      {/* Atmospheric gradient background */}
      <div className="atmospheric-gradient pointer-events-none absolute inset-0" />

      {/* Subtle Analog Observatory Reticle Ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-oracle-amber/5 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, transparent 350px, rgba(226,179,91,0.03) 351px, transparent 353px)',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[980px] rounded-full border border-oracle-blue/5 opacity-30" />

      {/* Telemetry Corner Accents */}
      <div className="pointer-events-none absolute top-18 left-8 hidden lg:flex flex-col gap-0.5 font-mono text-[9px] text-oracle-text-muted/60 tracking-widest uppercase">
        <span>OBSERVATORY STRAND-0</span>
        <span>RA 19h 50m 47s // DEC +08° 52′ 06″</span>
      </div>

      <div className="pointer-events-none absolute top-18 right-8 hidden lg:flex flex-col items-end gap-0.5 font-mono text-[9px] text-oracle-text-muted/60 tracking-widest uppercase">
        <span>GRID COHERENCE: OPTIMAL</span>
        <span>CHRONO-DRIFT: 0.0004 μHz</span>
      </div>

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(226,179,91,0.06) 0%, rgba(84,180,216,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center select-text">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-glow-amber font-serif text-5xl uppercase tracking-[0.3em] text-oracle-text md:text-7xl text-center"
        >
          THE ORACLE
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="mt-6 font-serif text-lg italic text-oracle-text-dim text-center"
        >
          Reality is only one of the possibilities.
        </motion.p>

        {/* Question Input with Randomize Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 w-full"
        >
          <QuestionInput
            onSubmit={handleSubmit}
            initialValue={inputValue}
            onRandomize={handleRandomize}
            placeholder="What if the world had unfolded differently?"
          />

          {/* Instrument Calibration Dials */}
          <InstrumentDials
            parameters={parameters}
            onChange={setParameters}
          />
        </motion.div>

        {/* Suggestion Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
          className="mt-10 w-full"
        >
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-oracle-text-muted">
              Suggested Strands
            </span>
            <button
              type="button"
              onClick={handleShuffleSuggestions}
              className="group inline-flex items-center gap-1.5 text-[10px] font-sans font-medium uppercase tracking-widest text-oracle-text-muted hover:text-oracle-amber transition-colors cursor-pointer"
              title="Shuffle suggestions pool"
            >
              <Shuffle size={11} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Shuffle Pool</span>
            </button>
          </div>

          <SuggestionChips
            suggestions={displayedSuggestions}
            onSelect={handleSuggestionSelect}
            maxVisible={6}
          />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-oracle-bg to-transparent" />
    </div>
  );
}

export default Observatory;

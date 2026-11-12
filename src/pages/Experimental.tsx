import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Eye,
  ArrowRight,
  Flame,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { useRealityContext } from '../context/RealityContext';
import { impossibleQuestions, unknownObservations } from '../data/suggestions';
import { generateCollision } from '../engine/generator';
import { resonance } from '../utils/audio';
import type { CollisionResult } from '../types';

export function Experimental() {
  const navigate = useNavigate();
  const { entries } = useRealityContext();

  // Feature 1: The Impossible Question
  const [currentImpossible, setCurrentImpossible] = useState<string | null>(null);

  const handleGenerateImpossible = () => {
    resonance.playChime();
    const randomIndex = Math.floor(Math.random() * impossibleQuestions.length);
    setCurrentImpossible(impossibleQuestions[randomIndex]);
  };

  const handleUseQuestion = (q: string) => {
    resonance.playTick();
    navigate('/', { state: { question: q } });
  };

  // Feature 2: Reality Collision
  const [reality1Id, setReality1Id] = useState<string>('');
  const [reality2Id, setReality2Id] = useState<string>('');
  const [collisionResult, setCollisionResult] = useState<CollisionResult | null>(null);
  const [isColliding, setIsColliding] = useState(false);

  const handleCollide = () => {
    const r1 = entries.find((e) => e.reality.id === reality1Id)?.reality;
    const r2 = entries.find((e) => e.reality.id === reality2Id)?.reality;

    if (!r1 || !r2) return;

    resonance.playEngage();
    setIsColliding(true);
    setTimeout(() => {
      const result = generateCollision(r1, r2);
      setCollisionResult(result);
      setIsColliding(false);
      resonance.playChime();
    }, 600);
  };

  // Feature 3: The Unknown
  const [currentObservation, setCurrentObservation] = useState<string | null>(null);

  const handleRevealUnknown = () => {
    resonance.playTick();
    const randomIndex = Math.floor(Math.random() * unknownObservations.length);
    setCurrentObservation(unknownObservations[randomIndex]);
  };

  return (
    <div className="relative min-h-screen bg-oracle-bg px-4 py-24 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 atmospheric-gradient opacity-60" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-oracle-amber/20 bg-oracle-amber/5 px-3 py-1 text-xs uppercase tracking-widest text-oracle-amber">
            <Zap size={13} />
            Experimental Chamber
          </div>
          <h1 className="font-serif text-3xl md:text-5xl tracking-widest uppercase text-oracle-text text-glow-amber">
            THE UNCHARTED
          </h1>
          <p className="mt-3 text-sm text-oracle-text-dim max-w-lg mx-auto">
            Three experimental instruments probing the theoretical frontiers of time, logic, and reality convergence.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* ══════════════════════════════════════════════════════════════ */}
          {/* FEATURE 1: THE IMPOSSIBLE QUESTION */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative overflow-hidden rounded-xl border border-oracle-border bg-oracle-surface/80 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-oracle-amber/30"
          >
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-oracle-amber/40 to-transparent" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-oracle-amber">
                  Feature I
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-oracle-text mt-1">
                  THE IMPOSSIBLE QUESTION
                </h2>
                <p className="text-sm text-oracle-text-dim mt-1 max-w-xl">
                  Synthesize an unorthodox hypothetical that shatters conventional axioms of perception.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateImpossible}
                className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-oracle-amber/40 bg-oracle-amber/10 px-5 py-2.5 text-xs font-sans uppercase tracking-wider text-oracle-amber hover:bg-oracle-amber/20 hover:border-oracle-amber/60 transition-all cursor-pointer"
              >
                <Sparkles size={14} />
                Generate Question
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {currentImpossible && (
                <motion.div
                  key={currentImpossible}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 rounded-lg border border-oracle-border-light bg-[#08090D]/80 p-6"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-5 h-5 text-oracle-amber shrink-0 mt-1 opacity-75" />
                    <div className="flex-1">
                      <p className="font-serif italic text-xl md:text-2xl text-oracle-text leading-relaxed">
                        "{currentImpossible}"
                      </p>
                      <div className="mt-5 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleUseQuestion(currentImpossible)}
                          className="inline-flex items-center gap-2 rounded border border-oracle-border-light bg-oracle-surface px-4 py-2 text-xs font-sans uppercase tracking-wider text-oracle-text hover:border-oracle-amber hover:text-oracle-amber transition-all cursor-pointer"
                        >
                          Explore This Universe
                          <ArrowRight size={13} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* FEATURE 2: REALITY COLLISION */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative overflow-hidden rounded-xl border border-oracle-border bg-oracle-surface/80 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-oracle-blue/30"
          >
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-oracle-blue/40 to-transparent" />

            <div className="mb-6">
              <span className="text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-oracle-blue">
                Feature II
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-oracle-text mt-1">
                REALITY COLLISION
              </h2>
              <p className="text-sm text-oracle-text-dim mt-1 max-w-xl">
                Force two discrete timelines from your archive to intersect. Observe the emergent contradictions.
              </p>
            </div>

            {entries.length < 2 ? (
              <div className="rounded-lg border border-oracle-border bg-[#08090D]/50 p-6 text-center">
                <Layers className="w-8 h-8 text-oracle-text-muted mx-auto mb-2" />
                <p className="text-sm text-oracle-text-dim">
                  You need at least two saved realities in your Multiverse Archive to perform a collision.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-oracle-amber hover:underline"
                >
                  Generate realities in the Observatory
                  <ArrowRight size={12} />
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Selector 1 */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-oracle-text-muted mb-2">
                      Primary Reality
                    </label>
                    <select
                      value={reality1Id}
                      onChange={(e) => setReality1Id(e.target.value)}
                      className="w-full rounded-lg border border-oracle-border-light bg-[#08090D] px-4 py-2.5 text-sm text-oracle-text focus:border-oracle-blue focus:outline-none transition-colors"
                    >
                      <option value="">Select universe...</option>
                      {entries.map((entry) => (
                        <option
                          key={`r1-${entry.reality.id}`}
                          value={entry.reality.id}
                          disabled={entry.reality.id === reality2Id}
                        >
                          {entry.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selector 2 */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-oracle-text-muted mb-2">
                      Colliding Reality
                    </label>
                    <select
                      value={reality2Id}
                      onChange={(e) => setReality2Id(e.target.value)}
                      className="w-full rounded-lg border border-oracle-border-light bg-[#08090D] px-4 py-2.5 text-sm text-oracle-text focus:border-oracle-blue focus:outline-none transition-colors"
                    >
                      <option value="">Select universe...</option>
                      {entries.map((entry) => (
                        <option
                          key={`r2-${entry.reality.id}`}
                          value={entry.reality.id}
                          disabled={entry.reality.id === reality1Id}
                        >
                          {entry.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!reality1Id || !reality2Id || reality1Id === reality2Id || isColliding}
                    onClick={handleCollide}
                    className="inline-flex items-center gap-2 rounded-lg border border-oracle-blue/40 bg-oracle-blue/10 px-6 py-2.5 text-xs font-sans uppercase tracking-wider text-oracle-blue hover:bg-oracle-blue/20 hover:border-oracle-blue/60 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Flame size={14} />
                    {isColliding ? 'Calculating Intersection...' : 'Collide Universes'}
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  {collisionResult && (
                    <motion.div
                      key={collisionResult.id}
                      initial={{ opacity: 0, scale: 0.98, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8 rounded-xl border border-oracle-blue/30 bg-[#08090D] p-6 md:p-8"
                    >
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-oracle-blue mb-2">
                        <Flame size={14} />
                        Collision Matrix Verified
                      </div>

                      <h3 className="font-serif text-2xl text-oracle-text mb-3">
                        {collisionResult.title}
                      </h3>

                      <p className="text-sm text-oracle-text-dim leading-relaxed mb-6">
                        {collisionResult.description}
                      </p>

                      <div className="space-y-4 mb-6">
                        <h4 className="text-xs uppercase tracking-widest text-oracle-text-muted">
                          Emergent Phenomena
                        </h4>
                        <ul className="space-y-2">
                          {collisionResult.consequences.map((c, i) => (
                            <li
                              key={i}
                              className="text-sm text-oracle-text border-l-2 border-oracle-blue/40 pl-3 py-1"
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-lg border border-oracle-border-light bg-oracle-surface p-4">
                        <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-oracle-amber block mb-1">
                          The Collision Paradox
                        </span>
                        <p className="font-serif italic text-oracle-text text-sm md:text-base leading-relaxed">
                          "{collisionResult.paradox}"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.section>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* FEATURE 3: THE UNKNOWN */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative overflow-hidden rounded-xl border border-oracle-border bg-oracle-surface/80 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-oracle-amber/20 hover:border-oracle-blue/20"
          >
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-oracle-amber/30 via-oracle-blue/30 to-oracle-amber/30" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-oracle-text-dim">
                  Feature III
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-oracle-text mt-1">
                  THE UNKNOWN
                </h2>
                <p className="text-sm text-oracle-text-dim mt-1 max-w-xl">
                  A transient glimpse into the esoteric axioms of existence, memory, and consciousness.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRevealUnknown}
                className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-oracle-border-light bg-oracle-surface px-5 py-2.5 text-xs font-sans uppercase tracking-wider text-oracle-text hover:border-oracle-amber/50 hover:text-oracle-amber transition-all cursor-pointer"
              >
                <Eye size={14} />
                Reveal Aphorism
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {currentObservation && (
                <motion.div
                  key={currentObservation}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6 }}
                  className="mt-6 relative overflow-hidden rounded-xl border border-oracle-border-light bg-[#08090D]/90 p-8 text-center"
                >
                  <div className="absolute inset-0 bg-radial from-oracle-amber/5 via-transparent to-transparent pointer-events-none" />
                  <p className="relative font-serif italic text-2xl md:text-3xl text-oracle-text leading-relaxed max-w-2xl mx-auto">
                    "{currentObservation}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default Experimental;


import { useState, useCallback, useRef, useMemo } from 'react';
import type { Reality, GenerationPhase, RealitySection, CosmologicalParameters } from '../types';
import { generateReality, generateDeeperContent, generateBranch } from '../engine/generator';
import { resonance } from '../utils/audio';

const GENERATION_PHASES: GenerationPhase[] = [
  'initializing',
  'divergence',
  'newWorld',
  'consequences',
  'humanElement',
  'paradox',
  'future',
  'complete',
];

function phaseDelay(): number {
  return 400 + Math.random() * 400; // 400-800ms per phase
}

export function useReality() {
  const [currentReality, setCurrentReality] = useState<Reality | null>(null);
  const [realityStack, setRealityStack] = useState<Reality[]>([]);
  const [generationPhase, setGenerationPhase] = useState<GenerationPhase>('idle');
  const abortRef = useRef<boolean>(false);

  const runPhaseSequence = useCallback(
    async (reality: Reality): Promise<void> => {
      abortRef.current = false;

      for (const phase of GENERATION_PHASES) {
        if (abortRef.current) return;

        setGenerationPhase(phase);

        if (phase === 'complete') {
          // Reveal all sections expanded
          setCurrentReality({
            ...reality,
            sections: reality.sections.map((s) => ({ ...s, expanded: true })),
          });
        } else if (phase !== 'initializing') {
          // Progressively reveal sections matching the current phase
          const revealedTypes = GENERATION_PHASES.slice(
            1, // skip 'initializing'
            GENERATION_PHASES.indexOf(phase) + 1,
          ) as RealitySection['type'][];

          setCurrentReality({
            ...reality,
            sections: reality.sections.map((s) => ({
              ...s,
              expanded: revealedTypes.includes(s.type),
            })),
          });
        } else {
          // 'initializing' — show reality shell with all sections collapsed
          setCurrentReality({
            ...reality,
            sections: reality.sections.map((s) => ({ ...s, expanded: false })),
          });
        }

        await new Promise<void>((resolve) => setTimeout(resolve, phaseDelay()));
      }
    },
    [],
  );

  const generateNewReality = useCallback(
    async (question: string, parameters?: CosmologicalParameters): Promise<void> => {
      // Abort any in-progress generation
      abortRef.current = true;
      setRealityStack([]);
      setGenerationPhase('initializing');

      // Trigger audio engage sweep
      resonance.playEngage();

      // Generate the full reality upfront with parameters
      const reality = generateReality(question, parameters);

      // Then reveal section by section for cinematic effect
      await runPhaseSequence(reality);
    },
    [runPhaseSequence],
  );

  const goDeeper = useCallback(
    (sectionId: string) => {
      if (!currentReality) return;

      const section = currentReality.sections.find((s) => s.id === sectionId);
      if (!section) return;

      resonance.playTick();

      const deeperContent = generateDeeperContent(
        currentReality.question,
        section,
      );

      setCurrentReality((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s.id === sectionId
              ? { ...s, content: s.content + '\n\n' + deeperContent, expanded: true }
              : s,
          ),
        };
      });
    },
    [currentReality],
  );

  const branchReality = useCallback(
    async (newQuestion: string): Promise<void> => {
      if (!currentReality) return;

      // Audio notification
      resonance.playChime();

      // Push current reality onto the stack
      setRealityStack((prev) => [...prev, currentReality]);
      setGenerationPhase('initializing');

      // Generate branch reality
      const branch = generateBranch(currentReality, newQuestion);

      await runPhaseSequence(branch);
    },
    [currentReality, runPhaseSequence],
  );

  const returnToOriginal = useCallback(() => {
    if (realityStack.length === 0) return;
    const original = realityStack[0];
    setCurrentReality({
      ...original,
      sections: original.sections.map((s) => ({ ...s, expanded: true })),
    });
    setRealityStack([]);
    setGenerationPhase('complete');
  }, [realityStack]);

  const returnToPrevious = useCallback(() => {
    if (realityStack.length === 0) return;
    const previous = realityStack[realityStack.length - 1];
    setCurrentReality({
      ...previous,
      sections: previous.sections.map((s) => ({ ...s, expanded: true })),
    });
    setRealityStack((prev) => prev.slice(0, -1));
    setGenerationPhase('complete');
  }, [realityStack]);

  const clearReality = useCallback(() => {
    abortRef.current = true;
    setCurrentReality(null);
    setRealityStack([]);
    setGenerationPhase('idle');
  }, []);

  const setReality = useCallback((reality: Reality) => {
    abortRef.current = true;
    setCurrentReality({
      ...reality,
      sections: reality.sections.map((s) => ({ ...s, expanded: true })),
    });
    setRealityStack([]);
    setGenerationPhase('complete');
  }, []);

  return useMemo(
    () => ({
      currentReality,
      realityStack,
      generationPhase,
      generateNewReality,
      goDeeper,
      branchReality,
      returnToOriginal,
      returnToPrevious,
      clearReality,
      setReality,
    }),
    [
      currentReality,
      realityStack,
      generationPhase,
      generateNewReality,
      goDeeper,
      branchReality,
      returnToOriginal,
      returnToPrevious,
      clearReality,
      setReality,
    ],
  );
}

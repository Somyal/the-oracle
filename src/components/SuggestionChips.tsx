import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (question: string) => void;
  maxVisible?: number;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const chip: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function SuggestionChips({
  suggestions,
  onSelect,
  maxVisible = 5,
}: SuggestionChipsProps) {
  const visible = suggestions.slice(0, maxVisible);

  if (visible.length === 0) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap justify-center gap-2.5"
    >
      {visible.map((suggestion, idx) => (
        <motion.button
          key={suggestion}
          variants={chip}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(suggestion)}
          className="group relative flex items-center gap-2 px-3.5 py-2 rounded-md border border-oracle-border/80 bg-oracle-surface/50 text-oracle-text-dim text-xs font-sans leading-snug transition-all duration-300 hover:border-oracle-amber/50 hover:text-oracle-text hover:bg-oracle-amber/10 cursor-pointer text-left"
        >
          <span className="font-mono text-[9px] text-oracle-amber/60 group-hover:text-oracle-amber tracking-tighter">
            §{idx + 1}
          </span>
          <span className="text-left font-serif text-sm tracking-wide text-oracle-text/90 group-hover:text-white">
            {suggestion}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}

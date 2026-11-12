import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Dices } from 'lucide-react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
  initialValue?: string;
  placeholder?: string;
  compact?: boolean;
  onRandomize?: () => void;
}

export function QuestionInput({
  onSubmit,
  disabled = false,
  initialValue = '',
  placeholder = 'What if the world had unfolded differently?',
  compact = false,
  onRandomize,
}: QuestionInputProps) {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSubmit(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleRandomizeClick = () => {
    if (onRandomize) {
      setIsSpinning(true);
      onRandomize();
      setTimeout(() => setIsSpinning(false), 500);
    }
  };

  if (compact) {
    return (
      <div className="w-full">
        <motion.div
          animate={{
            borderColor: focused ? '#D4A853' : '#1A1C23',
            boxShadow: focused
              ? '0 0 20px rgba(212, 168, 83, 0.08), 0 0 40px rgba(212, 168, 83, 0.04)'
              : '0 0 0px transparent',
          }}
          transition={{ duration: 0.3 }}
          className="relative border rounded-lg bg-oracle-surface/50 overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full bg-transparent px-4 py-3 font-serif text-base text-oracle-text placeholder:text-oracle-text-muted outline-none disabled:opacity-40 pr-12"
          />

          {onRandomize && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRandomizeClick}
              title="Randomize question"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded text-oracle-text-muted hover:text-oracle-amber hover:bg-oracle-amber/10 transition-colors cursor-pointer"
            >
              <Dices
                size={16}
                className={isSpinning ? 'animate-spin text-oracle-amber' : ''}
              />
            </motion.button>
          )}
        </motion.div>

        <div className="flex items-center justify-between mt-3">
          {value.length > 50 && (
            <span className="text-xs text-oracle-text-muted font-sans tabular-nums">
              {value.length}
            </span>
          )}
          <div className="flex-1" />
          <button
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            className="group relative font-sans text-xs tracking-wider uppercase px-5 py-2.5 rounded-lg bg-oracle-amber/10 text-oracle-amber border border-oracle-amber/20 hover:bg-oracle-amber/20 hover:border-oracle-amber/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap size={13} />
              Generate Reality
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Instrument Enclosure Frame */}
      <motion.div
        animate={{
          borderColor: focused ? '#E2B35B' : '#1C1F27',
          boxShadow: focused
            ? '0 0 35px rgba(226, 179, 91, 0.12), 0 0 70px rgba(226, 179, 91, 0.05)'
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.35 }}
        className="relative border rounded-lg bg-[#0E1015]/80 backdrop-blur-md overflow-hidden"
      >
        {/* Analog Instrument Reticle Corners */}
        <span className="absolute top-1 left-2 font-mono text-[9px] text-oracle-amber/40 select-none pointer-events-none">⌜</span>
        <span className="absolute top-1 right-2 font-mono text-[9px] text-oracle-amber/40 select-none pointer-events-none">⌝</span>
        <span className="absolute bottom-1 left-2 font-mono text-[9px] text-oracle-amber/40 select-none pointer-events-none">⌞</span>
        <span className="absolute bottom-1 right-2 font-mono text-[9px] text-oracle-amber/40 select-none pointer-events-none">⌟</span>

        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1 border-b border-oracle-border/40 select-none">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-oracle-text-muted">
            INPUT COHERENCE // CHANNEL-01
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-oracle-amber/70 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-oracle-amber animate-pulse" />
            READY FOR TRANSMISSION
          </span>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-transparent px-6 py-5 font-serif text-xl text-oracle-text text-center placeholder:text-oracle-text-muted outline-none resize-none leading-relaxed disabled:opacity-40"
        />

        {/* Floating randomize dice in top-right corner of input */}
        {onRandomize && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRandomizeClick}
            title="Randomize question (infinite)"
            className="absolute top-9 right-3.5 p-2 rounded-lg text-oracle-text-muted hover:text-oracle-amber hover:bg-oracle-amber/10 transition-colors z-20 cursor-pointer"
          >
            <Dices
              size={18}
              className={`transition-transform duration-500 ${
                isSpinning ? 'rotate-180 text-oracle-amber' : ''
              }`}
            />
          </motion.button>
        )}
      </motion.div>

      <div className="flex flex-wrap items-center justify-between mt-5 gap-3">
        <div className="flex items-center gap-3">
          {onRandomize && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRandomizeClick}
              title="Click infinitely to discover unique hypothetical realities"
              className="group inline-flex items-center gap-2 rounded-md border border-oracle-border bg-oracle-surface/70 px-4 py-3 font-mono text-[11px] tracking-wider uppercase text-oracle-text-dim hover:border-oracle-amber/40 hover:bg-oracle-amber/5 hover:text-oracle-amber transition-all cursor-pointer"
            >
              <Dices
                size={14}
                className={`text-oracle-amber transition-transform duration-500 ${
                  isSpinning ? 'rotate-180' : 'group-hover:rotate-45'
                }`}
              />
              <span>Randomize Hypothesis</span>
            </motion.button>
          )}

          {value.length > 50 && (
            <span className="font-mono text-[10px] text-oracle-text-muted tabular-nums hidden sm:inline">
              {value.length} CHARS
            </span>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="group relative font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 rounded-md bg-oracle-amber/15 text-oracle-amber border border-oracle-amber/35 hover:bg-oracle-amber/25 hover:border-oracle-amber/60 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(226,179,91,0.15)]"
        >
          {/* Hover glow */}
          <div className="absolute inset-0 bg-oracle-amber/0 group-hover:bg-oracle-amber/10 transition-colors duration-500 rounded-md" />
          <span className="relative z-10 flex items-center gap-2.5 font-medium">
            <Zap size={14} className="text-oracle-amber" />
            Actuate Reality
          </span>
        </motion.button>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronDown,
  Disc,
  Radio,
} from 'lucide-react';
import { resonance, ORACLE_SOUNDTRACK } from '../utils/audio';
import type { AudioState } from '../utils/audio';

const links = [
  { to: '/', label: 'Observatory' },
  { to: '/archive', label: 'Archive' },
  { to: '/experimental', label: 'Experimental' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>(resonance.getState());
  const consoleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return resonance.subscribe((state) => setAudioState(state));
  }, []);

  // Close console on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (consoleRef.current && !consoleRef.current.contains(e.target as Node)) {
        setConsoleOpen(false);
      }
    };
    if (consoleOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [consoleOpen]);

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    resonance.playTick();
    resonance.toggle();
  };

  const handleSelectTrack = (index: number) => {
    resonance.playTick();
    resonance.selectTrack(index);
    if (!audioState.isPlaying) {
      resonance.play();
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    resonance.playTick();
    resonance.nextTrack();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    resonance.playTick();
    resonance.prevTrack();
  };

  const currentTrack = audioState.currentTrack;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-oracle-bg/90 border-b border-oracle-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => resonance.playTick()}
          className="font-serif tracking-widest text-sm uppercase text-oracle-amber text-glow-amber flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-oracle-amber/80" />
          The Oracle
        </NavLink>

        {/* Center: Acoustic Resonance Field Console Pill */}
        <div ref={consoleRef} className="relative hidden sm:flex items-center">
          <div
            onClick={() => {
              resonance.playTick();
              setConsoleOpen((prev) => !prev);
            }}
            className="group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-oracle-border bg-oracle-surface/70 hover:border-oracle-amber/40 transition-all cursor-pointer select-none"
            title="Open Acoustic Field Console"
          >
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={handlePlayToggle}
              className="w-5 h-5 rounded-full bg-oracle-amber/10 border border-oracle-amber/30 flex items-center justify-center text-oracle-amber hover:bg-oracle-amber hover:text-oracle-bg transition-colors cursor-pointer shrink-0"
              title={audioState.isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
            >
              {audioState.isPlaying ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
            </button>

            {/* Equalizer animation bars */}
            <div className="flex items-center gap-0.5 h-3">
              <span
                className={`w-0.5 bg-oracle-amber transition-all duration-300 ${
                  audioState.isPlaying ? 'h-3 animate-pulse' : 'h-1 opacity-30'
                }`}
              />
              <span
                className={`w-0.5 bg-oracle-amber transition-all duration-300 ${
                  audioState.isPlaying ? 'h-2 animate-pulse' : 'h-1 opacity-30'
                }`}
                style={{ animationDelay: '150ms' }}
              />
              <span
                className={`w-0.5 bg-oracle-amber transition-all duration-300 ${
                  audioState.isPlaying ? 'h-3.5 animate-pulse' : 'h-1 opacity-30'
                }`}
                style={{ animationDelay: '300ms' }}
              />
              <span
                className={`w-0.5 bg-oracle-amber transition-all duration-300 ${
                  audioState.isPlaying ? 'h-1.5 animate-pulse' : 'h-1 opacity-30'
                }`}
                style={{ animationDelay: '75ms' }}
              />
            </div>

            {/* Track Info */}
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] max-w-[190px] truncate">
              {audioState.isPlaying ? (
                <span className="text-oracle-amber">{currentTrack.title}</span>
              ) : (
                <span className="text-oracle-text-muted group-hover:text-oracle-text-dim">
                  Acoustic Field: Dormant
                </span>
              )}
            </span>

            <ChevronDown
              size={12}
              className={`text-oracle-text-muted transition-transform duration-300 ${
                consoleOpen ? 'rotate-180 text-oracle-amber' : ''
              }`}
            />
          </div>

          {/* Expanded Acoustic Field Console Dropdown */}
          <AnimatePresence>
            {consoleOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 left-1/2 -translate-x-1/2 w-[340px] rounded-2xl border border-oracle-amber/40 bg-[#08090D]/95 backdrop-blur-xl p-5 shadow-2xl z-50 select-none"
              >
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-oracle-border pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Radio size={12} className="text-oracle-amber" />
                    <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-oracle-amber">
                      Resonance Array // 6 Frequencies
                    </span>
                  </div>
                  <span className="text-[9px] font-sans uppercase tracking-widest text-oracle-text-muted">
                    {currentTrack.frequencyTag}
                  </span>
                </div>

                {/* Current Track Display */}
                <div className="text-center mb-5 p-3 rounded-xl border border-oracle-border bg-oracle-surface/60">
                  <span className="text-[9px] font-sans uppercase tracking-widest text-oracle-text-muted block">
                    Now Resonating
                  </span>
                  <h4 className="font-serif text-lg text-oracle-text mt-0.5 truncate">
                    {currentTrack.title}
                  </h4>
                  <p className="font-serif italic text-xs text-oracle-amber/80 mt-0.5">
                    {currentTrack.subtitle}
                  </p>
                </div>

                {/* Transport Controls */}
                <div className="flex items-center justify-center gap-5 mb-5">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-lg text-oracle-text-muted hover:text-oracle-text hover:bg-oracle-surface transition-colors cursor-pointer"
                    title="Previous frequency"
                  >
                    <SkipBack size={15} />
                  </button>

                  <button
                    onClick={handlePlayToggle}
                    className="w-10 h-10 rounded-full bg-oracle-amber/15 border border-oracle-amber/50 flex items-center justify-center text-oracle-amber hover:bg-oracle-amber hover:text-oracle-bg transition-all duration-300 shadow-[0_0_20px_rgba(212,168,83,0.15)] cursor-pointer"
                    title={audioState.isPlaying ? 'Pause' : 'Play'}
                  >
                    {audioState.isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2 rounded-lg text-oracle-text-muted hover:text-oracle-text hover:bg-oracle-surface transition-colors cursor-pointer"
                    title="Next frequency"
                  >
                    <SkipForward size={15} />
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-3 px-2 mb-5">
                  <button
                    onClick={() => resonance.setVolume(audioState.volume > 0 ? 0 : 0.65)}
                    className="text-oracle-text-muted hover:text-oracle-text cursor-pointer"
                    title={audioState.volume > 0 ? 'Mute' : 'Unmute'}
                  >
                    {audioState.volume > 0 ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={audioState.volume}
                    onChange={(e) => resonance.setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-oracle-border rounded-lg appearance-none cursor-pointer accent-oracle-amber"
                  />
                  <span className="text-[10px] font-sans text-oracle-text-muted w-7 text-right">
                    {Math.round(audioState.volume * 100)}%
                  </span>
                </div>

                {/* 6 Track Selector Grid */}
                <div className="space-y-1.5 border-t border-oracle-border pt-3">
                  <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-oracle-text-muted block mb-2 px-1">
                    Select Harmonic Frequency
                  </span>
                  {ORACLE_SOUNDTRACK.map((track, idx) => {
                    const isSelected = idx === audioState.currentTrackIndex;
                    return (
                      <button
                        key={track.id}
                        onClick={() => handleSelectTrack(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-oracle-amber/10 border border-oracle-amber/40 text-oracle-amber'
                            : 'border border-transparent hover:border-oracle-border hover:bg-oracle-surface/50 text-oracle-text-dim'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="text-[10px] font-mono opacity-50 shrink-0">
                            0{idx + 1}
                          </span>
                          <span className="text-xs font-serif truncate">
                            {track.title}
                          </span>
                        </div>

                        {isSelected && audioState.isPlaying && (
                          <Disc size={12} className="animate-spin text-oracle-amber shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => resonance.playTick()}
              className="relative font-sans text-xs tracking-wider uppercase transition-colors duration-300"
            >
              {({ isActive: active }) => (
                <>
                  <span className={active ? 'text-oracle-amber font-medium' : 'text-oracle-text-dim hover:text-oracle-text'}>
                    {link.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-[19px] left-0 right-0 h-px bg-oracle-amber"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={handlePlayToggle}
            className={`p-1.5 rounded border text-xs flex items-center gap-1 cursor-pointer ${
              audioState.isPlaying
                ? 'border-oracle-amber text-oracle-amber bg-oracle-amber/10'
                : 'border-oracle-border text-oracle-text-muted'
            }`}
            title="Toggle Soundtrack"
          >
            {audioState.isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span className="text-[10px] uppercase font-sans">
              {audioState.isPlaying ? 'Track 0' + (audioState.currentTrackIndex + 1) : 'Sound'}
            </span>
          </button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="text-oracle-text-dim hover:text-oracle-text transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-b border-oracle-border bg-oracle-bg/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => {
                    resonance.playTick();
                    setMobileOpen(false);
                  }}
                  className="font-sans text-xs tracking-wider uppercase py-3 transition-colors duration-300"
                >
                  {({ isActive }) => (
                    <span className={isActive ? 'text-oracle-amber' : 'text-oracle-text-dim hover:text-oracle-text'}>
                      {link.label}
                    </span>
                  )}
                </NavLink>
              ))}

              {/* Mobile Track Selector */}
              <div className="border-t border-oracle-border pt-3 mt-2">
                <span className="text-[10px] font-sans uppercase tracking-widest text-oracle-text-muted block mb-2">
                  Acoustic Field Tracks
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {ORACLE_SOUNDTRACK.map((track, idx) => (
                    <button
                      key={track.id}
                      onClick={() => {
                        handleSelectTrack(idx);
                        setMobileOpen(false);
                      }}
                      className={`px-2.5 py-1.5 rounded text-[10px] font-sans uppercase truncate text-left border cursor-pointer ${
                        idx === audioState.currentTrackIndex && audioState.isPlaying
                          ? 'border-oracle-amber bg-oracle-amber/15 text-oracle-amber'
                          : 'border-oracle-border text-oracle-text-muted'
                      }`}
                    >
                      0{idx + 1}. {track.title.slice(0, 14)}…
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navigation;

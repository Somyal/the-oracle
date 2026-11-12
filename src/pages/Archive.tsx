import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  X,
  Check,
  Archive as ArchiveIcon,
  Compass,
  List,
} from 'lucide-react';
import { useRealityContext } from '../context/RealityContext';
import { EmptyState } from '../components/EmptyState';
import { ConstellationMap } from '../components/ConstellationMap';
import { resonance } from '../utils/audio';
import type { ArchiveEntry } from '../types';

export function Archive() {
  const navigate = useNavigate();
  const { entries, deleteEntry, renameEntry, setReality } = useRealityContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'constellation'>('list');

  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [...entries].sort((a, b) => b.savedAt - a.savedAt);
    return [...entries]
      .filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.reality.question.toLowerCase().includes(q),
      )
      .sort((a, b) => b.savedAt - a.savedAt);
  }, [entries, searchQuery]);

  const handleOpen = useCallback(
    (entry: ArchiveEntry) => {
      resonance.playEngage();
      setReality(entry.reality);
      navigate('/explore');
    },
    [setReality, navigate],
  );

  const handleStartRename = useCallback((entry: ArchiveEntry) => {
    resonance.playTick();
    setEditingId(entry.id);
    setEditName(entry.name);
  }, []);

  const handleConfirmRename = useCallback(() => {
    if (editingId && editName.trim()) {
      resonance.playTick();
      renameEntry(editingId, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  }, [editingId, editName, renameEntry]);

  const handleCancelRename = useCallback(() => {
    resonance.playTick();
    setEditingId(null);
    setEditName('');
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      resonance.playTick();
      deleteEntry(id);
      setDeletingId(null);
    },
    [deleteEntry],
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="relative min-h-screen bg-oracle-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-24"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="font-serif text-3xl uppercase tracking-[0.25em] text-oracle-text md:text-4xl">
            The Multiverse Archive
          </h1>
          <p className="mt-3 text-sm text-oracle-text-dim">
            Preserved realities from across the multiverse
          </p>
        </motion.div>

        {/* View mode toggle & Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
        >
          {/* Dual view mode buttons */}
          <div className="inline-flex rounded-lg border border-oracle-border bg-oracle-surface p-1 self-start sm:self-auto">
            <button
              onClick={() => {
                resonance.playTick();
                setViewMode('list');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-oracle-amber/10 text-oracle-amber border border-oracle-amber/30'
                  : 'text-oracle-text-muted hover:text-oracle-text'
              }`}
            >
              <List size={13} />
              <span>Chronological Log</span>
            </button>

            <button
              onClick={() => {
                resonance.playChime();
                setViewMode('constellation');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'constellation'
                  ? 'bg-oracle-blue/15 text-oracle-blue border border-oracle-blue/30'
                  : 'text-oracle-text-muted hover:text-oracle-text'
              }`}
            >
              <Compass size={13} />
              <span>Constellation Chart</span>
            </button>
          </div>

          {/* Search Bar */}
          {viewMode === 'list' && (
            <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-oracle-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter continuum..."
                  className="w-full rounded-lg border border-oracle-border bg-oracle-surface py-2 pl-9 pr-3 text-xs text-oracle-text placeholder-oracle-text-muted outline-none transition-colors focus:border-oracle-border-light"
                />
              </div>
              <span className="flex-shrink-0 text-[10px] font-sans uppercase tracking-wider text-oracle-text-muted">
                {filteredEntries.length} {filteredEntries.length === 1 ? 'Strand' : 'Strands'}
              </span>
            </div>
          )}
        </motion.div>

        {/* Content */}
        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <EmptyState
              icon={<ArchiveIcon className="w-12 h-12" />}
              title="No realities have been preserved yet"
              description="Explore alternate realities and save them to build your multiverse archive."
              action={{
                label: 'Visit the Observatory',
                onClick: () => navigate('/'),
              }}
            />
          </motion.div>
        ) : viewMode === 'constellation' ? (
          /* Feature 3: The Transdimensional Constellation Star Chart */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <ConstellationMap
              entries={entries}
              onOpenReality={handleOpen}
            />
          </motion.div>
        ) : filteredEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-oracle-text-dim text-sm">No realities match your filter.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 space-y-4"
          >
            <AnimatePresence>
              {filteredEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-xl border border-oracle-border bg-oracle-surface/70 p-5 transition-all hover:border-oracle-border-light hover:bg-oracle-surface hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {entry.reality.parentId && (
                        <div className="mb-1.5">
                          <span className="font-sans text-[10px] uppercase tracking-wider text-oracle-blue px-2 py-0.5 rounded bg-oracle-blue/15 border border-oracle-blue/30">
                            Branched Reality
                          </span>
                        </div>
                      )}

                      {/* Name — view or inline edit */}
                      {editingId === entry.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleConfirmRename();
                              if (e.key === 'Escape') handleCancelRename();
                            }}
                            autoFocus
                            className="flex-1 rounded border border-oracle-amber/50 bg-oracle-bg px-2.5 py-1 font-serif text-lg text-oracle-text outline-none"
                          />
                          <button
                            onClick={handleConfirmRename}
                            className="rounded p-1 text-oracle-amber hover:bg-oracle-amber/10 transition-colors"
                            title="Save"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancelRename}
                            className="rounded p-1 text-oracle-text-muted hover:text-oracle-text transition-colors"
                            title="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <h3 className="font-serif text-xl text-oracle-text truncate group-hover:text-white transition-colors">
                          {entry.name}
                        </h3>
                      )}

                      {/* Question */}
                      <p className="mt-1 font-serif text-sm italic text-oracle-text-dim line-clamp-2">
                        &ldquo;{entry.reality.question}&rdquo;
                      </p>

                      {/* Metadata */}
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-oracle-text-muted">
                        <span>{formatDate(entry.savedAt)}</span>
                        <span>•</span>
                        <span>{entry.reality.sections.length} axioms</span>
                        {entry.reality.timeline.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{entry.reality.timeline.length} timeline events</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => handleOpen(entry)}
                        className="rounded-lg p-2 text-oracle-text-dim transition-colors hover:bg-oracle-amber/10 hover:text-oracle-amber cursor-pointer"
                        title="Engage reality strand"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleStartRename(entry)}
                        className="rounded-lg p-2 text-oracle-text-dim transition-colors hover:bg-oracle-surface hover:text-oracle-text cursor-pointer"
                        title="Rename"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      {deletingId === entry.id ? (
                        <div className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 p-1">
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="rounded px-2 py-0.5 text-xs text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="rounded p-0.5 text-oracle-text-muted hover:text-oracle-text transition-colors cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(entry.id)}
                          className="rounded-lg p-2 text-oracle-text-dim transition-colors hover:text-red-400 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Archive;

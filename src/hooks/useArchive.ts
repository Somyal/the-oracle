import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ArchiveEntry, Reality } from '../types';
import { loadArchive, saveArchive, markInitialized } from '../utils/storage';
import { generateId } from '../engine/textUtils';

function createArchiveEntry(reality: Reality, name?: string): ArchiveEntry {
  return {
    id: generateId(),
    reality: { ...reality, saved: true },
    savedAt: Date.now(),
    name: name ?? reality.customName ?? reality.title,
  };
}

export function useArchive() {
  const [entries, setEntries] = useState<ArchiveEntry[]>(() => {
    return loadArchive().filter((e) => !e.reality?.id?.startsWith('seed-'));
  });

  // Load archive on mount; starts empty for pure user customization
  useEffect(() => {
    const loaded = loadArchive().filter((e) => !e.reality?.id?.startsWith('seed-'));
    setEntries(loaded);
    saveArchive(loaded);
    markInitialized();
  }, []);

  const saveReality = useCallback(
    (reality: Reality, name?: string) => {
      setEntries((prev) => {
        // Don't duplicate if already in archive
        const exists = prev.some((e) => e.reality.id === reality.id);
        if (exists) return prev;

        const entry = createArchiveEntry(reality, name);
        const next = [entry, ...prev];
        saveArchive(next);
        return next;
      });
    },
    [],
  );

  const deleteEntry = useCallback(
    (id: string) => {
      setEntries((prev) => {
        const next = prev.filter((e) => e.id !== id);
        saveArchive(next);
        return next;
      });
    },
    [],
  );

  const renameEntry = useCallback(
    (id: string, newName: string) => {
      setEntries((prev) => {
        const next = prev.map((e) =>
          e.id === id ? { ...e, name: newName } : e,
        );
        saveArchive(next);
        return next;
      });
    },
    [],
  );

  const searchEntries = useCallback(
    (query: string): ArchiveEntry[] => {
      if (!query.trim()) return entries;
      const lower = query.toLowerCase();
      return entries.filter(
        (e) =>
          e.name.toLowerCase().includes(lower) ||
          e.reality.question.toLowerCase().includes(lower) ||
          e.reality.title.toLowerCase().includes(lower) ||
          e.reality.description.toLowerCase().includes(lower),
      );
    },
    [entries],
  );

  const getEntry = useCallback(
    (id: string): ArchiveEntry | undefined => {
      return entries.find((e) => e.id === id);
    },
    [entries],
  );

  const isInArchive = useCallback(
    (realityId: string): boolean => {
      return entries.some((e) => e.reality.id === realityId);
    },
    [entries],
  );

  return useMemo(
    () => ({
      entries,
      saveReality,
      deleteEntry,
      renameEntry,
      searchEntries,
      getEntry,
      isInArchive,
    }),
    [entries, saveReality, deleteEntry, renameEntry, searchEntries, getEntry, isInArchive],
  );
}

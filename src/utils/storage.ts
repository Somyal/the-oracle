import type { ArchiveEntry, CollisionResult } from '../types';

const STORAGE_KEYS = {
  archive: 'oracle-archive',
  collisions: 'oracle-collisions',
  initialized: 'oracle-initialized',
} as const;

export function loadArchive(): ArchiveEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.archive);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e: ArchiveEntry) => !e.reality?.id?.startsWith('seed-'));
  } catch {
    return [];
  }
}

export function saveArchive(entries: ArchiveEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.archive, JSON.stringify(entries));
  } catch {
    console.warn('[Oracle] Failed to save archive to localStorage');
  }
}

export function loadCollisions(): CollisionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.collisions);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCollisions(collisions: CollisionResult[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.collisions, JSON.stringify(collisions));
  } catch {
    console.warn('[Oracle] Failed to save collisions to localStorage');
  }
}

export function isFirstLaunch(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.initialized) !== 'true';
  } catch {
    return true;
  }
}

export function markInitialized(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.initialized, 'true');
  } catch {
    console.warn('[Oracle] Failed to mark initialized');
  }
}

export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch {
    console.warn('[Oracle] Failed to clear data');
  }
}

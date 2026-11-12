// ── Text Utilities for the Reality Generation Engine ──────────────────────────

/**
 * Simple djb2 hash function for deterministic template selection.
 */
export function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Extract important nouns and concepts from the question.
 */
export function extractKeyPhrases(question: string): string[] {
  const stopWords = new Set([
    'what', 'if', 'the', 'a', 'an', 'is', 'was', 'were', 'are', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'dare',
    'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
    'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above',
    'below', 'between', 'out', 'off', 'over', 'under', 'again', 'further',
    'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
    'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
    'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
    'just', 'because', 'but', 'and', 'or', 'yet', 'that', 'this', 'these',
    'those', 'it', 'its', 'he', 'she', 'they', 'them', 'we', 'us', 'you',
    'i', 'me', 'my', 'your', 'his', 'her', 'our', 'their', 'who', 'whom',
    'which', 'never', 'ever', 'always', 'also', 'about', 'up', 'one',
    'been', 'being', 'having', 'doing', 'going', 'got', 'get', 'let',
    'make', 'made', 'like', 'still', 'way', 'well', 'back', 'even',
  ]);

  const cleaned = question
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleaned.split(' ').filter(w => w.length > 2 && !stopWords.has(w));

  // Also find bigrams (two-word phrases)
  const tokens = cleaned.split(' ');
  const bigrams: string[] = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    if (!stopWords.has(tokens[i]) && !stopWords.has(tokens[i + 1])) {
      bigrams.push(`${tokens[i]} ${tokens[i + 1]}`);
    }
  }

  return [...bigrams, ...words].slice(0, 8);
}

/**
 * Pick an item from array using a seed for determinism.
 */
export function pickFromArray<T>(arr: T[], seed: number, index: number = 0): T {
  const i = Math.abs((seed + index * 7919) % arr.length);
  return arr[i];
}

/**
 * Generate a unique ID.
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate a plausible year for timeline events. Mix of past and future years.
 */
export function generateYear(baseSeed: number, index: number): string {
  // Generate a mix of historical and future dates
  const ranges = [
    { min: -3000, max: -500, label: 'ancient' },
    { min: 500, max: 1400, label: 'medieval' },
    { min: 1400, max: 1700, label: 'earlyModern' },
    { min: 1700, max: 1900, label: 'industrial' },
    { min: 1900, max: 2000, label: 'modern' },
    { min: 2000, max: 2025, label: 'contemporary' },
    { min: 2025, max: 2100, label: 'nearFuture' },
    { min: 2100, max: 2500, label: 'farFuture' },
    { min: 2500, max: 10000, label: 'distantFuture' },
  ];

  // Progress through time as index increases
  const progressIndex = Math.min(index, ranges.length - 1);

  // Use seed to add some variation within the selected range
  const range = ranges[progressIndex];
  const variation = Math.abs((baseSeed * (index + 1) * 13) % (range.max - range.min));
  const year = range.min + variation;

  if (year < 0) {
    return `${Math.abs(year)} BCE`;
  }
  return year.toString();
}

/**
 * Shuffle an array deterministically using a seed.
 */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) | 0;
    const j = Math.abs(s) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Truncate text to a specified word count.
 */
export function truncateToWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '…';
}

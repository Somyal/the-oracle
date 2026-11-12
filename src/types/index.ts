export interface RealitySection {
  id: string;
  title: string;
  type: 'divergence' | 'newWorld' | 'consequences' | 'humanElement' | 'paradox' | 'future';
  content: string;
  expanded?: boolean;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  branchId?: string;
}

export interface CosmologicalParameters {
  temporalAnchor: 'ancient' | 'industrial' | 'contemporary' | 'deepFuture';
  entropyLevel: 'subtle' | 'moderate' | 'rupture';
  civilizationVector: 'technocratic' | 'ecological' | 'consciousness' | 'equilibrium';
}

export interface PrimeComparisonPoint {
  epoch: string;
  primeWorld: string;
  divergentWorld: string;
  axiomShift: string;
}

export interface PrimeComparisonData {
  primeOverview: string;
  divergentOverview: string;
  points: PrimeComparisonPoint[];
  existentialVerdict: string;
}

export interface Reality {
  id: string;
  question: string;
  title: string;
  description: string;
  sections: RealitySection[];
  timeline: TimelineEvent[];
  createdAt: number;
  parentId?: string;
  branchQuestion?: string;
  saved?: boolean;
  customName?: string;
  parameters?: CosmologicalParameters;
  primeComparison?: PrimeComparisonData;
}

export interface ArchiveEntry {
  id: string;
  reality: Reality;
  savedAt: number;
  name: string;
}

export interface CollisionResult {
  id: string;
  reality1Id: string;
  reality2Id: string;
  title: string;
  description: string;
  consequences: string[];
  paradox: string;
  createdAt: number;
}

export type GenerationPhase =
  | 'idle'
  | 'initializing'
  | 'divergence'
  | 'newWorld'
  | 'consequences'
  | 'humanElement'
  | 'paradox'
  | 'future'
  | 'complete';

export interface AppState {
  currentReality: Reality | null;
  realityStack: Reality[];
  archive: ArchiveEntry[];
  collisions: CollisionResult[];
}

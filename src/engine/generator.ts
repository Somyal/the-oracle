import type {
  Reality,
  RealitySection,
  TimelineEvent,
  CollisionResult,
  CosmologicalParameters,
  PrimeComparisonData,
} from '../types';
import {
  themes,
  divergenceTemplates,
  newWorldTemplates,
  consequenceTemplates,
  humanElementTemplates,
  paradoxTemplates,
  futureTemplates,
  titleTemplates,
  descriptionTemplates,
  timelineTemplates,
  collisionTemplates,
  deeperContentTemplates,
  branchIntroTemplates,
} from '../data/templates';
import {
  hashString,
  extractKeyPhrases,
  pickFromArray,
  generateId,
  generateYear,
} from './textUtils';

/**
 * Detect the theme that best matches the hypothetical question, optionally influenced by civilization vector.
 */
export function detectTheme(
  question: string,
  vector?: CosmologicalParameters['civilizationVector']
): { theme: string; keywords: string[] } {
  // If vector is explicitly specified and not equilibrium, steer towards corresponding theme
  if (vector === 'technocratic') {
    const techTheme = themes.find((t) => t.theme === 'technology');
    if (techTheme) return techTheme;
  } else if (vector === 'ecological') {
    const ecoTheme = themes.find((t) => t.theme === 'nature');
    if (ecoTheme) return ecoTheme;
  } else if (vector === 'consciousness') {
    const mindTheme = themes.find((t) => t.theme === 'consciousness');
    if (mindTheme) return mindTheme;
  }

  const lowerQ = question.toLowerCase();
  let bestTheme = themes[0];
  let highestScore = -1;

  for (const t of themes) {
    let score = 0;
    for (const kw of t.keywords) {
      if (lowerQ.includes(kw)) {
        score += kw.length > 5 ? 3 : 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestTheme = t;
    }
  }

  // Fallback if no matching keywords found: pick deterministically based on hash
  if (highestScore <= 0) {
    const seed = hashString(question);
    bestTheme = pickFromArray(themes, seed);
  }

  return {
    theme: bestTheme.theme,
    keywords: bestTheme.keywords,
  };
}

/**
 * Generate a calibrated timeline year taking temporal anchor into account.
 */
function getCalibratedYear(
  baseSeed: number,
  index: number,
  anchor?: CosmologicalParameters['temporalAnchor']
): string {
  if (anchor === 'ancient') {
    const ancientYears = ['2400 BCE', '1250 BCE', '480 BCE', '44 BCE', '330 CE', '800 CE'];
    return ancientYears[index % ancientYears.length];
  }
  if (anchor === 'industrial') {
    const industrialYears = ['1764', '1815', '1859', '1892', '1923', '1947'];
    return industrialYears[index % industrialYears.length];
  }
  if (anchor === 'deepFuture') {
    const futureYears = ['2240', '2690', '3410', '5200', '8950', '12000'];
    return futureYears[index % futureYears.length];
  }
  return generateYear(baseSeed, index);
}

/**
 * Generate comparative analysis between Prime Earth (Our Reality) and the divergent timeline.
 */
export function generatePrimeComparison(
  question: string,
  title: string,
  theme: string,
  _seed: number
): PrimeComparisonData {
  const primeOverview =
    'In Prime Reality (Earth-0), history progressed along strict thermodynamic boundaries: chemical combustion, irreversible biological aging, solitary consciousness, and constant gravitational mass. Every societal apparatus was engineered to endure these unbending physical limitations.';

  const divergentOverview = `In "${title}", this foundational axiom ruptured. By asking "${question}", civilization was forced to re-architect its technologies, moral covenants, and daily survival mechanisms around entirely alien physical and sociological principles.`;

  const comparisonMatrices: Record<string, { prime: string; divergent: string; axiom: string }[]> = {
    physics: [
      {
        prime: 'Newtonian gravity and general relativity dictate invariable orbital mechanics and architectural weight.',
        divergent: 'Dynamic gravitational flux or altered constants require suspension tethers, non-rectilinear architecture, and fluid kinetic harvesting.',
        axiom: 'Invariable Mass-Energy Tensor → Permeable Field Mechanics',
      },
      {
        prime: 'Oceans follow lunar tidal bulges with predictable diurnal rhythm.',
        divergent: 'Momentary weightlessness or altered friction produces vertical tidal walls and atmospheric particulate dispersion.',
        axiom: 'Hydrostatic Equilibrium → Rhythmic Dispersal Dynamics',
      },
    ],
    consciousness: [
      {
        prime: 'The human skull remains a closed sanctuary; memories fade and perish with biological death.',
        divergent: 'Cognitive crystallization allows direct transmission of skills, sorrow, and knowledge between nervous systems.',
        axiom: 'Solitary Epistemology → Open-Source Cognitive Reservoir',
      },
      {
        prime: 'Legal justice penalizes outward actions through physical confinement.',
        divergent: 'Judicial systems extract memories of transgression and infuse the raw somatic experience of victimhood.',
        axiom: 'Retributive Incarceration → Direct Synaptic Empathy',
      },
    ],
    technology: [
      {
        prime: 'Digital computation arose in the mid-20th century following vacuum tubes and silicon lithography.',
        divergent: 'Information networks evolved centuries earlier through acoustic resonators, telegraphic weaving, or organic relays.',
        axiom: 'Silicon Binary Architecture → Kinetic Harmonic Computation',
      },
      {
        prime: 'Fossil fuel combustion powered the 19th and 20th century industrial expansion.',
        divergent: 'Atmospheric ether harvesting or wireless electromagnetic conduits negated the geopolitical dominance of coal and petroleum.',
        axiom: 'Combustion Dependency → Ambient Radiant Energy',
      },
    ],
  };

  const pool = comparisonMatrices[theme] || comparisonMatrices.physics;

  const points = [
    {
      epoch: 'The Departure Epoch',
      primeWorld: 'Unbroken historical continuity under orthodox physical and social paradigms.',
      divergentWorld: `The rupture point manifests: "${question}". Immediate institutional mobilization and philosophical panic.`,
      axiomShift: 'Consensus Reality → Forked Probability',
    },
    {
      epoch: 'The Adaptation Wave',
      primeWorld: pool[0]?.prime || 'Society optimizes for industrial efficiency and physical predictability.',
      divergentWorld: pool[0]?.divergent || 'Culture, city design, and rituals adapt to the new universal conditions.',
      axiomShift: pool[0]?.axiom || 'Orthodox Constraints → Emergent Solutions',
    },
    {
      epoch: 'The Systemic Equilibrium',
      primeWorld: pool[1]?.prime || 'Institutional structures solidify around legal, physical, and national borders.',
      divergentWorld: pool[1]?.divergent || 'Daily life reorganizes so thoroughly that children find Prime Earth concepts incomprehensible.',
      axiomShift: pool[1]?.axiom || 'Rigid Standardization → Dynamic Resilience',
    },
  ];

  const existentialVerdict =
    'Prime Earth preserved predictable physics at the cost of chronic existential isolation; the divergent strand unlocked radical freedom at the cost of perpetual instability. Neither universe can claim moral or evolutionary superiority—only different answers to the same impossible question.';

  return {
    primeOverview,
    divergentOverview,
    points,
    existentialVerdict,
  };
}

/**
 * Generate a complete alternate reality from a question, honoring cosmological parameters.
 */
export function generateReality(
  question: string,
  parameters?: CosmologicalParameters
): Reality {
  const seed = hashString(question + (parameters ? JSON.stringify(parameters) : ''));
  const { theme, keywords } = detectTheme(question, parameters?.civilizationVector);
  const keyPhrases = extractKeyPhrases(question);
  const combinedKeywords = [...keyPhrases, ...keywords];

  // Generate Title & Description
  const titleFn = pickFromArray(titleTemplates, seed, 0);
  const descFn = pickFromArray(descriptionTemplates, seed, 1);
  let title = titleFn(question, theme);
  let description = descFn(question, theme);

  if (parameters?.entropyLevel === 'rupture') {
    title = `The Total Rupture: ${title}`;
    description = `An extreme ontological fracture occurred: ${description}`;
  }

  // Generate Section A: The Divergence
  const divTemplate = pickFromArray(divergenceTemplates, seed, 2);
  const divergenceContent = divTemplate.generate(question, theme, combinedKeywords);

  // Generate Section B: The New World
  const newWorldTemplate = pickFromArray(newWorldTemplates, seed, 3);
  const newWorldContent = newWorldTemplate.generate(question, theme, combinedKeywords);

  // Generate Section C: The Consequences
  const c1 = pickFromArray(consequenceTemplates, seed, 4).generate(question, theme, combinedKeywords);
  const c2 = pickFromArray(consequenceTemplates, seed, 5).generate(question, theme, combinedKeywords);
  const c3 = pickFromArray(consequenceTemplates, seed, 6).generate(question, theme, combinedKeywords);
  const consequencesContent = `The divergence created cascading fractures across three distinct spheres of existence:\n\n1. ${c1}\n\n2. ${c2}\n\n3. ${c3}`;

  // Generate Section D: The Human Element
  const humanTemplate = pickFromArray(humanElementTemplates, seed, 7);
  const humanContent = humanTemplate.generate(question, theme, combinedKeywords);

  // Generate Section E: The Paradox
  const paradoxTemplate = pickFromArray(paradoxTemplates, seed, 8);
  const paradoxContent = paradoxTemplate.generate(question, theme, combinedKeywords);

  // Generate Section F: The Future
  const futureTemplate = pickFromArray(futureTemplates, seed, 9);
  const futureContent = futureTemplate.generate(question, theme, combinedKeywords);

  const sections: RealitySection[] = [
    {
      id: generateId(),
      title: 'The Point of Departure',
      type: 'divergence',
      content: divergenceContent,
      expanded: true,
    },
    {
      id: generateId(),
      title: 'The Unfolding Realm',
      type: 'newWorld',
      content: newWorldContent,
      expanded: true,
    },
    {
      id: generateId(),
      title: 'Systemic Cascades',
      type: 'consequences',
      content: consequencesContent,
      expanded: true,
    },
    {
      id: generateId(),
      title: 'The Human Interior',
      type: 'humanElement',
      content: humanContent,
      expanded: true,
    },
    {
      id: generateId(),
      title: 'The Underlying Paradox',
      type: 'paradox',
      content: paradoxContent,
      expanded: true,
    },
    {
      id: generateId(),
      title: 'The Horizon Vector',
      type: 'future',
      content: futureContent,
      expanded: true,
    },
  ];

  // Generate Timeline Events calibrated to temporal anchor
  const timeline: TimelineEvent[] = [];
  const eventCount = 5;
  for (let i = 0; i < eventCount; i++) {
    const tTemplate = pickFromArray(timelineTemplates, seed + i * 31, i);
    timeline.push({
      id: generateId(),
      year: getCalibratedYear(seed, i, parameters?.temporalAnchor),
      title: tTemplate.title(question, theme),
      description: tTemplate.description(question, theme),
    });
  }

  // Generate Prime Reality comparison
  const primeComparison = generatePrimeComparison(question, title, theme, seed);

  return {
    id: generateId(),
    question,
    title,
    description,
    sections,
    timeline,
    createdAt: Date.now(),
    parameters,
    primeComparison,
  };
}

/**
 * Generate deeper, expanded content for a section.
 */
export function generateDeeperContent(question: string, section: RealitySection): string {
  const seed = hashString(question + section.id + section.title);
  const { theme, keywords } = detectTheme(question);
  const keyPhrases = extractKeyPhrases(question);
  const combinedKeywords = [...keyPhrases, ...keywords];

  const template = pickFromArray(deeperContentTemplates, seed);
  return template.generate(question, theme, combinedKeywords);
}

/**
 * Generate a new reality branching from an existing one with an additional question/twist.
 */
export function generateBranch(originalReality: Reality, newQuestion: string): Reality {
  const seed = hashString(originalReality.question + newQuestion);
  const { theme, keywords } = detectTheme(newQuestion, originalReality.parameters?.civilizationVector);
  const combinedKeywords = [...extractKeyPhrases(newQuestion), ...keywords];

  // Base new reality from newQuestion with inherited or mutated parameters
  const branchBase = generateReality(newQuestion, originalReality.parameters);

  // Prepend branch intro to divergence
  const branchIntroTemplate = pickFromArray(branchIntroTemplates, seed);
  const branchIntro = branchIntroTemplate.generate(newQuestion, theme, combinedKeywords);

  const branchedSections = branchBase.sections.map((sec) => {
    if (sec.type === 'divergence') {
      return {
        ...sec,
        title: `Branch Divergence: ${sec.title}`,
        content: `${branchIntro}\n\n${sec.content}`,
      };
    }
    return sec;
  });

  const forkEvent: TimelineEvent = {
    id: generateId(),
    year: 'Fork Epoch',
    title: `The Branching Point: ${originalReality.title}`,
    description: `A secondary bifurcation occurs as "${newQuestion}" alters the trajectory established by the parent reality.`,
    branchId: originalReality.id,
  };

  const branchedTimeline: TimelineEvent[] = [
    forkEvent,
    ...branchBase.timeline.map((event) => ({
      ...event,
      branchId: originalReality.id,
    })),
  ];

  return {
    ...branchBase,
    id: generateId(),
    question: newQuestion,
    title: `Bifurcation: ${branchBase.title}`,
    description: `A branched continuity extending from "${originalReality.title}". ${branchBase.description}`,
    parentId: originalReality.id,
    branchQuestion: newQuestion,
    sections: branchedSections,
    timeline: branchedTimeline,
    createdAt: Date.now(),
    parameters: originalReality.parameters,
  };
}

/**
 * Generate a collision narrative when two alternate realities collide.
 */
export function generateCollision(reality1: Reality, reality2: Reality): CollisionResult {
  const seed = hashString(reality1.id + reality2.id);
  const t1 = detectTheme(reality1.question).theme;
  const t2 = detectTheme(reality2.question).theme;

  const template = pickFromArray(collisionTemplates, seed);

  const title = template.title(reality1.title, reality2.title);
  const description = template.description(reality1.question, reality2.question, t1, t2);

  const c1 = template.consequence(reality1.question, reality2.question);
  const c2 = pickFromArray(consequenceTemplates, seed + 13).generate(reality1.question, t1, []);
  const c3 = pickFromArray(consequenceTemplates, seed + 29).generate(reality2.question, t2, []);

  const consequences = [
    c1,
    `Inter-universal interference: ${c2}`,
    `Resonant feedback: ${c3}`,
  ];

  const paradox = template.paradox(reality1.question, reality2.question);

  return {
    id: generateId(),
    reality1Id: reality1.id,
    reality2Id: reality2.id,
    title,
    description,
    consequences,
    paradox,
    createdAt: Date.now(),
  };
}

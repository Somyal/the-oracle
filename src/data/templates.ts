// ── The Oracle Template Engine ────────────────────────────────────────────────
// Rich content generation templates that power alternate reality creation
// without any external API dependency.

export interface ThemeKeywords {
  theme: string;
  keywords: string[];
}

export interface SectionTemplate {
  generate: (question: string, theme: string, keywords: string[]) => string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEMES
// ═══════════════════════════════════════════════════════════════════════════════

export const themes: ThemeKeywords[] = [
  {
    theme: 'technology',
    keywords: ['internet', 'computer', 'digital', 'machine', 'robot', 'ai', 'artificial', 'code', 'software', 'device', 'electric', 'electronic', 'phone', 'tech', 'invent', 'innovation', 'circuit', 'data', 'algorithm', 'automat'],
  },
  {
    theme: 'nature',
    keywords: ['fire', 'water', 'earth', 'plant', 'animal', 'forest', 'ocean', 'river', 'mountain', 'weather', 'climate', 'ecosystem', 'tree', 'flower', 'wilderness', 'rain', 'sun', 'wind', 'photosynthes', 'evolv', 'evolution', 'species', 'moon', 'star'],
  },
  {
    theme: 'society',
    keywords: ['people', 'human', 'civilization', 'culture', 'language', 'speak', 'talk', 'communicate', 'lie', 'truth', 'law', 'govern', 'politic', 'war', 'peace', 'nation', 'country', 'city', 'community', 'social', 'class', 'money', 'econom', 'trade', 'religion'],
  },
  {
    theme: 'physics',
    keywords: ['gravity', 'light', 'speed', 'time', 'space', 'dimension', 'quantum', 'atom', 'energy', 'force', 'mass', 'particle', 'wave', 'relativity', 'entropy', 'matter', 'universe', 'cosmos', 'physics', 'magnet'],
  },
  {
    theme: 'biology',
    keywords: ['body', 'brain', 'cell', 'dna', 'gene', 'aging', 'age', 'death', 'life', 'birth', 'disease', 'health', 'organ', 'blood', 'immune', 'virus', 'bacteria', 'muscle', 'bone', 'sleep', 'eat', 'food', 'digest', 'breath'],
  },
  {
    theme: 'consciousness',
    keywords: ['mind', 'thought', 'dream', 'memory', 'memories', 'conscious', 'aware', 'feel', 'emotion', 'soul', 'spirit', 'perceive', 'perception', 'sense', 'imagine', 'intelligence', 'wisdom', 'know', 'understand', 'reason', 'think'],
  },
  {
    theme: 'communication',
    keywords: ['language', 'word', 'speak', 'write', 'read', 'symbol', 'sign', 'message', 'translate', 'voice', 'listen', 'hear', 'story', 'narrative', 'book', 'text', 'alphabet', 'tongue', 'dialect', 'express'],
  },
  {
    theme: 'governance',
    keywords: ['govern', 'rule', 'king', 'queen', 'president', 'democracy', 'law', 'justice', 'power', 'authority', 'freedom', 'rights', 'state', 'empire', 'republic', 'vote', 'elect', 'constitution', 'court', 'parliament'],
  },
  {
    theme: 'time',
    keywords: ['time', 'past', 'future', 'present', 'history', 'era', 'century', 'year', 'moment', 'eternal', 'forever', 'temporal', 'clock', 'calendar', 'age', 'epoch', 'ancient', 'modern', 'tomorrow', 'yesterday'],
  },
  {
    theme: 'space',
    keywords: ['space', 'planet', 'star', 'galaxy', 'universe', 'cosmos', 'orbit', 'asteroid', 'comet', 'moon', 'mars', 'venus', 'jupiter', 'solar', 'extraterrestrial', 'alien', 'rocket', 'satellite', 'nebula', 'void', 'habitable'],
  },
  {
    theme: 'identity',
    keywords: ['self', 'identity', 'person', 'individual', 'name', 'face', 'mirror', 'reflection', 'who', 'being', 'exist', 'existence', 'purpose', 'meaning', 'fate', 'destiny', 'choice', 'decision', 'free will', 'parallel'],
  },
];

// Helper to extract the core concept from a "What if..." question
function extractConcept(question: string): string {
  return question
    .replace(/^what\s+if\s+/i, '')
    .replace(/\?$/, '')
    .trim();
}

function extractSubject(question: string): string {
  const concept = extractConcept(question);
  const words = concept.split(/\s+/).slice(0, 4);
  return words.join(' ');
}

// ═══════════════════════════════════════════════════════════════════════════════
// DIVERGENCE TEMPLATES — "The Point of Departure"
// ═══════════════════════════════════════════════════════════════════════════════

export const divergenceTemplates: SectionTemplate[] = [
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The divergence begins not with a bang but with an absence — a single thread pulled from the fabric of ${theme}. Imagine the moment ${concept}: the ripple would begin small, almost imperceptible, like a single wrong note in a symphony that the audience doesn't notice until the entire melody has shifted. Historians in this alternate timeline would argue endlessly about the exact moment everything changed, never agreeing because the truth is more unsettling — it was always going to diverge here. The laws of cause and effect didn't break; they simply followed a different conductor.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Picture a world where the fundamental assumption about ${theme} was inverted from the very start. The divergence point — the moment ${concept} — would not have felt revolutionary to those living through it. They would have considered it as natural as breathing, as obvious as sunrise. It's only from our vantage point, peering across the membrane between realities, that we can see how profoundly this single change rewrote the grammar of existence. Every subsequent innovation, every war, every love story would carry the DNA of this alteration.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `There is a specific heartbeat in the chest of history where ${concept}. In our timeline, that heartbeat continued its familiar rhythm. But in the alternate world, it skipped — and the skip became a new rhythm entirely. The fascinating aspect of this ${theme}-altering divergence is its cascading nature: the first generation would barely notice, the second would begin to adapt, and by the third, the old reality would be as incomprehensible as a foreign language written in colors instead of letters.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The fork in reality's road appears precisely where you'd least expect it. When ${concept}, the change wouldn't manifest in the grand halls of power or the laboratories of ${theme} — it would first show itself in the smallest gestures of daily life. A mother's morning routine, altered. A child's first question about the world, fundamentally different. A farmer looking at the horizon and seeing not what we see, but something that our language doesn't even have a word for. The divergence is intimate before it is historical.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Every universe balances on a knife's edge, and in this one, the blade tilted the moment ${concept}. The physics of ${theme} didn't change — the context did. It's the difference between a river that carves through limestone and one that meets granite: same water, same gravity, utterly different canyons. Our version of history is not the "correct" one; it's merely the one where this particular knife fell to this particular side. The alternate version has equal claim to inevitability.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Trace the lineage of every assumption you hold about ${theme}, and you'll find they all converge at a single ancestor: a moment that could have gone differently. In this alternate reality, ${concept}, and that ancestral moment birthed an entirely different family of truths. The remarkable thing is not how different this world would be, but how internally consistent it would remain. Alternate realities don't produce chaos — they produce different kinds of order, equally elegant, equally convinced of their own necessity.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Consider the archaeology of a never-world. If ${concept}, then every artifact of this alternate civilization would tell a story we can almost but not quite understand. Their tools would look wrong to our eyes. Their art would move us in ways we couldn't articulate. The divergence point in ${theme} would have created not just different outcomes but different categories of outcome — possibilities that our reality doesn't have the conceptual vocabulary to describe, like trying to explain color to a species that sees only in sound.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The moment of departure is deceptively quiet. When ${concept}, the universe didn't announce the split with thunder or light. It simply... continued, but along a different gradient. Scholars of ${theme} in that world would develop theories that mirror ours in structure but diverge wildly in content. They would have their own Newton, their own Einstein — brilliant minds arriving at brilliant conclusions that happen to be true only in their branch of reality. The divergence is not just in events, but in what counts as knowledge itself.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// NEW WORLD TEMPLATES — "A World Rewritten"
// ═══════════════════════════════════════════════════════════════════════════════

export const newWorldTemplates: SectionTemplate[] = [
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The world that emerges from this divergence is recognizable but uncanny, like a house where every piece of furniture has been moved three inches to the left. The skyline of cities would differ — not dramatically, but in the philosophy encoded in their architecture. If ${concept}, then the very way humans organize space, allocate resources, and define beauty would follow a different aesthetic logic. The streets would tell a different story about what ${theme} means to a civilization that never questioned its altered foundation.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Walk through the markets of this alternate Earth and you'd feel it before you understood it — a subtle wrongness in the rhythm of commerce, conversation, and daily ritual. Because ${concept}, the economy of attention itself would be restructured. What people value, what they trade, what they hoard and what they discard — all of it would be filtered through a ${theme} framework that our world never developed. The currencies might look similar, but they'd measure entirely different forms of wealth.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `In this rewritten world, children would be taught a different creation myth — not of gods and void, but of ${theme} and the pivotal truth that ${concept}. Their textbooks would contain diagrams we'd find either laughably wrong or terrifyingly insightful. Their science would have solved problems we haven't yet imagined while remaining blind to challenges we consider elementary. It's not a better or worse world — it's an orthogonal one, approaching the same universe from an angle we never thought to try.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The geography of power would shift like tectonic plates. If ${concept}, the nations that rose to prominence in our timeline might never coalesce, while regions we consider peripheral could become the beating heart of civilization. The ${theme}-driven logic of this world would favor different climates, different resources, different strategic advantages. Empires would rise along fault lines we can barely perceive, and the map of the world — both literal and metaphorical — would be drawn by hands guided by entirely different ambitions.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Perhaps most striking is how love would work in this world. If ${concept}, the rituals of courtship, the definitions of family, the very neurochemistry of attachment might follow altered pathways. ${theme} shapes not just what we build but who we become, and in this reality, personhood itself would carry a different weight. People would fall in love for reasons we'd find either deeply moving or entirely alien — and their heartbreaks would be over losses we can't even name.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The technology of this world wouldn't just differ in design — it would differ in intent. Because ${concept}, the problems that engineers and inventors sought to solve would reflect a completely different hierarchy of needs. The ${theme} paradigm would have pushed innovation down corridors our world left unexplored. They might have mastered challenges in energy or medicine that baffle us, while never developing tools we consider basic. Their smartphones — if such a concept even existed — would be designed to optimize for something other than what we think matters.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The religions of this world would worship different mysteries. If ${concept}, the fundamental questions that haunt human consciousness — Why are we here? What happens after death? What is good? — would produce different answers, not because the divine changed, but because the lens of ${theme} would refract meaning differently. Their temples would face different directions. Their prayers would ask for different things. Their sins would be virtues in our world, and our certainties would be their heresies.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Food tells the deepest truth about a civilization, and in this world, the table would be set with unfamiliar intentions. Because ${concept}, agriculture, cuisine, and the social rituals of eating would develop along pathways shaped by the altered logic of ${theme}. The spices they prize, the animals they domesticate, the meals they share on holidays — all would reflect a world that metabolizes reality through a different digestive system. You could trace the entire alternate history of this civilization through a single dinner menu.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CONSEQUENCE TEMPLATES — "The Ripple Effects"
// Each returns ONE consequence paragraph
// ═══════════════════════════════════════════════════════════════════════════════

export const consequenceTemplates: SectionTemplate[] = [
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The global balance of power would undergo a seismic recalibration. Nations that thrived on the old assumptions of ${theme} would find their foundations eroding, while previously marginal civilizations — those whose cultures happened to align with the new reality where ${concept} — would rise to sudden and bewildering prominence. Alliances would shatter and reform along lines that our geopoliticians couldn't predict.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The economic implications would cascade through every market, every currency, every handshake deal in a dusty shop. If ${concept}, the very concept of scarcity — the engine of all economics — would be redefined. What's rare in our world might be abundant in theirs. What we discard, they might treasure. The ${theme} shift would create entirely new industries while rendering others not just obsolete but incomprehensible.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Education would be unrecognizable. The curricula taught in schools would prioritize knowledge our world considers trivial while ignoring fields we deem essential. If ${concept}, children would grow up with different cognitive tools, different problem-solving instincts, different definitions of intelligence itself. The ${theme}-informed pedagogy of this world would produce minds that excel in domains we haven't even mapped.`;
    },
  },
  {
    generate: (q, _theme) => {
      const concept = extractConcept(q);
      return `Art would transform in ways both obvious and profoundly subtle. The great masterpieces of this world would hang in museums we'd find disorienting — not because the art lacks beauty, but because it optimizes for a beauty we haven't learned to see. If ${concept}, the emotional vocabulary available to artists would include colors, sounds, and textures that our reality's palette simply doesn't contain. Their Shakespeare would write about struggles we've never named.`;
    },
  },
  {
    generate: (q, _theme) => {
      const concept = extractConcept(q);
      return `The legal and ethical frameworks of society would twist into unfamiliar shapes. If ${concept}, the crimes that terrify this world and the virtues it celebrates would reflect a moral compass calibrated to a different magnetic north. Their courts would debate precedents we'd find absurd. Their prisons would punish acts we consider harmless. Their heroes would be people who, in our world, would pass through life entirely unremarked.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Medicine would evolve along a parallel track, solving some of humanity's greatest health challenges while remaining blind to others. Because ${concept}, the diseases they fear, the treatments they trust, and the definitions of "wellness" itself would be shaped by a ${theme} framework foreign to our own. They might cure cancers we struggle with while being ravaged by conditions we've long since conquered.`;
    },
  },
  {
    generate: (q, _theme) => {
      const concept = extractConcept(q);
      return `The psychological landscape of humanity would be altered at the deepest level. The anxieties, desires, and dreams that define the human interior would reconfigure themselves around this new reality. If ${concept}, the collective unconscious — that shared substrate of myth and symbol — would populate itself with different archetypes, different monsters, different visions of paradise. Therapy in this world would treat wounds we've never suffered.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Warfare — if it existed at all — would be fought over different resources, with different weapons, for different definitions of victory. The ${theme} transformation triggered when ${concept} would redefine what's worth fighting for. Borders would be drawn around assets we don't value. Treaties would protect rights we haven't conceived. The generals of this world would study battlefields that look, to our eyes, like gardens or libraries.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The environment would bear different scars and different gardens. If ${concept}, humanity's relationship with the planet — the resources extracted, the ecosystems disrupted, the landscapes cherished — would reflect a ${theme}-shaped set of priorities. The forests they preserve and the rivers they dam would tell a story of a species that made a different bargain with the Earth, for better or worse.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Transportation and the concept of distance itself would transform. Because ${concept}, the incentives to connect distant places — or to remain isolated — would follow the logic of ${theme} rather than our own. Their roads might lead to destinations we'd never think to visit. Their ships might sail waters we consider unremarkable. The map of human movement would trace a different nervous system across the body of the Earth.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Social hierarchies would crystallize around different axes of power. If ${concept}, the traits that grant status, the skills that command respect, the bloodlines or achievements that open doors — all would be reshuffled by the ${theme} paradigm. Their aristocracies would be built on foundations we'd find either inspiring or horrifying, and their underclasses would be defined by deficiencies we don't even have a word for.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Communication itself would carry different freight. If ${concept}, the languages that evolved — their grammars, their idioms, their silences — would encode a different model of reality. The metaphors that shape everyday thought would draw from a ${theme}-altered reservoir of experience. Their word for "freedom" would mean something subtly but crucially different from ours, and their word for "love" would encompass feelings we've never isolated.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HUMAN ELEMENT TEMPLATES — "The Human Cost"
// ═══════════════════════════════════════════════════════════════════════════════

export const humanElementTemplates: SectionTemplate[] = [
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Behind every grand historical shift are the quiet tragedies and unexpected joys of individual lives. In a world where ${concept}, consider the woman who would have been a physicist in our timeline but here becomes something our vocabulary can't name — a practitioner of a discipline that exists only because ${theme} bent differently. Her brilliance is equal; her discoveries are orthogonal. She dies celebrated in her world, unknown in ours, and the loss — or the gain — is impossible to calculate.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The children born into this world would never know what they were missing — and that is perhaps the most human thing about alternate realities. A boy growing up where ${concept} would develop fears and hopes calibrated to his ${theme}-shaped environment. His nightmares would contain monsters we don't dream of. His first love would be complicated by factors we've never considered. He would be fully, recognizably human, and yet a stranger to us in ways that would break your heart if you could see them clearly.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `There would be a generation caught in the transition — the last people who remember the old way, if such a way ever existed. These liminal humans, straddling the boundary where ${concept} changed everything about ${theme}, would carry a particular kind of sorrow: the knowledge that they are becoming obsolete not because they failed, but because reality itself moved on. Their memoirs, if they wrote them, would read like letters from a country that no longer appears on any map.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The artists of this world would be our most reliable witnesses. In a reality where ${concept}, the painters, poets, and musicians would channel the anxieties and ecstasies of ${theme}-altered existence into works that we'd find hauntingly almost-familiar. Their greatest novel would tell a love story we nearly understand. Their most famous painting would depict a landscape we almost recognize. The "almost" is where the entire tragedy and beauty of alternate existence lives.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Grief would taste different here. In a world where ${concept}, what people mourn — the forms that loss takes, the rituals of remembrance, the slow work of healing — would follow a ${theme}-informed grammar of suffering. They would weep at funerals for reasons beyond death itself. They would celebrate births with an undertone of fear we wouldn't recognize. The emotional palette of this world is complete but shifted, like familiar music played in a key that doesn't exist in our scale.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Think of the friendships. In a reality where ${concept}, the very basis of human connection — what makes someone trustworthy, what makes someone interesting, what makes someone worth crossing a room to talk to — would be shaped by ${theme} in ways both subtle and profound. Their friendships might be deeper than ours in dimensions we can't perceive, while missing entire registers of intimacy that we take for granted. To be human here is to be human differently.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `An old man in this world would sit in a chair that looks almost like ours and stare out a window at a sky that's the same color but somehow means something different. His life, spent in a reality where ${concept}, has given him wisdom that we would find either profound or incomprehensible. He knows things about ${theme} that no one in our world has ever needed to learn. His regrets are alien to us. His peace is earned from struggles we can't imagine. And yet, when he smiles, we recognize it.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The rebels of this world — those who push against the status quo — would fight for causes that seem bizarre or visionary to us. If ${concept}, the injustices that ignite revolution would be woven into the ${theme} fabric of daily life in ways our activists have never encountered. Their protest signs would bear slogans we'd need a translator and a philosopher to decode. Their martyrs would die for freedoms we already have, or for freedoms we haven't yet imagined needing. The courage, however, would be immediately and universally recognizable.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// PARADOX TEMPLATES — "The Paradox Within"
// ═══════════════════════════════════════════════════════════════════════════════

export const paradoxTemplates: SectionTemplate[] = [
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Here is the paradox that haunts this alternate reality like a ghost in the walls: if ${concept}, then the very tools we use to imagine this scenario could never have been developed. The ${theme}-dependent chain of causation that produced speculative thought, counterfactual reasoning, and the philosophical luxury of asking "what if" might never have formed. We can only imagine this world because we live in the one where it didn't happen — and they can never imagine ours for the same reason.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The deepest paradox is one of identity. If ${concept}, would "you" still exist? Not your body — bodies are interchangeable assemblies of atoms — but the specific sequence of experiences, choices, and accidents that produced your consciousness. The ${theme} shift would alter the probability landscape so thoroughly that the particular chain of events leading to your birth becomes vanishingly unlikely. You are contemplating a world that, by its very nature, cannot contemplate you back.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `There's a serpent eating its own tail at the heart of this reality. If ${concept}, the resulting ${theme} paradigm would likely produce a civilization that eventually asks its own "what if" — and the world they imagine as their alternate reality would be something close to ours. We are each other's impossible dreams, each other's roads not taken. The paradox isn't that alternate realities might exist; it's that they might be dreaming of us just as we dream of them.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Consider the paradox of progress. If ${concept}, this world might have advanced beyond us in certain dimensions of ${theme} while remaining primitive in others. But "advanced" and "primitive" are judgments made from within a paradigm — they have no meaning from outside it. Their greatest achievement might look like our greatest failure. The paradox is that there is no neutral ground from which to compare realities; every observation is contaminated by the observer's universe.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The information paradox cuts deepest. If ${concept}, then the total information content of this reality — every book, every equation, every whispered secret — would be neither a subset nor a superset of our own. It would be a differently-shaped container holding a differently-shaped volume of knowledge. Some truths would be shared across realities like constants in an equation. Others would be as incompatible as oil and water. The paradox of ${theme} is that truth itself becomes relative without becoming less true.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Here is the temporal paradox: if ${concept}, was the change always inevitable, or did it require a conscious choice? If inevitable, then free will is an illusion in both realities — we are all just dominoes falling in different patterns. If it required a choice, then somewhere in the past, a single consciousness held the fate of two entire realities in its hands and chose without knowing it. Both answers are terrifying. Both are beautiful. Neither can be proven from inside either ${theme} paradigm.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The moral paradox is inescapable. If ${concept}, some people who suffered in our world would thrive in that one — and vice versa. The ${theme} shift doesn't redistribute suffering; it redefines it. A world that spares one group inevitably creates pressures on another. The paradox is that there may be no possible reality — no arrangement of physics, biology, and ${theme} — where suffering is eliminated rather than merely redesigned. Every utopia is someone else's dystopia, viewed from a different angle.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Perhaps the strangest paradox is the paradox of meaning. If ${concept}, the inhabitants of that ${theme}-altered world would find their lives just as meaningful as we find ours. Their joy would be just as real, their suffering just as acute, their love just as desperate and luminous. If meaning is invented rather than discovered, then every reality is equally meaningful and equally arbitrary. We are all making it up — but the making-up is the most real thing about us. The paradox is that fiction and reality may be distinguished only by consensus.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// FUTURE TEMPLATES — "Looking Ahead"
// ═══════════════════════════════════════════════════════════════════════════════

export const futureTemplates: SectionTemplate[] = [
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Project this reality forward a thousand years and you see something extraordinary: a civilization that has internalized the logic of ${concept} so completely that it has begun to reach beyond its own planet. Their space program — if they have one — wouldn't be driven by our motivations. The ${theme} paradigm that shaped their world would propel them toward different stars, different questions, different definitions of "frontier." They would carry with them a version of humanity that we'd barely recognize but couldn't help admiring.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The long arc of this reality bends toward a question that our world hasn't learned to ask yet. Because ${concept}, the accumulation of centuries of ${theme}-altered development would eventually produce a crisis — or a revelation — that has no analogue in our timeline. Their "moment of singularity" would arrive not as artificial intelligence or nuclear power but as something we lack the conceptual framework to anticipate. It would change them as profoundly as fire changed us, and it would be as natural to them as breathing.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `In the far future of this reality, the inhabitants might achieve something our world has always dreamed of but never managed: a sustainable equilibrium between civilization and the planet. Because ${concept} reshaped the foundations of ${theme}, their path to that equilibrium would follow a route we never mapped. They would make sacrifices we'd consider unbearable and receive rewards we'd consider miraculous. Their future isn't better or worse than ours — it's the answer to a question we forgot to ask.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Eventually, this alternate reality would confront the same ultimate question that faces every civilization: what is all of this for? But because ${concept} altered the ${theme} trajectory from the beginning, their answer would be different from ours. Where we might say "to understand," they might say "to connect" — or "to dissolve" or "to compose" or something that translates into our language only as a feeling, not a word. Their purpose would be as valid as ours and as impossible to prove. In the end, every reality is a different guess at the meaning of existence.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The far future holds a convergence point — a moment where this reality and ours, despite their different origins, begin to ask the same questions. If ${concept} set the ${theme} trajectory on a different course, the curvature of all possible trajectories eventually bends toward the same horizon: the limits of physics, the nature of consciousness, the possibility of other realities. In their distant future, a scientist looks up from their work and wonders, just as we do, whether somewhere out there, a different version of everything is possible. They are thinking of us without knowing it.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `What does extinction look like in this world? Because ${concept}, the existential risks they face — the things that could end their civilization — would be as different from ours as their triumphs. The ${theme} factors that protect them from our apocalyptic scenarios would simultaneously expose them to threats we've never imagined. Their survival, if they achieve it, would be a testament to a form of resilience our world never needed to develop. And if they fail, the universe would lose a version of humanity that no other reality could reproduce.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `The final chapter of this reality — written billions of years from now, when stars begin to die and entropy claims its due — would differ from ours in one crucial way. Because ${concept} launched ${theme} down a different path, the last sentient beings in this universe would carry different memories, tell different final stories, and face the darkness with a different kind of courage. The universe doesn't care which version of humanity watches its last star dim. But we do. That caring is what makes us, in every reality, irreplaceable.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Perhaps the most hopeful future for this reality is one of reunion. If the many-worlds interpretation holds, then somewhere in the vast branching tree of possibility, this timeline and ours converge again — not in events, but in understanding. Because ${concept} altered ${theme} at its root, the journey back to common ground would be long and strange. But the destination — a shared recognition of what it means to be conscious in an indifferent cosmos — might be the same. All roads lead to wonder, eventually. Even the impossible ones.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// TITLE TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

export const titleTemplates: ((question: string, theme: string) => string)[] = [
  (q, theme) => {
    const subject = extractSubject(q);
    return `The ${capitalizeWords(theme)} That Never Was: ${capitalizeWords(subject)}`;
  },
  (q) => {
    const concept = extractConcept(q);
    return `When ${capitalizeWords(truncate(concept, 6))}`;
  },
  (q) => {
    const concept = extractConcept(q);
    const firstWord = concept.split(/\s+/)[0];
    return `The ${capitalizeWords(firstWord)} Divergence`;
  },
  (_q, theme) => {
    return `A World Without Certainty: The ${capitalizeWords(theme)} Fracture`;
  },
  (q) => {
    const concept = extractConcept(q);
    return `Through the Lens of ${capitalizeWords(truncate(concept, 5))}`;
  },
  (_q, theme) => {
    return `The Alternate ${capitalizeWords(theme)} Theorem`;
  },
  (q) => {
    const concept = extractConcept(q);
    return `Reality Refracted: ${capitalizeWords(truncate(concept, 5))}`;
  },
  (q, _theme) => {
    const concept = extractConcept(q);
    const keyword = concept.split(/\s+/).find(w => w.length > 4) || concept.split(/\s+/)[0];
    return `The ${capitalizeWords(keyword)} Paradox`;
  },
  (q) => {
    const concept = extractConcept(q);
    return `What Became of ${capitalizeWords(truncate(concept, 4))}`;
  },
  (_q, theme) => {
    return `Echoes of an Alternate ${capitalizeWords(theme)}`;
  },
  (q) => {
    const concept = extractConcept(q);
    return `The World Where ${capitalizeWords(truncate(concept, 5))}`;
  },
  (_q, theme) => {
    return `${capitalizeWords(theme)}'s Other Path`;
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// DESCRIPTION TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

export const descriptionTemplates: ((question: string, theme: string) => string)[] = [
  (q, theme) => {
    const concept = extractConcept(q);
    return `An exploration of the alternate reality where ${concept}. This ${theme}-bending divergence reshapes civilization from its foundations, producing a world that mirrors our own in structure but diverges in meaning.`;
  },
  (q, theme) => {
    const concept = extractConcept(q);
    return `Peer through the membrane between worlds into a reality where ${concept}. Every assumption about ${theme} unravels, and from the loose threads, an entirely new tapestry of human experience is woven.`;
  },
  (q) => {
    const concept = extractConcept(q);
    return `A deep dive into the consequences, paradoxes, and hidden beauty of a world where ${concept}. What seems like a simple change reveals layers of complexity that challenge everything we believe about ourselves.`;
  },
  (q, theme) => {
    const concept = extractConcept(q);
    return `This reality diverges at the moment ${concept} — and from that single altered premise, an entire civilization unfolds along a ${theme} trajectory our world never explored. The results are as unsettling as they are illuminating.`;
  },
  (q, theme) => {
    const concept = extractConcept(q);
    return `What happens when you change one fundamental truth about ${theme}? When ${concept}, the cascade of consequences transforms not just history, but the very nature of human consciousness, love, and purpose.`;
  },
  (q) => {
    const concept = extractConcept(q);
    return `In this alternate timeline, ${concept}. Follow the thread from the point of divergence through centuries of consequence, uncovering a world that is at once alien and achingly familiar.`;
  },
  (q, theme) => {
    const concept = extractConcept(q);
    return `A reality where ${concept}. The ${theme} implications alone would fill libraries — but it's the human stories, the quiet revolutions of daily life, that make this alternate world truly extraordinary.`;
  },
  (q, theme) => {
    const concept = extractConcept(q);
    return `Step into the looking glass. Here, ${concept}, and the world of ${theme} obeys different rules. But look closer, and you'll find the same human heart beating beneath a different sky.`;
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// TIMELINE EVENT TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

export interface TimelineTemplate {
  title: (question: string, theme: string) => string;
  description: (question: string, theme: string) => string;
}

export const timelineTemplates: TimelineTemplate[] = [
  {
    title: (_q, theme) => `The First ${capitalizeWords(theme)} Awakening`,
    description: (q, theme) => {
      const concept = extractConcept(q);
      return `The earliest recorded consequences of ${concept} begin to manifest. ${capitalizeWords(theme)} scholars document the first observable differences from what might have been, though they cannot know the road not taken.`;
    },
  },
  {
    title: () => 'The Silent Revolution',
    description: (q) => {
      const concept = extractConcept(q);
      return `Without fanfare or declaration, daily life begins to reshape itself around the reality that ${concept}. The changes are too gradual for any single generation to notice, but the cumulative effect is staggering.`;
    },
  },
  {
    title: () => 'The Great Reckoning',
    description: (q, theme) => {
      const concept = extractConcept(q);
      return `A crisis forces civilization to confront the full implications of a world where ${concept}. The old frameworks of ${theme} prove inadequate, and a new intellectual movement emerges from the ashes of certainty.`;
    },
  },
  {
    title: (_q, theme) => `The ${capitalizeWords(theme)} Renaissance`,
    description: (q) => {
      const concept = extractConcept(q);
      return `A golden age of creativity and discovery erupts as humanity fully embraces the possibilities inherent in a world where ${concept}. Art, science, and philosophy flourish in directions our world never explored.`;
    },
  },
  {
    title: () => 'The Fracture',
    description: (q, theme) => {
      const concept = extractConcept(q);
      return `Civilization splits along ideological fault lines created by the reality that ${concept}. Two distinct philosophies of ${theme} emerge, each claiming to be the true inheritor of humanity's potential. The schism will define centuries.`;
    },
  },
  {
    title: () => 'The Age of Integration',
    description: (q, theme) => {
      const concept = extractConcept(q);
      return `After generations of conflict, a synthesis emerges that reconciles the divergent paths. The understanding that ${concept} is neither curse nor blessing — but simply the shape of their reality — becomes the foundation of a new era of ${theme}.`;
    },
  },
  {
    title: () => 'The Quiet Breakthrough',
    description: (q) => {
      const concept = extractConcept(q);
      return `A seemingly minor discovery reveals that the world where ${concept} contains possibilities no one had anticipated. The breakthrough is quiet because it is so fundamental — it changes not what people do, but what they believe is possible.`;
    },
  },
  {
    title: () => 'The Long Horizon',
    description: (q, theme) => {
      const concept = extractConcept(q);
      return `Humanity turns its gaze to the far future, contemplating what a civilization built on the foundation of ${concept} might achieve across millennia. The ${theme} projections are both terrifying and magnificent in their scope.`;
    },
  },
  {
    title: (_q, theme) => `The ${capitalizeWords(theme)} Collapse`,
    description: (q) => {
      const concept = extractConcept(q);
      return `An unforeseen consequence of ${concept} pushes a major system to its breaking point. What follows is not destruction but transformation — the old order dissolves and something stranger, perhaps something better, begins to crystallize.`;
    },
  },
  {
    title: () => 'The Bridge Between Worlds',
    description: (q, theme) => {
      const concept = extractConcept(q);
      return `For the first time, thinkers in this reality begin to suspect that their world is not the only possible one. The ${theme} implications of ${concept} lead them to theorize about alternate timelines — including, impossibly, something very close to ours.`;
    },
  },
  {
    title: () => 'The Children of the New Order',
    description: (q) => {
      const concept = extractConcept(q);
      return `The first generation born into full acceptance of ${concept} comes of age. They carry none of the baggage of transition, none of the nostalgia for what might have been. They are native to this reality, and their innovations stagger even the architects of the change.`;
    },
  },
  {
    title: () => 'The Impossible Discovery',
    description: (q, theme) => {
      const concept = extractConcept(q);
      return `Researchers stumble upon a phenomenon that should not exist according to the established laws of their ${theme}-altered world. The discovery hints that ${concept} may have consequences reaching far beyond what anyone imagined — perhaps beyond the boundaries of their universe itself.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// COLLISION TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

export interface CollisionTemplate {
  title: (r1Title: string, r2Title: string) => string;
  description: (r1Question: string, r2Question: string, theme1: string, theme2: string) => string;
  consequence: (r1Question: string, r2Question: string) => string;
  paradox: (r1Question: string, r2Question: string) => string;
}

export const collisionTemplates: CollisionTemplate[] = [
  {
    title: (r1, r2) => `The Convergence: ${truncate(r1, 3)} Meets ${truncate(r2, 3)}`,
    description: (q1, q2, t1, t2) => {
      const c1 = extractConcept(q1);
      const c2 = extractConcept(q2);
      return `Two impossible realities collapse into each other. In one world, ${c1}. In another, ${c2}. When the membrane between these ${t1}-and-${t2}-altered realities dissolves, the resulting hybrid universe inherits the contradictions of both — and the contradictions are magnificent.`;
    },
    consequence: (q1, q2) => {
      const c1 = extractConcept(q1);
      const c2 = extractConcept(q2);
      return `The combined reality creates conditions where both ${c1} and ${c2} are simultaneously true, forcing physics, biology, and culture to accommodate paradoxes that neither world alone had to face.`;
    },
    paradox: (q1, q2) => {
      const c1 = extractConcept(q1);
      const c2 = extractConcept(q2);
      return `If ${c1} and ${c2} are both true, then the very framework of cause and effect that makes either scenario coherent begins to dissolve. The collision doesn't produce a third reality — it produces a question mark the size of a universe.`;
    },
  },
  {
    title: (r1, r2) => `When Worlds Collide: ${truncate(r1, 3)} × ${truncate(r2, 3)}`,
    description: (q1, q2, t1, t2) => {
      const c1 = extractConcept(q1);
      const c2 = extractConcept(q2);
      return `Imagine the shockwave when a universe where ${c1} crashes into one where ${c2}. The ${t1} assumptions of the first world are as alien to the second as ${t2} fundamentals are to the first. The collision doesn't destroy either reality — it creates a liminal space where both coexist in impossible, beautiful tension.`;
    },
    consequence: (q1, q2) => {
      const c1 = extractConcept(q1);
      const c2 = extractConcept(q2);
      return `Inhabitants of the merged reality find themselves with double memories — a life where ${c1} and a life where ${c2}, superimposed like two photographs printed on the same paper. Identity becomes a negotiation between incompatible histories.`;
    },
    paradox: (q1, q2) => {
      const c1 = extractConcept(q1);
      const c2 = extractConcept(q2);
      return `The deepest paradox of this collision is that each reality contains evidence that the other is impossible. To accept both ${c1} and ${c2} requires abandoning the logical framework that either world depends upon — and yet both continue to function. Logic, it seems, is more flexible than logicians.`;
    },
  },
  {
    title: (r1, r2) => `${truncate(r1, 3)}: The ${truncate(r2, 3)} Interference`,
    description: (q1, q2, t1, t2) => {
      const c1 = extractConcept(q1);
      const c2 = extractConcept(q2);
      return `Reality interference patterns emerge when the world of ${c1} bleeds into the world of ${c2}. Like two waves passing through each other, the ${t1} and ${t2} paradigms create zones of constructive and destructive interference — places where both realities are amplified and places where both are cancelled out, leaving only raw, unformed potential.`;
    },
    consequence: (q1, q2) => {
      const c1 = extractConcept(q1);
      const c2 = extractConcept(q2);
      return `New forms of life, thought, and experience emerge in the interference zones — hybrid entities that could not exist in either reality alone. The collision of ${c1} with ${c2} creates ecological niches in the fabric of spacetime that evolution rushes to fill.`;
    },
    paradox: (q1, q2) => {
      const c1 = extractConcept(q1);
      const c2 = extractConcept(q2);
      return `The interference paradox: in the zones where ${c1} and ${c2} cancel each other out, what remains? Not our reality — not any reality we can name. The collision reveals that beneath all alternate timelines, there may be a substrate of pure unrealized possibility, and it is neither empty nor full. It is waiting.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// DEEPER CONTENT TEMPLATES — for expanding sections
// ═══════════════════════════════════════════════════════════════════════════════

export const deeperContentTemplates: SectionTemplate[] = [
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Digging deeper into the implications, we uncover layers that the surface analysis only hinted at. The reality where ${concept} doesn't just alter ${theme} — it fundamentally rewires the relationship between individual consciousness and collective experience. Consider the feedback loops: each person shaped by this world shapes it in return, creating a recursive spiral of adaptation that, over centuries, produces a civilization so internally consistent that its inhabitants would find our world as alien as we find theirs. The details are where the magic lives.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `What's often overlooked in alternate reality speculation is the second-order effects — the consequences of consequences. Because ${concept}, the first wave of changes would produce a second wave that even the first wave's architects couldn't anticipate. ${capitalizeWords(theme)} systems are nonlinear; small changes amplify in unpredictable ways. By the time the third and fourth waves arrive, the world has become something that no one — in any reality — could have designed on purpose. It is emergent, organic, and hauntingly inevitable.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `There's a counter-narrative worth exploring. What if the change — ${concept} — produced resistance? Not everyone would adapt smoothly. There would be holdouts, reactionaries, communities that clung to practices and beliefs that the new ${theme} reality rendered obsolete. These friction points would be among the most human and most fascinating elements of this world. Progress in any reality is never unanimous, and the voices of dissent often carry the truths that the mainstream isn't ready to hear.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Consider the micro-scale: a single household in this reality. Morning routines, dinner conversations, the way parents explain the world to children, the games children invent, the dreams that visit in the deepest hours of sleep. Because ${concept}, every one of these intimate moments carries the fingerprint of the ${theme} divergence. The texture of daily life — the part that history books always leave out — is where the true weight of an alternate reality is felt. Not in the headlines, but in the silence between heartbeats.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `Let's follow the thread to its most extreme logical conclusion. If ${concept}, and if we extrapolate the ${theme} trajectory without restraint, where does this world end up in ten thousand years? In a million? The answer reveals something uncomfortable about all realities, including our own: given enough time, every civilization either transcends its origins entirely or becomes a monument to its own assumptions. There is no middle ground. The question is not whether this world is possible — it's whether it's sustainable. And the answer tells us as much about ourselves as about them.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// BRANCH TEMPLATES — for reality branches
// ═══════════════════════════════════════════════════════════════════════════════

export const branchIntroTemplates: SectionTemplate[] = [
  {
    generate: (q, theme, keywords) => {
      const concept = extractConcept(q);
      return `This reality branches from an already-altered world, creating a second-order divergence that compounds the original's strangeness. Where the parent reality asked one impossible question, this branch asks another on top of it: what if, within a world where ${keywords[0] || theme} was already transformed, ${concept}? The resulting reality is not doubly different — it's exponentially different, each alteration amplifying the other in ways that produce something genuinely unprecedented.`;
    },
  },
  {
    generate: (q, theme) => {
      const concept = extractConcept(q);
      return `A branch grows from an already-bent tree. This reality inherits all the accumulated strangeness of its parent timeline and then adds its own mutation: ${concept}. The ${theme} implications don't merely add up — they multiply, interact, and hybridize. What emerges is a world that neither the original question nor this new one could have produced alone. It is the child of two impossibilities, and it is more possible than either parent.`;
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

function truncate(str: string, wordCount: number): string {
  const words = str.split(/\s+/);
  if (words.length <= wordCount) return str;
  return words.slice(0, wordCount).join(' ') + '…';
}

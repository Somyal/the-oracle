import type { Reality } from '../types';

export const seedRealities: Reality[] = [
  {
    id: 'seed-reality-gravity',
    question: 'What if gravity disappeared for one minute every day?',
    title: 'The Suspended Minute: The Architecture of Untethered Earth',
    description:
      'Every day at an astronomically calculated interval, Earth slips its gravitational moorings for precisely sixty seconds. Civilization has rebuilt its entire architecture, culture, and concept of mortality around the inevitable daily float.',
    createdAt: Date.now() - 86400000 * 3, // 3 days ago
    saved: true,
    customName: 'The Suspended Minute',
    sections: [
      {
        id: 'sec-grav-1',
        title: 'The Noon Rupture',
        type: 'divergence',
        content:
          'In the late spring of 1923, anomalous planetary oscillations fractured the gravitational constant. For sixty seconds, across every meridian simultaneously, weight vanished. Objects adrift, unmoored cathedrals of dust, and bewildered populations rising inches above cobblestones marked the dawn of the Zero Interval. What was initially feared as the prologue to planetary dissolution stabilized into an unyielding daily rhythm: sixty seconds of absolute levity every twenty-four hours.',
        expanded: true,
      },
      {
        id: 'sec-grav-2',
        title: 'The Webbed Metropolis',
        type: 'newWorld',
        content:
          'Architecture abandoned rectilinear vanity. Cities became dense tapestries of tensile netting, magnetic guide-rails, and curved ceilings padded with woven kelp and felt. The "Minute Bell" tolls three minutes prior to unanchoring, during which public transit clamps onto pneumatic rails and pedestrians clip harness carabiners to street-level brass tether lines. Dining, sports, and religious rites have evolved into three-dimensional choreography; marriages are traditionally consecrated in mid-air during the suspended minute.',
        expanded: true,
      },
      {
        id: 'sec-grav-3',
        title: 'Unexpected Cascades',
        type: 'consequences',
        content:
          'Three unforeseen phenomena redefined society: First, oceans produce a momentary tidal crest known as the "Mist Wall," reshaping maritime trade and harbor engineering. Second, fluid dynamics in human circulation during weightlessness prompted revolutionary cardiac medicine, eliminating several arterial diseases while introducing a psychological condition known as "Altitude Longing." Third, dust and atmospheric particulates migrate upward, necessitating city-wide electrostatic scrubbers that run continuously between intervals.',
        expanded: true,
      },
      {
        id: 'sec-grav-4',
        title: 'The Street Sweepers of Vienna',
        type: 'humanElement',
        content:
          'Old Lukas, a tether-warden in Vienna’s historic ring, watches the clocks with the calm devotion of a monk. When the sirens chime, he secures the school children with spring-loaded buckles. In the quiet sixty seconds of silence, as teacups drift over café tables and sparrows hover motionless without flapping their wings, he looks into the eyes of strangers floating beside him. There is an unspoken equality in weightlessness; kings and beggars tumble with the exact same slow elegance.',
        expanded: true,
      },
      {
        id: 'sec-grav-5',
        title: 'The Weight of Freedom',
        type: 'paradox',
        content:
          'If gravity is the universal constant that holds physical form together, its brief daily cessation reminds consciousness that stability is an illusion. Humanity discovered that true entrapment is not being held down, but the terror of the moment weight returns — the abrupt, unforgiving descent back to reality. Philosophers debate whether the sixty seconds is a curse of fragility or the only minute of the day when humans are truly free from the Earth.',
        expanded: true,
      },
      {
        id: 'sec-grav-6',
        title: 'The Ascendant Horizon',
        type: 'future',
        content:
          'Astrophysicists predict the daily interval may expand by milliseconds each century. Orbital space elevators, once deemed engineering impossibilities, are now constructed utilizing the daily zero-g launch window to fling payloads into orbit with a fraction of chemical fuel. Civilization stands poised on the verge of becoming truly three-dimensional, looking toward the stars not as distant lights, but as our natural destination.',
        expanded: true,
      },
    ],
    timeline: [
      {
        id: 'time-grav-1',
        year: '1923',
        title: 'The First Suspension',
        description: 'Global weightlessness strikes without warning for 60 seconds. 4,000 minor injuries, zero fatalities, and immediate scientific mobilization.',
      },
      {
        id: 'time-grav-2',
        year: '1938',
        title: 'The Geneva Tether Accord',
        description: 'International standards for public harnesses, architectural safety nets, and nautical anchoring systems are formally ratified.',
      },
      {
        id: 'time-grav-3',
        year: '1965',
        title: 'The Kinetic Renaissance',
        description: 'Acrobatic art forms and zero-gravity athletics become the defining cultural movement of the mid-20th century.',
      },
      {
        id: 'time-grav-4',
        year: '1999',
        title: 'Orbital Elevator Foundation',
        description: 'First launch-assist facility completed at Quito, using the daily window to lift orbital infrastructure cheaply.',
      },
      {
        id: 'time-grav-5',
        year: '2040',
        title: 'The Millisecond Drift',
        description: 'Precise atomic measurements confirm the interval has expanded to 60.14 seconds, prompting renewed philosophical and scientific debate.',
      },
    ],
  },
  {
    id: 'seed-reality-memories',
    question: 'What if memories could be transferred between people?',
    title: 'The Shared Solitude: An Architecture of Transferred Minds',
    description:
      'The discovery of neuro-synaptic crystallization in the 19th century allowed memories to be extracted, distilled, and infused into another human brain. Identity transformed from a private sanctuary into an open, tradable marketplace.',
    createdAt: Date.now() - 86400000 * 7, // 7 days ago
    saved: true,
    customName: 'The Memory Bazaar',
    sections: [
      {
        id: 'sec-mem-1',
        title: 'The Salpêtrière Extraction',
        type: 'divergence',
        content:
          'In 1888 at Paris\'s Salpêtrière Hospital, neurologist Jean-Martin Charcot and his students successfully isolated a patient\'s childhood remembrance into a phosphorescent lipid solution. When absorbed sublingually by an assistant, the assistant wept with the specific sorrow of a village funeral they had never attended. Memory had ceased to be an ephemeral phantom of electrical pulses; it was now a chemical artifact, shelf-stable and infinitely transmissible.',
        expanded: true,
      },
      {
        id: 'sec-mem-2',
        title: 'The Mnemosyne Economy',
        type: 'newWorld',
        content:
          'Modern society categorizes memories as currency, art, and medicine. "Remembrance Parlors" line grand boulevards, offering vials of alpine sunrises, master-level violin technique, or the taste of extinct fruits. Courts sentence criminals to "experience extraction" — removing the memory of the crime and replacing it with the vivid somatic trauma of their victims. Education takes minutes rather than decades, as students simply infuse centuries of mathematical proofs directly into the hippocampus.',
        expanded: true,
      },
      {
        id: 'sec-mem-3',
        title: 'The Ghost Plague',
        type: 'consequences',
        content:
          'The trade in cognition spawned profound systemic fractures: First, "Synaptic Bleed," where excessive foreign memories erode the sense of the original self, creating wandering amnesiacs carrying dozens of conflicting childhoods. Second, a clandestine black market for grief and heartbreak, bought by jaded aristocrats seeking authenticity in a sterilized world. Third, the collapse of biographical truth; autobiographies became works of collective fiction.',
        expanded: true,
      },
      {
        id: 'sec-mem-4',
        title: 'The Archivist of Lyon',
        type: 'humanElement',
        content:
          'Evelyne preserves "unvarnished remembrances" in a basement apothecary in Lyon. She refuses to filter out shame, terror, or boredom. A young woman visits her counter asking to forget the face of her deceased husband; Evelyne refuses the sale. "If you surrender the sting," she whispers, gently returning the glass ampoule to the cedar drawer, "you surrender the proof that you were loved. Pain is the seal of reality."',
        expanded: true,
      },
      {
        id: 'sec-mem-5',
        title: 'The Ship of Theseus Mind',
        type: 'paradox',
        content:
          'When ninety percent of the memories that dictate your morals, fears, and loves originated in other skulls, who is the entity looking out from your eyes? The philosophical question of personal identity is no longer academic: if no thought is uniquely yours, does individuality actually exist, or was the isolated self merely a primitive biological accident that humanity has finally outgrown?',
        expanded: true,
      },
      {
        id: 'sec-mem-6',
        title: 'The Collective Mindscape',
        type: 'future',
        content:
          'A burgeoning global movement known as "The Great Weave" advocates for the voluntary dissolution of all private memory banks into an open-source cognitive reservoir. The first fully synthetic human consciousness, constructed from three million donated memories spanning four centuries, has begun speaking in Geneva. It does not refer to itself as "I," but as "The Archive."',
        expanded: true,
      },
    ],
    timeline: [
      {
        id: 'time-mem-1',
        year: '1888',
        title: 'The First Extraction',
        description: 'Charcot successfully transfers childhood recollection via lipid crystallization in Paris.',
      },
      {
        id: 'time-mem-2',
        year: '1919',
        title: 'The Great War Mnemonics',
        description: 'Battlefield trauma is chemically excised from veterans, birthing the field of therapeutic forgetting.',
      },
      {
        id: 'time-mem-3',
        year: '1954',
        title: 'The Oxford Memory Exchange',
        description: 'First commercial trading floor established for intellectual expertise, language fluency, and creative insight.',
      },
      {
        id: 'time-mem-4',
        year: '1987',
        title: 'The Synaptic Identity Rights Act',
        description: 'Law requires mandatory digital watermarking on all synthesized or transferred emotional recollections.',
      },
      {
        id: 'time-mem-5',
        year: '2028',
        title: 'The Genesis of "The Archive"',
        description: 'The first synthetic collective consciousness awakens, containing unbroken memories spanning 300 years.',
      },
    ],
  },
];


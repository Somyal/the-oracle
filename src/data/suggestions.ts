export const suggestions: string[] = [
  'What if humans never discovered fire?',
  'What if memories could be transferred between people?',
  'What if gravity disappeared for one minute every day?',
  'What if nobody could lie?',
  'What if humanity discovered another habitable planet in 1800?',
  'What if the internet had been invented in 1900?',
  'What if humans could photosynthesize?',
  'What if all languages merged into one overnight?',
  'What if we could see the future but not change it?',
  'What if the moon never existed?',
  'What if animals could speak?',
  'What if aging stopped at 25?',
  'What if the Library of Alexandria had never burned?',
  'What if dreams were physical places we visited each night?',
  'What if Nikola Tesla succeeded in global wireless electricity?',
  'What if human sleep was only needed once a month?',
  'What if light moved at the speed of sound?',
  'What if humans had an innate compass sense like migratory birds?',
  'What if music was the primary currency of human civilization?',
  'What if the Bronze Age Collapse had never occurred?',
  'What if Earth had rings like Saturn visible from the equator?',
  'What if every lie left a permanent luminous mark on your skin?',
  'What if plants communicated audibly when in distress?',
  'What if shadows possessed independent physical mass?',
  'What if humans could hibernate through the winter months?',
  'What if oil was never formed in the Earth\'s crust?',
  'What if emotions were contagious like airborne scents?',
  'What if the printing press was invented in ancient Rome?',
  'What if oceans were made of freshwater instead of saltwater?',
  'What if human eyesight could see magnetic and electrical fields?',
  'What if money dissolved into dust after 365 days?',
  'What if written words vanished from paper after being read once?',
  'What if Earth had two smaller moons that orbited in opposite directions?',
  'What if mirrors reflected how a person felt rather than looked?',
  'What if sound could be crystallized into solid gemstones?',
  'What if pain was completely silent and painless, but visible as smoke?',
  'What if the Neanderthals had survived alongside Homo sapiens?',
  'What if gravity was halved during the night?',
  'What if humans remembered the future instead of the past?',
  'What if electricity was naturally repelled by metals?',
];

export const impossibleQuestions: string[] = [
  'What if consciousness could exist without a body?',
  'What if time flowed backward for half the universe?',
  'What if every decision created a visible parallel self?',
  'What if death was a doorway to a reality you designed while alive?',
  'What if the speed of light was the speed of thought — and nothing else could move?',
  'What if every star in the sky was a memory from a dead civilization?',
  'What if you could only exist in moments others were thinking of you?',
  'What if mathematics was discovered to be a living organism?',
  'What if silence had mass and could crush you?',
  'What if love was a measurable force, like gravity, and could bend space?',
  'What if dreaming was the real world and waking life the dream?',
  'What if colors were emotions leaked from a dimension we cannot see?',
  'What if forgetting was impossible and every mind eventually shattered under the weight?',
  'What if the universe was a single sentence being spoken, and we were inside a syllable?',
  'What if free will existed only for exactly seven seconds per lifetime?',
  'What if the universe reset every time everyone blinked simultaneously?',
  'What if memories grew on trees like fruit and could be eaten by anyone?',
  'What if time had tides that washed modern cities into ancient eras?',
  'What if our thoughts echoed in the rooms where we had them for decades?',
  'What if shadows were the true beings and we were merely their projections?',
];

export const unknownObservations: string[] = [
  'Every mirror contains a universe that exists only when observed.',
  'The present is the only moment that doesn\'t exist — it\'s already becoming the past.',
  'Consciousness may be the universe\'s way of experiencing itself.',
  'A thought you never speak aloud still changes the shape of your brain forever.',
  'The atoms in your left hand may have come from a different star than those in your right.',
  'Silence is not the absence of sound — it is the sound of everything too distant to hear.',
  'You have never seen your own face. Only reflections, photographs, and the trust of others.',
  'If the universe is infinite, then somewhere, this exact moment is happening for the first time and for the last.',
  'Light from the sun takes eight minutes to reach you. You have never seen the sun as it is — only as it was.',
  'Every person you\'ve ever dreamed of was built entirely from faces you once glimpsed and forgot.',
  'The space between atoms is proportionally larger than the space between stars.',
  'No one has ever touched anything. Atoms repel each other before contact. Every touch you remember is electromagnetic negotiation.',
  'You are the universe arguing with itself about whether it exists.',
  'A wave does not travel through the ocean. The ocean moves through itself and we call it a wave.',
  'Time may not flow. It may simply be, and consciousness is what slides along it.',
  'Your cells have replaced themselves so many times that nothing physical connects you to the child you were.',
  'Every language that has ever gone extinct took an entire way of perceiving reality with it.',
  'The darkness you see when you close your eyes is generated by your brain. Even nothing is something you create.',
  'Somewhere in your body right now, a cell is making a choice that will determine whether you live another fifty years.',
  'The edge of the observable universe is not a wall. It is the moment where light has not yet had enough time to reach you.',
];

/**
 * All hypothetical questions pooled together for infinite randomization.
 */
export const allHypotheticals: string[] = [
  ...suggestions,
  ...impossibleQuestions,
];

/**
 * Pick a random question, ensuring it is different from the current one.
 */
export function getRandomQuestion(excludeCurrent?: string): string {
  const pool = allHypotheticals.filter((q) => q !== excludeCurrent);
  if (pool.length === 0) return suggestions[0];
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

/**
 * Pick a set of random suggestions from the pool.
 */
export function getRandomSuggestions(count: number = 6, exclude: string[] = []): string[] {
  const excludeSet = new Set(exclude);
  const pool = suggestions.filter((s) => !excludeSet.has(s));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

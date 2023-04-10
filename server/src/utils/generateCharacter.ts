import { IRandomCharacter } from '../../../shared/types/random';

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomName(): string {
  return 'Random Name';
}

function getRandomAge(
  min: number,
  max: number,
  mean: number,
  stdDev: number
): number {
  let u1 = 0;
  let u2 = 0;

  // Generate two uniform random numbers between 0 and 1
  do {
    u1 = Math.random();
    u2 = Math.random();
  } while (u1 <= Number.EPSILON);

  // Box-Muller transform
  // https://en.wikipedia.org/wiki/Box–Muller_transform
  const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  const result = mean + stdDev * z1;

  // Ensure the result is within the specified range, otherwise try again
  //
  // If we use CDF to calculate the probability of a re-run,
  // Φ(x) = P(X ≤ x) = integral from -∞ to x of (1 / (σ√(2π))) * exp(-(z - µ)^2 / (2σ^2)) dz
  // Therefore when min = 18, max = 80, mean = 35, and stdDev = 10, the chances of a re-run
  // are 4.53%
  if (result >= min && result <= max) {
    return Math.round(result);
  } else {
    return getRandomAge(min, max, mean, stdDev);
  }
}

function getRandomPhysicalDescription(): string {
  const heights = [
    'short',
    'quite short',
    'below average height',
    'slightly below average height',
    'average height',
    'slightly above average height',
    'above average height',
    'tall',
    'very tall',
    'towering',
    'gigantic',
    'petite',
    'tiny',
    'vertically challenged',
    'statured',
    'lofty',
    'lanky',
    'colossal',
    'leggy',
    'elongated',
    'gangling',
    'miniature',
  ];

  const builds = [
    'slender',
    'muscular',
    'athletic',
    'stocky',
    'plump',
    'toned',
    'lanky',
    'skinny',
    'curvy',
    'brawny',
    'heavyset',
    'chubby',
    'lean',
    'petite',
    'tall and thin',
    'tall and broad',
    'short and thin',
    'short and stout',
    'willowy',
    'statuesque',
    'lithe',
    'compact',
    'wiry',
    'sinewy',
    'delicate',
    'rotund',
    'corpulent',
    'hulking',
    'massive',
    'bear-like',
    'bulky',
    'towering',
    'sturdy',
    'rugged',
    'well-built',
    'hefty',
    'burly',
    'svelte',
    'gaunt',
    'emaciated',
    'thickset',
    'robust',
    'square-shouldered',
    'long-limbed',
    'short-limbed',
  ];

  const hairColors = [
    'black',
    'brown',
    'blonde',
    'red',
    'white',
    'gray',
    'blue',
    'green',
  ];

  const hairStyles = [
    'short',
    'long',
    'wavy',
    'curly',
    'straight',
    'shaved',
    'braided',
    'ponytail',
  ];

  const eyeColors = [
    'black',
    'brown',
    'blue',
    'green',
    'gray',
    'hazel',
    'amber',
    'red',
    'violet',
  ];

  const skinColors = [
    'porcelain',
    'ivory',
    'fair',
    'light',
    'alabaster',
    'rosy',
    'pale',
    'beige',
    'sand',
    'golden',
    'honey',
    'olive',
    'tan',
    'bronze',
    'amber',
    'caramel',
    'chestnut',
    'toffee',
    'sienna',
    'coffee',
    'hazelnut',
    'pecan',
    'almond',
    'walnut',
    'cocoa',
    'mahogany',
    'mocha',
    'espresso',
    'ebony',
    'jet',
    'onyx',
    'sable',
    'ashen',
    'slate',
    'silvery',
    'pearlescent',
    'goldenrod',
    'copper',
    'umber',
    'burnt sienna',
    'sepia',
  ];

  const facialFeatures = [
    'a sharp jawline',
    'a round face',
    'high cheekbones',
    'a chiseled face',
    'a square face',
    'a heart-shaped face',
    'a long face',
    'a triangular face',
    'a diamond-shaped face',
    'an oval face',
    'a wide forehead',
    'a narrow forehead',
    'prominent brow ridges',
    'a smooth brow',
    'deep-set eyes',
    'large, expressive eyes',
    'small, beady eyes',
    'hooded eyes',
    'almond-shaped eyes',
    'upturned eyes',
    'downturned eyes',
    'wide-set eyes',
    'close-set eyes',
    'a straight nose',
    'a hooked nose',
    'a button nose',
    'a Roman nose',
    'a Greek nose',
    'a snub nose',
    'a thin, pursed mouth',
    'a wide, generous mouth',
    'full lips',
    'thin lips',
    'a small, pointed chin',
    'a strong, square chin',
    'a dimpled chin',
    'a cleft chin',
    'a double chin',
    'slightly crooked teeth',
    'perfectly aligned teeth',
    'freckles scattered across their cheeks',
    'a prominent, aquiline nose',
    'rosy cheeks',
    'a gentle, inviting smile',
    'a stern, unyielding expression',
  ];

  const notableFeatures = [
    'a scar running down their left cheek',
    'a scar running down their right cheek',
    'a tattoo on their right arm',
    'a tattoo on their left arm',
    'a missing left ear',
    'a missing right ear',
    'a gold tooth',
    'a silver tooth',
    'a broken nose',
    'an eyepatch covering their left eye',
    'an eyepatch covering their right eye',
    'a small mole under their right eye',
    'a small mole under their left eye',
    'a prominent birthmark on their forehead',
    'a large birthmark on their neck',
    'a pierced nose',
    'a pierced eyebrow',
    'multiple ear piercings',
    'a lip piercing',
    'a tongue piercing',
    'a bald head',
    'a long beard',
    'a bushy mustache',
    'thick eyebrows',
    'a missing left arm',
    'a missing right arm',
    'a prosthetic left leg',
    'a prosthetic right leg',
    'a branded symbol on their left shoulder',
    'a branded symbol on their right shoulder',
    'a twisted, gnarled hand',
    'a crooked smile',
    'a single white streak in their hair',
    'a distinctive, deep voice',
    'a delicate, lilting voice',
    'a hunched back',
    'unusually long fingers',
    'a limp in their walk',
    'a tattooed face',
    'a large, hooked nose',
    'a small, upturned nose',
    'an unusually pale complexion',
    'an unusually flushed complexion',
    'a constantly twitching left eye',
    'a constantly twitching right eye',
  ];

  const description = `${capitalizeFirstLetter(
    getRandomElement(heights)
  )}, ${getRandomElement(builds)} individual with ${getRandomElement(
    hairColors
  )} ${getRandomElement(hairStyles)} hair and ${getRandomElement(
    eyeColors
  )} eyes. They have ${getRandomElement(skinColors)} skin, ${getRandomElement(
    facialFeatures
  )}, and ${getRandomElement(notableFeatures)}.`;

  return description;
}

export function generateCharacter(): IRandomCharacter {
  return {
    firstName: getRandomName(),
    lastName: getRandomName(),
    age: getRandomAge(18, 80, 35, 10),
    physicalDescription: getRandomPhysicalDescription(),
  };
}

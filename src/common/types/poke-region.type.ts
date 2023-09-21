const regions = [
  'kanto',
  'johto',
  'hoenn',
  'sinnoh',
  'unova',
  'kalos',
  'alola',
  'galar',
  'hisui',
  'paldea',
] as const;

export type PokeRegion = (typeof regions)[number];

export function isPokeRegion(region: any): region is PokeRegion {
  if (typeof region !== 'string') return false;
  return regions.includes(region as any);
}

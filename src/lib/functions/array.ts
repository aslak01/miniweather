export const generateLowerNumbers = (cutoff: number) => (floatValue: number) =>
  Array.from({ length: Math.min(Math.floor(floatValue / cutoff), 4) + 1 }, (_, i) => i * cutoff);


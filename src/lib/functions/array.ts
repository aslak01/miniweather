export const generateLowerNumbers =
  (cutoff: number) => (floatValue: number) => {
    const numElements = Math.min(Math.floor(floatValue / cutoff) + 1, 4);
    const spacing = floatValue / (numElements - 1);
    return Array.from({ length: numElements }, (_, i) =>
      Math.round(i * spacing),
    );
  };

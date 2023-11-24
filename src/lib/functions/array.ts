export const generateLowerNumbers =
  (cutoff: number) => (floatValue: number) => {
    const numElements = Math.min(Math.floor(floatValue / cutoff) + 1, 4);
    const spacing = floatValue / (numElements - 1);
    const arr = Array.from({ length: numElements }, (_, i) =>
      Math.round(i * spacing),
    );
    if (arr.find((n) => !isNaN(n))) {
      return arr;
    }
    return undefined;
  };

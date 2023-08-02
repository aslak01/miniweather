export const has = (el: { value: number }) => el.value > 0;

export function formatToNorwegianNumber(n: number | string): string {
  const norwegianNumberFormatOptions = {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    useGrouping: true,
  };
  n = Number(n);
  const formatted = new Intl.NumberFormat(
    "nb-NO",
    norwegianNumberFormatOptions,
  ).format(n);
  return formatted;
}

export function selectEntries<T>(inputArray: T[], n: number): T[] {
  if (n <= 0 || n >= inputArray.length) {
    throw new Error(
      "Invalid value of n. n must be greater than 0 and less than the length of the array.",
    );
  }

  const selectedEntries = inputArray.reduce(
    (acc: T[], currentValue: T, currentIndex: number) => {
      if (currentIndex === 0 || currentIndex === inputArray.length - 1) {
        // Include the first and last elements directly into the new array
        acc.push(currentValue);
      } else {
        // Calculate the interval size for evenly spaced middle entries
        const intervalSize = (inputArray.length - 2) / (n - 1);

        // Check if the current index is an evenly spaced middle entry
        if ((currentIndex - 1) % intervalSize === 0) {
          acc.push(currentValue);
        }
      }
      return acc;
    },
    [],
  );

  return selectedEntries;
}

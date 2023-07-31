export const has = (el: { value: number }) => el.value > 0;


export function formatToNorwegianNumber(n: number): string {
  const norwegianNumberFormatOptions = {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    useGrouping: true,
  };
  const formatted = new Intl.NumberFormat('nb-NO', norwegianNumberFormatOptions).format(n)
  return formatted
}

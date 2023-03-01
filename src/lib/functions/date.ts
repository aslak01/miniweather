export const dateToHour = (d: string): string => {
	return String(new Date(d).getHours()).padStart(2, '0');
};

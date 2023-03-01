import type { DataAndTime } from './types';
import type { WeathericonKey } from './weathericons';

export const dummyTemps: DataAndTime[] = [
	{
		value: 9,
		date: '2023-02-27T09:00:00Z'
	},
	{
		value: 10,
		date: '2023-02-27T10:00:00Z'
	},
	{
		value: 11,
		date: '2023-02-27T11:00:00Z'
	},
	{
		value: 12,
		date: '2023-02-27T12:00:00Z'
	}
];
export const dummyRain: DataAndTime[] = [
	{
		value: 0,
		date: '2023-02-27T09:00:00Z'
	},
	{
		value: 12,
		date: '2023-02-27T10:00:00Z'
	},
	{
		value: 0.5,
		date: '2023-02-27T11:00:00Z'
	},
	{
		value: 0,
		date: '2023-02-27T12:00:00Z'
	}
];
export const dummyIcon: WeathericonKey = 'clearsky_day';

import type { PageServerLoad } from './$types';
import type { Timeseries } from '$lib/types';
import { env } from '$env/dynamic/public';

import {
	getWeather,
	getIcon,
	getInstant,
	getRain,
	getTemps,
	getTrains,
	splitAndCleanTrains
} from '$lib/functions/index';

import { dummyIcon, dummyTemps, dummyRain } from '$lib/testing';

const LAT = env.PUBLIC_LAT,
	LON = env.PUBLIC_LON,
	// DEV = import.meta.env.DEV;
	DEV = false;

export const load: PageServerLoad = async (_event) => {
	if (LAT && LON && !DEV) {
		const weather = await getWeather(LAT, LON).then((res: Timeseries[]) => {
			return {
				iconkey: getIcon(res),
				rain: getRain(res, 6),
				temps: getTemps(res, 6),
				instant: getInstant(res)
			};
		});
		const trains = await getTrains();
		const splitTrains = splitAndCleanTrains(trains);
		console.log(splitTrains);
		return {
			weather,
			splitTrains
		};
	} else {
		return {
			iconkey: dummyIcon,
			rain: dummyRain,
			temps: dummyTemps,
			raw: []
		};
	}
};

import type { PageServerLoad } from "./$types";
import type { Timeseries } from "$lib/types";

import {
  SECRET_BUS_QUAY,
  SECRET_LAT,
  SECRET_LON,
  SECRET_TRAIN_QUAY,
} from "$env/static/private";

import {
  getBuses,
  getIcon,
  getInstant,
  getRain,
  getTemps,
  getTrains,
  getTransports,
  getWeather,
  splitAndCleanTrains,
} from "$lib/functions/index";

import {
  dummyIcon,
  dummyInstant,
  dummyRain,
  dummyTemps,
  dummyTrains,
} from "$lib/testing";

const DEV = false;

const transports = await getTransports(
  SECRET_BUS_QUAY || "NSR:StopPlace:59872",
  SECRET_TRAIN_QUAY || "NSR:StopPlace:59872",
);
const weatherResp = await getWeather(SECRET_LAT, SECRET_LON);

console.log(transports);

export const load: PageServerLoad = async (_event) => {
  if (!DEV) {
    const weather = {
      iconkey: getIcon(weatherResp),
      rain: getRain(weatherResp, 8),
      temps: getTemps(weatherResp, 8),
      instant: getInstant(weatherResp),
    };
    // const splitTrains = splitAndCleanTrains(trains);
    return {
      weather,
      transports,
      // splitTrains,
    };
  } else {
    return {
      weather: {
        iconkey: dummyIcon,
        rain: dummyRain,
        temps: dummyTemps,
        instant: dummyInstant,
        raw: [],
      },
      // splitTrains: { northbound: dummyTrains },
    };
  }
};

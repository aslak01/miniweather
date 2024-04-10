import type { PageServerLoad } from "./$types";

import {
  SECRET_BUS_QUAY,
  SECRET_LAT,
  SECRET_LON,
  SECRET_TRAIN_QUAY,
} from "$env/static/private";

import {
  getRain,
  getTemps,
  getTransports,
  getWeather,
} from "$lib/functions/index";

import { dummyRain, dummyTemps, dummyTrains } from "$lib/testing";

const DEV = false;
const hoursToGet = 8;
const transportsToGet = 6;

async function getTrains(amt: number) {
  return await getTransports(
    SECRET_BUS_QUAY || "NSR:StopPlace:59872",
    SECRET_TRAIN_QUAY || "NSR:StopPlace:59872",
    amt,
  );
}

const weatherResp = await getWeather(SECRET_LAT, SECRET_LON);

export const load: PageServerLoad = async () => {
  const weather = {
    rain: DEV ? dummyRain : getRain(weatherResp, hoursToGet),
    temps: DEV ? dummyTemps : getTemps(weatherResp, hoursToGet),
  };
  const transports = DEV ? dummyTrains : await getTrains(transportsToGet);
  return {
    weather,
    transports,
  };
};

import type { PageServerLoad } from "./$types";

import {
  SECRET_BUS_QUAY,
  SECRET_LAT,
  SECRET_LON,
  SECRET_TRAIN_QUAY,
} from "$env/static/private";

import {
  getIcon,
  getInstant,
  getRain,
  getTemps,
  getTransports,
  getWeather,
} from "$lib/functions/index";

import {
  dummyIcon,
  dummyInstant,
  dummyRain,
  dummyTemps,
  dummyTrains,
} from "$lib/testing";

const DEV = false;

async function getTrains() {
  return await getTransports(
    SECRET_BUS_QUAY || "NSR:StopPlace:59872",
    SECRET_TRAIN_QUAY || "NSR:StopPlace:59872",
  );
}

const weatherResp = await getWeather(SECRET_LAT, SECRET_LON);

export const load: PageServerLoad = async (_event) => {
  const weather = {
    iconkey: DEV ? dummyIcon : getIcon(weatherResp),
    rain: DEV ? dummyRain : getRain(weatherResp, 8),
    temps: DEV ? dummyTemps : getTemps(weatherResp, 8),
    instant: DEV ? dummyInstant : getInstant(weatherResp),
  };
  const transports = DEV ? dummyTrains : getTrains();
  return {
    weather,
    transports,
  };
};

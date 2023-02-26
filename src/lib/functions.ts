import type { Timeseries } from '$lib/types';
import type { WeathericonKey } from '$lib/weathericons';

export const getWeather = async (lat: string, lon: string): Promise<Timeseries[]> => {
  const req = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
  );
  const res = await req.json();
  return res.properties.timeseries;
};

export const getIcon = (w: Timeseries[]): WeathericonKey => {
  return w[1].data.next_6_hours.summary.symbol_code as WeathericonKey;
};

export const getTemps = (w: Timeseries[], amt: number): number[] => {
  const nextTemps = w.reduce(
    (acc: number[], val: { data: { instant: { details: { air_temperature: number } } } }) => {
      acc.push(val.data.instant.details.air_temperature);
      return acc;
    },
    []
  );
  const sliceAt = amt + 2

  return nextTemps.slice(2, sliceAt);
};
export const getRain = (w: Timeseries[], amt: number): number[] => {
  const nextRain = w.reduce(
    (
      acc: number[],
      val: { data: { next_1_hours: { details: { precipitation_amount: number } } } }
    ) => {
      if ('next_1_hours' in val.data) {
        acc.push(val.data.next_1_hours?.details.precipitation_amount);
      }
      return acc;
    },
    []
  );
  const sliceAt = amt + 2

  return nextRain.slice(2, sliceAt);
};

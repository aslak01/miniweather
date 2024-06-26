import type {
  DataAndTime,
  Instant,
  Timeseries,
  WeathericonKey,
} from "$lib/types";

export const getWeather = async (
  lat: string,
  lon: string,
): Promise<Timeseries[]> => {
  const req = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
  );
  const res = await req.json();
  const now = new Date(new Date().setMinutes(0, 0, 0)).getTime();

  const tenHrsInMs = 10 * 60 * 60 * 1000
  // const halfHrInMs = 1800000;

  const next10hours = res.properties.timeseries.filter(
    (t: Timeseries) =>
      new Date(t.time).getTime() >= now &&
      new Date(t.time).getTime() <= now + tenHrsInMs,
  );
  return next10hours;
};

export const getIcon = (w: Timeseries[]): WeathericonKey => {
  return w[1].data.next_6_hours.summary.symbol_code as WeathericonKey;
};

export const getInstant = (w: Timeseries[]): Instant => {
  return {
    time: w[0].time,
    ...w[0].data.instant.details,
  };
};

export const getTemps = (w: Timeseries[], amt: number): DataAndTime[] => {
  // console.log(w.map((w) => w.data.instant));
  const nextTemps = w.reduce((acc: DataAndTime[], val: Timeseries) => {
    acc.push({
      value: val.data.instant.details.air_temperature,
      icon: val.data.next_1_hours?.summary.symbol_code,
      date: val.time,
    });
    return acc;
  }, []);
  const sliceAt = amt;

  return nextTemps.slice(0, sliceAt);
};
export const getRain = (w: Timeseries[], amt: number): DataAndTime[] => {
  const nextRain = w.reduce((acc: DataAndTime[], val: Timeseries) => {
    if ("next_1_hours" in val.data) {
      acc.push({
        value: val.data.next_1_hours?.details.precipitation_amount,
        date: val.time,
      });
    }
    return acc;
  }, []);
  const sliceAt = amt;

  return nextRain.slice(0, sliceAt);
};

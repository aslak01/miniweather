import type { TWeatherSymbolKey } from "./functions/weathericons";
import type {
  DataAndTime,
  Instant,
  TransportRelevantInfoWithType,
} from "./types";

export const dummyTemps: DataAndTime[] = [
  {
    value: -5.3,
    date: "2023-02-27T09:00:00Z",
    icon: "clearsky_day",
  },
  {
    value: -2,
    date: "2023-02-27T10:00:00Z",
    icon: "fair_polartwilight",
  },
  {
    value: 8.3,
    date: "2023-02-27T11:00:00Z",
    icon: "heavyrainandthunder",
  },
  {
    value: 8.9,
    date: "2023-02-27T12:00:00Z",
    icon: "fog",
  },
  {
    value: 4,
    date: "2023-02-27T13:00:00Z",
    icon: "snow",
  },
];

export const dummyRain: DataAndTime[] = [
  {
    value: 2,
    date: "2023-02-27T09:00:00Z",
  },
  {
    value: 22,
    date: "2023-02-27T10:00:00Z",
  },
  {
    value: 1.5,
    date: "2023-02-27T11:00:00Z",
  },
  {
    value: 8,
    date: "2023-02-27T12:00:00Z",
  },
  {
    value: 3,
    date: "2023-02-27T13:00:00Z",
  },
];

export const dummyIcon: TWeatherSymbolKey = "clearsky_day";

export const dummyInstant: Instant = {
  time: "2023-02-27T12:00:00Z",
  air_pressure_at_sea_level: 10,
  air_temperature: 12,
  cloud_area_fraction: 19,
  relative_humidity: 12,
  wind_from_direction: 6,
  wind_speed: 2,
};

export const dummyTrains: TransportRelevantInfoWithType[] = [
  {
    minsFromHour: "12",
    minsFromNow: 12,
    delay: 22,
    meta: {
      aimedDepartureTime: "string",
      expectedDepartureTime: "string",
    },
    type: "train",
  },
  {
    minsFromHour: "22",
    minsFromNow: 22,
    delay: 0,
    meta: {
      aimedDepartureTime: "string",
      expectedDepartureTime: "string",
    },
    type: "bus",
  },
  {
    minsFromHour: "32",
    minsFromNow: 42,
    delay: 15,
    meta: {
      aimedDepartureTime: "string",
      expectedDepartureTime: "string",
    },
    type: "train",
  },
  {
    minsFromHour: "12",
    minsFromNow: 68,
    delay: 3,
    meta: {
      aimedDepartureTime: "string",
      expectedDepartureTime: "string",
    },
    type: "bus",
  },
  {
    minsFromHour: "38",
    minsFromNow: 80,
    delay: 0,
    meta: {
      aimedDepartureTime: "string",
      expectedDepartureTime: "string",
    },
    type: "bus",
  },
];

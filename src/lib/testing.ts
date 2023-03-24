import type { DataAndTime, Instant } from './types';
import type { WeathericonKey } from './weathericons';

export const dummyTemps: DataAndTime[] = [
  {
    value: -5.3,
    date: '2023-02-27T09:00:00Z'
  },
  {
    value: -2,
    date: '2023-02-27T10:00:00Z'
  },
  {
    value: 28.3,
    date: '2023-02-27T11:00:00Z'
  },
  {
    value: 18.9,
    date: '2023-02-27T12:00:00Z'
  }
];
export const dummyRain: DataAndTime[] = [
  {
    value: 2,
    date: '2023-02-27T09:00:00Z'
  },
  {
    value: 22,
    date: '2023-02-27T10:00:00Z'
  },
  {
    value: 1.5,
    date: '2023-02-27T11:00:00Z'
  },
  {
    value: 8,
    date: '2023-02-27T12:00:00Z'
  },
  {
    value: 3,
    date: '2023-02-27T13:00:00Z'
  }
];
export const dummyIcon: WeathericonKey = 'clearsky_day';
export const dummyInstant: Instant = {
  time: '2023-02-27T12:00:00Z',
  air_pressure_at_sea_level: 10,
  air_temperature: 12,
  cloud_area_fraction: 19,
  relative_humidity: 12,
  wind_from_direction: 6,
  wind_speed: 2
}

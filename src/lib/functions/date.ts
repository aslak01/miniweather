import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const dateToHour = (d: string): string => {
  return String(new Date(d).getHours()).padStart(2, "0");
};

export const dateStringToMinFromNow = (d: string): number => {
  const now = dayjs();
  const dt = dayjs(d);
  const diff = dt.diff(now, "minute");
  return diff;
};
export const dateStringToMin = (d: string): string => {
  return dayjs(d).format("m");
};

export const timeDiffInMin = (d1: string, d2: string): number => {
  const dt1 = dayjs(d1);
  const dt2 = dayjs(d2);
  return dt1.diff(dt2, "minute");
};

export const minsToHrMins = (m: number | string): string => {
  const n = Number(m);
  const hrs = Math.floor(n / 60);
  const mns = n % 60;
  const string = hrs ? hrs + ":" + mns : mns;
  return String(string);
};

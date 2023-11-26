import { busQuerty } from "$lib/consts/busQuery";
import { trainQuery } from "$lib/consts/trainQuery";

import type {
  Leg,
  NewTrainData,
  NullableTransportRelevantInfoWithType,
  TransportRelevantInfo,
  TripPattern,
} from "../types";

import { dateStringToMin, dateStringToMinFromNow, timeDiffInMin } from "./date";
import { isTruthy } from "./utils";

export const fetchEnturGql = async (query: string): Promise<TripPattern[]> => {
  const headers = {
    "Content-Type": "application/json",
    "ET-Client-Name": "personlig-infoskjerm",
  };
  const myHeaders = new Headers(headers);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ query: query }),
  };

  const res = await fetch(
    "https://api.entur.io/journey-planner/v3/graphql",
    requestOptions,
  );
  const json: NewTrainData = await res.json();
  return json.data.trip.tripPatterns;
};

type TrainRelativeTimes = {
  minsFromHour: string;
  minsFromNow: number;
  delay: number;
};

export const parseTrainTime = (
  expectedDepartureTime: string,
  aimedDepartureTime: string,
): TrainRelativeTimes => {
  const delay = timeDiffInMin(expectedDepartureTime, aimedDepartureTime);
  return {
    minsFromHour: dateStringToMin(expectedDepartureTime),
    minsFromNow: dateStringToMinFromNow(expectedDepartureTime),
    delay,
  };
};

function getLegInfo(leg: Leg): TransportRelevantInfo {
  const { line, fromEstimatedCall } = leg;
  const { publicCode } = line;
  const { aimedDepartureTime, expectedDepartureTime } = fromEstimatedCall;
  const relTimes = parseTrainTime(aimedDepartureTime, expectedDepartureTime);
  const { minsFromHour, minsFromNow, delay } = relTimes;
  return {
    publicCode,
    minsFromHour,
    minsFromNow,
    delay,
    meta: {
      aimedDepartureTime,
      expectedDepartureTime,
    },
  };
}

function newGetRelevantInfo(trip: TripPattern) {
  const { legs } = trip;
  return legs.map(getLegInfo);
}

export async function getTrains(
  quay: string,
): Promise<NullableTransportRelevantInfoWithType> {
  const data = await fetchEnturGql(trainQuery(quay));
  const filteredData = data.filter(isTruthy);
  if (filteredData.length === 0) return null;
  const mappedData = data.flatMap(newGetRelevantInfo);
  const metaCodedMappedData = mappedData.map((t) => ({ ...t, type: "train" }));
  return metaCodedMappedData || null;
}

export async function getBuses(
  quay: string,
): Promise<NullableTransportRelevantInfoWithType> {
  const data = await fetchEnturGql(busQuerty(quay));
  const filteredData = data.filter(isTruthy);
  if (filteredData.length === 0) return null;
  const mappedData = data.flatMap(newGetRelevantInfo);
  const metaCodedMappedData = mappedData.map((t) => ({ ...t, type: "bus" }));
  return metaCodedMappedData || null;
}

export async function getTransports(
  busQuay: string,
  trainQuay: string,
  amt: number,
) {
  const trains = await getTrains(trainQuay);
  const buses = await getBuses(busQuay);
  let both = null;
  if (trains && buses) {
    both = [...trains.filter(isTruthy), ...buses.filter(isTruthy)]
      .filter((t) => t.minsFromNow > 10)
      .sort((a, b) => a.minsFromNow - b.minsFromNow)
      .slice(0, amt);
  }
  return both;
}

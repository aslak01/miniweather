import type {
  TrainData,
  RelevantTrainInfo,
  SortedTrainData,
  StopToStopGeometries
} from '../types';
import { dateStringToMin, dateStringToMinFromNow, timeDiffInMin } from './date';

export const getTrains = async (): Promise<TrainData[]> => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('ET-Client-Name', 'personlig-infoskjerm');

  const graphql = JSON.stringify({
    query: `
      {
        stopPlace(
          id: "NSR:StopPlace:418"
        ) {
          name
          id
          estimatedCalls(
            arrivalDeparture: departures
            includeCancelledTrips: true
            numberOfDepartures: 20
          ) {
            expectedDepartureTime
            destinationDisplay {
              frontText
            }
            cancellation
            predictionInaccurate
            aimedArrivalTime
            aimedDepartureTime
            serviceJourney {
              line {
                publicCode
                transportMode
                name
              }
              journeyPattern {
                stopToStopGeometries {
                  toQuay {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    `
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql
  };

  const res = await fetch(
    'https://api.entur.io/journey-planner/v3/graphql',
    requestOptions
  );
  const json = await res.json();
  return json.data.stopPlace.estimatedCalls;
};

export const extractLineNamesAndRelTime = (
  train: TrainData
): RelevantTrainInfo => {
  const expected = train.expectedDepartureTime;
  const aimed = train.aimedDepartureTime;
  const delay = timeDiffInMin(expected, aimed);
  return {
    line: train.serviceJourney.line.publicCode,
    display: train.destinationDisplay.frontText,
    time: dateStringToMin(expected),
    diff: dateStringToMinFromNow(expected),
    delay
  };
};

export const splitAndCleanTrains = (data: TrainData[]): SortedTrainData => {
  const askerBeforeOslo = (d: TrainData) => {
    const indexOfStation = (sts: TrainData, x: string): number =>
      sts.serviceJourney.journeyPattern.stopToStopGeometries
        .map((s: StopToStopGeometries) => s.toQuay.name)
        .indexOf(x);
    const askerIndex = indexOfStation(d, 'Asker stasjon');
    const osloIndex = indexOfStation(d, 'Oslo S');
    return askerIndex < osloIndex;
  };
  const tooSoon = (d: RelevantTrainInfo) => {
    return d.diff > 15;
  };
  const tooLate = (d: RelevantTrainInfo) => {
    return d.diff < 600;
  };
  const noFlytog = (d: RelevantTrainInfo) => {
    return d.line.includes('FLY') === false;
  };
  const northbound = data
    .filter(askerBeforeOslo)
    .map(extractLineNamesAndRelTime)
    .filter(tooSoon)
    .filter(tooLate)
    .filter(noFlytog)
    .slice(0, 4);
  const southbound = data
    .filter((train: TrainData) => askerBeforeOslo(train) === false)
    .map(extractLineNamesAndRelTime)
    .filter(tooSoon)
    .filter(tooLate)
    .filter(noFlytog)
    .slice(0, 4);

  return {
    northbound,
    southbound
  };
};

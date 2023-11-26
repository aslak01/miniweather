type DestinationDisplay = {
  frontText: string;
};
type Line = {
  publicCode: string;
  transportMode: string;
  name: string;
};
type Quay = {
  id: string;
  name: string;
};

export type StopToStopGeometries = {
  toQuay: Quay;
};

type JourneyPattern = {
  stopToStopGeometries: StopToStopGeometries[];
};

type ServiceJourney = {
  line: Line;
  journeyPattern: JourneyPattern;
};

export type TrainData = {
  expectedDepartureTime: string;
  destinationDisplay: DestinationDisplay;
  cancellation: boolean;
  predictionInaccurate: boolean;
  aimedArrivalTime: string;
  aimedDepartureTime: string;
  serviceJourney: ServiceJourney;
};

export type RelevantTrainInfo = {
  line: string;
  display: string;
  time: string;
  diff: number;
  delay: number;
};

export type SortedTrainData = {
  northbound: RelevantTrainInfo[];
  southbound: RelevantTrainInfo[];
};

export type NewTrainData = {
  data: {
    trip: {
      tripPatterns: TripPattern[];
    };
  };
};

export type TripPattern = {
  expectedStartTime: string;
  duration: number;
  legs: Leg[];
};

export type Leg = {
  mode: string;
  distance: number;
  line: {
    id: string;
    publicCode: string;
    name: string;
  };
  fromEstimatedCall: {
    quay: {
      id: string;
      name: string;
    };
    realtime: boolean;
    aimedDepartureTime: string;
    expectedDepartureTime: string;
    actualDepartureTime: string | null;
  };
};

export type TransportRelevantInfo = {
  publicCode: string;
  minsFromHour: string;
  minsFromNow: number;
  delay: number;
  meta: {
    aimedDepartureTime: string;
    expectedDepartureTime: string;
  };
};

export type TransportRelevantInfoWithType = TransportRelevantInfo & {
  type: string;
};

export type NullableTransportRelevantInfo = TransportRelevantInfo[] | null;

export type NullableTransportRelevantInfoWithType =
  | TransportRelevantInfoWithType[]
  | null;

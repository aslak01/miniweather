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
	time: number;
	diff: number;
};

export type SortedTrainData = {
	northbound: RelevantTrainInfo[];
	southbound: RelevantTrainInfo[];
};

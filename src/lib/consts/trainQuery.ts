export const trainQuery = (
  start: string,
  stop: string = "NSR:StopPlace:58404",
) =>
  `{
  trip(
    searchWindow: 1700,
    from: {
      place:"${start}"
    }
    to: {
      place:"${stop}"
    }
    modes: {
      transportModes: [{
        transportMode: rail
      }]
    }
		transferPenalty: 100000
  )

  {
    tripPatterns {
      expectedStartTime
      duration
      legs {
        mode
        distance
        line {
          id
          publicCode
    			name

      	}
        fromEstimatedCall {
          quay {
            id 
            name
          }
          realtime
          aimedDepartureTime
          expectedDepartureTime
          actualDepartureTime
        }
      }

    }
  }
}`;

export const oldQuery = `
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
    `;

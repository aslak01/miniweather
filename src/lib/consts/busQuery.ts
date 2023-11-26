export const busQuerty = (
  start: string,
  stop: string = "NSR:GroupOfStopPlaces:184",
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
        transportMode: bus
        transportSubModes: [localBus]
      }]
    }
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

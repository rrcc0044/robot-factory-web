import reducer from "../reducer"
import { actionTypes as robotActionTypes } from '../reducer';

const initialState = {
  robots: [],
  qaPassedRobots: [],
  factorySecondsRobots: [],
  isLoading: false,
  errors: [],
}

describe('robots reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_ROBOTS_REQUEST', () => {
    expect(
      reducer({
        robots: [],
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.GET_ROBOTS_REQUEST,
      })
    ).toEqual(
      {
        robots: [],
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: true,
        errors: null,
      }
    )
  });

  const robots = [
    {
      "id": 1146,
      "name": "Kelly Newton",
      "configuration": {
          "color": "blue",
          "hasTracks": true,
          "hasWheels": true,
          "hasSentience": true,
          "numberOfRotors": 8
      },
      "status": [
          "rusty"
      ],
      "qa_status": null,
      "is_recyclable": true
    }
  ]

  it('should handle GET_ROBOTS_REQUEST_SUCCESS', () => {
    expect(
      reducer({
        robots: [],
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.GET_ROBOTS_REQUEST_SUCCESS,
        robots: robots,
      })
    ).toEqual(
      {
        "errors": null,
        "factorySecondsRobots": [],
        "isLoading": false,
        "qaPassedRobots": [],
        "robots": robots,
      }
    )
  });

  it('should handle GET_ROBOTS_REQUEST_FAILED', () => {
    expect(
      reducer({
        robots: [],
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.GET_ROBOTS_REQUEST_FAILED,
        errors: {'error_code': 1000}
      })
    ).toEqual(
      {
        robots: [],
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: {"error_code": 1000},
      }
    )
  });

  it('should handle PROCESS_ROBOTS_REQUEST', () => {
    expect(
      reducer({
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.PROCESS_ROBOTS_REQUEST,
      })
    ).toEqual(
      {
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: true,
        errors: null,
      }
    )
  });

  it('should handle PROCESS_ROBOTS_REQUEST_SUCCESS', () => {
    expect(
      reducer({
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.PROCESS_ROBOTS_REQUEST_SUCCESS,
        robots: robots,
      })
    ).toEqual(
      {
        robots: [],
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }
    )
  });

  it('should handle PROCESS_ROBOTS_REQUEST_FAILED', () => {
    expect(
      reducer({
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.PROCESS_ROBOTS_REQUEST_FAILED,
        errors: {'error_code': 1000}
      })
    ).toEqual(
      {
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: {'error_code': 1000},
      }
    )
  });

  it('should handle RECYCLE_ROBOTS_REQUEST', () => {
    expect(
      reducer({
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.RECYCLE_ROBOTS_REQUEST,
      })
    ).toEqual(
      {
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: true,
        errors: null,
      }
    )
  });

  it('should handle RECYCLE_ROBOTS_REQUEST_SUCCESS', () => {
    expect(
      reducer({
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.RECYCLE_ROBOTS_REQUEST_SUCCESS,
        robotIds: {
          recycleRobots: robots.map((obj) => obj.id),
        }
      })
    ).toEqual(
      {
        robots: [],
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }
    )
  });

  it('should handle RECYCLE_ROBOTS_REQUEST_FAILED', () => {
    expect(
      reducer({
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.RECYCLE_ROBOTS_REQUEST_FAILED,
        errors: {'error_code': 1000}
      })
    ).toEqual(
      {
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: {'error_code': 1000},
      }
    )
  });

  it('should handle EXTINGUISH_ROBOTS_FIRE_REQUEST', () => {
    expect(
      reducer({
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST,
      })
    ).toEqual(
      {
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: true,
        errors: null,
      }
    )
  });

  it('should handle EXTINGUISH_ROBOTS_FIRE_REQUEST_SUCCESS', () => {
    expect(
      reducer({
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST_SUCCESS,
        updatedRobot: {
          "id": 1146,
          "name": "Kelly Newton",
          "configuration": {
              "color": "blue",
              "hasTracks": true,
              "hasWheels": true,
              "hasSentience": true,
              "numberOfRotors": 8
          },
          "status": [],
          "qa_status": null,
          "is_recyclable": true
        }
      })
    ).toEqual(
      {
        robots: [
          {
            "id": 1146,
            "name": "Kelly Newton",
            "configuration": {
                "color": "blue",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": true,
                "numberOfRotors": 8
            },
            "status": [],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }
    )
  });

  it('should handle EXTINGUISH_ROBOTS_FIRE_REQUEST_FAILED', () => {
    expect(
      reducer({
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST_FAILED,
        errors: {'error_code': 1000}
      })
    ).toEqual(
      {
        robots: robots,
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: {'error_code': 1000},
      }
    )
  });

  it('should handle SHIP_ROBOTS_REQUEST', () => {
    expect(
      reducer({
        robots: [],
        qaPassedRobots: [
          {
            "id": 1099,
            "name": "Jessica Montes",
            "configuration": {
                "color": "blue",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": false,
                "numberOfRotors": 7
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        factorySecondsRobots: [
          {
            "id": 1147,
            "name": "Daniel Clark",
            "configuration": {
                "color": "red",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": true,
                "numberOfRotors": 9
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.SHIP_ROBOTS_REQUEST,
      })
    ).toEqual(
      {
        robots: [],
        qaPassedRobots: [
          {
            "id": 1099,
            "name": "Jessica Montes",
            "configuration": {
                "color": "blue",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": false,
                "numberOfRotors": 7
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        factorySecondsRobots: [
          {
            "id": 1147,
            "name": "Daniel Clark",
            "configuration": {
                "color": "red",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": true,
                "numberOfRotors": 9
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        isLoading: true,
        errors: null,
      }
    )
  });

  it('should handle SHIP_ROBOTS_REQUEST_SUCCESS', () => {
    expect(
      reducer({
        robots: [],
        qaPassedRobots: [
          {
            "id": 1099,
            "name": "Jessica Montes",
            "configuration": {
                "color": "blue",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": false,
                "numberOfRotors": 7
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        factorySecondsRobots: [
          {
            "id": 1147,
            "name": "Daniel Clark",
            "configuration": {
                "color": "red",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": true,
                "numberOfRotors": 9
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.SHIP_ROBOTS_REQUEST_SUCCESS,
        robotIds: {
          shipRobots: [1099, 1147],
        }
      })
    ).toEqual(
      {
        robots: [],
        qaPassedRobots: [],
        factorySecondsRobots: [],
        isLoading: false,
        errors: null,
      }
    )
  });

  it('should handle SHIP_ROBOTS_REQUEST_FAILED', () => {
    expect(
      reducer({
        robots: [],
        qaPassedRobots: [
          {
            "id": 1099,
            "name": "Jessica Montes",
            "configuration": {
                "color": "blue",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": false,
                "numberOfRotors": 7
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        factorySecondsRobots: [
          {
            "id": 1147,
            "name": "Daniel Clark",
            "configuration": {
                "color": "red",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": true,
                "numberOfRotors": 9
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        isLoading: false,
        errors: null,
      }, {
        type: robotActionTypes.SHIP_ROBOTS_REQUEST_FAILED,
        errors: {'error_code': 1000}
      })
    ).toEqual(
      {
        robots: [],
        qaPassedRobots: [
          {
            "id": 1099,
            "name": "Jessica Montes",
            "configuration": {
                "color": "blue",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": false,
                "numberOfRotors": 7
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        factorySecondsRobots: [
          {
            "id": 1147,
            "name": "Daniel Clark",
            "configuration": {
                "color": "red",
                "hasTracks": true,
                "hasWheels": true,
                "hasSentience": true,
                "numberOfRotors": 9
            },
            "status": [
                "loose screws"
            ],
            "qa_status": null,
            "is_recyclable": true
          }
        ],
        isLoading: false,
        errors: {'error_code': 1000},
      }
    )
  });

});

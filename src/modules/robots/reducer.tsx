import { IRobot } from "./pages/list/Page"

interface InitialState {
  robots: Array<IRobot>;
  qaPassedRobots: Array<IRobot>;
  factorySecondsRobots: Array<IRobot>;
  isLoading: boolean;
  errors: Array<any> | null;
}


export const actionTypes = {
  GET_ROBOTS_REQUEST: 'GET_ROBOTS_REQUEST',
  GET_ROBOTS_REQUEST_SUCCESS: 'GET_ROBOTS_REQUEST_SUCCESS',
  GET_ROBOTS_REQUEST_FAILED: 'GET_ROBOTS_REQUEST_FAILED',

  PROCESS_ROBOTS_REQUEST: 'PROCESS_ROBOTS_REQUEST',
  PROCESS_ROBOTS_REQUEST_SUCCESS: 'PROCESS_ROBOTS_REQUEST_SUCCESS',
  PROCESS_ROBOTS_REQUEST_FAILED: 'PROCESS_ROBOTS_REQUEST_FAILED',

  RECYCLE_ROBOTS_REQUEST: 'RECYCLE_ROBOTS_REQUEST',
  RECYCLE_ROBOTS_REQUEST_SUCCESS: 'RECYCLE_ROBOTS_REQUEST_SUCCESS',
  RECYCLE_ROBOTS_REQUEST_FAILED: 'RECYCLE_ROBOTS_REQUEST_FAILED',

  EXTINGUISH_ROBOTS_FIRE_REQUEST: 'EXTINGUISH_ROBOTS_FIRE',
  EXTINGUISH_ROBOTS_FIRE_REQUEST_SUCCESS: 'EXTINGUISH_ROBOTS_FIRE_SUCCESS',
  EXTINGUISH_ROBOTS_FIRE_REQUEST_FAILED: 'EXTINGUISH_ROBOTS_FIRE_FAILED',

  SHIP_ROBOTS_REQUEST: 'SHIP_ROBOTS_REQUEST',
  SHIP_ROBOTS_REQUEST_SUCCESS: 'SHIP_ROBOTS_REQUEST_SUCCESS',
  SHIP_ROBOTS_REQUEST_FAILED: 'SHIP_ROBOTS_REQUEST_FAILED',
}

const initialState: InitialState = {
  robots: [],
  qaPassedRobots: [],
  factorySecondsRobots: [],
  isLoading: false,
  errors: [],
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_ROBOTS_REQUEST:
    case actionTypes.RECYCLE_ROBOTS_REQUEST:
    case actionTypes.PROCESS_ROBOTS_REQUEST:
    case actionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST:
    case actionTypes.SHIP_ROBOTS_REQUEST:
      return Object.assign(
        {},
        state,
        { isLoading: true }
      );

    case actionTypes.GET_ROBOTS_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          errors: null,
          robots: action.robots.filter((obj: any) => obj.qa_status === null),
          qaPassedRobots: action.robots.filter((obj: any) => obj.qa_status === 'passed_qa'),
          factorySecondsRobots: action.robots.filter((obj: any) => obj.qa_status === 'factory_seconds'),
        }
      );

    case actionTypes.PROCESS_ROBOTS_REQUEST_SUCCESS:
      const robotIds = action.robots.map((obj: any) => obj.id)
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          errors: null,
          robots: state.robots.filter((obj) => !robotIds.includes(obj.id)),
          qaPassedRobots: state.qaPassedRobots.concat(action.robots.filter((obj: any) => obj.qa_status === 'passed_qa')),
          factorySecondsRobots: state.factorySecondsRobots.concat(action.robots.filter((obj: any) => obj.qa_status === 'factory_seconds'))
        }
      );

    case actionTypes.RECYCLE_ROBOTS_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          errors: null,
          robots: state.robots.filter((obj) => !action.robotIds.recycleRobots.includes(obj.id))
        }
      );

    case actionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          errors: null,
          robots: state.robots.map((obj) => {
            if (obj.id === action.updatedRobot.id) {
              return action.updatedRobot;
            }
            return obj;
          })
        }
      );
    
    case actionTypes.SHIP_ROBOTS_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          errors: null,
          qaPassedRobots: state.qaPassedRobots.filter((obj) => !action.robotIds.shipRobots.includes(obj.id)),
          factorySecondsRobots: state.factorySecondsRobots.filter((obj) => !action.robotIds.shipRobots.includes(obj.id)),
        }
      );

    case actionTypes.GET_ROBOTS_REQUEST_FAILED:
    case actionTypes.PROCESS_ROBOTS_REQUEST_FAILED:
    case actionTypes.RECYCLE_ROBOTS_REQUEST_FAILED:
    case actionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST_FAILED:
    case actionTypes.SHIP_ROBOTS_REQUEST_FAILED:
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          errors: action.errors
        }
      );

    default:
      return state;
  }
}

export const actionCreators = {
  getRobotsRequest: () => ({ type: actionTypes.GET_ROBOTS_REQUEST }),
  processRobotsRequest: (robotIds: []) => ({ type: actionTypes.PROCESS_ROBOTS_REQUEST, robotIds }),
  recycleRobotsRequest: (robotIds: []) => ({ type: actionTypes.RECYCLE_ROBOTS_REQUEST, robotIds }),
  extinguishFireFromRobotRequest: (robot: any) => ({ type: actionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST, robot }),
  shipRobotsRequest: (robotIds: []) => ({ type: actionTypes.SHIP_ROBOTS_REQUEST, robotIds }),
};

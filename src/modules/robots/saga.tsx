import { call, put, takeEvery } from 'redux-saga/effects';
import { actionTypes as robotActionTypes } from './reducer';
import { 
  getRobots as getRobotsService,
  processRobots as processRobotsService,
  recycleRobot as recycleRobotService,
  extinguishFireFromRobot as extinguishFireFromRobotService,
  shipRobots as shipRobotsService
}  from './service';
import { message } from 'antd'


function* getRobots(action: any) {
  try {
    const robots = yield call(getRobotsService);

    yield put({ type: robotActionTypes.GET_ROBOTS_REQUEST_SUCCESS, robots });
  } catch (err) {
    const error = err.message || err;

    yield put({ type: robotActionTypes.GET_ROBOTS_REQUEST_FAILED, error });

    message.error('Failed to get robots');
  }
}

function* processRobots(action: any) {
  try {

    const { robotIds } = action;
    const robots = yield call(processRobotsService, robotIds);

    yield put({ type: robotActionTypes.PROCESS_ROBOTS_REQUEST_SUCCESS, robots });

    message.success('Successfully processed robots');
  } catch (err) {
    const error = err.message || err;

    yield put({ type: robotActionTypes.PROCESS_ROBOTS_REQUEST_FAILED, error });

    message.error('Failed to process robots');
  }
}

function* recycleRobots(action: any) {
  try {
    const { robotIds } = action;

    yield call(recycleRobotService, robotIds);
    yield put({ type: robotActionTypes.RECYCLE_ROBOTS_REQUEST_SUCCESS, robotIds });

    message.success('Successfully recycled robots');
  } catch (err) {
    const error = err.message || err;

    yield put({ type: robotActionTypes.RECYCLE_ROBOTS_REQUEST_FAILED, error });

    message.error('Failed to recycled robots');
  }
}

function* extinguishFireFromRobot(action: any) {
  try {
    const { robot } = action;
    const updatedRobot = yield call(extinguishFireFromRobotService, robot);

    yield put({ type: robotActionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST_SUCCESS, updatedRobot });

    message.success('Successfully extinguished fire from robot');
  } catch (err) {
    const error = err.message || err;

    yield put({ type: robotActionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST_FAILED, error });

    message.error('Failed to extinguish fire from robot');
  }
}

function* shipRobots(action: any) {
  try {
    const { robotIds } = action;

    yield call(shipRobotsService, robotIds);
    yield put({ type: robotActionTypes.SHIP_ROBOTS_REQUEST_SUCCESS, robotIds });

    message.success('Successfully shipped robots');

  } catch (err) {
    const error = err.message || err;

    yield put({ type: robotActionTypes.SHIP_ROBOTS_REQUEST_FAILED, error });

    message.error('Failed to ship robots');
  }
}

function* watchGetRobotsRequest() {
  yield takeEvery(robotActionTypes.GET_ROBOTS_REQUEST, getRobots);
}

function* watchProcessRobotsRequest() {
  yield takeEvery(robotActionTypes.PROCESS_ROBOTS_REQUEST, processRobots);
}

function* watchRecycleRobotsRequest() {
  yield takeEvery(robotActionTypes.RECYCLE_ROBOTS_REQUEST, recycleRobots);
}

function* watchExtinguishFireFromRobotRequest() {
  yield takeEvery(robotActionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST, extinguishFireFromRobot);
}

function* watchShipRobotRequest() {
  yield takeEvery(robotActionTypes.SHIP_ROBOTS_REQUEST, shipRobots);
}

export default [
  watchGetRobotsRequest(),
  watchProcessRobotsRequest(),
  watchRecycleRobotsRequest(),
  watchExtinguishFireFromRobotRequest(),
  watchShipRobotRequest(),
]

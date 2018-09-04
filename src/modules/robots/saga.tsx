import { call, put, takeEvery } from 'redux-saga/effects';
import { actionTypes as robotActionTypes } from './reducer';
import { 
  getRobotsForQA,
  postProcessRobots,
  deleteRecycleRobots,
  extinguishFireFromRobot,
  shipRobots as shipRobotsService
}  from './service';
import { message } from 'antd'


function* getRobots(action: any) {

  try {
    const robots = yield call(getRobotsForQA);

    yield put({ type: robotActionTypes.GET_ROBOTS_REQUEST_SUCCESS, robots });
  } catch (err) {
    const error = err.message || err;
    yield put({ type: robotActionTypes.GET_ROBOTS_REQUEST_FAILED, error });

    message.error('Failed to get robots');
  }
}

function* updateRobots(action: any) {
  const { robotIds } = action;

  try {
    const robots = yield call(postProcessRobots, robotIds);
    yield put({ type: robotActionTypes.PROCESS_ROBOTS_REQUEST_SUCCESS, robots });
    message.success('Successfully processed robots');
  } catch (err) {
    // const error = err.message || err;
    yield put({ type: robotActionTypes.PROCESS_ROBOTS_REQUEST_FAILED, robotIds });

    message.error('Failed to process robots');
  }
}

function* deleteRobots(action: any) {
  const { robotIds } = action;

  try {
    yield call(deleteRecycleRobots, robotIds);
    yield put({ type: robotActionTypes.RECYCLE_ROBOTS_REQUEST_SUCCESS, robotIds });
    message.success('Successfully recycled robots');

  } catch (err) {
    // const error = err.message || err;
    yield put({ type: robotActionTypes.RECYCLE_ROBOTS_REQUEST_FAILED, robotIds });

    message.error('Failed to recycled robots');
  }
}

function* extinguishFireRobots(action: any) {
  try {
    const { robot } = action;

    const updatedRobot = yield call(extinguishFireFromRobot, robot);

    yield put({ type: robotActionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST_SUCCESS, updatedRobot });
  } catch (err) {
    const error = err.message || err;
    yield put({ type: robotActionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST_FAILED, error });

    message.error('Failed to get robots');
  }
}

function* shipRobots(action: any) {
  const { robotIds } = action;

  try {
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
  yield takeEvery(robotActionTypes.PROCESS_ROBOTS_REQUEST, updateRobots);
}

function* watchRecycleRobotsRequest() {
  yield takeEvery(robotActionTypes.RECYCLE_ROBOTS_REQUEST, deleteRobots);
}

function* watchExtinguishFireFromRobotRequest() {
  yield takeEvery(robotActionTypes.EXTINGUISH_ROBOTS_FIRE_REQUEST, extinguishFireRobots);
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

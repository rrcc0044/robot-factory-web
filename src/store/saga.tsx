import { all } from 'redux-saga/effects'
import robotSagas from '../modules/robots/saga'

export default function* rootSaga() {
  yield all ([
    ...robotSagas
  ])
}

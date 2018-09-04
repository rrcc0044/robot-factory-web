import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../store/reducers'
import sagas from './saga'

const sagaMiddleware = createSagaMiddleware()

// Middleware and Enhancers
const enhancers = [
  applyMiddleware(sagaMiddleware)
]

const store = createStore(rootReducer, {}, compose(...enhancers))

sagaMiddleware.run(sagas)

export default store

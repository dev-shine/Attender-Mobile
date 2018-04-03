import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reducers from '../Reducers';
import Sagas from '../Sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  Reducers,
  compose(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(Sagas);

export default store;
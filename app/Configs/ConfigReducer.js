import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import Reducers from '../Reducers';
import Sagas from '../Sagas';
import api from 'ApiFrisbee';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  Reducers,
  compose(applyMiddleware(sagaMiddleware)),
  applyMiddleware(thunk.withExtraArgument({ api })),
);
sagaMiddleware.run(Sagas);

export default store;
import { fork } from 'redux-saga/effects';
import { watchAuthentication } from './auth';

export default function* rootSaga() {
  yield [
    fork(watchAuthentication),
  ];
}

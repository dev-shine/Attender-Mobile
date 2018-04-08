import { fork } from 'redux-saga/effects';
import { watchAuthentication } from './auth';
import { watchSubscription } from './subscription';

export default function* rootSaga() {
  yield [
    fork(watchAuthentication),
    fork(watchSubscription),
  ];
}

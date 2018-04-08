import { put, call, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import API from 'API';
export function* check() {
  try {
    yield put({ type: 'LOADING_SUBSCRIPTION', payload: true });
    const check = yield call(API.get, 'subscription/check', {}, API.REQUEST_TOKEN);
    if (check.status) {
      console.warn('fds')
      yield put(NavigationActions.navigate('Subscription'));
    } else {
      console.warn();
      yield put(NavigationActions.navigate('SubscriptionSubscribe'));
    }
    yield put({ type: 'CHECK_SUBSCRIPTION', payload: check.status });
    yield put({ type: 'LOADING_SUBSCRIPTION', payload: false });
  } catch (error) {
    console.warn('Check', error);
    yield put({ type: 'LOADING_SUBSCRIPTION', payload: false });
  }
}

export function* watchSubscription() {
  yield takeLatest('GET_CHECK_SUBSCRIPTION', check);
}

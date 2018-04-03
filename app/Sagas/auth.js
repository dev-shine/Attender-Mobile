import { put, takeLatest } from 'redux-saga/effects';

export function* authenticate(action) {
  try {
    yield put({ type: 'GET_AUTH', payload: action.payload });
  } catch (error) {
    // console.log(error);
  }
}

export function* watchAuthentication() {
  yield takeLatest('GET_AUTHENTICATION', authenticate);
}

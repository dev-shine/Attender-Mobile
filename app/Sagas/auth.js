import { put, takeLatest } from 'redux-saga/effects';

export function* setAuth(action) {
  try {
    yield put({ type: 'SET_AUTH', payload: action.payload });
  } catch (error) {
    // console.log(error);
  }
}

export function* setUser(action) {
  try {
    yield put({ type: 'SET_USER', payload: action.payload });
  } catch (error) {
    // console.log(error);
  }
}

export function* resetData(action) {
  try {
    yield put({ type: 'SET_USER', payload: {} });
    yield put({ type: 'SET_AUTH', payload: '' });
  } catch (error) {
    // console.log(error);
  }
}

export function* watchAuthentication() {
  yield takeLatest('SET_AUTHENTICATION', setAuth);
  yield takeLatest('SET_USERDATA', setUser);
  yield takeLatest('LOGOUT_RESET', resetData);
}

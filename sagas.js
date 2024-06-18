import { put, takeEvery, all, call } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* helloSaga(){
  console.log('Hello Sagas!');
}

export function* incrementAsync() {
  console.log('Increment')
  yield call(delay, 3000);
  yield put({ type: 'INCREMENT' });
}

export function* wathcIncrementAsync() {
  console.log('Increment Async')
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga(){
  yield all([
    helloSaga(),
    wathcIncrementAsync()
  ])
}
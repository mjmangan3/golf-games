import { put, takeLatest, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { SELECT_DRAWER_ITEM } from './constants';

export function* selectPushSelectDrawerItemSaga() {
  yield takeLatest(SELECT_DRAWER_ITEM, pushSelectDrawerItem);
}

function* pushSelectDrawerItem(action) {
  yield put(push(action.page));
}

// Individual exports for testing
export default function* navigationContainerSaga() {
  yield all([selectPushSelectDrawerItemSaga()]);
  // See example in containers/HomePage/saga.js
}

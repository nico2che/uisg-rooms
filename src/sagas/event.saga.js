import { call, put } from "redux-saga/effects";

import { actions } from "../redux/actions";
import * as api from "../api";

export function* getEvents() {
  const events = yield call(api.getEvents);
  if (events) {
    yield put(actions.event.getAllSuccess(events));
  } else {
    yield put(actions.event.getAllFailure());
  }
}

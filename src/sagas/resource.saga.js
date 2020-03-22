import { call, put, fork } from "redux-saga/effects";

import { actions } from "../redux/actions";
import * as api from "../api";

export function* getResources() {
  const resources = yield call(api.getResources);
  if (resources) {
    yield put(actions.resource.getAllSuccess(resources));
  } else {
    yield put(actions.resource.getAllFailure());
  }
}

export function* deleteResource(action) {
  const { id } = action;
  const resources = yield fork(api.deleteResource, id);
  if (resources) {
    yield put(actions.resource.deleteSuccess(id));
  } else {
    yield put(actions.resource.deleteFailure());
  }
}

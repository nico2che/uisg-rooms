import { all, takeLatest } from "redux-saga/effects";

import { actionTypes } from "../redux/actions";

import { getEvents } from "./event.saga";
import { getResources, deleteResource } from "./resource.saga";

function* sagas() {
  yield all([
    takeLatest(actionTypes.event.GET_ALL, getEvents),

    takeLatest(actionTypes.resource.GET_ALL, getResources),
    takeLatest(actionTypes.resource.DELETE, deleteResource)
  ]);
}

export default sagas;

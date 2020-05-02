import { combineReducers } from "redux";
import { combineStores } from "redux-zap";

import events from "./events.js";
import resources from "./resources.js";
import settings from "./settings.js";
import user from "./user.js";

export const { reducers, actions, initialState } = combineStores({
  events,
  resources,
  settings,
  user,
});

export default combineReducers(reducers);

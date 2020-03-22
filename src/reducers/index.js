import { combineReducers } from "redux";

import eventReducer from "./event.reducer";
import resourceReducer from "./resource.reducer";
import settingReducer from "./setting.reducer";

const reducers = combineReducers({
  events: eventReducer,
  resources: resourceReducer,
  settings: settingReducer
});

export default reducers;

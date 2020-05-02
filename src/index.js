import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import reducers from "./redux";

import App from "./App";
import "./index.scss";

import * as serviceWorker from "./serviceWorker";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(
    createLogger({
      collapsed: true,
    })
  );
}

const store = createStore(reducers, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

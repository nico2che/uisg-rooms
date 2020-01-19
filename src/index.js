import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { createLogger } from "redux-logger";

import reducers from "./reducers";
import sagas from "./sagas";

import App from "./App";
import "./index.scss";

import * as serviceWorker from "./serviceWorker";

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// const persistConfig = {
//   key: "root",
//   storage
// };

if (process.env.NODE_ENV === "development") {
  middlewares.push(
    createLogger({
      collapsed: true
    })
  );
}

const store = createStore(
  // persistReducer(persistConfig, reducers),
  applyMiddleware(...middlewares)
);

// sagaMiddleware.run(sagas);

// const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

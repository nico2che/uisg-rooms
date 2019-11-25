import React from "react";
import { Switch, BrowserRouter, Redirect, Route } from "react-router-dom";

import App from "./containers/App";

export default function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" component={App} />
        {/* <Redirect exact to="/vote" /> */}
      </Switch>
    </BrowserRouter>
  );
}

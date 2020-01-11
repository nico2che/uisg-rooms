import React from "react";
import { Switch, BrowserRouter, Redirect, Route } from "react-router-dom";

import App from "./containers/App";
import Settings from "./containers/Settings";

export default function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/settings" component={Settings} />
        {/* <Redirect exact to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
}

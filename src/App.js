import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Switch, BrowserRouter, Redirect, Route } from "react-router-dom";

import Calendar from "./containers/Calendar";
import Settings from "./containers/Settings";

import TopBar from "./components/TopBar";
import "./App.scss";

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  }
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <TopBar />
      <main className={classes.content}>
        <Switch>
          <Route exact path="/" component={Calendar} />
          <Route path="/settings" component={Settings} />
          {/* <Redirect exact to="/" /> */}
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;

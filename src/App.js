import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Switch, BrowserRouter, Route } from "react-router-dom";

import Calendar from "./containers/Calendar";
import Settings from "./containers/Settings";
import Resources from "./containers/Resources";
import CustomFields from "./containers/CustomFields";

import TopBar from "./components/TopBar";
import "./App.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    marginTop: "64px",
    height: "calc(100vh - 64px)",
    overflow: "auto",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className={classes.root}>
        <TopBar />
        <main className={classes.content}>
          <Switch>
            <Route exact path="/" component={Calendar} />
            <Route path="/settings" component={Settings} />
            <Route path="/resources" component={Resources} />
            <Route path="/custom-fields" component={CustomFields} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { useSelector } from "react-redux";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Calendar from "./containers/Calendar";
import Settings from "./containers/Settings";
import Resources from "./containers/Resources";
import CustomFields from "./containers/CustomFields";
import Users from "./containers/Users";

import TopBar from "./components/TopBar";
import "./App.scss";

const useStyles = makeStyles(() => ({
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

function PrivateRoute(props) {
  const { user } = useSelector((state) => state.session);
  if (!user) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
}

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className={classes.root}>
        <TopBar />
        <main className={classes.content}>
          <Switch>
            <Route exact path="/" component={Calendar} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/resources" component={Resources} />
            <PrivateRoute path="/custom-fields" component={CustomFields} />
            <PrivateRoute path="/users" component={Users} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

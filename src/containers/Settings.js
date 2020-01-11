import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import TopBar from "../components/TopBar";
import "./App.scss";

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

function Settings() {
  const classes = useStyles();
  return (
    <div>
      <TopBar />
      <main className={classes.content}>Settings page</main>
    </div>
  );
}

export default Settings;

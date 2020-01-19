import React from "react";

import Grid from "@material-ui/core/Grid";
import GeneralSettings from "./Settings/GeneralSettings";
import SpacesSettings from "./Settings/SpacesSettings";

import { makeStyles } from "@material-ui/core/styles";

import TopBar from "../components/TopBar";
import "./App.scss";

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    margin: theme.spacing(3),
    overflow: "auto"
  },
  card: {
    backgroundColor: "white"
  },
  form: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  saveButton: {
    marginLeft: "auto"
  }
}));

function Settings() {
  const classes = useStyles();
  return (
    <div>
      <TopBar />
      <main className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <GeneralSettings />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SpacesSettings />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Settings;

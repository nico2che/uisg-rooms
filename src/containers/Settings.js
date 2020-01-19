import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GeneralSettings from "./Settings/GeneralSettings";
import SpacesSettings from "./Settings/SpacesSettings";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: "white"
  },
  form: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  saveButton: {
    marginLeft: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

function Settings() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <GeneralSettings />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SpacesSettings />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings;

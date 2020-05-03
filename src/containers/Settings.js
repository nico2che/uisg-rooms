import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import GeneralSettings from "./Settings/GeneralSettings";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function Settings() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <GeneralSettings />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings;

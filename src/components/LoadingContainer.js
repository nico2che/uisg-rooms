import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function LoadingContainer() {
  const classes = useStyles();
  return (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  );
}

export default LoadingContainer;

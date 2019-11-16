import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import TopBar from "./TopBar";
import "./App.scss";

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex"
  },
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

const localizer = momentLocalizer(moment);
const myEventsList = [
  {
    title: "Evenement test",
    start: new Date("2019-11-10"),
    end: new Date("2019-11-12")
  }
];

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TopBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </Container>
      </main>
    </div>
  );
}

export default App;

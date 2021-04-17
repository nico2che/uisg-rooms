import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  arrows: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
  },
  noElevation: {
    boxShadow: 0,
  },
}));

const views = [
  { id: "timeGridDay", name: "Day" },
  { id: "timeGridWeek", name: "Week" },
  { id: "dayGridMonth", name: "Month" },
];

function ToolBar(props) {
  const { calendarRef } = props;
  const classes = useStyles();

  if (!calendarRef || !calendarRef.current) {
    return "";
  }
  const calendar = calendarRef.current.getApi();
  return (
    <AppBar position="relative" color="inherit" elevation={0}>
      <Toolbar>
        <Typography variant="h6">
          {format(calendar.getDate(), "MMMM yyyy")}
        </Typography>
        <ButtonGroup color="primary" className={classes.arrows}>
          <Button onClick={() => calendar.prev()}>
            <KeyboardArrowLeft />
          </Button>
          <Button onClick={() => calendar.next()}>
            <KeyboardArrowRight />
          </Button>
        </ButtonGroup>
        <ButtonGroup color="primary">
          {views.map((view) => (
            <Button key={view.id} onClick={() => calendar.changeView(view.id)}>
              {view.name}
            </Button>
          ))}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}

export default ToolBar;

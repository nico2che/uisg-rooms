import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  arrows: {
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
        <ButtonGroup color="primary">
          {views.map((view) => (
            <Button key={view.id} onClick={() => calendar.changeView(view.id)}>
              {view.name}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup color="primary" className={classes.arrows}>
          <Button onClick={() => calendar.prev()}>
            <KeyboardArrowLeft />
          </Button>
          <Button onClick={() => calendar.next()}>
            <KeyboardArrowRight />
          </Button>
        </ButtonGroup>
        <DatePicker
          autoOk
          className={classes.arrows}
          variant="inline"
          disableToolbar
          value={new Date()}
          onChange={(date) => {}}
        />
      </Toolbar>
    </AppBar>
  );
}

export default ToolBar;

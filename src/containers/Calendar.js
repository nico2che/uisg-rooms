import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import Container from "@material-ui/core/Container";

import { actions } from "../store";

import DialogEvent from "../components/DialogEvent";
import LoadingContainer from "../components/LoadingContainer";
import ToolBar from "./Calendar/Toolbar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "100%",
    backgroundColor: "white",
    padding: 0,
    height: "100%",
  },
}));

const localizer = momentLocalizer(moment);

function eventToCalendar(event) {
  const { id, name: title, startDate, endDate } = event;
  return { id, title, start: new Date(startDate), end: new Date(endDate) };
}

function CalendarComponent() {
  const classes = useStyles();
  const events = useSelector((state) => state.events);
  const resources = useSelector((state) => state.resources);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState();

  useEffect(() => {
    if (!events.list) {
      dispatch(actions.events.load());
    }
    if (!resources.list) {
      dispatch(actions.resources.load());
    }
  }, [dispatch, events.list, resources.list]);

  const handleSelect = ({ start, end }) => {
    setSelected({ startDate: start.getTime(), endDate: end.getTime() });
  };
  const closeDialog = () => {
    setSelected();
  };

  if (!events.list || !resources.list) {
    return <LoadingContainer />;
  }
  return (
    <Container className={classes.container}>
      <Calendar
        selectable
        localizer={localizer}
        events={events.list.map(eventToCalendar)}
        resources={resources.list}
        resourceIdAccessor="id"
        resourceTitleAccessor="name"
        onSelectSlot={handleSelect}
        onSelectEvent={(event) => setSelected(event)}
        defaultView={Views.MONTH}
        views={["day", "month", "week", "work_week", "agenda"]}
        step={30}
        defaultDate={new Date()}
        components={{ toolbar: ToolBar }}
      />
      {!!selected && <DialogEvent onClose={closeDialog} selected={selected} />}
    </Container>
  );
}

export default CalendarComponent;

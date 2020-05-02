import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import Container from "@material-ui/core/Container";

import { actions } from "../redux/";

import DialogCreateEvent from "../components/DialogCreateEvent";
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

function CalendarComponent() {
  const events = useSelector((state) => state.events);
  const resources = useSelector((state) => state.resources);
  const dispatch = useDispatch();

  const [selectedDates, setSelectedDates] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (!events.list) {
      dispatch(actions.events.load());
    }
    if (!resources.list) {
      dispatch(actions.resources.load());
    }
  }, [dispatch, events.list, resources.list]);

  const handleSelect = (selectedDates) => {
    setSelectedDates(selectedDates);
  };

  const closeDialog = (createdEvent) => {
    // if (createdEvent) {
    //   this.setState({
    //     openCreateEvent: false,
    //     events: [createdEvent, ...this.state.events]
    //   });
    //   return;
    // }
    setSelectedDates(null);
  };

  if (!events.list || !resources.list) {
    return <LoadingContainer />;
  }
  return (
    <Container className={classes.container}>
      <Calendar
        selectable
        localizer={localizer}
        events={events.list}
        resources={resources.list}
        resourceIdAccessor="id"
        resourceTitleAccessor="name"
        onSelectSlot={handleSelect}
        defaultView={Views.MONTH}
        views={["day", "month", "week", "work_week", "agenda"]}
        step={30}
        defaultDate={new Date()}
        components={{ toolbar: ToolBar }}
      />
      <DialogCreateEvent
        isOpen={!!selectedDates}
        onClose={closeDialog}
        selectedDates={selectedDates}
      />
    </Container>
  );
}

export default CalendarComponent;

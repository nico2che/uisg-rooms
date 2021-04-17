import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

import { makeStyles } from "@material-ui/core/styles";

import { actions } from "../store";

import DialogEvent from "../components/DialogEvent";
import LoadingContainer from "../components/LoadingContainer";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
}));

function eventToCalendar(event) {
  const { name: title, startDate, endDate } = event;
  return {
    title,
    start: new Date(startDate),
    end: new Date(endDate),
    ...event,
  };
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

  if (!events.list || !resources.list) {
    return <LoadingContainer />;
  }

  return (
    <div className={classes.container}>
      <FullCalendar
        selectable
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable
        eventClick={({ event }) => setSelected(event)}
        select={setSelected}
        height="100%"
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimeGridPlugin,
        ]}
        resources={resources.list}
        events={(events.list || []).map(eventToCalendar)}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      />

      {selected && (
        <DialogEvent onClose={() => setSelected()} selected={selected} />
      )}
    </div>
  );
}

export default CalendarComponent;

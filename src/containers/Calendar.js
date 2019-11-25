import React from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import DialoagCreateEvent from "../components/DialogCreateEvent";

const localizer = momentLocalizer(moment);
const myEventsList = [
  {
    title: "Evenement test",
    start: new Date("2019-11-10"),
    end: new Date("2019-11-12")
  }
];

class CalendarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateEvent: false
    };
  }

  handleSelect = ({ start, end }) => {
    // TODO: save schedules
    this.setState({ openCreateEvent: true });
  };

  createEvent = () => {
    // TODO: save event
    this.closeDialog();
  };

  closeDialog = () => {
    this.setState({ openCreateEvent: false });
  };

  render() {
    return (
      <div>
        <Calendar
          selectable
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={this.handleSelect}
        />
        <DialoagCreateEvent
          isOpen={this.state.openCreateEvent}
          onClose={this.closeDialog}
        />
      </div>
    );
  }
}

export default CalendarComponent;

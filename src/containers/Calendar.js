import React from "react";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

import Container from "@material-ui/core/Container";

import DialoagCreateEvent from "../components/DialogCreateEvent";
import ToolBar from "./Calendar/Toolbar";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    backgroundColor: "white",
    padding: 0,
    height: "100%"
  }
});

const localizer = momentLocalizer(moment);
const myEventsList = [
  {
    title: "Evenement test",
    start: new Date("2019-11-10"),
    end: new Date("2019-11-12")
  }
];

const resourceMap = [
  { resourceId: 1, resourceTitle: "Board room" },
  { resourceId: 2, resourceTitle: "Training room" },
  { resourceId: 3, resourceTitle: "Meeting room 1" },
  { resourceId: 4, resourceTitle: "Meeting room 2" }
];

class CalendarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateEvent: false,
      selectedDates: {}
    };
  }

  handleSelect = selectedDates => {
    // TODO: save schedules
    this.setState({ openCreateEvent: true, selectedDates });
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
      <Container className={this.props.classes.container}>
        <Calendar
          selectable
          localizer={localizer}
          events={myEventsList}
          onSelectSlot={this.handleSelect}
          defaultView={Views.DAY}
          views={["day", "month", "week", "work_week", "agenda"]}
          step={20}
          defaultDate={new Date()}
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          components={{ toolbar: ToolBar }}
        />
        <DialoagCreateEvent
          isOpen={this.state.openCreateEvent}
          onClose={this.closeDialog}
          selectedDates={this.state.selectedDates}
        />
      </Container>
    );
  }
}

export default withStyles(styles)(CalendarComponent);

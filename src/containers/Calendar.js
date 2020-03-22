import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import Container from "@material-ui/core/Container";

import * as Actions from "../redux/actions";
import * as api from "../api";

import DialogCreateEvent from "../components/DialogCreateEvent";
import LoadingContainer from "../components/LoadingContainer";
import ToolBar from "./Calendar/Toolbar";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  container: {
    maxWidth: "100%",
    backgroundColor: "white",
    padding: 0,
    height: "100%"
  }
});

const localizer = momentLocalizer(moment);

class CalendarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      resources: [],
      events: [],
      openCreateEvent: false,
      selectedDates: {}
    };
  }

  componentDidMount() {
    Promise.all([
      api.getResources(),
      api.getEvents()
    ]).then(([resources, events]) =>
      this.setState({ resources, events, loading: false })
    );
  }

  handleSelect = selectedDates => {
    // TODO: save schedules
    this.setState({ openCreateEvent: true, selectedDates });
  };

  closeDialog = createdEvent => {
    if (createdEvent) {
      console.log([createdEvent, ...this.state.events]);
      this.setState({
        openCreateEvent: false,
        events: [createdEvent, ...this.state.events]
      });
      return;
    }
    this.setState({ openCreateEvent: false });
  };

  render() {
    const {
      loading,
      resources,
      events,
      openCreateEvent,
      selectedDates
    } = this.state;

    if (loading) {
      return <LoadingContainer />;
    }
    return (
      <Container className={this.props.classes.container}>
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          resources={resources}
          resourceIdAccessor="id"
          resourceTitleAccessor="name"
          onSelectSlot={this.handleSelect}
          defaultView={Views.MONTH}
          views={["day", "month", "week", "work_week", "agenda"]}
          step={30}
          defaultDate={new Date()}
          components={{ toolbar: ToolBar }}
        />
        <DialogCreateEvent
          isOpen={openCreateEvent}
          onClose={this.closeDialog}
          selectedDates={selectedDates}
        />
      </Container>
    );
  }
}

export default withStyles(styles)(CalendarComponent);

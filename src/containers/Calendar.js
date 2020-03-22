import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";

import { actions } from "../redux/actions";

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
      openCreateEvent: false,
      selectedDates: {}
    };
  }

  componentDidMount() {
    if (!this.props.resources) {
      this.props.getResources();
    }
    if (!this.props.events) {
      this.props.getEvents();
    }
  }

  handleSelect = selectedDates => {
    this.setState({ openCreateEvent: true, selectedDates });
  };

  closeDialog = createdEvent => {
    // if (createdEvent) {
    //   this.setState({
    //     openCreateEvent: false,
    //     events: [createdEvent, ...this.state.events]
    //   });
    //   return;
    // }
    this.setState({ openCreateEvent: false });
  };

  render() {
    const { openCreateEvent, selectedDates } = this.state;
    const { events = [], resources = [], loading } = this.props;

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

const mapStateToProps = ({ events, resources }) => ({
  events: events.events,
  resources: resources.resources,
  loading: events.loading || resources.loading
});

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(actions.event.getAll()),
  getResources: () => dispatch(actions.resource.getAll())
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)
);

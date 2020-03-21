import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import Container from "@material-ui/core/Container";

import firebase from "../firebase";

import DialogCreateEvent from "../components/DialogCreateEvent";
import LoadingContainer from "../components/LoadingContainer";
import ToolBar from "./Calendar/Toolbar";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    maxWidth: "100%",
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

  getResources() {
    const dbSpace = firebase.firestore().collection("spaces");
    return dbSpace
      .orderBy("order")
      .get()
      .then(collection => {
        const docs = [];
        collection.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
        return docs;
      });
  }

  getEvents() {
    const dbEvent = firebase.firestore().collection("events");
    return dbEvent.get().then(collection => {
      const docs = [];
      collection.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
      return docs;
    });
  }

  componentDidMount() {
    Promise.all([
      this.getResources(),
      this.getEvents()
    ]).then(([resources, events]) =>
      this.setState({ resources, events, loading: false })
    );
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
    if (this.state.loading) {
      return <LoadingContainer />;
    }
    return (
      <Container className={this.props.classes.container}>
        <Calendar
          selectable
          localizer={localizer}
          events={myEventsList}
          resources={this.state.resources}
          resourceIdAccessor="id"
          resourceTitleAccessor="name"
          onSelectSlot={this.handleSelect}
          defaultView={Views.DAY}
          views={["day", "month", "week", "work_week", "agenda"]}
          step={30}
          defaultDate={new Date()}
          components={{ toolbar: ToolBar }}
        />
        <DialogCreateEvent
          isOpen={this.state.openCreateEvent}
          onClose={this.closeDialog}
          selectedDates={this.state.selectedDates}
        />
      </Container>
    );
  }
}

export default withStyles(styles)(CalendarComponent);

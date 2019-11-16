import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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
    const { openCreateEvent } = this.state;
    const { classes } = this.props;
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
        <Dialog
          fullScreen
          open={openCreateEvent}
          onClose={this.closeDialog}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.closeDialog}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Créer un évènement
              </Typography>
              <Button autoFocus color="inherit" onClick={this.createEvent}>
                Sauvegarder
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Default notification ringtone"
                secondary="Tethys"
              />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarComponent);

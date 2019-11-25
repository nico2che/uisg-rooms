import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import firebase from "../firebase";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DialogLogin from "./DialogLogin";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

function Logged({ user }) {
  return (
    <div>
      {user.email}
      <Button onClick={() => firebase.auth().signOut()}>
        <ExitToAppIcon style={{ color: "white" }} />
      </Button>
    </div>
  );
}

function TopBar() {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  firebase.auth().onAuthStateChanged(setUser);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          UISG Rooms
        </Typography>
        {user ? <Logged user={user} /> : <DialogLogin />}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

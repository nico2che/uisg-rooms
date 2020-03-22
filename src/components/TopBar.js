import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, NavLink } from "react-router-dom";

import * as api from "../api";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Settings from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DialogLogin from "./DialogLogin";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  homeLink: {
    textDecoration: "none",
    color: "white"
  }
}));

function Logged({ user }) {
  const history = useHistory();
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => history.push("/settings")}
        color="inherit"
      >
        <Settings />
      </IconButton>
      {user.email}
      <IconButton onClick={() => api.logOut()} color="inherit">
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
}

function TopBar() {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  api.getCurrentUser().then(setUser);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <NavLink to="/" className={classes.homeLink}>
            UISG Rooms
          </NavLink>
        </Typography>
        {user ? <Logged user={user} /> : <DialogLogin />}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

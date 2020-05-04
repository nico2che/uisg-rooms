import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";

import { actions } from "../redux";
import DialogLogin from "./DialogLogin";
import Menu from "./Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  homeLink: {
    textDecoration: "none",
    color: "inherit",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

function TopBar() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(actions.user.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, user && open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          {user && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            component="h1"
            variant="h6"
            noWrap
            className={classes.title}
          >
            <NavLink to="/" className={classes.homeLink}>
              UISG Rooms
            </NavLink>
          </Typography>
          {user ? (
            <div>
              {user.email}
              <IconButton
                onClick={() => dispatch(actions.user.logOut())}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
          ) : (
            <DialogLogin />
          )}
        </Toolbar>
      </AppBar>
      {user && (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Menu />
        </Drawer>
      )}
    </>
  );
}

export default TopBar;

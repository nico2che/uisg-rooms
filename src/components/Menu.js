import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EventIcon from "@material-ui/icons/Event";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";

const mainListItems = [
  {
    text: "Dashboard",
    route: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Calendar",
    route: "/",
    icon: <EventIcon />,
  },
  {
    text: "Resources",
    route: "/resources",
    icon: <ListIcon />,
  },
];

const secondaryListItems = [
  {
    text: "General",
    route: "/settings",
    icon: <SettingsIcon />,
  },
  {
    text: "Custom Fields",
    route: "/custom-fields",
    icon: <ListIcon />,
  },
];

function Menu() {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <Divider />
      <List>
        {mainListItems.map((item, i) => (
          <ListItem
            key={item.route}
            button
            selected={location.pathname === item.route}
            onClick={() => history.push(item.route)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryListItems.map((item) => (
          <ListItem
            key={item.route}
            button
            selected={location.pathname === item.route}
            onClick={() => history.push(item.route)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default Menu;

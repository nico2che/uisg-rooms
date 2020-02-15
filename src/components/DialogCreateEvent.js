import React from "react";
import { Formik, Form, ErrorMessage } from "formik";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import firebase from "../firebase";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  form: {
    margin: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogCreateEvent({ isOpen, onClose, selectedDates }) {
  const classes = useStyles();

  const createEvent = async event => {
    await firebase
      .firestore()
      .collection("events")
      .add(event);
    onClose();
  };

  const { start, end } = selectedDates;

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <Formik
        initialValues={{
          name: "",
          startDate: new Date(start),
          endDate: new Date(end)
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }
          return errors;
        }}
        onSubmit={createEvent}
      >
        {({ values, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
          <>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={onClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Create an event
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSubmit}>
                  Create
                </Button>
              </Toolbar>
            </AppBar>
            <Form className={classes.form}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Event name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    fullWidth
                  />
                  <ErrorMessage name="name" component="div" />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    type="date"
                    id="startDate"
                    name="startDate"
                    label="Start date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.startDate}
                    fullWidth
                  />
                  <ErrorMessage name="startDate" component="div" />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    type="date"
                    id="endDate"
                    name="endDate"
                    label="End date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.endDate}
                    fullWidth
                  />
                  <ErrorMessage name="endDate" component="div" />
                </Grid>
              </Grid>
            </Form>
          </>
        )}
      </Formik>
    </Dialog>
  );
}

export default DialogCreateEvent;

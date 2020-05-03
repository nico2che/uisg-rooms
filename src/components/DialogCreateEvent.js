import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as api from "../api";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form: {
    color: theme.palette.text.secondary,
  },
}));

function DialogCreateEvent({ isOpen, onClose, selectedDates = {} }) {
  const classes = useStyles();

  const createEvent = async (event) => {
    const { name, startDate, endDate } = event;
    const { id } = await api.createEvent({
      name,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
    });
    onClose({
      id,
      title: name,
      start: startDate,
      end: endDate,
    });
  };

  const { start, end } = selectedDates;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth="sm">
      <DialogTitle>Create an event</DialogTitle>
      <Formik
        initialValues={{
          name: "",
          startDate: new Date(start),
          endDate: new Date(end),
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }
          return errors;
        }}
        onSubmit={createEvent}
      >
        {({ values, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
          <Form className={classes.form}>
            <DialogContent>
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
                  <DatePicker
                    autoOk
                    id="startDate"
                    name="startDate"
                    className={classes.arrows}
                    variant="inline"
                    label="Start date"
                    disableToolbar
                    value={values.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  <ErrorMessage name="startDate" component="div" />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    autoOk
                    id="endDate"
                    name="endDate"
                    className={classes.arrows}
                    variant="inline"
                    label="End date"
                    disableToolbar
                    value={values.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  <ErrorMessage name="endDate" component="div" />
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={onClose} color="default">
                  Cancel
                </Button>
                <Button onClick={() => {}} color="default">
                  Save
                </Button>
              </DialogActions>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default DialogCreateEvent;

import React from "react";
import { Formik, Form } from "formik";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { actions } from "../redux";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: "16px !important",
  },
  form: {
    color: theme.palette.text.secondary,
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%",
  },
}));

function DialogEvent({ isOpen, onClose, selectedDates = {} }) {
  const classes = useStyles();
  const resources = useSelector((state) => state.resources);
  const dispatch = useDispatch();

  const createEvent = async (event) => {
    dispatch(
      actions.events.create({
        ...event,
        startDate: event.startDate.getTime(),
        endDate: event.endDate.getTime(),
      })
    );
    onClose();
  };

  const { start, end } = selectedDates;

  const event = {
    name: "",
    startDate: new Date(start),
    endDate: new Date(end),
    resource: "",
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth="sm">
      <DialogTitle className={classes.title}>Create an event</DialogTitle>
      <Formik
        initialValues={event}
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
            <DialogContent className={classes.content}>
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
                    autoComplete="off"
                    autoFocus
                  />
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
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="resource-label">Resource</InputLabel>
                  <Select
                    required
                    id="resource"
                    name="resource"
                    labelId="resource-label"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.resource}
                    fullWidth
                  >
                    {resources.list.map((resource) => (
                      <MenuItem key={resource.id} value={resource.id}>
                        {resource.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <DialogActions>
                <Button onClick={onClose} color="default">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  color="default"
                >
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

export default DialogEvent;

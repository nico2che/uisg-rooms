import React from "react";
import { Formik, Form } from "formik";
import { DatePicker, TimePicker } from "@material-ui/pickers";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { actions } from "../store";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    paddingBottom: 0,
  },
  titleFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    paddingTop: "4px !important",
  },
  form: {
    color: theme.palette.text.secondary,
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%",
  },
  right: {
    float: "right",
  },
}));

function DialogEvent(props) {
  const { onClose, selected } = props;
  const { id, start, end, allDay } = selected || {};
  const classes = useStyles();
  const resources = useSelector((state) => state.resources);
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const deleteEvent = () => {
    dispatch(actions.events.delete(event.id));
    onClose();
  };

  const saveEvent = async (event) => {
    if (event.id) {
      dispatch(actions.events.update(event.id, event));
    } else {
      dispatch(actions.events.create(event));
    }
    onClose();
  };

  let event = id && events.list.find((event) => event.id === id);
  if (!event) {
    event = {
      name: "",
      startDate: start,
      endDate: allDay ? new Date(end - 1) : end,
      allDay,
    };
  }

  return (
    <Dialog open onClose={onClose} fullWidth={true} maxWidth="sm">
      <DialogTitle className={classes.title}>
        <span className={classes.titleFlex}>
          {event.id ? "Edit" : "Create"} an event
          {event.id && (
            <IconButton onClick={deleteEvent}>
              <DeleteIcon />
            </IconButton>
          )}
        </span>
      </DialogTitle>
      <Formik
        initialValues={event}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }
          return errors;
        }}
        onSubmit={saveEvent}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
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
                    value={values.name}
                    fullWidth
                    autoComplete="off"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={values.allDay ? 6 : 3}>
                  <DatePicker
                    autoOk
                    id="startDate"
                    name="startDate"
                    className={classes.arrows}
                    variant="inline"
                    label="Start date"
                    disableToolbar
                    value={values.startDate}
                    onChange={(date) =>
                      setFieldValue("startDate", date.getTime())
                    }
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                {!values.allDay && (
                  <Grid item xs={3}>
                    <TimePicker
                      autoOk
                      id="startTime"
                      name="startTime"
                      label=" "
                      className={classes.arrows}
                      variant="inline"
                      value={values.startDate}
                      onChange={(time) =>
                        setFieldValue("startDate", time.getTime())
                      }
                      onBlur={handleBlur}
                    />
                  </Grid>
                )}
                <Grid item xs={values.allDay ? 6 : 3}>
                  <DatePicker
                    autoOk
                    id="endDate"
                    name="endDate"
                    className={classes.arrows}
                    variant="inline"
                    label="End date"
                    disableToolbar
                    value={values.endDate}
                    onChange={(date) =>
                      setFieldValue("endDate", date.getTime())
                    }
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                {!values.allDay && (
                  <Grid item xs={3}>
                    <TimePicker
                      autoOk
                      id="endTime"
                      name="endTime"
                      label=" "
                      className={classes.arrows}
                      variant="inline"
                      value={values.endDate}
                      onChange={(time) =>
                        setFieldValue("endDate", time.getTime())
                      }
                      onBlur={handleBlur}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormControlLabel
                    label="All day"
                    control={
                      <Checkbox
                        name="allDay"
                        checked={values.allDay}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
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
                    value={values.resource || ""}
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

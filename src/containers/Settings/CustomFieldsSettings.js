import React from "react";
import { Formik, Form, ErrorMessage } from "formik";

import firebase from "../../firebase";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    margin: theme.spacing(3),
    overflow: "auto"
  },
  card: {
    backgroundColor: "white"
  },
  form: {
    color: theme.palette.text.secondary
  },
  saveButton: {
    marginLeft: "auto"
  }
}));

function CustomFieldsSettings() {
  const classes = useStyles();

  console.log(
    firebase
      .firestore()
      .collection("settings")
      .doc("general")
  );

  return (
    <Formik
      initialValues={{
        name: "UISG Rooms"
      }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = "Name is required";
        }
        return errors;
      }}
      onSubmit={() => {}}
    >
      {({ values, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
        <Form className={classes.form}>
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Custom Fields
              </Typography>
              <TextField
                required
                id="name"
                name="name"
                label="Booking System Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                fullWidth
              />
              <ErrorMessage name="name" component="div" />
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                className={classes.saveButton}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default CustomFieldsSettings;

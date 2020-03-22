import React, { useState } from "react";
import { Formik, Form, ErrorMessage, FieldArray } from "formik";

import * as api from "../../api";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Skeleton from "@material-ui/lab/Skeleton";
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
  row: {
    display: "flex",
    alignItems: "center"
  },
  addRow: {
    marginTop: theme.spacing(2)
  },
  deleteRow: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1)
  },
  form: {
    color: theme.palette.text.secondary
  },
  saveButton: {
    marginLeft: "auto"
  }
}));

function SpacesSettings() {
  const classes = useStyles();
  const [spaces, setSpaces] = useState([]);

  if (!spaces.length) {
    api
      .getResources()
      .then(resources => setSpaces(resources))
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        spaces
      }}
      validate={values => ({
        // TODO
      })}
      onSubmit={values => {
        // Delete missing data
        spaces
          .filter(space => !values.spaces.some(s => space.id === s.id))
          .forEach(value => api.deleteResource(value.id));
        // Adding new or update spaces
        values.spaces.forEach((value, index) => {
          if (value.id) {
            api.updateResource(value.id, {
              order: index,
              name: value.name
            });
          } else {
            api.createResource({
              order: index,
              name: value.name
            });
          }
        });
      }}
    >
      {({ values, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
        <Form className={classes.form}>
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Spaces
              </Typography>
              <FieldArray
                name="spaces"
                render={arrayHelpers =>
                  values.spaces && values.spaces.length > 0 ? (
                    <>
                      {values.spaces.map((space, index) => (
                        <div key={index}>
                          <div className={classes.row}>
                            <TextField
                              required
                              id={`spaces.${index}.name`}
                              name={`spaces.${index}.name`}
                              label={"Name"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={space.name}
                              fullWidth
                            />
                            <Button
                              className={classes.deleteRow}
                              size="small"
                              color="secondary"
                              variant="contained"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                          <ErrorMessage
                            name={`spaces.${index}.name`}
                            component="div"
                          />
                        </div>
                      ))}
                      <Button
                        size="small"
                        className={classes.addRow}
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          arrayHelpers.push({
                            name: ""
                          })
                        }
                      >
                        <AddIcon />
                      </Button>
                    </>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => arrayHelpers.push({ name: "" })}
                    >
                      Create first space
                    </Button>
                  )
                }
              />
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

export default SpacesSettings;

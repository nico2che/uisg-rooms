import React, { useEffect } from "react";
import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux";

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

import * as api from "../../api";
import { actions } from "../../redux/";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    margin: theme.spacing(3),
    overflow: "auto",
  },
  card: {
    backgroundColor: "white",
  },
  row: {
    display: "flex",
    alignItems: "center",
  },
  addRow: {
    marginTop: theme.spacing(2),
  },
  deleteRow: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  form: {
    color: theme.palette.text.secondary,
  },
  saveButton: {
    marginLeft: "auto",
  },
}));

function SpacesSettings() {
  const classes = useStyles();
  const resources = useSelector((state) => state.resources);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!resources.list) {
      dispatch(actions.resources.load());
    }
  }, [dispatch, resources.list]);

  if (!resources.list) {
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
        resources: resources.list,
      }}
      validate={(values) => ({
        // TODO: validate data
      })}
      onSubmit={(values) => {
        // Delete missing data
        resources.list
          .filter((space) => !values.resources.some((s) => space.id === s.id))
          .forEach((value) => dispatch(actions.resource.delete(value.id)));

        // Adding new or update resources
        values.resources.forEach((value, index) => {
          if (value.id) {
            api.updateResource(value.id, {
              order: index,
              name: value.name,
            });
          } else {
            api.createResource({
              order: index,
              name: value.name,
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
                name="resources"
                render={(arrayHelpers) =>
                  values.resources && values.resources.length > 0 ? (
                    <>
                      {values.resources.map((resource, index) => (
                        <div key={index}>
                          <div className={classes.row}>
                            <TextField
                              required
                              id={`resources.${index}.name`}
                              name={`resources.${index}.name`}
                              label={"Name"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={resource.name}
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
                            name={`resources.${index}.name`}
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
                            name: "",
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

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "../components/MaterialTable";
import { actions } from "../store";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function CustomFields() {
  const classes = useStyles();
  const customFields = useSelector((state) => state.customFields);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!customFields.list) {
      dispatch(actions.customFields.load());
    }
  }, [dispatch, customFields.list]);

  const onRowAdd = (row) => {
    dispatch(
      actions.customFields.add({ ...row, order: customFields.list.length })
    );
    return Promise.resolve();
  };
  const onRowUpdate = (row, { id }) => {
    dispatch(actions.customFields.update(id, row));
    return Promise.resolve();
  };
  const onRowDelete = (row) => {
    dispatch(actions.customFields.delete(row.id));
    return Promise.resolve();
  };

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <MaterialTable
            title="Custom Fields"
            columns={[{ title: "Name", field: "name" }]}
            isLoading={customFields.loading || !customFields.list}
            data={(customFields.list || []).sort((a, b) => a.order - b.order)}
            editable={{
              onRowAdd,
              onRowUpdate,
              onRowDelete,
            }}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CustomFields;

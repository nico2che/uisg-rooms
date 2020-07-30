import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ColorPicker from "material-ui-color-picker";

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

function Users() {
  const classes = useStyles();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.list) {
      dispatch(actions.users.load());
    }
  }, [dispatch, users.list]);

  const userActions = {
    onRowAdd: (row) => {
      dispatch(actions.users.create(row));
      return Promise.resolve();
    },
    onRowUpdate: (row, { id }) => {
      dispatch(actions.users.update(id, row));
      return Promise.resolve();
    },
    onRowDelete: (row) => {
      dispatch(actions.users.delete(row.id));
      return Promise.resolve();
    },
  };

  const roleActions = {
    onRowAdd: (row) => {
      dispatch(actions.users.createRole(row));
      return Promise.resolve();
    },
    onRowUpdate: (row, { id }) => {
      dispatch(actions.users.updateRole(id, row));
      return Promise.resolve();
    },
    onRowDelete: (row) => {
      dispatch(actions.users.deleteRole(row.id));
      return Promise.resolve();
    },
  };

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <MaterialTable
            title="Users"
            columns={[{ title: "Email", field: "email" }]}
            isLoading={users.loading || !users.list}
            data={(users.list || []).sort((a, b) => a.order - b.order)}
            editable={userActions}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <MaterialTable
            title="Roles"
            columns={[{ title: "Name", field: "name" }]}
            isLoading={users.loading || !users.roles}
            data={users.roles}
            editable={roleActions}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Users;

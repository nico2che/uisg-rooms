import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ColorPicker from "material-ui-color-picker";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "../components/MaterialTable";
import { actions } from "../redux";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function Resources() {
  const classes = useStyles();
  const resources = useSelector((state) => state.resources);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!resources.list) {
      dispatch(actions.resources.load());
    }
  }, [dispatch, resources.list]);

  const onRowAdd = (row) => {
    dispatch(actions.resources.add({ ...row, order: resources.list.length }));
    return Promise.resolve();
  };
  const onRowUpdate = (row, { id }) => {
    dispatch(actions.resources.update(id, row));
    return Promise.resolve();
  };
  const onRowDelete = (row) => {
    dispatch(actions.resources.delete(row.id));
    return Promise.resolve();
  };

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <MaterialTable
            title="Resources"
            columns={[
              { title: "Name", field: "name" },
              {
                title: "Color",
                field: "color",
                editComponent: (props) => (
                  <ColorPicker
                    defaultValue={props.value}
                    onChange={(color) => props.onChange(color)}
                  />
                ),
              },
            ]}
            isLoading={resources.loading || !resources.list}
            data={(resources.list || []).sort((a, b) => a.order - b.order)}
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

export default Resources;

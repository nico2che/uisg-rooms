import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { actions } from "../redux";
import * as api from "../api";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const actionNames = {
  signIn: "Sign In",
  signUp: "Sign Up",
  forgot: "Send a reset link",
};

export default function DialogLogin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState("signIn");
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const leftAction = () => {
    setMode(mode === "signIn" ? "forgot" : "signIn");
  };

  const rightAction = () => {
    setMode(mode === "signIn" ? "signUp" : "signIn");
  };

  const onSubmit = (e) => {
    // TODO: loading
    if (mode === "signIn") {
      api
        .logIn(email, password)
        .then(({ user }) => dispatch(actions.user.logIn(user)))
        .catch((e) => setError(e.message));
    } else {
      api.createUser(email, password).catch((e) => setError(e.message));
    }
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <form className={classes.form} noValidate>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {mode !== "forgot" ? (
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            ) : null}
            {error}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              {actionNames[mode]}
            </Button>
            <Grid container>
              <Grid item xs>
                {mode !== "signUp" ? (
                  <Link onClick={leftAction} href="#" variant="body2">
                    {mode === "forgot" ? "Sign In" : "Forgot password?"}
                  </Link>
                ) : null}
              </Grid>
              <Grid item>
                {mode !== "forgot" ? (
                  <Link onClick={rightAction} href="#" variant="body2">
                    {mode === "signIn"
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </Link>
                ) : null}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

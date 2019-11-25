export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export function getCat() {
  return {
    type: LOGIN
  };
}

export function getCatSuccess({ cats }) {
  return {
    type: LOGIN_SUCCESS,
    cats
  };
}

export function getCatFailure({ error }) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

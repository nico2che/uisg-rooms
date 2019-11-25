import * as userActions from "../actions/user.action";

const initialState = {
  user: {},
  loading: false,
  error: null
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.LOGIN:
      return {
        ...state,
        loading: true
      };
    case userActions.LOGIN_SUCCESS: {
      const { user } = action;
      return {
        ...state,
        loading: false,
        user
      };
    }
    case userActions.LOGIN_FAILURE: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        error
      };
    }
    default:
      return state;
  }
}

export default userReducer;

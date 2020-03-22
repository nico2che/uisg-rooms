import { actionTypes } from "../redux/actions";

const initialState = {
  loading: false,
  error: null
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.event.GET_ALL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.event.GET_ALL_SUCCESS: {
      const { entities } = action;
      return {
        ...state,
        loading: false,
        events: entities
      };
    }
    case actionTypes.event.GET_ALL_FAILURE: {
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

export default eventReducer;

import { actionTypes } from "../redux/actions";

const initialState = {
  loading: false,
  error: null
};

function resourceReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.resource.GET_ALL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.resource.GET_ALL_SUCCESS: {
      const { entities } = action;
      return {
        ...state,
        loading: false,
        resources: entities
      };
    }
    case actionTypes.resource.GET_ALL_FAILURE: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        error
      };
    }
    case actionTypes.resource.DELETE_SUCCESS: {
      const { id } = action;
      return {
        ...state,
        loading: false,
        resources: state.resources.filter(resource => resource.id !== id)
      };
    }
    default:
      return state;
  }
}

export default resourceReducer;

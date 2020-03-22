import { actionTypes } from "../redux/actions";

const initialState = {
  loading: false,
  error: null
};

function settingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setting.GET_ALL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.setting.GET_ALL_SUCCESS: {
      const { entities } = action;
      return {
        ...state,
        loading: false,
        settings: entities
      };
    }
    case actionTypes.setting.GET_ALL_FAILURE: {
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

export default settingReducer;

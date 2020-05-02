import { prepareStore } from "redux-zap";

import * as api from "../api";

const initialState = {
  loading: false,
  error: undefined,
  list: undefined,
};

export default prepareStore(initialState, {
  async *load() {
    yield { loading: true, error: undefined };
    try {
      const list = await api.getSettings();
      yield { loading: false, list };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },
});

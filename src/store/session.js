import { prepareStore } from "redux-zap";

import * as api from "../api";

const initialState = {
  loading: false,
  error: undefined,
  user: undefined,
};

export default prepareStore(initialState, {
  async *getCurrentUser() {
    yield { loading: true, error: undefined };
    try {
      const user = await api.getCurrentSession();
      yield { loading: false, user };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *logIn(email, password) {
    yield { loading: true, error: undefined };
    try {
      const user = await api.logIn(email, password);
      yield { loading: false, user };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *logOut() {
    yield { loading: true, error: undefined };
    try {
      await api.logOut();
      yield { loading: false, user: null };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },
});

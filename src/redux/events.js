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
      const list = await api.getEvents();
      yield { loading: false, list };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *create(event) {
    yield { loading: true, error: undefined };
    try {
      const id = await api.createEvent(event);
      yield { loading: false, list: [...this.list, { ...event, id }] };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *update(id, event) {
    yield { loading: true, error: undefined };
    try {
      await api.updateEvent(id, event);
      yield {
        loading: false,
        list: [...this.list.filter((event) => event.id !== id), event],
      };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },
});

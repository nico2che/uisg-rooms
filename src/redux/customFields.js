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
      const list = await api.getCustomFields();
      yield { loading: false, list };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *add(customField) {
    yield { loading: true, error: undefined };
    try {
      const id = await api.createCustomField(customField);
      yield { loading: false, list: [...this.list, { ...customField, id }] };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *update(id, customField) {
    yield { loading: true, error: undefined };
    try {
      await api.updateCustomField(id, customField);
      yield {
        loading: false,
        list: [
          ...this.list.filter((customField) => customField.id !== id),
          customField,
        ],
      };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *delete(id) {
    yield { loading: true, error: undefined };
    try {
      const list = await api.deleteCustomField(id);
      yield { loading: false, list };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },
});

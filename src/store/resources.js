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
      const list = await api.getResources();
      yield { loading: false, list };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *add(resource) {
    yield { loading: true, error: undefined };
    try {
      const id = await api.createResource(resource);
      yield { loading: false, list: [...this.list, { ...resource, id }] };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *update(id, resource) {
    yield { loading: true, error: undefined };
    try {
      await api.updateResource(id, resource);
      yield {
        loading: false,
        list: [...this.list.filter((resource) => resource.id !== id), resource],
      };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *delete(id) {
    yield { loading: true, error: undefined };
    try {
      const list = await api.deleteResource(id);
      yield { loading: false, list };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },
});

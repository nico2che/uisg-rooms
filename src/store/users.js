import { prepareStore } from "redux-zap";

import * as api from "../api";

const initialState = {
  loading: false,
  error: undefined,
  list: undefined,
  roles: undefined,
};

export default prepareStore(initialState, {
  async *load() {
    yield { loading: true, error: undefined };
    try {
      const [list, roles] = await Promise.all([api.getUsers(), api.getRoles()]);
      yield { loading: false, list, roles };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *create(user) {
    yield { loading: true, error: undefined };
    try {
      const id = await api.createUser(user);
      yield { loading: false, list: [...this.list, { ...user, id }] };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *update(id, user) {
    yield { loading: true, error: undefined };
    try {
      await api.updateUser(id, user);
      yield {
        loading: false,
        list: [...this.list.filter((user) => user.id !== id), user],
      };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *delete(id) {
    yield { loading: true, error: undefined };
    try {
      await api.deleteUser(id);
      yield {
        loading: false,
        list: [...this.list.filter((user) => user.id !== id)],
      };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *createRole(role) {
    yield { loading: true, error: undefined };
    try {
      const id = await api.createRole(role);
      yield { loading: false, roles: [...this.roles, { ...role, id }] };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *updateRole(id, role) {
    yield { loading: true, error: undefined };
    try {
      await api.updateRole(id, role);
      yield {
        loading: false,
        roles: [...this.roles.filter((role) => role.id !== id), role],
      };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },

  async *deleteRole(id) {
    yield { loading: true, error: undefined };
    try {
      await api.deleteRole(id);
      yield {
        loading: false,
        roles: [...this.roles.filter((role) => role.id !== id)],
      };
    } catch (error) {
      yield { loading: false, error: error.message };
    }
  },
});

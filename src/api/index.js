import * as firebase from "./firebase";

const currentDrive = "firebase";

const drivers = {
  firebase,
};

export const {
  logIn,
  logOut,
  getCurrentSession,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getCustomFields,
  createCustomField,
  updateCustomField,
  deleteCustomField,
  getSettings,
  setSettings,
} = drivers[currentDrive];

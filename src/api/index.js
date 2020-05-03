import * as firebase from "./firebase";

const currentDrive = "firebase";

const drivers = {
  firebase,
};

export const {
  logIn,
  logOut,
  getCurrentUser,
  createUser,
  getEvents,
  createEvent,
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

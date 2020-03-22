import * as firebase from "./firebase";

const currentDrive = "firebase";

const drivers = {
  firebase
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
  getSettings,
  setSettings
} = drivers[currentDrive];

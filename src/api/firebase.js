import firebase from "../firebase";

const auth = firebase.auth();
const dbResources = firebase.firestore().collection("spaces");
const dbEvents = firebase.firestore().collection("events");
const dbSettings = firebase.firestore().collection("settings");
const dbFields = firebase.firestore().collection("customFields");
const dbRoles = firebase.firestore().collection("roles");
const dbUsers = firebase.firestore().collection("users");

const db = {
  resources: dbResources,
  events: dbEvents,
  settings: dbSettings,
  customFields: dbFields,
  roles: dbRoles,
  users: dbUsers,
};

// Creators
function getAll(type) {
  if (!db[type]) {
    throw new Error(`db ${type} doesn't exist`);
  }
  return function () {
    return db[type].get().then((collection) => {
      const docs = [];
      collection.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
      return docs;
    });
  };
}

// function get(type) {
//   if (!db[type]) {
//     throw new Error(`db ${type} doesn't exist`);
//   }
//   return function (id) {
//     return db[type].doc(id).get();
//   };
// }

function create(type) {
  if (!db[type]) {
    throw new Error(`db ${type} doesn't exist`);
  }
  return function (entity) {
    return db[type].add(entity).then((docRef) => docRef.id);
  };
}

function update(type) {
  if (!db[type]) {
    throw new Error(`db ${type} doesn't exist`);
  }
  return function (id, entity) {
    return db[type].doc(id).set(entity);
  };
}

function remove(type) {
  if (!db[type]) {
    throw new Error(`db ${type} doesn't exist`);
  }
  return function (id) {
    return db[type].doc(id).delete();
  };
}

// Session
export function logIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logOut() {
  return auth.signOut();
}

export function getCurrentSession() {
  return new Promise((res) => auth.onAuthStateChanged(res));
}

// User
export function createUser(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function getUsers() {
  return [];
}

export function updateUser() {
  // return auth.app.
}

export function deleteUser() {
  // return auth.app.
}

// Event
export const getEvents = getAll("events");
export const createEvent = create("events");
export const updateEvent = update("events");
export const deleteEvent = remove("events");

// Resource
export function getResources() {
  return dbResources
    .orderBy("order")
    .get()
    .then((collection) => {
      const docs = [];
      collection.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
      return docs;
    });
}

export const createResource = create("resources");
export const updateResource = update("resources");
export const deleteResource = remove("resources");

// Custom fields
export const getCustomFields = getAll("customFields");
export const createCustomFields = create("customFields");
export const updateCustomFields = update("customFields");
export const deleteCustomFields = remove("customFields");

// Roles
export const getRoles = getAll("roles");
export const createRole = create("roles");
export const updateRole = update("roles");
export const deleteRole = remove("roles");

// Setting
export function getSettings() {
  return dbSettings
    .doc("general")
    .get()
    .then((doc) => doc.data());
}

export function setSettings(values) {
  return dbSettings.doc("general").set(values);
}

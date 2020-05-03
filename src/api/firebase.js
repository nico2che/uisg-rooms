import firebase from "../firebase";

const auth = firebase.auth();
const dbSpace = firebase.firestore().collection("spaces");
const dbEvent = firebase.firestore().collection("events");
const dbSettings = firebase.firestore().collection("settings");
const dbFields = firebase.firestore().collection("customFields");

// User
export function logIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logOut() {
  return auth.signOut();
}

export function getCurrentUser() {
  return new Promise((res) => auth.onAuthStateChanged(res));
}

export function createUser(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// Event
export function getEvents() {
  return dbEvent.get().then((collection) => {
    const docs = [];
    collection.forEach((doc) => {
      const { name, startDate, endDate } = doc.data();
      docs.push({
        id: doc.id,
        title: name,
        start: new Date(startDate),
        end: new Date(endDate),
      });
    });
    return docs;
  });
}

export function createEvent(event) {
  return dbEvent.add(event).then((docRef) => docRef.id);
}

// Resource
export function getResources() {
  return dbSpace
    .orderBy("order")
    .get()
    .then((collection) => {
      const docs = [];
      collection.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
      return docs;
    });
}

export function createResource(event) {
  return dbSpace.add(event).then((docRef) => docRef.id);
}

export function updateResource(id, event) {
  return dbSpace.doc(id).set(event);
}

export function deleteResource(id) {
  return dbSpace.doc(id).delete();
}

// Custom fields
export function getCustomFields() {
  return dbFields.get().then((collection) => {
    const docs = [];
    collection.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
    return docs;
  });
}

export function createCustomField(event) {
  return dbFields.add(event).then((docRef) => docRef.id);
}

export function updateCustomField(id, event) {
  return dbFields.doc(id).set(event);
}

export function deleteCustomField(id) {
  return dbFields.doc(id).delete();
}

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

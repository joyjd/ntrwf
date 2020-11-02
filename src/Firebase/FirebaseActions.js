import firebase from "firebase";

const getOnceSnapshot = (ref) => {
  return firebase.database().ref(ref).once("value");
};
const getLatestElement = (ref) => {
  return firebase.database().ref(ref).limitToLast(1).once("value");
};
const getLatestElementLive = (ref) => {
  return firebase.database().ref(ref).limitToLast(1);
};
const getOnceSnapshotOrderBy = (ref, orderByChild) => {
  return firebase.database().ref(ref).orderByChild(orderByChild).once("value");
};
const getOnceSnapshotOrderByStartAt = (ref, orderByChild,startAt) => {
  return firebase.database().ref(ref).orderByChild(orderByChild).startAt(startAt);
};

const signInWithEmailAndPassword = (id, password) => {
  return firebase.auth().signInWithEmailAndPassword(id, password);
};

const getAuthorisedUser = () => {
  return firebase.auth().currentUser.uid;
};

const userLogOut = () => {
  firebase.auth().signOut();
};

const getImageRef = (ref) => {
  return firebase.storage().ref(ref);
};

const updateKey = (data, ref) => {
  return firebase
    .database()
    .ref(ref)
    .update({ ...data });
};

const updateindividualKey = (ref, updates) => {
  return firebase.database().ref(ref).set(updates);
};

const getDataByIndex = (ref, orderByChild, equalTo) => {
  return firebase.database().ref(ref).orderByChild(orderByChild).equalTo(equalTo).once("value");
};

const getDataByIndexLive = (ref, orderByChild, equalTo) => {
  return firebase.database().ref(ref).orderByChild(orderByChild).equalTo(equalTo);
};

const getDataLive = (ref) => {
  return firebase.database().ref(ref);
};

const deleteData = (ref) => {
  return firebase.database().ref(ref).remove();
};

const setData = (ref, data) => {
  return firebase
    .database()
    .ref(ref)
    .set({ ...data });
};

const setUserPassword = (newPwd) => {
  let user = firebase.auth().currentUser;
  return user.updatePassword(newPwd);
};

const setUserEmail = (newEmail) => {
  let user = firebase.auth().currentUser;
  return user.updateEmail(newEmail);
};

const reAuthenticateUser = (pwd) => {
  let user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(user.email, pwd);
  return user.reauthenticateWithCredential(credential);
};

const uploadImage = async (uri, imageName) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = firebase
    .storage()
    .ref()
    .child("images/" + imageName);
  return ref.put(blob);
};

export { getOnceSnapshotOrderByStartAt,getLatestElementLive,getDataLive, uploadImage, getLatestElement, getOnceSnapshotOrderBy, reAuthenticateUser, setUserPassword, setUserEmail, updateindividualKey, getDataByIndexLive, getOnceSnapshot, signInWithEmailAndPassword, getAuthorisedUser, userLogOut, getImageRef, updateKey, getDataByIndex, setData, deleteData };

//Ici on trouve toutes les fonctions qui sont en relation avec la Database de Firebase,

import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
const firebaseDbURL = "https://yuzu-5720e-default-rtdb.firebaseio.com";
const firebaseConfig = {
  apiKey: "AIzaSyDp2NnsdP0i01XwJMmSynmmSrC_R23MUiQ",
  authDomain: "yuzu-5720e.firebaseapp.com",
  databaseURL: "https://yuzu-5720e-default-rtdb.firebaseio.com",
  projectId: "yuzu-5720e",
  storageBucket: "yuzu-5720e.appspot.com",
  messagingSenderId: "246034960415",
  appId: "1:246034960415:web:c4aa304ce2a2bc379bc52a",
  measurementId: "G-N0G4M012VE",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const setAdditionalInfo = async (info) => {
  try {
    firebase
      .app()
      .database(firebaseDbURL)
      .ref(`/users/${auth().currentUser?.uid}`)
      .update(info)
      .then((i) => console.log("Additional info added", i));
  } catch (e) {
    console.log("Additional informations not added !");
  }
};

//get Additional infos  from realtime DB
const getAdditionalInfo = async () => {
  const snapshot = await firebase
    .app()
    .database(firebaseDbURL)
    .ref(`/users/${auth().currentUser?.uid}`)
    .once("value");
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return false;
};

//add to favorites
const addToFav = async (id, imgURL, name) => {
  try {
    firebase
      .app()
      .database(firebaseDbURL)
      .ref(`/users/${auth().currentUser?.uid}/favoris/${id}`)
      .set({
        imgURL,
        name,
        _id: id,
        dateTime: firebase.database.ServerValue.TIMESTAMP,
      });
  } catch (e) {
    console.log("Erreur,recette non ajoutée aux favoris !");
  }
};

const deleteFav = async (id) => {
  try {
    firebase
      .app()
      .database(firebaseDbURL)
      .ref(`/users/${auth().currentUser?.uid}/favoris/${id}`)
      .remove();
  } catch (e) {
    console.log("Recette ajoutées aux favoris .");
  }
};

const getFavoris = async (tmp) => {
  let favoritesArray = [];
  firebase
    .app()
    .database(firebaseDbURL)
    .ref(`/users/${auth().currentUser?.uid}/favoris`)
    .once("value", (snapshot) => {
      console.log("User data: ", snapshot.val());
      if (snapshot.exists()) {
        snapshot.forEach((item) => favoritesArray.push(item.key));
        tmp(favoritesArray);
      }
    });
};

const getAllFavoris = async (setCommandes) => {
  let arr = [];
  firebase
    .app()
    .database(firebaseDbURL)
    .ref(`/users/${auth().currentUser?.uid}/favoris`)
    .orderByChild("dateTime")
    .on("value", (snapshot) => {
      if (snapshot.exists()) {
        console.log("it exists SNAPSHOT", snapshot);
        arr = Object?.values(snapshot.val());
        console.log("WBOOOOOOOOOOOO", arr);
        setCommandes(arr);
      }
    });
};
const setCommandes = (cart) => {
  let obj = [];

  cart.forEach((item) => {
    obj.push({
      _id: item._id,
      name: item.name,
      imgURL: item.imgURL,
      ingredients: item.ingredients,
      nbrPersonne: item.nbrPersonne,
    });
  });
  try {
    firebase
      .app()
      .database(firebaseDbURL)
      .ref(`/users/${auth().currentUser?.uid}/commandes`)
      .push({
        recipes: { ...obj },
        dateTime: firebase.database.ServerValue.TIMESTAMP,
      })
      .then((i) => console.log("cartadded", i));
  } catch (e) {
    console.log("Additional informations not added !");
  }
};

const getCommandes = async (setCommandes) => {
  let arr = [];
  firebase
    .app()
    .database(firebaseDbURL)
    .ref(`/users/${auth().currentUser?.uid}/commandes`)
    .orderByChild("dateTime")
    .on("value", (snapshot) => {
      if (snapshot.exists()) {
        console.log("it exists COOOMMA", snapshot);
        arr = Object?.values(snapshot.val());
        console.log("WBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", arr);
      }
      setCommandes(arr);
    });
};

export {
  setAdditionalInfo,
  getAdditionalInfo,
  setCommandes,
  getCommandes,
  auth,
  addToFav,
  deleteFav,
  getFavoris,
  getAllFavoris,
};

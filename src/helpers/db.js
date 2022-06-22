import { Alert } from "react-native";

import database from "@react-native-firebase/database";

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

//get num from realtime DB
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
      if (snapshot.exists()) {
        snapshot.forEach((item) => favoritesArray.push(item.key));
        tmp(favoritesArray);
      }
    }).catch(console.error);
};

const getAllFavoris = async (setCommandes) => {
  firebase
    .app()
    .database(firebaseDbURL)
    .ref(`/users/${auth().currentUser?.uid}/favoris`)
    .orderByChild("dateTime")
    .on("value", (snapshot) => {
      if (snapshot.exists()) {
        setCommandes(Object?.values(snapshot.val()));
      }
    });
};
const setCommandes = (cart) => {
  const obj = [];

  cart.forEach((item) => {
    obj.push({
      _id: item._id,
      name: item.name,
      imgURL: item.imgURL,
      ingredients: item.ingredients.map(i => ({ ...i, newQuantity: i.newQuantity || 0 })),
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
    console.error(e);
  }
};

const getCommandes = async (setCommandes) => {
  firebase
    .app()
    .database(firebaseDbURL)
    .ref(`/users/${auth().currentUser?.uid}/commandes`)
    .orderByChild("dateTime")
    .on("value", (snapshot) => {
      setCommandes(snapshot.exists() ? Object?.values(snapshot.val()) : []);
    });
};

const setRating = async (rate, recipeId) => {
  try {
    await firebase
      .app()
      .database(firebaseDbURL)
      .ref(`/rate/${recipeId}/${auth().currentUser?.uid}`)
      .set({ rate, createdAt: firebase.database.ServerValue.TIMESTAMP })
    return true;
  } catch (e) {
    console.error(e);
  }
}

const logInWithFb = async () => {
  try {
    await Facebook.initializeAsync({
      appId: "593620908653647",
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
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
  setRating,
};

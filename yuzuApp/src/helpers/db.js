import { Alert } from "react-native";

import database from "@react-native-firebase/database";
// import auth from "@react-native-firebase/auth";
// import { LoginManager, AccessToken } from "react-native-fbsdk-next";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

const firebaseConfig = {
  apiKey: "AIzaSyC_Khzc-fgbnfetYLwwdkSiNYPuRVjbdN8",
  authDomain: "yuzu-a0d71.firebaseapp.com",
  projectId: "yuzu-a0d71",
  storageBucket: "yuzu-a0d71.appspot.com",
  messagingSenderId: "768418404122",
  appId: "1:768418404122:web:07f4cd1177316436107ea3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const LoginWithGoogle = async () => {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

const LoginWithFb = async () => {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);
  if (result.isCancelled) {
    throw "User cancelled the login process";
  }
  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw "Something went wrong obtaining access token";
  }
  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken
  );
  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
};

const signUp = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log("User Created !");
  } catch (e) {
    alert(e);
  }
};

const signIn = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log("signed");
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const signOut = async () => {
  try {
    if (auth().currentUser.providerData[0].providerId === "google.com")
      await GoogleSignin.revokeAccess();
    await auth().signOut();
    console.log("signed out");
  } catch (e) {
    alert(e);
  }
};
const signInWithPhoneNumber = async (phoneNumber, setConfirm) => {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber, true);
  setConfirm(confirmation);
};

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
// const getData = async (loadMood) => {
//   await db
//     .ref(`users/`)
//     .on("value", (snapshot) => {
//       const data = snapshot.val();
//       loadMood(data);
//     });
// };

export { auth, LoginWithFb };

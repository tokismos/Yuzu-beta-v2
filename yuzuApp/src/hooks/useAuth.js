import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import { setUser } from "../redux/slicer/userSlicer";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  Profile,
} from "react-native-fbsdk-next";
import AsyncStorage from "@react-native-community/async-storage";

import { api } from "../axios";

const signIn = async (email, password) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    console.log("signed with email", res);
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const signInWithGoogle = async () => {
  // Get the users ID token
  const userInfo = await GoogleSignin.signIn();
  const { idToken, accessToken } = await GoogleSignin.getTokens();

  console.log("info", userInfo);
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    idToken,
    accessToken
  );
  await auth().signInWithCredential(googleCredential);

  auth()
    .currentUser.updateEmail(userInfo.user.email)
    .then(async () => {
      console.log("email updated");
    });
  auth().currentUser.reload();
  console.log("proo", auth().currentUser.providerData);
};

// Sign In with Facebook

const signOut = async () => {
  if (auth().currentUser.providerData[0].providerId == "google.com") {
    console.log("deonected google");
    await GoogleSignin.signOut();
  }
  if (auth().currentUser.providerData[0].providerId == "facebook.com") {
    console.log("deonected facebook");
    try {
      await AsyncStorage.removeItem("accessTokenFb");
    } catch (exception) {
      console.log("Error async storage");
    }
  }
  console.log("heu");
  auth().signOut();
};
//Sign In with Facebook
const signInWithFb = async () => {
  //Get info of the fb profile from the token
  //   const getInfoFromToken = (token) => {
  //     const PROFILE_REQUEST_PARAMS = {
  //       fields: {
  //         string: "id, name,  first_name, last_name,email,picture",
  //       },
  //     };
  //     const profileRequest = new GraphRequest(
  //       "/me",
  //       { token, parameters: PROFILE_REQUEST_PARAMS },
  //       (error, result) => {
  //         if (error) {
  //           console.log("login info has error: " + error);
  //         } else {
  //           //   this.setState({userInfo: result});
  //           console.log("result:", result);
  //         }
  //       }
  //     );
  //     new GraphRequestManager().addRequest(profileRequest).start();
  //   };
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

  try {
    await AsyncStorage.setItem("accessTokenFb", data.accessToken);
    console.log("acces token seeeted", data);
  } catch (e) {
    // saving error
  }
  if (!data) {
    throw "Something went wrong obtaining access token";
  }
  //Get the info

  // Create a Firebase credential with the AccessToken
  const facebookCredential = await auth.FacebookAuthProvider.credential(
    data.accessToken
  );
  // Sign-in the user with the credential
  await auth().signInWithCredential(facebookCredential);
  return data.accessToken;
};
//SEnd the verification code to the phone number
const sendPhoneVerification = async (phoneNumber) => {
  try {
    const res = await api.get(`/phoneNumber/send`, { params: { phoneNumber } });
    console.log("SMS SENT", res);
    return res?.status;
  } catch (e) {
    Alert.alert("SMS NOT SENT");
  }
};
//Verify the code
const verifyCode = async (phoneNumber, verificationCode) => {
  try {
    const res = await api.get(`/phoneNumber/verify`, {
      params: { phoneNumber, verificationCode },
    });
    console.log("code done", res);
    return res?.status;
  } catch (e) {
    if (e.response.status == 429) {
      return Alert.alert(`429,Max attempts reached,please try later !`);
    }
    console.log("SMS NOT SENTg ", e.response);
    Alert.alert(`${e.response.status}, ${e.response.data.error}`);
  }
};

export default useAuth = () => {
  return {
    signIn,
    signOut,
    signInWithGoogle,
    signInWithFb,
    sendPhoneVerification,
    verifyCode,
  };
};

const styles = StyleSheet.create({});

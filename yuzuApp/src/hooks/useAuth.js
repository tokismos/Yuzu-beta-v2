// C'est ici qu'on gere toutes les fonctions pour appeler notre API et pour les differentes connections
// avec Firebase

import { Alert, StyleSheet } from "react-native";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-community/async-storage";

import { appleAuth } from "@invertase/react-native-apple-authentication";
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

const signInWithGoogle = async (navigation) => {
  // Get the users ID token
  const userInfo = await GoogleSignin.signIn();
  const { idToken, accessToken } = await GoogleSignin.getTokens();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    idToken,
    accessToken
  );
  // reference.set(info).then((i) => console.log("Additional info added", i));
  await auth().signInWithCredential(googleCredential);

  //if its the first time email in google is null this is why we update it
  if (!auth().currentUser.email) {
    auth()
      .currentUser.updateEmail(userInfo.user.email)
      .then(async () => {
        console.log("update", auth().currentUser);
      });
  }

  // ACHEEEEEEEEEEEECKER CAAAAAAA IMPOOORTAAAAAAAAAAAAAANT !!!!!!!!!!!
};

const onAppleButtonPress = async () => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error("Apple Sign-In failed - no identify token returned");
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce
  );

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
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
// const signInWithFb = async () => {
//   //Get info of the fb profile from the token
//   //   const getInfoFromToken = (token) => {
//   //     const PROFILE_REQUEST_PARAMS = {
//   //       fields: {
//   //         string: "id, name,  first_name, last_name,email,picture",
//   //       },
//   //     };
//   //     const profileRequest = new GraphRequest(
//   //       "/me",
//   //       { token, parameters: PROFILE_REQUEST_PARAMS },
//   //       (error, result) => {
//   //         if (error) {
//   //           console.log("login info has error: " + error);
//   //         } else {
//   //           //   this.setState({userInfo: result});
//   //           console.log("result:", result);
//   //         }
//   //       }
//   //     );
//   //     new GraphRequestManager().addRequest(profileRequest).start();
//   //   };
//   // Attempt login with permissions
//   const result = await LoginManager.logInWithPermissions([
//     "public_profile",
//     "email",
//   ]);
//   if (result.isCancelled) {
//     throw "User cancelled the login process";
//   }

//   // Once signed in, get the users AccesToken
//   const data = await AccessToken.getCurrentAccessToken();

//   try {
//     await AsyncStorage.setItem("accessTokenFb", data.accessToken);
//     console.log("acces token seeeted", data);
//   } catch (e) {
//     // saving error
//   }
//   if (!data) {
//     throw "Something went wrong obtaining access token";
//   }
//   //Get the info

//   // Create a Firebase credential with the AccessToken
//   const facebookCredential = await auth.FacebookAuthProvider.credential(
//     data.accessToken
//   );
//   // Sign-in the user with the credential
//   await auth().signInWithCredential(facebookCredential);
//   return data.accessToken;
// };
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
    Alert.alert(`${e.response.status}, ${e.response.data.error}`);
  }
};
const signUp = async (email, password) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password);
    console.log("User Created !", res);
    return res;
  } catch (e) {
    console.log("user NOT created");
  }
};

const resetPassword = async (email, setMsg, setIsLoading) => {
  try {
    await auth().sendPasswordResetEmail(email);
    setMsg("Un lien de reinitialisation a été envoyé à votre adresse email.");
  } catch (e) {
    console.log(e.code);
    if (e.code === "auth/user-not-found") {
      setMsg(
        "Il semblerait que cette adresse e-mail n’a jamais été enregistrée !"
      );
    }
    if (e.code === "auth/too-many-requests") {
      setMsg(
        "Vous avez envoyé plusieurs demandes. Veuillez réessayer plus tard!"
      );
    }
  } finally {
    setIsLoading(false);
  }
};

export default useAuth = () => {
  return {
    signIn,
    signOut,
    signInWithGoogle,
    sendPhoneVerification,
    verifyCode,
    signUp,
    onAppleButtonPress,
    resetPassword,
  };
};

const styles = StyleSheet.create({});

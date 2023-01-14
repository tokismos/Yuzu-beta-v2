// C'est ici qu'on gere toutes les fonctions pour appeler notre API et pour les differentes connections
// avec Firebase

import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { api } from '../axios';
import { deleteUserData } from '../helpers/db';



const signIn = async (email, password, reauthMode) => {
  try {
    if(!reauthMode) await auth().signInWithEmailAndPassword(email, password);
    else auth().currentUser.reauthenticateWithCredential(email, password)
  } catch (e) {
    console.error(e);
    alert(e);
  }
};

const signInWithGoogle = async (reauthMode) => {
  // Get the users ID token
  const userInfo = await GoogleSignin.signIn();
  const { idToken, accessToken } = await GoogleSignin.getTokens();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
  // reference.set(info).then((i) => console.log("Additional info added", i));
  try {
    if(!reauthMode) await auth().signInWithCredential(googleCredential);
    else auth().currentUser.reauthenticateWithCredential(googleCredential)
    if (!auth().currentUser.email) {
      auth().currentUser.updateEmail(userInfo.user.email);
    }
    return {}
  } catch (e) {
    console.error(e);
    return { error: e }
  }


};

const signInWithApple = async (reauthMode) => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

  try {
    if(!reauthMode) await auth().signInWithCredential(appleCredential)
    else auth().currentUser.reauthenticateWithCredential(appleCredential)
    return {}
  } catch (e) {
    console.error(e);
    return { error: e }
  }


}

const signOut = async () => {
  if (auth().currentUser.providerData[0].providerId == 'google.com') {
    await GoogleSignin.signOut();
  }
  if (auth().currentUser.providerData[0].providerId == 'facebook.com') {
    try {
      await AsyncStorage.removeItem('accessTokenFb');
    } catch (exception) {
      console.error(exception);
    }
  }
  auth().signOut();
};

//Send the verification code to the phone number
const sendPhoneVerification = async (phoneNumber) => {
  try {
    const res = await api.get(`/phoneNumber/send`, { params: { phoneNumber } });
    return res?.status;
  } catch (e) {
    Alert.alert('SMS NOT SENT');
  }
};
//Verify the code
const verifyCode = async (phoneNumber, verificationCode) => {
  try {
    const res = await api.get(`/phoneNumber/verify`, {
      params: { phoneNumber, verificationCode },
    });
    console.log('code done', res);
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
    return res;
  } catch (e) {
    console.log('user NOT created');
  }
};

const resetPassword = async (email, setMsg, setIsLoading, t) => {
  try {
    await auth().sendPasswordResetEmail(email);
    setMsg(t('useAuth_linkSent'));
  } catch (e) {
    console.log(e.code);
    if (e.code === 'auth/user-not-found') {
      setMsg(t('useAuth_alreadyInUse'));
    }
    if (e.code === 'auth/too-many-requests') {
      setMsg(t('useAuth_tooMany'));
    }
  } finally {
    setIsLoading(false);
  }
};

const validateEmail = (email) => {
  const expression =
    // eslint-disable-next-line no-control-regex
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(String(email).toLowerCase());
};

const deleteAccount = async () => {
  await deleteUserData()
  try {
    await auth().currentUser.delete()
    return {}
  } 
  catch (error){  
      return {error : error.code}
  }
  
};



export default () => {
  return {
    signIn,
    signOut,
    validateEmail,
    signInWithGoogle,
    sendPhoneVerification,
    verifyCode,
    signUp,
    resetPassword,
    signInWithApple,
    deleteAccount
  };
};

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Navigator, {
  SignNavigator,
  TabScreen,
} from "./src/navigation/Navigator";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { COLORS } from "./src/consts/colors";
import { store } from "./src/redux/store";
import { Provider, useDispatch } from "react-redux";
import RootNavigation, {
  LoggedStackScreen,
  LoginStackScreen,
} from "./src/navigation/Navigator";
require("./src/helpers/db");
import TinderScreen from "./src/screens/TinderScreen";
import LoginScreen from "./src/screens/LoginScreen";
import IntroScreen from "./src/screens/IntroScreen";
const config = {
  webClientId:
    "768418404122-out2q1cfkp99u5bs6sb5gsnhs9tl98sl.apps.googleusercontent.com",

  scopes: ["profile", "email"],
  permissions: ["public_profile", "location", "email"],
  offlineAccess: true,
};
export default function App() {
  const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState(null);
  const [splash, setSplash] = useState(true);

  // useEffect(() => {
  //   GoogleSignin.configure(config);

  //   const sub = auth().onAuthStateChanged((userInfo) => {
  //     if (userInfo) {
  //       dispatch(setUser)(userInfo);
  //       console.log("Connecte2de", userInfo);
  //     } else {
  //       console.log("no usser");
  //       dispatch(setUser)(null);

  //       console.log("Disconnected", userInfo);
  //     }
  //   });
  //   return sub;
  // }, []);

  const SplashScreen = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <Provider store={store}>
      <RootNavigation />
      {/* <NavigationContainer>
        <StatusBar translucent />
        {user ? <LoggedStackScreen /> : <LoginStackScreen />}
      </NavigationContainer> */}
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

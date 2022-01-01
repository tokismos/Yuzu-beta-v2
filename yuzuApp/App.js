import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./src/navigation/Navigator";
require("./src/helpers/db");

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

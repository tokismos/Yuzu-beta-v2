import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./src/navigation/Navigator";
import SplashScreen from "react-native-splash-screen";

require("./src/helpers/db");


export default function App() {
   useEffect(() => {
    SplashScreen.hide();
  });
  
  return (
  
      <Provider store={store}>
        <StatusBar translucent />
        <RootNavigation />
     
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

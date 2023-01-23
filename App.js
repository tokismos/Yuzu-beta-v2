import React, { useEffect } from "react";
import { StatusBar } from "react-native";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./src/navigation/Navigator";
import SplashScreen from "react-native-splash-screen";

import "./services/i18n";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor="transparent" />
      <RootNavigation />
    </Provider>
  );
}

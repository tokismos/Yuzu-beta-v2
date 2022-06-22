import React, { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./src/navigation/Navigator";
import SplashScreen from "react-native-splash-screen";
import { StripeProvider } from "@stripe/stripe-react-native";

import { useTranslation } from "react-i18next";
import './services/i18n';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <StripeProvider
      publishableKey="pk_test_51KfDxdLPkFeT5Lr1S3sUQRJuwjTIP8auNmjjHWbzDOidqq7bqiIDYek6Gv2lhd0R7e7ZU5tyKAfU52cgwHVX3cK300zN5DzXhx"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="com.yuzu.itten" // required for Apple Pay
    >
      <Provider store={store}>
        <StatusBar translucent backgroundColor="transparent" />
        <RootNavigation />
      </Provider>
    </StripeProvider>
  );
}


import React, { useEffect } from "react";
import { StatusBar } from "react-native";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./src/navigation/Navigator";
import SplashScreen from "react-native-splash-screen";
// import { StripeProvider } from "@stripe/stripe-react-native";
// import { STRIPE_API_KEY, URL_SCHEME, APPLE_MERCHANT_ID } from "./src/consts/env";

import "./services/i18n";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    // <StripeProvider
    //   publishableKey={STRIPE_API_KEY}
    //   urlScheme={URL_SCHEME} // required for 3D Secure and bank redirects
    //   merchantIdentifier={APPLE_MERCHANT_ID}// required for Apple Pay
    // >
      <Provider store={store}>
        <StatusBar translucent backgroundColor="transparent" />
        <RootNavigation />
      </Provider>
    // </StripeProvider>
  );
}

import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./src/navigation/Navigator";
import SplashScreen from "react-native-splash-screen";
import { StripeProvider } from "@stripe/stripe-react-native";
import PaymentScreen from "./src/screens/PaymentScreen";
import OnBoardingScreen from "./src/screens/OnBoardingScreen";
import MaintenanceScreen from "./src/screens/MaintenanceScreen";
import AbonnementScreen from "./src/screens/AbonnementScreen";
import Onboarding from "react-native-onboarding-swiper";
import AbonnementSecondScreen from "./src/screens/AbonnementSecondScreen";

require("./src/helpers/db");

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
      {/* <AbonnementSecondScreen /> */}

      <Provider store={store}>
        <StatusBar translucent backgroundColor="transparent" />
        <RootNavigation />
      </Provider>
    </StripeProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

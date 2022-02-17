import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../consts/colors";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import FbIcon from "../assets/fbIcon.svg";
import GoogleIcon from "../assets/GoogleIcon.svg";

import useAuth from "../hooks/useAuth";
import CustomButton from "../components/CustomButton";

const IntroScreen = ({ navigation }) => {
  const { signIn, signInWithGoogle, signInWithFb } = useAuth();

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Image
        source={require("../assets/intro.jpg")}
        style={{ height: "100%", width: "100%", resizeMode: "cover" }}
      />
      <View style={styles.middleTopScreen}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logoContainer}
        />
        <Text style={styles.descriptionText}>Bien manger, simplement .</Text>
      </View>
      <View style={styles.middleBottomScreen}>
        <View style={styles.bottomContainer}>
          {/* Sign Up  */}

          <CustomButton
            onPress={() => {
              navigation.navigate("SignInScreen");
            }}
            title="Se connecter"
            style={{ ...styles.button, width: "80%" }}
            textStyle={{ fontSize: 20 }}
          />
          <CustomButton
            colorRipple={{ color: "#d3d3d3" }}
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
            title=" Je suis nouveau"
            style={{
              ...styles.button,
              width: "80%",
              backgroundColor: "white",
            }}
            textStyle={{ ...styles.text, color: COLORS.primary }}
          />

          {/* Sign In from Google */}
          {/* <TouchableOpacity
            activeOpacity={0.95}
            style={{ ...styles.button, backgroundColor: "white" }}
            onPress={async () => {
              await signInWithGoogle();
            }}
          >
            <View style={styles.buttonContainer}>
              <GoogleIcon width={40} height={40} style={{}} />

              <View style={{ width: "85%" }}>
                <Text style={{ ...styles.socialText, color: "#757575" }}>
                  Se connecter avec Google
                </Text>
              </View>
            </View>
          </TouchableOpacity> */}
          {/* Sign In from Facebook */}
          {/* <TouchableOpacity
            activeOpacity={0.95}
            style={{ ...styles.button, backgroundColor: "#4267B2" }}
            onPress={async () => {
              await signInWithFb();
            }}
          >
            <View style={styles.buttonContainer}>
              <FbIcon width={40} height={40} fill={"white"} style={{}} />

              <View style={{ width: "85%" }}>
                <Text style={{ ...styles.socialText, color: "white" }}>
                  Se connecter avec Facebook
                </Text>
              </View>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate("TinderScreen")}>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "10%",
              }}
            >
              M'inscrire plus tard !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 60,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  middleTopScreen: {
    height: "50%",
    position: "absolute",
    top: 0,
    width: "100%",
    justifyContent: "center",
  },
  logoContainer: {
    height: "30%",
    width: "60%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  descriptionText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  middleBottomScreen: {
    height: "50%",
    position: "absolute",
    width: "100%",
    bottom: 0,
    justifyContent: "flex-end",
  },
  bottomContainer: {
    width: "100%",

    alignItems: "center",
    marginBottom: "20%",
  },
  buttonContainer: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

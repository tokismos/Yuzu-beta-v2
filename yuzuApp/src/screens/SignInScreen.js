import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import TextInputColored from "../components/TextInputColored";
import { COLORS } from "../consts/colors";
import useAuth from "../hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import GoogleIcon from "../assets/GoogleIcon.svg";

const { height, width } = Dimensions.get("screen");

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { signIn, signInWithGoogle, signInWithFb } = useAuth();

  return (
    <>
      <View
        style={{
          height: "10%",
          width: "10%",
          justifyContent: "flex-end",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ height }}>
        <View
          style={{
            margin: 20,
            padding: 10,
            borderColor: COLORS.primary,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Connectez vous à votre compte :
          </Text>
          <TextInputColored label="E-mail" setChangeText={setEmail} />
          <TextInputColored
            label="Mot de passe"
            setChangeText={setPassword}
            secured
          />
          <CustomButton
            onPress={() => signIn(email, password)}
            title="Se connecter"
            style={{ alignSelf: "center" }}
            disabled={password.length == 0}
          />
        </View>
        <View style={{ width: "100%", flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexGrow: 1,
                height: 0.4,
                backgroundColor: "gray",
                alignItems: "flex-end",
              }}
            />

            <Text
              style={{
                textAlign: "center",
                marginHorizontal: 20,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Ou bien
            </Text>
            <View
              style={{ flexGrow: 1, height: 0.4, backgroundColor: "gray" }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.95}
            style={{
              ...styles.button,
              backgroundColor: "white",
              alignSelf: "center",
              elevation: 1,
            }}
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
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 60,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
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

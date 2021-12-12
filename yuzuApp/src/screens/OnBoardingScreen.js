import React, { useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";

import Onboarding from "react-native-onboarding-swiper";

import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "white" : "rgba(0, 0, 0, 0.3)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Next = ({ isLight, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          marginRight: 15,
          alignSelf: "center",
        }}
      >
        Suivant
      </Text>
    </TouchableOpacity>
  );
};

const Skip = ({ isLight, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={{ color: "white", fontSize: 20, marginLeft: 15 }}>
        Passer
      </Text>
    </TouchableOpacity>
  );
};
const Done = ({ isLight, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        height: 45,
        width: 45,
        borderRadius: 25,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
      }}
    >
      <MaterialIcons name="done" size={40} color="#ffc700" />
    </TouchableOpacity>
  );
};
const ref = React.createRef();
const OnBoardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => {
        navigation.replace("LoginScreen");
      }}
      onDone={() => {
        navigation.replace("LoginScreen");
      }}
      DotComponent={Square}
      NextButtonComponent={Next}
      SkipButtonComponent={Skip}
      DoneButtonComponent={Done}
      bottomBarColor="#ffc700"
      pages={[
        {
          backgroundColor: "white",
          image: (
            <LottieView
              autoPlay
              resizeMode="cover"
              speed={0.5}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/imgOnboard1.json")}
            />
          ),
          title: "Découvrez tous les jours de délicieuses recettes",
          titleStyles: {
            fontWeight: "bold",
          },
          subtitle: "",
        },
        {
          backgroundColor: "white",
          image: (
            <LottieView
              autoPlay
              resizeMode="cover"
              speed={0.5}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/imgOnboard2.json")}
            />
          ),
          title: "Choisissez votre repas pour la semaine",
          titleStyles: {
            fontWeight: "bold",
          },
          subtitle: "",
        },
        {
          backgroundColor: "white",
          image: (
            <LottieView
              autoPlay
              resizeMode="cover"
              speed={1}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/imgOnboard3.json")}
            />
          ),
          title:
            "Vous pouvez vous faire livrer tous les ingrédients en un clic",
          titleStyles: {
            fontWeight: "bold",
          },
          subtitle: "",
        },
        {
          backgroundColor: "white",
          image: (
            <LottieView
              autoPlay
              resizeMode="cover"
              speed={0.7}
              style={{
                width: 300,
                height: 300,
              }}
              source={require("../assets/imgOnboard4.json")}
            />
          ),
          title: "Cuisinez et partagez vos meilleurs repas avec vos proches !",
          titleStyles: {
            color: "#000",
            fontWeight: "bold",
          },
          subtitle: "",
        },
      ]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({});

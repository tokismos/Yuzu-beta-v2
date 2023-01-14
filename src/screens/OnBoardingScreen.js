// Le screen qui nous montre le tutorial et les informations a propos de l'applicatio,
// Ce screen n'est pas actif pour le moment

import React, { createRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
// import YoutubePlayer from "react-native-youtube-iframe";
import PaginationDot from "react-native-animated-pagination-dot";
import { useTranslation } from "react-i18next";

import AsyncStorage from "@react-native-community/async-storage";

import { MaterialIcons, Feather } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import PagerView from "react-native-pager-view";
import AnimatedIntroCard from "../components/AnimatedIntroCard";
import CustomButton from "../components/CustomButton";

const { width } = Dimensions.get("screen");

const Row = ({ title, num }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 20,
        width: "90%",
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.primary,
          borderRadius: 15,
          height: 30,
          width: 30,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>{num}</Text>
      </View>
      <Text style={{ fontSize: 24 }}>{title}</Text>
    </View>
  );
};
const OnBoardingScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const ref = createRef();

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <PagerView
        scrollEnabled={false}
        style={{ height: "95%" }}
        initialPage={0}
        ref={ref}
      >
        <View
          key="1"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              height: "70%",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
            }}
          >
            <AnimatedIntroCard
              swiped={() => {
                setTimeout(() => {
                  ref.current.setPage(index + 1);
                  setIndex(index + 1);
                }, 300);
              }}
            />
            <Text
              style={{
                fontSize: 20,
                width: "90%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {t("onboardingScreen_swipeLeft")}
            </Text>
          </View>
        </View>
        <View
          key="2"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              height: "70%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AnimatedIntroCard
              swiped={() => {
                setTimeout(() => {
                  ref.current.setPage(index + 1);
                  setIndex(index + 1);
                }, 300);
              }}
              right
            />
            <Text
              style={{
                fontSize: 20,
                width: "90%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {t("onboardingScreen_swipeRight")}
            </Text>
          </View>
        </View>
        <View
          key="3"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "80%",
              height: "70%",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.primary,

                width: "100%",
                height: "80%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={async () => {

                  await AsyncStorage.setItem("hasSeenOnBoarding", "true");
                  navigation.navigate("TinderScreen");
                }}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Feather name="info" size={60} color="white" />
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={50}
                  color="white"
                />
              </TouchableOpacity>
              <LottieView
                autoPlay
                loop={true}
                resizeMode="cover"
                style={{
                  height: 160,
                }}
                speed={0.8}
                source={require("../assets/Click.json")}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                width: "90%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {t("onboardingScreen_clickInfo")}
            </Text>
          </View>
        </View>
      
    
        
      </PagerView>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PaginationDot
          activeDotColor={COLORS.primary}
          curPage={index}
          maxPage={3}
        />
      </View>
    </View>
  );
};

export default OnBoardingScreen;

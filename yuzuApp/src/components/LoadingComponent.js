import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

const LoadingComponent = () => {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,.3)",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        autoPlay
        resizeMode="cover"
        speed={1}
        style={{
          width: 150,
          height: 150,
        }}
        source={require("../assets/cookingLoading.json")}
      />
    </View>
  );
};
export default LoadingComponent;

const styles = StyleSheet.create({});

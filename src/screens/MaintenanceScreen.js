import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../consts/colors";
const { height, width } = Dimensions.get("screen");

const MaintenanceScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -100,
      }}
    >
      <View
        style={{
          width: "90%",
          height: "50%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{ height: 100, width: "100%", transform: [{ scale: 0.6 }] }}
        />
        <Image
          source={require("../assets/plug.png")}
          style={{ height: 100, width: 100 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Nous nous excusons pour la gène occasionée, Yuzu est en maintenance.
        </Text>
      </View>
    </View>
  );
};

export default MaintenanceScreen;

const styles = StyleSheet.create({});

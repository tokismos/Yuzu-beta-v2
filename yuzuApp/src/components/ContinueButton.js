import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../consts/colors";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const ContinueButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={styles.bottomButton} onPress={onPress}>
      <Text style={{ color: "white", fontSize: 18 }}>Continue</Text>
    </TouchableOpacity>
  );
};

export default ContinueButton;

const styles = StyleSheet.create({
  bottomButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    width: width - 60,
    height: 60,
    marginBottom: 20,
    elevation: 3,
  },
});

import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../consts/colors";

const CustomButton = ({ disabled, title, onPress, style, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.button,
        backgroundColor: disabled ? COLORS.secondary : COLORS.primary,
        ...style,
      }}
    >
      {isLoading && <ActivityIndicator size="small" color="white" />}
      <Text style={{ fontWeight: "bold", color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: 120,
    justifyContent: "center",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
});

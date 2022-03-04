//Un boutton  customizable qu'on peut utiliser dans toute l'application  , isLoading quand c'est true
// elle nous permet de voir le Loadingindicator quand on clique sur le bouton ,le colorRipple c'est la couleure de
// l'effet qu'on voit sur Android lorsqu'on clique sur le bouton,ca donne un effet native

import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../consts/colors";

const CustomButton = ({
  disabled,
  title,
  onPress,
  style,
  isLoading,
  textStyle,
  colorRipple,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: "white", ...colorRipple }}
      style={{
        ...styles.button,
        backgroundColor: disabled ? COLORS.secondary : COLORS.primary,
        ...style,
      }}
    >
      {isLoading && <ActivityIndicator size="small" color="white" />}
      <Text style={{ fontWeight: "bold", color: "white", ...textStyle }}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: 120,
    justifyContent: "center",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
});

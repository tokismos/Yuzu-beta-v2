// Le header qu on trouve dans le signUp screen,ici l'index est important parceque c'est lui qui
// nous permet de savoir ce que la touche precedent fait , si l'index est egal a 0 il retourne vers l'ecran precedent
// sinon il change le pageViewer

import React from "react";
import {
  Dimensions,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import { useNavigation } from "@react-navigation/core";
import FastImage from "react-native-fast-image";

const { height, width } = Dimensions.get("screen");

const LoginHeaderScreen = ({ index, innerRef }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        height: height * 0.1,
        width,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <View
        style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={() => {
            index >= 1
              ? innerRef?.current.setPage(index - 1)
              : navigation.goBack();
          }}
          style={{ padding: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            width: "100%",
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Créer un compte
        </Text>
      </View>
    </View>
  );
};

export default LoginHeaderScreen;

const styles = StyleSheet.create({});

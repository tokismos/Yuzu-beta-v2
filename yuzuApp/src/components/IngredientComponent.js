import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import { COLORS } from "../consts/colors";
import AsyncStorage from "@react-native-community/async-storage";

const IngredientComponent = ({
  ingredient: { name, quantity, unite, newQuantity },
  defaultNbrPersonne,
  isSaved,
  nbrPersonne,
  isCommandeScreen,
  setSelectedIngredients,
  selectedIngredients,
}) => {
  const [toggle, setToggle] = useState(isSaved);

  // const addToStorage = (item) => {
  //   try {
  //     await AsyncStorage.setItem("@storage_Key", value);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          alignSelf: "center",
          marginVertical: 3,
        }}
        onPress={() => {
          if (setSelectedIngredients) {
            if (!toggle) {
              console.log("slct ing", selectedIngredients);
              setSelectedIngredients((p) => [...p, name]);
            } else {
              setSelectedIngredients((p) => p.filter((item) => item != name));
            }
          }

          setToggle((p) => !p);
        }}
      >
        {/* We have new Quantity in the commande screen and we dont have nbrPersonne ,so we dont need to calcul it  */}
        {isCommandeScreen ? (
          <Text
            style={{ fontWeight: "bold", width: "25%", textAlign: "center" }}
          >
            {!newQuantity ? quantity : newQuantity}{" "}
            {unite == "unite" ? "" : unite}{" "}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 16,
              width: "25%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >{`${+((quantity * nbrPersonne) / defaultNbrPersonne).toFixed(1)} ${
            unite == "unite" ? "" : unite
          }`}</Text>
        )}
        <View
          style={{
            width: "75%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ marginLeft: 20, width: "75%" }}>{name}</Text>
          <CheckBox
            style={{
              transform: [{ scale: Platform.OS === "ios" ? 0.8 : 1.2 }],
            }}
            onTintColor={COLORS.primary}
            onFillColor={COLORS.primary}
            onCheckColor={"white"}
            onAnimationType="fill"
            offAnimationType="fade"
            boxType="square"
            disabled
            value={toggle}
            tintColors={{ true: COLORS.primary, false: "gray" }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default IngredientComponent;

const styles = StyleSheet.create({});

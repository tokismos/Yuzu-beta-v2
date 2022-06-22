import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import { COLORS } from "../consts/colors";

const IngredientComponent = ({
  ingredient: { name, quantity, unite, newQuantity },
  defaultNbrPersonne,
  isSaved,
  nbrPersonne,
  isCommandeScreen,
  setSelectedIngredients,
  selectedIngredients,
}) => {
  const [toggle, setToggle] = useState();

  //To check if its saved in th asyncstorage, for whatever reason it didnt work when i put useState(isSaved)
  useEffect(() => {
    setToggle(isSaved);
  }, [isSaved]);

  return (
    <>
      <TouchableOpacity
        style={styles.ingredientComponent}
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
            style={{
              fontWeight: "bold",
              width: "25%",
              textAlign: "center",
              fontSize: 16,
              textDecorationLine: toggle ? "line-through" : null,
            }}
          >
            {!newQuantity ? quantity : newQuantity}{" "}
            {unite == "unite" ? "" : unite}{" "}
          </Text>
        ) : (
          <Text
            style={{
              ...styles.textQuantity,
              textDecorationLine: toggle ? "line-through" : null,
            }}
          >{`${+((quantity * nbrPersonne) / defaultNbrPersonne).toFixed(1)} ${
            unite == "unite" ? "" : unite
          }`}</Text>
        )}
        <View style={styles.nameContainer}>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              width: "75%",
              textDecorationLine: toggle ? "line-through" : null,
            }}
          >
            {name}
          </Text>
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

const styles = StyleSheet.create({
  ingredientComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    marginVertical: 3,
  },
  textQuantity: {
    fontSize: 16,
    width: "25%",
    textAlign: "center",
    fontWeight: "bold",
  },
  textQuantityCrossed: {
    fontSize: 16,
    width: "25%",
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  nameContainer: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

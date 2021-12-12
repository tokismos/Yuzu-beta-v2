import React from "react";
import {
  Button,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import { Checkbox } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const CartScreen = ({ route, navigation }) => {
  const { ingredients } = route.params;
  let cart = [...ingredients];

  console.log("this is caert", cart);
  const IngredientItem = ({ ingredient }) => {
    const [checked, setChecked] = React.useState(true);

    return (
      <View style={styles.ingredientsContainer}>
        <Text style={{ fontSize: 18, width: "80%" }}>
          {ingredient.quantity} {ingredient.name}
        </Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
            if (checked) {
              const newCart = cart.filter(
                (item) => item.name !== ingredient.name
              );
              cart = newCart;
              console.log("this isss new caar t", cart);
            } else {
              cart.push(ingredient.name);
              console.log("cart", cart);
            }
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.secondary, marginTop: 40 }}
    >
      <View style={{ height: height * 0.15 }}>
        <View
          style={{
            height: "50%",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              textAlign: "center",
            }}
          >
            Your Ingredient
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.secondary,
            height: "50%",
            justifyContent: "center",
            paddingLeft: 10,
          }}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          Vous souhaitez faire courses pour les recette suivantes:
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "grey",
            padding: 20,
            textAlign: "justify",
          }}
        >
          Si vous vous trompez, vous pourrez rajouter ou enlever un ingrédient
          sur le site de votre supermarché
        </Text>

        {ingredients.map((item) => (
          <IngredientItem ingredient={item} key={item.name} />
        ))}
        <View style={{ width: "50%", alignSelf: "center", margin: 20 }}>
          <Button
            title="Continue"
            color={COLORS.primary}
            onPress={() => navigation.navigate("ResultCartScreen", { cart })}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  ingredientsContainer: {
    flexDirection: "row",
    width: width - 50,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
  },
});

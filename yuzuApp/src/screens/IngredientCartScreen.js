import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { COLORS } from "../consts/colors";

const IngredientCartScreen = ({ route, navigation }) => {
  const { cart } = route.params;
  let finalCart = {};

  useEffect(() => {
    cart.map((item) => {
      finalCart[item._id] = {
        ingredients: item.ingredients,
        name: item.name,
        imgURL: item.imgURL,
      };
    });
  }, []);

  const onPress = (ingredient, title) => {
    console.log("erd", finalCart[title].ingredients);
    console.log("bname", JSON.stringify(ingredient), title);
    if (finalCart[title].ingredients?.includes(ingredient)) {
      finalCart[title].ingredients = finalCart[title].ingredients.filter(
        (item) => item != ingredient
      );
    } else {
      finalCart[title].ingredients = finalCart[title]
        ? [...finalCart[title].ingredients, ingredient]
        : [ingredient];
    }
    console.log("tmopppib", finalCart);
  };

  const IngredientItemComponent = ({ ingredient, title }) => {
    const [toggle, setToggle] = useState(true);

    return (
      <TouchableOpacity
        onPress={() => {
          onPress(ingredient, title);
          setToggle((prev) => !prev);
        }}
        style={{
          flexDirection: "row",
          width: "95%",
          justifyContent: "space-between",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ marginLeft: 20, width: "80%" }}>
          {ingredient.quantity}{" "}
          {ingredient.unite == "unite" ? "" : ingredient.unite}{" "}
          {ingredient.name}
        </Text>
        <CheckBox
          disabled
          value={toggle}
          tintColors={{ true: COLORS.primary, false: "gray" }}
        />
      </TouchableOpacity>
    );
  };
  const CartItemComponent = ({ item }) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <View style={{ width: "15%", height: "20%", paddingLeft: 5 }}>
            <FastImage
              style={{ aspectRatio: 1, borderRadius: 10 }}
              source={{
                uri: item.imgURL,
                headers: { Authorization: "someAuthToken" },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            {/* <Image
              source={{ uri: item.imgURL }}
              style={{ aspectRatio: 1, borderRadius: 10 }}
            /> */}
          </View>
          <View style={{ width: "85%" }}>
            <Text
              style={{
                margin: 10,
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: -5,
              }}
            >
              {item.name}
            </Text>
            {item.ingredients.map((elmt, index) => (
              <IngredientItemComponent
                ingredient={elmt}
                key={index}
                title={item._id}
                set
              />
            ))}
          </View>
        </View>
        <View style={styles.separator} />
      </>
    );
  };
  //   useEffect(() => {
  //     cart.map((item) => {
  //       [finalCart.name] = item.name;
  //       [finalCart.ingredients] = item.ingredients;
  //     });
  //   }, [cart]);
  //   useEffect(() => {
  //     console.log("this is fiiiinal", finalCart);
  //   }, [finalCart]);
  return (
    <View style={{ alignItems: "center", flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: "bold",
          marginVertical: 15,
        }}
      >
        Les ingredients
      </Text>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ width: "100%" }}>
          {cart.map((item, index) => (
            <CartItemComponent item={item} key={index} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          height: "10%",
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ ...styles.buttonContainer, backgroundColor: COLORS.primary }}
          onPress={() => navigation.navigate("SummarizeScreen", { finalCart })}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
            Valider les ingrédients
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientCartScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#E3E3E3",

    height: "80%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    width: "90%",
    height: 0.4,
    backgroundColor: "gray",
    alignSelf: "center",
  },
});

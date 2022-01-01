import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CartComponent from "../components/CartComponent";
import HeaderComponent from "../components/HeaderComponent";
import { COLORS } from "../consts/colors";
const { width, height } = Dimensions.get("screen");

const PanierScreen = ({ navigation }) => {
  const { matches } = useSelector((state) => state.matchStore);
  //   console.log("thiiiiis matches", matches);
  let finalCart = matches;
  // const [finalCart, setFinalCart] = useState([...matches]);
  useEffect(() => {
    console.log("this isssssss", finalCart);
  }, [finalCart]);
  const validate = () => {
    navigation.navigate("IngredientsCartScreen", { cart: finalCart });
  };
  //when click on recipe we check if it exist to remove it or if not to add id
  const onPress = (item) => {
    console.log("pressed");
    const res = finalCart.includes(item);
    // console.log("res", item.name);
    if (!res) {
      finalCart.push(item);
      console.log("wasnt there");
    } else {
      finalCart = finalCart.filter((elmt) => elmt != item);
      //   setFinalCart(tmpCart);
      console.log("elemt was there");
    }
  };
  //   useEffect(() => {
  //     console.log("tjosooo cart", finalCart);
  //   }, [finalCart]);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Les recettes sélectionnées:</Text>
      <ScrollView>
        <View style={{ width: "100%" }}>
          <View style={{}}>
            {matches.map((item, index) => (
              <CartComponent
                index={index}
                item={item}
                key={item.name}
                onPress={onPress}
                finalCart={finalCart}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={{ ...styles.buttonContainer, backgroundColor: "#E3E3E3" }}
          onPress={() => {
            console.log("BBBBBBBBBBBBBB", finalCart);
            // navigation.goBack()
          }}
        >
          <Text style={{ fontWeight: "800", fontSize: 18, color: "black" }}>
            Ajouter d'autres recettes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.buttonContainer, backgroundColor: COLORS.primary }}
          onPress={validate}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
            Valider les recettes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PanierScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#E3E3E3",

    height: "40%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    height: "100%",
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 15,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "20%",
  },
  headerContainer: { backgroundColor: "red", height: "15%", width: "100%" },
});

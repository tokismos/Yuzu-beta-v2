//Ancien ecran ou il y'avait le resume de l'ecran,C'Est ecran doit etre supprimé

import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { COLORS } from "../consts/colors";
import { setCommandes } from "../helpers/db";
import { resetMatches } from "../redux/slicer/MatchSlicer";

const SummarizeScreen = ({ route, navigation }) => {
  const [cartArray, setCartArray] = useState([]);
  const { finalCart } = route.params;
  const dispatch = useDispatch();
  //To transform the cart from obj to array
  useEffect(() => {
    let arr = [];
    Object.entries(finalCart).forEach(([key, value]) => {
      arr.push({ _id: key, ...value });
    });
    setCartArray(arr);
  }, []);
  const CartComponent = ({ imgURL, name, ingredients }) => {
    return (
      <>
        <View style={styles.itemComponent}>
          <View style={styles.itemContainer}>
            <FastImage
              style={styles.image}
              source={{
                uri: imgURL,
                headers: { Authorization: "someAuthToken" },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            {/* <Image source={{ uri: imgURL }} style={styles.image} /> */}
          </View>
          <View style={{ width: "90%" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
                width: "90%",
              }}
            >
              {name}
            </Text>
            {ingredients?.map((item, index) => (
              <Text key={index} style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {!item.newQuantity ? item.quantity : item.newQuantity}{" "}
                  {item.unite == "unite" ? "" : item.unite}{" "}
                </Text>
                {item.name}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.separator} />
      </>
    );
  };

  return (
    <>
      <View style={{ height: "80%", backgroundColor: "white" }}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Résumé de la commande</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>Supermarché sélectionné :</Text>
            <Text style={{ fontSize: 22, marginLeft: 10 }}>Manor Food</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>Addresse de Livraison:</Text>
            <View>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Tim ITTEN </Text>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                {" "}
                Avenue Jomini 5
              </Text>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                1004 Lausanne
              </Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.separator, width: "100%" }} />
        <View style={{ height: "75%" }}>
          <ScrollView>
            {cartArray.map((item, index) => {
              if (item.ingredients?.length == 0) {
                return;
              }
              return (
                <CartComponent
                  key={index}
                  name={item.name}
                  imgURL={item.imgURL}
                  ingredients={item.ingredients}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
      <View style={{ ...styles.separator, width: "100%" }} />

      <View style={styles.bottomComponent}>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>
            Pour continuer la commande, tu vas être redirigé vers le site de ton
            supermarché.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCommandes(cartArray);
              dispatch(resetMatches());
              navigation.reset({
                index: 0,
                routes: [{ name: "TinderScreen" }],
              });
            }}
            style={styles.button}
          >
            <Text style={styles.textButton}>
              Enregistrer les recettes & continuer la commande
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SummarizeScreen;

const styles = StyleSheet.create({
  separator: {
    height: 0.4,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "gray",
  },
  headerContainer: {
    width: "100%",
    height: "25%",
    padding: 20,

    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomComponent: {
    width: "100%",
    height: "20%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    width: "100%",
  },
  button: {
    width: "90%",
    height: "50%",
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  itemComponent: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  itemContainer: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "90%",
    width: "90%",
    borderRadius: 10,
    resizeMode: "contain",
  },
});

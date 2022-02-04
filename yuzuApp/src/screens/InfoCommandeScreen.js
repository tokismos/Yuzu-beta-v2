import { format } from "date-fns";
import React, { useLayoutEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { COLORS } from "../consts/colors";
const { height, width } = Dimensions.get("screen");

const CartComponent = ({ imgURL, name, ingredients }) => {
  return (
    <>
      <View
        style={{
          ...styles.itemComponent,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <View style={styles.imageContainer}>
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
        <View style={{ flex: 1 }}>
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
const InfoCommandeScreen = ({ navigation, route }) => {
  const { params } = route;
  useLayoutEffect(() => {
    let time = new Date(params.historyDetail.dateTime);

    navigation.setOptions({
      title: `Liste du ${format(time, "dd/MM/yyyy")}`,
    });
  }, []);

  return (
    <ScrollView style={{}}>
      {params.historyDetail.recipes.map((item, i) => {
        return (
          <CartComponent
            key={i}
            imgURL={item.imgURL}
            name={item.name}
            ingredients={item.ingredients}
          />
        );
      })}
    </ScrollView>
  );
};

export default InfoCommandeScreen;

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
    marginVertical: 5,
    width,
  },
  imageContainer: {
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

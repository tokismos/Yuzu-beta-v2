import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { COLORS } from "../consts/colors";

const { width, height } = Dimensions.get("screen");
const CartComponent = ({ item, onPress }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.container]}
        onPress={() => {
          onPress(item);
          setToggle((prev) => !prev);
        }}
      >
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: item.imgURL }}
            style={{ height: "90%", width: "90%", borderRadius: 10 }}
          />
        </View>
        <View style={styles.midContainer}>
          <View style={{ flexShrink: 1, marginLeft: 0 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text style={{ color: "gray" }}>
              {item.tempsPreparation} min de preparation
            </Text>
            <Text style={{ color: "gray", fontSize: 14 }}>
              {item.ingredients.length} d'ingredients
            </Text>
          </View>
          <Text style={{ fontSize: 12 }}>4 personnes</Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            value={toggle}
            onValueChange={(newValue) => setToggle(newValue)}
            size={30}
            disabled
            tintColors={{ true: COLORS.primary, false: "gray" }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
    </>
  );
};

export default CartComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: height * 0.1,
    width: "95%",
    alignSelf: "center",
    marginVertical: 7,
  },
  imgContainer: {
    width: "25%",
    justifyContent: "center",
    padding: 3,
  },
  midContainer: {
    width: "65%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkBoxContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 0.4,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "gray",
  },
});

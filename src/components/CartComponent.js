// Every item qui compose notre cart dans PanierScreen , ce composent est chaque item de la liste qui
// se compose des details plus le checkbox

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
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const NbrPersonneComponent = ({ item, setFinalCart, index }) => {
  return (
    <View
      style={{
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "10%",
      }}
    >
      <TouchableOpacity
        style={{ padding: 10, marginRight: "-15%" }}
        onPress={() => {
          setFinalCart((p) => {
            const tmp = JSON.parse(JSON.stringify(p));
            if (tmp[index].nbrPersonne > 2) {
              tmp[index].nbrPersonne = parseInt(tmp[index].nbrPersonne) - 1;
            }
            return [...tmp];
          });
          // setNbrPersonne((p) => p - 1);
        }}
      >
        <AntDesign name="minuscircleo" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", color: "gray", marginLeft: 5 }}>
        {item.nbrPersonne}
      </Text>
      <MaterialCommunityIcons
        name="human-male"
        size={24}
        color="gray"
        style={{ marginRight: 5 }}
      />
      <TouchableOpacity
        style={{ padding: 10, marginLeft: "-15%" }}
        onPress={() => {
          setFinalCart((p) => {
            const tmp = JSON.parse(JSON.stringify(p));
            if (tmp[index].nbrPersonne < 8) {
              tmp[index].nbrPersonne = parseInt(tmp[index].nbrPersonne) + 1;
            }
            return [...tmp];
          });
        }}
      >
        <AntDesign name="pluscircleo" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};
const CartComponent = ({ item, onPress, setFinalCart, index }) => {
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
          <View
            style={{
              flexShrink: 1,
              marginLeft: 0,
              flexDirection: "row",
            }}
          >
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "95%",
                }}
              >
                <View>
                  <Text style={{ color: "gray" }}>
                    {item.tempsPreparation} min de preparation
                  </Text>
                  <Text style={{ color: "gray", fontSize: 14 }}>
                    {item.ingredients.length} ingredients
                  </Text>
                </View>

                <NbrPersonneComponent
                  item={item}
                  setFinalCart={setFinalCart}
                  index={index}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            onTintColor={COLORS.primary}
            onFillColor={COLORS.primary}
            onCheckColor={"white"}
            onAnimationType="fill"
            boxType="square"
            style={[
              {
                transform: [{ scale: 0.8 }],
              },
            ]}
            value={toggle}
            onValueChange={(newValue) => setToggle(newValue)}
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
    justifyContent: "flex-start",
  },
  separator: {
    height: 0.4,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "gray",
  },
});

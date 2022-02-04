import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { COLORS } from "../consts/colors";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("screen");
const CartComponent = ({ item, onPress, finalCart, setFinalCart, index }) => {
  const [toggle, setToggle] = useState(true);
  const [nbrPersonne, setNbrPersonne] = useState(+item.nbrPersonne);
  const { matches } = useSelector((state) => state.matchStore);


  const NbrPersonneComponent = () => {
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
          name="snowman"
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

                <NbrPersonneComponent />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox



onTintColor={COLORS.primary}
onFillColor={COLORS.primary}
onCheckColor={'white'}
onAnimationType='fill'

boxType='square'

style={[ {
  transform: [{ scale: .8 }]
}]}
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

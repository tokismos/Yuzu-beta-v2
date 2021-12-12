import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "./TinderCard";
import { BottomSheet, Button } from "react-native-elements";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../consts/colors";

const { width } = Dimensions.get("screen");

const List = ({ item }) => {
  return (
    <View style={{ marginLeft: 10, marginRight: 5 }}>
      <Card
        height={200}
        width={150}
        source={{
          uri: item.uri,
        }}
        style={{ borderRadius: 5, overflow: "hidden" }}
        text={item.title}
        titleStyle={{ fontSize: 18 }}
      ></Card>
    </View>
  );
};

const HorizontalList = ({ DATA, title }) => {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState();

  return (
    <View style={{}}>
      {data && (
        <BottomSheet isVisible={isVisible} containerStyle={{}}>
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={{ position: "absolute", zIndex: 1, right: 10, top: 10 }}
          >
            <AntDesign name="closecircle" size={26} color="black" />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: COLORS.secondary,
              height: 270,
              borderRadius: 20,
              flexDirection: "row",
            }}
          >
            <View style={{}}>
              <Image
                source={{
                  uri: data.uri,
                }}
                style={{
                  height: 200,
                  width: 130,
                  marginLeft: 5,
                  marginTop: 15,
                  marginBottom: 10,
                  marginRight: 0,
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 30,
                  justifyContent: "space-between",
                }}
              >
                <Ionicons name="share-social-outline" size={24} color="black" />
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </View>
            <View style={{ width: "60%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginTop: 25,
                  marginLeft: 15,
                }}
              >
                {data.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <AntDesign name="clockcircleo" size={15} color="black" />
                  <Text style={{ fontSize: 12 }}> 35 min</Text>
                </View>
                <Text style={{ fontSize: 12 }}>Cuisiné 2563 fois</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text>88%</Text>
                  <AntDesign name="like2" size={15} color="black" />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  navigation.navigate("IngredientScreen");
                }}
              >
                <Text numberOfLines={5} style={{ margin: 5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  vehicula enim eget tortor ornare, sed dictum magna ultricies.
                  Donec vel tincidunt elit. Nullam elementum, libero non dapibus
                  vestibulum, leo nunc dictum nibh, et molestie nibh justo eget
                  velit. Nunc sit amet lorem eget eros gravida interdum.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  justifyContent: "center",
                  borderRadius: 15,
                  alignItems: "center",
                  backgroundColor: COLORS.primary,
                  height: 50,
                  width: 170,
                  alignSelf: "center",
                  marginTop: 15,
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Ajouter au panier
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      )}

      <Text
        style={{
          fontSize: 23,
          marginLeft: 40,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        {title}
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={DATA}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setData(item);
                setIsVisible(true);
              }}
            >
              <List item={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  marg: {},
});

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { COLORS } from "../consts/colors";
import { getAllRecipes } from "../axios";
import LoadingComponent from "../components/LoadingComponent";
import { NavigationContainer } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const TestImg = ({ item }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        backgroundColor: "red",
        margin: 0.5,
        height: height * 0.25,
        flexGrow: 1,
      }}
    >
      <Image
        style={{ height: "100%", width: "100%" }}
        source={{ uri: item ? item : null }}
      />
    </View>
  );
};

const FirstScreen = ({ navigation }) => {
  const [searchText, setSearch] = useState("");
  const [DATA, setDATA] = useState("");
  useEffect(() => {
    getAllRecipes(setDATA);
  }, []);
  console.log("this sis rendered ");
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <StatusBar backgroundColor={COLORS.primary} />

      <View
        style={{
          height: height * 0.1,
          backgroundColor: COLORS.primary,
          width,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>
          LES RECETTES DU MOMENT
        </Text>
      </View>
      <View
        style={{
          backgroundColor: COLORS.secondary,
          height: height * 0.1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <FontAwesome
              name="search"
              size={24}
              color="black"
              style={{ marginHorizontal: 10 }}
            />
            <TextInput
              placeholder="Search"
              value={searchText}
              onChangeText={(text) => setSearch(text)}
              style={{
                width: 170,
                height: 50,
                backgroundColor: "white",
                padding: 5,
                fontSize: 18,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              height: 53,
              paddingHorizontal: 30,
              borderWidth: 1,
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "orange",
          flex: 1,
          flexDirection: "row",
          width,
        }}
      >
        {DATA ? (
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() =>
                  navigation.navigate("IngredientScreen", { item })
                }
              >
                <TestImg item={item.imgURL} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
            numColumns={3}
          />
        ) : (
          <LoadingComponent />
        )}
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({});

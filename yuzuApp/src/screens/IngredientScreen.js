import React from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";

const { width } = Dimensions.get("screen");

const IngredientScreen = ({ route, navigation }) => {
  const { recipe } = route.params;
  console.log("iten", recipe);
  //container of each step
  const StepContainer = ({ item, index }) => {
    return (
      <View style={styles.stepContainer}>
        <Text style={{ fontSize: 25, color: "gray" }}>{index + 1}.</Text>
        <Text>{item}</Text>
      </View>
    );
  };
  //The view wich contain all steps
  const StepsView = () => {
    return (
      <View>
        <View style={styles.stepHeaderContainer}>
          <View style={styles.lineHeader}></View>
          <View style={styles.stepsTitle}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Etapes de preparation
            </Text>
          </View>
          <View style={styles.lineHeader}></View>
        </View>
        {recipe.steps.map((item, index) => (
          <StepContainer item={item} index={index} key={index} />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View style={styles.topBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="clockcircleo" size={15} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}> 35 min</Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Crustacés</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>88%</Text>
          <AntDesign name="like2" size={15} color="black" />
        </View>
      </View>
      <Image
        resizeMode="contain"
        style={{ aspectRatio: 1 }}
        source={{
          uri: recipe.imgURL,
        }}
      />
      <View style={styles.bottomBar}>
        <Text style={styles.textBottomBar}>Dèja cuisiné 560 fois</Text>
      </View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "white",
          padding: 20,
        }}
      >
        {recipe.name}
      </Text>
      {/* <View style={{ borderBottomWidth: 1, height: 150, flexDirection: "row" }}>
        <View style={styles.profileImg}>
          <Image
            style={styles.img}
            source={{
              uri: "https://avatoon.me/wp-content/uploads/2020/07/Cartoon-Pic-Ideas-for-DP-Profile-03.png",
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.descriptionContainer}>
            <Text style={{ fontWeight: "bold" }}>Hélène de Pic</Text>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="star" size={24} color="gold" />
              <AntDesign name="star" size={24} color="gold" />
            </View>
          </View>
          <Text style={{ color: "grey", marginLeft: 12, marginTop: -10 }}>
            @picpic
          </Text>
        </View>
      </View> */}
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, marginHorizontal: 20 }}>
            Recette pour
          </Text>
          <View style={styles.nbrContainer}>
            <AntDesign name="minus" size={24} color="black" />
            <Text style={{ marginHorizontal: 10 }}>4</Text>
            <AntDesign name="plus" size={24} color="black" />
          </View>
        </View>
        <View>
          <Text style={styles.ingredientTitle}>Les ingredients:</Text>
          {recipe.ingredients?.map((text) => {
            return (
              <Text key={text.name} style={styles.ingredientText}>
                - {text.quantity} {text.name}
              </Text>
            );
          })}
        </View>
      </View>
      <StepsView steps={recipe.steps} />
      <View
        style={{
          alignItems: "center",
          marginBottom: 50,
          justifyContent: "center",
        }}
      >
        <Button
          title="Add to cart"
          color={COLORS.primary}
          width={400}
          onPress={() =>
            navigation.navigate("CartScreen", {
              ingredients: recipe.ingredients,
            })
          }
        />
      </View>
    </ScrollView>
  );
};

export default IngredientScreen;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    justifyContent: "space-around",
  },
  bottomBar: {
    backgroundColor: COLORS.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  textBottomBar: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    marginRight: 20,
  },
  profileImg: {
    borderWidth: 1,
    height: 105,
    width: 105,
    marginTop: 15,
    marginLeft: 20,
    borderRadius: 52.5,
  },
  img: {
    height: 100,
    width: 100,
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 1,
  },
  descriptionContainer: {
    flexDirection: "row",
    height: 30,
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
  },
  stepContainer: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
  },
  stepHeaderContainer: {
    flexDirection: "row",
    height: 50,

    alignItems: "center",
  },
  lineHeader: {
    height: 10,
    width: "20%",
    backgroundColor: COLORS.primary,
  },
  stepsTitle: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  nbrContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: 100,
    height: 30,
  },
  ingredientTitle: {
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 30,
    fontWeight: "bold",
  },
  ingredientText: {
    marginVertical: 10,
    marginHorizontal: 30,
    fontSize: 18,
  },
});

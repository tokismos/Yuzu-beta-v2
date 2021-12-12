import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Feather } from "@expo/vector-icons";

const Imagee = ({ uri, loaded, setLoaded }) => {
  return (
    <FastImage
      style={loaded ? { ...styles.image, marginTop: -5 } : { display: "none" }}
      source={{ uri, priority: FastImage.priority.high }}
      resizeMode={FastImage.resizeMode.cover}
      onLoad={() => setLoaded(true)}
    />
  );
};

const TinderCard = ({ recipe, onSwipeRight, onSwipeLeft }) => {
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const { nbrOfRecipes, matches } = useSelector((state) => state.matchStore);
  //The progress bar
  return (
    <>
      {/* <View
        style={{
          backgroundColor: "#f5f4f4",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      /> */}
      <Pressable
        disabled
        style={{
          height: "100%",
          width: "100%",
        }}
        onPress={() =>
          navigation.navigate("IngredientScreen", { recipe: recipe })
        }
      >
        {/* <ImageBackground style={styles.image} source={{ uri: recipe?.imgURL }}> */}
        <View
          // colors={["rgba(0, 0, 0, 0)", "rgba(0, 0,0, 1)"]}
          // start={{ x: 0, y: 1 }}
          // end={{ x: 0, y: 1 }}
          style={{
            height: "20%",
            width: "100%",
            borderTopRightRadius: 20,

            borderTopLeftRadius: 20,
            backgroundColor: "black",
            // position: "absolute",
            // top: 10,
            // left: 0,
            // right: 0,
          }}
        >
          <View
            style={{
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 0,
              flexDirection: "row",
            }}
          >
            <View style={{ width: "90%" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                  height: "100%",
                  marginTop: 10,
                }}
              >
                {recipe?.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: "50%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
              paddingHorizontal: 10,
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ width: "30%", textAlign: "center", color: "white" }}>
              {recipe.tempsPreparation} min de préparation
            </Text>
            <Text style={{ width: "40%", textAlign: "center", color: "white" }}>
              {" "}
              $
            </Text>
            <Text style={{ width: "30%", textAlign: "center", color: "white" }}>
              92% ont aimé cette recette
            </Text>
          </View>
          {/* <View style={styles.headerContainer}>
              <Text style={styles.title}>{recipe?.name}</Text>
              <View style={styles.descriptionContainer}>
                <Text
                  style={{ color: "white", textAlign: "center", flex: 1 / 3 }}
                >
                  15 min de preparation
                </Text>
                <Text
                  style={{ color: "white", textAlign: "center", flex: 1 / 3 }}
                >
                  634 kcal
                </Text>
                <Text
                  style={{ color: "white", textAlign: "center", flex: 1 / 3 }}
                >
                  95% ont aime la recette
                </Text>
              </View>
            </View> */}
        </View>

        <Image
          source={{ uri: recipe?.imgURL }}
          style={
            loaded
              ? { ...styles.image, marginTop: -5 }
              : { display: "none", backgroundColor: "white" }
          }
          onLoad={() => setLoaded(true)}
        />

        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0,0, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.3 }}
          style={{
            ...styles.gradient,
            position: "absolute",
            bottom: 35,
            right: 0,
            left: 0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          {/* {
              <View style={styles.progressContainer}>
                <ProgressView />
              </View>
            } */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onSwipeLeft} style={styles.leftButton}>
              <FontAwesome name="close" size={50} color="#EF5454" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("IngredientScreen", { recipe });
              }}
              style={{
                height: "100%",
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="info" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSwipeRight}
              style={[styles.leftButton, { borderColor: COLORS.primary }]}
            >
              <FontAwesome name="heart" size={45} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {/* </ImageBackground> */}
      </Pressable>
    </>
  );
};

export default TinderCard;

const styles = StyleSheet.create({
  imgText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    height: "60%",
    width: "100%",
  },
  headerContainer: {
    height: "70%",
    justifyContent: "space-between",
    paddingTop: 0,
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 20,
  },
  gradient: {
    height: "20%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
  },
  leftButton: {
    height: 80,
    width: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#EF5454",
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});

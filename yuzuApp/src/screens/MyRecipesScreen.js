//L'Ecran des recettes commandées et des recettes mis en favoris.Ici la logique que c'Est suivi c'est j'ai utilisé
// la me epage pour deux composants, si le nom de la page est Recette Favories alors on montre le component des favoris
// snn on montre le componant des recettes commandés

import React, { Component, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { getAllFavoris, getCommandes } from "../helpers/db";
const { width, height } = Dimensions.get("screen");
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import {
  Colors,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { setCuisineNotification } from "../redux/slicer/notificationSlicer";

const Skeleton = ({ title }) => {
  return (
    <SkeletonPlaceholder>
      {title ? (
        <View
          style={{
            width: width - 100,
            height: 30,
            marginLeft: 5,
            marginVertical: 10,
            marginBottom: 0,
            alignSelf: "flex-start",
          }}
        />
      ) : (
        <View />
      )}
      <View
        style={{
          width: "90%",
          marginVertical: 10,
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 10,
          alignSelf: "center",
        }}
      >
        <View style={{ width: width * 0.35, aspectRatio: 1 }} />
        <View style={{ marginLeft: 20 }}>
          <View style={{ width: 120, height: 20, borderRadius: 4 }} />
          <View
            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
const CommandeItem = ({ recipe }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      android_ripple={{ color: "#d3d3d3", foreground: true }}
      onPress={() =>
        navigation.navigate("IngredientScreen", { _id: recipe._id })
      }
      style={{
        width: "90%",
        marginVertical: 10,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "center",
      }}
    >
      <View
        style={{
          width: width * 0.35,
          borderRadius: 10,
        }}
      >
        <FastImage
          style={{ aspectRatio: 1 }}
          source={{
            uri: recipe.imgURL,
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
          {recipe.name}
        </Text>
      </View>
      <View
        style={{
          width: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
      </View>
    </Pressable>
  );
};

const MyRecipesScreen = ({ route }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favorites } = useSelector((state) => state.favoritesStore);
  const dispatch = useDispatch();
  const initialize = async () => {
    if (route.name == "Recettes favories") {
      await getAllFavoris(setRecipes);
      setIsLoading(false);
    } else {
      await getCommandes(setRecipes);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    dispatch(setCuisineNotification(null));
    initialize();
  }, []);

  //To detect when we set the commandes
  // useEffect(() => {
  //   if (favorites.length != 0) {
  //     setIsLoading(false);
  //   }
  //   if (recipes.length != 0) {
  //     setIsLoading(false);
  //   }
  // }, [recipes, favorites]);

  const CommandeComponent = ({ item, dateTime }) => {
    let time = new Date(dateTime);

    return (
      <View
        style={{
          width: "100%",
          marginVertical: 10,
          justifyContent: "center",
        }}
      >
        {route.name != "Recettes favories" && (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 5,
              color: "gray",
            }}
          >
            {`Recettes du ${format(time, "dd/MM/yyyy")}`}
          </Text>
        )}
        {item.map((elmt, i) => {
          return <CommandeItem recipe={elmt} key={i} />;
        })}
      </View>
    );
  };
  return (
    <>
      {isLoading ? (
        <View style={{}}>
          <Skeleton title={true} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </View>
      ) : (
        <>
          {route.name != "Recettes favories" ? (
            <ScrollView style={{ flex: 1 }}>
              <View
                style={{ alignItems: "center", height: "90%", marginTop: 10 }}
              >
                {recipes.map((item, i) => {
                  console.log("HA ITEN", item);
                  return (
                    <CommandeComponent
                      item={item.recipes}
                      dateTime={item.dateTime}
                      key={i}
                    />
                  );
                })}
              </View>
            </ScrollView>
          ) : favorites.length != 0 ? (
            <ScrollView style={{ flex: 1 }}>
              <View
                style={{ alignItems: "center", height: "90%", marginTop: 10 }}
              >
                {recipes.map((item, i) => {
                  return <CommandeItem recipe={item} key={i} />;
                })}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Aucune recette en favoris !</Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default MyRecipesScreen;

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    backgroundColor: "#f5f4f4",
    paddingTop: 10,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  TextInput: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 3,
  },
  button: {
    height: "10%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: Colors.primary,
    height: "10%",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
    marginTop: 40,
  },
  bottomContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    transform: [{ scale: 0.8 }],
  },
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
  ImageBackground,
  requireNativeComponent,
  ToastAndroid,
} from "react-native";
import TinderCard from "../components/TinderCard";
import users from "../helpers/data/";
import { AntDesign, Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import AnimatedStack from "../components/AnimatedStack";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, changeNumberOfRecipes } from "../redux/slicer/MatchSlicer";
import { COLORS } from "../consts/colors";

import { getAllRecipes } from "../axios";
// import { setRecipes } from "../redux/slicer/recipeSlicer";
import { Avatar } from "react-native-paper";

import LoadingComponent from "../components/LoadingComponent";
// import { LoginWithFb, signOut } from "../helpers/db";
import HeaderComponent from "../components/HeaderComponent";
import auth from "@react-native-firebase/auth";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
const { height, width } = Dimensions.get("screen");
import { setUser } from "../redux/slicer/userSlicer";
import { getAdditionalInfo } from "../helpers/db";

const Header = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.userStore);

  return (
    <ImageBackground
      source={require("../assets/logoNoel.png")}
      resizeMode="contain"
      style={{
        flexDirection: "row",
        height: height * 0.08,
        width: "100%",
        marginTop: 20,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
      >
        <LottieView
          source={require("../assets/snow.json")}
          speed={0.4}
          autoPlay
          style={{
            width: "100%",
          }}
        />
        <LottieView
          source={require("../assets/snow.json")}
          autoPlay
          speed={0.6}
          style={{
            width: "80%",
            marginLeft: 15,
            position: "absolute",
            bottom: -20,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          auth().currentUser
            ? navigation.navigate("ProfileScreen")
            : navigation.navigate("SignUpScreen")
        }
        style={{
          width: "25%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar.Image
          size={40}
          source={
            user?.photoURL != null
              ? {
                  uri: user?.photoURL,
                }
              : require("../assets/avatar.png")
          }
        />

        {/* <Image
          source={
            user?.photoURL != null
              ? {
                  uri: user?.photoURL,
                }
              : require("../assets/avatar.png")
          }
          style={{
            height: "60%",
            width: "60%",
            resizeMode: "contain",
            borderRadius: 50,
          }}
        /> */}
      </TouchableOpacity>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 99,
        }}
      >
        <Image
          source={require("../assets/logoNoel.png")}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
      <View
        style={{
          width: "30%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("FeedBackScreen")}
          style={{
            backgroundColor: COLORS.primary,
            width: "70%",
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            FeedBack
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const BarHeader = () => {
  const { user } = useSelector((state) => state.userStore);
  const navigation = useNavigation();
  return user?.phoneNumber || user == null ? (
    <View
      style={{
        height: "5%",
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#f5f4f4",
      }}
    >
      <View
        style={{
          width: "75%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: "white",
        }}
      >
        <Entypo name="home" size={24} color="black" />
        <Text>Avenue Jomini 5, Lausanne, 1004</Text>
        <AntDesign name="downcircleo" size={15} color={COLORS.primary} />
      </View>
      <View
        style={{
          width: "25%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "white",
          marginLeft: 1,
          borderBottomLeftRadius: 10,
        }}
      >
        <Image
          source={require("../assets/marcher.png")}
          style={{
            resizeMode: "contain",
            aspectRatio: 1,
            height: "30%",
            width: "30%",
          }}
        />
        <AntDesign name="downcircleo" size={15} color={COLORS.primary} />
      </View>
    </View>
  ) : (
    <Pressable
      onPress={() => navigation.navigate("ProfileScreen")}
      style={{
        height: "5%",
        width: "100%",
        backgroundColor: "#b20000",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
        Vous avez des informations manquantes dans votre profile.
      </Text>
    </Pressable>
  );
};
const TinderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { nbrOfRecipes, matches } = useSelector((state) => state.matchStore);
  const { activeFilters } = useSelector((state) => state.recipeStore);

  const loadData = async (item) => {
    getAllRecipes(item)
      .then((result) => {
        const tmp = result.filter((item) => item.imgURL != null);
        setRecipes(tmp);
      })
      .catch((e) => console.log("HOOHOHOHOHOHHOHO", e));
  };

  //To add the additional information to the store , we get them from firebase DB
  useEffect(() => {
    if (user != null) {
      getAdditionalInfo().then((e) => {
        console.log("W", e);
        if (!e.phoneNumber) {
          setIsLoading(false);

          return navigation.navigate("PhoneScreen");
        }
        dispatch(setUser({ ...user, phoneNumber: e.phoneNumber }));
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    loadData();
  }, []);

  const onSwipeLeft = (item) => {
    // console.warn("swipe left", user.name);
    console.log("swiped left", item);
  };

  const onSwipeRight = (item) => {
    dispatch(addMatch(item));
    // console.warn("swipe right: ", user.name);
    console.log("swiped right", item);
  };
  const BottomContainer = () => {
    return (
      <View
        style={{
          width: "100%",
          height: "10%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            transform: [{ scale: 0.8 }],
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => navigation.navigate("CommandesScreen")}
          >
            <Image source={require("../assets/recette.png")} />
            <Text style={{ color: "#cccccc" }}>Recettes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image source={require("../assets/cuisine.png")} />
            <Text style={{ color: "#cccccc" }}>Cuisine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("CommandesScreen")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: -3,
              marginLeft: -20,
            }}
          >
            <Entypo name="list" size={40} color="#cccccc" />
            <Text style={{ color: "#cccccc" }}>Liste de courses</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.pageContainer}>
      <Header />
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <BarHeader />
      )}
      <HeaderComponent
        yes
        page="1"
        style={{ justifyContent: "center", height: height * 0.1 }}
      />
      {/* <NbrMatchComponent /> */}
      {/* <View style={[styles.headerContainer, { height: "10%" }]}>
        <TouchableOpacity onPress={() => navigation.navigate("FilterScreen")}>
          <FontAwesome5 name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View> */}
      {recipes.length == 0 ? (
        <LoadingComponent />
      ) : (
        <>
          <View style={{ height: "63%", width: "100%" }}>
            <AnimatedStack
              data={recipes}
              renderItem={({ item, onSwipeRight, onSwipeLeft }) => (
                <TinderCard
                  height="100%"
                  width="100%"
                  recipe={item}
                  onSwipeRight={onSwipeRight}
                  onSwipeLeft={onSwipeLeft}
                />
              )}
              onSwipeLeft={onSwipeLeft}
              onSwipeRight={onSwipeRight}
            />
          </View>
          {matches.length > 3 ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("PanierScreen")}
              >
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                >
                  Générer ma liste de course{" "}
                  {matches.length != 0 ? `(${matches.length})` : null}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <BottomContainer />
          )}
        </>
      )}
    </View>
  );
};

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
  nbrContainer: {
    backgroundColor: COLORS.primary,
    height: "15%",
    width: "90%",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  TextInput: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 3,
  },
  buttonContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    height: "10%",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
    marginTop: 40,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "90%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TinderScreen;

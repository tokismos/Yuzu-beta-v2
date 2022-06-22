//La page d'acceuil'c'Est la où la plus part de l'application arrive,Lors du chargement on recupere toute les recettes,
//Quand l'utilisateur swipe le bouton apparait et on cache le bottom tab nav,et apres quand il le supprime il reaparait.

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  StatusBar,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from "react-native";
import TinderCard from "../components/TinderCard";
import { AntDesign } from "@expo/vector-icons";
import Oven from "../assets/oven.svg";
import Time from "../assets/time.svg";
import Livre from "../assets/livre.svg";
import AnimatedStack from "../components/AnimatedStack";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, resetMatches } from "../redux/slicer/MatchSlicer";
import { COLORS } from "../consts/colors";

import { getAllRecipes, incrementLeft, incrementRight } from "../axios";

const { height, width } = Dimensions.get("screen");
import { setUser } from "../redux/slicer/userSlicer";
import { getAdditionalInfo, getFavoris } from "../helpers/db";
import CustomButton from "../components/CustomButton";
import { Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { setFavorites } from "../redux/slicer/favoritesSlicer";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useMemo } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import FilterScreen from "./FilterScreen";
import AsyncStorage from "@react-native-community/async-storage";

const Header = ({ bottomSheetRef, count, setPressedFilter, temps }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        width,
        height: height * 0.12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Pressable
        onPress={() => {
          setPressedFilter("types");
          bottomSheetRef.current.open();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "200%",
        }}
      >
        <Livre height={40} width={40} fill="white" />
        <Text style={styles.categorieTitle}>
          Types de plats{"\n"}
          {count?.category != undefined && `(${count?.category})`}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setPressedFilter("temps");

          bottomSheetRef.current.open();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",

          height: "200%",
        }}
      >
        <Time height={40} width={40} fill="white" />

        <Text style={styles.categorieTitle}>
          Temps{"\n"}
          <Text style={{ fontSize: 12 }}>{temps != 0 && `(${temps} min)`}</Text>
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setPressedFilter("regimes");

          bottomSheetRef.current.open();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",

          height: "200%",
        }}
      >
        <MaterialCommunityIcons name="fish-off" size={40} color="white" />

        <Text style={styles.categorieTitle}>
          Régimes{"\n"}
          {count?.category != undefined && `(${count?.category})`}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setPressedFilter("materiel");

          bottomSheetRef.current.open();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",

          height: "200%",
        }}
      >
        <Oven height={40} width={40} fill="white" />
        <Text style={styles.categorieTitle}>
          Materiel{"\n"}
          {count?.material != undefined && `(${count?.material})`}{" "}
        </Text>
      </Pressable>
    </View>
  );
};
const TinderScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);

  const [pressedFilter, setPressedFilter] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [temps, setTemps] = useState(true);

  const { matches } = useSelector((state) => state.matchStore);
  const { activeFilters } = useSelector((state) => state.recipeStore);
  const { isFirstTime } = useSelector((state) => state.userStore);

  const bottomSheetRef = useRef();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  const [count, setCount] = useState();
  // const { openIntro } = route?.params;
  // variables

  const [isNotFirstTime, setIsNotFirstTime] = useState(false);
  console.log("ROUUUUUUUUUUIITEEEEEEEEEEEEEEEEEEEEEE", routes);
  // useEffect(() => {
  //   console.log("ROUUUUUUUUUUUUUUUUUUUtes", routes);
  //   (async () => {
  //     const isNotFirstTime = await AsyncStorage.getItem("isNotFirstTime");
  //     if (!isNotFirstTime) {
  //       navigation.navigate("OnBoardingScreen");
  //     } else {
  //       setIsNotFirstTime(true);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    if (isFirstTime) {
      console.log("WAAAAAAAAAA#", isFirstTime);
      navigation.navigate("OnBoardingScreen");
    }
  }, []);
  // useEffect(() => {
  //   console.log("HELOO FILTERS", activeFilters);
  //   activeFilters.forEach((v) => console.log("KOKOKKOKOK", ...Object.keys(v)));
  // }, [activeFilters]);
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: showButton ? "none" : "flex" },
    });
  }, [showButton]);
  const loadData = async (item) => {
    setIsLoading(true);
    getAllRecipes(item)
      .then((result) => {
        setRecipes(result);
        setIsLoading(false);
      })
      .catch((e) => console.log("HOOHOHOHOHOHHOHO", e));
  };

  const getAndSetFavorites = async () => {
    await getFavoris((fav) => dispatch(setFavorites(fav)));
  };
  //To add the additional information to the store , we get them from firebase DB
  useEffect(() => {
    if (user != null) {
      getAdditionalInfo().then((e) => {
        console.log("W", e);
        // if (!e.phoneNumber) {
        //   return navigation.navigate("PhoneScreen");
        // }
        dispatch(setUser({ ...user, phoneNumber: e.phoneNumber }));
      });
    } else {
    }
  }, []);
  useEffect(() => {
    loadData(activeFilters);
  }, [activeFilters]);

  useEffect(() => {
    getAndSetFavorites();
  }, []);
  useEffect(() => {
    if (matches.length > 0) {
      setShowButton(true);
    }
  }, [matches]);
  const onSwipeLeft = async (item) => {
    // console.warn("swipe left", user.name);
    console.log("swiped left", item);
    await incrementLeft(item._id);
  };
  const onSwipeRight = async (item) => {
    setShowButton(true);
    item.defaultNbrPersonne = item.nbrPersonne;
    item.isChecked = true;
    dispatch(addMatch(item));
    console.log("hahaaaaawaawa", item._id);
    await incrementRight(item._id);
    console.log("daz INCREMENT");
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar translucent backgroundColor={COLORS.primary} />

      <Header
        bottomSheetRef={bottomSheetRef}
        pressedFilter={pressedFilter}
        setPressedFilter={setPressedFilter}
        temps={temps}
        activeFilters={activeFilters}
        count={count}
      />

      <>
        <View
          style={{
            height: height * 0.85,
            width: "100%",
            backgroundColor: "white",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <View style={{ position: "absolute", height: 100, zIndex: 100 }}>
            <Button
              title="CLIIIICK HERE TO SUBSCRIBE"
              onPress={() => navigation.navigate("AbonnementScreen")}
            />
          </View>
          <View
            style={{
              height: "90%",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingTop: 20,
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : recipes ? (
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
            ) : (
              <Text>Nothing to show</Text>
            )}
          </View>
        </View>
        {showButton && (
          <Animated.View
            entering={FadeInDown}
            style={{
              ...styles.button,
              height: height * 0.1,
              position: "absolute",
              bottom: "3%",
            }}
          >
            <Pressable
              onPress={() => {
                Alert.alert(
                  "Alerte",
                  `Voulez-vous conserver les ${matches.length} recettes que vous venez de swiper?`,
                  [
                    {
                      text: "Supprimer",
                      onPress: () => {
                        setShowButton(false);
                        dispatch(resetMatches());
                      },
                      style: "cancel",
                    },
                    {
                      text: "Conserver",
                      onPress: () => setShowButton(false),
                    },
                  ]
                );
              }}
              style={{
                position: "absolute",
                top: -5,
                right: 0,
                padding: 5,
                zIndex: 1,
              }}
            >
              <AntDesign
                name="closecircle"
                size={24}
                color={COLORS.red}
                style={{
                  backgroundColor: "white",
                  overflow: "hidden",
                  borderRadius: 20,
                }}
              />
            </Pressable>
            <CustomButton
              onPress={() => {
                navigation.navigate("PanierScreen");
              }}
              title={`Générer ma liste de course (${matches.length})`}
              style={{ width: "90%", height: "90%" }}
              textStyle={{ fontSize: 20, textAlign: "center" }}
            />
          </Animated.View>
        )}
        <FilterScreen
          ref={bottomSheetRef}
          pressedFilter={pressedFilter}
          setTemps={setTemps}
          setCount={setCount}
        />
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: COLORS.primary,
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
  button: {
    height: "15%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
  categorieTitle: {
    flex: 1 / 4,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default TinderScreen;

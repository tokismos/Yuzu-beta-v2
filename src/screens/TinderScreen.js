// La page d'acceuil'c'Est la où la plus part de l'application arrive,Lors du chargement on recupere toute les recettes,
// Quand l'utilisateur swipe le bouton apparait et on cache le bottom tab nav,et apres quand il le supprime il reaparait.

import { AntDesign } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "react-native-paper";

import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
//  import {REACT_APP_FIREBASE_API_KEY} from "react-native-dotenv"
import AsyncStorage from "@react-native-community/async-storage";

import { getAllRecipes, incrementLeft, incrementRight } from "../axios";
import { getFavoris } from "../helpers/db";

import { setFavorites } from "../redux/slicer/favoritesSlicer";
import { addMatch, resetMatches } from "../redux/slicer/MatchSlicer";
import { storeRecipes } from "../redux/slicer/recipeSlicer";

import FilterIcon from "../assets/filter.svg";
import ProfileIcon from "../assets/profile.svg";
import AnimatedStack from "../components/AnimatedStack";
import CustomButton from "../components/CustomButton";
import TinderCard from "../components/TinderCard";
import FilterScreen from "./FilterScreen";

import { COLORS } from "../consts/colors";
import { useAdditionalUserInfo } from "../hooks/useAdditionalUserInfo";

const { height } = Dimensions.get("screen");

const Header = ({ bottomSheetRef, navigation, totalFilters }) => {
  const logo = Image.resolveAssetSource(require("../assets/yuzu.png")).uri;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          height: height * 0.06,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FastImage
          style={{
            marginLeft: 20,
            width: 100,
            height: 50,
          }}
          source={{ uri: logo, priority: FastImage.priority.high }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View
        style={{
          height: height * 0.06,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          onPress={() => {
            bottomSheetRef.current.open();
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "200%",
            marginRight: 24,
          }}
        >
          <View>
            {totalFilters != 0 ? (
              <Badge
                size={20}
                style={{
                  position: "absolute",
                  left: -10,
                  top: -5,
                  zIndex: 99,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {totalFilters}
                </Text>
              </Badge>
            ) : null}

            <FilterIcon height={24} width={24} fill="white" />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            if (auth().currentUser) {
              navigation.navigate("ProfileScreen");
            } else {
              navigation.navigate("IntroScreen", { headerShown: false });
            }
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "200%",
            marginRight: 24,
          }}
        >
          <ProfileIcon height={24} width={24} fill="white" />
        </Pressable>
      </View>
    </View>
  );
};

const TinderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useAdditionalUserInfo();

  const [pressedFilter, setPressedFilter] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [temps, setTemps] = useState(0);
  const [totalFilters, setTotalFilters] = useState(0);

  const { matches } = useSelector((state) => state.matchStore);
  const { activeFilters } = useSelector((state) => state.recipeStore);
  const bottomSheetRef = useRef();
  const [count, setCount] = useState();

  useEffect(() => {
    if (!activeFilters.length) return setTotalFilters(0);
    const arr = [];
    activeFilters?.forEach((item) => {
      arr.push(Object.getOwnPropertyNames(item)[0]);
      setTotalFilters(new Set(arr).size);
    });
  }, [activeFilters]);
  useEffect(() => {
    // affiche ou non l'onboarding
    (async () => {
      !(await AsyncStorage.getItem("hasSeenOnBoarding")) &&
        navigation.navigate("OnBoardingScreen");
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "flex" },
    });
  }, [showButton]);

  const loadData = async (item) => {
    getAllRecipes(item)
      .then((result) => {
        const toPreload = [];
        const filteredRecipes = result?.filter(
          (recipe) => recipe.imgURL && recipe.thumbURL && recipe.nbrPersonne
        );

        dispatch(storeRecipes(filteredRecipes));
        setRecipes(filteredRecipes);
        filteredRecipes?.map((recipe) => {
          if (recipe.imgURL) toPreload.push({ uri: recipe.imgURL });
          if (recipe.thumbURL) toPreload.push({ uri: recipe.thumbURL });
        });
        FastImage.preload(toPreload);
      })
      .catch(console.error);
  };

  const getAndSetFavorites = async () => {
    await getFavoris((fav) => dispatch(setFavorites(fav)));
  };

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
    await incrementLeft(item._id);
  };

  const onSwipeRight = async (item) => {
    setShowButton(true);
    item.defaultNbrPersonne = item.nbrPersonne;
    item.isChecked = true;
    dispatch(addMatch(item));
    await incrementRight(item._id);
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar translucent backgroundColor="transparent" />

      <Header
        bottomSheetRef={bottomSheetRef}
        pressedFilter={pressedFilter}
        setPressedFilter={setPressedFilter}
        temps={temps}
        activeFilters={activeFilters}
        navigation={navigation}
        count={count}
        recipes={recipes}
        totalFilters={totalFilters}
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
          <View style={{ position: "absolute", height: 100, zIndex: 100 }} />
          <View
            style={{
              height: "90%",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingTop: 20,
            }}
          >
            {recipes ? (
              <>
                <AnimatedStack
                  data={recipes}
                  renderItem={({
                    item,
                    onSwipeRight,
                    onSwipeLeft,
                    setIsLoading,
                  }) => (
                    <TinderCard
                      height="100%"
                      width="100%"
                      recipe={item}
                      setIsLoading={setIsLoading}
                      onSwipeRight={onSwipeRight}
                      onSwipeLeft={onSwipeLeft}
                    />
                  )}
                  onSwipeLeft={onSwipeLeft}
                  onSwipeRight={onSwipeRight}
                />
              </>
            ) : (
              <Text>{t("tinderScreen_nothingToShow")}</Text>
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
                  t("tinderScreen_preserveAlert_title"),
                  t("tinderScreen_preserveAlert_description", {
                    matches: matches.length,
                  }),
                  [
                    {
                      text: t("tinderScreen_preserveAlert_delete"),
                      onPress: () => {
                        setShowButton(false);
                        dispatch(resetMatches());
                      },
                      style: "cancel",
                    },
                    {
                      text: t("tinderScreen_preserveAlert_confirm"),
                      onPress: () => setShowButton(true),
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
              title={t("tinderScreen_generateList_button", {
                matches: matches?.length || 0,
              })}
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
  imageIcon: {
    height: 30,
    width: 30,
  },
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

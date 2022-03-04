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

const TinderScreen = ({ navigation }) => {
  const Header = () => {
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
          <Text style={styles.categorieTitle}>Types de plats {"\n"} (2)</Text>
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

          <Text style={styles.categorieTitle}>Temps </Text>
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

          <Text style={styles.categorieTitle}>Régimes </Text>
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
          <Text style={styles.categorieTitle}>Materiel </Text>
        </Pressable>
      </View>
    );
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);

  const [recipes, setRecipes] = useState([]);
  const [pressedFilter, setPressedFilter] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const sheetRef = React.useRef(null);

  const { matches } = useSelector((state) => state.matchStore);

  const bottomSheetRef = useRef();

  // variables
  const snapPoints = useMemo(() => ["25%", "85%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: showButton ? "none" : "flex" },
    });
  }, [showButton]);
  const loadData = async (item) => {
    getAllRecipes(item)
      .then((result) => {
        setRecipes(result);
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
        if (!e.phoneNumber) {
          return navigation.navigate("PhoneScreen");
        }
        dispatch(setUser({ ...user, phoneNumber: e.phoneNumber }));
      });
    } else {
    }
  }, []);
  useEffect(() => {
    getAndSetFavorites();
    loadData();
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

      <Header />

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
          <View
            style={{
              height: "90%",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingTop: 20,
            }}
          >
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
        <FilterScreen ref={bottomSheetRef} pressedFilter={pressedFilter} />

        {/* <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleStyle={{
            backgroundColor: COLORS.secondary,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <View style={{ flex: 1, backgroundColor: "#c3c3c3" }}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet> */}
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

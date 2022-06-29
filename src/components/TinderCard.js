// Notre component qui affiche les tinder Swipe c'est  ici qu'on regle le design est tous ses composants

import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../consts/colors";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";

const ImageFast = ({ uri, thumb, setIsLoading }) => {
  // console.log('imageFast', setIsLoading);
  // useEffect(() => {
  //   setTimeout(() => setIsLoading(false), 10000)
  // }, []);
  return (
    <>
      <FastImage
        style={styles.image}
        source={{ uri: thumb, priority: FastImage.priority.high }}
        resizeMode={FastImage.resizeMode.cover}
        onLoadStart={(e) => console.log('thumbStarted', e)}
        onError={(err) => {
          console.log('error on thumb', err)
          setIsLoading(false)
        }}
        onLoadEnd={() => {
          console.log('on load thumb end')
          setIsLoading(false)
        }}
        fallback
      />

      <FastImage
        style={styles.image}
        source={{ uri, priority: FastImage.priority.high }}
        fallback
        onLoadStart={(e) => console.log('imgStarted', e)}
        onError={(err) => {
          console.log('on imgURL error', err)
          setIsLoading(false)
        }}
        onLoadEnd={() => {
          console.log('on load imgURL ended')
          setIsLoading(false)
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </>
  )
};

const HeadComponent = ({ name, like }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.headComponent}>
      <View style={styles.leftHeaderComponent}>
        <Avatar.Image
          size={40}
          source={require("../assets/avatar.png")}
          theme={{ colors: { backgroundColor: COLORS.primary } }}
        />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={2} style={styles.titleName}>
            {name}
          </Text>
          <Text style={{ color: "gray", marginLeft: 5, fontSize: 12 }}>
            {t('tinderScreen_createdByYuzu')}
          </Text>
        </View>
      </View>
      <View style={styles.rightHeaderComponent}>
        <View style={{ alignItems: "center" }}>
          <FontAwesome name="heart" size={25} color={COLORS.primary} />
          <Text style={styles.nbrHeader}>{like}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <FontAwesome name="star" size={25} color={COLORS.primary} />
          <Text style={styles.nbrHeader}>{t('tinderScreen_new')}</Text>
        </View>
      </View>
    </View>
  );
};

const TinderCard = ({ recipe, onSwipeRight, onSwipeLeft, setIsLoading }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  console.log({ setIsLoading })
  return (
    <>
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <HeadComponent name={recipe.name} like={recipe.stats?.nbrRight} />

        <ImageFast uri={recipe?.imgURL} thumb={recipe?.thumbURL} setIsLoading={setIsLoading} />
        <View style={styles.bottomContainer}>
          <View style={styles.descriptionContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "white" }}>
                {t('tinderScreen_preparationDuration')}
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {t('tinderScreen_minutes', { duration: recipe.tempsPreparation })}
                </Text>
              </Text>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {recipe.difficulty}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "white" }}>
                {t('tinderScreen_totalDuration')}
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {t('tinderScreen_minutes', { duration: recipe.tempsPreparation + recipe.tempsCuisson })}
                </Text>
              </Text>
              <Text style={{ color: "white" }}>
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {recipe.ingredients.length}{" "}
                </Text>{" "}
                ingrédients
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onSwipeLeft} style={styles.leftButton}>
              <FontAwesome name="close" size={30} color={COLORS.red} />
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
              <MaterialIcons
                name="keyboard-arrow-down"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSwipeRight}
              style={[styles.leftButton, { borderColor: COLORS.primary }]}
            >
              <FontAwesome name="heart" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default TinderCard;

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'lightgrey',
    aspectRatio: 1,
    opacity: 1,
    position: 'absolute',
    top: 60,
    left: 0,
    height: '50%',
    width: "100%"

  },
  hideImage: {
    opacity: 0,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: "50%",
    alignSelf: "center",
    marginTop: 5,
  },
  leftButton: {
    height: 60,
    width: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.red,
  },

  headComponent: {
    backgroundColor: "black",
    height: "11%",
    flexDirection: "row",
    alignItems: "center",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: -3,
  },
  leftHeaderComponent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "80%",
  },
  titleName: {
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
    width: "100%",
    fontSize: 15,
  },
  nbrHeader: { color: "white", fontWeight: "bold", fontSize: 12 },
  rightHeaderComponent: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-around",
  },
  descriptionContainer: {
    backgroundColor: COLORS.darkGray,
    height: "40%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  bottomContainer: {
    backgroundColor: "black",
    top: 288,
    height: "22%",
    justifyContent: "center",
    marginTop: -3,
  },
});

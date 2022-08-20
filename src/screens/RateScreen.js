//L'ecran qui gere le rating de chaque recette

import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

import React, { useState } from "react";
import { AirbnbRating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { setRating } from "../helpers/db";
import { getRecipeByName } from "../axios";
import CustomButton from "../components/CustomButton";

const { width, height } = Dimensions.get("screen");

const RateScreen = ({ route, navigation }) => {
  const [rate, setRate] = useState(0);
  const { imgURL, name } = route?.params;
  const { t } = useTranslation();

  const handleRate = (rate) => {
    setRate(rate);
  };

  const handleSubmit = async () => {
    const recipe = await getRecipeByName(name);
    const { _id: id } = recipe;

    if (rate === 0) return;
    const rated = await setRating(rate, id);

    if (rated) navigation.goBack();
    else alers.message("Has not rated, error");
  };

  return (
    <View
      style={{
        height,
        backgroundColor: "#e6e5e5",
        width,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 99,
          backgroundColor: "white",
          borderRadius: 30,
        }}
      >
        <AntDesign name="arrowleft" size={40} color="black" />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#e6e5e5",
          width: "90%",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "space-between",
          height: "65%",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            height: "20%",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Image
            source={{ uri: imgURL }}
            style={{
              width: "25%",
              height: "100%",
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              width: "70%",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {name}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            height: "75%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 40,
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>
            {t("rateScreen_title")}
          </Text>

          <AirbnbRating
            count="5"
            reviews={["rate1", "rate2", "rate3", "rate4", "rate5", "rate6"].map(
              (review) => t(`rateScreen_${review}`)
            )}
            size={40}
            defaultRating={0}
            starContainerStyle={{ marginTop: 10 }}
            onFinishRating={handleRate}
          />
          <CustomButton title="Valider" onPress={handleSubmit} />
          <Text style={{ textAlign: "center" }}>
            {t("rateScreen_disclaimer")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RateScreen;

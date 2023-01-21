// L'ecran qui gere le rating de chaque recette

import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AirbnbRating } from "react-native-ratings";

import { getRecipeByName } from "../axios";
import CustomButton from "../components/CustomButton";
import { setRating } from "../helpers/db";

const { width, height } = Dimensions.get("screen");

const RateScreen = ({ route, navigation }) => {
  const [rate, setRate] = useState(0);
  const routeParams = route?.params;
  const { t } = useTranslation();

  const handleRate = (rate) => {
    setRate(rate);
  };

  const handleSubmit = async () => {
    const recipe = await getRecipeByName(routeParams.name);
    const { _id: id } = recipe;

    if (rate === 0) return;
    const rated = await setRating(rate, id);

    if (rated) navigation.goBack();
    else alert("Has not rated, error");
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
            source={{ uri: routeParams.imgURL }}
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
            {routeParams.name}
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rating && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="star" size={40} color={COLORS.primary} />
                <Text
                  style={{
                    fontSize: 40,
                    marginLeft: 10,
                    fontWeight: "bold",
                  }}
                >
                  {rating}
                </Text>
              </View>
            )}
          </View>

          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {t("slide_to_rate")}
          </Text>
          <Rating
            style={{ marginTop: 10 }}
            type="star"
            ratingCount={5}
            imageSize={40}
            minValue={0.5}
            fractions={1}
            jumpValue={0.5}
            startingValue={rating}
            onFinishRating={(v) => {
              setRate(v);
            }}
          />
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 20,
                marginVertical: 20,
              }}
            >
              {t("what_you_think")}
            </Text>

            <TextInput
              style={{ height: 100, marginBottom: 10 }}
              placeholder={t("add_com")}
              theme={{ colors: { primary: COLORS.primary } }}
              multiline
              mode="outlined"
              numberOfLines={5}
              value={commentaire}
              onChangeText={setCommentaire}
              contentStyle={{ padding: 0 }}
              returnKeyType="done"
            />
          </View>
        </View>
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
};

export default RateScreen;

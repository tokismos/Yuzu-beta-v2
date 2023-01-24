// L'ecran qui gere le rating de chaque recette

import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
} from "react-native";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Rating } from "react-native-ratings";
import { TextInput } from "react-native-paper";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { setRating } from "../axios";
import CustomButton from "../components/CustomButton";
import { getRatingFirebase, setRatingFirebase } from "../helpers/db";
import { COLORS } from "../consts/colors";
import Toast from "react-native-simple-toast";
import RatingModal from "../components/RatingModal";

const { width, height } = Dimensions.get("screen");

const RateScreen = ({ route, navigation }) => {
  const [rating, setRate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { _id, imgURL, name } = route.params;
  const disabled = !rating;
  const ref = useRef();
  const { t } = useTranslation();
  const handleSubmit = async () => {
    try {
      setRating({ _id, rating });
      setRatingFirebase({
        rating,
        recipeId: route?.params._id,
      });
      navigation.goBack();
      Toast.show(t("Merci pour votre contribution !"), Toast.LONG);
    } catch (e) {
      Toast.show(t("Erreur !"), Toast.LONG);
      console.log("Can't set rating", e);
    }
  };

  useEffect(async () => {
    const res = await getRatingFirebase(_id);
    setRate(res);
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <RatingModal
        recipeId={_id}
        isOpen={isOpen}
        refe={ref}
        setIsOpen={setIsOpen}
        rating={rating}
      />

      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          marginTop: 40,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "white",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="close" size={40} color="black" />
          </TouchableOpacity>
          <CustomButton
            title="Terminer"
            onPress={handleSubmit}
            textStyle={{ fontSize: 22 }}
            disabled={disabled}
          />
        </View>

        <View
          style={{
            width: "90%",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "space-between",
            flexShrink: 1,
          }}
        >
          <View
            style={{
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 30,
            }}
          >
            <View
              style={{
                width: width * 0.6,
                height: height * 0.3,
              }}
            >
              {isImageLoading && (
                <SkeletonPlaceholder>
                  <View style={{ width: "100%", height: "100%" }} />
                </SkeletonPlaceholder>
              )}
              <Image
                source={{ uri: imgURL }}
                resizeMode="contain"
                onLoad={() => setIsImageLoading(false)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                width: "110%",
                fontSize: 26,
                marginTop: 20,
              }}
              numberOfLines={2}
            >
              {name}
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
                marginBottom: 10,
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
                  <FontAwesome
                    name="star"
                    size={40}
                    color={COLORS.lightYellow}
                  />
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
            <Text
              style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}
            >
              {t("slide_to_rate")}
            </Text>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={50}
              containerStyle={{ width: "100%" }}
              minValue={0.5}
              fractions={1}
              jumpValue={0.5}
              startingValue={rating}
              ratingColor={COLORS.lightYellow}
              onFinishRating={(v) => {
                setRate(v);
              }}
            />

            {rating && (
              <View style={{ width: "100%", marginBottom: 20, flexGrow: 1 }}>
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
                <Pressable onPress={() => setIsOpen(true)}>
                  <View pointerEvents="none">
                    <TextInput
                      placeholder={t("add_com")}
                      theme={{ colors: { primary: COLORS.lightYellow } }}
                      multiline
                      onFocus={() => console.log("cliicked")}
                      mode="outlined"
                      contentStyle={{ padding: 0 }}
                      returnKeyType="done"
                    />
                  </View>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RateScreen;

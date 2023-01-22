// L'ecran qui gere le rating de chaque recette

import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Rating } from "react-native-ratings";
import { TextInput } from "react-native-paper";

import { setRating } from "../axios";
import CustomButton from "../components/CustomButton";
import { getRatingFirebase, setRatingFirebase } from "../helpers/db";
import { COLORS } from "../consts/colors";
import Toast from "react-native-simple-toast";
import Modal from "react-native-modalbox";
import Animated, {
  AnimatedLayout,
  SlideInRight,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const RateScreen = ({ route, navigation }) => {
  const [rating, setRate] = useState(null);
  const [commentaire, setCommentaire] = useState(null);
  const { _id, imgURL, name } = route.params;
  const disabled = !rating;
  const { t } = useTranslation();
  const handleSubmit = async () => {
    try {
      setRating({ _id, rating });
      setRatingFirebase({
        rating,
        commentaire,
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
    <KeyboardAvoidingView
      behavior="position"
      style={{ flex: 1, backgroundColor: "white" }}
    >
      {/* <Modal
        swipeThreshold={1}
        // style={styles.modalContainer}
        position="bottom"
        backdrop={true}
        // ref={ref}
        isOpen={true}
        backdropOpacity={0.5}
      ></Modal> */}
      <View
        style={{
          height,
          backgroundColor: "white",
          width: "100%",
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
            paddingVertical: 20,
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
            <Image
              source={{ uri: imgURL }}
              style={{
                width: "70%",
                aspectRatio: 1,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                width: "100%",
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 20,
              }}
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
                marginBottom: 20,
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

              <TextInput
                placeholder={t("add_com")}
                theme={{ colors: { primary: COLORS.primary } }}
                multiline
                mode="outlined"
                value={commentaire}
                onChangeText={setCommentaire}
                contentStyle={{ padding: 0 }}
                returnKeyType="done"
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RateScreen;

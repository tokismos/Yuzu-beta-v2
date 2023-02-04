import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Modal from "react-native-modalbox";
import { TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { COLORS } from "../consts/colors";
import CustomButton from "./CustomButton";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { setRating } from "../axios";
import { setRatingFirebase } from "../helpers/db";

import Toast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";

const RatingModal = ({ isOpen, setIsOpen, refe, rating, recipeId }) => {
  const { width, height } = Dimensions.get("screen");
  const [commentaire, setCommentaire] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      setRating({ _id: recipeId, rating });
      setRatingFirebase({
        rating,
        commentaire,
        recipeId,
      });
      navigation.goBack();
      Toast.show(t("Merci pour votre contribution !"), Toast.LONG);
    } catch (e) {
      Toast.show(t("Erreur !"), Toast.LONG);
      console.log("Can't set rating", e);
    }
  };

  return (
    <Modal
      swipeThreshold={1}
      style={{
        width: "100%",
        height,
        // height: Platform.OS === "ios" ? height * 0.8 : height * 0.8,
        padding: 20,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      }}
      onClosed={() => setIsOpen(false)}
      position="bottom"
      backdrop={true}
      ref={refe}
      isOpen={isOpen}
      backdropOpacity={1}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => refe.current.close()}
          style={{
            backgroundColor: "white",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="close" size={40} color="black" />
        </TouchableOpacity>
        {commentaire != "" && (
          <CustomButton
            title="Terminer"
            onPress={handleSubmit}
            textStyle={{ fontSize: 22 }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <FontAwesome name="star" size={40} color={COLORS.lightYellow} />
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

      <TextInput
        style={{
          height: height * 0.2,
          width: width * 0.8,
          alignSelf: "center",
        }}
        placeholder={t("did_you_like_recipe")}
        theme={{ colors: { primary: COLORS.lightYellow } }}
        multiline
        mode="outlined"
        value={commentaire}
        onChangeText={setCommentaire}
        // contentStyle={{ padding: 0 }}
        returnKeyType="done"
      />
    </Modal>
  );
};

export default RatingModal;

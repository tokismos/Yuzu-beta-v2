//L'ecran qui gere le rating de chaque recette

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../consts/colors";
import { Rating, AirbnbRating } from "react-native-ratings";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

const RateScreen = ({ route, navigation }) => {
  const { imgURL, id, name } = route?.params;

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
              fontWeight: "bold",
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
            C'etait comment ?
          </Text>

          <AirbnbRating
            count="5"
            reviews={[
              "1- Dégeu 🤮",
              "2- Bof 😣",
              "3- Moyen 😐",
              "4- Bon 😌",
              "5- Très bon 😋",
              "6- Vraiment délicieux 🥰",
            ]}
            size={40}
            defaultRating={0}
            starContainerStyle={{ marginTop: 10 }}
          />
          <CustomButton title="Valider" />
          <Text style={{ textAlign: "center" }}>
            Les notes sont anonymes et nous permettre d'améliorer tes futures
            suggestions
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RateScreen;

const styles = StyleSheet.create({});

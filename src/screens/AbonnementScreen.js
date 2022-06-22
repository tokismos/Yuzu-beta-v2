import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { useTranslation} from "react-i18next";

import CustomButton from "../components/CustomButton";
import { useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import AvantPremiereSVG from "../assets/avantPremiere.svg";
import PeopleSVG from "../assets/people.svg";
import ManOnPlanet from "../assets/manOnPlanet.svg";
const { width } = Dimensions.get("screen");

const ItemList = ({ title, description, children }) => {
  return (
    <View
      style={{
        width: "90%",
        flexDirection: "row",
        padding: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: "20%",
          alignItems: "center",
        }}
      >
        {children}
      </View>
      <View style={{ width: "80%" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 5 }}>
          {title}
        </Text>
        <Text style={{ marginHorizontal: 5 }}>{description}</Text>
      </View>
    </View>
  );
};
const GREEN = "#3d741c";

const AbonnementScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`https://backend-yuzi.herokuapp.com/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: "center", backgroundColor: "white" }}
    >
      <View style={{ width: "100%", alignItems: "center", marginTop: 40 }}>
        <Image
          style={{ height: 300, width: 300 }}
          source={require("../assets/salad.png")}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              color: "#3d741c",
              fontWeight: "bold",
              marginBottom: 30,
              width: width * 0.9,
            }}
          >
            {t('abonnementScreen_participateDescription')}
          </Text>
          <ItemList
            title={t('abonnementScreen_1_title')}
            description={t('abonnementScreen_1_description')}
          >
            <Entypo name="infinity" size={50} color="black" />
          </ItemList>
          <ItemList
            title={t('abonnementScreen_2_title')}
            description={t('abonnementScreen_2_description')}
          >
            <AvantPremiereSVG height="50" width="50" fill="black" />
          </ItemList>
          <ItemList
            title={t('abonnementScreen_3_title')}
            description={t('abonnementScreen_3_description')}
          >
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../assets/NoAds.jpg")}
            />
          </ItemList>
          <ItemList
            title={t('abonnementScreen_4_title')}
            description={t('abonnementScreen_4_description')}
          >
            <PeopleSVG height="50" width="50" fill="black" />
          </ItemList>
        </View>

        <View style={{}}>
          <View
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ManOnPlanet height="150" width="150" fill="black" />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 26,
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            {t('abonnementScreen_support')}
          </Text>
          <Text style={{ textAlign: "center", width: width * 0.9 }}>
            {t('abonnementScreen_support_description')}
          </Text>
        </View>
      </View>

      <CustomButton
        title={t('abonnementScreen_buttom')}
        onPress={() => navigation.navigate("AbonnementSecondScreen")}
        style={{
          width: width * 0.7,
          backgroundColor: GREEN,
          borderRadius: 5,
          marginVertical: 20,
        }}
        textStyle={{ fontSize: 20 }}
      />
      <Pressable onPress={() => navigation.pop()}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 70 }}>
          Non,merci
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default AbonnementScreen;

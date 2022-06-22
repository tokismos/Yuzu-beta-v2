import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { createRef, useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../consts/colors";
const { width, height } = Dimensions.get("screen");
import PagerView from "react-native-pager-view";
import { AntDesign } from "@expo/vector-icons";
import { useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/core";

const Row = ({ title, first, last }) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.titleRow}>
        <Text>{title}</Text>
      </View>
      <View
        style={{
          ...styles.leftRow,
          borderBottomLeftRadius: last ? 15 : 0,
          borderBottomRightRadius: last ? 15 : 0,
        }}
      >
        {first && <FontAwesome name="check" size={35} color="#3d741c" />}
      </View>
      <View style={styles.rightRow}>
        <FontAwesome name="check" size={35} color="#3d741c" />
      </View>
    </View>
  );
};
const AvantagesScreen = ({ refe }) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.avantagesContainer}>
        <Text style={styles.titleAvantage}>
          Libère encore plus de temps en devenant un super yuzer
        </Text>
        <View style={{ width: width * 0.9 }}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={{ width: "50%" }}></View>
            <Text style={styles.titleColumn}>Yuzer Gratuit</Text>
            <View style={styles.coloredBackgroundColor}>
              <Text style={{ ...styles.titleColumn, width: "100%" }}>
                Super Yuzer
              </Text>
            </View>
          </View>
          <Row title="Recettes et listes" first />
          <Row title="Accès illimité" />
          <Row title="Avant-premières" />
          <Row title="Pas de publicités" />
          <Row title="Rejoins notre communauté" />
          <Row title="Soutenir notre mission" last />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton
          title="2 semaines offertes !"
          onPress={() => refe.current.setPage(1)}
          style={styles.button}
          textStyle={{ fontSize: 20 }}
        />
        <Pressable onPress={() => navigation.pop(2)}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 70 }}>
            Non,merci
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const AbonnementList = ({
  title,
  secondLine,
  thirdLine,
  onPress,
  selected,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.listContainer,
        borderWidth: selected == title ? 5 : 0,
      }}
    >
      {selected == title && (
        <View style={styles.checkView}>
          <AntDesign name="checkcircle" size={24} color={COLORS.green} />
        </View>
      )}
      <Text style={{ fontWeight: "bold", color: COLORS.green, fontSize: 24 }}>
        {title}
      </Text>
      <Text style={{ color: COLORS.green }}>{secondLine}</Text>
      <Text style={styles.textLine}>{thirdLine}</Text>
    </Pressable>
  );
};

const OffreAbonnement = ({ onPress }) => {
  const [selected, setSelected] = useState();
  const navigation = useNavigation();
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.firstContainer}>
        <Text style={styles.titleText}>Offre de lancement</Text>
        <View style={styles.listView}>
          <AbonnementList
            title="Mensuel"
            secondLine="CHF 3 par mois"
            thirdLine="au lieu de 4.90 par mois"
            selected={selected}
            onPress={() => setSelected("Mensuel")}
          />
          <AbonnementList
            title="6 Mois"
            secondLine="CHF 15 soit 2,50 par mois"
            thirdLine="au lieu de CHF 29.40"
            selected={selected}
            onPress={() => setSelected("6 Mois")}
          />
        </View>
      </View>

      <View style={styles.bottomView}>
        <Text>Tu peux annuler ton abonnement à tout moment !</Text>

        <CustomButton
          title="Commencer mon essai gratuit !"
          onPress={onPress}
          style={styles.button}
          textStyle={{ fontSize: 18, textAlign: "center" }}
        />
        <Pressable onPress={() => navigation.pop(2)}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Non,merci</Text>
        </Pressable>
      </View>
    </View>
  );
};
const AbonnementSecondScreen = () => {
  const ref = createRef();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

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
      //   setLoading(true);
    }
  };
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <PagerView
        scrollEnabled={false}
        style={{ height: "100%" }}
        initialPage={0}
        ref={ref}
        // onPageScroll={(ev) => setIndex(ev.nativeEvent.position)}
      >
        <View key="1">
          <AvantagesScreen refe={ref} />
        </View>
        <View key="2" style={{ flex: 1 }}>
          <OffreAbonnement onPress={openPaymentSheet} />
        </View>
      </PagerView>
    </View>
  );
};

export default AbonnementSecondScreen;

const styles = StyleSheet.create({
  listContainer: {
    width: "90%",
    backgroundColor: COLORS.lightGreen,
    padding: 20,
    borderRadius: 15,

    borderColor: COLORS.green,
    marginVertical: 10,
  },
  checkView: {
    position: "absolute",
    right: -10,
    top: -10,
    backgroundColor: "white",
    borderRadius: 20,
  },
  textLine: {
    color: COLORS.green,
    textDecorationLine: "line-through",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    backgroundColor: COLORS.green,
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
  },
  titleRow: {
    width: "50%",
    justifyContent: "center",
  },
  leftRow: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  rightRow: {
    width: "25%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f4e1",
    paddingVertical: 10,
  },
  avantagesContainer: {
    height: "80%",
    width: width * 0.9,
    marginVertical: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  titleAvantage: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 40,
  },
  titleColumn: {
    width: "25%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: COLORS.green,
  },
  coloredBackgroundColor: {
    width: "25%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: COLORS.lightGreen,
  },
  bottomContainer: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: width * 0.7,
    backgroundColor: COLORS.green,
    borderRadius: 5,
    marginVertical: 20,
  },
  firstContainer: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60%",
  },
  listView: {
    width: "100%",
    alignItems: "center",
  },
  bottomView: {
    height: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

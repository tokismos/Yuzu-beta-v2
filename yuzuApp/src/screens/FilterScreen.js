//C'est un modale qui affiche tous les differents components des filtres, et cela il s'active
// apres clique sur chaqun des filtres

import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import { COLORS } from "../consts/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Oven from "../assets/oven.svg";
import Time from "../assets/time.svg";
import Livre from "../assets/livre.svg";
import Slider from "@react-native-community/slider";
import { ScrollView } from "react-native";
import Modal from "react-native-modalbox";

const { width, height } = Dimensions.get("screen");

const typesPlatArray = [
  "Entrée",
  "Plat",
  "Sauce",
  "Dessert",
  "Petit dejeuner",
  "Sucré",
  "Salé",
];
const regimesArray = ["Viande", "Vegan", "Poisson", "Végétarien"];
const materielsArray = [
  "Four",
  "Four à micro-ondes",
  "Mixeur",
  "Robot Cuiseur",
  "Poisson",
  "Batteur ou fouet",
];

const TypePlatsComponent = () => {
  const [plats, setPlats] = useState([]);

  return (
    <View
      style={{
        backgroundColor: "white",
        width: "90%",
        borderRadius: 10,
        alignItems: "center",
        paddingBottom: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          margin: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Types plats </Text>
        <Livre height={40} width={40} fill="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {typesPlatArray.map((item, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                if (plats.includes(item)) {
                  const filteredArray = plats.filter((elmt) => elmt != item);
                  return setPlats(filteredArray);
                }

                setPlats((p) => [...p, item]);
              }}
              style={{
                backgroundColor: plats.includes(item)
                  ? COLORS.primary
                  : "white",
                borderWidth: 3,
                borderColor: COLORS.primary,
                borderRadius: 5,
                width: "45%",
                marginHorizontal: 5,
                marginVertical: 2,
                padding: 5,
              }}
            >
              <Text
                style={{
                  color: plats.includes(item) ? "white" : COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const RegimeComponent = () => {
  const [regimes, setRegimes] = useState([]);

  return (
    <View
      style={{
        backgroundColor: "white",
        width: "90%",
        borderRadius: 10,
        alignItems: "center",
        paddingBottom: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          margin: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Régime particulier{" "}
        </Text>
        <MaterialCommunityIcons name="fish-off" size={40} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {regimesArray.map((item, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                if (regimes.includes(item)) {
                  const filteredArray = regimes.filter((elmt) => elmt != item);
                  return setRegimes(filteredArray);
                }

                setRegimes((p) => [...p, item]);
              }}
              style={{
                backgroundColor: regimes.includes(item)
                  ? COLORS.primary
                  : "white",
                borderWidth: 3,
                borderColor: COLORS.primary,
                borderRadius: 5,
                width: "45%",
                marginHorizontal: 5,
                marginVertical: 2,
                padding: 5,
              }}
            >
              <Text
                style={{
                  color: regimes.includes(item) ? "white" : COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const MaterielsComponent = () => {
  const [materiels, setMateriels] = useState([]);

  return (
    <View
      style={{
        backgroundColor: "white",
        width: "90%",
        borderRadius: 10,
        alignItems: "center",
        paddingBottom: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          margin: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Materiels</Text>
        <Oven height={40} width={40} fill="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {materielsArray.map((item, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                if (materiels.includes(item)) {
                  const filteredArray = materiels.filter(
                    (elmt) => elmt != item
                  );
                  return setMateriels(filteredArray);
                }

                setMateriels((p) => [...p, item]);
              }}
              style={{
                backgroundColor: materiels.includes(item)
                  ? COLORS.primary
                  : "white",
                borderWidth: 3,
                borderColor: COLORS.primary,
                borderRadius: 5,
                width: "45%",
                marginHorizontal: 5,
                marginVertical: 2,
                padding: 5,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: materiels.includes(item) ? "white" : COLORS.primary,
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const TempsComponent = () => {
  const [temps, setTemps] = useState(0);
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "90%",
        borderRadius: 10,
        alignItems: "center",
        paddingBottom: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Temps max </Text>
        {temps !== 0 && (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              color: COLORS.primary,
            }}
          >
            {parseInt(temps)} min
          </Text>
        )}
        <Time height={40} width={40} fill="black" />
      </View>
      <Slider
        step={10}
        size={2}
        onSlidingComplete={(i) => setTemps(i)}
        thumbTintColor={COLORS.primary}
        onValueChange={(i) => setTemps(i)}
        style={{
          width: "90%",
          height: 40,
        }}
        minimumValue={0}
        maximumValue={120}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor="#000000"
        thumbStyle={{ width: 50, height: 50 }}
        thumbSize={60}
      />
    </View>
  );
};
const FilterScreen = forwardRef(({ pressedFilter }, ref) => {
  return (
    <Modal
      swipeThreshold={1}
      style={{
        width: "100%",
        height: Platform.OS === "ios" ? height * 0.74 : height * 0.78,
        justifyContent: "center",

        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      }}
      position="bottom"
      backdrop={true}
      ref={ref}
      isOpen={false}
      backdropOpacity={0}
    >
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 40,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 5,
            width: 50,
            borderRadius: 10,
          }}
        ></View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.lightGrey,
        }}
      >
        <TypePlatsComponent />
        <RegimeComponent />
        <TempsComponent />
        <MaterielsComponent />
      </ScrollView>
    </Modal>
  );
});

export default FilterScreen;

const styles = StyleSheet.create({});

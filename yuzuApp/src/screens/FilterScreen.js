//C'est un modale qui affiche tous les differents components des filtres, et cela il s'active
// apres clique sur chaqun des filtres

import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import { COLORS } from "../consts/colors";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import Oven from "../assets/oven.svg";
import Time from "../assets/time.svg";
import Livre from "../assets/livre.svg";
import Slider from "@react-native-community/slider";
import { ScrollView } from "react-native";
import Modal from "react-native-modalbox";
import {
  addFilter,
  changeTime,
  removeFilter,
  resetFilters,
} from "../redux/slicer/recipeSlicer";
import { useDispatch, useSelector } from "react-redux";

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
const difficultyArray = ["Facile", "Moyenne", "Difficile"];

const TypePlatsComponent = ({ activeFilters }) => {
  const dispatch = useDispatch();
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
        <Text style={{ fontWeight: "bold", fontSize: 24 }}> Types plats </Text>
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
                if (activeFilters.some((i) => Object.values(i) == item)) {
                  dispatch(removeFilter(item));
                } else {
                  dispatch(addFilter({ type: "typePlat", name: item }));
                }
              }}
              style={{
                backgroundColor: activeFilters.some(
                  (i) => Object.values(i) == item
                )
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
                  color: activeFilters.some((i) => Object.values(i) == item)
                    ? "white"
                    : COLORS.primary,
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
const RegimeComponent = ({ activeFilters }) => {
  const dispatch = useDispatch();

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
          const [selected, setSelected] = useState(
            activeFilters.some((i) => Object.values(i) == item)
          );

          return (
            <Pressable
              key={i}
              onPress={() => {
                if (selected) {
                  switch (item) {
                    case "Viande":
                      dispatch(removeFilter("viande"));

                      break;
                    case "Vegan":
                      dispatch(removeFilter("vegan"));

                      break;
                    case "Poisson":
                      dispatch(removeFilter("poisson"));

                      break;
                    case "Végétarien":
                      dispatch(removeFilter("vegetarien"));

                      break;
                  }
                  setSelected(false);
                } else {
                  switch (item) {
                    case "Viande":
                      dispatch(addFilter({ type: "category", name: "viande" }));
                      break;
                    case "Vegan":
                      dispatch(addFilter({ type: "category", name: "vegan" }));
                      break;
                    case "Poisson":
                      dispatch(
                        addFilter({ type: "category", name: "poisson" })
                      );
                      break;
                    case "Végétarien":
                      dispatch(
                        addFilter({ type: "category", name: "vegetarien" })
                      );
                      break;
                  }
                  setSelected(true);
                  console.log("CKLIKED");
                }
              }}
              style={{
                backgroundColor: selected ? COLORS.primary : "white",
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
                  color: selected ? "white" : COLORS.primary,
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
const MaterielsComponent = ({ activeFilters }) => {
  const dispatch = useDispatch();

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
                if (activeFilters.some((i) => Object.values(i) == item)) {
                  dispatch(removeFilter(item));
                } else {
                  dispatch(addFilter({ type: "material", name: item }));
                }
              }}
              style={{
                backgroundColor: activeFilters.some(
                  (i) => Object.values(i) == item
                )
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
                  color: activeFilters.some((i) => Object.values(i) == item)
                    ? "white"
                    : COLORS.primary,
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
const DifficultyComponent = ({ activeFilters }) => {
  const dispatch = useDispatch();

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
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Difficulté</Text>
        <Feather name="bar-chart" size={35} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {difficultyArray.map((item, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                if (activeFilters.some((i) => Object.values(i) == item)) {
                  dispatch(removeFilter(item));
                } else {
                  dispatch(addFilter({ type: "difficulty", name: item }));
                }
              }}
              style={{
                backgroundColor: activeFilters.some(
                  (i) => Object.values(i) == item
                )
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
                  color: activeFilters.some((i) => Object.values(i) == item)
                    ? "white"
                    : COLORS.primary,
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
const TempsComponent = ({ setTempsHeader }) => {
  const [temps, setTemps] = useState(0);
  const dispatch = useDispatch();
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
        value={40}
        onSlidingComplete={(i) => {
          setTemps(i);
          setTempsHeader(i);
          dispatch(changeTime(i));
        }}
        thumbTintColor={COLORS.primary}
        onValueChange={(i) => {
          setTemps(i);
        }}
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
const FilterScreen = forwardRef(
  ({ pressedFilter, setTemps, setCount }, ref) => {
    const { activeFilters } = useSelector((state) => state.recipeStore);
    const dispatch = useDispatch();
    const [array, setArray] = useState([
      <TypePlatsComponent key={1} activeFilters={activeFilters} />,
      <RegimeComponent key={2} activeFilters={activeFilters} />,
      <TempsComponent key={4} activeFilters={activeFilters} />,
      <MaterielsComponent key={3} activeFilters={activeFilters} />,
    ]);

    // useEffect(() => {
    //   console.log("THOS ASE ACTIVE", activeFilters.tempsCuisson);
    //   let arr = [];

    //   setCount((p) => p);
    //   activeFilters.forEach((i) => {
    //     const counts = {};

    //     console.log("THIS IS FOREACH I", Object.keys(i));
    //     arr.push(...Object.keys(i));
    //     arr.forEach((x) => {
    //       counts[x] = (counts[x] || 0) + 1;
    //     });
    //     console.log("AAAAAAAAAARTRRR", arr);
    //     setCount(counts);
    //     console.log("counts", counts);
    //   });
    // }, [activeFilters]);

    useEffect(() => {
      if (pressedFilter === "types") {
        setArray([
          <TypePlatsComponent key={1} activeFilters={activeFilters} />,
          <RegimeComponent key={2} activeFilters={activeFilters} />,
          <TempsComponent key={4} activeFilters={activeFilters} />,
          <MaterielsComponent key={3} activeFilters={activeFilters} />,
        ]);
      } else if (pressedFilter === "temps") {
        setArray([
          <TempsComponent key={4} activeFilters={activeFilters} />,
          <TypePlatsComponent key={1} activeFilters={activeFilters} />,
          <RegimeComponent key={2} activeFilters={activeFilters} />,
          <MaterielsComponent key={3} activeFilters={activeFilters} />,
        ]);
      } else if (pressedFilter === "regimes") {
        setArray([
          <RegimeComponent key={2} activeFilters={activeFilters} />,
          <TempsComponent key={4} activeFilters={activeFilters} />,
          <TypePlatsComponent key={1} activeFilters={activeFilters} />,
          <MaterielsComponent key={3} activeFilters={activeFilters} />,
        ]);
      } else if (pressedFilter === "materiel") {
        setArray([
          <MaterielsComponent key={3} activeFilters={activeFilters} />,
          <RegimeComponent key={2} activeFilters={activeFilters} />,
          <TempsComponent key={4} activeFilters={activeFilters} />,
          <TypePlatsComponent key={1} activeFilters={activeFilters} />,
        ]);
      }
    }, [pressedFilter]);
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
          />
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.lightGrey,
          }}
        >
          <DifficultyComponent activeFilters={activeFilters} />
          <RegimeComponent activeFilters={activeFilters} />
          <TempsComponent setTempsHeader={setTemps} />
          <MaterielsComponent activeFilters={activeFilters} />
          <TypePlatsComponent activeFilters={activeFilters} />
        </ScrollView>
      </Modal>
    );
  }
);

export default FilterScreen;

const styles = StyleSheet.create({});

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../consts/colors";
import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import Animated, {
  FadeInLeft,
  Layout,
  StretchOutY,
  ZoomOut,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { removeFilters, setFilters } from "../redux/slicer/recipeSlicer";
import { CATEGORIES } from "../helpers/categories";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
//Filter component in Top
const ActiveFilterComponent = ({ activeFilters, setActiveFilters }) => {
  return (
    activeFilters.length != 0 && (
      <Animated.View
        layout={Layout.easing()}
        exiting={StretchOutY}
        style={styles.activeFilterContainer}
      >
        <Text style={styles.titleActiveFilter}>Active filters:</Text>
        <Animated.View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {activeFilters.map((item) => {
            return (
              <AnimatedPressable
                onPress={() => {
                  const newActiveFilters = activeFilters.filter(
                    (filter) => filter.value != item.value
                  );
                  return setActiveFilters(newActiveFilters);
                }}
                key={item.value}
                entering={FadeInLeft}
                exiting={ZoomOut}
                layout={Layout.easing()}
                style={[
                  styles.filterItem,
                  {
                    borderColor: "red",
                    marginHorizontal: 3,
                  },
                ]}
              >
                <View style={styles.filterItemContainer}>
                  <Text style={{ marginHorizontal: 5 }}>{item.value}</Text>
                  <AntDesign name="closecircleo" size={24} color="red" />
                </View>
              </AnimatedPressable>
            );
          })}
        </Animated.View>
      </Animated.View>
    )
  );
};
//Create the accordeon item
const AccordeonItem = ({ setActiveFilters, activeFilters, name, data }) => {
  return CATEGORIES.map((item) => {
    const [isExpanded, setIsExpanded] = useState(false);
    //To know how many filters are activated (number in header)
    const num = activeFilters.filter(
      (elmt) => elmt.categorie == item.name
    ).length;
    return (
      <Animated.View layout={Layout.easing()} key={item.name}>
        <Pressable
          style={styles.headerAccordeon}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <View style={styles.headerContainer}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {!isExpanded && num != 0 && (
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    height: 20,
                    width: 20,
                  }}
                >
                  <Text style={{ color: "white" }}>{num}</Text>
                </View>
              )}
              <MaterialIcons
                name={!isExpanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
                size={24}
                color="black"
              />
            </View>
          </View>
        </Pressable>
        {isExpanded && (
          <Animated.View
            entering={FadeInLeft}
            exiting={ZoomOut}
            style={styles.filterContainer}
          >
            {/* Map throw the TYPES */}
            {item.values.map((val) => {
              const result = activeFilters.find((elmt) => {
                return elmt.value == val;
              });

              return (
                <Pressable
                  key={val}
                  style={[
                    styles.filterItem,
                    result != undefined
                      ? { borderColor: COLORS.primary, borderWidth: 2 }
                      : null,
                  ]}
                  //when we click on the item if it exists in the state of activeFilters so we remove
                  onPress={() => {
                    if (result != undefined) {
                      const newActiveFilters = activeFilters.filter(
                        (elmt) => elmt.value != result.value
                      );
                      return setActiveFilters(newActiveFilters);
                    }
                    setActiveFilters((prev) => [
                      ...prev,
                      { categorie: item.name, value: val },
                    ]);
                  }}
                >
                  <Text>{val}</Text>
                </Pressable>
              );
            })}
          </Animated.View>
        )}
        {!isExpanded && <View style={styles.separatorView} />}
      </Animated.View>
    );
  });
};
const filterScreen = ({ navigation }) => {
  // activeFiltersOut is state of activeFilters of redux
  const { activeFilters: activeFiltersOut } = useSelector(
    (state) => state.recipeStore
  );
  //   if the outside active filterScreen(redux) exists we set the current state of activeFilter to its value to show it in the active Filter Component
  useEffect(() => {
    if (activeFiltersOut) {
      setActiveFilters(activeFiltersOut);
    }
  }, []);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
          {(activeFiltersOut.length != 0 || activeFilters.length != 0) && (
            <TouchableOpacity
              onPress={() => {
                setActiveFilters([]);
                dispatch(removeFilters());
              }}
            >
              <Text style={{ marginRight: 15, fontSize: 18, color: "white" }}>
                Reinitialiser
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <ActiveFilterComponent
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <AccordeonItem
          setActiveFilters={setActiveFilters}
          activeFilters={activeFilters}
        />
      </View>
      <TouchableOpacity
        // disabled={activeFilters.length == 0}
        onPress={() => {
          setIsLoading(true);
          dispatch(setFilters(activeFilters));
          setTimeout(() => {
            navigation.goBack();
            setIsLoading(false);
          }, 1000);
        }}
        style={[
          styles.button,
          {
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            //   activeFilters.length == 0 ? "#ffdf6b" : COLORS.primary,
          },
        ]}
      >
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="white"
            style={{ marginLeft: -10 }}
          />
        )}
        <Text style={{ fontSize: 20, color: "white" }}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default filterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    width: "100%",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 20,
    flexDirection: "row",
  },
  headerAccordeon: {
    width: "100%",
    padding: 20,
    marginTop: 5,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterItem: {
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  filterContainer: {
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
    flexWrap: "wrap",
  },
  separatorView: {
    height: 0.2,
    width: "70%",
    backgroundColor: "grey",
    alignSelf: "center",
  },
  activeFilterContainer: {
    marginVertical: 20,
    padding: 3,
    backgroundColor: "white",
  },
  titleActiveFilter: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  filterItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 10,
  },
});

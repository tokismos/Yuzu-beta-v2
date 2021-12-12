import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, StatusBar } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { COLORS } from "../consts/colors";

const { height, width } = Dimensions.get("screen");

const Bar = ({ style, children }) => {
  return (
    <View
      style={{
        backgroundColor: "#C4C4C4",
        height: 10,
        borderRadius: 10,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </View>
  );
};
const HeaderComponent = ({ page, style, yes }) => {
  //The bar with color take the whole width
  const { matches } = useSelector((state) => state.matchStore);
  const { user } = useSelector((state) => state.userStore);

  const [layout, setLayout] = useState(1);

  //The color bar plus title
  const BarComponent = ({ long, title, style, children }) => {
    return (
      <View style={{ width: long, marginHorizontal: 3 }}>
        <Bar style={style}>{children}</Bar>
        <Text style={{ textAlign: "center", fontSize: 12 }}>{title} </Text>
      </View>
    );
  };
  //The row of the whoole container
  const BarContainer = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <BarComponent long="20%" title="Choisir vos recettes" style={first}>
          {/* if First page we show the progress bar */}
          {yes && (
            <View
              style={{
                backgroundColor: "white",
                flexDirection: "row",
                width: matches.length < 4 ? `${25 * matches.length}%` : "100%",
                height: "100%",
              }}
            ></View>
          )}
        </BarComponent>
        <BarComponent long="20%" title="Valider les recettes" style={second} />
        <BarComponent
          long="22%"
          title="Selection des ingrédients"
          style={third}
        />
        <BarComponent long="5%" title="" style={fourth} />

        <View
          style={{
            width: "25%",
          }}
        >
          <View
            style={{
              marginHorizontal: 3,
              flexDirection: "row",
            }}
          >
            <View style={{ width: "45%", marginRight: 3 }}>
              <Bar style={last} />
            </View>
            <View style={{ width: "45%" }}>
              <Bar style={last} />
            </View>
          </View>
          <Text style={{ width: "100%", textAlign: "center", fontSize: 12 }}>
            Livraison & paiement
          </Text>
        </View>
      </View>
    );
  };
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [last, setLast] = useState("");

  //To change the color for every page with this header
  useEffect(() => {
    //The obj of each style to add it to the setter
    let style1 = {};
    let style2 = {};
    let style3 = {};
    let style4 = {};
    let style5 = {};
    const borderWidth = 4;
    switch (page) {
      case "1":
        style1 = {
          borderWidth,
          borderColor: COLORS.primary,
          backgroundColor: yes ? COLORS.primary : "white",
        };
        break;
      case "2":
        style1 = { backgroundColor: COLORS.primary };
        style2 = {
          borderWidth,
          borderColor: COLORS.primary,
          backgroundColor: "white",
        };
        break;
      case "3":
        style1 = { backgroundColor: COLORS.primary };
        style2 = {
          backgroundColor: COLORS.primary,
        };
        style3 = {
          borderWidth,
          borderColor: COLORS.primary,
          backgroundColor: "white",
        };
        break;
      case "4":
        style1 = { backgroundColor: COLORS.primary };

        style2 = {
          backgroundColor: COLORS.primary,
        };
        style3 = {
          backgroundColor: COLORS.primary,
        };
        style4 = {
          borderWidth,
          borderColor: COLORS.primary,
          backgroundColor: "white",
        };
        break;
      case "5":
        style1 = { backgroundColor: COLORS.primary };

        style2 = {
          backgroundColor: COLORS.primary,
        };
        style3 = {
          backgroundColor: COLORS.primary,
        };
        style4 = {
          backgroundColor: COLORS.primary,
        };
        style5 = {
          borderWidth,
          borderColor: COLORS.primary,
          backgroundColor: "white",
        };
        break;
    }
    setFirst(style1);
    setSecond(style2);
    setThird(style3);
    setFourth(style4);
    setLast(style5);
  }, []);
  return (
    <View
      style={{
        height: height * 0.1,
        // paddingTop: StatusBar.currentHeight,
        backgroundColor: yes ? "#f5f4f4" : "#E8E8E8",
        width,
        justifyContent: "flex-end",
        paddingTop: yes ? 0 : 30,
        ...style,
      }}
    >
      <View
        style={[
          styles.container,
          {
            borderRadius: yes ? 10 : 0,
            borderTopLeftRadius: yes ? 10 : 15,
            borderTopRightRadius: yes ? 10 : 15,
          },
        ]}
      >
        <BarContainer />
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
    height: "80%",

    flexDirection: "row",
    paddingTop: 15,
  },
});

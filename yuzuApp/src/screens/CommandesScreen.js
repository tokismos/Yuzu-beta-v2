import { format } from "date-fns";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getCommandes } from "../helpers/db";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");
const CommandeItem = ({ item }) => {
  const navigation = useNavigation();
  let time = new Date(item.dateTime);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("InfoCommandeScreen", { historyDetail: item })
      }
      android_ripple={{ color: "lightgray" }}
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        width: width * 0.9,
        alignSelf: "center",
        marginVertical: 10,
        flexDirection: "row",
      }}
    >
      <View style={{ width: "90%" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Liste du {format(time, "dd/MM/yyyy")}
        </Text>
        {item.recipes.map((elmt, i) => {
          return (
            <Text key={i} style={{ marginLeft: 5 }}>
              - {elmt.name} ( {elmt.nbrPersonne} personnes )
            </Text>
          );
        })}
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <MaterialIcons name="keyboard-arrow-right" size={50} color="black" />
      </View>
    </Pressable>
  );
};

const CommandesScreen = () => {
  const [commandes, setCommandes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommandes(setCommandes);
  }, []);

  return (
    <ScrollView>
      {commandes.map((item, i) => {
        return <CommandeItem item={item} key={i} />;
      })}
    </ScrollView>
  );
};

export default CommandesScreen;

const styles = StyleSheet.create({});

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getCommandes } from "../helpers/db";
const { width, height } = Dimensions.get("screen");
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";

const Skeleton = ({ title }) => {
  return (
    <SkeletonPlaceholder>
      {title ? (
        <View
          style={{
            width: width - 100,
            height: 30,
            marginLeft: 5,
            marginVertical: 10,
            marginBottom: 0,
            alignSelf: "flex-start",
          }}
        />
      ) : (
        <View />
      )}
      <View
        style={{
          width: "90%",
          marginVertical: 10,
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 10,
          alignSelf: "center",
        }}
      >
        <View style={{ width: width * 0.35, aspectRatio: 1 }} />
        <View style={{ marginLeft: 20 }}>
          <View style={{ width: 120, height: 20, borderRadius: 4 }} />
          <View
            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
const CommandeItem = ({ recipe }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("IngredientScreen", { _id: recipe._id })
      }
      style={{
        width: "90%",
        marginVertical: 10,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "center",
      }}
    >
      <View
        style={{
          width: width * 0.35,
          borderRadius: 10,
        }}
      >
        <FastImage
          style={{ aspectRatio: 1 }}
          source={{
            uri: recipe.imgURL,
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
          {recipe.name}
        </Text>
      </View>
      <View
        style={{
          width: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
};
const CommandeComponent = ({ item }) => {
  var time = new Date(item.dateTime);

  return (
    <View
      style={{
        width: "100%",
        marginVertical: 10,
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5 }}>
        {`Recettes du ${format(time, "dd/MM/yyyy")} à ${format(time, "H:mm")}`}
      </Text>
      {item.recipes.map((elmt, i) => {
        return <CommandeItem recipe={elmt} key={i} />;
      })}
    </View>
  );
};
const CommandesScreen = () => {
  const [commandes, setCommandes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCommandes(setCommandes);
  }, []);

  //To detect when we set the commandes
  useEffect(() => {
    if (commandes.length != 0) {
      setIsLoading(false);
    }
  }, [commandes]);

  return (
    <>
      {isLoading ? (
        <View style={{}}>
          <Skeleton title={true} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            {commandes.map((item, i) => (
              <CommandeComponent item={item} key={i} />
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default CommandesScreen;

const styles = StyleSheet.create({});

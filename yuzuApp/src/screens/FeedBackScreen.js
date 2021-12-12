import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { TextInput } from "react-native-paper";
import TextInputColored from "../components/TextInputColored";
import { COLORS } from "../consts/colors";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { api } from "../axios";
import { clockRunning } from "react-native-reanimated";
import { auth } from "../helpers/db";
const { height, width } = Dimensions.get("screen");

const FeedBackScreen = () => {
  const [fullName, setFullName] = useState(auth().currentUser?.displayName);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const sendEmail = async (fullName, title, message) => {
    setIsLoading(true);
    try {
      await api.post("/email", { fullName, title, message });
      Alert.alert("Message envoyé avec succès");

      setTitle("");
      setMessage("");
    } catch (e) {
      Alert.alert("Erreur, message non envoyé !");
    }
    setIsLoading(false);
  };
  console.log("aaauu0", auth().currentUser);
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={-300}
      style={{ flex: 1 }}
    >
      <View style={{ height }}>
        <View style={styles.backButton}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.titleText}>Ton FeedBack</Text>
          <View style={styles.insideContainer}>
            {!auth().currentUser && (
              <TextInputColored
                value={fullName}
                label="Nom et Prénom"
                setChangeText={setFullName}
              />
            )}
            <TextInputColored
              value={title}
              label="Titre du message"
              setChangeText={setTitle}
            />

            <TextInput
              style={{ height: 200 }}
              placeholder="Un bug, une suggestion d’amélioration, une remarque, un petit message d’encouragement..."
              theme={{ colors: { primary: COLORS.primary } }}
              multiline
              mode="outlined"
              numberOfLines={5}
              value={message}
              onChangeText={(Description) => {
                setMessage(Description);
              }}
            />
            {message.length < 30 && (
              <Text
                style={{ color: "gray", textAlign: "center", marginTop: 10 }}
              >
                {30 - message.length} caractères manquants
              </Text>
            )}

            <CustomButton
              style={{ marginTop: 15 }}
              disabled={message.length < 30}
              isLoading={isLoading}
              title="Envoyer"
              onPress={() => sendEmail(fullName, title, message)}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FeedBackScreen;

const styles = StyleSheet.create({
  button: {
    width: 120,
    justifyContent: "center",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 50,
    alignSelf: "flex-end",
  },
  backButton: {
    height: "10%",
    width: "10%",
    justifyContent: "flex-end",
    marginHorizontal: 20,
  },
  container: {
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  insideContainer: {
    flexShrink: 1,
    backgroundColor: "#FFF1BE",
    width: "90%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 5,
    borderColor: COLORS.primary,
    padding: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
    color: COLORS.primary,
    marginBottom: 20,
  },
});

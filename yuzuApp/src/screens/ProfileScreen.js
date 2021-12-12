import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/core";

const ProfileScreen = () => {
  console.log("cuurent user", auth().currentUser);
  const { signOut } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {auth().currentUser ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>{auth().currentUser.email}</Text>
          <Button title="se deconnecter" onPress={() => signOut()} style={{}} />
        </View>
      ) : (
        <>
          <Text>NO ACCOUNT CONNECTED</Text>
          <Button title="GO BACK" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

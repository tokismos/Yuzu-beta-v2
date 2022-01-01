import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { LoggedStackScreen } from "../navigation/Navigator";

const TempScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default TempScreen;

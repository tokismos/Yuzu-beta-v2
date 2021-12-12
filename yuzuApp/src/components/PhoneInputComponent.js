import React, { forwardRef, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";

const { width, height } = Dimensions.get("window");

const PhoneInputComponent = ({
  number,
  setCountryCode,
  style,
  error,
  setPhoneNumber,
}) => {
  // useEffect(() => {
  //   if (ref?.isValidNumber(number)) setError(true);
  // }, [number]);

  return (
    <View style={[{ width, alignItems: "center" }, { ...style }]}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 22,
          margin: 20,
          textAlign: "center",
        }}
      >
        Entrez votre numero de téléphone
      </Text>
      <PhoneInput
        layout="first"
        withShadow
        defaultCode="US"
        onChangeText={(text) => {
          setPhoneNumber(text);
        }}
        onChangeCountry={(text) => setCountryCode(text.callingCode)}
      />
      {error ? (
        <Text style={{ color: "red", marginTop: 10 }}>
          Please enter a valid phone number !{" "}
        </Text>
      ) : null}
      <View style={{ margin: 40 }}>
        <Text style={{ textAlign: "left", color: "gray", fontSize: 12 }}>
          Nous vous enverrons un code par SMS pour confirmer votre numéro de
          téléphone.
        </Text>
        <Text
          style={{
            textAlign: "center",
            textAlign: "left",
            marginTop: 10,
            color: "gray",
            fontSize: 12,
          }}
        >
          Nous pouvons occasionnellement vous envoyer des messages liés au
          service.
        </Text>
      </View>
    </View>
  );
};
export default PhoneInputComponent;

const styles = StyleSheet.create({});

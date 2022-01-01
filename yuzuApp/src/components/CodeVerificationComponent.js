import React, { createRef, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import LottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import TextInputColored from "./TextInputColored";

const { width, height } = Dimensions.get("window");

const CodeVerificationComponent = ({ fullNumber, setCode, goBack }) => {
  const [refresh, setRefresh] = useState(false);

  const ref = createRef(null);
  React.useEffect(() => {
    ref.current.play(0, 100);
  }, []);
  return (
    <View style={{ width, alignItems: "center" }}>
      <View style={{ height: 200, width: 150 }}>
        <LottieView
          ref={ref}
          loop={false}
          source={require("../assets/smsSent.json")}
          resizeMode="cover"
        />
      </View>
      <Text
        style={{
          width: "70%",
          alignSelf: "center",
          textAlign: "center",
          marginVertical: 20,
          color: COLORS.primary,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Veuillez saisir le code de confirmation reçu par SMS
      </Text>
      <Text
        style={{ color: "gray", textAlign: "center", marginHorizontal: 20 }}
      >
        Un code de 4 chiffres a été envoyé au{" "}
        <Text style={{ fontWeight: "bold" }}>{fullNumber}</Text>
      </Text>
      <TouchableOpacity onPress={goBack}>
        <Text style={{ color: "blue", textDecorationLine: "underline" }}>
          Changer
        </Text>
      </TouchableOpacity>

      <OTPInputView
        keyboardType="phone-pad"
        style={{ width: "80%", height: 100, alignSelf: "center" }}
        pinCount={4}
        onCodeChanged={(code) => {
          setCode(code);
        }}
        selectionColor="rgba(0,0,0,0)"
        codeInputFieldStyle={{
          backgroundColor: "white",
          height: 80,
          color: "black",
          fontSize: 28,
        }}
        codeInputHighlightStyle={{
          backgroundColor: COLORS.secondary,
          fontWeight: "bold",
        }}
        onCodeFilled={(code) => {
          setCode(code);
        }}
      />

      <TouchableOpacity disabled={!refresh} style={styles.resendButton}>
        <Text style={styles.text}>Resend code !</Text>
        {refresh ? (
          <FontAwesome name="refresh" size={29} color={COLORS.primary} />
        ) : (
          <CountdownCircleTimer
            isPlaying
            duration={45}
            initialRemainingTime={45}
            colors={COLORS.primary}
            size={30}
            strokeWidth={2}
            strokeLinecap="square"
            arialabel
            children={({ remainingTime }) => {
              return <Text>{remainingTime}</Text>;
            }}
            onComplete={() => setRefresh(true)}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
export default CodeVerificationComponent;

const styles = StyleSheet.create({
  codeInput: {
    textAlign: "center",
    fontSize: 20,
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 100,
    height: 50,
    borderBottomWidth: 0.2,
    marginVertical: 20,
  },
  text: { fontSize: 16 },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: width - 100,
    height: 50,
    borderBottomWidth: 0.2,
  },
});

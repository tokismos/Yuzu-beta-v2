import React, {
  createRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { VirtualKeyboard } from "react-native-screen-keyboard";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

// import { signInWithPhoneNumber } from "../helpers/db";
import { COLORS } from "../consts/colors";
import ContinueButton from "../components/ContinueButton";
import HeaderComponent from "../components/HeaderComponent";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import PhoneInputComponent from "../components/PhoneInputComponent";
import CodeVerificationComponent from "../components/CodeVerificationComponent";
import LoadingComponent from "../components/LoadingComponent";

const { width, height } = Dimensions.get("window");

const PhoneVerificationScreen = ({ navigation }) => {
  const phoneInput = useRef(null);
  const scroll = useRef();
  const [number, setNumber] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const fullNumber = `+${countryCode}${number}`;
  const [error, setError] = useState(false);
  const [verificationId, setVerificationId] = useState("");

  console.log("rendered");
  useEffect(() => {
    if (phoneInput.current?.isValidNumber(number)) setError(false);
  }, [number]);

  const sendVerificationCode = async () => {
    console.log("CLICKED");
    setError(false);
    setIsLoading(true);
    auth()
      .verifyPhoneNumber(fullNumber, true)
      .on("state_changed", (phoneAuthSnapshot) => {
        console.log(phoneAuthSnapshot);
        switch (phoneAuthSnapshot.state) {
          case auth.PhoneAuthState.CODE_SENT:
            console.log("yeaaah sent");
            scroll.current.scrollToEnd({ Animated: true });
            setIsLoading(false);

            setCodeSent(true);
            setVerificationId(phoneAuthSnapshot.verificationId);
        }
        console.log("Snapshot state: ", phoneAuthSnapshot);
      });
  };
  const connectWithNum = () => {
    auth.PhoneAuthProvider.credential(verificationId, code);
    confirmCode(code);
    console.log("LOOOOGed");
  };
  const returnToInputNumber = () => {
    scroll.current.scrollTo({ x: 0 });
  };

  const confirmCode = async (code) => {
    try {
      await confirm.confirm(code);
      console.log("Suuuceeeed");
    } catch (error) {
      console.log("Invalid code.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGrey }}>
      {isLoading && <LoadingComponent />}
      <View
        style={{
          justifyContent: "space-between",
          height: height * 0.9,
          backgroundColor: COLORS.secondary,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGrey,
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 25,
          }}
        >
          {/* <CodeVerificationComponent /> */}
          <ScrollView
            style={{ flex: 1 }}
            horizontal
            ref={scroll}
            // scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                width: width * 2,
              }}
            >
              <PhoneInputComponent
                number={number}
                ref={phoneInput}
                setCountryCode={setCountryCode}
                style={{}}
              />
              <CodeVerificationComponent
                style={{}}
                returnToInputNumber={returnToInputNumber}
                code={code}
                setCode={setCode}
              />
            </View>
          </ScrollView>
          <Text>{code}</Text>
          <VirtualKeyboard
            onChange={codeSent ? setCode : setNumber}
            keyboardStyle="containerStyle"
          />
        </View>
        <View
          style={{
            height: height * 0.15,
            backgroundColor: COLORS.lightGrey,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ContinueButton
            onPress={() => {
              codeSent ? connectWithNum() : sendVerificationCode();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneVerificationScreen;

const styles = StyleSheet.create({});

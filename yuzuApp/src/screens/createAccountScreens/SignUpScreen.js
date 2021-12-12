import React, {
  createRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  BackHandler,
  Button,
  Alert,
} from "react-native";
import PagerView from "react-native-pager-view";

import HeaderComponent from "../../components/HeaderComponent";
import LoginHeaderScreen from "../../components/LoginHeaderScreen";
import TextInputColored from "../../components/TextInputColored";
import { COLORS } from "../../consts/colors";
import auth from "@react-native-firebase/auth";
import useAuth from "../../hooks/useAuth";
import PhoneInputComponent from "../../components/PhoneInputComponent";
import CodeVerificationComponent from "../../components/CodeVerificationComponent";
import PhoneVerificationScreen from "../PhoneVerificationScreen";

const { height, width } = Dimensions.get("screen");
const EmailComponent = ({ setEmail, refe, email }) => {
  return (
    <View style={{ width, height }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Saisissez votre adresse e-mail
        </Text>
        <TextInputColored label="E-mail" setChangeText={setEmail} />
        <Text style={styles.description}>
          Vous devez confirmer cette adresse e-mail par la suite
        </Text>
      </View>
      <NextButton
        disabled={email == ""}
        onPress={() => {
          refe.current.setPage(1);
        }}
      />
    </View>
  );
};
const PasswordComponent = ({ setPassword, refe, password }) => {
  return (
    <View style={{ width }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Créer un mot de passe.
        </Text>
        <TextInputColored
          label="Mot de passe"
          setChangeText={setPassword}
          secured
        />
        {password.length < 8 && (
          <Text style={styles.description}>
            Votre mot de passe doit contenir au moins 8 caractères.
          </Text>
        )}
      </View>
      <NextButton
        disabled={password.length < 8}
        onPress={() => {
          refe.current.setPage(2);
        }}
      />
    </View>
  );
};

const PhoneComponent = ({
  refe,
  setPhoneNumber,
  setCountryCode,
  fullNumber,
}) => {
  const { sendPhoneVerification } = useAuth();
  return (
    <View style={{ width }}>
      <PhoneInputComponent
        setPhoneNumber={setPhoneNumber}
        setCountryCode={setCountryCode}
        style={{}}
      />
      <NextButton
        onPress={async () => {
          const status = await sendPhoneVerification(fullNumber);
          if (status == 200) {
            console.log("yeaah 200");
            refe.current.setPage(3);
          }
        }}
      />
    </View>
  );
};
const NameComponent = ({
  refe,
  setIndex,
  index,
  setPhoneNumber,
  setCountryCode,
  fullNumber,
}) => {
  const { sendPhoneVerification } = useAuth();
  return (
    <View style={{ width }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Comment vous appelez vous ?
      </Text>
      <NextButton onPress={async () => {}} />
    </View>
  );
};

const createUser = async (email, password, phoneNumber) => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User account created & signed in!");
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        throw new Error("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }
      throw new Error("no");
    });
};
const VerificationPhoneComponent = ({ fullNumber, email, password }) => {
  const { verifyCode } = useAuth();
  const [verificationCode, setCode] = useState();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={100}
      contentContainerStyle={{ backgroundColor: "pink" }}
    >
      <ScrollView style={{}}>
        <View style={{ width }}>
          <CodeVerificationComponent
            setCode={setCode}
            fullNumber={fullNumber}
          />

          <NextButton
            onPress={async () => {
              const status = await verifyCode(fullNumber, verificationCode);
              if (status == 200) {
                // await createUser(email, password);
                console.log("approoved");
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const NextButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.nextButton,
        backgroundColor: disabled ? COLORS.secondary : COLORS.primary,
      }}
    >
      <Text style={{ fontWeight: "bold", color: "white" }}>Suivant</Text>
    </TouchableOpacity>
  );
};

const SignUpScreen = ({}) => {
  const ref = createRef();
  const [ind, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setCode] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [fullNumber, setFullNumber] = useState("");

  useEffect(() => {
    setFullNumber(`+${countryCode}${phoneNumber}`);
  }, [phoneNumber, countryCode]);
  useEffect(() => {
    console.log("vcode", verificationCode);
  }, [verificationCode]);

  return (
    <View style={{ backgroundColor: "white" }}>
      {/* innerRef to pass the ref of flatList to the component */}
      <LoginHeaderScreen innerRef={ref} index={ind} />
      <PagerView
        scrollEnabled={true}
        style={{ height: "100%" }}
        initialPage={0}
        ref={ref}
        onPageScroll={(ev) => setIndex(ev.nativeEvent.position)}
      >
        <View key="1">
          <EmailComponent
            refe={ref}
            setIndex={setIndex}
            email={email}
            setEmail={setEmail}
          />
        </View>
        <View key="2">
          <PasswordComponent
            refe={ref}
            password={password}
            setPassword={setPassword}
          />
        </View>
        <View key="3">
          <PhoneComponent
            refe={ref}
            setPhoneNumber={setPhoneNumber}
            setCountryCode={setCountryCode}
            fullNumber={fullNumber}
          />
        </View>
        <View key="4">
          <VerificationPhoneComponent
            email={email}
            password={password}
            fullNumber={fullNumber}
          />
        </View>
      </PagerView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  nextButton: {
    width: 120,
    justifyContent: "center",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  description: {
    marginTop: "5%",
    width: "90%",
    alignSelf: "center",
    fontSize: 12,
    textAlign: "center",
  },
});

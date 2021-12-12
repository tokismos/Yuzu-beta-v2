import React from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { COLORS } from "../consts/colors";
// import { signUp } from "../helpers/db";
const { width, height } = Dimensions.get("window");
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import TextInputColored from "../components/TextInputColored";
import { StackActions } from "@react-navigation/native";
import ContinueButton from "../components/ContinueButton";
import HeaderComponent from "../components/HeaderComponent";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.lightGrey, width }}>
      <StatusBar backgroundColor={COLORS.secondary} />

      {/* start of mid container */}

      <View style={styles.midContainer}>
        <View style={styles.headerMidContainer}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            Create Account
          </Text>
          <Text style={{ color: "gray", marginLeft: 20, fontSize: 18 }}>
            Sign Up to get started !
          </Text>
        </View>

        {/* to add margin to mid container in secondary color */}
        <View style={{ height: "70%" }}>
          <View
            style={{
              backgroundColor: COLORS.secondary,
              paddingTop: 20,
              flex: 1,
            }}
          >
            <TextInputColored
              label="Email"
              value={email}
              setChangeText={setEmail}
              leftIcon="email"
            />

            <TextInputColored
              label="Full Name"
              value={fullName}
              setChangeText={setFullName}
              leftIcon="card-account-details"
            />
            <TextInputColored
              label="Password"
              value={password}
              setChangeText={setPassword}
              leftIcon="lock"
              secured
            />
            <View style={styles.textMidContainer}>
              <Text style={{ fontSize: 16 }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Sign IN !
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* End of mid container */}
      {/* START of bottom Container */}

      <View style={{ height: height * 0.3, justifyContent: "space-between" }}>
        <View style={styles.policyContainer}>
          <Text style={{ textAlign: "center" }}>
            By signing up you agree to{" "}
            <Text style={styles.linkText}>Privacy Policy</Text> and{" "}
            <Text style={styles.linkText}>Terms {"&"} Conditions.</Text>
          </Text>
        </View>
        <View
          style={{
            height: "50%",
            backgroundColor: COLORS.lightGrey,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ContinueButton
            onPress={() => navigation.navigate("PhoneVerificationScreen")}
          />
        </View>

        {/* END of Bottom Container */}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  topContainer: {
    height: height * 0.1,
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 25,
    justifyContent: "center",
  },
  returnButton: {
    width: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    elevation: 3,
  },
  midContainer: {
    backgroundColor: COLORS.secondary,
    height: height * 0.6,
  },
  headerMidContainer: {
    backgroundColor: COLORS.lightGrey,
    height: "30%",
    padding: 30,
    borderTopRightRadius: 25,
  },
  textMidContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  policyContainer: {
    backgroundColor: COLORS.lightGrey,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

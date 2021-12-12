import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../consts/colors";
import FbIcon from "../assets/fbIcon.svg";
import GoogleIcon from "../assets/GoogleIcon.svg";
import PhoneIcon from "../assets/phoneIcon.svg";
import { NavigationContainer } from "@react-navigation/native";
import { LoginWithFb, LoginWithGoogle, test } from "../helpers/db";
import TextInputColored from "../components/TextInputColored";
import useAuth from "../hooks/useAuth";
import { setAccessToken } from "../redux/slicer/userSlicer";
import { useDispatch } from "react-redux";
const { width, height } = Dimensions.get("screen");
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("hello@gmail.com");
  const [password, setPassword] = React.useState("testest");
  const [visible, setVisible] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const { signIn, signInWithGoogle, signInWithFb } = useAuth();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#CDCDCD",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          width: width - 30,
          borderTopRightRadius: 50,
          marginTop: 100,
        }}
      >
        <Text style={{ fontSize: 40, textAlign: "center" }}>Sign In</Text>
        <TextInputColored
          label="Email"
          value={email}
          setChangeText={setEmail}
          leftIcon="email"
        />
        <TextInputColored
          label="Password"
          value={password}
          setChangeText={setPassword}
          leftIcon="lock"
          secured
        />
        <TouchableOpacity
          style={{ alignItems: "flex-end", marginTop: 10, marginRight: 20 }}
        >
          <Text style={{ color: "grey" }}>Forgot your password ?</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          onPress={() => {
            setLoading(!isLoading);
            signIn(email, password);
          }}
          style={{
            width: 250,
            alignSelf: "center",
            marginTop: 20,
            backgroundColor: COLORS.primary,
          }}
          color="red"
          loading={isLoading}
        >
          Sign In
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: 50, height: 0.5, backgroundColor: "black" }} />
          <Text style={{ margin: 20 }}>Or login with</Text>
          <View style={{ width: 50, height: 0.5, backgroundColor: "black" }} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={async () => {
              await signInWithFb();
            }}
          >
            <FbIcon
              width={40}
              height={40}
              fill={"blue"}
              style={{ marginHorizontal: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signInWithGoogle()}>
            <GoogleIcon width={40} height={40} fill={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 20 }}
        >
          <Text>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={{ fontWeight: "bold" }}>Sign Up !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

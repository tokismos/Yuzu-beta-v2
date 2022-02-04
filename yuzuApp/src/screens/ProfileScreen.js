import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import TextInputColored from "../components/TextInputColored";
import { COLORS } from "../consts/colors";
import CustomButton from "../components/CustomButton";
import { KeyboardAvoidingView } from "react-native";
import { setUser } from "../redux/slicer/userSlicer";
import { ToastAndroid } from "react-native";

const { width, height } = Dimensions.get("screen");
const ProfileScreen = () => {
  console.log("cuurent user", auth().currentUser);
  const { user } = useSelector((state) => state.userStore);
  const sheetRef = React.useRef(null);
  const inputRef = useRef();
  const [showBlack, setShowBlack] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signOut, getAdditionalInfo } = useAuth();
  const navigation = useNavigation();
  console.log("AM THE USER", auth().currentUser);
  console.log("EERFF", user);
  const dispatch = useDispatch();

  //When we change the email for the first time because of google null email
  useEffect(() => {
    if (user.email != auth().currentUser.email) {
      console.log("not same");
      dispatch(setUser({ ...user, email: auth().currentUser.email }));
    }
  }, []);

  const updateName = async () => {
    try {
      setIsLoading(true);
      await auth().currentUser.updateProfile({
        displayName: name,
      });
      dispatch(setUser({ ...user, displayName: name }));
      setIsLoading(false);
      sheetRef.current.snapTo(1);
      setName("");
      ToastAndroid.show("Votre nom a été changé !", ToastAndroid.SHORT);
    } catch (e) {
      console.log("A// ERROR,", e);
    }
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <View
        style={{
          height,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        {showBlack && (
          <Pressable
            onPress={() => {
              setShowBlack(false);
              Keyboard.dismiss();

              sheetRef.current.snapTo(1);
            }}
            style={{
              backgroundColor: "rgba(0,0,0,.2)",
              position: "absolute",
              ...StyleSheet.absoluteFill,
              width,
              zIndex: 1,
            }}
          />
        )}
        <Avatar.Image
          size={150}
          source={require("../assets/avatar.png")}
          style={{ margin: 10 }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            color: "gray",
            marginBottom: 20,
          }}
        >
          {user.email}
        </Text>
        <View style={{ backgroundColor: "gray", width: "90%", height: 0.3 }} />
        <View
          style={{
            backgroundColor: "red",
            width: "95%",
            backgroundColor: COLORS.secondary,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              width: "100%",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginHorizontal: "3%",
              }}
            >
              <Text>Nom et Prenom:</Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  flex: 1,
                }}
              >
                {user.displayName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  sheetRef.current.snapTo(0);
                }}
              >
                {/* <AntDesign name="edit" size={20} color="gray" /> */}
              </TouchableOpacity>
            </View>
          </View>
          {user.phoneNumber && (
            <View
              style={{
                alignSelf: "flex-start",
                width: "100%",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginHorizontal: "3%",
                }}
              >
                <Text style={{}}>Numero Téléphone :</Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  {user.phoneNumber}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    sheetRef.current.snapTo(0);
                  }}
                >
                  {/* <AntDesign name="edit" size={20} color="gray" /> */}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={{ width: "100%", padding: 20 }}>
          {!user.phoneNumber && (
            <TouchableOpacity
              onPress={() => navigation.navigate("PhoneScreen")}
              style={{
                height: 50,
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 3,
                flexDirection: "row",
              }}
            >
              <AntDesign
                name="mobile1"
                size={20}
                color="black"
                style={{ marginRight: 20 }}
              />
              <Text style={{ fontSize: 18, flex: 1 }}>Ajouter mon numéro</Text>

              <AntDesign name="exclamationcircle" size={16} color="red" />
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              height: 50,
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 3,
              flexDirection: "row",
            }}
          >
            <MaterialIcons
              name="add-location"
              size={20}
              color="black"
              style={{ marginRight: 20 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "900", flex: 1 }}>
              Ajouter une addresse
            </Text>
            <AntDesign name="exclamationcircle" size={16} color="red" />
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sheetRef.current.snapTo(0)}
            style={{
              height: 50,
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 3,
              flexDirection: "row",
            }}
          >
            <AntDesign
              name="idcard"
              size={20}
              color="black"
              style={{ marginRight: 20 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "900", flex: 1 }}>
              Modifier mon nom
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {user.phoneNumber && (
            <TouchableOpacity
              onPress={() => navigation.navigate("PhoneScreen")}
              style={{
                height: 50,
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 3,
                flexDirection: "row",
              }}
            >
              <AntDesign
                name="mobile1"
                size={20}
                color="black"
                style={{ marginRight: 20 }}
              />
              <Text style={{ fontSize: 18, flex: 1 }}>Modifier mon numéro</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => signOut()}
            style={{
              height: 50,
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 3,
              flexDirection: "row",
            }}
          >
            <AntDesign
              name="logout"
              size={20}
              color="red"
              style={{ marginRight: 20 }}
            />
            <Text style={{ fontSize: 18, flex: 1, color: "red" }}>
              Se deconnecter
            </Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="red" />
          </TouchableOpacity>
        </View>
        <BottomSheet
          style={{ backgroundColor: "red" }}
          enabledContentTapInteraction={false}
          onCloseStart={() => {
            Keyboard.dismiss();
          }}
          onCloseEnd={() => {
            Keyboard.dismiss();

            setShowBlack(false);
          }}
          ref={sheetRef}
          snapPoints={[height * 0.38, 0]}
          initialSnap={1}
          borderRadius={10}
          enabledInnerScrolling={false}
          onOpenStart={() => {
            setShowBlack(true);
            inputRef.current.focus();
          }}
          renderContent={() => (
            <View
              style={{
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: COLORS.secondary,
                width: "100%",
                paddingTop: 20,
                padding: 10,
                height: height * 0.35,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Nouveau nom :
              </Text>
              <TextInputColored
                value={name}
                setChangeText={setName}
                ref={inputRef}
                style={{ width: "90%", alignSelf: "center" }}
              />
              <CustomButton
                isLoading={isLoading}
                onPress={updateName}
                title="Valider"
                style={{ marginTop: 20 }}
              />
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

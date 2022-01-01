import React, { createRef, useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { GameRequestDialog } from "react-native-fbsdk-next";
import PagerView from "react-native-pager-view";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CodeVerificationComponent from "../components/CodeVerificationComponent";
import CustomButton from "../components/CustomButton";
import PhoneInputComponent from "../components/PhoneInputComponent";
import { setAdditionalInfo } from "../helpers/db";
import useAuth from "../hooks/useAuth";
import { setUser } from "../redux/slicer/userSlicer";

const PhoneScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.userStore);
  const [fullNumber, setFullNumber] = useState();
  const [countryCode, setCountryCode] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [index, setIndex] = useState("");
  const ref = createRef();
  const dispatch = useDispatch();
  const { sendPhoneVerification, verifyCode } = useAuth();
  useEffect(() => {
    setFullNumber(`+${countryCode}${phoneNumber}`);
  }, [phoneNumber, countryCode]);
  useEffect(() => {
    console.log(fullNumber);
  }, [fullNumber]);
  return (
    <PagerView
      ref={ref}
      scrollEnabled={true}
      style={{ height: "100%" }}
      initialPage={0}
      onPageScroll={(ev) => setIndex(ev.nativeEvent.position)}
    >
      <View key="1">
        <PhoneInputComponent
          setCountryCode={setCountryCode}
          error
          setPhoneNumber={setPhoneNumber}
        />
        <CustomButton
          title="Suivant"
          isLoading={isLoading}
          onPress={async () => {
            setIsLoading(true);
            const status = await sendPhoneVerification(fullNumber);
            if (status == 200) {
              console.log("yeaah 200");
              ref.current.setPage(1);
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          }}
        />
      </View>
      <View key="2">
        <CodeVerificationComponent
          setCode={setCode}
          fullNumber={fullNumber}
          goBack={() => ref.current.setPage(0)}
        />
        <CustomButton
          title="Suivant"
          isLoading={isLoading}
          onPress={async () => {
            setIsLoading(true);
            await setAdditionalInfo({
              phoneNumber: fullNumber,
            });
            dispatch(setUser({ ...user, phoneNumber: fullNumber }));
            navigation.pop();
            ToastAndroid.show(
              "Votre numéro de téléphone a été changé !",
              ToastAndroid.SHORT
            );
            // const status = await verifyCode(fullNumber, verificationCode);
            // if (status == 200) {
            //   await setAdditionalInfo({
            //     phoneNumber: fullNumber,
            //   });
            //   console.log("added additional info");
            //   setIsLoading(false);
            // } else {
            //   setIsLoading(false);
            // }
          }}
        />
      </View>
    </PagerView>
  );
};

export default PhoneScreen;

const styles = StyleSheet.create({});

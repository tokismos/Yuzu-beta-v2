//Un page Viewer qui nour permets d'Afficher les diffecrent components de l'envoi de sms au numero de tel.Ici on ne fait qu'appel
// à l'API pour envoyer un code de verification et puis pour verifier le code saisit par l'utilisateur

import React, { useRef, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, ToastAndroid, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CodeVerificationComponent from "../components/CodeVerificationComponent";
import CustomButton from "../components/CustomButton";
import PhoneInputComponent from "../components/PhoneInputComponent";
import { setAdditionalInfo } from "../helpers/db";
import useAuth from "../hooks/useAuth";
import { setUser } from "../redux/slicer/userSlicer";
import {useTranslation} from "react-i18next";

const PhoneScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.userStore);
  const [fullNumber, setFullNumber] = useState();
  const [countryCode, setCountryCode] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [index, setIndex] = useState("");
  const ref = useRef();
  const dispatch = useDispatch();
  const { sendPhoneVerification, verifyCode } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    setFullNumber(`+${countryCode}${phoneNumber}`);
  }, [phoneNumber, countryCode]);

  return (
    <PagerView
      ref={ref}
      scrollEnabled={false}
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
          title={t('next')}
          isLoading={isLoading}
          onPress={async () => {
            setIsLoading(true);
            const status = await sendPhoneVerification(fullNumber);
            if (status === 200) {
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
          title={t('next')}
          isLoading={isLoading}
          onPress={async () => {
            setIsLoading(true);

            const status = await verifyCode(fullNumber, code);
            if (status === 200) {
              await setAdditionalInfo({
                phoneNumber: fullNumber,
              });
              dispatch(setUser({ ...user, phoneNumber: fullNumber }));
              navigation.pop();
              ToastAndroid.show(
                t('phoneScreen_phoneChanged'),
                ToastAndroid.SHORT
              );
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          }}
        />
      </View>
    </PagerView>
  );
};

export default PhoneScreen;

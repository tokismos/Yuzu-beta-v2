import { Dimensions, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import TextInputColored from "../components/TextInputColored";
import CustomButton from "../components/CustomButton";
import useAuth from "../hooks/useAuth";
import { useTranslation } from 'react-i18next';

const { height, width } = Dimensions.get("screen");

const ForgotPasswordScreen = () => {
    const { t } = useTranslation()
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(
  );
  const { resetPassword } = useAuth();

  useEffect(() => {
      setMsg(t('forgotPasswordScreen_defaultMsg'))
  }, [])

  return (
    <View style={{ width, height }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {t('forgotPasswordScreen_enterYourEmail')}
        </Text>
        <TextInputColored
          label={t('email')}
          setChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            color: msg === t('forgotPasswordScreen_unknownEmail')  ? "red"  : "black",
          }}
        >
          {msg}
        </Text>
      </View>
      <CustomButton
        disabled={email === ""}
        title={t('forgotPasswordScreen_send')}
        isLoading={isLoading}
        onPress={async () => {
          setIsLoading(true);
          try {
            await resetPassword(email, setMsg, setIsLoading, t);
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </View>
  );
};

export default ForgotPasswordScreen;

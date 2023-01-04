import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import TextInputColored from '../components/TextInputColored';
import useAuth from '../hooks/useAuth';

const { height, width } = Dimensions.get('screen');

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();
  const { resetPassword, validateEmail } = useAuth();

  useEffect(() => {
    setMsg(t('forgotPasswordScreen_defaultMsg'));
  }, []);

  return (
    <View style={{ width, height }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          {t('forgotPasswordScreen_enterYourEmail')}
        </Text>
        <TextInputColored
          type="emailAddress"
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect={false}
          label={t('email')}
          setChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            color:
              msg === t('forgotPasswordScreen_unknownEmail') ||
              msg === t('email_badFormat')
                ? 'red'
                : 'black',
          }}
        >
          {msg}
        </Text>
      </View>
      <CustomButton
        disabled={email === ''}
        title={t('forgotPasswordScreen_send')}
        isLoading={isLoading}
        onPress={async () => {
          setIsLoading(true);
          try {
            const goodFormat = validateEmail(email);
            if (goodFormat) await resetPassword(email, setMsg, setIsLoading, t);
            else setMsg(t('email_badFormat'));

            setIsLoading(false);
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </View>
  );
};

export default ForgotPasswordScreen;

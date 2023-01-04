//The first screen where you sign up ,where there's four components Email,p

import React, { createRef, useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import CodeVerificationComponent from '../../components/CodeVerificationComponent';
import CustomButton from '../../components/CustomButton';
import LoginHeaderScreen from '../../components/LoginHeaderScreen';
import PhoneInputComponent from '../../components/PhoneInputComponent';
import TextInputColored from '../../components/TextInputColored';
import { setAdditionalInfo } from '../../helpers/db';
import useAuth from '../../hooks/useAuth';
import { setIsFirstTime } from '../../redux/slicer/userSlicer';

const { height, width } = Dimensions.get('screen');
const EmailComponent = ({ setEmail, refe, email }) => {
  const { t } = useTranslation();
  return (
    <View style={{ width, height }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
          {t('signupScreen_enterEmail')}
        </Text>
        <TextInputColored
          type="emailAddress"
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect={false}
          label={t('email')}
          setChangeText={setEmail}
          secured={false}
        />
        <Text style={styles.description}>{t('signupScreen_confirmEmail')}</Text>
      </View>
      <NextButton
        disabled={email === ''}
        onPress={() => {
          refe.current.setPage(1);
        }}
      />
    </View>
  );
};
const PasswordComponent = ({ setPassword, refe, password }) => {
  const { t } = useTranslation();
  return (
    <View style={{ width }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
          {t('signupScreen_createPassword')}
        </Text>
        <TextInputColored
          label={t('signupScreen_password')}
          setChangeText={setPassword}
          secured
        />
        {password.length < 8 && (
          <Text style={styles.description}>
            {t('signupScreen_passwordMinimumLength')}
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

const PhoneComponent = ({ refe, setPhoneNumber, setCountryCode, fullNumber }) => {
  const { sendPhoneVerification } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={{ width }}>
      <PhoneInputComponent
        setPhoneNumber={setPhoneNumber}
        setCountryCode={setCountryCode}
      />
      <CustomButton
        isLoading={isLoading}
        title={t('signupScreen_next')}
        onPress={async () => {
          setIsLoading(true);
          const status = await sendPhoneVerification(fullNumber);
          if (status === 200) {
            refe.current.setPage(3);
            navigation.navigate
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }}
      />
    </View>
  );
};

const VerificationPhoneComponent = ({ fullNumber, email, password, refe }) => {
  const { verifyCode, signUp } = useAuth();
  const [verificationCode, setCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={100}
      contentContainerStyle={{ backgroundColor: 'pink' }}
    >
      <ScrollView style={{}}>
        <View style={{ width }}>
          <CodeVerificationComponent
            setCode={setCode}
            fullNumber={fullNumber}
            goBack={() => refe.current.setPage(2)}
          />

          <CustomButton
            title={t('next')}
            isLoading={isLoading}
            onPress={async () => {
              setIsLoading(true);
              const status = await verifyCode(fullNumber, verificationCode);
              if (status === 200) {
                dispatch(setIsFirstTime());
                await signUp(email, password);
                await setAdditionalInfo({
                  phoneNumber: fullNumber,
                });
                navigation.navigate('TinderScreen')

                setIsLoading(false);
              } else {
                setIsLoading(false);
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const NextButton = ({ onPress, disabled }) => {
  const { t } = useTranslation();
  return (
    <CustomButton
      onPress={onPress}
      title={t('next')}
      disabled={disabled}
      style={{
        ...styles.nextButton,
      }}
      textStyle={{ fontWeight: 'bold', color: 'white' }}
    />
  );
};

const SignUpScreen = () => {
  const ref = createRef();
  const [ind, setIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('1');
  const [fullNumber, setFullNumber] = useState('');

  useEffect(() => {
    setFullNumber(`+${countryCode}${phoneNumber}`);
  }, [phoneNumber, countryCode]);

  return (
    <View style={{ backgroundColor: 'white' }}>
      {/* innerRef to pass the ref of flatList to the component */}
      <LoginHeaderScreen innerRef={ref} index={ind} />
      <PagerView
        scrollEnabled={false}
        style={{ height: '100%' }}
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
            refe={ref}
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
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  description: {
    marginTop: '5%',
    width: '90%',
    alignSelf: 'center',
    fontSize: 12,
    textAlign: 'center',
  },
});

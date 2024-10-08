//Le component qui nous permets d'entrer le code de verification recu par TWILIO API

import { FontAwesome } from '@expo/vector-icons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import LottieView from 'lottie-react-native';
import React, { createRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { COLORS } from '../consts/colors';

const { width } = Dimensions.get('window');

const CodeVerificationComponent = ({ fullNumber, setCode, goBack }) => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);

  const ref = createRef(null);
  React.useEffect(() => {
    ref.current.play(0, 100);
  }, []);

  return (
    <View style={{ width, alignItems: 'center' }}>
      <View style={{ height: 200, width: 150 }}>
        <LottieView
          ref={ref}
          loop={false}
          source={require('../assets/smsSent.json')}
          resizeMode="cover"
        />
      </View>
      <Text
        style={{
          width: '70%',
          alignSelf: 'center',
          textAlign: 'center',
          marginVertical: 20,
          color: COLORS.primary,
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        {t('codeVerificationComponent_enterCode')}
      </Text>
      <Text style={{ color: 'gray', textAlign: 'center', marginHorizontal: 20 }}>
        {t('codeVerificationComponent_codeSent_description')}
        <Text style={{ fontWeight: 'bold' }}>{fullNumber}</Text>
      </Text>
      <TouchableOpacity onPress={goBack}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
          Changer
        </Text>
      </TouchableOpacity>

      <OTPInputView
        keyboardType="phone-pad"
        style={{ width: '80%', height: 100, alignSelf: 'center' }}
        pinCount={4}
        onCodeChanged={(code) => {
          setCode(code);
        }}
        selectionColor="rgba(0,0,0,0)"
        codeInputFieldStyle={{
          backgroundColor: 'white',
          height: 80,
          color: 'black',
          fontSize: 28,
        }}
        codeInputHighlightStyle={{
          backgroundColor: COLORS.secondary,
          fontWeight: 'bold',
        }}
        onCodeFilled={(code) => {
          setCode(code);
        }}
      />

      <TouchableOpacity disabled={!refresh} style={styles.resendButton}>
        <Text style={styles.text}>{t('codeVerificationComponent_resendCode')}</Text>
        {refresh ? (
          <FontAwesome name="refresh" size={29} color={COLORS.primary} />
        ) : (
          <CountdownCircleTimer
            isPlaying
            duration={45}
            initialRemainingTime={45}
            colors={COLORS.primary}
            size={30}
            strokeWidth={2}
            strokeLinecap="square"
            arialabel
            onComplete={() => setRefresh(true)}
          >
            {({ remainingTime }) => {
              return <Text>{remainingTime}</Text>;
            }}
          </CountdownCircleTimer>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default CodeVerificationComponent;

const styles = StyleSheet.create({
  codeInput: {
    textAlign: 'center',
    fontSize: 20,
  },
  text: { fontSize: 16 },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: width - 100,
    height: 50,
    borderBottomWidth: 0.2,
  },
});

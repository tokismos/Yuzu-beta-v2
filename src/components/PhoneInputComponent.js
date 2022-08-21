import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const { width } = Dimensions.get('window');

const PhoneInputComponent = ({ setCountryCode, style, error, setPhoneNumber }) => {
  const { t } = useTranslation();
  return (
    <View style={[{ width, alignItems: 'center' }, { ...style }]}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 22,
          margin: 20,
          textAlign: 'center',
        }}
      >
        {t('phoneInputComponent_enterPhone')}
      </Text>
      <PhoneInput
        layout="first"
        withShadow
        defaultCode="US"
        onChangeText={(text) => {
          setPhoneNumber(text);
        }}
        onChangeCountry={(text) => setCountryCode(text.callingCode)}
      />
      {error ? (
        <Text style={{ color: 'red', marginTop: 10 }}>
          {t('phoneInputComponent_wrongFormat')}
        </Text>
      ) : null}
      <View style={{ margin: 40 }}>
        <Text style={{ textAlign: 'left', color: 'gray', fontSize: 12 }}>
          {t('phoneInputComponent_confirmationDescription')}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            marginTop: 10,
            color: 'gray',
            fontSize: 12,
          }}
        >
          {t('phoneInputComponent_disclaimer')}
        </Text>
      </View>
    </View>
  );
};
export default PhoneInputComponent;

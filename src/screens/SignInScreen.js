//La possibilite de se connecter avec email ou avec google,ici on fait appel aux fonctions crees dans useAuth , pour gerer la connexion
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GoogleIcon from '../assets/GoogleIcon.svg';
import CustomButton from '../components/CustomButton';
import TextInputColored from '../components/TextInputColored';
import { COLORS } from '../consts/colors';
import useAuth from '../hooks/useAuth';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { signIn, signInWithGoogle, validateEmail } = useAuth();

  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2].name;

  const handleSignIn = async () => {
    const toCheck = validateEmail(email);

    if (toCheck) {
      await signIn(email, password)
      navigation.navigate('TinderScreen')
      ;}
    else Alert.alert(t('email_badFormat'));
  };

  return (
    <>
      <View>
        <View
          style={{
            margin: 10,
            padding: 10,
            borderColor: COLORS.primary,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            {prevRoute === 'IngredientsCartScreen'
              ? t('signinScreen_connectFor')
              : t('signinScreen_connectTo')}
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
          <TextInputColored
            label={t('password')}
            setChangeText={setPassword}
            secured
          />
          <CustomButton
            onPress={handleSignIn}
            title={t('connect')}
            style={{ alignSelf: 'center', marginTop: 20 }}
            disabled={password.length === 0}
          />

          <Pressable
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text
              style={{
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}
            >
              {t('signinScreen_forgotPassword')}
            </Text>
          </Pressable>
        </View>

       
        
        <View style={{ width: '100%', flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexGrow: 1,
                height: 0.4,
                backgroundColor: 'gray',
                alignItems: 'flex-end',
              }}
            />

            <Text
              style={{
                textAlign: 'center',
                marginHorizontal: 20,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {t('signinScree_or')}
            </Text>
            <View style={{ flexGrow: 1, height: 0.4, backgroundColor: 'gray' }} />
          </View>
          <TouchableOpacity
            activeOpacity={0.95}
            style={{
              ...styles.button,
              backgroundColor: 'white',
              alignSelf: 'center',
              elevation: 1,
            }}
            onPress={async () => {
              await signInWithGoogle();
            }}
          >
            <View style={styles.buttonContainer}>
              <GoogleIcon width={'40'} height={'40'} />
              <View style={{ width: '85%' }}>
                <Text style={{ ...styles.socialText, color: '#757575' }}>
                  {t('signinScreen_googleConnect')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>

{/* <View
            style={{
              flexDirection: 'row',
              height: 50,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexGrow: 1,
                height: 0.4,
                backgroundColor: 'gray',
                alignItems: 'flex-end',
              }}
            />

            <Text
              style={{
                textAlign: 'center',
                marginHorizontal: 20,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {t('signinScree_or')}
            </Text>
            <View style={{ flexGrow: 1, height: 0.4, backgroundColor: 'gray' }} />
          </View> */}
       
        <View style={{
        
           marginTop: 150
           }}>
            <Text
              style={{
                
                fontSize: 16,
                
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {t('signinScreen_noAccount')}
            </Text>

            <Pressable
               onPress={() => navigation.navigate('SignUpScreen')}
            
              style={{ alignSelf: 'center', marginTop: 10, backgroundColor:"green", padding:10}}
            >
              <Text style={{color:"white", fontWeight:"bold"}}>{t('signup')}</Text>
              </Pressable>
              
          </View>
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

//Le screen qui permets d'envoyer un email de feedBack lorsqu'on clique sur le bouton Feedback
// il fait appel à notre API pour pouvoir envoyer l'email

import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { api } from '../axios';
import CustomButton from '../components/CustomButton';
import TextInputColored from '../components/TextInputColored';
import { COLORS } from '../consts/colors';
import { auth } from '../helpers/db';

const { height } = Dimensions.get('screen');

const FeedBackScreen = () => {
  const [fullName, setFullName] = useState(auth().currentUser?.displayName);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const sendEmail = async (fullName, title, message) => {
    setIsLoading(true);
    try {
      await api.post('/email', { fullName, title, message });
      Alert.alert(t('feedbackScreen_messageSent'));

      setTitle('');
      setMessage('');
    } catch (e) {
      Alert.alert(t('feedbackScreen_messageError'));
    }
    setIsLoading(false);
  };
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={-300}
      style={{ flex: 1 }}
    >
      <View style={{ height }}>
        <View style={styles.backButton}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.titleText}>{t('feedbackScreen_yourFeedback')}</Text>
          <View style={styles.insideContainer}>
            {!auth().currentUser && (
              <TextInputColored
                value={fullName}
                label={t('feedbackScreen_nameAndSurname')}
                setChangeText={setFullName}
              />
            )}
            <TextInputColored
              value={title}
              label={t('feedbackScreen_messageTitle')}
              setChangeText={setTitle}
            />

            <TextInput
              style={{ height: 200 }}
              placeholder={t('feedbackScreen_messageDescription')}
              theme={{ colors: { primary: COLORS.primary } }}
              multiline
              mode="outlined"
              numberOfLines={5}
              value={message}
              onChangeText={(Description) => {
                setMessage(Description);
              }}
            />
            {message.length < 30 && (
              <Text style={{ color: 'gray', textAlign: 'center', marginTop: 10 }}>
                {t('feedbackScreen_minimumLength', {
                  min: 30 - message.length,
                })}
              </Text>
            )}

            <CustomButton
              style={{ marginTop: 15 }}
              disabled={message.length < 30}
              isLoading={isLoading}
              title={t('send')}
              onPress={() => sendEmail(fullName, title, message)}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FeedBackScreen;

const styles = StyleSheet.create({
  button: {
    width: 120,
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
    alignSelf: 'flex-end',
  },
  backButton: {
    height: '10%',
    width: '10%',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  container: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideContainer: {
    flexShrink: 1,
    backgroundColor: '#FFF1BE',
    width: '90%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 5,
    borderColor: COLORS.primary,
    padding: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: COLORS.primary,
    marginBottom: 20,
  },
});

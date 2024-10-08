//L'ecran qui gere toutes les commandes passées,CommandeItem c'est chaque component de notre liste

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getCommandes } from '../helpers/db';
import { setListNotification } from '../redux/slicer/notificationSlicer';

const { width } = Dimensions.get('screen');
const CommandeItem = ({ item }) => {
  const navigation = useNavigation();
  const time = new Date(item.dateTime);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('InfoCommandeScreen', { historyDetail: item })
      }
      android_ripple={{ color: 'lightgray' }}
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        width: width * 0.9,
        alignSelf: 'center',
        marginVertical: 10,
        flexDirection: 'row',
      }}
    >
      <View style={{ width: '90%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
          {formatRelative(time, new Date(), { locale: fr })}
        </Text>
        {item.recipes.map((elmt, i) => {
          return (
            <Text key={i} style={{ marginLeft: 5 }}>
              - {elmt.name} ( {elmt.nbrPersonne} personnes )
            </Text>
          );
        })}
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <MaterialIcons name="keyboard-arrow-right" size={50} color="black" />
      </View>
    </Pressable>
  );
};

const CommandesScreen = () => {
  const [commandes, setCommandes] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setListNotification(null));
    getCommandes(setCommandes);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        {commandes.map((item, i) => {
          return <CommandeItem item={item} key={i} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommandesScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

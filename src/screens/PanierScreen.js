//L'ecran où on choisit les differents ingredient qu'on veut, la logique derriere c'est qu'on recupere les differents ingredients
// depuis la Base de données, et on ajoute un champ qui est isChecked, quand on clique sur un ingredient isChecked est true sinon c'est false,
// et à la fin lorsqu'on clique sur creer la liste de recette,on parcours tous les ingredients avec ichecked true pour qu'on filtre ceux qui
// ne sont pas checkés, et on ne garde que ceux checkés

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import CartComponent from '../components/CartComponent';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../consts/colors';

const PanierScreen = ({ navigation }) => {
  const { matches } = useSelector((state) => state.matchStore);
  const [finalCart, setFinalCart] = useState([
    ...matches.map((i) => ({ ...i, isChecked: true })),
  ]);
  const { t } = useTranslation();

  const validate = () => {
    //Filter just the items in cart which are checked
    const checkedCart = finalCart.filter((item) => item.isChecked === true);
    //Change the quantity of every item in the cart
    checkedCart.forEach((item) => {
      const newQuantity = item.ingredients.map((elmt) => {
        const tmp = { ...elmt };
        //it's matche[index] and not tmp or finalCart ,because it had a bug when u would return after click on validate , the quantity change again
        tmp.newQuantity = +(
          (tmp.quantity * item.nbrPersonne) /
          item.defaultNbrPersonne
        ).toFixed(1);
        return { ...tmp };
      });
      item.ingredients = newQuantity;
    });
    if (checkedCart.length === 0) {
      return Toast.show(t('panierScreen_atLeastOneRecipe'), Toast.LONG);
    }
    navigation.navigate('IngredientsCartScreen', { cart: checkedCart });
  };
  //when click on recipe we check if it exist to remove it or if not to add id
  const onPress = (item, index) => {
    //when we click we change the value to the opposite of isChecked
    setFinalCart((p) => {
      const tmp = JSON.parse(JSON.stringify(p));
      tmp[index].isChecked = !tmp[index].isChecked;
      return [...tmp];
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>{t('panierScreen_selectedRecipes')}</Text>
      <ScrollView>
        <View style={{ width: '100%' }}>
          <View style={{}}>
            {finalCart.map((item, index) => (
              <CartComponent
                index={index}
                item={item}
                key={item.name}
                onPress={() => onPress(item, index)}
                setFinalCart={setFinalCart}
                finalCart={finalCart}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <CustomButton
          onPress={() => navigation.goBack()}
          title={t('panierScreen_addRecipes')}
          style={{
            ...styles.buttonContainer,
            backgroundColor: '#E3e3e3',
            borderRadius: 0,
          }}
          textStyle={{ fontWeight: '800', fontSize: 18, color: 'black' }}
        />
        <CustomButton
          disabled={finalCart.length === 0}
          onPress={validate}
          title={t('panierScreen_validate')}
          style={{
            ...styles.buttonContainer,
            backgroundColor: COLORS.primary,
            borderRadius: 0,
          }}
          textStyle={{ fontSize: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PanierScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#E3E3E3',

    height: '40%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: '100%',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  bottomContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '20%',
  },
  headerContainer: { backgroundColor: 'red', height: '15%', width: '100%' },
});

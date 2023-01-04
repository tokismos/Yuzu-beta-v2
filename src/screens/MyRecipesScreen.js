//L'Ecran des recettes commandées et des recettes mis en favoris.Ici la logique que c'Est suivi c'est j'ai utilisé
// la me epage pour deux composants, si le nom de la page est Recette Favories alors on montre le component des favoris
// snn on montre le componant des recettes commandés

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFavoris, getCommandes } from '../helpers/db';
import { setCuisineNotification } from '../redux/slicer/notificationSlicer';

const { width } = Dimensions.get('screen');

const Skeleton = ({ title }) => {
  return (
    <SkeletonPlaceholder>
      {title ? (
        <View
          style={{
            width: width - 100,
            height: 30,
            marginLeft: 5,
            marginVertical: 10,
            marginBottom: 0,
            alignSelf: 'flex-start',
          }}
        />
      ) : (
        <View />
      )}
      <View
        style={{
          width: '90%',
          marginVertical: 10,
          flexDirection: 'row',
          backgroundColor: 'white',
          borderRadius: 10,
          alignSelf: 'center',
        }}
      >
        <View style={{ width: width * 0.35, aspectRatio: 1 }} />
        <View style={{ marginLeft: 20 }}>
          <View style={{ width: 120, height: 20, borderRadius: 4 }} />
          <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const CommandeItem = ({ recipe }) => {
  const navigation = useNavigation();
  
  return (
    <Pressable
      android_ripple={{ color: '#d3d3d3', foreground: true }}
      onPress={() => navigation.navigate('IngredientScreen', { _id: recipe._id, })}
      style={{
        width: '90%',
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          width: width * 0.35,
          borderRadius: 10,
        }}
      >
        <FastImage
          style={{ aspectRatio: 1 }}
          source={{
            uri: recipe.imgURL,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
          {recipe.name}
        </Text>
      </View>
      <View
        style={{
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
      </View>
    </Pressable>
  );
};

const MyRecipesScreen = ({ route }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favorites } = useSelector((state) => state.favoritesStore);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialize = async () => {
    if (route.name == 'Recettes favories') {
    await getAllFavoris(setRecipes)
      setIsLoading(false);
    } else {
      await getCommandes(setRecipes);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    dispatch(setCuisineNotification(null));
    initialize();
  }, []);

  const CommandeComponent = ({ item, dateTime }) => {
    let time = new Date(dateTime);

    return (
      <View
        style={{
          width: '100%',
          marginVertical: 10,
          justifyContent: 'center',
        }}
      >
        {route.name != 'Recettes favories' && (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 5,
              color: 'gray',
            }}
          >
            {formatRelative(time, new Date(), { locale: fr })}
          </Text>
        )}
        {item.map((elmt, i) => {
          return <CommandeItem recipe={elmt} key={i} />;
        })}
      </View>
    );
  };
  return (
    <>
      <StatusBar backgroundColor="transparent" />

      {isLoading ? (
        <View style={{}}>
          <Skeleton title={true} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </View>
      ) : (
        <>
          {route.name != 'Recettes favories' ? (
            <ScrollView style={{ flex: 1 }}>
              <View style={{ alignItems: 'center', height: '90%', marginTop: 10 }}>
                {recipes.map((item, i) => {
                  return (
                    <CommandeComponent
                      item={item.recipes}
                      dateTime={item.dateTime}
                      key={i}
                    />
                  );
                })}
              </View>
            </ScrollView>
          ) : favorites.length != 0 ? (
            <ScrollView style={{ flex: 1 }}>
              <View style={{ alignItems: 'center', height: '90%', marginTop: 10 }}>
                {recipes.map((item, i) => {
                  return <CommandeItem recipe={item} key={i} />;
                })}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>{t('myRecipesScreen_noFavorite')}</Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default MyRecipesScreen;

//La page  quand on clique sur le 'i' dans la premiere page,c'est ici qu'on trouve toutes les etapes ainsi qu'ingredients
//Avant le chargement de cette page, on recupere les favoris a partir de notre redux store, et si l'id de ce dernier existe
//on montre le bouton supprimer des favoris,sinon ajouter aux favoris.

import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from '../axios';
import CustomButton from '../components/CustomButton';
import IngredientComponent from '../components/IngredientComponent';
import ReportComponent from '../components/ReportComponent';
import { COLORS } from '../consts/colors';
import { addToFav, deleteFav } from '../helpers/db';
import { addFavorite, deleteFavorite } from '../redux/slicer/favoritesSlicer';

const { height, width } = Dimensions.get('screen');

const StepComponent = ({ step, index }) => {
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation();

  return (
    <View
      style={{
        width: width * 0.9,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 5,
        marginVertical: 10,
        borderRadius: 5,
      }}
    >
      <TouchableOpacity style={{}} onPress={() => setToggle((p) => !p)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, color: 'gray', fontWeight: 'bold' }}>
            {t('ingredientScreen_step', { step: index + 1 })}
          </Text>
          <CheckBox
            style={[
              {
                transform: [{ scale: 0.8 }],
              },
            ]}
            onTintColor={COLORS.primary}
            onFillColor={COLORS.primary}
            onCheckColor={'white'}
            onAnimationType="fill"
            offAnimationType="fade"
            boxType="square"
            disabled
            value={toggle}
            tintColors={{ true: COLORS.primary, false: 'gray' }}
          />
        </View>

        {!toggle && (
          <Animated.View entering={FadeInLeft}>
            <Text style={{ marginLeft: '5%' }}>{step}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const NbrPersonneComponent = ({ nbrPersonne, setNbrPersonne }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10%',
      }}
    >
      <TouchableOpacity
        style={{ padding: 10, marginRight: '-15%' }}
        onPress={() => {
          if (nbrPersonne < 2) return;

          setNbrPersonne((p) => p - 1);
        }}
      >
        <AntDesign name="minuscircleo" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: 5 }}>
        {nbrPersonne}
      </Text>
      <MaterialCommunityIcons
        name="human-male"
        size={24}
        color="black"
        style={{ marginRight: 5 }}
      />
      <TouchableOpacity
        style={{ padding: 10, marginLeft: '-15%' }}
        onPress={() => {
          
          setNbrPersonne((p) => p + 1);
        }}
      >
        <AntDesign name="pluscircleo" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const ImageFast = ({ source, thumb, height }) => {
  const imageStyle = {
    aspectRatio: 1,
    background: 'transparent',
    top: 0,
    left: 0,
    position: 'absolute',
    height,
    width: '100%',
  };
  return (
    <View style={{ height, backgroundColor: 'lightgrey' }}>
      <ActivityIndicator style={imageStyle} size={'large'} color={COLORS.primary} />
      <FastImage
        source={{ uri: thumb, priority: FastImage.priority.high }}
        style={imageStyle}
      />
      <FastImage
        source={{ uri: source, priority: FastImage.priority.high }}
        style={imageStyle}
      />
    </View>
  );
};

const IngredientScreen = ({ route, navigation }) => {
  const [recipe, setRecipe] = useState();
  const [nbr, setNbr] = useState(+route.params.recipe?.nbrPersonne);
  const [isLoading, setIsLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const { favorites } = useSelector((state) => state.favoritesStore);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (route.params.recipe) {
      setRecipe(route.params.recipe);
      setIsLoading(false);
    } else {
      getRecipe(route.params._id).then((res) => {
        setNbr(+res.nbrPersonne);
        setRecipe(res);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{ flex: 1, width }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: 40,
              left: 20,
              zIndex: 99,
              backgroundColor: 'white',
              borderRadius: 30,
            }}
          >
            <AntDesign name="arrowleft" size={40} color="black" />
          </TouchableOpacity>
          <Dialog
            visible={showReport}
            onTouchOutside={() => {
              setShowReport(false);
            }}
            dialogAnimation={
              new SlideAnimation({
                slideFrom: 'bottom',
              })
            }
            onHardwareBackPress={() => true}
          >
            <DialogContent>
              <ReportComponent
                setShowReport={setShowReport}
                recipeName={recipe?.name}
              />
            </DialogContent>
          </Dialog>
          <ScrollView
            overScrollMode="never"
            style={{ backgroundColor: '#E6E6E6', flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <ImageFast
                source={recipe?.imgURL}
                thumb={recipe?.thumbURL}
                height={400}
              />
              <View
                style={{
                  height: height * 0.3,
                  marginBottom: 20,
                  backgroundColor: 'black',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      margin: 10,
                      color: 'white',
                      flex: 1,
                    }}
                  >
                    {recipe?.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '80%',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', marginRight: 5 }}>
                      {recipe.stats?.nbrRight}
                    </Text>
                    <AntDesign name="heart" size={14} color={COLORS.primary} />
                  </View>
                  <Text style={{ fontSize: 18, color: 'white' }}>
                    {recipe?.tempsPreparation + recipe?.tempsCuisson} min
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', marginRight: 5 }}>
                      N/A
                    </Text>
                    <AntDesign name="star" size={15} color={COLORS.primary} />
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    height: height * 0.08,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {t('ingredientScreen_recipe')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    justifyContent: 'space-evenly',
                    backgroundColor: 'black',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,

                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {t('ingredientScreen_difficultyLevel', {
                      difficulty: recipe?.difficulty,
                    })}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,

                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {t('ingredientScreen_preparationDuration', {
                      duration: recipe?.tempsPreparation,
                    })}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,

                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {t('ingredientScreen_cookingDuration', {
                      duration: recipe?.tempsCuisson,
                    })}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '95%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity onPress={() => setShowReport(true)}>
                  <MaterialIcons
                    name="report"
                    size={30}
                    color={COLORS.red}
                    style={{ padding: 5 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginLeft: '7%',
                  }}
                >
                  Ingrédients
                </Text>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <NbrPersonneComponent nbrPersonne={nbr} setNbrPersonne={setNbr} />
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  borderRadius: 5,
                  padding: 10,
                }}
              >
                {recipe?.ingredients?.map((item, index) => {
                  return (
                    <IngredientComponent
                      ingredient={item}
                      key={index}
                      nbrPersonne={nbr || 0}
                      defaultNbrPersonne={recipe?.nbrPersonne || 0}
                    />
                  );
                })}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 10,
                    flex: 1,
                  }}
                />
                <Text style={{ fontSize: 20, margin: 20, fontWeight: 'bold' }}>
                  {t('ingredientScreen_recipeSteps')}
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 10,
                    flex: 1,
                  }}
                />
              </View>
              {recipe?.steps?.map((item, index) => {
                return <StepComponent step={item} index={index} key={index} />;
              })}

              {favorites.includes(route.params._id ?? route.params.recipe._id) ? (
                <CustomButton
                  style={{
                    width: '60%',
                    marginBottom: 5,
                    marginTop: 10,
                    backgroundColor: COLORS.red,
                  }}
                  textStyle={{ fontSize: 18 }}
                  title={t('ingredientScreen_deleteToFavorites')}
                  onPress={() => {
                    deleteFav(recipe._id);
                    dispatch(deleteFavorite(recipe._id));
                  }}
                />
              ) : (
                <CustomButton
                  style={{ width: '60%', marginBottom: 5, marginTop: 10 }}
                  textStyle={{ fontSize: 18 }}
                  title={t('ingredientScreen_addToFavorites')}
                  onPress={() => {
                    addToFav(
                      recipe._id,
                      recipe.imgURL,
                      recipe.name,
                      recipe.dateTime
                    );
                    dispatch(addFavorite(recipe._id));
                  }}
                />
              )}
            </View>
            {route.params._id && (
              <>
                <Dialog
                  visible={showVote}
                  onTouchOutside={() => {
                    setShowVote(false);
                  }}
                  dialogAnimation={
                    new SlideAnimation({
                      slideFrom: 'bottom',
                    })
                  }
                  onHardwareBackPress={() => true}
                >
                  <DialogContent>
                    <View style={{ padding: 20 }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          textAlign: 'center',
                        }}
                      >
                        {t('ingredientScreen_didYouLiked')}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: height * 0.1,
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}
                      >
                        <TouchableOpacity onPress={() => setShowVote(false)}>
                          <AntDesign name="like2" size={50} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowVote(false)}>
                          <AntDesign name="dislike2" size={50} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </DialogContent>
                </Dialog>
                <CustomButton
                  style={{ width: '60%', marginBottom: 20 }}
                  textStyle={{ fontSize: 18 }}
                  title={t('ingredientScreen_haveCooked')}
                  onPress={() =>
                    navigation.navigate('RateScreen', {
                      imgURL: recipe?.imgURL,
                      id: recipe?._id,
                      name: recipe?.name,
                    })
                  }
                />
              </>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default IngredientScreen;

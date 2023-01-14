// Tout simplement c'est ici ou on gere tous les screens de la navigation

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../consts/colors';
import { setUser } from '../redux/slicer/userSlicer';
// import AbonnementScreen from '../screens/AbonnementScreen';
// import AbonnementSecondScreen from '../screens/AbonnementSecondScreen';
import AccountDeletion from '../screens/AccountDeletion';
import CommandesScreen from '../screens/CommandesScreen';
import SignUpScreen from '../screens/createAccountScreens/SignUpScreen';
import FeedBackScreen from '../screens/FeedBackScreen';
import FilterScreen from '../screens/FilterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import InfoCommandeScreen from '../screens/InfoCommandeScreen';
import IngredientCartScreen from '../screens/IngredientCartScreen';
import IngredientScreen from '../screens/IngredientScreen';
import IntroScreen from '../screens/IntroScreen';
import MyRecipesScreen from '../screens/MyRecipesScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import PanierScreen from '../screens/PanierScreen';
import PhoneScreen from '../screens/PhoneScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RateScreen from '../screens/RateScreen';
import SearchRecipesScreen from '../screens/SearchRecipesScreen/SearchRecipesScreen';
import SignInScreen from '../screens/SignInScreen';
import SummarizeScreen from '../screens/SummarizeScreen';
import TinderScreen from '../screens/TinderScreen';

const TopTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const MyRecipesTabScreen = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: COLORS.secondary,

        tabBarStyle: {
          backgroundColor: COLORS.primary,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? 'white' : COLORS.secondary}
              name="format-list-bulleted-square"
              size={30}
            />
          ),
        }}
        name={t('myReceipesTabScreen_receipeAdded')}
        component={MyRecipesScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="heart"
              size={24}
              color={focused ? 'white' : COLORS.secondary}
            />
          ),
        }}
        name={t('myReceipesTabScreen_favourites')}
        component={MyRecipesScreen}
      />
    </Tab.Navigator>
  );
};

const TopTabScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <TopTab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            backgroundColor: COLORS.primary,
            marginTop: StatusBar.currentHeight,
          },
          tabBarPressOpacity: 0.1,
          tabBarIndicatorStyle: { backgroundColor: 'white' },
          tabBarLabelStyle: { fontWeight: 'bold', fontSize: 14 },
        }}
      >
        <TopTab.Screen name={t('navigator_myRecipes')} component={MyRecipesScreen} />
        <TopTab.Screen
          name={t('navigator_favourites')}
          component={MyRecipesScreen}
        />
      </TopTab.Navigator>
    </SafeAreaView>
  );
};

const BottomTabScreen = () => {
  const { t } = useTranslation();
  const { listNotification, cuisineNotification } = useSelector(
    (state) => state.notificationStore
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: 'true',
        
      }}
    >
      <Tab.Screen
      
        options={{
          tabBarIconStyle:{marginHorizontal:20},
          tabBarLabelStyle:{marginHorizontal:20},
          tabBarIcon: ({ focused }) => {
            const iconYellow = Image.resolveAssetSource(
              require('../assets/platJ.png')
            ).uri;
            const iconGrey = Image.resolveAssetSource(
              require('../assets/platN.png')
            ).uri;
            const icon = focused ? iconYellow : iconGrey;
            return (
              <FastImage
                source={{
                  uri: icon,
                  priority: FastImage.priority.high,
                }}
                style={styles.imageIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.primary : 'black',
                fontWeight: focused ? 'bold' : null,
              }}
            >
              {t('navigator_recipes')}
            </Text>
          ),
        }}
        name="Recettes"
        component={TinderScreen}
      />
      <Tab.Screen
        options={{
          tabBarIconStyle:{marginHorizontal:20},
          tabBarLabelStyle:{marginHorizontal:20},
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            const iconYellow = Image.resolveAssetSource(
              require('../assets/loupeJ.png')
            ).uri;
            const iconGrey = Image.resolveAssetSource(
              require('../assets/loupeN.png')
            ).uri;
            const icon = focused ? iconYellow : iconGrey;
            return (
              <FastImage
                source={{
                  uri: icon,
                  priority: FastImage.priority.high,
                }}
                style={styles.imageIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.primary : 'black',
                fontWeight: focused ? 'bold' : null,
              }}
            >
              {t('navigator_search')}
            </Text>
          ),
        }}
        name="SearchRecipesScreen"
        component={SearchRecipesScreen}
      />
      <Tab.Screen
      style={{ backgroundColor:'red'}}
        options={{
          tabBarIconStyle:{marginHorizontal:20},
          tabBarLabelStyle:{marginHorizontal:20},
          tabBarBadge: listNotification,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.red,
            top: 0,
            transform: [{ scale: 0.5 }],
            
          },
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          title: t('navigator_myShoppingList'),
          tabBarIcon: ({ focused }) => {
            const iconYellow = Image.resolveAssetSource(
              require('../assets/okJ.png')
            ).uri;
            const iconGrey = Image.resolveAssetSource(
              require('../assets/okN.png')
            ).uri;
            const icon = focused ? iconYellow : iconGrey;
            return (
              <FastImage
                source={{
                  uri: icon,
                  priority: FastImage.priority.high,
                }}
                style={styles.imageIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.primary : 'black',
                fontWeight: focused ? 'bold' : null,
              }}
            >
              {t('navigator_list')}
            </Text>
          ),
        }}
        name="Liste de courses"
        component={CommandesScreen}
      />

      <Tab.Screen
        options={{
          tabBarIconStyle:{marginHorizontal:20},
          tabBarLabelStyle:{marginHorizontal:20},
          tabBarBadge: cuisineNotification,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.red,
            top: 0,
            transform: [{ scale: 0.5 }],
          },
          tabBarIcon: ({ focused }) => {
            const iconYellow = Image.resolveAssetSource(
              require('../assets/cutJ.png')
            ).uri;
            const iconGrey = Image.resolveAssetSource(
              require('../assets/cutN.png')
            ).uri;
            const icon = focused ? iconYellow : iconGrey;
            return (
              <FastImage
                source={{
                  uri: icon,
                  priority: FastImage.priority.high,
                }}
                style={{ ...styles.imageIcon, height: 30, width: 30 }}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.primary : 'black',
                fontWeight: focused ? 'bold' : null,
              }}
            >
              {t('navigator_toKitchen')}
            </Text>
          ),
        }}
        name="En cuisine"
        component={TopTabScreen}
      />
    </Tab.Navigator>
  );
};

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts: { screen }, next, inverted }) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
        : 0
    );
    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  screen.width, // Focused, but offscreen in the beginning
                  0, // Fully focused
                  -screen.width, // Fully unfocused
                ],
                extrapolate: 'clamp',
              }),
              inverted
            ),
          },
        ],
      },
    };
  },
};

const StackScreen = () => {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TinderScreen"
          component={BottomTabScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="IntroScreen"
          component={IntroScreen}
        />
        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AbonnementSecondScreen"
          component={AbonnementSecondScreen}
        /> */}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="OnBoardingScreen"
          component={OnBoardingScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: t('accountDeletionScreen_title'),
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          name="AccountDeletion"
          component={AccountDeletion}
        />
        <Stack.Screen
          options={{
            ...horizontalAnimation,
            headerShown: true,
            headerTitleAlign: 'center',
            title: 'Reinitialiser mot de passe',
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerTitleStyle: {
              fontSize: 18,
              color: 'white',
            },
          }}
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AbonnementScreen"
          component={AbonnementScreen}
        /> */}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RateScreen"
          component={RateScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          name="InfoCommandeScreen"
          component={InfoCommandeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Mes recettes',
            headerTitleAlign: 'center',
            headerTintColor: 'white',

            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          name="MyRecipesScreen"
          component={MyRecipesTabScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Liste de courses',
            headerTitleAlign: 'center',
            headerTintColor: 'white',

            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          name="CommandesScreen"
          component={CommandesScreen}
        />
        <Stack.Screen
          options={{ headerShown: false ,  headerLeft: null,}}
          name="PanierScreen"
          component={PanierScreen}
        />
        <Stack.Screen
          options={{
            ...horizontalAnimation,
            title: 'Les Ingredients',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
            headerBackTitleVisible: false,
          }}
          name="IngredientsCartScreen"
          component={IngredientCartScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FeedBackScreen"
          component={FeedBackScreen}
        />
        <Stack.Screen
          options={{
            ...horizontalAnimation,
          }}
          name="SummarizeScreen"
          component={SummarizeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignUpScreen"
          component={SignUpScreen}
        />
         <Stack.Screen
          options={{
            ...horizontalAnimation,
            headerShown: true,
            headerTitleAlign: 'center',
            title: t('introScreen_login'),
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 22,
              color: 'white',
            },
            headerBackTitleVisible: false,


          }}
          name="SignInScreen"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FilterScreen"
          component={FilterScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Modifier mon numéro',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          name="PhoneScreen"
          component={PhoneScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: t('profileScreen_title'),
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="SearchRecipesScreen"
          options={{
            headerShown: true,
            headerTitle: t('searchRecipeScreen_title'),
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          component={SearchRecipesScreen}
        />
         <Stack.Screen
          options={{
            ...horizontalAnimation,
            headerShown: false,
          }}
          name="TinderScreen2"
          component={TinderScreen}
        />
         <Stack.Screen
          options={{
            ...horizontalAnimation,
            headerShown: false,
          }}
          name="IngredientScreen"
          component={IngredientScreen}
        />
       
      </Stack.Navigator>
      <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="FeedBackScreen"
          component={FeedBackScreen}
        />
        <Stack.Screen
          options={{
            ...horizontalAnimation,
          }}
          name="SummarizeScreen"
          component={SummarizeScreen}
        />
    </NavigationContainer>
  );
};


const RootNavigation = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userStore);

  const config = {
    webClientId:
      '246034960415-88hrrb30cvbficqm01le7hh121juj8jl.apps.googleusercontent.com',

    scopes: ['profile', 'email'],
    permissions: ['public_profile', 'location', 'email'],
    offlineAccess: true,
  };

  useEffect(() => {
    GoogleSignin.configure(config);

    const sub = auth().onAuthStateChanged(async (userInfo) => {
      if (userInfo) {
        dispatch(
          setUser({
            uid: userInfo.uid,
            displayName: userInfo.displayName,
            email: userInfo.email, //if we log with FB we get the info
            photoURL: userInfo.photoURL,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return sub;
  }, []);

  return (
    <>
      <StackScreen /> 
    </>
  )
};

export default RootNavigation;

const styles = StyleSheet.create({
  imageIcon: {
    width: 25,
    height: 25,
  },
});

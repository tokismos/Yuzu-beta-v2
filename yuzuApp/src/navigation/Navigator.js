// Tout simplement c'est ici ou on gere tous les screens de la navigation

import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { COLORS } from "../consts/colors";
import IngredientScreen from "../screens/IngredientScreen";
import TinderScreen from "../screens/TinderScreen";
import PanierScreen from "../screens/PanierScreen";
import IngredientCartScreen from "../screens/IngredientCartScreen";
import SummarizeScreen from "../screens/SummarizeScreen";
import IntroScreen from "../screens/IntroScreen";
const Stack = createStackNavigator();
import Recipe from "../assets/recipe.svg";
import ProfileIcon from "../assets/profile.svg";
import MyRecipes from "../assets/MyRecipes.svg";
const Tab = createBottomTabNavigator();
import { setUser } from "../redux/slicer/userSlicer";
import { useDispatch, useSelector } from "react-redux";
import SignUpScreen from "../screens/createAccountScreens/SignUpScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import FeedBackScreen from "../screens/FeedBackScreen";
import SignInScreen from "../screens/SignInScreen";
import PhoneScreen from "../screens/PhoneScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import CommandesScreen from "../screens/CommandesScreen";
import InfoCommandeScreen from "../screens/InfoCommandeScreen";
import FilterScreen from "../screens/FilterScreen";
import RateScreen from "../screens/RateScreen";

const TopTab = createMaterialTopTabNavigator();

export const MyRecipesTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: COLORS.secondary,

        tabBarStyle: {
          backgroundColor: COLORS.primary,
        },
        tabBarLabelStyle: {
          // color: "black",
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? "white" : COLORS.secondary}
              name="format-list-bulleted-square"
              size={30}
            />
          ),
        }}
        name="Recettes ajoutées"
        component={MyRecipesScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="heart"
              size={24}
              color={focused ? "white" : COLORS.secondary}
            />
          ),
        }}
        name="Recettes favories"
        component={MyRecipesScreen}
      />
    </Tab.Navigator>
  );
};
const TopTabScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            marginTop: StatusBar.currentHeight,
          },
          tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 14 },
        }}
      >
        <TopTab.Screen name="Mes recettes" component={MyRecipesScreen} />
        <TopTab.Screen name="Recettes favories" component={MyRecipesScreen} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
};
const BottomTabScreen = () => {
  const { listNotification, cuisineNotification } = useSelector(
    (state) => state.notificationStore
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {},
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Recipe
              width={"100%"}
              height={"100%"}
              fill={focused ? COLORS.primary : "gray"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.primary : "gray",
                fontWeight: focused ? "bold" : null,
              }}
            >
              Recettes
            </Text>
          ),
        }}
        name="Recettes"
        component={TinderScreen}
      />
      <Tab.Screen
        options={{
          tabBarBadge: listNotification,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.red,
            top: 0,
            transform: [{ scale: 0.5 }],
          },
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="list"
              size={30}
              color={focused ? COLORS.primary : "gray"}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{
                color: focused ? COLORS.primary : "gray",
                fontWeight: focused ? "bold" : null,
              }}
            >
              Courses
            </Text>
          ),
        }}
        name="Liste de courses"
        component={CommandesScreen}
      />

      <Tab.Screen
        options={{
          tabBarBadge: cuisineNotification,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.red,
            top: 0,
            transform: [{ scale: 0.5 }],
          },
          tabBarIcon: ({ focused }) => (
            <MyRecipes
              width={"90%"}
              height={"90%"}
              fill={focused ? COLORS.primary : "gray"}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{
                color: focused ? COLORS.primary : "gray",
                fontWeight: focused ? "bold" : null,
              }}
            >
              En cuisine
            </Text>
          ),
        }}
        name="En cuisine"
        component={TopTabScreen}
      />
      {auth().currentUser && (
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <ProfileIcon
                width={"90%"}
                height={"90%"}
                fill={focused ? COLORS.primary : "gray"}
              />
            ),
            tabBarLabel: ({ focused, color, size }) => (
              <Text
                style={{
                  color: focused ? COLORS.primary : "gray",
                  fontWeight: focused ? "bold" : null,
                }}
              >
                Mon profil
              </Text>
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      )}
    </Tab.Navigator>
  );
};
const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts: { screen }, next, inverted }) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
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
                extrapolate: "clamp",
              }),
              inverted
            ),
          },
        ],
      },
    };
  },
};

const LoggedStackScreen = () => {
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
          name="RateScreen"
          component={RateScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "white",

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
            headerTitle: "Mes recettes",
            headerTitleAlign: "center",
            headerTintColor: "white",

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
            headerTitle: "Liste de courses",
            headerTitleAlign: "center",
            headerTintColor: "white",

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
          options={{}}
          name="PanierScreen"
          component={PanierScreen}
        />
        <Stack.Screen
          options={{
            ...horizontalAnimation,
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
          name="IngredientScreen"
          component={IngredientScreen}
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
            headerShown: false,
          }}
          name="FilterScreen"
          component={FilterScreen}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Modifier mon numéro",
            headerTitleAlign: "center",
            headerTintColor: "white",

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
            headerTitle: "Mon profile",
            headerTitleAlign: "center",
            headerTintColor: "white",

            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          name="Mon profile"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LoginStackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, tabBarStyle: { height: 120 } }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="IntroScreen"
          component={IntroScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RateScreen"
          component={RateScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TinderScreen"
          component={BottomTabScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Modifier mon numéro",
            headerTitleAlign: "center",
            headerTintColor: "white",

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
            headerShown: false,
          }}
          name="FilterScreen"
          component={FilterScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "white",

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
            headerTitle: "Mes recettes",
            headerTitleAlign: "center",
            headerTintColor: "white",

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
            ...horizontalAnimation,
            headerShown: false,
          }}
          name="SignInScreen"
          component={SignInScreen}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Mon profile",
            headerTitleAlign: "center",
            headerTintColor: "white",

            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          name="Mon profile"
          component={ProfileScreen}
        />

        <Stack.Screen
          options={{
            ...horizontalAnimation,
            headerShown: false,
          }}
          name="SignUpScreen"
          component={SignUpScreen}
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

        <Stack.Screen
          options={{
            headerLeft: null,
          }}
          name="PanierScreen"
          component={PanierScreen}
        />
        <Stack.Screen
          options={{
            ...horizontalAnimation,
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
            headerShown: true,
            headerTitle: "Liste de courses",
            headerTitleAlign: "center",
            headerTintColor: "white",

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
          options={{
            ...horizontalAnimation,
          }}
          name="SummarizeScreen"
          component={SummarizeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const RootNavigation = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userStore);

  const config = {
    webClientId:
      "246034960415-88hrrb30cvbficqm01le7hh121juj8jl.apps.googleusercontent.com",

    scopes: ["profile", "email"],
    permissions: ["public_profile", "location", "email"],
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
            //    phoneNumber: additionalInfo,
            photoURL: userInfo.photoURL,
          })
        );
      } else {
        console.log("no user");

        dispatch(setUser(null));
      }
    });
    return sub;
  }, []);

  return <>{user ? <LoggedStackScreen /> : <LoginStackScreen />}</>;
};
export default RootNavigation;
const styles = StyleSheet.create({});

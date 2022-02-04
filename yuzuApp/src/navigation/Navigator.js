import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import auth from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";

import { COLORS } from "../consts/colors";
import IngredientScreen from "../screens/IngredientScreen";
import TinderScreen from "../screens/TinderScreen";
import PanierScreen from "../screens/PanierScreen";
import IngredientCartScreen from "../screens/IngredientCartScreen";
import HeaderComponent from "../components/HeaderComponent";
import SummarizeScreen from "../screens/SummarizeScreen";
import IntroScreen from "../screens/IntroScreen";

const Stack = createStackNavigator();
const LoginStac = createStackNavigator();
const Tab = createBottomTabNavigator();
import { setUser, setAccessToken } from "../redux/slicer/userSlicer";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
// import { GraphRequest, GraphRequestManager } from "react-native-fbsdk-next";
import SignUpScreen from "../screens/createAccountScreens/SignUpScreen";
import PasswordScreen from "../screens/createAccountScreens/PasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import FeedBackScreen from "../screens/FeedBackScreen";
import SignInScreen from "../screens/SignInScreen";
import PhoneScreen from "../screens/PhoneScreen";
import MyRecipesScreen from "../screens/MyRecipesScreen";
import CommandesScreen from "../screens/CommandesScreen";
import InfoCommandeScreen from "../screens/InfoCommandeScreen";

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
  const [accessTokenFb, setAccessTokenFb] = useState(null);
  const [info, setInfo] = useState(null);
  const dispatch = useDispatch();
  // const { accessTokenFb } = useSelector((state) => state.userStore);

  //Get the information from the token we get after connecting to fb
  // const getInfoFromTokenFb = (token) => {
  //   const PROFILE_REQUEST_PARAMS = {
  //     fields: {
  //       string: "id,name,first_name,last_name,email,picture.type(large)",
  //     },
  //   };
  //   const profileRequest = new GraphRequest(
  //     "/me",
  //     { token, parameters: PROFILE_REQUEST_PARAMS },
  //     (error, user) => {
  //       if (error) {
  //         console.log("login info has error: " + error);
  //       } else {
  //         setInfo(user);
  //       }
  //     }
  //   );
  //   new GraphRequestManager().addRequest(profileRequest).start();
  // };

  //Get the access Token of Fb from the storage if it exists
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessTokenFb");
        if (accessToken !== null) {
          setAccessTokenFb(accessToken);
        } else {
          console.log("noo toooken");
        }
      } catch (e) {
        // error reading value
      }
    };
    getAccessToken();
  }, []);

  //Get the authenticated user and set it to the redux store in user state

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!HADCHI N9DER NHTAJO MNB3D!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // useEffect(() => {
  //   const func = async () => {
  //     const user = await auth().currentUser;
  //     console.log("hna UUUUUUSERRR0", user);
  //     const userObj = {
  //       uid: user.uid,
  //       displayName: user.displayName,
  //       email: info ? info.email : user.email, //if we log with FB we get the info
  //       phoneNumber: user.phoneNumber,
  //       photoURL: info ? info.picture.data.url : user.photoURL,
  //     };

  //     dispatch(setUser(userObj));
  //   };
  //   func();
  // }, [info]);

  //Get the info from facebook API if the access token exists in storage
  // useEffect(() => {
  //   if (accessTokenFb) {
  //     getInfoFromTokenFb(accessTokenFb);
  //     console.log("laast effect ", info);
  //   }
  // }, [accessTokenFb]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TinderScreen"
          component={TinderScreen}
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
          options={{
            header: () => <HeaderComponent page="2" />,
          }}
          name="PanierScreen"
          component={PanierScreen}
        />
        <Stack.Screen
          options={{
            ...horizontalAnimation,
            header: () => <HeaderComponent page="3" />,
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
            header: () => <HeaderComponent page="4" />,
          }}
          name="SummarizeScreen"
          component={SummarizeScreen}
        />
        <Stack.Screen
          options={{
            // header: () => <HeaderComponent page="1" />,
            headerShown: false,
          }}
          name="IngredientScreen"
          component={IngredientScreen}
        />

        <Stack.Screen
          options={{
            // header: () => <HeaderComponent page="1" />,
            headerShown: false,
          }}
          name="SignUpScreen"
          component={SignUpScreen}
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
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="IntroScreen"
          component={IntroScreen}
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
          }}
          name="PasswordScreen"
          component={PasswordScreen}
        />
        <Stack.Screen
          options={{
            ...horizontalAnimation,
            headerShown: false,
          }}
          name="TinderScreen"
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
            header: () => <HeaderComponent page="2" />,
            headerLeft: null,
          }}
          name="PanierScreen"
          component={PanierScreen}
        />
        <Stack.Screen
          options={{
            ...horizontalAnimation,
            header: () => <HeaderComponent page="3" />,
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
            header: () => <HeaderComponent page="4" />,
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
      "768418404122-out2q1cfkp99u5bs6sb5gsnhs9tl98sl.apps.googleusercontent.com",

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

  return (
    <>
      <StatusBar translucent />
      {user ? <LoggedStackScreen /> : <LoginStackScreen />}
    </>
  );
};
export default RootNavigation;
const styles = StyleSheet.create({});

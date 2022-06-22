import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import PagerView from "react-native-pager-view";
import { COLORS } from "../consts/colors";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Nope from "../assets/nope.png";
import Like from "../assets/LIKE.png";

const ROTATION = 60;
const SWIPE_VELOCITY = 800;
const AnimatedIntroCard = ({ swiped, right }) => {
  const { width: screenWidth } = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      "deg"
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      if (!right && event.translationX > 0) {
        return;
      }
      if (right && event.translationX < 0) {
        return;
      }
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }

      if (!right && event.velocityX < 0) {
        translateX.value = withSpring(
          -hiddenTranslateX,
          {
            overshootClamping: true,
          },
          () => {
            runOnJS(swiped)();
            //   runOnJS(setNextIndex)(nextIndex + 1);
          }
        );
      } else if (right && event.velocityX > 0) {
        translateX.value = withSpring(
          hiddenTranslateX,
          {
            overshootClamping: true,
          },
          () => {
            runOnJS(swiped)();
            //   runOnJS(setNextIndex)(nextIndex + 1);
          }
        );
      }

      //   translateX.value == hiddenTranslateX
      //     ? runOnJS()("right")
      //     : runOnJS(swiped)();
    },
  });
  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-50, -hiddenTranslateX / 10],
      [0, 1]
    ),
  }));
  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [50, hiddenTranslateX / 10], [0, 1]),
  }));
  const handOpacity = useAnimatedStyle(() => ({
    opacity: right
      ? interpolate(translateX.value, [0, 40], [1, 0.5])
      : interpolate(translateX.value, [-40, 0], [0.5, 1]),
  }));

  const AnimatedLottie = Animated.createAnimatedComponent(LottieView);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} style={{}}>
      <Animated.View style={[cardStyle, styles.card]}>
        {right ? (
          <Animated.Image
            source={Like}
            style={[styles.like, { left: 10 }, likeStyle]}
            resizeMode="contain"
          />
        ) : (
          <Animated.Image
            source={Nope}
            style={[
              styles.like,
              { right: 5, width: 200, height: 200 },
              nopeStyle,
            ]}
            resizeMode="contain"
          />
        )}
        <View style={{ transform: right ? [{ scaleX: -1 }] : [] }}>
          <AnimatedLottie
            autoPlay
            loop={true}
            resizeMode="cover"
            style={[
              {
                marginTop: "10%",
                height: 200,
              },

              handOpacity,
            ]}
            speed={0.8}
            source={require("../assets/SwipeLeft.json")}
          />
        </View>
        {!right ? (
          <FontAwesome
            name="close"
            size={80}
            color="white"
            style={{ margin: 20 }}
          />
        ) : (
          <FontAwesome
            name="heart"
            size={80}
            color="white"
            style={{
              right: 20,
              position: "absolute",
              bottom: 20,
            }}
          />
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default AnimatedIntroCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    height: "80%",
    width: "90%",
    justifyContent: "space-between",
    ...COLORS.shadow,
  },
  like: {
    width: 170,
    height: 170,
    position: "absolute",
    top: 100,
    zIndex: 100,
  },
});

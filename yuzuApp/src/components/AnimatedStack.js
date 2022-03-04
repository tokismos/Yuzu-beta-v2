// Cette page contient l'animation du stack du tinderScreen , le stack se compose de deux Views
// la premiere qui affiche la recipe de currentIndex,et la deuxieme qui affiche avec nextIndex,quand l'animation se termmine
// on remet sa valeur à 0 pour qu'elle retourne a sa place originale et on change son index vers le prochain
// comme ca on a une impression de plusieurs cartes alors ce n'est que 2.

import React, { useState, useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedGestureHandler,
  interpolate,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import Like from "../assets/LIKE.png";
import Nope from "../assets/nope.png";

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const AnimatedStack = (props) => {
  const { data, renderItem, onSwipeRight, onSwipeLeft } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiped, setSwipe] = useState();
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const [show, setShow] = useState(false);

  const currentProfile = data[currentIndex];
  const nextProfile = data[nextIndex];

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

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.9, 1]
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.9, 1]
    ),
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [50, hiddenTranslateX / 10], [0, 1]),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-50, -hiddenTranslateX / 10],
      [0, 1]
    ),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }

      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {
          overshootClamping: true,
        },
        () => {
          runOnJS(setCurrentIndex)(currentIndex + 1);
          runOnJS(setNextIndex)(nextIndex + 1);
        }
      );

      event.velocityX > 0
        ? runOnJS(setSwipe)("right")
        : runOnJS(setSwipe)("left");
    },
  });

  useEffect(() => {
    console.log("set to 0");
    setCurrentIndex(0);
  }, [data]);

  useEffect(() => {
    setNextIndex(currentIndex + 1);
  }, [currentIndex]);
  useEffect(() => {
    translateX.value = 0;
  }, [nextIndex]);
  useEffect(() => {
    if (swiped == "right") {
      onSwipeRight(currentProfile);
      console.log("swiped right");
      setSwipe("");
    }
    if (swiped == "left") {
      onSwipeLeft(currentProfile);
      console.log("swiped leeft");
      setSwipe("");
    }
  }, [swiped]);

  //   To show or not the oops view if theres no data or end of list
  useEffect(() => {
    if (data.length == currentIndex || data == "") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [data, currentIndex]);

  return (
    <View style={styles.root}>
      {nextProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({
              item: nextProfile,
            })}
          </Animated.View>
        </View>
      )}

      {currentProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Animated.Image
              source={Like}
              style={[styles.like, { left: 10 }, likeStyle]}
              resizeMode="contain"
            />
            <Animated.Image
              source={Nope}
              style={[
                styles.like,
                { right: 5, width: 200, height: 200 },
                nopeStyle,
              ]}
              resizeMode="contain"
            />
            {/* We added the onwspLeft and Right in render to make the current index change,there's no way to send it outside  */}
            {renderItem({
              item: currentProfile,
              onSwipeRight: () => {
                setCurrentIndex(currentIndex + 1);
                onSwipeRight(currentProfile);
              },
              onSwipeLeft: () => {
                setCurrentIndex(currentIndex + 1);
                onSwipeLeft(currentProfile);
              },
            })}
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    height: "105%",
    width: "100%",
  },
  animatedCard: {
    width: "90%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: "center",
    alignItems: "center",
  },
  like: {
    width: 170,
    height: 170,
    position: "absolute",
    top: 100,
    zIndex: 100,
  },
});

export default AnimatedStack;

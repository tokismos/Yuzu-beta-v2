import React from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { COLORS } from '../../../../consts/colors';

const { height } = Dimensions.get('screen');

const Header = ({ bottomSheetRef, navigation }) => {
  const logo = Image.resolveAssetSource(require('../../../../assets/logo.png')).uri;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          height: height * 0.06,
        }}
      >
        <FastImage
          style={{
            marginLeft: 20,
            width: 100,
            height: 55,
          }}
          source={{ uri: logo, priority: FastImage.priority.high }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: height * 0.06,
          marginRight: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Pressable
          onPress={() => {
            bottomSheetRef.current.open();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '200%',
            margin: 10,
          }}
        ></Pressable>
        <Pressable
          onPress={() => {
            if (auth().currentUser) {
              navigation.navigate('ProfileScreen');
            } else {
              navigation.navigate('IntroScreen', { headerShown: false });
            }
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '200%',
            margin: 10,
          }}
        >
          <FastImage
            style={{ width: 50, height: 50 }}
            source={{
              uri: Image.resolveAssetSource(
                require('../../../../assets/traitb.png')
              ),
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

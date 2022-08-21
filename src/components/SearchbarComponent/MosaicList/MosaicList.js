import React from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  TouchableHighlight,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FontAwesome } from 'react-native-vector-icons';

import styles from './MosaicList.style';

const MosaicList = ({ data, recipeClicked, matches }) => {
  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.mosaicItem} onPress={() => Keyboard.dismiss()}>
        <TouchableHighlight onPress={() => recipeClicked(item)}>
          <>
            {(matches?.some?.((i) => i._id === item?._id) && (
              <>
                <View style={styles.mosaicMatch} />
                <FontAwesome name="heart" style={styles.mosaicStar} size={20} />
              </>
            )) ||
              null}
            <FastImage
              source={{ uri: item.thumbURL }}
              style={styles.mosaicThumbnail}
              resizeMode={FastImage.resizeMode.cover}
            />
          </>
        </TouchableHighlight>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data.filter((item) => item.thumbURL)}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(_, index) => index}
      />
    </SafeAreaView>
  );
};

export default MosaicList;

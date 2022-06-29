import React from 'react';
import {
  View,
  Pressable,
  FlatList,
  SafeAreaView,
  TouchableHighlight
} from 'react-native';
import {
  FontAwesome
} from 'react-native-vector-icons';
import FastImage from 'react-native-fast-image';

import styles from './MosaicList.style';

const MosaicList = ({ data, recipeClicked, matches }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.mosaicItem} onStartShouldSetResponder={() => true}>
        <TouchableHighlight onPress={() => recipeClicked(item)}>
          <>
            {matches?.some?.(i => i._id === item?._id) && (
              <>
                <View style={styles.mosaicMatch} />
                <FontAwesome name='heart' style={styles.mosaicStar} size={20} />
              </>
            ) || null}
            <FastImage source={{ uri: item.thumbURL }} style={styles.mosaicThumbnail} resizeMode={FastImage.resizeMode.cover} />
          </>
        </TouchableHighlight>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data.filter(item => item.thumbURL)}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(_, index) => index}
      />
    </SafeAreaView>
  );
}

export default MosaicList;

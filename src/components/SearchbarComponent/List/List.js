import React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTranslation } from 'react-i18next';

import SearchedItem from '../SearchedItem/SearchedItem';
import MosaicList from '../MosaicList/MosaicList';

import styles from './List.style'

const normalize = str =>
  typeof str === "string" || str instanceof String
    ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    : str;

const searchStr = (item, str) =>
  str.length > 0
  && normalize(item)
    ?.toLowerCase()
    .includes(
      str.toLowerCase().trim()
    );

const List = ({ searchPhrase, setClicked, clicked, data, navigation, openModal, matches }) => {
  const { t } = useTranslation();
  const height = useBottomTabBarHeight();
  const renderItem = ({ item }) => {
    const searchPhraseNormed = normalize(searchPhrase);
    const searchedIngredients = item.ingredients?.filter(({ name }) => searchStr(name, searchPhraseNormed));

    if (
      item.thumbURL && item.imgURL && (
        searchStr(item.name, searchPhraseNormed)
        || searchStr(item.chefName, searchPhraseNormed)
        || searchedIngredients.length > 0
      )
    ) return (
      <SearchedItem
        name={item.name}
        details={item.chefName}
        searchedIngredients={(searchPhraseNormed.length > 0 && searchedIngredients) || []}
        ingredients={item.ingredients}
        item={item}
        navigation={navigation}
        t={t}
      />
    )
  }

  if (!data) return [];

  return (
    <SafeAreaView style={styles.container}>
      <View
        onStartShouldSetResponder={() => setClicked(false)}>
        {clicked && <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} />}
        {(!clicked || searchPhrase.trim().length === 0) && <MosaicList matches={matches} data={data} recipeClicked={openModal} />}
      </View>
    </SafeAreaView>
  )
}

export default List;

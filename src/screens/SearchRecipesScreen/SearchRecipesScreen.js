import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Pressable, StatusBar
} from "react-native";
import { useSelector } from "react-redux";
import FastImage from 'react-native-fast-image';

import SearchbarComponent from '../../components/SearchbarComponent/SearchbarComponent';
import { useTranslation } from "react-i18next";


const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 17,
    marginBottom: 5,
  },
  ingredients_title: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  ingredients_list: {
    flexDirection: 'row',
    width: "100%",
    overflow: "hidden"
  },
  searchedIngredient: {
    fontWeight: "bold"
  },
  mosaicList: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  mosaicItem: {
    flex: 1,
    flexDirection: 'column',
    margin: 1
  },
  mosaicThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  }
});
const Item = ({ name, details, searchedIngredients, ingredients, item, navigation, t }) => (
  <View style={styles.item}>
    <Pressable onPress={() => navigation.navigate("IngredientScreen", { recipe: item })}>
      <View style={styles.ingredients_title}>
        <Text style={styles.title}>{name}</Text>
        {details &&
          <Text style={styles.author}>{t('searchItem_author', { author: details })}</Text>
        }
      </View>
      <View style={styles.ingredients_list}>
        {
          searchedIngredients
            ?.map(
              (ingredient) => <Text style={styles.searchedIngredient}>{`${ingredient.name}, `}</Text>
            )
        }
        {
          ingredients
            ?.filter(
              ingredient =>
                searchedIngredients.length > 0
                  ? searchedIngredients.some(searched => searched.name !== ingredient.name)
                  : ingredient
            ).map(
              (ingredient, i) =>
                <Text style={styles.ingredient}>{`${ingredient.name}${i <= ingredients.length ? ", " : ""}`}</Text>
            )
        }
      </View>
    </Pressable>
  </View>
);

const MosaicList = ({ data }) => {
  console.log('Hello Mosaic ')
  const renderItem = ({ item }) => (
    <View style={styles.mosaicItem}>
      <FastImage source={{ uri: item.thumbURL }} style={styles.mosaicThumbnail} />
    </View>
  )

  return (
    <SafeAreaView style={styles.mosaicList}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(_, index) => index}
      />
    </SafeAreaView>
  );
}

const normalize = str => typeof str === "string" || str instanceof String ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, "") : str;
const searchStr = (item, str) => str.length > 0 && normalize(item)?.toLowerCase().includes(str.toLowerCase().trim());
const List = ({ searchPhrase, setClicked, clicked, data, navigation }) => {
  const { t } = useTranslation();
  const renderItem = ({ item }) => {
    const searchPhraseNormed = normalize(searchPhrase);
    const searchedIngredients = item.ingredients?.filter(({ name }) => searchStr(name, searchPhraseNormed));

    if (
      searchPhraseNormed === ""
      || searchStr(item.name, searchPhraseNormed)
      || searchStr(item.chefName, searchPhraseNormed)
      || searchedIngredients.length > 0
    ) return (
      <Item
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
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false)
        }}>
        {clicked && <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} />}
        <MosaicList data={data} />
      </View>
    </SafeAreaView>
  )
}
const stylesSearch = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    top: StatusBar.currentHeight
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});
const SearchRecipesScreen = ({ route, navigation, ...props }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

  const recipes = useSelector(store => store.recipeStore.recipes)

  return (
    <View style={stylesSearch.root}>
      <StatusBar backgroundColor='transparent' />
      <SearchbarComponent
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <List
        searchPhrase={searchPhrase}
        data={recipes}
        setClicked={setClicked}
        clicked={clicked}
        navigation={navigation}
      />

    </View>
  )
}

export default SearchRecipesScreen;

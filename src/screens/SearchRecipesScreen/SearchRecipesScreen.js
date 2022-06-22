import React, { forwardRef, useRef, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Pressable, StatusBar
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modalbox';
import { Ionicons, FontAwesome, MaterialIcons, Feather } from 'react-native-vector-icons'

import { addMatch, removeMatch } from '../../redux/slicer/MatchSlicer';
import CustomButton from '../../components/CustomButton';
import SearchbarComponent from '../../components/SearchbarComponent/SearchbarComponent';
import { COLORS } from '../../consts/colors';


const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "87%",
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
    backgroundColor: 'red'
  },
  mosaicItem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
    position: 'relative',
    margin: 1
  },
  mosaicMatch: {
    backgroundColor: 'black',
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    height: '100%',
    width: '100%'
  },
  mosaicStar: {
    position: 'absolute',
    top: 3,
    right: 3,
    zIndex: 1001,
    color: 'white'
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

const RecipeModal = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();


  const { item, matches } = props;

  const recipeInfo = [
    t('recipeModale_ingredientsLength', { len: item?.ingredients?.length }),
    t('recipeModale_preparationTotal', { time: item?.tempsTotal }),
    item?.chefName ?? t('recipeModale_unknownAuthor')
  ];

  const handleRemoveMatch = () => {
    dispatch(removeMatch(item));
    ref.current.close();
  }

  const handleAddMatch = () => {
    dispatch(addMatch(item));
    ref.current.close();
  }

  return (
    <Modal
      swipeThreshold={1}
      style={{
        width: "100%",
        height: "50%",
        justifyContent: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      }}
      position='bottom'
      backdrop={true}
      ref={ref}
      isOpen={false}
      backdropOpacity={0}
    >
      <View style={{ height: "100%", justifyContent: 'space-between', paddingBottom: 40 }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>

            <Text style={{ fontWeight: 'bold', fontSize: 21, flexWrap: 'wrap', width: "90%", maxHeight: 55 }}>{item?.name}</Text>
            <Pressable onTouchEnd={() => ref.current.close()} >
              <Ionicons name='close' size={21} fontWeight='bold' />
            </Pressable>

          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>

            <FastImage source={{ uri: item?.thumbURL }} style={{ width: 100, height: 100 }} />
            <View style={{ flexDirection: 'column', marginLeft: 15 }}>

              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                {recipeInfo.map((str, i) => <Text style={{ color: COLORS.grey }} key={i}>{`${i === 0 ? '' : ' - '}${str}`}</Text>)}
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flexWrap: "wrap", width: "85%", color: COLORS.grey }}>
                  {item?.ingredients?.map((ingredient, i) => `${ingredient.name}${i === item?.ingredients?.length - 1 ? '' : ' - '}`)}
                </Text>
              </View>

            </View>

          </View>
        </View>
        <View>
          <Pressable style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onTouchEnd={() => navigation.navigate('IngredientScreen', { recipe: item })}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name='info' size={20} />
              <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>
                {t('recipeModale_moreInfo')}
              </Text>
            </View>
            <MaterialIcons name='keyboard-arrow-right' size={30} />
          </Pressable>
          <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}>
            {matches.some(i => i._id === item._id) ?
              <CustomButton onPress={handleRemoveMatch} title={t('recipeModale_removeMatch')} style={{ backgroundColor: COLORS.red, width: '100%', borderRadius: 5 }} />
              :
              <CustomButton onPress={handleAddMatch} title={t('recipeModale_addMatch')} style={{ borderRadius: 5, width: '100%' }} />
            }
          </View>
        </View>
      </View>
    </Modal>
  )
});

const MosaicList = ({ data, recipeClicked, matches }) => {
  console.log({ matches })
  const renderItem = ({ item }) => {
    return (
      <View style={styles.mosaicItem}>
        <Pressable onTouchEnd={() => recipeClicked(item)}>
          {matches?.some?.(i => i._id === item._id) && (
            <>
              <View style={styles.mosaicMatch} />
              <FontAwesome name='heart' style={styles.mosaicStar} size={20} />
            </>
          ) || null}
          <FastImage source={{ uri: item.thumbURL }} style={styles.mosaicThumbnail} />
        </Pressable>
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

const normalize = str => typeof str === "string" || str instanceof String ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, "") : str;
const searchStr = (item, str) => str.length > 0 && normalize(item)?.toLowerCase().includes(str.toLowerCase().trim());

const List = ({ searchPhrase, setClicked, clicked, data, navigation, openModal, matches }) => {
  const { t } = useTranslation();
  const renderItem = ({ item }) => {
    const searchPhraseNormed = normalize(searchPhrase);
    const searchedIngredients = item.ingredients?.filter(({ name }) => searchStr(name, searchPhraseNormed));

    if (
      searchStr(item.name, searchPhraseNormed)
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
        {(!clicked || searchPhrase.trim().length === 0) && <MosaicList matches={matches} data={data} recipeClicked={openModal} />}
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

const SearchRecipesScreen = ({ navigation }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [item, setItem] = useState(null);
  const recipeModalRef = useRef();

  const recipes = useSelector(store => store.recipeStore.recipes)
  const matches = useSelector(store => store.matchStore.matches)

  const handleModalClicked = item => {
    setItem(item);
    recipeModalRef.current.open();
  }

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
        openModal={handleModalClicked}
        matches={matches}
      />
      <RecipeModal item={item} navigation={navigation} matches={matches} ref={recipeModalRef} />
    </View>
  )
}

export default SearchRecipesScreen;

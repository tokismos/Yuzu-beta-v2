import React, { useRef, useState } from 'react';
import {
  View,
  StatusBar
} from "react-native";
import { useSelector } from "react-redux";

import SearchbarComponent from '../../components/SearchbarComponent/SearchbarComponent';
import RecipeModal from '../../components/SearchbarComponent/RecipeModal/RecipeModal'
import List from '../../components/SearchbarComponent/List/List';

import styles from './SearchRecipesScreen.style'

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
    <View style={styles.root}>
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

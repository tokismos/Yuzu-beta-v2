import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";

import SearchbarComponent from "../../components/SearchbarComponent/SearchbarComponent";
import RecipeModal from "../../components/SearchbarComponent/RecipeModal/RecipeModal";
import List from "../../components/SearchbarComponent/List/List";

import styles from "./SearchRecipesScreen.style";

const SearchRecipesScreen = ({ navigation }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [item, setItem] = useState(null);
  const recipeModalRef = useRef();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const recipes = useSelector((store) => store.recipeStore.recipes);
  const matches = useSelector((store) => store.matchStore.matches);

  const handleModalClicked = (item) => {
    if (!isKeyboardVisible) {
      setItem(item);
      recipeModalRef.current.open();
    } else {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor="transparent" />
      <SearchbarComponent
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setClicked={setClicked}
      />
      <TouchableWithoutFeedback
        onPress={alert}
        accessible={false}
        style={{ height: "100%", backgroundColor: "red" }}
      >
        <List
          searchPhrase={searchPhrase}
          data={recipes}
          setClicked={setClicked}
          clicked={clicked}
          navigation={navigation}
          openModal={handleModalClicked}
          matches={matches}
        />
      </TouchableWithoutFeedback>
      <RecipeModal
        item={item}
        navigation={navigation}
        matches={matches}
        ref={recipeModalRef}
      />
    </View>
  );
};

export default SearchRecipesScreen;

import React from 'react';
import {
  View,
  Pressable,
  Text
} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './SearchedItem.style';

const SearchedItem = ({ name, searchedIngredients, ingredients, item, navigation, t }) => {
  const recipeInfo = [
    t('recipeModale_ingredientsLength', { len: item.ingredients.length }),
    t('recipeModale_preparationTotal', { time: item.tempsTotal }),
    item.chefName ?? t('recipeModale_unknownAuthor')
  ];

  return (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate("IngredientScreen", { recipe: item })}>
      <FastImage
        source={{ uri: item.thumbURL }}
        style={styles.image} />
      <View style={styles.column}>
        <View style={styles.ingredients_title}>
          <Text numberOfLines={2} style={styles.title}>{name}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {recipeInfo.map((str, i) => (
            <Text key={i} style={styles.info}>
              {`${i === 0 ? '' : ' - '}${str}`}
            </Text>
          ))}
        </View>
        <View style={styles.ingredients_list}>
          {searchedIngredients?.map(
            (ingredient, i) => <Text key={`${ingredient.name}_${i}`} style={styles.searchedIngredient}>{`${ingredient.name}, `}</Text>
          )}
          {ingredients?.filter(
            ingredient =>
              searchedIngredients.length > 0
                ? searchedIngredients.some(searched => searched.name !== ingredient.name)
                : ingredient
          ).map(
            (ingredient, i) => <Text key={`${ingredient.name}_filtered_${i}`} style={styles.ingredient}>{`${ingredient.name}${i <= ingredients.length ? ", " : ""}`}</Text>
          )
          }
        </View>
      </View>
    </Pressable>
  )
};

export default SearchedItem;

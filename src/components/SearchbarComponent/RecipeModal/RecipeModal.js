import React, { forwardRef } from "react";
import { Text, View, Pressable } from "react-native";
import Modal from "react-native-modalbox";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Ionicons, Feather, MaterialIcons } from "react-native-vector-icons";
import FastImage from "react-native-fast-image";

import CustomButton from "../../CustomButton";
import { addMatch, removeMatch } from "../../../redux/slicer/MatchSlicer";
import { COLORS } from "../../../consts/colors";

import styles from "./RecipeModal.style";

const RecipeModal = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { item, matches, navigation } = props;

  const recipeInfo = [
    t("recipeModale_ingredientsLength", { len: item?.ingredients?.length }),
    t("recipeModale_preparationTotal", { time: item?.tempsTotal }),
    item?.chefName ?? t("recipeModale_unknownAuthor"),
  ];

  const handleRemoveMatch = () => {
    dispatch(removeMatch(item));
    ref.current.close();
  };

  const handleAddMatch = () => {
    dispatch(addMatch(item));
    ref.current.close();
  };

  const itsAMatch = matches.some((i) => i._id === item?._id);

  return (
    <Modal
      swipeThreshold={1}
      style={styles.modalContainer}
      position="bottom"
      backdrop={true}
      ref={ref}
      isOpen={false}
      backdropOpacity={0.5}
    >
      <View style={styles.mainContainer}>
        <View>
          <View style={{ ...styles.titleContainer, ...styles.row }}>
            <Text style={styles.title}>{item?.name}</Text>
            <Pressable onTouchEnd={() => ref.current.close()}>
              <Ionicons name="close" size={21} fontWeight="bold" />
            </Pressable>
          </View>
          <View style={{ ...styles.imageAndInfo, ...styles.row }}>
            <FastImage source={{ uri: item?.thumbURL }} style={styles.image} />
            <View style={{ ...styles.infoContainer, ...styles.column }}>
              <View style={{ ...styles.row, marginBottom: 5 }}>
                {recipeInfo.map((str, i) => (
                  <Text style={{ color: COLORS.grey }} key={i}>
                    {`${i === 0 ? "" : " - "}${str}`}
                  </Text>
                ))}
              </View>
              <View style={{ ...styles.row, ...styles.ingredientsWrapper }}>
                {item?.ingredients?.map((ingredient, i) => {
                  return (
                    <Text
                      key={`${ingredient.name}_${i}`}
                      style={styles.ingredients}
                    >
                      {`${ingredient.name}${
                        i === item?.ingredients?.length - 1 ? "" : " - "
                      }`}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Pressable
            style={{ ...styles.moreInfoContainer, ...styles.row }}
            onTouchEnd={() =>
              navigation.navigate("IngredientScreen", { recipe: item })
            }
          >
            <View style={{ ...styles.moreInfo, ...styles.row }}>
              <Feather name="info" size={20} />
              <Text style={styles.moreInfoText}>
                {t("recipeModale_moreInfo")}
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} />
          </Pressable>
          <View style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}>
            <CustomButton
              onPress={itsAMatch ? handleRemoveMatch : handleAddMatch}
              title={t(`recipeModale_${itsAMatch ? "remove" : "add"}Match`)}
              style={{
                ...styles.button,
                backgroundColor: itsAMatch ? COLORS.red : COLORS.primary,
              }}
              textStyle={{ fontSize: 20 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default RecipeModal;

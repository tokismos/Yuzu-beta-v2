//Ecran ou l'on peut checker tous les ingredients qu'on a commandé , et on peut ajouter des ingredients
// que l'on a pas avant

// setSelectedIngredient we find here every selected ing que ca soit produits or from cart

import { format, formatRelative } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { COLORS } from "../consts/colors";
import TextInputColored from "../components/TextInputColored";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import IngredientComponent from "../components/IngredientComponent";
import LazyLoadImage from "../components/LazyLoadImage";
import CheckBox from "@react-native-community/checkbox";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { useTranslation } from "react-i18next";

const { height, width } = Dimensions.get("screen");

// Each recipe which contain ingredients
const CartComponent = ({
  imgURL,
  thumbURL,
  name,
  ingredients,
  setSelectedIngredients,
  selectedIngredients,
  index,
}) => {
  const { t } = useTranslation();
  const defaultImage = Image.resolveAssetSource(
    require("../assets/default.jpg")
  ).uri;

  return (
    <>
      <View>
        {index === 0 && (
          <Text style={styles.title}>{t("infoCommandeScreen_recipe")}</Text>
        )}
      </View>
      <View style={styles.cartComponent}>
        <LazyLoadImage
          thumbURL={thumbURL}
          imgURL={imgURL}
          styles={styles.recipeImg}
        />

        <View style={styles.titleComponent}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "left",
              width: "80%",
              marginBottom: 50,
              marginLeft: 140,
              top: 27,
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ width: "100%", alignSelf: "center" }}>
          {ingredients?.map((item, index) => (
            <IngredientComponent
              setSelectedIngredients={setSelectedIngredients}
              selectedIngredients={selectedIngredients}
              isSaved={selectedIngredients.indexOf(item.name) > -1}
              ingredient={item}
              key={index}
              isCommandeScreen={true}
            />
          ))}
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};

// Component where we add a product with button
const AddProductComponent = ({ setProducts, products }) => {
  const [productText, setProductText] = useState();
  const { t } = useTranslation();

  return (
    <View style={styles.addProductComponent}>
      <TextInputColored
        style={{ width: "50%", height: 40, marginBottom: 10 }}
        label={t("infoCommandeScreen_addArticle")}
        setChangeText={setProductText}
        value={productText}
      />

      <CustomButton
        title={t("infoCommandeScreen_add")}
        style={{ height: 40 }}
        onPress={() => {
          if (!productText) {
            return;
          }

          if (products.indexOf(productText) > -1) {
            return Alert.alert(t("infoCommandeScreen_alreadyAdded"));
          }
          setProducts((p) => [...p, productText]);
        }}
      />
    </View>
  );
};

//List of all the products we added

const InfoCommandeScreen = ({ navigation, route }) => {
  const { params } = route;
  const idTime = params.historyDetail.dateTime;
  const [products, setProducts] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const ProductComponent = ({ product, isSaved }) => {
    const [toggle, setToggle] = useState();

    useEffect(() => {
      setToggle(isSaved);
    }, [products]);

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Pressable
          onPress={() => {
            if (!toggle) {
              console.log("slct ing", selectedIngredients);
              setSelectedIngredients((p) => [...p, product]);
            } else {
              setSelectedIngredients((p) =>
                p.filter((item) => item !== product)
              );
            }

            setToggle((p) => !p);
          }}
          style={styles.productItemComponent}
        >
          <Text
            style={{
              ...styles.productItemText,
              textDecorationLine: toggle ? "line-through" : null,
              textDecorationStyle: "solid",
              color: toggle ? COLORS.grey : "black",
              width: "65%",
            }}
          >
            {product}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setProducts(products.filter((i) => i !== product));
            }}
            style={{
              padding: 5,
              borderRadius: 5,
              width: "10%",
              alignItems: "center",
            }}
          >
            <AntDesign name="delete" size={24} color={COLORS.red} />
          </TouchableOpacity>
          <View
            style={{
              width: "10%",
              left: 5,
              top: 2,
            }}
          >
            <CheckBox
              style={[
                {
                  transform: [{ scale: Platform.OS === "ios" ? 0.8 : 1.2 }],
                },
              ]}
              onTintColor={COLORS.primary}
              onFillColor={COLORS.primary}
              onCheckColor={"white"}
              onAnimationType="fill"
              offAnimationType="fade"
              boxType="square"
              disabled
              value={isSaved}
              tintColors={{ true: COLORS.primary, false: "gray" }}
            />
          </View>
        </Pressable>
      </View>
    );
  };
  const AllProductsComponent = () => {
    const { t } = useTranslation();
    return (
      <View style={styles.productsComponent}>
        <Text style={styles.title}>{t("infoCommandeScreen_addedArticle")}</Text>

        {products.map((item, i) => {
          return (
            <ProductComponent
              product={item}
              key={i}
              isSaved={selectedIngredients.indexOf(item) > -1}
            />
          );
        })}
      </View>
    );
  };

  //Calcul la date et l'affiche dans le header et cela avant que l'ecran ne se render
  useLayoutEffect(() => {
    const time = new Date(params.historyDetail.dateTime);

    navigation.setOptions({
      title: formatRelative(time, new Date(), { locale: fr }),
    });
  }, []);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      if (!isFocused) {
        await AsyncStorage.setItem(
          "selectedIngredients",
          JSON.stringify(selectedIngredients)
        );
        await AsyncStorage.setItem(idTime.toString(), JSON.stringify(products));
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      const selectedIngredientsResult = await AsyncStorage.getItem(
        "selectedIngredients"
      );
      if (selectedIngredientsResult != null) {
        setSelectedIngredients(JSON.parse(selectedIngredientsResult));
      }
      const productsResult = await AsyncStorage.getItem(idTime.toString());
      if (productsResult != null) {
        setProducts(JSON.parse(productsResult));
      }
    })();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#cecece" }}>
      <AddProductComponent setProducts={setProducts} products={products} />

      {products.length != 0 && <AllProductsComponent products={products} />}

      {params.historyDetail.recipes.map((item, i) => {
        return (
          <CartComponent
            index={i}
            idTime={params.historyDetail.dateTime}
            setSelectedIngredients={setSelectedIngredients}
            selectedIngredients={selectedIngredients}
            key={i}
            imgURL={item.imgURL}
            thumbURL={item.thumbURL}
            name={item.name}
            ingredients={item.ingredients}
          />
        );
      })}
    </ScrollView>
  );
};

export default InfoCommandeScreen;

const styles = StyleSheet.create({
  recipeImg: {
    backgroundColor: COLORS.secondary,
    height: 70,
    borderRadius: 10,
    aspectRatio: 1,
    position: "absolute",
    top: 15,
    left: 15,
  },
  separator: {
    height: 0.4,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "white",
  },
  headerContainer: {
    width: "100%",
    height: "25%",
    padding: 20,

    justifyContent: "space-between",
  },
  bottomComponent: {
    width: "100%",
    height: "20%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    width: "100%",
  },
  button: {
    width: "90%",
    height: "50%",
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cartComponent: {
    marginVertical: 5,

    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  imageContainer: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 60,
    aspectRatio: 1.5,
  },
  productsComponent: {
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  productsTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "gray",
  },
  titleComponent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  productItemComponent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  addProductComponent: {
    backgroundColor: "white",
    height: height * 0.1,
    flexDirection: "row",
    width,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  productItemText: {
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 10,
    marginLeft: 5,
    textAlign: "center",
  },
});

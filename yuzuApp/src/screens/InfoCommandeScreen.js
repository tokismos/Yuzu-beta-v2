import { format } from "date-fns";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
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
const { height, width } = Dimensions.get("screen");
import { FontAwesome } from "@expo/vector-icons";
import IngredientComponent from "../components/IngredientComponent";
import CheckBox from "@react-native-community/checkbox";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

// Each recipe which contain ingredients
const CartComponent = ({
  imgURL,
  name,
  ingredients,
  setSelectedIngredients,
  selectedIngredients,
}) => {
  return (
    <>
      <View style={styles.cartComponent}>
        <View style={styles.titleComponent}>
          <FastImage
            style={{
              backgroundColor: COLORS.secondary,
              height: 70,
              borderRadius: 10,
              aspectRatio: 1,
            }}
            source={{
              uri: imgURL,
              headers: { Authorization: "someAuthToken" },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              width: "70%",
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ width: "80%", alignSelf: "center" }}>
          {ingredients?.map((item, index) => (
            <>
              <IngredientComponent
                setSelectedIngredients={setSelectedIngredients}
                selectedIngredients={selectedIngredients}
                isSaved={selectedIngredients.indexOf(item.name) > -1}
                ingredient={item}
                key={index}
                isCommandeScreen={true}
              />
            </>
          ))}
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};

const ProductComponent = ({ product }) => {
  const [toggle, setToggle] = useState(true);
  return (
    <TouchableOpacity
      onPress={() => setToggle((p) => !p)}
      style={styles.productItemComponent}
    >
      <Text style={styles.productItemText}>{product}</Text>
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
        value={toggle}
        tintColors={{ true: COLORS.primary, false: "gray" }}
      />
    </TouchableOpacity>
  );
};
// Component where we add a product with button
const AddProductComponent = ({ setProducts, products }) => {
  const [isRecurrent, setIsRecurrent] = useState(true);
  const [productText, setProductText] = useState();
  return (
    <View style={styles.addProductComponent}>
      <TextInputColored
        style={{ width: "50%", height: 40 }}
        label="Ajouter un produit"
        setChangeText={setProductText}
        value={productText}
      />
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => setIsRecurrent((p) => !p)}
      >
        <FontAwesome
          name="refresh"
          size={24}
          color={isRecurrent ? COLORS.primary : "gray"}
        />
      </TouchableOpacity>
      <CustomButton
        title="Ajouter"
        style={{ height: 40 }}
        onPress={() => {
          if (!productText) {
            return;
          }
          if (products.indexOf(productText) > -1) {
            return Alert.alert("Vous avez deja ajouté ce produit !");
          }
          setProducts((p) => [...p, productText]);
        }}
      />
    </View>
  );
};

//List of all the products we added
const AllProductsComponent = ({ products }) => {
  return (
    <View style={styles.productsComponent}>
      <Text style={styles.productsTitle}>Articles Ajoutés</Text>
      {products.map((item, i) => (
        <ProductComponent product={item} key={i} />
      ))}
    </View>
  );
};

const InfoCommandeScreen = ({ navigation, route }) => {
  const { params } = route;

  const [products, setProducts] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useLayoutEffect(() => {
    let time = new Date(params.historyDetail.dateTime);

    navigation.setOptions({
      title: `Liste du ${format(time, "dd/MM/yyyy")}`,
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
        const value = await AsyncStorage.getItem("selectedIngredients");
        console.log("AFTER NOT FOCYS", value);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("selectedIngredients");
      console.log("thos are valie", value);
      if (value != null) {
        setSelectedIngredients(value);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("PROOOOOOD", selectedIngredients);
  }, [selectedIngredients]);
  return (
    <ScrollView style={{}}>
      <AddProductComponent setProducts={setProducts} products={products} />
      {products.length != 0 && <AllProductsComponent products={products} />}
      <Text style={{ fontSize: 24, fontWeight: "bold", paddingVertical: 10 }}>
        {" "}
        Recettes :
      </Text>

      {params.historyDetail.recipes.map((item, i) => {
        return (
          <CartComponent
            setSelectedIngredients={setSelectedIngredients}
            selectedIngredients={selectedIngredients}
            key={i}
            imgURL={item.imgURL}
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
  separator: {
    height: 0.4,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "gray",
  },
  headerContainer: {
    width: "100%",
    height: "25%",
    padding: 20,

    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
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
    borderWidth: 1,
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
    width: "70%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
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
    width: "90%",
    justifyContent: "space-between",
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
    width: "80%",
    fontWeight: "bold",
  },
});

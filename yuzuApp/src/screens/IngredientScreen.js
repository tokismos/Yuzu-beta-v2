import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import CheckBox from "@react-native-community/checkbox";
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog";
import CustomButton from "../components/CustomButton";
import ReportComponent from "../components/ReportComponent";
import { getRecipe } from "../axios";
import { addToFav, deleteFav, getFavoris } from "../helpers/db";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite } from "../redux/slicer/favoritesSlicer";
import IngredientComponent from "../components/IngredientComponent";

const { height, width } = Dimensions.get("screen");

// const IngredientComponent = ({
//   ingredient: { name, quantity, unite },
//   defaultNbrPersonne,
//   nbrPersonne,
// }) => {
//   const [toggle, setToggle] = useState(true);

//   return (
//     <>
//       <TouchableOpacity
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "center",
//           width: "100%",
//           alignSelf: "center",
//           marginVertical: 3,
//         }}
//         onPress={() => setToggle((p) => !p)}
//       >
//         <Text style={{ fontSize: 16 }} style={{ width: "25%" }}>{`${+(
//           (quantity * nbrPersonne) /
//           defaultNbrPersonne
//         ).toFixed(1)} ${unite == "unite" ? "" : unite}`}</Text>
//         <View
//           style={{
//             width: "75%",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Text style={{ marginLeft: 20, width: "75%" }}>{name}</Text>
//           <CheckBox
//             style={[
//               {
//                 transform: [{ scale: 0.8 }],
//               },
//             ]}
//             onTintColor={COLORS.primary}
//             onFillColor={COLORS.primary}
//             onCheckColor={"white"}
//             onAnimationType="fill"
//             offAnimationType="fade"
//             boxType="square"
//             disabled
//             value={toggle}
//             tintColors={{ true: COLORS.primary, false: "gray" }}
//           />
//         </View>
//       </TouchableOpacity>
//     </>
//   );
// };

const StepComponent = ({ step, index }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <View
      style={{
        width: width * 0.9,
        backgroundColor: "white",
        justifyContent: "space-between",
        padding: 5,
        marginVertical: 10,
        borderRadius: 5,
      }}
    >
      <TouchableOpacity style={{}} onPress={() => setToggle((p) => !p)}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, color: "gray", fontWeight: "bold" }}>
            Etape {index + 1}.
          </Text>
          <CheckBox
            style={[
              {
                transform: [{ scale: 0.8 }],
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
        </View>

        {!toggle && (
          <Animated.View entering={FadeInLeft}>
            <Text style={{ marginLeft: "5%" }}>{step}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const NbrPersonneComponent = ({ nbrPersonne, setNbrPersonne }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "10%",
      }}
    >
      <TouchableOpacity
        style={{ padding: 10, marginRight: "-15%" }}
        onPress={() => {
          if (nbrPersonne == 2) return;

          setNbrPersonne((p) => p - 1);
        }}
      >
        <AntDesign name="minuscircleo" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", color: "black", marginLeft: 5 }}>
        {nbrPersonne}
      </Text>
      <MaterialCommunityIcons
        name="human-male"
        size={24}
        color="black"
        style={{ marginRight: 5 }}
      />
      <TouchableOpacity
        style={{ padding: 10, marginLeft: "-15%" }}
        onPress={() => {
          if (nbrPersonne == 8) return;
          setNbrPersonne((p) => p + 1);
        }}
      >
        <AntDesign name="pluscircleo" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const IngredientScreen = ({ route, navigation }) => {
  const [recipe, setRecipe] = useState();
  const [nbr, setNbr] = useState(+route.params.recipe?.nbrPersonne);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const { favorites } = useSelector((state) => state.favoritesStore);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("THOSE ARE FAVORIS ", route);

    if (route.params.recipe) {
      setRecipe(route.params.recipe);
      setIsLoading(false);
    } else {
      getRecipe(route.params._id).then((res) => {
        setNbr(+res.nbrPersonne);
        setRecipe(res);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{ flex: 1, width }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              zIndex: 99,
              backgroundColor: "white",
              borderRadius: 30,
            }}
          >
            <AntDesign name="arrowleft" size={40} color="black" />
          </TouchableOpacity>
          <Dialog
            visible={showReport}
            onTouchOutside={() => {
              setShowReport(false);
            }}
            dialogAnimation={
              new SlideAnimation({
                slideFrom: "bottom",
              })
            }
            onHardwareBackPress={() => true}
          >
            <DialogContent>
              <ReportComponent
                setShowReport={setShowReport}
                recipeName={recipe?.name}
              />
            </DialogContent>
          </Dialog>
          <ScrollView
            overScrollMode="never"
            style={{ backgroundColor: "#E6E6E6", flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{}}>
              <Image
                source={{ uri: recipe?.imgURL }}
                style={{
                  aspectRatio: 1,
                }}
              />
              <View
                style={{
                  height: height * 0.3,
                  marginBottom: 20,
                  backgroundColor: "black",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      textAlign: "center",
                      margin: 10,
                      color: "white",
                      flex: 1,
                    }}
                  >
                    {recipe?.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontSize: 18, color: "white", marginRight: 5 }}
                    >
                      620
                    </Text>
                    <AntDesign name="heart" size={14} color={COLORS.primary} />
                  </View>
                  <Text style={{ fontSize: 18, color: "white" }}>
                    {recipe?.tempsPreparation + recipe?.tempsCuisson} min
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontSize: 18, color: "white", marginRight: 5 }}
                    >
                      N/A
                    </Text>
                    <AntDesign name="star" size={15} color={COLORS.primary} />
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    height: height * 0.08,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    La recette
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 10,
                    justifyContent: "space-evenly",
                    backgroundColor: "black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,

                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Difficulté {"\n"} {recipe?.difficulty}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,

                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Préparation {"\n"} {recipe?.tempsPreparation} min
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,

                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Cuisson {"\n"} {recipe?.tempsCuisson} min
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "95%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity onPress={() => setShowReport(true)}>
                  <MaterialIcons
                    name="report"
                    size={30}
                    color={COLORS.red}
                    style={{ padding: 5 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginLeft: "7%",
                  }}
                >
                  Ingrédients
                </Text>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <NbrPersonneComponent
                    nbrPersonne={nbr}
                    setNbrPersonne={setNbr}
                  />
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  width: "80%",
                  borderRadius: 5,
                  padding: 10,
                }}
              >
                {recipe?.ingredients?.map((item, index) => {
                  return (
                    <IngredientComponent
                      ingredient={item}
                      key={index}
                      nbrPersonne={nbr}
                      defaultNbrPersonne={recipe?.nbrPersonne}
                    />
                  );
                })}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 10,
                    flex: 1,
                  }}
                />
                <Text style={{ fontSize: 20, margin: 20, fontWeight: "bold" }}>
                  Etapes de la recette
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 10,
                    flex: 1,
                  }}
                />
              </View>
              {recipe?.steps?.map((item, index) => {
                return <StepComponent step={item} index={index} key={index} />;
              })}

              {favorites.includes(
                route.params._id ?? route.params.recipe._id
              ) ? (
                <CustomButton
                  style={{
                    width: "60%",
                    marginBottom: 5,
                    marginTop: 10,
                    backgroundColor: COLORS.red,
                  }}
                  textStyle={{ fontSize: 18 }}
                  title="Supprimer des favoris"
                  onPress={() => {
                    deleteFav(recipe._id);
                    dispatch(deleteFavorite(recipe._id));
                    setIsFavorite(false);
                  }}
                />
              ) : (
                <CustomButton
                  style={{ width: "60%", marginBottom: 5, marginTop: 10 }}
                  textStyle={{ fontSize: 18 }}
                  title="Ajouter aux favoris"
                  onPress={() => {
                    addToFav(
                      recipe._id,
                      recipe.imgURL,
                      recipe.name,
                      recipe.dateTime
                    );
                    dispatch(addFavorite(recipe._id));
                    setIsFavorite(true);
                  }}
                />
              )}
            </View>
            {route.params._id && (
              <>
                <Dialog
                  visible={showVote}
                  onTouchOutside={() => {
                    setShowVote(false);
                  }}
                  dialogAnimation={
                    new SlideAnimation({
                      slideFrom: "bottom",
                    })
                  }
                  onHardwareBackPress={() => true}
                >
                  <DialogContent>
                    <View style={{ padding: 20 }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 20,
                          textAlign: "center",
                        }}
                      >
                        Est-ce que vous avez aimé cette recette ?
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          height: height * 0.1,
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity onPress={() => setShowVote(false)}>
                          <AntDesign name="like2" size={50} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowVote(false)}>
                          <AntDesign name="dislike2" size={50} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </DialogContent>
                </Dialog>
                <CustomButton
                  style={{ width: "60%", marginBottom: 20 }}
                  textStyle={{ fontSize: 18 }}
                  title="J'ai cuisiné cette recette"
                  onPress={() => setShowVote(true)}
                />
              </>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default IngredientScreen;

const styles = StyleSheet.create({});

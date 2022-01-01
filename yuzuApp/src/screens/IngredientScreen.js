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
import Animated, {
  FadeInLeft,
  Layout,
  StretchOutY,
  ZoomOut,
} from "react-native-reanimated";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from "@react-native-community/checkbox";
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog";
import { TextInput } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import ReportComponent from "../components/ReportComponent";
import { getRecipe } from "../axios";

const { height, width } = Dimensions.get("screen");

const IngredientComponent = ({
  ingredient: { name, quantity, unite },
  defaultNbrPersonne,
  nbrPersonne,
}) => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          alignSelf: "center",
          marginVertical: 3,
        }}
        onPress={() => setToggle((p) => !p)}
      >
        <Text style={{ fontSize: 16 }} style={{ width: "25%" }}>{`${+(
          (quantity * nbrPersonne) /
          defaultNbrPersonne
        ).toFixed(1)} ${unite == "unite" ? "" : unite}`}</Text>
        <View
          style={{
            width: "75%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ marginLeft: 20, width: "75%" }}>{name}</Text>
          <CheckBox
            disabled
            value={toggle}
            tintColors={{ true: COLORS.primary, false: "gray" }}
            style={{ transform: [{ scale: 1.2 }], width: "20%" }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

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
            boxType="circle"
            disabled
            value={toggle}
            tintColors={{ true: COLORS.primary, false: "gray" }}
            style={{ transform: [{ scale: 1.2 }] }}
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
          if (nbrPersonne == 4) return;

          setNbrPersonne((p) => p - 1);
        }}
      >
        <AntDesign name="minuscircleo" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", color: "black", marginLeft: 5 }}>
        {nbrPersonne}
      </Text>
      <MaterialCommunityIcons
        name="snowman"
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

const IngredientScreen = ({ route }) => {
  const [recipe, setRecipe] = useState();
  const [nbr, setNbr] = useState(+route.params.recipe?.nbrPersonne);
  const [isLoading, setIsLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [showVote, setShowVote] = useState(false);
  useEffect(() => {
    if (route.params.recipe) {
      setRecipe(route.params.recipe);
      setIsLoading(false);
    } else {
      getRecipe(route.params._id).then((res) => {
        console.log("HOLA THIS IS RES", res);
        setNbr(+res.nbrPersonne);
        setRecipe(res);
        setIsLoading(false);
      });
    }
  }, []);
  console.log("RECEIPPE", recipe?.nbrPersonne);
  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
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
            <Image
              source={{ uri: recipe?.imgURL }}
              style={{
                aspectRatio: 1,
              }}
            />
            <LinearGradient
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0, y: 0.2 }}
              locations={[0.3, 1]}
              colors={["black", "transparent"]}
              style={{
                height: height * 0.3,
                marginTop: "-28%",
                paddingTop: "25%",
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
              <View style={{ flexDirection: "row", backgroundColor: "black" }}>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    width: "50%",
                    height: height * 0.08,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                  >
                    La recette
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    width: "50%",
                    height: height * 0.08,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
                  >
                    Nutrition
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 10,
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
            </LinearGradient>
            <View
              style={{
                marginTop: "30%",
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
                    color="red"
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
              <View style={{}}></View>
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
                        Ca nous fera plaisir d'avoir votre avis
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
                          <AntDesign name="like2" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowVote(false)}>
                          <AntDesign name="dislike2" size={30} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </DialogContent>
                </Dialog>
                <CustomButton
                  title="Donner mon avis"
                  onPress={() => setShowVote(true)}
                />
              </>
            )}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default IngredientScreen;

const styles = StyleSheet.create({});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxHeight: 70,
    maxWidth: "90%",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "lightgrey",
  },
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
  },
  ingredients_title: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: -4,
  },
  title: {
    fontSize: 17,
    flexWrap: "wrap",
    fontWeight: "bold",
    marginBottom: 5,
  },
  ingredients_list: {
    flexDirection: "row",
    width: "104%",
    overflow: "hidden",
    // height: 40,
    // flexWrap: 'wrap'
  },
  searchedIngredient: {
    fontWeight: "bold",
    color: "grey",
    flexWrap: "wrap",
  },
  ingredient: {
    color: "grey",
  },
  info: {
    color: "grey",
  },
});

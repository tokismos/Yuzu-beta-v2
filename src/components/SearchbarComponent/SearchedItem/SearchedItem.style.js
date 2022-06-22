import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: 'lightgrey'
  },
  column: {
    flexDirection: 'column'
  },
  ingredients_title: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  title: {
    fontSize: 17,
    flexWrap: 'wrap',
    width: "60%",
    fontWeight: "bold",
    marginBottom: 5,
  },
  ingredients_list: {
    flexDirection: 'row',
    width: "95%",
    overflow: "hidden",
    // height: 40,
    // flexWrap: 'wrap'
  },
  searchedIngredient: {
    fontWeight: "bold",
    color: 'grey',
    flexWrap: 'wrap'
  },
  ingredient: {
    color: 'grey'
  },
  info: {
    color: 'grey'
  }
})

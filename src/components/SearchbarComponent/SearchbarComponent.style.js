import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "100%",
  },
})

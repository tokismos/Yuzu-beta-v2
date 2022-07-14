import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 20,
    flexDirection: "row",
    width: "100%",
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  searchBar: {
    padding: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    width: "95%",
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

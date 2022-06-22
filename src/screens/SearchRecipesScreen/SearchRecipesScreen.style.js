import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    top: StatusBar.currentHeight
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
})

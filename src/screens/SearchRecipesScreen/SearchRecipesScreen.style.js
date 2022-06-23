import { StyleSheet, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

const statusHeight = StatusBarManager.HEIGHT;

export default StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    top: statusHeight
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
})

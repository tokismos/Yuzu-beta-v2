import { StyleSheet } from 'react-native';
import { COLORS } from '../../../consts/colors';

export default StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  mainContainer: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  titleContainer: {
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 21,
    flexWrap: 'wrap',
    width: '90%',
    maxHeight: 55,
  },
  imageAndInfo: {
    margin: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    marginLeft: 15,
    marginBottom: -60,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  image: {
    width: 100,
    height: 100,
  },
  ingredientsWrapper: {
    flexWrap: 'wrap',
    width: '85%',
    overflow: 'hidden',
    maxHeight: '80%',
  },
  ingredients: {
    color: COLORS.grey,
  },
  moreInfoContainer: {
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreInfo: {
    alignItems: 'center',
  },
  moreInfoText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    borderRadius: 5,
  },
});

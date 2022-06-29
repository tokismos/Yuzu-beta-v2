import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mosaicList: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  mosaicItem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
    position: 'relative',
    margin: 1,
    aspectRatio: 1
  },
  mosaicMatch: {
    backgroundColor: 'black',
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    height: '100%',
    width: '100%'
  },
  mosaicStar: {
    position: 'absolute',
    top: 3,
    right: 3,
    zIndex: 1001,
    color: 'white'
  },
  mosaicThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

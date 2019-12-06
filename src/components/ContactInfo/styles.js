import { StyleSheet } from 'react-native';
import { lighterBlue } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: lighterBlue,
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    marginRight: 20,
  },
  name: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'center'
  }
});

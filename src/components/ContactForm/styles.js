import { StyleSheet } from 'react-native';
import { darkerBlue } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: darkerBlue,
    marginBottom: 5,
    height: '100%',
  },
  textBox: {
    width: '80%',
    marginRight: 20,
    alignSelf: 'center',
    alignContent: 'center'
  },
  imageBox: {
    height: 240,
    width: '80%',
    marginRight: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    opacity: .7,
  },
  imagePicker: {
    position: 'absolute',
    height: 50,
    width: 50,
    alignSelf: 'center',
    backgroundColor: '#cecece',
    borderRadius: 8,
  },
  submit: {
    marginTop: 20,
    height: 40,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'green',
  },
  submitText: {
    textAlign: 'center',
    fontSize: 28,
  }
});

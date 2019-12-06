import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
    marginBottom: 5,
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
    alignSelf: 'center',
  },
  phoneNumber: {
    color: 'beige',
    display: 'none',
  }
});

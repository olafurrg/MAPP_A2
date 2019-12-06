import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  mainIcon: {
    marginTop: 5,
    textAlign: 'center',
  },
  icon: {
    marginTop: 16,
    textAlign: 'left',
    height: '100%',
    width: 50,
  },
  text: {
    textAlign: 'left',
    alignSelf: 'center',
    fontSize: 22,
  },
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0000008a',
    alignContent: 'center',
    justifyContent: 'center',
  },
  imagePicker: {
    height: 200,
    minWidth: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    position: 'relative',
  },
});

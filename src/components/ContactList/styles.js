import { StyleSheet } from 'react-native';
import { lighterBlue } from '../../styles/colors';

export default StyleSheet.create({
  container: {
  },
  noContacts: {
    flexDirection: 'column',
  },
  noContactsText: {
    backgroundColor: lighterBlue,
    color: 'white',
    fontSize: 24,
    paddingLeft: 10,
    height: 60,
    paddingTop: 10,
    width: '100%',
  },
});

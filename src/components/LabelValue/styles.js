import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    width: 80,
    color: 'black',
    fontSize: 22,
    alignSelf: 'center',
  },
  value: {
    color: 'black',
    fontSize: 22,
  },
  valueClickable: {
    color: 'green',
    fontSize: 22,
  },
  editableValue: {
    flex: 4,
    paddingLeft: 10,
    fontSize: 22,
    color: 'black',
    backgroundColor: '#ececec',
    borderRadius: 4,
  },
});

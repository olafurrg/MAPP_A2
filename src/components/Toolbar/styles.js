import { StyleSheet } from 'react-native';
import { darkerBlue } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: darkerBlue,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  toolbarAction: {
    flex: 1,
    alignItems: 'center',
  },
  toolbarActionText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  filter: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  ascendingButton: {
    flex: 1,
  },
  searchInput: {
    flex: 5,
    paddingLeft: 10,
    fontSize: 22,
    color: 'black',
    backgroundColor: '#ececec',
    borderRadius: 4,
  },
  icon: {
    alignSelf: 'center',
    color: 'white',
  }
});

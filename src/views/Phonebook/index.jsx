import React, { useContext, useReducer, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as PropTypes from 'prop-types';
import { ContactContext, DispatchContext } from '../../routes/context';
import { action } from '../../routes/reducer';
import Toolbar from '../../components/Toolbar';
import ContactList from '../../components/ContactList';
import AddModal from '../../components/AddModal';
import useFileSystem from '../../hooks/useFileSystem';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import { getContactsFromPhone } from '../../services/contactService';
import * as colors from '../../styles/colors';

const Phonebook = ({ navigation }) => {
  const contacts = useContext(ContactContext);
  const dispatch = useContext(DispatchContext);

  const [getAllContactFiles] = useFileSystem('Phonebook');

  // componentDidMount (initialize contacts from file)
  useEffect(() => {
    const getFiles = async () => {
      const objects = await getAllContactFiles();
      const contacts = await getContactsFromPhone();

      const fromFile = objects.map(obj => obj.file);
      const fromContacts = contacts.map(obj => ({
        name: obj.name,
        phoneNumber: obj.phoneNumbers[0].number,
        photo: obj.imageAvailable ? obj.image.uri : undefined,
        }) );

        console.log('lol', fromContacts);
      dispatch({ type: action.INIT, payload: { contacts: [ ...fromFile, ...fromContacts]  }});
    }
    getFiles();
  }, [getAllContactFiles, getContactsFromPhone]);

  return (
    <View>
      <Toolbar />
      <ContactList />
    </View>
  );
}

Phonebook.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Phonebook;

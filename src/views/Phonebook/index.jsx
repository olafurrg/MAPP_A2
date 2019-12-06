import React, { useRef, useContext, useReducer, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as PropTypes from 'prop-types';
import PhonebookContext from './context';
import { StateContext, DispatchContext } from '../../routes/context';
import { action } from '../../routes/reducer';
import Toolbar from '../../components/Toolbar';
import ContactList from '../../components/ContactList';
import useFileSystem from '../../hooks/useFileSystem';
import { getContactsFromPhone } from '../../services/contactService';
import styles from './styles';

const Phonebook = ({ navigation }) => {
  const contextValue = useRef({});
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { contacts, filteredIndex, isAscending, search: stateSearch } = state;
  const { navigate } = navigation;

  const { getAllFiles: getAllJsonFiles, newFile: newJson } = useFileSystem('Phonebook');
  const { copyFile: copyImage } = useFileSystem('PhonebookImages');

  const loadJsonFiles = useCallback(async () => {
    const objects = await getAllJsonFiles();
    const fromFile = objects.map(obj => ({ ...JSON.parse(obj.file), fileName: obj.name }));
    dispatch({ type: action.INIT, payload: { contacts: fromFile  }});
  }, [getAllJsonFiles, dispatch]);

  const importContacts = useCallback(async () => {
    const contacts = await getContactsFromPhone();
    console.log(contacts);
    const fromContacts = contacts.map(obj => ({
      id: obj.id,
      name: obj.name,
      phoneNumber: typeof obj.phoneNumbers !== 'undefined' ? obj.phoneNumbers[0].number : undefined,
      photo: obj.imageAvailable ? obj.image.uri : undefined,
    }));
    for (let i = 0; i < fromContacts.length; i += 1) {
      if (fromContacts[i].photo !== undefined) {
        let newImage = await copyImage(fromContacts[i].photo, 'contact' + fromContacts[i].id);
        fromContacts[i].photo = newImage.uri;
      }
      let newFile = await newJson('contact' + fromContacts[i].id, JSON.stringify({ ...fromContacts[i] }));
    }
    console.log(fromContacts);
    await loadJsonFiles();
  }, [contacts, getContactsFromPhone, copyImage, newJson, loadJsonFiles]);

  // componentDidMount (initialize contacts from file)
  useEffect(() => {
    const getFiles = async () => {
      await loadJsonFiles();
    }
    getFiles();
  }, []);

  const search = useCallback((text) => {
    dispatch({type: action.SEARCH, payload: { search: text }});
  }, [dispatch]);

  const toggleOrder = useCallback((isAscending) => {
    dispatch({type: action.ORDER, payload: { isAscending }});
  }, [dispatch]);

  const openContactForm = useCallback((contactIndex = null) => {
    navigate('Contact', { contactIndex: contactIndex, contactName: contactIndex === null ? 'New Contact' : contacts[contactIndex].name })
  }, [navigate, contacts]);

  contextValue.current.search = search;
  contextValue.current.toggleOrder = toggleOrder;
  contextValue.current.openContactForm = openContactForm;
  contextValue.current.importContacts = importContacts;

  return (
    <PhonebookContext.Provider value={contextValue}>
      <View style={styles.container}>
        <Toolbar search={stateSearch} isAscending={isAscending} />
        <ContactList contacts={contacts} filteredIndex={filteredIndex} />
      </View>
    </PhonebookContext.Provider>
  );
}

Phonebook.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Phonebook;

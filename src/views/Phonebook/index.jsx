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

  const search = useCallback((text) => {
    dispatch({type: action.SEARCH, payload: { search: text }});
  }, [dispatch]);

  const toggleOrder = useCallback((isAscending) => {
    dispatch({type: action.ORDER, payload: { isAscending }});
  }, [dispatch]);

  const openContactForm = useCallback(() => {
    navigate('Contact', { contactId: null, contactName: 'New Contact' })
  }, [navigate]);

  contextValue.current.search = search;
  contextValue.current.toggleOrder = toggleOrder;
  contextValue.current.openContactForm = openContactForm;

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

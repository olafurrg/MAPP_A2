import React, { useRef, useContext, useReducer, useCallback, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import PhonebookContext from './context';
import { StateContext, DispatchContext } from '../../routes/context';
import { action } from '../../routes/reducer';
import useFileSystem from '../../hooks/useFileSystem';
import { getContactsFromPhone } from '../../services/contactService';
import ContactForm from '../../components/ContactForm';
import * as colors from '../../styles/colors';

const Contact = ({ navigation }) => {
  const contextValue = useRef({});
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [getAllContactFiles, addFile] = useFileSystem('PhonebookImages');

  const contactId = navigation.getParam('contactId');

  const create = useCallback(async (name, phoneNumber, image) => {
    const newFile = await addFile(image, 'test', 'image');
    console.log('create', image, newFile.uri)
    dispatch({ type: action.CREATE, payload: {
      name, phoneNumber, photo: newFile.uri
    }});
  }, [dispatch, addFile]);

  contextValue.current.create = create;

  return (
    <PhonebookContext.Provider value={contextValue}>
      <View>
        <ContactForm editable={contactId === null} />
      </View>
    </PhonebookContext.Provider>
  );
}

Contact.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Contact;

import React, { useRef, useContext, useReducer, useCallback, useEffect, useMemo } from 'react';
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
  const { contacts } = state;
  const dispatch = useContext(DispatchContext);
  const { navigate } = navigation;

  const { newFile: newJson } = useFileSystem('Phonebook');
  const { copyFile: copyImage } = useFileSystem('PhonebookImages');

  const create = useCallback(async (name, phoneNumber, image) => {
    const fileName = Date.now().toString();
    let newImage = image;
    if (image !== '') {
      newImage = await copyImage(image, fileName, 'image').uri;
    }
    const newContact = {
      name, phoneNumber, photo: newImage, fileName
    };
    const newFile = await newJson(fileName + '.json', JSON.stringify(newContact));
    dispatch({ type: action.CREATE, payload: newContact});
    navigate('Phonebook', { contactIndex: null, contactName: null });
  }, [dispatch, newJson, copyImage, navigate]);

  const update = useCallback(async (index, name, phoneNumber, image) => {
    const obj = contacts[index];
    const fileName = obj.fileName;
    let newImage = image;
    if (image !== '') {
      newImage = await copyImage(image, fileName, 'image').uri;
    }
    const newContact = {
      index, name, phoneNumber, photo: newImage, fileName
    };
    console.log(newContact);
    const newFile = await newJson(fileName + '.json', JSON.stringify(newContact));
    dispatch({ type: action.UPDATE, payload: newContact});
  }, [dispatch, newJson, copyImage, navigate, contacts]);

  contextValue.current.create = create;
  contextValue.current.update = update;

  const contactIndex = navigation.getParam('contactIndex');
  const { name, phoneNumber, photo } = useMemo(() => {
    for (let i = 0; i < contacts.length; i += 1) {
      if (contacts[i].index === contactIndex) {
        return contacts[i];
      }
    }
    return {};
  }, [contacts, contactIndex]);

  return (
    <PhonebookContext.Provider value={contextValue}>
      <View>
        <ContactForm
          index={contactIndex}
          editable={contactIndex === null}
          name={name}
          phoneNumber={phoneNumber}
          image={photo}
        />
      </View>
    </PhonebookContext.Provider>
  );
}

Contact.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Contact;

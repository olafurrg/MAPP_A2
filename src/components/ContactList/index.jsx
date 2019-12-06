import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import ContactInfo from '../ContactInfo';

const ContactList = ({ contacts, onLongPress, selectedContacts}) => (
  <View style={{ flex: 1 }}>
  <FlatList
    numColummns={1}
    data={contacts}
    extraData={selectedContacts}
    renderItem={({ item: { file, name } }) => {
      return (
        // Need of update based on how it is implemented
        <ContactInfo />
      );
    }}
    keyExtractor={(contact) => contact.name}
  />
  </View>
);

export default ContactList;

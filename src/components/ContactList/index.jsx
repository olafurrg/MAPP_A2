import React, { useContext, useMemo } from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import ContactInfo from '../ContactInfo';
import styles from './styles';

const ContactList = ({ contacts, filteredIndex }) => {
  const filteredContacts = useMemo(() => filteredIndex.map(c => contacts[c]), [contacts, filteredIndex])

  return (
    <View style={styles.container}>
      {filteredContacts.length > 0 ? (
        <FlatList
          data={filteredContacts}
          renderItem={({ item: { index, name, photo } }) => <ContactInfo
            index={index}
            name={name}
            image={photo}
          />}
          keyExtractor={(contact) => contact.name + contact.index }
        />
      ) : (
        <View style={styles.noContacts}>
          <Text style={styles.noContactsText}>{contacts.length === filteredContacts.length
            ? 'No contacts created' : 'No contacts found' }</Text>
        </View>
      )}
    </View>
  );
}

export default ContactList;

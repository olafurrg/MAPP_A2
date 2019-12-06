import React, { useContext, useMemo } from 'react';
import * as PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import ContactInfo from '../ContactInfo';
import { ContactContext } from '../../routes/context';
import styles from './styles';

const ContactList = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filteredIndex } = contactContext;

  const filteredContacts = useMemo(() => filteredIndex.map(c => contacts[c]), [contacts, filteredIndex])

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredContacts}
        renderItem={({ item: { name, phoneNumber, photo } }) => <ContactInfo
          name={name}
          phoneNumber={phoneNumber}
          image={photo}
        />}
        keyExtractor={(contact) => contact.name}
      />
    </View>
  );
}

export default ContactList;

import React, { useContext } from 'react';
import * as PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import ContactInfo from '../ContactInfo';
import { ContactContext } from '../../routes/context';
import styles from './styles';

const ContactList = () => {
  const contacts = useContext(ContactContext);

  console.log(contacts);

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
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

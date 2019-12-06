import React, { useContext, useState, useCallback } from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PhonebookContext from '../../views/Phonebook/context';
import { action } from '../../routes/reducer';
import styles from './styles';

// Possibly change this up and add search filter in here
const Toolbar = ({ isAscending, search: searchProp, hasSelectedContacts = false }) => {
  const { current: { search, toggleOrder, openContactForm } } = useContext(PhonebookContext);

  const handleSearch = useCallback((text) => {
    search(text);
  }, [search]);

  const handleOrder = useCallback((text) => {
    toggleOrder(!isAscending);
  }, [toggleOrder, isAscending]);

  const handleAddPress = useCallback(() => {
    openContactForm();
  }, [openContactForm]);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableHighlight style={styles.toolbarAction} onPress={handleAddPress}>
          <Text style={styles.toolbarActionText}>Add Contact</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.toolbarAction}
          disabled={!hasSelectedContacts}
        >
          <Text style={styles.toolbarActionText, hasSelectedContacts ? {}
            : { color: 'rgba(155, 155, 155, 0.5)' }}
          >
            Delete
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.filter}>
        <TextInput
          value={searchProp}
          onChangeText={handleSearch}
          style={styles.searchInput}
          placeholder="Search..."
        />
        <TouchableOpacity style={styles.ascendingButton} onPress={handleOrder}>
          <FontAwesome style={styles.icon} name={isAscending ? "sort-alpha-asc" : "sort-alpha-desc"} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

Toolbar.defaultProps = {
  onAdd: undefined,
  onRemove: undefined,
  hasSelectedContacts: false,
};

Toolbar.propTypes = {
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  hasSelectedContacts: PropTypes.bool,
};

export default Toolbar;

import React, { useContext, useState, useCallback } from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { DispatchContext } from '../../routes/context';
import { action } from '../../routes/reducer';
import styles from './styles';

// Possibly change this up and add search filter in here
const Toolbar = ({ onAdd, onRemove, hasSelectedContacts }) => {
  const dispatch = useContext(DispatchContext);
  const handleSearch = useCallback((text) => {
    dispatch({type: action.SEARCH, payload: { search: text }});
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableHighlight style={styles.toolbarAction} onPress={onAdd}>
          <Text style={styles.toolbarActionText}>Add Contact</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.toolbarAction}
          onPress={onRemove}
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
          onChangeText={handleSearch}
          style={styles.searchInput}
          placeholder="Search..."
        />
        <TouchableOpacity style={styles.ascendingButton}>
          <FontAwesome style={styles.icon} name="sort-alpha-asc" size={32} />
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

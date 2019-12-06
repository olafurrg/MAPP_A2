import React, { useState, useCallback } from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import styles from './styles';

// Possibly change this up and add search filter in here
const Toolbar = ({ onAdd, onRemove, hasSelectedContacts }) => {
    const [search, setSearch] = useState('');
    const handleSearch = useCallback((text) => {
      setSearch(text);
    }, [setSearch]);

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
        <View style={styles.search}>
          <TextInput
            value={search}
            onChangeText={handleSearch}
            style={styles.searchInput}
            placeholder="Search..."
          />
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

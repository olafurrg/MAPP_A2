import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from './styles';

// Possibly change this up and add search filter in here
const Toolbar = ({ onAdd, onRemove, hasSelectedContacts }) => (
  <View styleName="horizontal" style={styles.toolbar}>
    <TouchableHighlight onPress={onAdd} style={styles.toolbarAction}>
      <Text style={styles.toolbarActionText}>Add Contact</Text>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={onRemove}
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
);

export default Toolbar;

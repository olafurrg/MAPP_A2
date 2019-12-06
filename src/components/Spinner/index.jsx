import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

// Use while something is waiting for promise
const Spinner = () => (
  <View style={styles.spinner}>
    <ActivityIndicator color="black" />
  </View>
);

export default Spinner;

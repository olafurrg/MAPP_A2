import React from 'react';
import {
  View, Text, Image, TouchableHighlight,
} from 'react-native';

import logo from '../../recources/logo.png';
import styles from './styles';

const Main = ({ navigation: { navigate } }) => (
  <View style={styles.container}>
    <Image style={styles.logo} source={logo} />
    <Text style={styles.paragraph}> Your personal phonebook app </Text>
    <TouchableHighlight style={styles.button} onPress={() => navigate('Phonebook')}>
      <Text style={styles.buttomText}>To app</Text>
    </TouchableHighlight>
  </View>
);

export default Main;

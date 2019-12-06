//TODO create a view for a single contact in the list
import React from 'react';
import * as PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

const defaultImage = require('../../resources/defaultPortrait.png');

//This should only be displaying the photo and name
const ContactInfo = ({ name, phoneNumber, image }) => (
  <View>
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        source={typeof image !== 'undefined' && image !== null ? {uri: image } : defaultImage}
      />
      <Text style={styles.name}>
        {name}
      </Text>
      <Text style={styles.phoneNumber}>
        {phoneNumber}
      </Text>
    </TouchableOpacity>
  </View>
);

ContactInfo.defaultProps = {
  image: undefined
};

ContactInfo.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default ContactInfo;

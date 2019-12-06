import React, { useContext, useCallback } from 'react';
import * as PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import PhonebookContext from '../../views/Phonebook/context';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

const defaultImage = require('../../resources/defaultPortrait.png');

const ContactInfo = ({ index, name, image }) => {
  const { current: { openContactForm } } = useContext(PhonebookContext);

  const handlePress = useCallback(() => openContactForm(index), [index]);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Image
          style={styles.image}
          source={typeof image !== 'undefined' && image !== null ? {uri: image+"?time=" + new Date() } : defaultImage}
        />
        <Text style={styles.name}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

ContactInfo.defaultProps = {
  index: null,
  image: undefined
};

ContactInfo.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default ContactInfo;

import React, { useRef, useReducer, useCallback, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { ContactContext, DispatchContext } from '../../routes/context';
import { action } from '../../routes/reducer';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import { getContactsFromPhone } from '../../services/contactService';
import * as colors from '../../styles/colors';

const Contact = ({ navigation }) => {
  const contacts = useContext(ContactContext);
  const dispatch = useContext(DispatchContext);

  return (
    <View>
      <Text>
        Contact View
      </Text>
    </View>
  );
}

Contact.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Contact;

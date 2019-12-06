import React, { useContext, useState, useCallback } from 'react';
import * as PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Image, View, Button, Text, TextInput } from 'react-native';
import PhonebookContext from '../../views/Contact/context';
import ImagePicker from '../ImagePicker'
import LabelValue from '../LabelValue'
import styles from './styles';

const defaultImage = require('../../resources/defaultPortrait.png');

const ContactForm = ({ editable, name: propName, phoneNumber: propPhoneNumber, image: propImage }) => {
  const { current: { create } } = useContext(PhonebookContext);
  const [name, setName] = useState(propName);
  const [phoneNumber, setPhoneNumber] = useState(propPhoneNumber);
  const [image, setImage] = useState(propImage);

  const handleNameChange = useCallback((text) => {
    setName(text);
  }, [setName]);

  const handlePhoneChange = useCallback((text) => {
    setPhoneNumber(text);
  }, [setPhoneNumber]);

  const handleImagePick = useCallback(({ uri }) => {
    console.log('uri', uri);
    setImage(uri);
  }, [setImage]);

  const handleSubmit = useCallback(() => {
    create(name, phoneNumber, image);
  }, [create, name, phoneNumber, image]);

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={typeof image !== 'undefined' && image !== null && image !== '' ? {uri: image } : defaultImage}
        />
        {editable && (
          <ImagePicker style={styles.imagePicker} onPick={handleImagePick} />
        )}
      </View>
      <View style={styles.textBox}>
        <LabelValue label="Name" value={name} editable={editable} onChange={handleNameChange} />
        <LabelValue label="Phone" value={phoneNumber} editable={editable} onChange={handlePhoneChange}  keyboardType="phone-pad"/>
      </View>
      {editable && (
        <Button title="Submit" style={styles.submit} disabled={name === '' || phoneNumber === ''} onPress={handleSubmit} />
      )}
    </View>
  );
}

ContactForm.defaultProps = {
  name: '',
  phoneNumber: '',
  image: '',
};

ContactForm.propTypes = {
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  image: PropTypes.string,
};

export default ContactForm;

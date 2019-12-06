import React, { useContext, useState, useCallback } from 'react';
import * as PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Image, View, Button, Text, TextInput } from 'react-native';
import PhonebookContext from '../../views/Contact/context';
import ImagePicker from '../ImagePicker'
import LabelValue from '../LabelValue'
import styles from './styles';

const defaultImage = require('../../resources/defaultPortrait.png');

const ContactForm = ({ editable: propEditable, index, name: propName, phoneNumber: propPhoneNumber, image: propImage }) => {
  const { current: { create, update } } = useContext(PhonebookContext);
  const [editable, setEditable] = useState(propEditable);
  const [name, setName] = useState(propName);
  const [phoneNumber, setPhoneNumber] = useState(propPhoneNumber);
  const [image, setImage] = useState(propImage);

  const handleToggleEditable = useCallback((text) => {
    setEditable(!editable);
  }, [setEditable, editable]);

  const handleNameChange = useCallback((text) => {
    setName(text);
  }, [setName]);

  const handlePhoneChange = useCallback((text) => {
    setPhoneNumber(text);
  }, [setPhoneNumber]);

  const handleImagePick = useCallback(({ uri }) => {
    setImage(uri);
  }, [setImage]);

  const handleSubmit = useCallback(() => {
    setEditable(false);
    if (typeof index === 'undefined' || index === null) {
      create(name, phoneNumber, image);
    } else {
      update(index, name, phoneNumber, image);
    }
  }, [create, update, index, name, phoneNumber, image, setEditable]);

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={typeof image !== 'undefined' && image !== null && image !== '' ? {uri: image+"?time=" + new Date() } : defaultImage}
        />
        {editable && (
          <ImagePicker style={styles.imagePicker} onPick={handleImagePick} />
        )}
      </View>
      <View style={styles.textBox}>
        <LabelValue label="Name" value={name} editable={editable} onChange={handleNameChange} />
        <LabelValue label="Phone" value={phoneNumber} editable={editable} onChange={handlePhoneChange}  keyboardType="phone-pad"/>
      </View>
      {editable ? (
        <Button title="Save" style={styles.submit} disabled={name === '' || phoneNumber === ''} onPress={handleSubmit} />
      ) : ( <Button title="Edit" style={styles.submit} onPress={handleToggleEditable} /> )}
    </View>
  );
}

ContactForm.defaultProps = {
  index: undefined,
  name: '',
  phoneNumber: '',
  image: '',
};

ContactForm.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  image: PropTypes.string,
};

export default ContactForm;

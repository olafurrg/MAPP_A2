import React, { useState, useCallback } from 'react';
import * as PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Image, View, TouchableOpacity, Text, Modal } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import useImagePicker from '../../hooks/useImagePicker'
import styles from './styles';

const defaultImage = require('../../resources/defaultPortrait.png');

const ImagePicker = ({ style, onPick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPicker = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closePicker = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const [takePhoto, selectFromCameraRoll] = useImagePicker();

  const handleTakePhoto = useCallback(async () => {
    const uri = await takePhoto();
    if (typeof onPick === 'function' && uri !== null) {
      onPick({ uri });
      setIsOpen(false);
    }
  }, [onPick, takePhoto, setIsOpen]);

  const handlePickPhoto = useCallback(async () => {
    const uri = await selectFromCameraRoll();
    if (typeof onPick === 'function' && uri !== null) {
      onPick({ uri });
      setIsOpen(false);
    }
  }, [onPick, selectFromCameraRoll, setIsOpen]);

  return (
    <View style={style}>
      <TouchableOpacity onPress={openPicker}>
        <Entypo style={styles.mainIcon} name="images" size={32} />
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent={true}
        onRequestClose={closePicker}
      >
        <View style={styles.modal}>
          <View style={styles.imagePicker}>
            <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
              <Entypo style={styles.icon} name="link" size={32}/>
              <Text style={styles.text}>
                Use Url
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
              <Entypo style={styles.icon} name="camera" size={32}/>
              <Text style={styles.text}>
                Take picture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePickPhoto}>
              <Entypo style={styles.icon} name="image" size={32}/>
              <Text style={styles.text}>
                Camera roll
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

ImagePicker.propTypes = {
  name: '',
  phoneNumber: '',
  image: '',
};

ImagePicker.propTypes = {
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  image: PropTypes.string,
};

export default ImagePicker;

import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import styles from './styles';

// From pixelmania. Needs to be updated to fit for importing or creating new contact
const AddModal = ({
  isOpen,
  closeModal,
  takePhoto,
  selectFromCameraRoll,
}) => (
  <Modal
    isOpen={isOpen}
    closeModal={closeModal}
  >
    <TouchableOpacity onPress={takePhoto}>
      <Entypo style={styles.icon} name="camera" />
    </TouchableOpacity>
    <TouchableOpacity onPress={selectFromCameraRoll}>
      <Entypo style={styles.icon} name="image" />
    </TouchableOpacity>
  </Modal>
);

export default AddModal;

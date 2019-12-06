import React, { useMemo } from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

const LabelValue = ({ style, label, value, editable, onChange, onClick, keyboardType }) => {
  const containerStyle = useMemo(() => [styles.container, style], [style]);

  return (
    <View style={containerStyle}>
      <Text
        style={styles.label}
        value={value}
        onChangeText={onChange}
      >
        {label + ':'}
      </Text>
      {editable ? (
        <TextInput
          style={styles.editableValue}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
        />
      ) : typeof onClick === 'function' ? (
        <TouchableOpacity style={styles.value} onPress={onClick}>
          <Text
            style={styles.valueClickable}
          >
            {value}
            </Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={styles.value}
        >
          {value}
        </Text>
      )}
    </View>
  );
}

LabelValue.propTypes = {
  style: undefined,
  label: '',
  value: '',
  editable: false,
  onChange: undefined,
  keyboardType: 'default',
};

LabelValue.propTypes = {
  style: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  keyboardType: PropTypes.string,
};

export default LabelValue;

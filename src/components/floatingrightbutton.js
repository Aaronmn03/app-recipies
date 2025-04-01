import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import { TouchableSecondary } from './ThemedComponents';


const FloatingRightButton = ({ onPress, color, icon, bottom = 20, right = 20 }) => {
  return (
    <TouchableSecondary style={[styles.button, { bottom, right }]} onPress={onPress}>
      <Icon name={icon} size={30} color={color} />
    </TouchableSecondary>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingRightButton;
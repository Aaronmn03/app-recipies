import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';


const FloatingRightButton = ({ onPress, color, icon, bottom = 20, right = 20 }) => {
  return (
    <TouchableOpacity style={[styles.button, { bottom, right }]} onPress={onPress}>
      <Icon name={icon} size={30} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingRightButton;
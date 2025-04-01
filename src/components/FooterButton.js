import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

export default function FooterButton({ iconName, isActive, onPress }) {
  const { theme } = useTheme();
  const backgroundColor = isActive ? theme.secondary : theme.primary;
  const iconColor = isActive ? theme.primary : theme.secondary;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Icon name={iconName} size={25} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight:'300'
  },
});

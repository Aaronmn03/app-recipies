import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';

export default function FooterButton({ label, iconName, isActive, onPress }) {
  const backgroundColor = isActive ? colors.secondary : colors.primary;
  const iconColor = isActive ? colors.primary : colors.secondary;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
      <Icon name={iconName} size={20} color={iconColor} />
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
    borderWidth: 2,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});

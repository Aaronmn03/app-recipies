import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from '../context/ThemeContext';

export const ThemedView = ({ style, ...props }) => {
  const { theme } = useTheme();
  return <View style={[{ backgroundColor: theme.backgroundColor }, style]} {...props} />;
};

export const ThemedPrimaryView = ({ style, ...props }) => {
    const { theme } = useTheme();
    return <View style={[{ backgroundColor: theme.primary, elevation:5 }, style]} {...props} />;
  };

export const ThemedSecondaryView = ({ style, ...props }) => {
    const { theme } = useTheme();
    return <View style={[{ backgroundColor: theme.secondary }, style]} {...props} />;
  };

export const ThemedText = ({ style, ...props }) => {
  const { theme } = useTheme();
  return <Text style={[{ color: theme.secondary }, style]} {...props} />;
};

export const TouchablePrimary = ({style, ...props}) => {
  const { theme } = useTheme();
  return <TouchableOpacity style={[{ backgroundColor: theme.primary, elevation:5 }, style]} {...props} />;
}

export const TouchableSecondary = ({style, ...props}) => {
  const { theme } = useTheme();
  return <TouchableOpacity style={[{ backgroundColor: theme.secondary }, style]} {...props} />;
}

export const IconSecondary = ({style, ...props}) => {
  const { theme } = useTheme();
  return <Icon style={[{ color: theme.secondary }, style]} {...props} />;
}

export const ThemedModalSelector = ({ style, initValueTextStyle, optionTextStyle, cancelStyle, ...props }) => {
  const { theme } = useTheme();

  return (
    <ModalSelector
      {...props}
      style={[{ backgroundColor: theme.backgroundColor, borderColor: theme.secondary }, style]}
      initValueTextStyle={[{ color: theme.secondary }, initValueTextStyle]}
      optionTextStyle={[{ color: theme.primary }, optionTextStyle]}
      cancelStyle={[{ backgroundColor: theme.exit }, cancelStyle]}
      cancelTextStyle={{ color: theme.secondary }}
    />
  );
}

export const ThemedTextInput = ({ style, ...props }) => {
  const { theme } = useTheme();
  return (
    <TextInput
      style={[{ color: theme.secondary, borderColor: theme.secondary }, style]}
      placeholderTextColor={theme.secondary}
      {...props}
    />
  );
};
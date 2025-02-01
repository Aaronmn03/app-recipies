import React from "react";
import { View, StyleSheet } from "react-native";
import colors from '../styles/colors';
export default function Footer() {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 35,
    backgroundColor: colors.primary,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: colors.secondary,
  },
});
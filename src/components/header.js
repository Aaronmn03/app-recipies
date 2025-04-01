import React from "react";
import { StyleSheet } from "react-native";
import { ThemedPrimaryView } from "./ThemedComponents";
export default function Footer() {
  return (
    <ThemedPrimaryView style={styles.container}>
    </ThemedPrimaryView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 35,
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
});
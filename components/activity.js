import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Activity({ style, nombreActividad}) {
  return (
    <View style={[styles.container, style]}>
      <Image source={require('../assets/aguacate.jpg')} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{nombreActividad}</Text>
        <Text style={styles.description}>Breve descripcion introducida por el usuario sobre la actividad</Text>
      </View>
      <Icon name="chevron-right" size={15} color="#2e6f85" style={styles.chevronIcon} />
      <Icon name="calendar" size={15} color="#2e6f85" style={styles.topRightIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 5,
    fontSize: 22,
    color: '#2e6f85',
  },
  container: {
    width: '95%',
    borderRadius: 20,
    backgroundColor: '#8ae2ff',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 10,
    position: 'relative', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    padding: 5,
    fontSize: 14,
    color: '#2e6f85',
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  topRightIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
  }
});
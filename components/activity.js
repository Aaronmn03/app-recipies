import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';

export default function Activity({nombreActividad, descripcionActividad}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/aguacate.jpg')} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{nombreActividad}</Text>
        <Text style={styles.description}>{descripcionActividad}</Text>
      </View>
      <Icon name="chevron-right" size={15} color= {colors.secondary} style={styles.chevronIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 5,
    fontSize: 20,
    color: colors.secondary
  },
  container: {
    width: '95%',
    borderRadius: 20,
    backgroundColor: '#7CDDEEFF',  //'#8ae2ff',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
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
    fontSize: 18,
    color: colors.secondary,
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
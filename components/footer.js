import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer({ color }) {
  // Define los colores condicionales
  const background1 = color === 0 ? '#8ae2ff' : '#2e6f85'; // Color para el primer ícono
  const background2 = color === 1 ? '#8ae2ff' : '#2e6f85'; // Color para el segundo ícono
  const icon1 = color === 0 ? '#2e6f85' : '#8ae2ff'; // Color para el primer ícono
  const icon2 = color === 1 ? '#2e6f85' : '#8ae2ff'; // Color para el segundo ícono
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: background1 }]}>
        <Icon name="home" size={20} color= {icon1}/>
      </View>
      <View style={[styles.iconContainer, { backgroundColor: background2 }]}>
        <Icon name="user" size={20} color= {icon2}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    backgroundColor: '#2e6f85',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0,
  },
  iconContainer: {
    width: 50, 
    height: 50, 
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, 
    borderColor: '#2e6f85', 
    borderStyle: 'solid', 
    borderWidth: 4,
  },
});
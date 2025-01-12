import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import colors from '../styles/colors';

export default function Footer({ color }) {
  const background1 = color === 0 ? colors.secondary : colors.backgroundColor; 
  const background2 = color === 1 ? colors.secondary : colors.backgroundColor; 
  const icon1 = color === 0 ? colors.backgroundColor : colors.secondary; 
  const icon2 = color === 1 ? colors.backgroundColor : colors.secondary; 

  const router = useRouter();

  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.iconContainer, { backgroundColor: background1 }]} onPress={() => router.push('/')}>
          <Text style={[styles.text, { color: icon1 }]}>HOME</Text>
          <Icon name="home" size={20} color={icon1} />
        </TouchableOpacity>
      <TouchableOpacity style={[styles.iconContainer, { backgroundColor: background2 }]}>
        <Text style={[styles.text, { color: icon2 }]} >USER</Text>
        <Icon name="user" size={20} color={icon2} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60, // Aumenta la altura para que los íconos sean visibles
    backgroundColor: colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0,
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderColor: colors.secondary,
  },
  link: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50, 
    height: 50, 
    borderRadius: 8, // Ajusta el radio del borde para que sea un círculo
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.backgroundColor, 
    borderStyle: 'solid', 
    borderWidth: 2, // Ajusta el ancho del borde si es necesario
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});
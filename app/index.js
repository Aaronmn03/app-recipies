import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';

const sizes = {
  iconSize: 65,
  buttonIconSize: 80,
  textSize: 20,
  borderRadius: 8,
  buttonWidth: '45%',
  buttonHeight: '100%',
  containerWidth: '90%',
  containerHeight: '25%',
};

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://192.168.1.39:3000/')
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos del backend:', data);
        setName(data[0].nombre_usuario)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style ={styles.text_blue} >Hola, {name}</Text>
      <View style={styles.container_days}> </View>
      <View style={styles.container_recipies}> 
        <TouchableOpacity style={styles.calendario}>
          <Text style={styles.text_blue}>CALENDARIO</Text>
          <Icon style={styles.icon} name='calendar' size={sizes.iconSize} color={colors.secondary} />
        </TouchableOpacity>
          <TouchableOpacity style={styles.despensa} onPress={() => router.push('/Inventory')}>
            <Text style={styles.text_blue}>INVENTARIO</Text>
            <Icon style={styles.icon} name='archive' size={sizes.iconSize} color={colors.secondary} />
          </TouchableOpacity>
      </View> 
        <TouchableOpacity style={styles.boton_recipies}>
          <Text style={styles.text_blue}>MIS RECETAS</Text>
          <Icon name="book" size={sizes.buttonIconSize} color={colors.secondary} />
        </TouchableOpacity>
      <StatusBar style="auto"/>
    </View>
    
  );
}

const commonStyles = {
  button: {
    width: sizes.buttonWidth,
    height: sizes.buttonHeight,
    boxShadow: `3px 3px 1px ${colors.shadow}`,
    borderRadius: sizes.borderRadius,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: sizes.containerWidth,
    height: sizes.containerHeight,
    backgroundColor: colors.primary,
    borderRadius: sizes.borderRadius,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  container_calendar_inventory: {
    ...commonStyles.container,
    boxShadow: `2px 3px 1px ${colors.shadow}`,
  },
  container_days: {
    ...commonStyles.container,
    boxShadow: `2px 3px 1px ${colors.shadow}`,
  },
  despensa: {
    ...commonStyles.button,
  },
  calendario: {
    ...commonStyles.button,
  },
  boton_añadir: {
    ...commonStyles.button,
  },
  boton_recipies: {
    ...commonStyles.container,
    width: sizes.containerWidth,
    padding: 35,
    //boxShadow: `2px 3px 1px ${colors.shadow}`,
  },
  container_recipies: {
    ...commonStyles.container,
    backgroundColor: colors.backgroundColor,
  },
  text_blue: {
    color: colors.secondary,
    fontSize: sizes.textSize,
    textAlign: 'center',
    margin: 5,
  },
  icon: {
    textAlign: 'center',
  },
});

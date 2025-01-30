import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import config from '../config/config';
import sizes from '../styles/sizes';
import {useAuth} from '../context/AuthContext';
import FloatingAlert from '../components/Modals/FloatingAlert';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();
  const auth = useAuth();

  useEffect(()  =>  {
    const fetchData = async () => {
      fetch(`${config.backendHost}:${config.backendPort}/${auth.user}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth.token}`, 
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setName(data[0].nombre_usuario);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    if(!auth.isLoading && auth.isAuthenticated){
      fetchData();
    }
  }, [auth.isLoading]);

  return (
    <View style={styles.container}>
      <FloatingAlert/>
      <Text style ={styles.name_title} >Hola, {name}</Text>
      <View style={styles.container_days}>
      </View>
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
    marginTop:0,
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
  name_title:{
    color: colors.secondary,
    fontSize: sizes.textSize + 5,
    textAlign: 'center',
    padding: 15,
  }
});

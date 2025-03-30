import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/colors';
import config from '../config/config';
import sizes from '../styles/sizes';
import {useAuth} from '../context/AuthContext';
import FloatingAlert from '../components/Modals/FloatingAlert';
import ButtonWithIcon from '../components/ButtonWithIcon';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();
  const {user, token, isLoading, isAuthenticated} = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchUserData();
    }
  }, [isLoading]);

const fetchUserData = async () => {
    try {
      const response = await fetch(`${config.backendHost}:${config.backendPort}/${user}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setName(data[0].nombre_usuario);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FloatingAlert/>
      <Text style ={styles.name_title} >Hola, {name}</Text>
      <View style={styles.container_days}></View>
      <View style={styles.container_mid}>
        <ButtonWithIcon title='CALENDARIO' icon='calendar' onPress={null}></ButtonWithIcon> 
        <ButtonWithIcon title='INVENTARIO' icon='archive' onPress={() => router.push('/Inventory')}></ButtonWithIcon> 
      </View> 
        <View style={styles.container_full}>
          <ButtonWithIcon title='MIS RECETAS' icon='book' onPress={() => router.push('/Recipies')}></ButtonWithIcon>
        </View>
      <StatusBar style="auto"/>
      
    </View>
    
  );
}

const commonStyles = {
  button: {
    width: sizes.buttonWidth,
    height: sizes.buttonHeight,
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
  container_days: {
    ...commonStyles.container,
    marginTop:0,
    boxShadow: `2px 3px 1px ${colors.shadow}`,
    elevation:3,
  },
  container_mid: {
    width: '90%',
    height: sizes.containerHeight,
    backgroundColor: colors.backgroundColor,
    justifyContent:'space-evenly',  
    flexDirection: 'row',
    marginTop: 20,
    gap:10,
   
  },
  container_full: {
    width: '90%',
    height:sizes.containerHeight,
    borderRadius: sizes.borderRadius,
    marginTop: 20,
  },
  text_blue: {
    color: colors.secondary,
    fontSize: sizes.textSize,
    textAlign: 'center',
    margin: 5,
  },
  name_title:{
    color: colors.secondary,
    fontSize: sizes.textSize + 5,
    textAlign: 'center',
    padding: 15,
  }
});

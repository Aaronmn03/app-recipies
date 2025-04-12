import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import config from '../config/config';
import sizes from '../styles/sizes';
import {useAuth} from '../context/AuthContext';
import FloatingAlert from '../components/Modals/FloatingAlert';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { ThemedView, ThemedPrimaryView, ThemedText } from '../components/ThemedComponents';
import { useLoading } from '../context/LoadingContext';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();
  const {user, token, isLoading, isAuthenticated} = useAuth();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchUserData();
    }
  }, [isLoading]);

const fetchUserData = async () => {
    try {
      showLoading();
      const response = await fetch(`${config.backendHost}/${user}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      hideLoading();
      setName(data[0].nombre_usuario);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <FloatingAlert/>
      <ThemedText style ={styles.name_title} >Hola, {name}</ThemedText>
      <ThemedPrimaryView style={styles.container_days}></ThemedPrimaryView>
      <ThemedView style={styles.container_mid}>
        <ButtonWithIcon style={{flex:1}} title='CALENDARIO' icon='calendar' onPress={null}></ButtonWithIcon> 
        <ButtonWithIcon style={{flex:1}} title='INVENTARIO' icon='archive' onPress={() => router.push('/Inventory')}></ButtonWithIcon> 
      </ThemedView> 
      <View style={styles.container_full}>
        <ButtonWithIcon title='MIS RECETAS' icon='book' onPress={() => router.push('/Recipies')}></ButtonWithIcon>
      </View>
    </ThemedView>
  );
}

const commonStyles = {
  container: {
    width: sizes.containerWidth,
    height: '30%',
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
    alignItems: 'center',
  },
  container_days: {
    ...commonStyles.container,
  },
  container_mid: {
    width: '90%',
    height: sizes.containerHeight,
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
  name_title:{
    fontSize: 18,
    padding: 5,
  }
});

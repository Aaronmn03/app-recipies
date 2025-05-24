import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import config from '../config/config';
import sizes from '../styles/sizes';
import {useAuth} from '../context/AuthContext';
import FloatingAlert from '../components/Modals/FloatingAlert';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { ThemedView, ThemedPrimaryView, ThemedText } from '../components/ThemedComponents';
import { useLoading } from '../context/LoadingContext';
import Recipies from '../components/Calendar/Recipies';
import { useAlert } from '../context/AlertContext';
import { fetchRecipiesData } from '../services/RecipieService';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();
  const {user, token, isLoading, isAuthenticated} = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const [recetas, setRecetas] = useState([]);
  const { handleSuccess, handleError } = useAlert(); 
  

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchUserData();
    }
  }, [isLoading]);

  useEffect(() => {
    fetchRecipiesData("", user, token, setRecetas, handleError);
  }, []);

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

  const EJEMPLO_DIA = { //ESTAMOS USANDO LA INTERFAZ DE UN DIA PARA HACER PRUEBAS
      id: 1,
      fecha: "2025-04-25",
      id_user: 22,
      comida: {
        receta_id: [59, 58],
        personas: 1,
      },
      cena: {
        receta_id: [59, 58],
        personas: 1,
      }
    }
  return (
    <ThemedView style={styles.container}>
      <FloatingAlert/>
      <ThemedPrimaryView style={styles.container_days}>
        <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
          {recetas.length > 0 && (
            <Recipies dayOnCalendar={EJEMPLO_DIA} recetas={recetas}/>
          )}
        </ScrollView>
      </ThemedPrimaryView>
      <ThemedView style={styles.container_mid}>
        <ButtonWithIcon style={{flex:1}} title='CALENDARIO' icon='calendar' onPress={() => router.push('/Calendar')}></ButtonWithIcon> 
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
    flexDirection: 'row',
    alignItems: 'center',
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
    height: '35%',

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

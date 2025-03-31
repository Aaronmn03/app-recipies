import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import FloatingPlusButton from '../components/floatingrightbutton';
import colors from '../styles/colors';
import config from '../config/config';
import TitleView from '../components/TitleView.js';
import sizes from '../styles/sizes';
import { unidad_medida } from '../utils/unitConverter.js';
import Aliment from '../components/Aliment';
import { useAuth } from '../context/AuthContext';
import FloatingAlert from '../components/Modals/FloatingAlert';

export default function Inventary() {
  const [items, setInventory] = useState([]);
  const router = useRouter();
  const {user, token} = useAuth();

  const handleItemDetails = (item) => {
    router.push({
      pathname: '/ItemInventoryDetails',
      params: {item: JSON.stringify(item)},
    });
  };

  useEffect(() => {
    const fetchData = async () => {      
      fetch(`${config.backendHost}:${config.backendPort}/Inventory/${user}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setInventory(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    fetchData();
  }, []);


  return (
    <View style={styles.mainContainer}>
      <FloatingAlert/>
      <TitleView title={'TU INVENTARIO'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Aliment 
              key={index} 
              nombreItem={item.nombre.toString().toUpperCase()} 
              descripcionItem={`${item.cantidad} ${unidad_medida(item)}`}
              funcion={() => handleItemDetails(item)}
              image={item.imagen ? { uri: item.imagen } : require('../assets/aguacate.jpg')}
              outOfStock={item.stock_minimo && parseFloat(item.cantidad) < parseFloat(item.stock_minimo)}
        
            />
          ))
        ) : (
          <Text style={styles.text}>No hay items en el inventario</Text>
        )}
      </ScrollView>
      <FloatingPlusButton onPress={() => router.push('/AddItem')} color={colors.backgroundColor} icon={'plus'}/>
      </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: colors.secondary,
    fontSize: sizes.textSize,
    textAlign: 'center',
    margin: 5,
  },
});

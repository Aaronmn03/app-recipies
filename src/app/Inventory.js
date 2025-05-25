import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import FloatingRightButton from '../components/floatingrightbutton';
import config from '../config/config';
import TitleView from '../components/TitleView.js';
import sizes from '../styles/sizes';
import { unidad_medida } from '../utils/unitConverter.js';
import Aliment from '../components/Aliment';
import { useAuth } from '../context/AuthContext';
import { ThemedText, ThemedView } from '../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';
import CamaraModal from '../components/Inventory/CamaraModal';
import { useLoading } from '../context/LoadingContext';

export default function Inventary() {
  const [items, setInventory] = useState([]);
  const router = useRouter();
  const {user, token} = useAuth();
  const {theme} = useTheme();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const { showLoading, hideLoading } = useLoading();


  const handleItemDetails = (item) => {
    router.push({
      pathname: '/ItemInventoryDetails',
      params: {item: JSON.stringify(item)},
    });
  };

  useEffect(() => {
    const fetchData = async () => {      
      showLoading();
     fetch(`${config.backendHost}/Inventory/${user}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setInventory(data);
          hideLoading();
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    fetchData();
  }, []);


  return (
    <ThemedView style={styles.mainContainer}>
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
          <ThemedText style={styles.text}>No hay items en el inventario</ThemedText>
        )}
      </ScrollView>
      <FloatingRightButton onPress={() => setIsCameraOpen(true)} color={theme.backgroundColor} bottom = {80} icon={'camera'}/>
      <FloatingRightButton onPress={() => router.push('/AddItem')} color={theme.backgroundColor} icon={'plus'}/>
      <CamaraModal visible={isCameraOpen} setVisible={setIsCameraOpen}/>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: sizes.textSize,
    textAlign: 'center',
    margin: 5,
  },
});

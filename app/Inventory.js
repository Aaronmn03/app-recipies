import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import Item from '../components/item.js';
import FloatingPlusButton from '../components/floatingplusbutton.js';
import colors from '../styles/colors.js';

const sizes = {
  iconSize: 65,
  buttonIconSize: 80,
  textSize: 20,
  borderRadius: 8,
  buttonWidth: '45%',
  buttonHeight: '100%',
  containerWidth: '90%',
  containerHeight: '20%',
};

export default function Inventary() {
  const [items, setInventory] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.39:3000/Inventory')
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos del backend:', data);
        setInventory(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.text}>TU INVENTARIO</Text>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Item 
              key={index} 
              nombreItem={item.item.toString().toUpperCase()} 
              descripcionItem={`${item.cantidad} ${item.unidades.toString().toUpperCase()}`}
            />
          ))
        ) : (
          <Text style={styles.text}>No hay items en el inventario</Text>
        )}
      </ScrollView>
      <FloatingPlusButton onPress={() => console.log('Botón flotante presionado')} />
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
    paddingVertical: 10,
    flexGrow: 1,
  },
  container: {
    width: sizes.containerWidth,
    height: sizes.containerHeight,
    backgroundColor: colors.primary,
    borderRadius: sizes.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    
    marginTop: 20,
  },
  text: {
    color: colors.secondary,
    fontSize: sizes.textSize,
    textAlign: 'center',
    margin: 5,
  },
  boton_plus:{
    width: sizes.containerWidth,
    height: sizes.containerHeight,
    backgroundColor: colors.primary,
    borderRadius: sizes.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginTop: 15,
  }
});

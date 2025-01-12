import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import Item from '../components/item.js';
import FloatingPlusButton from '../components/floatingrightbutton';
import colors from '../styles/colors';
import config from '../config/config';
import BackButton from '../components/BackButton';

const sizes = {
  iconSize: 65,
  buttonIconSize: 80,
  textSize: 26,
  borderRadius: 8,
  buttonWidth: '45%',
  buttonHeight: '100%',
  containerWidth: '90%',
  containerHeight: '20%',
};

export default function Inventary() {
  const [items, setInventory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${config.backendHost}:${config.backendPort}/Inventory`)
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos del backend:', data);
        setInventory(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.text}>TU INVENTARIO</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginTop: 20,
    marginRight: '20%',
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

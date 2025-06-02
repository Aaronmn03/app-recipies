import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View, FlatList , Dimensions } from 'react-native';
import sizes from '../styles/sizes';
import {useAuth} from '../context/AuthContext';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { ThemedView, ThemedPrimaryView } from '../components/ThemedComponents';
import { useLoading } from '../context/LoadingContext';
import Recipies from '../components/Calendar/Recipies';
import { useAlert } from '../context/AlertContext';
import { fetchRecipiesData } from '../services/RecipieService';
import { fetchDias, procesarDias } from '../services/CalendarService';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const router = useRouter();
  const {user, token} = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const [recetas, setRecetas] = useState([]);
  const { handleError, handleSuccess } = useAlert(); 
  const [recetasDia, setRecetasDia] = useState([]);
  const { width: screenWidth } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();

  const todayIndex = useMemo(() => {
    return recetasDia.findIndex(dia => {
      const hoy = new Date();
      const fechaDia = new Date(dia.fecha);
      return fechaDia.toDateString() === hoy.toDateString();
    });
  }, [recetasDia]);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  });

  useEffect(() => {
    if (todayIndex >= 0) {
      setCurrentIndex(todayIndex);
    }
  }, [todayIndex]);

  useEffect(() => {
    showLoading();
    fetchRecipiesData("", user, token, setRecetas, handleError);
  }, []);

  useEffect(() => {
    const cargarDias = async () => {
      try {
        const dias = await fetchDias();
        setRecetasDia(dias);
      } catch (error) {
        handleError("Error al cargar los días del calendario");
        console.error("Error al cargar los días del calendario:", error);
      } 
    };
    if (recetas.length === 0) {
      cargarDias();    
    }
  }, []);

  useEffect(() => {
    const ejecutarProcesamiento = async () => {
      if (!recetasDia || recetasDia.length === 0) return;

      try {
        showLoading();
        await procesarDias(recetasDia, user, token, handleError, handleSuccess);
      } catch (error) {
        handleError("Error al procesar los días del calendario");
        console.error("Error al procesar los días del calendario:", error);
      } finally {
        hideLoading();
      }
    };

    ejecutarProcesamiento();

  }, [recetasDia]);

  return (
    <ThemedView style={styles.container}>
      <ThemedPrimaryView style={styles.container_days}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
            {todayIndex >= 0 && <FlatList
              data={recetasDia}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              initialScrollIndex={todayIndex >= 0 ? todayIndex : 0}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ width: screenWidth * 0.9, alignItems: 'center', justifyContent: 'center' }}>
                  <Recipies dayOnCalendar={item} />
                </View>
              )}
              getItemLayout={(data, index) => ({
                length: screenWidth * 0.9,
                offset: (screenWidth * 0.9) * index,
                index
              })}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewabilityConfig}
            />
          }
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            {recetasDia.map((_, index) => (
              <View
                key={index}
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: 4,
                  marginHorizontal: 4,
                  backgroundColor: currentIndex === index ? theme.secondary : theme.backgroundColor,
                }}
              />
            ))}
          </View>
        </View>
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
